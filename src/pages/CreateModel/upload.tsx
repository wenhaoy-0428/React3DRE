import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Divider, Progress, Select, Radio, Space } from 'antd';
import { RcFile, UploadFile, UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { createProject, createProject_N2M, uploadImages, uploadImages_N2M } from '@/services/ant-design-pro/api';
import type { FormInstance } from 'antd/es/form';
import { Category } from '@mui/icons-material';

const { TextArea } = Input;
const { Option } = Select;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [ImageFile, setImageFile] = useState([]);

  const [percent, setPercent] = useState(Number);

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

  const [category, setCategory] = useState('')
  const [method, setMethod] = useState<Number>()

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    const currentCategory = form.getFieldValue('category')
    // console.log(currentCategory)
    if (currentCategory === 'render') {
      form.setFieldsValue({method:'0'});
      setMethod(0)
    }
    if (currentCategory === 'mesh') {
      form.setFieldsValue({method:'1'});
      setMethod(1)
    }
    
    // console.log(method) 
  }
  const handleMethodChange = (value) => {
    setMethod(value)
    
  }

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
    

    let value = values as API.UploadCreateProjectParams;
    value.datetime = form.getFieldValue('datetime').format('YYYY-MM-DD');
    value.avatar = (avatarFile as RcFile).originFileObj

    // 分批上传图片函数
    function uploadImage() {
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
          let newPercent = (chunkIndex+1) / chunks.length
          if (newPercent > 1) {
            newPercent = 1;
          }
          setPercent(newPercent) 
          let value2:API.UploadImageParams = {'title': values.title,'imageFiles':chunks[chunkIndex]}
          // console.log(value2)
          
          if (method == 0) {
            uploadImages(value2)
              .then((response) => {
                uploadChunk(chunkIndex + 1)
                
              })
              .catch((error) => {
                console.error( error);
                message.error('上传失败')
                
              });
          }
          if (method == 1) {
            uploadImages_N2M(value2)
              .then((response) => {
                uploadChunk(chunkIndex + 1)
                
              })
              .catch((error) => {
                console.error( error);
                message.error('上传失败')
                
              });
          }
          
        }
        uploadChunk();
    }

    // 先建项目，再分批传图片
    // 根据不同method分类
    if (method == 0) {
      createProject(value).then(() => {
        uploadImage()
      }).catch((error) => {
        // console.error('Form submission error:', error);
        message.error('工程创建失败')
      })
    } else if (method == 1) {
      createProject_N2M(value).then(() => {
        uploadImage()
      }).catch((error) => {
        message.error('工程创建失败')
      })
    }

  };

  

  
  // const uploadAvatarProps = {
  //   avatarFile,
  //   onchange:handleAvatarChange,
  //   mutiple:false,
  //   accept: 'image/*',
  //   name:'avatar'
  // }
  // const uploadImageProps = {
  //   ImageFile,
  //   onChange: handleImageChange,
  //   multiple: true,
  //   accept: 'images/*',
  //   name: 'files',
  // };

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
        name="title"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input placeholder="请输入名称" />
      </Form.Item>

      {/* <Form.Item
        label="选择方法"
        name="method"
        rules={[{ required: true, message: '渲染或生成表面' }]}
      >
        <Select
          placeholder="Select a option"
          onChange={}
        >

        </Select>
      </Form.Item> */}

      <Form.Item
        name='category'
        label="选择方法"  
        rules={[{ required: true, message: '渲染或生成表面' }]}
      >

        <Radio.Group value={category} onChange={handleCategoryChange} >
          <Radio.Button value="render">渲染</Radio.Button>
          <Radio.Button value="mesh">网格</Radio.Button>
        </Radio.Group> 

      </Form.Item>
      <Form.Item
        name='method'
        >
        {category === 'render' && (
          
          <Select value={method} 
            onChange={handleMethodChange} 
            defaultValue={0}
            options={[
              { value: 0, label: 'NerfStudio' },
              
            ]}/>
            
        )}
        {category === 'mesh' && (
          <Select value={method} 
          onChange={handleMethodChange} 
          defaultValue={1}
          options={[
            { value: 1, label: 'Nerf2Mesh' }
          ]}/>
        )
        }
       
        
      </Form.Item>

      <Form.Item
        label="请输入日期"
        name="datetime"
        rules={[{ required: true, message: '请输入日期' }]}
      >
        <DatePicker format="YYYY-MM-DD"/>
      </Form.Item>

      <Form.Item 
        label="上传封面"
        name="avatar"
      >
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

      {/* {input速度快，不会卡死} */}
      <Form.Item label="上传图片">
      <Input type='file' multiple
             onChange={e => handleImageChange({imageFile: [...e.target.files]})}
        >
      </Input>
      </Form.Item>
      <Progress
        percent={Math.round((percent) * 100)}
        status = {ImageFile.length > 0 ? 'active':'normal'}
        />

      

      <Form.Item>
        <Button type="primary" htmlType="submit" >
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;