import {risingData} from '../mock/rising.js';
import {request} from './axios'
import {transformTimestamp} from '../tools';

export function getData(data={}) {
    return request.get(data).then(res=>{
        let obj = {};
        res.data = res.data.sort((a, b) => {
            return transformTimestamp(a.tdate) - transformTimestamp(b.tdate);
        })
        res.data.forEach(item => {
            if (obj[item.tdate]) {
                obj[item.tdate] = obj[item.tdate] + 1
            } else {
                obj[item.tdate] = 1
            }
        })
        return obj
    })
}

export function getRising() {
    return Promise.resolve(risingData)
}
