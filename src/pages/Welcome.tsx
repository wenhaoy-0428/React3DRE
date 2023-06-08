import { getAllProjects, openViewer, processData, downloadVideo } from '@/services/ant-design-pro/api';
import { PageContainer, ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { SyncOutlined, CheckSquareTwoTone, UploadOutlined, PlayCircleTwoTone, ClockCircleTwoTone, CameraTwoTone } from '@ant-design/icons';
import { App, Spin, Button, Avatar, Card, Divider, Dropdown, Row, Col, Tooltip, Space } from 'antd';
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

const projects = [
  {
    title:"养老家园沙盘",
    state: 2,
    id:1,
    avatar: "imgs/2.png"
  },
  {
    title:"杨浦滨江",
    state: 2,
    id:2,
    avatar: "imgs/1.png" 
  }
]
  
   
console.log(projects)



function ProjectsCard(props) {
  return  <Meta
            title={props.title}
            style={{textAlign:"center",height:'30px'} }
          />
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
      <div id='card-container-flag'style={{width:"100vh",height:"100vh"}}>
      <Row justify={'center'} >
      {projects.map((item,index) => (
        
        
        <Col  span={10}>
        <Card 
          key={index}
          hoverable
          style={{
            width: 300
            , height: 360
          }}
          
          cover={<img src={item.avatar} width="300" height="240" />}

          actions={[
            //  需要判断是否已经重建完成来决定该图标状态
            <div style={{height:'45px'}}>
              <Row>
                <Col span={4}></Col>
                <Col span={6}>
                <Tooltip title="" color='orange' >
                  <RenderButton title={item.title} state={item.state} />
                
                </Tooltip>
                </Col>
                <Col span={4}></Col>
                <Col span={6} >
                <Tooltip overlay="" color='orange' >
                  <PanoButton title={item.title} />
                </Tooltip>
                </Col>
                <Col span={4}></Col>
              
                
            
              </Row>
              
             
            
            </div>
            
            
            
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
                {/* <PlayCircleTwoTone key="start" twoToneColor="#52c41a" style={{fontSize:'18px'}}/><br/> */}
                开始渲染
              </Button>
    } else if(state ==1) {
      return <Button  block>
                {/* <ClockCircleTwoTone key="start"/> */}
              </Button>
    } else {
      return <Button type='link' onClick={() => handleData(props.title as API.HandleDataParams)}block>
                {/* <PlayCircleTwoTone key="start" twoToneColor="#eb2f2f" /> */}
                
              </Button>
    }
  }

  function PanoButton(props) {
    if (props.title == '养老家园沙盘') {
      return <Button type='link' href='/showPanorama_2'>
              {/* <CameraTwoTone key="pano" style={{fontSize:'18px'}}/> */}
              浏览全景
            </Button>
    }else if (props.title == '杨浦滨江') {
      return <Button type='link' href='/showPanorama_1'>
              {/* <CameraTwoTone key="pano" style={{fontSize:'18px'}}/> */}
              浏览全景
            </Button>
    }

    

  }

  // //得到所有project
  // useEffect(() => {
  //   getAllProjects().then(response => {
  //     console.log(response.projects);
  //     //如果是空的话，就不要setData了
  //     if (response.projects.length == 0) {
  //       //加入antd的空页面
  //       setEmptyMessage(true);
  //       return;
  //     } else {
  //       setData(response.projects);
  //     }
  //     //console.log(data[0]);
  //     console.log("success");
  //   })
  //     .catch(error => {
  //       console.error(error)
  //     })

  //     //下载视频示例（浏览器下载）
  //     // const response = downloadVideo()
      
  //     // downloadVideo().then(response => {
  //     //   const reader = new FileReader();
  //     //   reader.readAsDataURL(response)
  //     //   reader.onload=()=>{
  //     //     if (reader.result !== null && typeof reader.result === 'string'){
  //     //       const link = document.createElement('a');
  //     //     link.href = reader.result
  //     //     link.setAttribute('download', 'video.mp4');
  //     //     document.body.appendChild(link)
  //     //     link.click()
  //     //     document.body.removeChild(link);
  //     //     }
          
  //     //   }
  //     // })
  // }, [])
 
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
