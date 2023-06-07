import { getAllProjects, openViewer, processData, downloadVideo } from '@/services/ant-design-pro/api';
import { PageContainer, ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { SyncOutlined, CheckSquareTwoTone, UploadOutlined, PlayCircleTwoTone, ClockCircleTwoTone, CameraTwoTone } from '@ant-design/icons';
import { App, Spin, Button, Avatar, Card, Divider, Dropdown, Row, Col } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Empty } from 'antd';
// import { Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './welcome.css';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

// TODO 和服务器同步状态的一段代码
const { Meta } = Card;



const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



const items: MenuProps['items'] = [
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
    disabled: true
  },
]

function GetStateIcon(state) {
  if (state) {
    return <CheckSquareTwoTone />
  } else {
    return <SyncOutlined rotate={180} />
  }
}


const AvatarConvert = ({ imageData }) => {
  const dataUrl = `data:image/png;base64,${imageData}`;
  return <img src={dataUrl} alt='Base64 Image' width="260" height="160" />
}

function ProjectsCard(props) {
  // console.log(props.state)
  // console.log(props.state == 2)
  if (props.state == 0) {
    return <Meta
      title={props.title}
    />
  } else if (props.state == 1) {
    return <Meta
      title={props.title}
    />
  } else if (props.state == 2) {
    return <Meta
      title={props.title}
      style={{textAlign:"center"}}
    />
  } else {
    return <p>""</p>
  }

}




const Welcome: React.FC = () => {
  // const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');

  //ModalForm
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [EmptyMessage, setEmptyMessage] = useState(false);             // 空页面
  const { message, modal, notification } = App.useApp();     

  const [data, setData] = useState<Array<API.ProjectsAttribute>>([]);  // project数据

  //Antd Spin
  const [loading, setLoading] = useState(false);  

  const [hoveredIndex, setHoveredIndex] = useState(null);


  // 给后台留一点加载时间

  const toggle = (checked: boolean) => {
    setLoading(checked);
  };

  

  const container = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        // flexWrap: 'wrap',
        gap: 16,
        // height:'70vh',

      }}
    >

      {EmptyMessage ? <Row style={{ width: '100%' }}>   <Col span={8}></Col> <Col span={8}><Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={
          <span>
            您还没有上传模型，请创建一个吧:\(￣▽￣)/
          </span>
        }
      >
        <Button key="1" type="primary">
          <Link to="/upload">
            <PlusCircleTwoTone />
            创建模型
          </Link>
        </Button>
      </Empty>
      </Col>
      </Row> : null}
      <div style={{width:"100vh",height:"100vh"}}>
      <Row justify={'center'} >
      {data.map((item,index) => (
        
        
        <Col  span={8}>
        <Card 
          key={index}
          hoverable
          style={{
            width: 240
            , height: 'auto'
          }}
          
          cover={<AvatarConvert imageData={item.avatar} />}

          actions={[
            // TODO 需要判断是否已经重建完成来决定该图标状态

            <RenderButton title={item.title} state={item.state} />,
            
            <PanoButton title={item.title} />
            
            
          ]}

        >
          {hoveredIndex === index && (
            <Button className={"card-button"} href='/ShowPanorama' ghost>预览</Button>
          )}
          
          <ProjectsCard title={item.title} state={item.state} />
        </Card>
        </Col>
      ))}
      </Row>
      </div>
    </div>
  );
  
  const handleCardMouseEnter = (index) => {
    setHoveredIndex(index);
  }
  const handleCardMouseLeave = () => {
    setHoveredIndex(null);
  }

  //主页那个播放按钮
  function RenderButton(props) {
    const [ state, setState] = useState<number>(props.state);
    function showMessage() {
      message.success('Success!');
    }
    function showModal() {
      modal.warning({
        title: 'warning message',
        content: 'something went wrong',
      })
    }

    //发送打开渲染请求
    function handleRender (title: API.OpenViewerParams) {
      setLoading(true)
      openViewer(title)
        .then((response) => {
          console.log(response);
          const status = response.status;
          console.log(status)
          if (status == 'success') {
            setLoading(false);
            // {showMessage();}
            
            window.location.href = '/show_model?id='+title+'&websocket_url='+response.websocket_url;
          }

        })
        .catch((error) => {
          console.error('Open Viewer error:', error);
          // {showModal();}

        });
    }
    
    //发送runCOLMAP请求
    function handleData(title: API.HandleDataParams) {
      processData(title)
        .then((response) => {
          console.log(response.status);
          setState(1)
        })
        .catch((error) => {
          console.error('handleData error:', error);
        });
    }

    //根据请求返回的state改变按钮状态
    if (state == 2) {
      return <Button type='link' onClick={() => handleRender(props.title as API.OpenViewerParams)} block>
                <PlayCircleTwoTone key="start" twoToneColor="#52c41a" />
              </Button>
    } else if(state ==1) {
      return <Button  block>
                <ClockCircleTwoTone key="start"/>
              </Button>
    } else {
      return <Button type='link' onClick={() => handleData(props.title as API.HandleDataParams)}block>
                <PlayCircleTwoTone key="start" twoToneColor="#eb2f2f" />
              </Button>
    }
  }

  function PanoButton(props) {
    return <Button type='link' href='/ShowPanorama'>
              <CameraTwoTone key="pano"/>
            </Button>

  }

  //得到所有project
  useEffect(() => {
    getAllProjects().then(response => {
      console.log(response.projects);
      //如果是空的话，就不要setData了
      if (response.projects.length == 0) {
        //加入antd的空页面
        setEmptyMessage(true);
        return;
      } else {
        setData(response.projects);
      }
      //console.log(data[0]);
      console.log("success");
    })
      .catch(error => {
        console.error(error)
      })
      // const response = downloadVideo()
      
      // downloadVideo().then(response => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(response)
      //   reader.onload=()=>{
      //     if (reader.result !== null && typeof reader.result === 'string'){
      //       const link = document.createElement('a');
      //     link.href = reader.result
      //     link.setAttribute('download', 'video.mp4');
      //     document.body.appendChild(link)
      //     link.click()
      //     document.body.removeChild(link);
      //     }
          
      //   }
      // })
  }, [])
 
  return (
    <PageContainer
      extra={[
        // <Button key="1" type="primary">
        //   <Link to="/upload">
        //     <PlusCircleTwoTone />
        //     创建模型
        //   </Link>
        // </Button>,
      ]}
      style={{
        height: ''
      }}
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
        <Spin spinning={loading} delay={500}>
          {container}
        </Spin>
      </div>
    </PageContainer>
  );
};

export default Welcome;
