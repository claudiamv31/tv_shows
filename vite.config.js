import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleTmdb } from './server/tmdb.js';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'local-tmdb-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/tmdb/')) return next();
          const env = loadEnv(mode, process.cwd(), '');
          const token =
            env.TMDB_API_TOKEN ||
            env.VITE_TMDB_API_TOKEN ||
            process.env.TMDB_API_TOKEN ||
            process.env.VITE_TMDB_API_TOKEN ||
            '';
          const request = new Request(new URL(req.url, 'http://localhost'), { method: req.method });
          const response = await handleTmdb(request, { token });
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(await response.text());
        });
      },
    },
  ],
  build: { outDir: 'build' },
  test: { environment: 'jsdom', globals: true, setupFiles: './src/setupTests.js' },
}));
