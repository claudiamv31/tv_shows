# Clavtv

A React app for browsing trending TV shows, searching titles, and viewing trailers and streaming providers.

## Local development

Use Node.js 22.22.2 or newer (Node 22 LTS recommended).

```sh
npm ci --ignore-scripts
cp .env.example .env.local
# Set TMDB_API_TOKEN in .env.local, then:
npm start
```

Open http://localhost:3000. Vite serves the app and the same-origin `/api/tmdb/` proxy. Restart the server after changing the token.

The TMDB API read-access token belongs only in the server environment. Do not use `VITE_` or `REACT_APP_` variables for credentials: frontend build variables are public. No real credentials are needed to run tests or build the frontend.

## Commands

- `npm test`: run UI and proxy security regression tests.
- `npm run build`: generate the frontend in `build/`.
- `npm run preview`: inspect the static build locally; this command does not run the API function.
- `npm run audit`: check all dependencies, including development tools.

## Deployment

Netlify configuration is provided in `netlify.toml`, with a server function at `/api/tmdb/*` and SPA fallback in `public/_redirects`. Set `TMDB_API_TOKEN` in the Netlify environment with **Functions** scope, then deploy the branch after reviewing it. Replace any previous `REACT_APP_TMDB_API_TOKEN` setting. The frontend build does not need the token.

A static-only host cannot run the proxy. On another host, deploy `server/tmdb.js` behind `/api/tmdb/*`, route API requests before the SPA fallback, and apply the response headers from `public/_headers`. Restrict the public API using the host's rate limiting or firewall controls to protect the TMDB quota. The proxy only supports the read-only routes the app uses, ignores caller-supplied credentials and arbitrary parameters, rejects redirects, and times out upstream requests.

## Credential exposure

A TMDB token was previously committed in `src/config.js` and remains in Git history. **Revoke or rotate that token in the TMDB account before deploying with a replacement.** Removing it from the latest code or rewriting history does not revoke copies. The new proxy prevents the replacement from being embedded in frontend assets. This repository change cannot revoke a token in an external account.

GitHub Actions checks the lockfile for vulnerabilities, runs tests, and builds on pushes, pull requests, and weekly. Dependabot checks npm dependencies and GitHub Actions weekly.
