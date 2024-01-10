import { getAllProjects, runTrain_NS, openNerfViewer, runColmapAndTrain_NerfStudio, runColmap_Common, runTrain_3DGS, openViewer_3DGS } from '@/services/ant-design-pro/api';
import { PageContainer, ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { SyncOutlined, CheckSquareTwoTone, UploadOutlined, PlayCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { App, Spin, Button, Avatar, Card, Divider, Dropdown, Row, Col, RadioChangeEvent, Popover } from 'antd';
import type { MenuProps } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Empty, Modal, Radio, Timeline, message } from 'antd';
// import { Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PlusCircleTwoTone,
  ClockCircleOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
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


const handleTrain_N2M=()=>{
  console.log('1')
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Button type="text">1st</Button>
      // <a target='_blank' rel='noopener noreferrer' href=''>
      //   1st menu item
      // </a>
    )
  },
  {
    key: '2',
    label: (
      <a  rel='noopener noreferrer' href=' javascript:void(0)' onClick={handleTrain_N2M} >
        Nerf2Mesh
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
  return (
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
      title={props.title}
    />
  )
  // if (props.state == 0) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description={<Button>处理数据</Button>}
  //   />
  // } else if (props.state == 1) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description='run Colmap and Train'
  //   />
  // } else if (props.state == 2) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description='training ends'
  //   />
  // } else {
  //   return <p>"something went wrong"</p>
  // }

}




const Projects: React.FC = () => {
  // const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');

  //ModalForm
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [EmptyMessage, setEmptyMessage] = useState(false);   //如果没项目            // 空页面
  // const { message, modal, notification } = App.useApp();     

  const [projects, setProjects] = useState<Array<API.ProjectsAttribute>>([]);  // project数据

  
  //Antd Spin
  const [loading, setLoading] = useState(false);                       // 给后台留一点加载时间

  // const toggle = (checked: boolean) => {
  //   setLoading(checked);
  // };

  //得到所有project
  useEffect(() => {
    // const msg = getAllProjects();
    // console.log(msg.data)
    // if (msg.projects.length == 0) {
    //   setEmptyMessage(true);
    //   return;
    // } else {
    //   setProjects(msg.projects)
    // }

    getAllProjects().then(response => {
      console.log(response);
      if (response.projects.length == 0) {
        //加入antd的空页面
        setEmptyMessage(true);
        return;
      } else {
        
        setProjects(response.projects);
      }
      //console.log(data[0]);
      console.log("success");
    })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const content =(id:number,colmap_state:number,ns_state:number,n2m_state:number,gs_state:number)=> (
    <>
    {console.log(id)}
    <div style={{ display: 'flex', justifyContent: 'space-between' ,}}>
      <div style={{width: '40%'}}>
        <h4>Nerf</h4>
      </div>
      <div style={{width: '50%'}}>
        <h4>3D Gaussian</h4>
      </div>
      </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' ,width:'600px',height: '200px',marginTop:'20px'}}>
      
      <div style={{width: '40%'}}>
          <Timeline mode="left"
            items={[
              {
                color: 'green',
                children: '数据已上传',
              },
              {
                
                // dot: {colmap_state==1?<ClockCircleOutlined style={{ fontSize: '16px' }} />,:null}
                color: getColorByState(colmap_state),
                children: getColmapLinkByState(id,colmap_state),
              },
              {
                color: getColorByState(ns_state),
                children: getLinkByState_NS(id,ns_state),
              },

            ]}>
          </Timeline>
      </div>
      <div style={{width: '50%'}}>
        <Timeline mode="left"
          items={[
            {
              color: 'green',
              children: '数据已上传',
            },
            {
              
              // dot: {colmap_state==1?<ClockCircleOutlined style={{ fontSize: '16px' }} />,:null}
              color: getColorByState(colmap_state),
              children: getColmapLinkByState(id,colmap_state),
            },
            {
              color: getColorByState(gs_state),
              children: getLinkByState_GS(id,gs_state),
            },
          ]}>
           
        </Timeline>
      </div>
        </div>
        </>
  );

  
  const getColorByState=(state:number)=>{
    if (state == 0){
      return 'gray';
    }else if (state == 2){
      return 'green';
    }else if (state == 1){
      return 'blue';
    }
  }

  const getColmapLinkByState=(id:number, state:number)=>{
    if (state == 0){
      return (<a href="javaScript:void(0);" onClick={()=>{processData(id as API.runColmapParams)}}>数据未处理，点击开始处理数据</a>)
    }else if (state == 2){
      return (<p>数据完成处理</p>)
    }else if (state == 1){
      return (<a href="javaScript:void(0);">数据处理中</a>)
    }
  }
  const getLinkByState_NS=(id:number, state:number)=>{
    if (state == 0){
      return (<a href="javaScript:void(0);" onClick={()=>{runTrain_1(id as API.runTrainParams_NS)}}>未进行训练,点击开始训练</a>)
    }else if (state == 2){
      return (<a href="javaScript:void(0);" onClick={()=>{openRender_NS(id as API.OpenNerfViewerParams)}}>训练结束，查看渲染效果</a>)
    }else if (state == 1){
      return (<a href="javaScript:void(0);">训练中</a>)
    }
  }
  const getLinkByState_GS=(id:number, state:number)=>{
    console.log(id)
    if (state == 0){
      return (<a href="javaScript:void(0);" onClick={()=>{runTrain_2(id as API.runTrainParams_NS)}}>未进行训练,点击开始训练</a>)
    }else if (state == 2){
      return (<a href="#" onClick={()=>{openRender_GS(id)}}>训练结束，查看渲染效果</a>)
    }else if (state == 1){
      return (<a href="javaScript:void(0);">训练中</a>)
    }
  }
  // const processData = (id: API.)
  const processData=(id: API.runColmapParams)=>{
    runColmap_Common(id)
      .then((response)=>{
        console.log(response);
        const status = response.status;
        if (status == 'success') {
          message.success('已开始处理数据');
          location.reload();
        }
      }).catch((error) => {
        message.error('数据处理发生错误')
        

      });
  }

  const runTrain_1=(id: API.runTrainParams_NS)=>{
    runTrain_NS(id)
      .then((response)=>{
        console.log(response);
        const status = response.status;
        if (status == 'success') {
          message.success('已开始训练');
        }
      }).catch((error) => {
        message.error('请求发生错误')
      });
  }
  const runTrain_2=(id: API.runTrainParams_3DGS)=>{
    runTrain_3DGS(id)
      .then((response)=>{
        console.log(response);
        const status = response.status;
        if (status == 'success') {
          message.success('已开始训练');
          location.reload();
        }
      }).catch((error) => {
        message.error('请求发生错误')
      });
  }

  const openRender_NS = (id: API.OpenNerfViewerParams) => {
    console.log(id)
    setLoading(true)
      openNerfViewer(id)
        .then((response) => {
          console.log(response);
          const status = response.status;
          console.log(status)
          if (status == 'success') {
            setLoading(false);
            // {showMessage();}
            // debugger;
            window.location.href = '/show_model?id='+id+'&websocket_url='+response.websocket_url;
          }
        })
        .catch((error) => {
          console.error('Open Viewer error:', error);
        });
  }
  const openRender_GS = (id) => {
    console.log(id)
    window.location.href = '/viewer_3dgs?id='+id;
  }

  const container = (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
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
      {projects.map((item) => (

        <Card
          key={item.id}
          hoverable
          style={{
            width: 240
            , height: 'auto'
          }}
          cover={<AvatarConvert imageData={item.avatar} />}

          actions={[
            <Popover content={content(item.id,item.colmap_state,item.ns_state,item.n2m_state,item.gs_state)} title="训练进度">
              <PartitionOutlined />
            </Popover>,
            // <RenderButton title={item.title} state={item.state} />,
            
            <ModalForm

              title="编辑信息"
              formRef={restFormRef}
              open={modalVisible}
              trigger={

                <EditOutlined key="edit" />

              }
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
                tooltip=''
                placeholder={item.title}
              />
              <ProFormUploadButton
                name="avatar"
                label="封面"
                max={1}
                fieldProps={{
                  name: "file",
                  listType: 'picture-card'
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
          <ProjectsCard title={item.title} state={item.state} />
        </Card>
      ))}
    </div>
  );


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
    // function handleRender (title: API.OpenViewerParams) {
    //   setLoading(true)
    //   openViewer(title)
    //     .then((response) => {
    //       console.log(response);
    //       const status = response.status;
    //       console.log(status)
    //       if (status == 'success') {
    //         setLoading(false);
    //         // {showMessage();}
    //         // debugger;
    //         window.location.href = '/show_model?id='+title+'&websocket_url='+response.websocket_url;
    //       }

    //     })
    //     .catch((error) => {
    //       console.error('Open Viewer error:', error);
    //       // {showModal();}

    //     });
    // }
    
    //发送runCOLMAP请求
    function runColmapAndTrain(params : API.runColmapAndTrainParams_NerfStudio) {
      runColmapAndTrain_NerfStudio(params)
        .then((response) => {
          console.log(response.status);
          setState(1)
        })
        .catch((error) => {
          console.error('run colmap and train error:', error);
        });
    }
    const [isHandleDataModalOpen, setIsHandleDataModalOpen] = useState(false);
    const showHandleDataModal = () => {
      setIsHandleDataModalOpen(true);
    }
    const handleDataModalOK = (title, pano) => {
      
      const runColmapParams = {title, pano} as API.runColmapAndTrainParams_NerfStudio;
      console.log(runColmapParams)
      // debugger;
      runColmapAndTrain(runColmapParams)
      setIsHandleDataModalOpen(false);
    }
    const handleDataModalCancel = () => {
      setIsHandleDataModalOpen(false);
    }

    const [colmapDataType, setColmapDataType] = useState(0); 
    const colmapDataTypeChange = (e : RadioChangeEvent) => {
      setColmapDataType(e.target.value);
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
    } else if (state == 0) {
      return  <>
              <Button type='link' onClick={showHandleDataModal}block>
                <PlayCircleTwoTone key="start" twoToneColor="#eb2f2f" />
              </Button>
              <Modal title="数据处理选择" open={isHandleDataModalOpen} onOk={()=>handleDataModalOK(props.title, colmapDataType)} onCancel={handleDataModalCancel}>
                
                  <Radio.Group onChange={colmapDataTypeChange} value={colmapDataType}>
                    <Radio value={0}>透视图</Radio>
                    <Radio value={1}>全景图</Radio>
                  </Radio.Group>
              </Modal>
              </>
              
    }
  }

  
 
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

export default Projects;
