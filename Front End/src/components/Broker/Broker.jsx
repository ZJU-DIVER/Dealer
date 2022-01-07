import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import '../../style/general.css'
import '../../style/broker.css'
import Survey from './Survey'
import Design from './Design'
import line_blue from '../../images/line_blue.png'

export default class Broker extends Component {

    state = {
        tab: 'survey',
        price: [],
    }

    //切换survey和design的tab
    changeTab = (value) => {
        this.setState({tab: value});
    }

    //处理survey传过来的price
    handlePrice = (price) => {
        this.setState({price});
    }

    render() {

        const { tab, price } = this.state;
        const { bp, ps, dataset } = this.props
    
        return (
            <BrowserRouter>
                <div className="boxall" style={{height:'25rem', margin:'0 0.5rem'}}>
                    <div className="alltitle">中间商</div>
                    <div className="line">
                        <div className="title-box">
                            <p className="switchBtn">
                                <Link to="/">
                                    <span className={tab==='survey'? 'active': ''} onClick={()=>this.changeTab('survey')}>
                                        {/* Survey */}
                                        调研
                                    </span>
                                </Link>
                                <img className="line-img" src={line_blue} alt=""/>
                                <Link to="/design">
                                    <span className={tab==='design'? 'active': ''} onClick={()=>this.changeTab('design')}>
                                        {/* Design */}
                                        设计
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="line">
                        <Switch>
                            <Route path="/" exact> 
                                <Survey handlePrice={this.handlePrice}/>
                            </Route>
                            <Route path="/design">
                                <Design ps={ps} bp={bp} price={price} dataset={dataset}/>
                            </Route>
                        </Switch>
                    </div>
                    <div className="boxfoot"></div>
                </div>
            </BrowserRouter>
        )
    }
}
