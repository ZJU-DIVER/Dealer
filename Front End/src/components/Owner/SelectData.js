import React, { Component } from 'react'
import Modal from '../Modal';
import DataPopup from './DataPopup'

const cancerColumns = [
    'id',
    'radius_mean',
    'texture_mean',
    'perimeter_mean',
    'area_mean',
    'smoothness_mean',
    'compactness_mean',
    'concavity_mean',
    'concave_points_mean',
    'symmetry_mean',
    'fractal_dimension_mean',
    'radius_se',
    'texture_se',
    'perimeter_se',
    'area_se',
    'smoothness_se',
    'compactness_se',
    'concavity_se',
    'concave_points_se',
    'symmetry_se',
    'fractal_dimension_se',
    'radius_worst',
    'texture_worst',
    'perimeter_worst',
    'area_worst',
    'smoothness_worst',
    'compactness_worst',
    'concavity_worst',
    'concave_points_worst',
    'symmetry_worst',
    'diagnosis',
];

const chessColumns = [
    'id',
    'arr1',
    'arr2',
    'arr3',
    'arr4',
    'arr5',
    'arr6',
    'arr7',
    'arr8',
    'arr9',
    'arr10',
    'arr11',
    'arr12',
    'arr13',
    'arr14',
    'arr15',
    'arr16',
    'arr17',
    'arr18',
    'arr19',
    'arr20',
    'arr21',
    'arr22',
    'arr23',
    'arr24',
    'arr25',
    'arr26',
    'arr27',
    'arr28',
    'arr29',
    'arr30',
    'arr31',
    'arr32',
    'arr33',
    'arr34',
    'arr35',
    'label',
];

const irisColumns = [
    'id',
    'sepallength',
    'sepalwidth',
    'label',
];

export default class SelectData extends Component {

    state = {
        showModal: false,
    };
    
    //modal打开
    handleShow = () => {
        if(this.props.allData.length!==0) {
            this.setState({showModal: true});
        }
    }
      
    //modal关闭
    handleHide = (flag) => {
        if(flag) {
            this.setState({showModal: false});
        }
    }

    //在页面展示几条选中数据
    getSample = (rawData, selectedData) => {
        let sampleData = [];
        selectedData.sort(function(a, b){return a - b});
        // console.log("selectedData", selectedData);
        if(rawData.length!==0) {
            for (let i = 0; i < 6; i++) {
                if(selectedData.length>i) {
                    rawData[selectedData[i]].fields.id = rawData[selectedData[i]].pk;
                    sampleData = [...sampleData, rawData[selectedData[i]].fields];
                } else {
                    sampleData = [...sampleData, {}];
                }
            }
            return sampleData;
        }
        return [{},{},{},{},{},{}];
    }

    //将收到的选择数据传给owner
    handleSelect = (selectedData) => {
        this.props.handleSelect(selectedData);
    }

    render() {

        const { dataset, allData, loadingTable, selectedData } = this.props

        const column = (dataset === 'cancer'? cancerColumns : 
            dataset === 'chess' ? chessColumns : irisColumns);

        const sampleData = this.getSample(allData, selectedData).map((row, index) => (
            <tr key={index}>
                {column.map((col, i) => (
                    <td key={i}>{row[col]}</td>
                ))}
            </tr>
        ))

        const modal = this.state.showModal ? (
            <Modal>
                <div className="modal">
                    <DataPopup allData={allData} dataset={dataset} loadingTable={loadingTable} 
                        closeModal={this.handleHide} handleSelect={this.handleSelect} selectedData={selectedData}>
                    </DataPopup>
                </div>
            </Modal>
        ) : null;

        return (
            <div style={{marginTop:'0.4rem'}}>
                {/* <span className="lineTitle">Select Data From the Dataset : </span> */}
                <span className="lineTitle">从数据集中选取数据 : </span>
                <div className="tb tb_left">
					<table>
                        <thead>
                            <tr className="tb_title">
                                {column.map((item, index) => (
                                    <td key={index}>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData}
                        </tbody>
					</table>
				</div>
                <div>
                    {/* <button className="btn-a" style={{float:'right'}} onClick={this.handleShow}>{"More >"}</button> */}
                    <button className={allData.length!==0?"btn-a":"btn-a-grey"} style={{float:'right'}} onClick={this.handleShow}>{"详情 >"}</button>
                    {modal}
                </div>
            </div>
        )
    }
}
