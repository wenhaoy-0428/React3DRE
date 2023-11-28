// import React, { useRef } from 'react';
import './index.scss';
import { Provider } from 'react-redux';
import { ViserWebSocket } from '../../components/Viser/WebSocket/ViserWebSocket';
import  App  from './App';
import store from '../../store';
import { closeViewer } from '../../services/ant-design-pro/api';


//关闭页面时触发关闭后台端口服务的事件
window.addEventListener("beforeunload", function(event) {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  
  
  closeViewer(id, 2)
  .then((response)=>{
    console.log(response)
    debugger;
  }).catch((err)=>{
    console.log(err)
  })
  
})
const ShowModel = () => {

  return (
    <Provider store={store}>
      <ViserWebSocket>
        <App />
      </ViserWebSocket>
    </Provider>
  );
};

export default ShowModel;
