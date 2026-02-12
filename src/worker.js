export default {
  async fetch(request, env, ctx) {
    // Static assets are served automatically by Cloudflare
    // You only need this if you want to add custom logic
    return env.ASSETS.fetch(request);
  },
};
