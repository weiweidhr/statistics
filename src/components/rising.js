import React from "react";
import {getDate} from '../tools'
import { Input } from 'antd';
import '../styles/rising.css';

export default class Rising extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nub: ''
        }
    }

    save = () => {
        let today = getDate(new Date().getTime())
        let rising = localStorage.getItem("rising");
        rising = rising ? JSON.parse(rising) : {}
        rising = {
            ...rising,
            [today]: this.state.nub
        }
        localStorage.setItem("rising", JSON.stringify(rising));
        this.props.save(this.state.nub)
    }

    render() {
        return (
            <div className="rising_box">
                <Input  className="input_box" 
                        placeholder="请输入今日上涨家数" 
                        value={this.state.nub} 
                        onChange = {e => {
                            console.log('onChange', e.nativeEvent.data)
                            this.setState({nub: e.nativeEvent.data})
                        }} />
                <div className="rising_btn" onClick={this.save}>保存</div>
            </div>
        )
    }

}