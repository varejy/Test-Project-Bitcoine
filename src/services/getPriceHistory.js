import request from 'superagent';

import setBTCstate from '../actions/setBTCstate';


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

export default function getBitcoinHistory() {
    return dispatch => {
        return base(
            request
                .get('http://localhost:4000/api/getBitcoinHistory')
        )
            .then(res => {
                dispatch(setBTCstate(res.Data.Data));
            })
            .catch(() => {
                dispatch(setBTCstate(0));
            });
    };
}
