import React, { Component } from 'react'
import { Table, Button } from 'antd'

const cancerColumns = [
    {title: 'id',dataIndex: 'key', fixed: 'left', key: 'pk', width:50},
    {title: 'radius_mean',dataIndex: 'radius_mean', key: 'radius_mean', width:100},
    {title: 'texture_mean',dataIndex: 'texture_mean', key: 'texture_mean', width:110},
    {title: 'perimeter_mean',dataIndex: 'perimeter_mean', key: 'perimeter_mean', width:130},
    {title: 'area_mean',dataIndex: 'area_mean', key: 'area_mean', width:100},
    {title: 'smoothness_mean',dataIndex: 'smoothness_mean', key: 'smoothness_mean', width:140},
    {title: 'compactness_mean',dataIndex: 'compactness_mean', key: 'compactness_mean', width:150},
    {title: 'concavity_mean',dataIndex: 'concavity_mean', key: 'concavity_mean', width:120},
    {title: 'concave_points_mean',dataIndex: 'concave_points_mean', key: 'concave_points_mean', width:160},
    {title: 'symmetry_mean',dataIndex: 'symmetry_mean', key: 'symmetry_mean', width:130},
    {title: 'fractal_dimension_mean',dataIndex: 'fractal_dimension_mean', key: 'fractal_dimension_mean', width:180},
    {title: 'radius_se',dataIndex: 'radius_se', key: 'radius_se', width:100},
    {title: 'texture_se',dataIndex: 'texture_se', key: 'texture_se', width:100},
    {title: 'perimeter_se',dataIndex: 'perimeter_se', key: 'perimeter_se', width:100},
    {title: 'area_se',dataIndex: 'area_se', key: 'area_se', width:100},
    {title: 'smoothness_se',dataIndex: 'smoothness_se', key: 'smoothness_se', width:120},
    {title: 'compactness_se',dataIndex: 'compactness_se', key: 'compactness_se', width:120},
    {title: 'concavity_se',dataIndex: 'concavity_se', key: 'concavity_se', width:100},
    {title: 'concave_points_se',dataIndex: 'concave_points_se', key: 'concave_points_se', width:150},
    {title: 'symmetry_se',dataIndex: 'symmetry_se', key: 'symmetry_se', width:100},
    {title: 'fractal_dimension_se',dataIndex: 'fractal_dimension_se', key: 'fractal_dimension_se', width:160},
    {title: 'radius_worst',dataIndex: 'radius_worst', key: 'radius_worst', width:100},
    {title: 'texture_worst',dataIndex: 'texture_worst', key: 'texture_worst', width:120},
    {title: 'perimeter_worst',dataIndex: 'perimeter_worst', key: 'perimeter_worst', width:130},
    {title: 'area_worst',dataIndex: 'area_worst', key: 'area_worst', width:100},
    {title: 'smoothness_worst',dataIndex: 'smoothness_worst', key: 'smoothness_worst', width:140},
    {title: 'compactness_worst',dataIndex: 'compactness_worst', key: 'compactness_worst', width:150},
    {title: 'concavity_worst',dataIndex: 'concavity_worst', key: 'concavity_worst', width:130},
    {title: 'concave_points_worst',dataIndex: 'concave_points_worst', key: 'concave_points_worst', width:160},
    {title: 'symmetry_worst',dataIndex: 'symmetry_worst', key: 'symmetry_worst', width:130},
    {title: 'diagnosis',dataIndex: 'diagnosis', key: 'diagnosis', width:100},
];

const chessColumns = [
    {title: 'id',dataIndex: 'key', fixed: 'left', key: 'pk', width:50},
    {title: 'arr1',dataIndex: 'arr1', key: 'arr1', width:50},
    {title: 'arr2',dataIndex: 'arr2', key: 'arr2', width:50},
    {title: 'arr3',dataIndex: 'arr3', key: 'arr3', width:50},
    {title: 'arr4',dataIndex: 'arr4', key: 'arr4', width:50},
    {title: 'arr5',dataIndex: 'arr5', key: 'arr5', width:50},
    {title: 'arr6',dataIndex: 'arr6', key: 'arr6', width:50},
    {title: 'arr7',dataIndex: 'arr7', key: 'arr7', width:50},
    {title: 'arr8',dataIndex: 'arr8', key: 'arr8', width:50},
    {title: 'arr9',dataIndex: 'arr9', key: 'arr9', width:50},
    {title: 'arr10',dataIndex: 'arr10', key: 'arr10', width:60},
    {title: 'arr11',dataIndex: 'arr11', key: 'arr11', width:60},
    {title: 'arr12',dataIndex: 'arr12', key: 'arr12', width:60},
    {title: 'arr13',dataIndex: 'arr13', key: 'arr13', width:60},
    {title: 'arr14',dataIndex: 'arr14', key: 'arr14', width:60},
    {title: 'arr15',dataIndex: 'arr15', key: 'arr15', width:60},
    {title: 'arr16',dataIndex: 'arr16', key: 'arr16', width:60},
    {title: 'arr17',dataIndex: 'arr17', key: 'arr17', width:60},
    {title: 'arr18',dataIndex: 'arr18', key: 'arr18', width:60},
    {title: 'arr19',dataIndex: 'arr19', key: 'arr19', width:60},
    {title: 'arr20',dataIndex: 'arr20', key: 'arr20', width:60},
    {title: 'arr21',dataIndex: 'arr21', key: 'arr21', width:60},
    {title: 'arr22',dataIndex: 'arr22', key: 'arr22', width:60},
    {title: 'arr23',dataIndex: 'arr23', key: 'arr23', width:60},
    {title: 'arr24',dataIndex: 'arr24', key: 'arr24', width:60},
    {title: 'arr25',dataIndex: 'arr25', key: 'arr25', width:60},
    {title: 'arr26',dataIndex: 'arr26', key: 'arr26', width:60},
    {title: 'arr27',dataIndex: 'arr27', key: 'arr27', width:60},
    {title: 'arr28',dataIndex: 'arr28', key: 'arr28', width:60},
    {title: 'arr29',dataIndex: 'arr29', key: 'arr29', width:60},
    {title: 'arr30',dataIndex: 'arr30', key: 'arr30', width:60},
    {title: 'arr31',dataIndex: 'arr31', key: 'arr31', width:60},
    {title: 'arr32',dataIndex: 'arr32', key: 'arr32', width:60},
    {title: 'arr33',dataIndex: 'arr33', key: 'arr33', width:60},
    {title: 'arr34',dataIndex: 'arr34', key: 'arr34', width:60},
    {title: 'arr35',dataIndex: 'arr35', key: 'arr35', width:60},
    {title: 'label',dataIndex: 'label', key: 'label', width:60},
];

