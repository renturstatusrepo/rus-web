// Android App Links. Android fetches this from https://www.renturstatus.com/.well-known/assetlinks.json to confirm
// the RUS app may open this site's links. Which links it opens is set by the app itself: only product pages.
//
// The fingerprint must match the certificate the installed app is signed with. Store installs are signed by
// Google Play with the app signing key, so its SHA-256 (Play Console → Test and release → App integrity →
// App signing key certificate) has to be listed here; set it as ANDROID_APP_SIGNING_SHA256 (comma-separate
// several). The upload key below covers builds installed straight from EAS.
const UPLOAD_KEY_SHA256 = "38:40:96:D4:99:4F:80:20:4D:B1:39:1B:A0:7D:57:59:A8:1C:DD:D2:07:DF:EB:5A:5A:A3:B3:81:53:B3:3D:0E";

const fingerprints = [
  ...(process.env.ANDROID_APP_SIGNING_SHA256 || "")
    .split(",")
    .map((f) => f.trim().toUpperCase())
    .filter((f) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(f)),
  UPLOAD_KEY_SHA256,
];

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.renturstatus.rus",
          sha256_cert_fingerprints: [...new Set(fingerprints)],
        },
      },
    ],
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
