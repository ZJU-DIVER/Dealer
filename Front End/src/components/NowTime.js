import React, { Component } from 'react'

export default class NowTime extends Component {

    state = {
        time: new Date()
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({
                time: new Date()
           })  
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }


    render() {

        const { time } = this.state

        return (
            <div>
                <span style={{fontSize:'0.85rem', float:'left'}}>
                    {time.getFullYear()}-{time.getMonth()+1<10?'0'+time.getMonth()+1:time.getMonth()+1}-{time.getDate()<10?'0'+time.getDate():time.getDate()}&nbsp;
                    {time.getHours()<10?'0'+time.getHours():time.getHours()}:{time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()}:{time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds()}
                </span>
            </div>
        )
    }
}
