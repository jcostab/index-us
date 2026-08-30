const SECURITY_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

function withSecurityHeaders(response: Response): Response {
  const secured = new Response(response.body, response);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    secured.headers.set(name, value);
  }

  if (secured.headers.get("Content-Type")?.includes("text/html")) {
    secured.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return secured;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const target = new URL(request.url);
    if (!target.pathname.endsWith("/") && !target.pathname.split("/").at(-1)?.includes(".")) {
      target.pathname += "/";
      return withSecurityHeaders(Response.redirect(target, 308));
    }

    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  },
} satisfies ExportedHandler<Env>;
