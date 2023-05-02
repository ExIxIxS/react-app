import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import ClientSide from './ssrComponents/clientSide';
hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <ClientSide />
  </StrictMode>
);
