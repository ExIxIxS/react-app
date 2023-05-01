import { Request, Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import RootHtml from './rootHtml';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AppRoutes } from '../appRoutes/appRoutes';
import { createAppStore } from '../appStore/reduxStore';
import { Assets } from 'interfaces';

async function render(req: Request, res: Response, assets: Assets) {
  const appStore = createAppStore({});
  setupListeners(appStore.dispatch);
  const preloadedState = appStore.getState();
  let didError = false;

  const { pipe } = renderToPipeableStream(
    <RootHtml style={assets.style} preloadedState={preloadedState}>
      <Provider store={appStore}>
        <StaticRouter location={req.originalUrl}>
          <AppRoutes />
        </StaticRouter>
      </Provider>
    </RootHtml>,
    {
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/html');
        res.send('<h1>Something went wrong</h1>');
      },
      onError(err: unknown) {
        didError = true;
        console.error(err);
      },
      bootstrapModules: [assets.script],
    }
  );
}

export { render };
