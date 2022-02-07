import axios from 'axios';
import { browserHistory } from 'react-router';
import {ROOT_URL} from '../config/const';

const jwt_decode = require('jwt-decode');

// const ROOT_URL = 'http://localhost:3090';
export function getM2dData(res, month){
    const d = new Date();

    if(!month){
        month = d.getMonth()+1;
    }
    axios.post(`${ROOT_URL}/m2data/getM2dDataByMonth`,{month: month})
    .then(response => {
        res({data: response});
    })
    .catch(() => {
    });
}
