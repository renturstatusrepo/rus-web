export default function SocialProof() {
  const profileImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXJU6g4CN13x1g-ho2_SHO3W6wsoTb34keCIJAmObCbmS-WQkJ3Wnqm6tst4G1cEOQ7tIjRv2LoVN3Vld_MtKhKmrnAq2vZ4yr5f7Qq6TASRy4BJHjuJQKDJBKnj9bLYsu4d7FPPNka-yGLVHUyJX1XwpTwq0IsL3HMtrrJsejrsqXBb0U_JRLIYojluYeuiZ37L7nXMaL1k2w4gIq8IX3XOkarCoxMZseavFdS9MsSSSGz0h-bhIS3bKANVTm0N3WScXgwzFIxQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9-ZZ1BRYgtcM-eBB7j5vbggrlQaz8SJb-Oz6i38cstdOclI4S9g_NET-ki1-PpDZNVn4i89x28rC7ddEoyCJIyiWysZMCSBSh2UI02lr4hOSCHNASrl7NdLgX_cIYZFSmK1xOtwyRHL-ZEZah9yPx233dx4BF8s5hnmfPE8ldWIY7lFgGtNx1KRQTpCOwB0o_OIwjyahkey_iaKheniuTpRG6CO0YtOIThewKAVo526GlVgHyJdC_kJK-X2_Q7LMskJmjmifMJQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEUIDJWlhBfH6fRnsqhW-rcpNVAGGeyZ2BG9jB1TZSTcSX_pXWRHOylGX8iN05KUE2lMp9-ZFqmXJxrHTfQTQbUNKL3jSOC3I-00TThK8dlq99HRTFaHKNAWAM-0B5v7Nm-UGf7dvOAM13D1_de52CHkjhg9C13o_54A5PIXLGpyZYa-FKS3aFDFI17IetxZIE2JRMMDu416hQSJZhPiIq-wEeqWYXfSOIYq6ScBrprfSxPtODxpZ79LhMDOuQRh1nuN6yFNY31Q",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center py-8">
      <div className="flex flex-col gap-8 order-2 lg:order-1">
        <div>
          <h3 className="text-3xl font-bold text-neutral-dark mb-4">
            Trusted by creators across every platform
          </h3>
          <p className="text-slate-600 text-lg">
            We handle the business side so you can focus on creating. No contracts, no negotiations, just content.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">check_circle</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg text-neutral-dark">Guaranteed Payouts</span>
              <span className="text-slate-600">
                Instant transfers to your bank or crypto wallet once the campaign is complete.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">security</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg text-neutral-dark">Brand Safety Shield</span>
              <span className="text-slate-600">
                We verify every brand. You never have to worry about promoting scams or low-quality products.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 group ring-1 ring-slate-900/5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEhbdlTPIeA4rSqHe9nkQwK5qVtWaXSuJ0v14UFCFEnFoJmkRu3aGhTTJSZBfG2Mj5JRRiOHKuRBUDz3o_PcikQYA0rpq5sobbX7XM8EKdaNq_If3cWkF8_cvqOY0K0JsimB7BzCBA4tuMNuBvLPKcudNrQ8xmFMu0WXgXjG0BsFWHR_y49q0PPlBu9Hkxx3zIxZn6Ypr_mwfPoZ6DzoG9-WIjtm_qt2mS8ZTqI0nD8914cfIXGssilUjHp90uFzM0l1saHUeJKQ")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/90 via-neutral-dark/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-magenta-pink px-2 py-0.5 rounded text-xs font-bold uppercase shadow-sm">
              Trending
            </span>
            <span className="text-sm font-medium opacity-90">Live Now</span>
          </div>
          <p className="font-bold text-2xl mb-4">
            "RUS helped me pay for my tuition just by posting."
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {profileImages.map((img, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center"
                  style={{ backgroundImage: `url("${img}")` }}
                />
              ))}
            </div>
            <div className="text-sm font-medium">
              <span className="block font-bold">Join 15k+ Creators</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  