const irisColumns = [
    {title: 'id',dataIndex: 'key', fixed: 'left', key: 'pk'},
    {title: 'sepallength',dataIndex: 'sepallength', key: 'sepallength'},
    {title: 'sepalwidth',dataIndex: 'sepalwidth', key: 'sepalwidth'},
    {title: 'label',dataIndex: 'label', key: 'label'},
];

const nullColumns = [
    {title: ' ', dataIndex: ' ',},
];

export default class DataPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selected: props.selectedData,
        }
    }

    //对传输过来的原数据进行处理
    handleAllData = (rawData) => {
        //console.log("开始处理数据", rawData);
        let processedData = [];
        if(rawData) {
            rawData.map((item) => {
                item.fields.pk = item.pk;
                item.fields.key = item.pk;
                processedData = [...processedData, item.fields];
                return 0;
            })
        }
        //console.log("处理后数据", allData);
        return processedData;
    }

    //改变选择数据
    onSelectChange = (selectedRowKeys) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selected:selectedRowKeys})
    };

    //确定选择
    applySelect = () => {
        this.submitSelect(this.state.selected);
        this.props.closeModal(true);
    }

    //关闭选择
    cancelSelect = () => {
        this.props.closeModal(true);
    }

    //提交改变
    submitSelect = (value) => {
        this.props.handleSelect(value);
    }

    //清空所选项
    clearSelected = () => {
        this.setState({
            selected: [],
        });
    };

    //随机生成20个点
    randomGenerate = (data) => {
        let selectedGen = [];
        for(let i=0; i<20; i++) {
            selectedGen = [...selectedGen, Math.floor(Math.random()*(data.length))];
        }
        this.setState({
            selected: selectedGen
        });
    }

    render() {

        // 生成数据表
        const { dataset , allData, loadingTable } = this.props;
        //console.log("数据表获取的数据 in ChooseData", dataset, allData);
        const column = (dataset === 'cancer'? cancerColumns : 
                        dataset === 'chess' ? chessColumns : 
                        dataset === 'iris' ? irisColumns : nullColumns);
        const data = this.handleAllData(allData);

        //获取选中的数据
        const { loading, selected } = this.state;
        const rowSelection = {
            selectedRowKeys: selected,
            onChange: this.onSelectChange,
        };

        const hasSelected = selected.length > 0;

        return (
            <div>
                <div className="modalBackSelect">
                    <div style={{ marginBottom: 16 }}>
                        <span style={{ marginLeft: 8, fontSize: '90%', color: 'white'}}>
                            {hasSelected ? 
                                // `Selected ${selected.length} items : ${selected}`
                                // : 'no item selected'}
                                `已选择 ${selected.length} 条数据 : ${selected}`
                                : '未选择数据'}
                        </span>
                        <Button type="primary" onClick={this.clearSelected} disabled={!hasSelected} 
                            loading={loading} style={{ float: 'right', display: !hasSelected ? 'none':'block'}} 
                            size='small' className="colorBtn" >
                            {/* Clear */}
                            清空
                        </Button>
                        <Button type="primary" onClick={() => this.randomGenerate(data)} disabled={hasSelected}  
                            loading={loading} style={{ float: 'right', display: hasSelected? 'none':'block'}} 
                            size='small' className="colorBtn">
                            {/* Random (20) */}
                            随机选取（20）
                        </Button>
                    </div>
                    <Table rowSelection={rowSelection} dataSource={data} size='small' bordered
                        columns={column} scroll={{ x: 40 }} loading={loadingTable}
                        pagination={{defaultPageSize: 10, pageSizeOptions:[5,10], position: ['bottomLeft']}}
                        /> 
                    <Button style={{ float: 'right', marginLeft: 8}} size='small' onClick={this.cancelSelect}>
                        {/* Cancel */}
                        取消
                    </Button>
                    <Button type="primary" style={{ float: 'right'}} size='small' onClick={this.applySelect}>
                        {/* Apply */}
                        确定
                    </Button>
                </div>
            </div>
        )
    }
}

