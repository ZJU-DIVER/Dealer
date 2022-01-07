import React, { useState } from 'react';
import { Button, Table, Input, InputNumber, Popconfirm, Form, Typography, message } from 'antd';

export const AddDataPop = (props) => {

    const originData = props.surveyData;
  
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'epsilon' ? 
            <InputNumber style={{ width: '100%' }} min={0} step={0.01} /> 
            : inputType === 'price' ?
                <InputNumber style={{ width: '100%' }} min={0} step={0.01} precision={2}
                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/￥\s?|(,*)/g, '')}/> 
                : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
  
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [totalCount, setTotalCount] = useState(originData.length);
    const [editingKey, setEditingKey] = useState('');    //(全局)正在编辑的key值，初始化为空
    const { handleSurveyData, closeModal } = props
  
    const isEditing = (record) => record.key === editingKey;    //判断当前记录是否在编辑中

    // useEffect(() => { 
    //     console.log(data);;
    // }, [data]);
  
    //编辑函数，将原始值清空
    const edit = (record) => {
        form.setFieldsValue({
            id: '',
            epsilon: '',
            price: '',
            ...record,
        });
        setEditingKey(record.key);
    };
  
    //删除数据
    const deleteRow = (key) => {
        const nowData = [...data];
        setData(nowData.filter((item) => {
            return item.key !== key;
        }));
        setEditingKey('');
        //surveyData(data);
    };

    //增加数据
    const addNewRow = () => {
        if(editingKey==='') {
            const row = {
                id: totalCount + 1,
                key: totalCount + 1,
                epsilon: 0,
                price: 0,
            }
            setData([...data, row]);
            setTotalCount(totalCount + 1);
        } else {
            // message.info('Only one new data can be added');
            message.info('一次只能新增一条数据');
        }
    }
    
    //保存数据
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            //寻找key相等的数据，有则返回key,无则返回-1
            const index = newData.findIndex((item) => key === item.key);    
    
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
                setTotalCount(totalCount + 1);
            }
            //surveyData(data);
        } catch (errInfo) {
            //console.log('Validate Failed:', errInfo);
        }
    };

    //取消选中
    const cancel = () => {
        setEditingKey('');
    };
  
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '15%',
        },
        {
            title: '噪声',
            dataIndex: 'epsilon',
            width: '27%',
            editable: true,
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: '27%',
            editable: true,
            render: text => {
                // return '$ ' + text;
                return '￥ ' + text;
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <button className="btn-a-blue"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            {/* Save */}
                            保存
                        </button>
                    {/* <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}> */}
                    <Popconfirm title="确定删除吗?" onConfirm={() => deleteRow(record.key)} okText="确定" cancelText="取消">
                        {/* <button className="btn-a-blue">Delete</button> */}
                        <button className="btn-a-blue">删除</button>
                    </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        {/* Edit */}
                        编辑
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
    
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //确定修改调研数据
    const applySurvey = () => {
        submitSurvey(data);
        closeModal(true);
    }

    //关闭修改调研数据
    const cancelSurvey = () => {
        closeModal(true);
    }

    //提交调研数据
    const submitSurvey = (value) => {
        handleSurveyData(value);
    }

    return (
        <div>
            <div className="modalBackData">
                {/* <h2 className="popTitle">Edit Survey Data ：</h2> */}
                <h2 className="popTitle">编辑调研数据 ：</h2>
                <Button onClick={addNewRow} type="primary" style={{ marginBottom: 16, float: 'right'}} 
                    className="colorBtn" size='small'>
                    {/* Add Data */}
                    增加数据
                </Button>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        size="small"
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                            pageSize: 6,
                            position: ['bottomLeft']
                        }}
                    />
                </Form>
                <Button style={{ float: 'right', marginLeft: 8}} size='small' onClick={cancelSurvey}>
                    {/* Cancel */}
                    取消
                </Button>
                <Button type="primary" style={{ float: 'right'}} size='small' onClick={applySurvey}>
                    {/* Apply */}
                    确定
                </Button>
            </div>
        </div>
    );  
}

