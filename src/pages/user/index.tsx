"use strict";
import {Card,Button,Space,Typography,Table,TableColumnProps,Popconfirm,Message} from '@arco-design/web-react';
import { useState, } from 'react';
import {usePagination} from 'ahooks';
import DrawerForm from './components/form';
import { getTableData,deleteTableData,initial} from './api/User';


// ----------------------------------------------------------------

export default function User(){

 const {data,pagination,loading,refresh}= usePagination(getTableData,{
  defaultCurrent:1,
  defaultPageSize:2,  
})
const columns: TableColumnProps[] = [
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
  },
  
  {
    title: '用户名称',
    dataIndex: 'name',
  },
  {
    title: '用户头像',
    dataIndex: 'avatar',
    render:(value)=>{    
      return <img src={value} width='50'/>
  }
  },
  {
    title: '邮箱',
    dataIndex: 'edit',
    placeholder:'_'  
  },
  {
    title:'操作',
    dataIndex:'operation',
    render:(_:unknown,record)=>(
      <>
      <Button
      type='text'
      size='small'
      onClick={()=>tableCallback(record,'edit')}
      >编辑</Button>
      
      <Popconfirm
       focusLock title='确认删除吗?' okText='确认' cancelText='取消'
       onOk={()=>tableCallback(record,'delete')}
      >
        <Button type='text' size='small'>删除</Button>
      </Popconfirm>

      </>
    )
  }
];
const tableCallback = async (record, operation) => {
  if (operation === 'delete') {
    const { ok } = await deleteTableData(record._id);
    if (ok) {
      Message.success('删除用户成功!');
      refresh(); // 刷新
    } else {
      Message.error('删除用户失败!');
    }
  }
  if (operation==='edit') {
    console.log("Edit",1);
   
   setVisible(true)
   add(record)
    // Edit(record)
  }
};

const [visible,setVisible]=useState(false)
const [editItem,setEditItem]=useState(initial)
const add=(e?)=>{
  setEditItem(e)
  setVisible(true)
}
  const Title=Typography.Title
  const Text=Typography.Text


  return <>
   <Card  >
    <Title heading={6}>用户管理</Title>
    <Space direction='vertical' style={{width:'100%'}}  >
      <Button type='primary' onClick={()=>{add(initial)}} style={{marginBottom:10}}>新增</Button>
      <Text> 
   <Table data={data?.list} loading={loading}     columns={columns} rowKey="_id" pagination={pagination}  style={{width:'100%'}}  ></Table>
</Text>
    </Space>

   </Card>
  <DrawerForm {...{visible,setVisible,editItem,callback:()=>{refresh()} }}></DrawerForm>

  </>
}
