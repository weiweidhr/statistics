import React from "react";
import '../styles/chart.css'
import * as echarts from 'echarts';
import {getData, getRising} from '../request/index';
import {getDate} from '../tools';

const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {},
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '上涨家数',
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '涨停家数',
        position: 'left',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '涨停家数',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        lineStyle: {
          normal: {
            color: '#FF8539'
          }
        },
        itemStyle: {
          normal: {
            color: '#FF8539'
          }
        },
        data: []
      },
      {
        name: '上涨家数',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        lineStyle: {
          normal: {
            color: '#255CFF'
          }
        },
        itemStyle: {
          normal: {
            color: '#255CFF'
          }
        },
        data: []
      }
    ]
  };


export default class chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          date: props.date || [],
          nub: ''
        }
    }

    componentDidMount() {
      this.init();
      this.getData().then(() => {
        this.getStorage()
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.date !== this.props.date) {
         console.log('date数据改变了');
         this.getData();
      }
      if (prevProps.nub !== this.props.nub) {
        console.log('缓存改变了');
        this.getStorage()
      }
    }

    static getDerivedStateFromProps(props, current_state) {
      if(props.date !== current_state.date){
          return {
              date: props.date
          }
      }
      return null
    }

    getStorage() {
      getRising().then(risingData => {
        let rising = localStorage.getItem("rising");
        rising = rising ? JSON.parse(rising) : {};
        rising = {
          ...risingData,
          ...rising
        }
        option.series[1].data = option.xAxis[0].data.map(item => {
          return rising[item] ? Number(rising[item]) : 0
        })
        this.setOption()
      })
     
    }

    getData() {
      this.myChart.showLoading()
      let data = {
        fields: 'tdate',
        export: 1,
        token: 'aa08e884fc6381935b54bae131778fce'
      }
      if (Array.isArray(this.state.date) && this.state.date.length) {
        data.startDate = getDate(this.state.date[0])
        data.endDate = getDate(this.state.date[1])
      } else {
        data.startDate = getDate(new Date().getTime() - 30*24*60*60*1000)
        data.endDate = getDate(new Date().getTime())
      }

      return getData(data).then(res => {
          option.xAxis[0].data = Object.keys(res);
          option.series[0].data = Object.values(res);
          this.setOption();
          this.myChart.hideLoading()
      }).catch(() => {
        this.myChart.hideLoading()
        return Promise.reject()
      })
    }

    init() {
        const chartDom = document.getElementById('main');
        this.myChart = echarts.init(chartDom);
    }

    setOption() {
      this.myChart.setOption(option);
    }

    render() {
        return (
            <div id="main" className="box"></div>
        )
    }
}
