export default {
  async fetch(request, env, ctx) {
    try {
      // Log what bindings are available
      const bindings = Object.keys(env);
      
      // Try to serve the request
      if (env.ASSETS) {
        return await env.ASSETS.fetch(request);
      } else if (env.__STATIC_CONTENT) {
        // Manual KV serving fallback
        const url = new URL(request.url);
        const path = url.pathname.slice(1) || 'index.html';
        const asset = await env.__STATIC_CONTENT.get(path, { type: 'text' });
        if (asset) {
          return new Response(asset, { 
            headers: { 'Content-Type': 'text/html' } 
          });
        }
        return new Response('Not found', { status: 404 });
      } else {
        return new Response(`Available bindings: ${bindings.join(', ')}`, { status: 200 });
      }
    } catch (e) {
      return new Response(`Error: ${e.message}\nStack: ${e.stack}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};
