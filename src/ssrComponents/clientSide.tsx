import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createAppStore, RootState } from '../appStore/reduxStore';
import { AppRoutes } from '../appRoutes/appRoutes';
import { BrowserRouter } from 'react-router-dom';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}

const appStore = createAppStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

function ClientSide() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default ClientSide;
