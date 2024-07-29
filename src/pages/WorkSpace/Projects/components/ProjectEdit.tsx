import { waitTime } from '@/utils';
import { FileImageOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { useState } from 'react';

export default function ProjectEdit() {
  const [form] = Form.useForm();
  const [cover, setCover] = useState<UploadFile | null>(null);

  const handlerCoverChange = (info: UploadChangeParam) => {
    if (info.fileList.length === 1) {
      setCover(info.file);
    } else {
      setCover(null);
    }
  };

  const onFinish = async () => {
    await waitTime(2000);
    alert('提交成功');
  };

  return (
    <div className="bg-white   rounded-xl shadow-xl flex justify-center">
      <Form form={form} onFinish={onFinish}>
        <div className="grid grid-cols-1 justify-items-start p-10">
          <Form.Item
            label="模型名称"
            name="title"
            rules={[{ required: true, message: '请输入名称' }]}
            className="col-span-2 w-full"
          >
            <Input placeholder="请输入名称" />
          </Form.Item>

          <Form.Item name="cover" className="w-full">
            <Upload
              accept="image/*"
              maxCount={1}
              onChange={handlerCoverChange}
              name="cover"
              fileList={cover ? [cover] : []}
              className="border-dotted border-2 bg-slate-50 flex flex-col w-full h-[100px] justify-center items-center rounded-lg"
            >
              <div className="font-bold text-center flex flex-col justify-center">
                <FileImageOutlined
                  style={{ fontSize: '40px', color: '#08c' }}
                  className="justify-center"
                />
                上传封面
              </div>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" className="w-[200px] h-[35px]">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}