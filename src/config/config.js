import Env from './env';

global.API_PREFIX = 'http://localhost:8099';
global.SERVER_HEADER = {
    "Accept": "application/json",
    "Content-Type": "application/json"
    // "appkey": "4b5168b4-e04c-4443-9a91-0fe87e3e6408"
};
let config = {
    env: Env
};
export default config;
