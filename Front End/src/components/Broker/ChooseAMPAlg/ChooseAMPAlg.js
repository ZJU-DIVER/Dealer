import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class ChooseAMPRAlg extends Component {

    handleChange = (value) => {
        this.props.ampAlg(value);
    }
    
    render() {

        return (
            <Select placeholder='Choose an Algorithm' style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="GREEDY">GREEDY</Option>
                <Option value="DP">DP</Option>
                <Option value="GUE-GRD">GUE-GRD</Option>
                <Option value="RANDOM">RANDOM</Option>
                {/* <Option value="ALL">ALL</Option> */}
            </Select>
        )
    }
}
