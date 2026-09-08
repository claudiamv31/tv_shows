import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';
import App from './App';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

test('loads trending shows through the same-origin API without a browser token', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
  vi.stubGlobal('fetch', fetchMock);
  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  expect(await screen.findByRole('heading', { name: 'Trending Tv Shows' })).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledWith('/api/tmdb/trending/tv/week', { headers: {} });
});

test('renders an API failure without crashing', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  render(<MemoryRouter initialEntries={['/shows/trending']}><App /></MemoryRouter>);
  expect(await screen.findByText('Fallback API is unavailable')).toBeInTheDocument();
});

test('searches and navigates to show details with the upgraded router', async () => {
  const { default: userEvent } = await import('@testing-library/user-event');
  const show = { id: 123, name: 'Example Show', first_air_date: '2024-01-01', poster_path: '/poster.jpg', vote_average: 8, genres: [], episode_run_time: [], overview: 'A test show' };
  vi.stubGlobal('fetch', vi.fn(async url => ({
    ok: true,
    json: async () => url.includes('/credits') ? { cast: [] }
      : url.includes('/watch/providers') ? { results: {} }
      : url.includes('/videos') ? { results: [] }
      : url.includes('/search/tv') ? { results: [show] } : show,
  })));
  render(<MemoryRouter initialEntries={['/shows']}><App /></MemoryRouter>);
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText('Search for a TV show...'), 'Example{Enter}');
  await user.click(await screen.findByRole('link', { name: /Example Show/ }));
  expect(await screen.findByRole('heading', { name: 'Example Show' })).toBeInTheDocument();
  expect(await screen.findByText('No trailer available.')).toBeInTheDocument();
  expect(await screen.findByText('No streaming providers available.')).toBeInTheDocument();
});
