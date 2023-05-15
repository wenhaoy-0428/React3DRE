import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { get_scene_tree } from '../../components/Viser/Scene/Scene';
import { useEffect } from 'react';
// import Banner from '../../components/Banner';
import { BasicTabs } from '../../components/Viser/SidePanel/SidePanel';
import ViewerWindow from '../../components/Viser/ViewerWindow/ViewerWindow';
import { appTheme } from '../../components/themes/theme';
import axios from 'axios';
// import { closeviewer } from '@/services/ant-design-pro/api';
import { API } from '@/services/ant-design-pro/typings.d';
export default function App(){
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const formdata = new FormData();
      formdata.append('title', id);
    // 在组件卸载时发送请求
  //   console.log('1')
  //  const [projecttitle,setprojecttitle]=useState<>({title:id});
    // 在组件挂载时注册清理函数
    return () => {
      axios.post('http://10.177.35.76:8081/api/viewerClose',formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((res)=>{
        console.log(res)
        }).catch((err)=>{
          console.log(err)
          });
    };
  }, []);

  // The scene tree won't rerender but it will listen to changes
  // from the redux store and draw three.js objects.
  // In particular, it listens to changes to 'sceneState' coming over the websocket.
  const sceneTree = get_scene_tree();
  // console.log('sceneTree', sceneTree);
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        {/* The banner at the top of the page. */}
        {/* <Banner /> */}
        <div className="App-body">
          {/* Order matters here. The viewer window must be rendered first. */}
          <ViewerWindow sceneTree={sceneTree} />
          <div className="SidePanel">
            {/*<BasicTabs sceneTree={sceneTree} />*/ }
            
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

