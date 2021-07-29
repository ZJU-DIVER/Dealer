import React, { Component } from 'react'
import { Button, message } from 'antd'
import axios from 'axios'

export default class PriceSandMaxRAlg extends Component {

    state = {
        loading: false,
    };

    start = () => {
        this.setState({ loading: true });
        //处理数据
        const survey = this.formSurveyData(this.props.surveyData);
        //console.log("处理后数据", survey);
        //发送请求
        if(survey.length === 0 || !survey) {
            this.setState({ loading: false });
            message.info("Please add survey data");
            return ;
        }
        axios.post('http://47.114.83.154:8080/write_survey', {
            "survey": survey,
        }).then(
            response => {
                //console.log("发送请求成功", response.data.payload);
                this.props.psmrAlgResult(response.data.payload);
                this.setState({ loading: false });
            },
            error => {
                console.log("发送请求失败", error);
                this.setState({ loading: false });
            }
        )
    };

    formSurveyData = (surveyData) => {
        let resData = [];
        surveyData.map((item) => {
            resData =  [...resData, {
                eps: item.epsilon,
                pri: item.price,
            }]
        })
        return resData;
    }



    render() {

        const { loading } = this.state;
        const { surveyData } = this.props;

        return (
            <div style={{ margin: surveyData.length === 0 ? '8% auto 0':'4% auto 0'}}>
            {/* <div style={{ margin: '9% auto 0'}}> */}
                <p className={'optionName'}>Revenue Maximation Algorithm ：</p>
                <Button type="primary" className="colorBtn" block loading={loading} onClick={this.start}>Begin</Button>
            </div>
        )
    }
}
