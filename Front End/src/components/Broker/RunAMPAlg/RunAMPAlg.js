import React, { Component } from 'react'
import { Button, message } from 'antd'
import axios from 'axios'

export default class RunAMPRAlg extends Component {

    state = {
        loading: false,
    }

    runAMPAlg = () => {
        this.setState({ loading: true});
        const { ampParams } = this.props;
        if(!ampParams ||!ampParams.dataset || !ampParams.shapley_mode) {
            message.info("Please choose the dataset and AMP Algorithm");
            this.setState({ loading: false});
            return ;
        }
        if(!ampParams.price || ampParams.price.length === 0) {
            message.info("Please add survey data and run algorithms above first");
            this.setState({ loading: false});
            return ;
        }
        if(ampParams.shapley_mode === 'ALL') {
            this.ampAllAlg(ampParams);
        }else{
            this.ampShapleyAlg(ampParams);
        }

    }

    ampAllAlg = (ampParams) => {
        axios.post('http://47.114.83.154:8080/amp',{
            dataset: ampParams.dataset,
            num_repeats: 1,
            epsilon: ampParams.epsilon,
        }).then(
            response => {
                //console.log("请求all成功", response.data.payload);
                let res = [], i = 0;
                ampParams.price.map((item) => {
                    res = [...res, {
                        id: i,
                        epsilon: ampParams.epsilon[i],
                        coverage: 1,
                        price: ampParams.price[i],
                    }];
                    i++;
                })
                this.props.ampAlgResult(res);
                this.setState({ loading: false});
            },
            error => {
                console.log("请求all失败", error);
                this.props.ampAlgResult('');
                message.info('No result');
                this.setState({ loading: false});
            }
        )
    }

    ampShapleyAlg = (ampParams) => {
        if(ampParams.budget === 0 || ampParams.shapley_mode === null || ampParams.budget === null 
            || ampParams.bp === null || ampParams.ps === null ) {
            message.info("Please enter the budget/ base price/ privacy sensitivity");
            this.setState({ loading: false});
            return ;
        }
        axios.post('http://47.114.83.154:8080/amp_shapley',{
            dataset: ampParams.dataset,
            shapley_mode: ampParams.shapley_mode,
            num_repeats: 1,
            epsilon: ampParams.epsilon,
            price: ampParams.price,
            budget: ampParams.budget,
            bp: ampParams.bp,
            ps: ampParams.ps
        }).then(
            response => {
                //console.log("请求"+ampParams.shapley_mode+"成功", response.data.payload);
                this.props.ampAlgResult(response.data.payload);
                this.setState({ loading: false});
            },
            error => {
                console.log("请求"+ampParams.shapley_mode+"失败", error);
                this.props.ampAlgResult('');
                message.info('No result');
                this.setState({ loading: false});
            }
        )
    }
    
    render() {

        const { loading } = this.state;

        return (
            <Button onClick={this.runAMPAlg} loading={loading} type="link">OK</Button>
        )
    }
}
