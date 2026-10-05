// iOS Universal Links. Apple fetches this from https://www.renturstatus.com/.well-known/apple-app-site-association
// (no redirects, no file extension) when the app is installed. Only product pages open the app: every other page,
// including checkout and the payment gateways' return to it, stays in the browser.

// The App Store build: team "Rent Ur Status (RUS) Limited", bundle com.crowd.rus (read from the signed 1.3.8 build)
const APP_ID = process.env.APPLE_APP_ID || "W3G35YP6ZX.com.crowd.rus";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      applinks: {
        details: [
          {
            appIDs: [APP_ID],
            components: [{ "/": "/marketplace/product/*", comment: "Marketplace products open in the RUS app" }],
          },
        ],
        // Older iOS versions read this format
        apps: [],
      },
    },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
