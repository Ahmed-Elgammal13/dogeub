import { Router } from 'itty-router';

const router = Router();

// DuckDuckGo search
router.get('/return', async (request) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  
  if (!q) {
    return new Response(JSON.stringify({ error: 'query parameter?' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const res = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'request failed' }), { status: 500 });
  }
});

// Discord redirect
router.get('/ds', () => {
  return Response.redirect('https://discord.gg/ZBef7HnAeg', 302);
});

// Asset proxy
router.get('/assets/img/*', async (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace('/assets/img/', '');
  return fetch(`https://dogeub-assets.pages.dev/img/${path}`);
});

router.get('/assets-fb/*', async (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace('/assets-fb/', '');
  return fetch(`https://dogeub-assets.pages.dev/img/server/${path}`);
});

export default {
  async fetch(request, env, ctx) {
    // API routes
    const apiResponse = await router.handle(request);
    if (apiResponse) return apiResponse;
    
    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};
