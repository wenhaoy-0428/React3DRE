import { getProjectsInfo } from '@/services/ant-design-pro/api';
import { PageContainer , ModalForm, ProFormText, ProFormUploadButton} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { SyncOutlined, CheckSquareTwoTone } from '@ant-design/icons';
import { Button, Avatar, Card, Divider, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState, useEffect} from 'react';
import axios from 'axios';
// import { Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

// TODO 和服务器同步状态的一段代码
const { Meta } = Card;

const waitTime = (time:number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



const items: MenuProps['items'] =[
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer' href=''>
        1st menu item
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a target='_blank' rel='noopener noreferrer' href=''>
        2st menu item
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a target='_blank' rel='noopener noreferrer' href=''>
        3st menu item
      </a>
    ),
    disabled:true
  },
]

function GetStatusIcon(status) {
  if(status){
    return <CheckSquareTwoTone/>
  }else {
    return <SyncOutlined rotate={180}/>
  }
}


const AvatarConvert = ({imageData}) => {
  const dataUrl = `data:image/png;base64,${imageData}`;
  return <img src={ dataUrl } alt='Base64 Image' width="260" height="160"/>
}

const Welcome: React.FC = () => {
  // const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');

  //ModalForm
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);


  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://10.177.35.76:8080/api/getAllProjects').then(response =>
      {
        console.log(response.data.projects)
        setData(response.data.projects);
        console.log(data)
        console.log("success")
      })
      .catch(error => {
        console.error(error)
      })
  }, [])


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
    >
      {/* TODO 这个Divider 太丑了 */}
      <Divider></Divider>
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {data.map((item) => (
            
            <Card
              key={ item.id }
              hoverable
              style={{ width: 240 }}
              cover={<AvatarConvert imageData={item.avatar}/>}
              
              actions={[
                // TODO 需要判断是否已经重建完成来决定该图标状态
                <PlayCircleOutlined key = "start" />,
                // TODO 新开一个页面
                <ModalForm
                  
                  title = "编辑信息"
                  formRef={restFormRef}
                  open={modalVisible}
                  trigger={
                    
                    <EditOutlined  key="edit" />
                    
                  }
                  onOpenChange={setModalVisible}
                  submitter={{
                    searchConfig: {
                      resetText:'重置',
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
                      width = "md"
                      name = "title"
                      label = "模型名称"
                      tooltip = ''
                      placeholder={item.title}
                      />
                    <ProFormUploadButton
                      name = "avatar"
                      label = "封面"
                      max = {1}
                      fieldProps={{
                        name : "file",
                        listType: 'picture-card'
                      }}
                      />
                  
                </ModalForm>,
                
                // TOOD 一个下拉菜单
                <Dropdown menu={{items}}>
                  
                  <a onClick={(e) => e.preventDefault()}>
                    <EllipsisOutlined key="extra"/>
                  </a>
                </Dropdown>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>} 
                title={item.title} 
                
              />
              <GetStatusIcon status={item.status}/>
          </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
