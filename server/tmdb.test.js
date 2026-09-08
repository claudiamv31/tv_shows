// @vitest-environment node
import { expect, test, vi } from 'vitest';
import { handleTmdb } from './tmdb.js';
const request = (path, init) => new Request(`https://example.com/api/tmdb/${path}`, init);

test.each(['https://evil.example', 'tv/1/account', 'account', '%2e%2e/account', 'tv/1%2fcredits', 'tv/0', 'tv/1/../../account'])(
  'rejects non-allowlisted route %s without making an upstream call', async path => {
    const fetchImpl = vi.fn();
    expect((await handleTmdb(request(path), { token: 'test-only', fetchImpl })).status).toBe(404);
    expect(fetchImpl).not.toHaveBeenCalled();
  },
);
test('rejects writes and missing configuration', async () => {
  expect((await handleTmdb(request('tv/1', { method: 'POST' }))).status).toBe(405);
  expect((await handleTmdb(request('tv/1'), { token: '' })).status).toBe(503);
});
test('keeps authentication upstream and strips caller-controlled options', async () => {
  const fetchImpl = vi.fn().mockResolvedValue(Response.json({ results: [] }));
  const response = await handleTmdb(request('search/tv?query=cats&api_key=evil&include_adult=true&page=999'), { token: 'test-only', fetchImpl });
  const [url, options] = fetchImpl.mock.calls[0];
  expect(url.origin).toBe('https://api.themoviedb.org');
  expect(url.pathname).toBe('/3/search/tv');
  expect(url.searchParams.get('api_key')).toBeNull();
  expect(url.searchParams.get('include_adult')).toBe('false');
  expect(url.searchParams.get('page')).toBe('1');
  expect(options.headers.Authorization).toBe('Bearer test-only');
  expect(options.redirect).toBe('error');
  expect(await response.text()).not.toContain('test-only');
  expect(response.headers.has('Authorization')).toBe(false);
});
test.each(['', 'a'.repeat(201)])('rejects invalid search input', async query => {
  expect((await handleTmdb(request(`search/tv?query=${query}`), { token: 'test-only' })).status).toBe(400);
});
test('does not expose upstream errors or credentials', async () => {
  const fetchImpl = vi.fn().mockRejectedValue(new Error('Bearer test-only'));
  const response = await handleTmdb(request('tv/1'), { token: 'test-only', fetchImpl });
  expect(response.status).toBe(502);
  expect(await response.text()).not.toContain('test-only');
});
