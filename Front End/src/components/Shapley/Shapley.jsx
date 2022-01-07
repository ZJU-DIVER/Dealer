import React, { Component } from 'react'
import '../../style/shapley.css'
import Echarts from './Echarts'

export default class Shapley extends Component {
    render() {

        const { shapleyValue } = this.props;

        return (
            <div style={{height:'21rem'}}>
                <Echarts shapleyValue={shapleyValue}></Echarts>
            </div>
        )
    }
}
