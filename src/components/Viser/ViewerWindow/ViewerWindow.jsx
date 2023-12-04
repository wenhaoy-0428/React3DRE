import * as THREE from 'three';

import React, { useContext, useEffect, useRef, useState } from 'react';
// import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PublicOffSharpIcon from '@mui/icons-material/PublicOffSharp';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBackOutlined';
import { isEqual, sample } from 'lodash';
import {
  makeThrottledMessageSender,
  ViserWebSocketContext,
} from '../WebSocket/ViserWebSocket';
import { Button } from 'antd';


function CameraToggle() {
  const dispatch = useDispatch();
  const camera_choice = useSelector(
    (state) => state.renderingState.camera_choice,
  );
  const set_camera_choice = (event, value) => {
    if (value != null) {
      dispatch({
        type: 'write',
        path: 'renderingState/camera_choice',
        data: value,
      });
    }
  };

  return (
    <ToggleButtonGroup
      value={camera_choice}
      exclusive
      onChange={set_camera_choice}
      aria-label="camera view"
      size="small"
    >
      <ToggleButton value="Main Camera" disableRipple sx={{ width: '160px' }}>
        <ThreeDRotationIcon fontSize="small" sx={{ mr: 1, ml: -0.5 }} />
        Viewport
      </ToggleButton>
      <ToggleButton value="Render Camera" disableRipple sx={{ width: '160px' }}>
        <VideoCameraBackIcon
          value="Render Camera"
          fontSize="small"
          sx={{ mr: 1, ml: 0.5 }}
        />
        Render View
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function TransformIcons(props) {
  const sceneTree = props.sceneTree;
  const transform_controls = sceneTree.find_object(['Transform Controls']);
  // NOTE(ethan): I'm not sure why this is necessary, but it is
  // toggle back and forth between local and global transform
  const [world, setWorld] = React.useState(true);

  const toggleLocal = () => {
    transform_controls.setSpace(world ? 'local' : 'world');
    setWorld(!world);
  };

  return (
    <div>
      <div className="ViewerWindow-iconbutton">
        <IconButton
          size="large"
          onClick={() => {
            transform_controls.setMode('translate');
          }}
        >
          {/* translate */}
          <OpenWithIcon />
        </IconButton>
      </div>
      <div className="ViewerWindow-iconbutton">
        <IconButton
          size="large"
          onClick={() => {
            transform_controls.setMode('rotate');
          }}
        >
          {/* rotate */}
          <SyncOutlinedIcon />
        </IconButton>
      </div>
      <div className="ViewerWindow-iconbutton">
        <IconButton size="large" onClick={toggleLocal}>
          {world ? <PublicSharpIcon /> : <PublicOffSharpIcon />}
        </IconButton>
      </div>
    </div>
  );
}

// manages a camera
export default function ViewerWindow(props) {
  const sceneTree = props.sceneTree;
  const scene = sceneTree.object;
  const renderer = sceneTree.metadata.renderer;
  const labelRenderer = sceneTree.metadata.labelRenderer;

  const myRef = useRef(null);
  const viser_websocket = useContext(ViserWebSocketContext);

  
  

  const field_of_view = useSelector(
    (state) => state.renderingState.field_of_view,
  );

  const camera_choice = useSelector(
    (state) => state.renderingState.camera_choice,
  );
  const camera_type = useSelector((state) => state.renderingState.camera_type);

  // listen to the viewport width
  const size = new THREE.Vector2();
  renderer.getSize(size);
  const [viewport_size, setDimensions] = React.useState({
    height: size.x,
    width: size.y,
  });
  const viewport_width = viewport_size.width;
  const viewport_height = viewport_size.height;
  

  // on change, update the camera and controls
  sceneTree.metadata.camera = sceneTree.find_object(['Cameras', camera_choice]);

  const get_window_width = () => {
    let width = 0;
    //这个地方错误的原因是刷新页面的时候myref绑定的dom已经没了,所以报错,因此判断是否存在
    if (myRef && myRef.current && myRef.current.clientWidth) {
      width = myRef.current.clientWidth;
      width -= width % 2;
    }
    return width;
  };

  const get_window_height = () => {
    //console.log(myRef.current.clientHeight)
    let height = 0;
    if (myRef&& myRef.current && myRef.current.clientHeight)
    {
      height=myRef.current.clientHeight;
    }
    return height;
  };

  const handleResize = () => {
    const viewportWidth = get_window_width();
    const viewportHeight = get_window_height();
    sceneTree.metadata.camera.aspect = viewportWidth / viewportHeight;
    sceneTree.metadata.camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);
    labelRenderer.setSize(viewportWidth, viewportHeight);
  };

  const render = () => {
    const fps = 24;
    const interval = 1000 / fps;
    handleResize();
    sceneTree.metadata.camera.updateProjectionMatrix();
    sceneTree.metadata.moveCamera();
    sceneTree.metadata.camera_controls.update(interval);
    requestAnimationFrame(render);
    renderer.render(scene, sceneTree.metadata.camera);
    labelRenderer.render(scene, sceneTree.metadata.camera);
    // console.log('1')
  };

  useEffect(() => {
    

    const handleNewDimensions = () => {
      setDimensions({
        height: get_window_height(),
        width: get_window_width(),
      });
    };

    setDimensions({
      height: get_window_height(),
      width: get_window_width(),
    });

    const stopRender=()=>{
      win
    }

    render();

    window.addEventListener('resize', handleNewDimensions);
    return () => {
      window.removeEventListener('resize', handleNewDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // start the three.js rendering loop
  // when the DOM is ready
  useEffect(() => {
    document.getElementById("background-image").onload = function () {
      if (scene) {
        const oldBackground = scene.background;
        const texture = new THREE.Texture(this);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;
        scene.background = texture;
        if (oldBackground) {
          oldBackground.dispose();
        }
      }
    }
    myRef.current.append(renderer.domElement);
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const render_height = useSelector(
    (state) => state.renderingState.render_height,
 
  );
  const render_width = useSelector(
    (state) => state.renderingState.render_width,
  );
  

  let crop_w;
  let crop_h;
  const render_aspect = render_width / render_height;
  const viewport_aspect = viewport_width / viewport_height;
  let render_viewport_aspect_ratio = null;
  if (render_aspect > viewport_aspect) {
    // render width is the limiting factor
    crop_w = viewport_width;
    crop_h = viewport_width / render_aspect;
    render_viewport_aspect_ratio = viewport_aspect / render_aspect;
  } else {
    // render height is the limiting factor
    crop_w = viewport_height * render_aspect;
    crop_h = viewport_height;
    render_viewport_aspect_ratio = 1.0;
  }

  let display = null;
  if (camera_choice === 'Main Camera') {
    display = 'none';
  } else {
    display = 'flex';
  }

  const crop_style = {
    display,
    width: crop_w,
    height: crop_h,
  };
  // console.log(crop_w, crop_h)
  // set the threejs field of view
  // such that the rendered video will match correctly
  if (camera_choice !== 'Main Camera') {
    const fl = 1.0 / Math.tan((field_of_view * Math.PI) / 360);
    const fl_new = fl * render_viewport_aspect_ratio;
    const fov = Math.atan(1 / fl_new) / (Math.PI / 360);
    sceneTree.metadata.camera.fov = fov;
  } else {
    sceneTree.metadata.camera.fov = 50;
  }

  let old_camera_matrix = null;
  let is_moving = false;
  const sendThrottledCameraMessage = makeThrottledMessageSender(
    viser_websocket,
    25,
  );
  // update the camera information in the python server
  const sendCamera = () => {
    if (isEqual(old_camera_matrix, sceneTree.metadata.camera.matrix.elements)) {
      if (is_moving) {
        is_moving = false;
      } else {
        return;
      }
    } else {
      is_moving = true;
    }
    old_camera_matrix = sceneTree.metadata.camera.matrix.elements.slice();
    // console.log(old_camera_matrix)
    sendThrottledCameraMessage({
      type: 'CameraMessage',
      aspect: sceneTree.metadata.camera.aspect,
      render_aspect,
      fov: sceneTree.metadata.camera.fov,
      matrix: old_camera_matrix,
      camera_type,
      is_moving,
      timestamp: +new Date(),
    });
  };

  // keep sending the camera often
  // rerun this when the websocket changes
  useEffect(() => {
    const fps = 24;
    const interval = 1000 / fps;
    const refreshIntervalId = setInterval(sendCamera, interval);
    return () => {
      clearInterval(refreshIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viser_websocket, camera_choice, camera_type, render_aspect]);

  const isWebsocketConnected = useSelector(
    (state) => state.websocketState.isConnected,
  );
  useEffect(() => {
    if (isWebsocketConnected) {
      sendThrottledCameraMessage({
        type: 'CameraMessage',
        aspect: sceneTree.metadata.camera.aspect,
        render_aspect,
        fov: sceneTree.metadata.camera.fov,
        matrix: sceneTree.metadata.camera.matrix.elements.slice(),
        camera_type,
        is_moving: false,
        timestamp: +new Date(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebsocketConnected]);
  
  // const drawline=()=>{
  //   console.log(myRef.current)
  //   const canvas=myRef.current.querySelector('canvas')
  //   const ctx = canvas.getContext('2d');
  //   if (!canvas.getContext('2d')) console.log('draw line failed');
  //   if (ctx) {
      
  //     console.log(canvas)
  //   // // 绘制直线
  //     ctx.beginPath();
  //     ctx.moveTo(50, 50); // 起始点坐标
  //     ctx.lineTo(1000, 1000); // 结束点坐标
  //     ctx.closePath()
  //     ctx.stroke();
  //   }
    
  // }
  
  // useEffect(()=>{
  //   drawline()
  // },[])
  
  // 测试在THREEJS中画线
  // var positions = [
  //   new THREE.Vector2(-0.5, -0.5),
  //   new THREE.Vector2(0, 0.5),
  //   new THREE.Vector2(0.5, -0.5)
  // ];

  // var lineGeometry = new THREE.BufferGeometry().setFromPoints(positions);
  
  // var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  // var line = new THREE.Line(lineGeometry, lineMaterial);
  // scene.add(line);
  // render();

  

  // document.addEventListener('dblclick',(event)=>{console.log('viewerwindow');event.stopImmediatePropagation();event.stopPropagation()},false)
  const appCanvasRef = useRef(null)
  // const [appCanvasRef,setAppCanvasRef] = useState(null);
  const [appCanvasVisible, setAppCanvasVisible] = useState('visible')

  // useEffect(()=>{
    
  //   if (appCanvasRef) {
  //     console.log(myRef.current.querySelector('canvas'))
  //     const canvas = appCanvasRef.current;
  //     console.log(canvas)
      // canvas.width = get_window_width()
      // canvas.height = get_window_height()
  //     const context = canvas.getContext("2d");
      
    
  
      // const drawLine = (startX, startY, endX, endY) => {
      //   context.clearRect(0, 0, canvas.width, canvas.height);
      //   context.beginPath();
      //   context.moveTo(startX, startY);
      //   context.lineTo(endX,endY);
      //   context.strokeStyle='black'
      //   // context.lineWidth=1
      //   context.closePath();
      //   context.stroke();
      //   console.log('line drawed')
      // }
  //     console.log(canvas.width,canvas.height)
  //     drawLine(0,0,get_window_width(),get_window_height())
  //   }
  // },[appCanvasRef])

  const [ isMeasureCanvasVisible, setIsMeasureCanvasVisible] = useState(false)
  const [ samplePoints_redux, set_samplePoints_redux] = useState({startPoints:{x:0,y:0},endPoint:{x:0,y:0}})
  const [ measurePoints_redux, set_measurePoints_redux ] = useState({startPoints:{x:0,y:0},endPoint:{x:0,y:0}})
  const [prevCanvasData, set_prevCanvasData] = useState()
  const isMeasuring = useSelector(
    (state)=>state.is_canvas_visible
  )
  const samplePoints = useSelector(
    (state)=>state.measure_sample_points
  )
  const measurePoints = useSelector(
    (state)=>state.measure_points
  )
    
  
  
  useEffect(()=>{
    console.log(samplePoints)
    console.log(measurePoints)
    const canvas = appCanvasRef.current;
    const size = new THREE.Vector2();
    sceneTree.metadata.renderer.getSize(size);
    canvas.width = size.x
    canvas.height = size.y
    const context = canvas.getContext("2d");

    const drawPoint=(x,y)=>{
      context.beginPath();
      context.arc(x,y,5,0,Math.PI*2);
      context.fillStyle='blue';
      context.fill();
      context.closePath();
      context.stroke()
    }
    const drawLine = (startX, startY, endX, endY) => {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX,endY);
      context.strokeStyle='blue'
      context.lineWidth=3
      context.closePath();
      context.stroke();
      console.log('line drawed')
    }
    const savePrevCanvas= ()=>{
      const prevCanvas = context.getImageData(0,0,size.x,size.y);
      set_prevCanvasData(prevCanvas)
    }
    const restorePrevCanvas=()=>{
      context.putImageData(prevCanvasData,0,0)
    }
    const clearCanvas=()=>{
      context.clearRect(0,0,size.x,size.y)
    }
    
    if(isMeasuring==true && isMeasureCanvasVisible == false){
      setIsMeasureCanvasVisible(isMeasuring)
    }else if (isMeasuring==false) {
      clearCanvas()
      console.log('clean')
      return
    }else if(samplePoints.length==2 && measurePoints.length==0){
      console.log('450')
      drawPoint(samplePoints[0]*size.x,samplePoints[1]*size.y)
      // savePrevCanvas()
    }else if(samplePoints.length==4 && measurePoints.length==0) {
      // restorePrevCanvas()
      console.log('500')
      drawPoint(samplePoints[0]*size.x,samplePoints[1]*size.y)
      drawPoint(samplePoints[2]*size.x,samplePoints[3]*size.y)
      drawLine(samplePoints[0]*size.x,samplePoints[1]*size.y,samplePoints[2]*size.x,samplePoints[3]*size.y)
    }else if (measurePoints.length==2 && samplePoints.length==4){
      console.log('550')
      drawPoint(samplePoints[0]*size.x,samplePoints[1]*size.y)
      drawPoint(samplePoints[2]*size.x,samplePoints[3]*size.y)
      drawLine(samplePoints[0]*size.x,samplePoints[1]*size.y,samplePoints[2]*size.x,samplePoints[3]*size.y)
      drawPoint(measurePoints[0].size.x,measurePoints[1]*size.y)
    }else if(measurePoints.length==4 && samplePoints.length==4) {
      console.log('600')
      drawPoint(samplePoints[0]*size.x,samplePoints[1]*size.y)
      drawPoint(samplePoints[2]*size.x,samplePoints[3]*size.y)
      drawLine(samplePoints[0]*size.x,samplePoints[1]*size.y,samplePoints[2]*size.x,samplePoints[3]*size.y)
      drawPoint(measurePoints[0].size.x,measurePoints[1]*size.y)
      drawPoint(measurePoints[2].size.x,measurePoints[3]*size.y)
      drawLine(measurePoints[0]*size.x,measurePoints[1]*size.y,measurePoints[2]*size.x,measurePoints[3]*size.y)
    }

    
    


    
    
  },[appCanvasRef,isMeasuring,samplePoints,measurePoints])

  

  return (
    <>
      <div className="RenderWindow">
        <div id="not-connected-overlay" hidden={isWebsocketConnected}>
          <div id="not-connected-overlay-text">Renderer Disconnected</div>
        </div>
      </div>
      <img
        id="background-image"
        alt="Render window"
        z-index="1"
        hidden
      />
      <canvas className='canvas-container-main' style={{background:'rgba(255,255,255,0)',zIndex:'4',display:isMeasureCanvasVisible?"block":"none"}} ref={appCanvasRef} ></canvas>
      <div className="canvas-container-main" ref={myRef} > 
        <div className="ViewerWindow-camera-toggle">
          {/* {<CameraToggle />} */}
        </div>
      </div>
   
      <div className="ViewerWindow-buttons" style={{ display: 'none' }}>
        <TransformIcons sceneTree={sceneTree} />
      </div>
      <div className="ViewerWindow-render-crop-container">
        <div className="ViewerWindow-render-crop" style={crop_style} />
      </div>
      
    </>
  );
}
