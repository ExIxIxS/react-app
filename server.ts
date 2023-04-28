import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { ViteDevServer } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(dirname, p);
  const app = express();
  let vite: ViteDevServer;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      if (!isProd) {
        const render = (await vite.ssrLoadModule('/src/ssrComponents/serverSide.tsx')).render;
        const assets = { script: '/src/main.tsx', style: '/src/ssrComponents/serverStyle.css' };
        render(req, res, assets);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const render = (await import('./dist/server/serverSide.js')).render;
        const script =
          '/assets/' +
          fs.readdirSync(resolve('./dist/client/assets')).filter((fn: string) => fn.endsWith('js'));
        const style =
          '/assets/' +
          fs
            .readdirSync(resolve('./dist/client/assets'))
            .filter((fn: string) => fn.includes('css'));
        const assets = { style, script };
        render(req, res, assets);
      }
    } catch (e) {
      const err = e as Error;
      !isProd && vite.ssrFixStacktrace(err);
      console.log(err.stack);
      res.status(500).end(err.stack);
    }
  });

  return { app };
}

if (!isTest) {
  createServer()
    .then(({ app }) =>
      app.listen(5180, () => {
        console.log('http://localhost:5180');
      })
    )
    .catch((e) => console.error(e));
}
