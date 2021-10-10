import { SET_PAGINATION } from '../types/types';

const setPagination = payload => ({
    type: SET_PAGINATION,
    payload
});

export default setPagination;
