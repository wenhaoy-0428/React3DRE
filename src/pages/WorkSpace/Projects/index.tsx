import { getAllProjects } from '@/services/ant-design-pro/api';
import { EditOutlined, EllipsisOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Button, Card, Dropdown, message, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { waitTime } from '@/utils';
import UploadPanel from './UploadPanel';

const handleTrain_N2M = () => {
  console.log('1');
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Button type="text">1st</Button>
      // <a target='_blank' rel='noopener noreferrer' href=''>
      //   1st menu item
      // </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href=" javascript:void(0)" onClick={handleTrain_N2M}>
        Nerf2Mesh
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        3st menu item
      </a>
    ),
    disabled: true,
  },
];

// function GetStateIcon(state) {
//   if (state) {
//     return <CheckSquareTwoTone />;
//   } else {
//     return <SyncOutlined rotate={180} />;
//   }
// }

const AvatarConvert = ({ imageData }) => {
  const dataUrl = `data:image/png;base64,${imageData}`;
  return <img src={dataUrl} alt="Base64 Image" width="260" height="160" />;
};

const Projects: React.FC = () => {
  // const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');

  //ModalForm
  const restFormRef = useRef<ProFormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const { message, modal, notification } = App.useApp();
  const [projects, setProjects] = useState<Array<API.ProjectsAttribute>>([]); // project数据

  //Antd Spin
  // TODO: LOADING YWH
  const [loading, setLoading] = useState(false); // 给后台留一点加载时间

  //得到所有project
  useEffect(() => {
    getAllProjects()
      .then((response) => {
        console.log(response);
        //TODO: YWH reverse back
        if (response.data.length === 0) {
          return;
        } else {
          setProjects(response.data);
        }
        console.log('success');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <PageContainer
      extra={[
        <Button key="1" type="primary">
          <Link to="/upload">
            <PlusCircleTwoTone />
            创建模型
          </Link>
        </Button>,
      ]}
      style={{
        height: '',
      }}
    >
      <div>
        <Spin spinning={loading} delay={500}>
          <div className="page-content-wrapper flex justify-center items-center">
            {projects.length ? (
              <UploadPanel />
            ) : (
              projects.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  style={{
                    width: 240,
                    height: 'auto',
                  }}
                  cover={<AvatarConvert imageData={item.avatar} />}
                  actions={[
                    // <Popover
                    //   content={content(
                    //     item.id,
                    //     item.colmap_state,
                    //     item.ns_state,
                    //     item.n2m_state,
                    //     item.gs_state,
                    //   )}
                    //   title="训练进度"
                    // >
                    //   <PartitionOutlined />
                    // </Popover>,
                    // <RenderButton title={item.title} state={item.state} />,

                    <ModalForm
                      title="编辑信息"
                      formRef={restFormRef}
                      open={modalVisible}
                      trigger={<EditOutlined key="edit" />}
                      onOpenChange={setModalVisible}
                      submitter={{
                        searchConfig: {
                          resetText: '重置',
                        },
                        resetButtonProps: {
                          onClick: () => {
                            restFormRef.current?.resetFields();
                          },
                        },
                      }}
                      onFinish={async (values) => {
                        await waitTime(2000);
                        console.log(values);
                        message.success('提交成功');
                        return true;
                      }}
                    >
                      <ProFormText
                        width="md"
                        name="title"
                        label="模型名称"
                        tooltip=""
                        placeholder={item.title}
                      />
                      <ProFormUploadButton
                        name="avatar"
                        label="封面"
                        max={1}
                        fieldProps={{
                          name: 'file',
                          listType: 'picture-card',
                        }}
                      />
                    </ModalForm>,

                    // TOOD 一个下拉菜单
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <EllipsisOutlined key="extra" />
                      </a>
                    </Dropdown>,
                  ]}
                >
                  {/* <ProjectsCard title={item.title} state={item.state} /> */}
                </Card>
              ))
            )}
          </div>
        </Spin>
      </div>
    </PageContainer>
  );
};

export default Projects;
