import request from 'superagent';

import setPrice from '../actions/setPrice';


function base(request) {
    return new Promise((resolve, reject) => {
        request
            .end((err, res) => {
                if (err) {
                    return reject(err);
                }

                resolve(res.body || res.text);
            });
    });
}

export default function getBitcoin() {
    return dispatch => {
        return base(
            request
                .get('http://localhost:4000/api/getBitcoin')
        )
            .then(res => {
                dispatch(setPrice(res.data.BTC.quote.USD.price));
            })
            .catch(() => {
                dispatch(setPrice(0));
            });
    };
}
