import { Component } from 'react';
import './App.css';
import 'antd/dist/antd.dark.css'
// import 'antd/dist/antd.css'
import Owner from './components/Owner/Owner';
import Broker from './components/Broker/Broker';
import Buyer from './components/Buyer/Buyer';
import Shapley from './components/Shapley/Shapley';
import NowTime from './components/NowTime';
import background from './js/background.js';

class App extends Component {

    state = {
        dataset: '',
        bp: '',
        ps: '',
        shapleyValue: {}
    }

    //处理owner传过来的dataset
    handleDataset = (dataset) => {
        this.setState({dataset});
    }

    //处理owner传过来的bp
    handleBp = (bp) => {
        this.setState({bp});
    }

    //处理owner传过来的ps
    handlePs = (ps) => {
        this.setState({ps});
    }

    //处理owner传过来的shapleyValue
    handleSV = (shapleyValue) => {
        this.setState({shapleyValue})
    }
    
    
    render() {

        const { bp, ps, dataset, shapleyValue } = this.state;

        return (
            <div>
                <div>
                    <div className="canvas" style={{opacity: 0.2}}>
                        <iframe frameBorder="0" srcDoc={background} title="navigation" style={{width: '100%', height: '53rem'}}></iframe>
                    </div>
                    <div className="head">
                    <h1>Dealer</h1>
                        <div className="weather">
                            <NowTime />
                        </div>
                    </div>
                    <div className="mainbox">
                        <ul className="clearfix">
                            <li>
                                <Owner handleDataset={this.handleDataset} handleBp={this.handleBp} handlePs={this.handlePs}
                                    handelSV={this.handleSV}/>
                            </li>
                            <li>
                                <Shapley shapleyValue={shapleyValue}/>
                                <Broker bp={bp} ps={ps} dataset={dataset}/>
                            </li>
                            <li><Buyer /></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
