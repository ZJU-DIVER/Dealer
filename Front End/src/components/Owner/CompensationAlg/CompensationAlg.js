import React, { Component } from 'react'
import { Button, message } from 'antd'
import axios from 'axios'

export default class CompensationAlg extends Component {

    state = {
        loading: false,
    }

    setLoading = (flag) => {
        this.setState({loading: flag});
    };

    calCompensation = () => {
        //设置loading效果
        this.setLoading(true);
        //发送计算请求
        const { dataset, id, bp, ps, eps, sample} = this.props.comParams;
        const flag = this.judgeInput( dataset, id, bp, ps, eps, sample);
        if(flag === false) {
            this.setLoading(false);
            return ;
        }
        //console.log("传入Compensation的id", id);
        axios.post('http://47.114.83.154:8080/shapley', {
            "dataset": dataset,
            "id": id,
            "bp": bp,
            "ps": ps,
            "eps": eps,
            "sample": sample
        }).then(
            response => {
                //console.log("计算Compensation成功，返回值", response.data);
                this.props.compensationValue(response.data.payload);
                this.setLoading(false);
            },
            error => {
                console.log("计算Compensation失败", error);
                this.setLoading(false);
            }
        );
    };

    judgeInput = ( dataset, id, bp, ps, eps, sample ) => {
        if(dataset === null || id.length === 0) {
            this.setLoading(false);
            message.info("Please choose the dataset and data");
            return false;
        }
        if(bp === null || ps === null || eps === null || sample === null) {
            this.setLoading(false);
            message.info("Please enter all items");
            return false;
        }
        return true;
    }


    render() {

        const { loading } = this.state

        return (
            <div style={{ margin:'9% auto 10%'}}>
                <Button type="primary" className="colorBtn" block loading={loading} onClick={this.calCompensation}>Begin</Button>
            </div>
        )
    }
}
