/**
 * Vercel Edge Function — HTTP 410 Gone Handler
 *
 * Explicitly serves HTTP 410 Gone status with `X-Robots-Tag: noindex, nofollow, noarchive`
 * to search engine crawlers (Googlebot, Bingbot, etc.) for legacy spam URLs,
 * hacked paths from previous domain ownership, and obsolete scrapers.
 *
 * According to Google Search Central and John Mueller:
 * Returning 410 Gone purges legacy URLs from Google's crawl index significantly
 * faster than 301/302 redirects or soft-404s, freeing up crawl budget for real pages.
 */
export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 Resource Permanently Removed | Pacific Products &amp; Solutions</title>
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: #030213;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(127, 183, 6, 0.3);
      border-radius: 16px;
      padding: 40px;
      max-width: 540px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-block;
      background: rgba(127, 183, 6, 0.15);
      color: #B5F823;
      border: 1px solid #7FB706;
      font-size: 14px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 9999px;
      margin-bottom: 20px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    h1 {
      font-size: 32px;
      margin: 0 0 16px 0;
      color: #ffffff;
      font-weight: 700;
    }
    p {
      color: #94a3b8;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 28px 0;
    }
    .btn {
      display: inline-block;
      background: #7FB706;
      color: #030213;
      font-weight: 700;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 10px;
      transition: background 0.2s ease;
    }
    .btn:hover {
      background: #B5F823;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">HTTP 410 &bull; Gone</div>
    <h1>Resource Permanently Removed</h1>
    <p>
      The legacy item requested at <code>${escapeHtml(url.pathname)}</code> has been permanently removed and is no longer available on Pacific Products &amp; Solutions.
    </p>
    <a href="https://www.pacificproduct.in/" class="btn">Go to Pacific Official Homepage</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 410,
    statusText: "Gone",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
