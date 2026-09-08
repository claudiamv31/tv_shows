import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import YoutubeEmbed from './YoutubeEmbed';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
test.each([
  ['YouTube', '../malicious', false],
  ['Vimeo', 'abcdefghijk', false],
  ['YouTube', 'abcdefghijk', true],
])('validates trailer site %s and ID %s', async (site, key, valid) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [{ type: 'Trailer', site, key }] }) }));
  render(<YoutubeEmbed id={123} />);
  if (valid) expect(await screen.findByTitle('Video of Tv Show')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/abcdefghijk');
  else { expect(await screen.findByText('No trailer available.')).toBeInTheDocument(); expect(document.querySelector('iframe')).toBeNull(); }
});
