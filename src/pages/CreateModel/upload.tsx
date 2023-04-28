import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';


const { TextArea } = Input;

const MyForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log('Form values:', values);

    // 使用axios将表单数据提交给后端API
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('bio', values.bio);

    fileList.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    axios.post('http://yourbackendapi.com/submit-form', formData)
      .then((response) => {
        console.log('Form submission response:', response);
        // 处理成功响应
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        // 处理错误响应
      });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadProps = {
    fileList,
    onChange: handleFileChange,
    multiple: true,
    maxCount: 3,
    accept: '.jpg,.jpeg,.png',
    name: 'files',
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  };

  return (
    
    <Form form={form} onFinish={onFinish}>
      <Button key="1" type="primary">
          <Link to="/workspace">
            
            返回主页
          </Link>
      </Button>
      <Form.Item
        label="模型名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input placeholder="请输入名称" />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input placeholder="请输入日期" />
      </Form.Item>

      <Form.Item
        label="地点"
        name="bio"
        
      >
        <TextArea placeholder="请输入" rows={4} />
      </Form.Item>

      <Form.Item label="上传图片">
        <Upload {...uploadProps}>
          <Button>上传文件</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;