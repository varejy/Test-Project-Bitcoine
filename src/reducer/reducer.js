import {
    SET_INTERVAL,
    SET_PAGINATION,
    SET_SORT_SETTING,
    SET_PRICE,
    SET_BTC_STATE
} from '../types/types';

import { format, fromUnixTime } from 'date-fns';
import { find, map } from 'ramda';

const initialState = {
    interval: {
        options: [
            {
                text: '1 min.',
                key: '1 min.',
                value: 60000
            },
            {
                text: '30 min.',
                key: '30 min.',
                value: 1.8e+6
            },
            {
                text: '1 h.',
                key: '1 h.',
                value: 3.6e+6
            }
        ],
        active: {
            text: '1 min.',
            key: '1 min.',
            value: 60000
        }
    },
    sort: {
        column: 'price',
        data: [],
        direction: 'ascending',
    },
    pagination: 0,
    sortingOptions: [
        {
            id: 'time',
            sort: (product, nextProduct) => {
                let regExTime = /([0-9]?[0-9]):([0-9][0-9]):([0-9]?[0-9])/;
                let times = [];
                map((item, i) => {
                    let regExTimeArr = regExTime.exec(item);
                    let timeHr = regExTimeArr[1] * 3600 * 1000;
                    let timeMin = regExTimeArr[2] * 60 * 1000;
                    let timeSec = regExTimeArr[3] * 1000;

                    let timeMs = timeHr + timeMin + timeSec;
                    times.push(timeMs)
                }, [product.time, nextProduct.time])
                return times[0] - times[1]
            }
        },
        {
            id: 'price',
            sort: (product, nextProduct) => nextProduct.price - product.price
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_INTERVAL:
            return {
                ...state,
                interval: {
                    ...state.interval,
                    active: action.payload
                }
            };
        case SET_PAGINATION:
            return { ...state, pagination: action.payload };
        case SET_BTC_STATE:
            let sortOptionA = find(sort => sort.id === state.sort.column, state.sortingOptions);

            return {
                ...state,
                sort: {
                    ...state.sort,
                    data: [
                        ...state.sort.data,
                        ...map((item, i) => {
                            return {
                                price: item.open,
                                date: format(new Date(), 'dd/MMM/yyyy'),
                                time: format(fromUnixTime(item.time), 'kk:mm:s')
                            }
                        }, action.payload)

                    ].sort(sortOptionA.sort),
                },
            };
        case SET_SORT_SETTING:
            let sortOptionB = find(sort => sort.id === action.payload, state.sortingOptions);

            if (state.sort.column === action.payload) {
                return {
                    ...state,
                    sort: {
                        ...state.sort,
                        data: state.sort.data.slice().reverse(),
                        direction:
                            state.sort.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }
            }

            return {
                ...state,
                sort: {
                    column: action.payload,
                    data: state.sort.data.sort(sortOptionB.sort),
                    direction: 'ascending',
                }
            }
        case SET_PRICE:
            let sortOptionC = find(sort => sort.id === state.sort.column, state.sortingOptions);
            return {
                ...state,
                sort: {
                    ...state.sort,
                    data: [
                        ...state.sort.data,
                        {
                            price: action.payload,
                            date: format(new Date(), 'dd/MMM/yyyy'),
                            time: format(new Date(), 'kk:mm:s')
                        }
                    ].sort(sortOptionC.sort),
                },
            };
        default:
            return state;
    }
}
