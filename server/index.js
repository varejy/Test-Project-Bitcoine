import express from 'express';
import constantsCoinmarket from './constants/constantsCoinmarket';
import constantsNomi from './constants/constantsNomi';
import rp from 'request-promise';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/getBitcoin', (req, res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            'symbol': 'BTC'
        },
        headers: constantsCoinmarket,
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        res.send(response);
    }).catch((err) => {
        console.log('API call error:', err.message);
    })
});

app.get('/api/getBitcoinHistory', (req, res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://min-api.cryptocompare.com/data/v2/histominute',
        qs: {
            ...constantsNomi,
            'fsym': 'BTC',
            'tsym': 'USD',
            'limit': '15',
        },
        json: true
    };

    rp(requestOptions).then(response => {
        res.send(response);
    }).catch((err) => {
        console.log('API call error:', err.message);
    })
})

app.listen(PORT, function () {
    console.log('listening on port', PORT);
});

