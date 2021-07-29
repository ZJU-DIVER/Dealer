import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import Owner from './components/Owner/Owner'
import Broker from './components/Broker/Broker'
import Buyer from './components/Buyer/Buyer'
import 'antd/dist/antd.css'
import './App.css'

export default class App extends Component {

    render() {

        return (

            <div className="App">
                
                <Row gutter={12}>
                    <Col span={8}>
                        <Card title="Owner" className="cardTop" bordered={false}
                            headStyle={{backgroundColor:'#979797',color:'white'}} >
                            <Owner/>
                        </Card>
                        <Card title="Owner" className="cardBottom" bordered={false}
                            headStyle={{backgroundColor:'#979797',color:'white'}}
                            bodyStyle={{border:"1px solid #979797",display:"none"}}>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Broker" className="cardTop" bordered={false}
                            headStyle={{backgroundColor:'#979797',color:'white'}} >
                            <Broker/>
                        </Card>
                        <Card title="Broker" className="cardBottom" bordered={false}
                            headStyle={{backgroundColor:'#979797',color:'white'}}
                            bodyStyle={{border:"1px solid #979797",display:"none"}} >
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Buyer" className="cardTop" bordered={false} 
                            headStyle={{backgroundColor:'#979797',color:'white'}} >
                            <Buyer/>
                        </Card>
                        <Card title="Buyer" className="cardBottom" bordered={false}
                            headStyle={{backgroundColor:'#979797',color:'white'}}
                            bodyStyle={{border:"1px solid #979797",display:"none"}} >
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
    
}
