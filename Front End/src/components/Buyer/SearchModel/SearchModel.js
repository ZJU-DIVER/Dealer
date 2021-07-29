import React, { Component } from 'react'
import { Button, message } from 'antd'
import axios from 'axios'

export default class SearchModel extends Component {

    state = {
        loading: false,
    };

    start = () => {
        this.setState({ loading: true });
        const { searchParams } = this.props;
        //console.log(searchParams);
        //console.log("searchParams", searchParams);
        for(let key in searchParams) {
            if(searchParams[key]!==null && searchParams[key]!==0 && searchParams[key]!==undefined) {
                this.modelExp(searchParams);
                return ;
            }   
        }
        this.modelAll();
    };

    modelAll = () => {
        //console.log("modelAll");
        axios.get('http://47.114.83.154:8080/model/all').then(
            response => {
                //console.log("请求所有模型成功",response.data.payload);
                this.props.modelData(response.data.payload);
                this.setState({ loading: false });
            },
            error => {
                console.log("请求所有模型失败");
                this.setState({ loading: false });            
            }
        )
    }

    modelExp = (searchParams) => {
        //console.log("modelExp");
        // const flag = this.judgeInput(searchParams);
        // if(flag === false) {
        //     this.setState({ loading: false });
        //     return ;
        // }
        axios.post('http://47.114.83.154:8080/model/exp', {
            "dataset": searchParams.dataset,
            "budget": searchParams.budget,
            "covexp": searchParams.covexp,
            "covsen": searchParams.covsen,
            "noiexp": searchParams.noiexp,
            "noisen": searchParams.noisen,
        }).then(
            response => {
                //console.log("请求预算内模型成功", response.data.payload);
                if(response.data.payload.length === 0)
                    message.info("There is no model satisfied");
                this.props.modelData(response.data.payload);
                this.setState({ loading: false });
            },
            error => {
                console.log("请求预算内模型失败");
                this.setState({ loading: false });
            }
        )
    }

    judgeInput = (searchParams) => {
        if(!searchParams.dataset) {
            message.info("Please choose a dataset");
            return false;
        }
        if(!searchParams.budget || searchParams.budget===0) {
            message.info("Please enter your total budget");
            return false;
        }
        if(!searchParams.covexp) {
            message.info("Please enter your coverage expactation");
            return false;
        }
        if(!searchParams.covsen) {
            message.info("Please enter your coverage sensitivity");
            return false;
        }
        if(!searchParams.noiexp) {
            message.info("Please enter your noise expactation");
            return false;
        }
        if(!searchParams.noisen) {
            message.info("Please enter your noise sensitivity");
            return false;
        }
        return true;
    }

    render() {

        const { loading } = this.state;

        return (
            <div className={'singleDisplayGrid'} style={{ margin:'11% auto'}}>
                {/* <p className={'optionName'}>Max Revenue Algorithm  ：</p> */}
                <Button type="primary" className="colorBtn" block loading={loading} onClick={this.start}>Search</Button>
            </div>
        )
    }
}
