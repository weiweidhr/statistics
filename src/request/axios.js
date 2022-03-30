import axios from 'axios';
import {parseString} from '../tools.js';
export function get(data) {
    let url = 'http://api.waizaowang.com/doc/getPoolZT';
    url =  `${url}?${parseString(data)}`

    return axios.get(url).then(res=>{
       if (res.data.code === 200) {
        return res?.data;
       } else {
        return Promise.reject({errmsg: '出错喽,请稍后再试吧~'})
       }
    }).catch(error => {
        console.log(error.message)
        return Promise.reject(error)
    })
}
export const request = {
    get
}