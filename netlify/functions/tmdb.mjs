import { handleTmdb } from '../../server/tmdb.js';

export default request => handleTmdb(request);
export const config = { path: '/api/tmdb/*' };
