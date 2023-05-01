import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express, { Request, Response } from 'express';
import { ViteDevServer } from 'vite';
import { Assets } from 'interfaces.js';

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

  app.use('*', async (req: Request, res: Response) => {
    try {
      if (!isProd) {
        const render = (await vite.ssrLoadModule('/src/ssrComponents/serverSide.tsx')).render as (
          req: Request,
          res: Response,
          assets: Assets
        ) => JSX.Element;
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        const err = e;
        !isProd && vite.ssrFixStacktrace(err);
        console.log(err.stack);
        res.status(500).end(err.stack);
      }
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
    .catch((e: Error) => console.error(e));
}
