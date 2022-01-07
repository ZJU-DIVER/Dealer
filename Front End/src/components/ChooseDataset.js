import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class ChooseDataset extends Component {

    state={
        dataset:''
    }
    
    handleChange = (dataset) => {
        this.setState({dataset});
        this.props.chosenDataset(dataset);
    }

    render() {
        
        return (
            <div style={{marginTop:'0.9rem'}}>
                {/* <span className="lineTitle">Choose Dataset : </span> */}
                <span className="lineTitle">请选择数据集 :</span>
                <Select style={{ width: '56%' }} size="small" onChange={this.handleChange}>
                    <Option value="iris">Iris</Option>
                    <Option value="chess">Chess</Option>
                    <Option value="cancer">Breast Cancer</Option>
                </Select>
            </div>
        )
    }
}
