import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import SelectCurrency from './SelectCurrency'
import Calendar from './Calendar'

function date(value) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
  }

function delay(ms) {  // делаем искусственную задержку
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, ms);
    })
}



export default class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: {
                labels: [],
                datasets: [
                  {
                    label: '',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgb(253, 53, 4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(253, 53, 4)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                  }
                ]
              },
              loaded: false,
              currency: '145',
              startDate: '2020-07-10',
              endDate: '2020-07-17',

        }
    }

    draw() {
        let clonedState = {...this.state}
        clonedState.data.datasets[0].data = [];
        fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${this.state.currency}?startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
        .then(res => res.json())
        .then(content=> {
            clonedState.data.datasets[0].data = content.map(i => {
                return i.Cur_OfficialRate
            })
            clonedState.data.labels = content.map(i => {
                return date(i.Date)
            })
            delay(1000).then(() => {
                this.setState({
                    data:  clonedState.data,
                    loaded: true,
                 })
            })
        })
    }

    componentDidMount(){
        this.draw();
    }


    async setCurrency(value) {
        await this.setState(()=>{
            return {
                loaded: false,
                currency: value
            }
        })
        this.draw();   
    }

    async setCurrentDate(start, end) {
        await this.setState(()=>{
            return {
                loaded: false,
                startDate: start,
                endDate: end,
            }
        }) 
        this.draw();
    }

    render() {
        return (
            <div className="main-content">
                <div className="main-content-controller">
                    <h1>График</h1>
                    <SelectCurrency setCurrency={this.setCurrency.bind(this)}/>
                    <Calendar setCurrentDate={this.setCurrentDate.bind(this)}/>
                </div>
                {
                    this.state.loaded ? (
                        <Line 
                            data={this.state.data} 
                            width={100}
                            height={200}
                            options={{ maintainAspectRatio: false }} 
                        />
                    )
                     : <div className="lds-hourglass"></div>
                }
            </div>
        )
    }
}
