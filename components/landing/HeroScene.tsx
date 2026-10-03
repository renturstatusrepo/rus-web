"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";

const PINK = "#e0409a";
const INDIGO = "#6b7fe0";
const CYAN = "#45c5f0";

export type SceneState = { scroll: number };

// A segmented ring, like the story ring around a status avatar
function StatusRing({
  radius,
  segments,
  color,
  tube = 0.035,
  gap = 0.18,
  speed,
  tilt,
}: {
  radius: number;
  segments: number;
  color: string;
  tube?: number;
  gap?: number;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const arc = (Math.PI * 2) / segments - gap;

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        {Array.from({ length: segments }, (_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / segments]}>
            <torusGeometry args={[radius, tube, 12, 72, arc]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function AppIcon({ onReady }: { onReady?: () => void }) {
  const logo = useTexture("/logo-512.webp", (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  // Suspense only renders this once the texture has loaded, so the scene is ready to be seen
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <group>
      <RoundedBox args={[2.3, 2.3, 0.32]} radius={0.38} smoothness={6}>
        <meshPhysicalMaterial color="#14163a" metalness={0.4} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.165]}>
        <planeGeometry args={[2.26, 2.26]} />
        <meshBasicMaterial map={logo} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({
  state,
  pointer,
  compact,
  onReady,
}: {
  state: MutableRefObject<SceneState>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  compact: boolean;
  onReady?: () => void;
}) {
  const root = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const s = state.current.scroll;
    const k = 1 - Math.exp(-delta * 4);
    if (root.current) {
      root.current.rotation.y += (pointer.current.x * 0.45 + s * 1.2 - root.current.rotation.y) * k;
      root.current.rotation.x += (-pointer.current.y * 0.25 - root.current.rotation.x) * k;
      root.current.position.y = s * 1.4;
    }
    if (rings.current) {
      const spread = 1 + s * 0.9;
      rings.current.scale.setScalar(spread);
      rings.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={root}>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
        <AppIcon onReady={onReady} />
      </Float>
      <group ref={rings}>
        <StatusRing radius={2.15} segments={6} color={PINK} speed={0.25} tilt={[1.15, 0.15, 0]} />
        <StatusRing radius={2.55} segments={9} color={INDIGO} speed={-0.18} tilt={[1.35, -0.45, 0.3]} tube={0.025} gap={0.12} />
        <StatusRing radius={2.95} segments={4} color={CYAN} speed={0.12} tilt={[1.6, 0.35, -0.2]} tube={0.03} gap={0.35} />
      </group>
      <Sparkles count={compact ? 30 : 70} scale={[8, 6, 4]} size={2.4} speed={0.35} color={CYAN} opacity={0.7} />
      <Sparkles count={compact ? 18 : 40} scale={[7, 5, 3]} size={3} speed={0.25} color={PINK} opacity={0.6} />
    </group>
  );
}

export default function HeroScene({ state, onReady }: { state: MutableRefObject<SceneState>; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  // Phones get fewer pixels and particles to push: the scene still looks sharp, and stays smooth
  const compact = useMemo(() => window.matchMedia("(max-width: 767px), (pointer: coarse)").matches, []);
  const dpr = useMemo<[number, number]>(() => (compact ? [1, 1.5] : [1, 1.75]), [compact]);
  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Stop rendering once the hero has scrolled away
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={`absolute -inset-x-[18%] -inset-y-[12%] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
      <Canvas
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 8.6], fov: 42 }}
        gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={30} color={PINK} />
        <pointLight position={[4, 3, 2]} intensity={30} color={CYAN} />
        <Suspense fallback={null}>
          <Rig state={state} pointer={pointer} compact={compact} onReady={handleReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
