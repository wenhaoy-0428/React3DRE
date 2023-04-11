import { UploadOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Upload } from 'antd';
import React, { useRef } from 'react';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateModel: React.FC = () => {
  const useFormRef = useRef<ProFormInstance>();

  return (
    // TODO: 需要加一个返回按钮
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={useFormRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="创建模型"
          stepProps={{
            description: '这里填入的都是基本信息',
          }}
          onFinish={async () => {
            console.log(useFormRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="模型名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="日期" />
          <ProFormText name="address" label="地点" width="md" placeholder="请输入地点" />
          <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          name: string;
        }>
          name="check"
          title="信息补充"
          stepProps={{
            description: '这里填入文件信息',
          }}
          onFinish={async () => {
            console.log(useFormRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="迁移类型"
            width="lg"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="业务 DB 用户名" />
            <ProFormDatePicker name="datetime" label="记录保存时间" width="sm" />
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="上传文件"
          stepProps={{
            description: '这里导入源文件',
          }}
        >
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
            <Button icon={<UploadOutlined />}>Upload Image Directory</Button>
          </Upload>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default CreateModel;
