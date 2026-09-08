const origin = 'https://api.themoviedb.org';
const allowedPath = /^(?:trending\/tv\/week|search\/tv|tv\/[1-9]\d{0,9}(?:\/(?:credits|videos|watch\/providers))?)$/;

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
}

// Share the same strict proxy between local development and Netlify Functions.
// Never accept a destination URL or credentials from the caller.
export async function handleTmdb(request, { token = process.env.TMDB_API_TOKEN, fetchImpl = fetch } = {}) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { Allow: 'GET' });
  const url = new URL(request.url);
  const prefix = '/api/tmdb/';
  const path = url.pathname.startsWith(prefix) ? url.pathname.slice(prefix.length) : '';
  if (!allowedPath.test(path)) return json({ error: 'Not found' }, 404);
  const upstream = new URL(`/3/${path}`, origin);
  if (path === 'search/tv') {
    const query = url.searchParams.get('query')?.trim();
    if (!query || query.length > 200) return json({ error: 'Invalid search query' }, 400);
    upstream.searchParams.set('query', query);
    upstream.searchParams.set('include_adult', 'false');
    upstream.searchParams.set('language', 'en-US');
    upstream.searchParams.set('page', '1');
  }
  if (!token) return json({ error: 'TV service is not configured' }, 503);
  try {
    const response = await fetchImpl(upstream, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return json({ error: 'TV service is unavailable' }, response.status === 404 ? 404 : 502);
    const data = await response.json();
    return json(data, 200, { 'Cache-Control': 'public, max-age=60, s-maxage=300' });
  } catch {
    return json({ error: 'TV service is unavailable' }, 502);
  }
}
