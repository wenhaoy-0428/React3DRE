import { getAllProjects } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import ProjectsCard from './ProjectCard';
import UploadPanel from './UploadPanel';

const handleTrain_N2M = () => {
  console.log('1');
};

const AvatarConvert = ({ imageData }) => {
  const dataUrl = `data:image/png;base64,${imageData}`;
  return <img src={dataUrl} alt="Base64 Image" width="260" height="160" />;
};

const Projects: React.FC = () => {
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
    <PageContainer className="overflow-auto h-[100vh]">
      <div>
        <Spin spinning={loading} delay={500}>
          <div className="page-content-wrapper flex justify-center flex-wrap items-start gap-10 ">
            {!projects.length ? (
              <UploadPanel />
            ) : (
              projects.map((project) => <ProjectsCard project={project} />)
            )}
          </div>
        </Spin>
      </div>
    </PageContainer>
  );
};

export default Projects;
