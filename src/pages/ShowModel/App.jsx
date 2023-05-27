import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { get_scene_tree } from '../../components/Viser/Scene/Scene';
import { useEffect } from 'react';
// import Banner from '../../components/Banner';
import { BasicTabs } from '../../components/Viser/SidePanel/SidePanel';
import ViewerWindow from '../../components/Viser/ViewerWindow/ViewerWindow';
import { appTheme } from '../../components/themes/theme';
// import { closeviewer } from '@/services/ant-design-pro/api';
import { closeViewer } from '../../services/ant-design-pro/api';
export default function App(){
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    
    // 在组件卸载时发送关闭后台端口服务请求
    // 在组件挂载时注册清理函数
    return () => {
      closeViewer(id, 1)
        .then((res)=>{
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

