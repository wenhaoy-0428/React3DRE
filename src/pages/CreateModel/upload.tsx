import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Divider } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


const { TextArea } = Input;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [ImageFile, setImageFile] = useState<RcFile[]>([]);

  const handleAvatarChange = ( info: UploadChangeParam ) => {
    if (info.fileList.length === 1) {
      setAvatarFile(info.file);
    }else {
      setAvatarFile(null);
    }
    
  };
  const handleImageChange =  ( info: UploadChangeParam ) => {
    setImageFile(info.fileList);
  };
  

  const onFinish = (values) => {
    console.log('Form values:', values);

    // 使用axios将表单数据提交给后端API
    const formData = new FormData();
    formData.append('title', values.name);
    formData.append('datetime', form.getFieldValue('date').format('YYYY-MM-DD'));
    formData.append('avatar', (avatarFile as RcFile).originFileObj)
    //console.log(avatarFile.originFileObj)
    ImageFile.forEach((file) => {
      formData.append('imageFiles', file.originFileObj);
    });

    //后端接口
    axios.post('http://10.177.35.76:8080/api/startTrain',formData)
      .then((response) => {
        console.log('Form submission response:', response);
        setAvatarFile(null);
        setImageFile([]);
        // 处理成功响应
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        message.error('表单提交失败')
        // 处理错误响应
      });
  };

  
  const uploadAvatarProps = {
    avatarFile,
    onchange:handleAvatarChange,
    mutiple:false,
    accept: 'image/*',
    name:'avatar'
  }
  const uploadImageProps = {
    ImageFile,
    onChange: handleImageChange,
    multiple: true,
    accept: 'images/*',
    name: 'files',
  };

  return (
    
    <Form form={form} onFinish={onFinish}>
      <Button key="1" type="primary">
          <Link to="/workspace">
            
            返回主页
          </Link>
      </Button>
      <Divider/>
      <Form.Item
        label="模型名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input placeholder="请输入名称" />
      </Form.Item>

      <Form.Item
        label="请输入日期"
        name="date"
        rules={[{ required: true, message: '请输入日期' }]}
      >
        <DatePicker format="YYYY-MM-DD"/>
      </Form.Item>

      <Form.Item label="上传封面">
        <Upload 
          accept='image/*'
          maxCount={1}
          fileList={avatarFile ? [avatarFile]: []}
          onChange={handleAvatarChange}
          name='avatar'
          >
          <Button icon={<UploadOutlined/>}>上传文件</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="上传图片">
        <Upload 
          accept='image/*'
          fileList={ImageFile}
          onChange={handleImageChange}
          name='imageFiles'
          multiple = {true}
          directory
          //onPreview={handlePreview}
          >
          
          <Button icon={<UploadOutlined/>}>上传文件</Button>
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