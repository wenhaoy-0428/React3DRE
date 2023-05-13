import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Divider } from 'antd';
import { RcFile, UploadFile, UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


const { TextArea } = Input;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [ImageFile, setImageFile] = useState([]);

  const handleAvatarChange = ( info: UploadChangeParam ) => {
    if (info.fileList.length === 1) {
      setAvatarFile(info.file);
    }else {
      setAvatarFile(null);
    }
    
  };
  const handleImageChange =  ( {imageFile} ) => {
    setImageFile(imageFile);
  };

  const onPreview = async (file : UploadFile) => {
    let src = file.url as string;
    if (!src){
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);

  }
  

  const onFinish = (values) => {
    console.log('Form values:', values);

    // 使用axios将表单数据提交给后端API
    const formData = new FormData();
    formData.append('title', values.name);
    formData.append('datetime', form.getFieldValue('date').format('YYYY-MM-DD'));
    formData.append('avatar', (avatarFile as RcFile).originFileObj)
    
    // ImageFile.forEach((file) => {
    //   formData.append('imageFiles', file.originFileObj);
    // });

    

    // 处理成功响应
    function handleResponse(response) {
      console.log('Form submission response:', response);
      setAvatarFile(null);
      setImageFile([]);
      message.success('表单提交成功')
    }

    //后端接口
    axios.post('http://10.177.35.76:8081/api/createProject',formData)
      .then((handleResponse) => {
        const chunkSize = 30;
        const chunks = [];
        for (let i = 0; i < ImageFile.length; i += chunkSize) {
          chunks.push(ImageFile.slice(i, i + chunkSize));
        }
        const uploadChunk = (chunkIndex = 0) => {
          if(chunkIndex >= chunks.length) {
            message.success('上传成功');
            setImageFile([]);
            return;
          }
          const formData = new FormData();
          formData.append('title', values.name)
          chunks[chunkIndex].forEach(file => {
            formData.append('imageFiles', file);
          })
          axios.post('http://10.177.35.76:8081/api/uploadImgs',formData)
          .then((response) => {
            uploadChunk(chunkIndex + 1)
            
          })
          .catch((error) => {
            console.error( error);
            message.error('上传失败')
            
          });
        }
        uploadChunk();
        
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
        <ImgCrop rotationSlider aspect={13/8}>
          <Upload 
            accept='image/*'
            listType='picture-card'
            maxCount={1}
            fileList={avatarFile ? [avatarFile]: []}
            onChange={handleAvatarChange}
            name='avatar'
            onPreview={onPreview}
            >
            {'上传'}
          </Upload>
        </ImgCrop>
      </Form.Item>

      {/* <Form.Item label="上传图片">
        <Upload 
          accept='image/*'
          fileList={ImageFile}
          //showUploadList={false}
          onChange={handleImageChange}
          name='imageFiles'
          multiple = {false}
          beforeUpload={()=>false}
          
          directory
          //onPreview={handlePreview}
          >
          
          <Button icon={<UploadOutlined/>}>上传文件</Button>
        </Upload>
      </Form.Item> */}

      {/* {input速度快} */}
      <Form.Item label="上传图片">
      <Input type='file' multiple
             onChange={e => handleImageChange({imageFile: [...e.target.files]})}
        >
      </Input>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" >
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;