// Turns a Netlify-preset build into a plain static site for Netlify (Git deploys and drag-and-drop):
// - writes a client-rendered start page (dist/index.html) and sends every page path to it;
// - forwards images (/__l5e/*) and game/server requests (/_serverFn/*) to the published Lovable app,
//   which holds the game server key, so cash tables work on Netlify too;
// - removes the Netlify server function, which has no game key and would take over every page.
// Run via `npm run build:netlify-drop` (netlify.toml does this automatically).
import { rmSync, writeFileSync } from 'node:fs';
import { LOVABLE_APP_ORIGIN } from './netlify-assets.mjs';

process.env.TSS_PRERENDERING = 'true';
const { default: handler } = await import('../.netlify/functions-internal/server/main.mjs');
const res = await handler(new Request('http://localhost/', { headers: { 'X-TSS_SHELL': 'true' } }), {});
if (!res.ok) throw new Error(`Start page render failed: ${res.status}`);
const html = await res.text();
if (!html.includes('<script')) throw new Error('Start page has no scripts; the site would be blank.');
writeFileSync('dist/index.html', html);
writeFileSync(
  'dist/_redirects',
  [
    `/__l5e/*  ${LOVABLE_APP_ORIGIN}/__l5e/:splat  200`,
    `/_serverFn/*  ${LOVABLE_APP_ORIGIN}/_serverFn/:splat  200`,
    `/*  /index.html  200`,
    '',
  ].join('\n'),
);
rmSync('.netlify/functions-internal', { recursive: true, force: true });
rmSync('.netlify/v1', { recursive: true, force: true });
console.log(`Netlify site ready in dist/ (server requests go to ${LOVABLE_APP_ORIGIN})`);
