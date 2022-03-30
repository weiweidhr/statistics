import 'antd/dist/antd.css';
import '../styles/operatingSpace.css';
import React from "react";
import { DatePicker} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;


export default class Operate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: []
        }
    }
    componentDidMount() {
        this.getStartDate()
    }

    cb(msg) {
        this.props.callback(msg)
    }

    getStartDate() {
        let startDate = new Date()
        startDate.setTime(startDate.getTime()-30*24*60*60*1000)
        this.setState({
            date: [startDate, new Date()]
        })
    }

    render() {
        return (
            <div className="date_box">
                <span className="demonstration">日期范围: </span>
                <RangePicker    locale={locale}
                                disabledDate={ current => current < moment().endOf('day') } 
                                defaultValue={this.state.date} 
                                onChange = {date => {
                                    console.log('RangePicker-change', date)
                                    this.setState({date})
                                    this.cb(date);
                                }} />
               
            </div>
        )
    }
}