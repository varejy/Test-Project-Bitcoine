import { SET_INTERVAL } from '../types/types';

const setInterval = payload => ({
    type: SET_INTERVAL,
    payload
});

export default setInterval;
