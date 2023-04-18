import { setupServer } from 'msw/node';
import restTestHandlers from './restTestHandlers';

const server = setupServer(...restTestHandlers);

export default server;
