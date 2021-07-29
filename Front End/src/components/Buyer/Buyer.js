import React, { Component } from 'react'
import { Divider } from 'antd'
import ChooseDataset from '../ChooseDataset/ChooseDataset'
import SearchModel from './SearchModel/SearchModel'
import ModelData from './ModelData/ModelData'
import CoverageExpt from './CoverageExpt/CoverageExpt'
import CoverageSens from './CoverageSens/CoverageSens'
import NoiseExpt from './NoiseExpt/NoiseExpt'
import NoiseSens from './NoiseSens/NoiseSens'
import TotalBudget from './TotalBudget/TotalBudget'

export default class Buyer extends Component {

    state = {
        chosenDataset: null,
        coverageExpt: null,
        coverageSens: null,
        noiseExpt: null,
        noiseSens: null,
        totalBudget: null,
        modelData: [],
    }

    //接收组件返回的数据集名称
    getChosenDataset = (chosenDataset) => {
        this.setState({chosenDataset});
        //console.log('ChooseDataset组件返回的数据集', chosenDataset);
    }
    
    getCoverageExpt = (coverageExpt) => {
        this.setState({coverageExpt});
    }
        
    getCoverageSens = (coverageSens) => {
        this.setState({coverageSens});
    }
        
    getNoiseExpt = (noiseExpt) => {
        this.setState({noiseExpt});
    }
        
    getNoiseSens = (noiseSens) => {
        this.setState({noiseSens});
    }
        
    getTotalBudget = (totalBudget) => {
        this.setState({totalBudget});
    }

    getModelData = (modelData) => {
        this.setState({modelData});
    }

    formSearchParams = () => {
        const { chosenDataset, coverageExpt, coverageSens, noiseExpt, noiseSens, totalBudget } = this.state;
        const searchParams = {
            dataset: chosenDataset,
            budget: totalBudget,
            covexp: coverageExpt,
            covsen: coverageSens,
            noiexp: noiseExpt,
            noisen: noiseSens
        }
        return searchParams;
    }

    render() {

        const searchParams = this.formSearchParams();
        const { modelData } = this.state;

        return (
            <div className={'panel'}>

                <ChooseDataset chosenDataset={this.getChosenDataset}/>

                <TotalBudget totalBudget={this.getTotalBudget}/>

                <CoverageExpt coverageExpt={this.getCoverageExpt}/>

                <CoverageSens coverageSens={this.getCoverageSens}/>

                <NoiseExpt noiseExpt={this.getNoiseExpt}/>

                <NoiseSens noiseSens={this.getNoiseSens}/>

                <SearchModel searchParams={searchParams} modelData={this.getModelData}/>

                <Divider orientation="middle"></Divider>

                <ModelData modelData={modelData} />

            </div>
        )
    }
}
