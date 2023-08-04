import { useState ,useMemo} from 'react';
import { Upload ,Drawer, Form, Input,Message, Avatar } from '@arco-design/web-react';
import { User,addTableData,updateTableData,AxiosgetALL } from '../api/User';
import UploadView from './Upload';
type FormProps = {
  visible: boolean;
  setVisible: (b: boolean) => void;
  editItem?: User;
  callback:(editItem?: Partial<User>)=>void;
};

function UserForm({ visible, setVisible, editItem,callback }: FormProps) {
  const title = useMemo(
    () => (editItem._id ? '更新' : '新增') + "用户信息",
    [editItem._id]
  );
  const onSubmit = () => {
    // form.validate(async (errors)=>{})
    form.validate(async (errors) => {
      const operation = editItem._id ? '编辑' : '新增';
      if (!errors) {
        // 根据标识符决定新增或更新
        if (editItem._id) {
          const editedItem = form.getFieldsValue();
          const {ok}=await updateTableData(editItem._id,editedItem)          
          
          if (ok) {
            callback()
            Message.success(operation + '用户修改成功!');
            setVisible(false);
          } else {
            Message.error(operation + '用户失败，请重试!');
          }
        } else {
          const editedItem = Object.assign(editItem,form.getFieldsValue(),);
          const { ok, data } = await addTableData(editedItem); 
          if (ok) {
            callback && callback(data);
            Message.success(operation + '用户成功!');
            setVisible(false);
          } else {
            Message.error(operation + '用户失败，请重试!');
          }
        }
      }
    });
  };
  const [form] = Form.useForm()
  return (
    <Drawer

      width={400}
      title={title}
      visible={visible}
      onOk={() => {
        onSubmit();
      }}
      onCancel={() => {
        setVisible(false);
      }}
      afterOpen={() => {
        form.setFieldsValue(editItem);
      }}
      afterClose={() => {
  
        form.resetFields();
      }}
    >   
      <Form form={form}>
        <Form.Item onClick={()=>{AxiosgetALL()}} label="手机号" field="phoneNumber"
        rules={
        [{required: true,message:"手机号是必填的"},{match:/^1[3456789]\d{9}$/,message:"请输入手机号"}]
        }
        >
        
          <Input placeholder="请输入手机号"  />
        </Form.Item>
        <Form.Item label="用户名称" field="name"  rules={[{ required: true, message: '用户名是必填项' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="邮箱" field="email">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="组织" field="organization">
          <Input placeholder="请输入组织名称" />
        </Form.Item>
        <Form.Item label="职位" field="job">
          <Input placeholder="请输入职位" />
        </Form.Item>
        <Form.Item label="个人站点" field="personalWebsite">
          <Input placeholder="请输入个人站点URL" />
        </Form.Item>
        <Form.Item label="密码" field="password">
          <Input placeholder="请输入个人站点URL" />
        </Form.Item>
        <Form.Item label="地址" field="location">
          <Input placeholder="请输入个人站点URL" />
        </Form.Item>
        <Form.Item label="avatar" field="avatar">
         <UploadView/>
        </Form.Item>
        <Form.Item label="jobName" field="jobName">
          <Input placeholder="请输入个人站点URL" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default UserForm;
