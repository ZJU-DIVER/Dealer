import React, { useState, useEffect } from 'react';
import { Button, Table, Input, InputNumber, Popconfirm, Form, Typography, message } from 'antd';

const originData = [];
  
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
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}/> 
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
  
export const EditableTable = (props) => {
    
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [totalCount, setTotalCount] = useState(originData.length);
    const [editingKey, setEditingKey] = useState('');    //(全局)正在编辑的key值，初始化为空
    const { surveyData } = props
  
    const isEditing = (record) => record.key === editingKey;    //判断当前记录是否在编辑中

    useEffect(() => { 
        surveyData(data);
    }, [data]);
  
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
            return item.key !== key 
        }));
        setEditingKey('');
        //surveyData(data);
    };

    //增加数据
    const addNewRow = () => {
        if(editingKey==='') {
            const newData = [...data, {
                key: totalCount,
                id: totalCount,
            }];
            //console.log(newData);
            setData(newData);
            setEditingKey(totalCount);
            setTotalCount(totalCount+1);
        } else {
            message.info('Only one new data can be added');
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
                setTotalCount(++totalCount);
            }
            //surveyData(data);
        } catch (errInfo) {
            //console.log('Validate Failed:', errInfo);
        }
    };
  
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '15%',
        },
        {
            title: 'epsilon',
            dataIndex: 'epsilon',
            width: '27%',
            editable: true,
        },
        {
            title: 'price',
            dataIndex: 'price',
            width: '27%',
            editable: true,
            render: text => {
                return '$ ' + text;
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
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

    return (
        <div className={'singleDisplayGrid'}>
            <p className={'optionName'}>Add Survey Data ：</p>
            <Button onClick={addNewRow} type="primary" style={{ marginBottom: 16, float: 'right'}} 
                className="colorBtn" size='small'>
                Add Data
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
                        onChange: deleteRow,
                        // hideOnSinglePage:true, 
                        pageSize: 10
                    }}
                />
            </Form>
            </div>
    );
};
