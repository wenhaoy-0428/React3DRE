import { createProject, uploadImages } from '@/services/ant-design-pro/api';
import { CheckCircleTwoTone, FileImageOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, DatePicker, Form, Input, message, Progress, Radio, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { useState } from 'react';

export default function UploadPanel() {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<UploadFile | null>(null);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const [percent, setPercent] = useState<number>(0);

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.fileList.length === 1) {
      setAvatarFile(info.file);
    } else {
      setAvatarFile(null);
    }
  };
  const handleImageChange = (info: UploadChangeParam) => {
    setImageFiles(info.fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values: any) => {
    let value = values as API.CreateProjectParams;
    value.datetime = form.getFieldValue('datetime').format('YYYY-MM-DD');
    value.avatar = avatarFile?.originFileObj;
    // 分批上传图片函数
    function uploadImage(id: any) {
      const chunkSize = 30;
      const chunks: any[] = [];
      for (let i = 0; i < imageFiles.length; i += chunkSize) {
        chunks.push(imageFiles.slice(i, i + chunkSize));
      }
      const uploadChunk = (chunkIndex = 0) => {
        if (chunkIndex >= chunks.length) {
          message.success('上传成功');

          setImageFiles([]);
          form.resetFields();
          return;
        }
        let newPercent = (chunkIndex + 1) / chunks.length;
        if (newPercent > 1) {
          newPercent = 1;
        }
        setPercent(newPercent);
        let value2: API.UploadImageParams = { id: id, imageFiles: chunks[chunkIndex] };
        // console.log(value2)

        uploadImages(value2)
          .then(() => {
            uploadChunk(chunkIndex + 1);
          })
          .catch((error) => {
            console.error(error);
            message.error('上传失败');
          });
      };
      uploadChunk();
    }

    // 先建项目，再分批传图片
    // 根据不同method分类

    createProject(value)
      .then((response) => {
        uploadImage(response.id);
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        message.error('工程创建失败');
      });
  };

  return (
    <div className="bg-white h-[600px] w-[600px] flex flex-col justify-center shadow-lg rounded-3xl">
      <div className="upload-panel-header flex  justify-center items-center">
        <div className="text-[20px] font-bold">您还没有上传模型，请创建一个吧:\(￣▽￣)/</div>
      </div>
      <Form form={form} onFinish={onFinish}>
        <div className="grid grid-cols-2 justify-items-start p-[30px]">
          <Form.Item
            label="模型名称"
            name="title"
            rules={[{ required: true, message: '请输入名称' }]}
            className="col-span-2 w-full"
          >
            <Input placeholder="请输入名称" />
          </Form.Item>

          <Form.Item
            label="输入日期"
            name="datetime"
            rules={[{ required: true, message: '输入日期' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item name="pano">
            <Radio.Group name="radiogroup">
              <Radio value={0}>透视图</Radio>
              <Radio value={1}>全景图</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="col-span-2 justify-self-center">
            <Form.Item name="avatar">
              <ImgCrop rotationSlider aspect={13 / 8}>
                <Upload
                  accept="image/*"
                  maxCount={1}
                  fileList={avatarFile ? [avatarFile] : []}
                  onChange={handleAvatarChange}
                  name="avatar"
                  onPreview={onPreview}
                  className="border-dotted border-2 bg-slate-50 flex flex-col w-[500px] h-[100px] justify-center items-center rounded-lg"
                >
                  <div className="font-bold text-center flex flex-col justify-center">
                    <FileImageOutlined
                      style={{ fontSize: '40px', color: '#08c' }}
                      className="justify-center"
                    />
                    上传封面
                  </div>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </div>

          {/* {input速度快，不会卡死} */}
          <div className="col-span-2 justify-self-center">
            <Form.Item label="">
              <Upload
                accept="image/*"
                multiple
                fileList={imageFiles}
                onChange={handleImageChange}
                name="avatar"
                showUploadList={false}
                onPreview={onPreview}
                className="border-dotted border-2 bg-slate-50 flex flex-col w-[500px] h-[100px] justify-center items-center rounded-lg"
              >
                {imageFiles.length ? (
                  <CheckCircleTwoTone style={{ fontSize: '40px', color: '#08c' }} />
                ) : (
                  <div className="font-bold text-center flex flex-col justify-center">
                    <InboxOutlined
                      style={{ fontSize: '40px', color: '#08c' }}
                      className="justify-center"
                    />
                    上传图片
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>
        </div>
        <Form.Item className="flex justify-center">
          {percent > 0 && (
            <Progress
              className="col-span-2"
              percent={Math.round(percent * 100)}
              status={imageFiles.length > 0 ? 'active' : 'normal'}
            />
          )}
          <Button type="primary" htmlType="submit" className="w-[300px] h-[35px]">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
