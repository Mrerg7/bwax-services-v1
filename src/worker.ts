interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'bwax.services';

function redirectToCanonical(url: URL, pathname?: string): Response {
  const target = new URL(url.toString());
  target.protocol = 'https:';
  target.hostname = CANONICAL_HOST;
  if (pathname !== undefined) {
    target.pathname = pathname;
  }
  return Response.redirect(target.toString(), 301);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Collapse www → apex so Google never treats host variants as alternate pages
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      return redirectToCanonical(url);
    }

    // /index.html is an alternate of /
    if (url.pathname === '/index.html' || url.pathname === '/index.htm') {
      return redirectToCanonical(url, '/');
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
