/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import * as THREE from 'three';

// import { Box, Typography, Tab, Tabs, Button } from '@mui/material';
import { LevaPanel, LevaStoreProvider, useCreateStore } from 'leva';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CategoryIcon from '@mui/icons-material/Category';
import LevaTheme from '../../../themes/leva_theme.json';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Button, Flex, Input, Statistic, Table, Space } from 'antd';
// import { useEffect, useState } from 'antd';
import { render } from '@testing-library/react';
import {
  ViserWebSocketContext,
  sendWebsocketMessage,
} from '../../WebSocket/ViserWebSocket';
import type { ColumnsType, TableProps } from 'antd/es/table';

type MyProps = {
  sceneTree : Object
  handleSend: any;
}
type MyState = {
  samplePoints : {
    startPoint : { x:number, y:number },
    endPoint: { x:number, y:number },
  },
  sampleDistance: number,
  measurePoints : {
    startPoint : { x:number, y:number },
    endPoint: { x:number, y:number },
  },
  measureTargetName: '',
}
interface DataType {
  key: React.Key;
  name: string;
  real_world_length: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '长度',
    dataIndex: 'real_world_length',
    sorter: (a, b) =>  a.real_world_length - b.real_world_length,
  },
]
class MeasurePanel extends React.Component<MyProps,MyState> {
  // unpack relevant information
  
  constructor (props:any) {
    super(props);
    // this.sceneTree = props.sceneTree;

    this.state = {
      samplePoints:{startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 }},
      sampleDistance:0,
      measurePoints:{startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 }},
      measureTargetName: '',
    }
  }
    static contextType =  ViserWebSocketContext
    
    componentDidMount() {
      console.log(this)
    }

    calculateLength=()=>{
      const viser_websocket = this.context;
      const { sceneTree } = this.props;
      const { measurePoints, measureTargetName } = this.state;
      const resolution = this.props.state.renderingState.eval_res;
      const cleanedString = resolution.replace(/x/g, ' ');
      const cleanedString2 = cleanedString.replace(/p/g, '');
      const [height, width] = cleanedString2.split(' ').map(Number);
      console.log(width,height)
      const measure_points = [];
      measure_points.push(measurePoints.startPoint.x * width)
      measure_points.push(measurePoints.startPoint.y * height)
      measure_points.push(measurePoints.endPoint.x * width)
      measure_points.push(measurePoints.endPoint.y * height)
      console.log(measure_points)
  
      const render_height = this.props.state.renderingState.render_height;
      const render_width = this.props.state.renderingState.render_width;
      const render_aspect = render_width/render_height;
      const old_camera_matrix = sceneTree.metadata.camera.matrix.elements.slice();
      const camera_type = this.props.state.renderingState.camera_type;
      const is_moving = false;
  
      sendWebsocketMessage(viser_websocket, {
        type: 'CalculateLengthMessage',
        samplePoints: measure_points,
        name: measureTargetName,
  
        aspect: sceneTree.metadata.camera.aspect,
        render_aspect,
        fov: sceneTree.metadata.camera.fov,
        matrix: old_camera_matrix,
        camera_type,
        is_moving,
        timestamp: +new Date(),
      });
    }

  calculateScale=()=>{
    const viser_websocket = this.context;
    const { sceneTree } = this.props;
    const { samplePoints, sampleDistance } = this.state;
    const resolution = this.props.state.renderingState.eval_res;
    const cleanedString = resolution.replace(/x/g, ' ');
    const cleanedString2 = cleanedString.replace(/p/g, '');
    const [height, width] = cleanedString2.split(' ').map(Number);
    console.log(width,height)
    const sample_points = [];
    sample_points.push(samplePoints.startPoint.x * width)
    sample_points.push(samplePoints.startPoint.y * height)
    sample_points.push(samplePoints.endPoint.x * width)
    sample_points.push(samplePoints.endPoint.y * height)
    console.log(sample_points)

    const render_height = this.props.state.renderingState.render_height;
    const render_width = this.props.state.renderingState.render_width;
    const render_aspect = render_width/render_height;
    const old_camera_matrix = sceneTree.metadata.camera.matrix.elements.slice();
    const camera_type = this.props.state.renderingState.camera_type;
    const is_moving = false;

    sendWebsocketMessage(viser_websocket, {
      type: 'SampleScaleMessage',
      samplePoints: sample_points,
      real_sample_distance: sampleDistance,

      aspect: sceneTree.metadata.camera.aspect,
      render_aspect,
      fov: sceneTree.metadata.camera.fov,
      matrix: old_camera_matrix,
      camera_type,
      is_moving,
      timestamp: +new Date(),
    });
  }

  sampleLine=(e)=> {
    // console.log(e)
      e.stopPropagation();
      const { sceneTree } = this.props;
      const size = new THREE.Vector2();
      sceneTree.metadata.renderer.getSize(size);
      const { samplePoints } = this.state;
      if (this.state.sampleDistance == 0 ){
        window.removeEventListener('dblclick',this.sampleLine,false);
        alert("您还未输入采样线段长度")
      }
      console.log(this)
      console.log(sceneTree)
      if (samplePoints.startPoint.y==0)
      { 
        const newX = e.clientX / size.x;
        const newY = (e.clientY - 50) / size.y;
        
        this.setState(()=>{Object.assign(this.state.samplePoints,{startPoint:{x:newX,y:newY}})});
        console.log(1)
        console.log(this.state.samplePoints)
        return;
      } else if (samplePoints.startPoint.y!=0 && samplePoints.endPoint.y==0) {
        const newX = e.clientX / size.x;
        const newY = (e.clientY - 50) / size.y;
        this.setState(()=>{Object.assign(this.state.samplePoints,{endPoint:{x:newX,y:newY}})});
        
        console.log(2)
        console.log(this.state.samplePoints)
        return;
      } else {
          // dispatch({
          //   type: 'sample',
          //   data: samplePoints,
          // });
        
        // setSamplePoints({...initialSamplePoints.startPoint,x:0,y:0 })
        this.setState(()=>{Object.assign(this.state.samplePoints,{startPoint:{x:0,y:0},endPoint:{x:0,y:0}})});
        console.log(3)
        console.log(this.state.samplePoints)
        this.calculateScale()
        window.removeEventListener('dblclick',this.sampleLine,false);
        // setStep(()=>0);
        // setOpenMeasureSample(!openMeasureSample)
      }
    }

    measureLine=(e)=> {
      // console.log(e)
        e.stopPropagation();
        const { sceneTree } = this.props;
        const size = new THREE.Vector2();
        sceneTree.metadata.renderer.getSize(size);
        const { measurePoints, measureTargetName } = this.state;
        if (measureTargetName == '') {
          window.removeEventListener('dblclick',this.measureLine,false);
          alert('您还未输入测量目标名称');
        }
        if (measurePoints.startPoint.y==0)
        { 
          const newX = e.clientX / size.x;
          const newY = (e.clientY - 50) / size.y;
          
          this.setState(()=>{Object.assign(this.state.measurePoints,{startPoint:{x:newX,y:newY}})});
          console.log(1)
          console.log(this.state.measurePoints)
          return;
        } else if (measurePoints.startPoint.y!=0 && measurePoints.endPoint.y==0) {
          const newX = e.clientX / size.x;
          const newY = (e.clientY - 50) / size.y;
          this.setState(()=>{Object.assign(this.state.measurePoints,{endPoint:{x:newX,y:newY}})});
          
          console.log(2)
          console.log(this.state.measurePoints)
          return;
        } else {
            // dispatch({
            //   type: 'sample',
            //   data: samplePoints,
            // });
          
          // setSamplePoints({...initialSamplePoints.startPoint,x:0,y:0 })
          this.setState(()=>{Object.assign(this.state.measurePoints,{startPoint:{x:0,y:0},endPoint:{x:0,y:0}})});
  
          this.calculateLength()
          window.removeEventListener('dblclick',this.measureLine,false);
          // setStep(()=>0);
          // setOpenMeasureSample(!openMeasureSample)
        }
      }

    handleSampleDistanceChange=(e)=>{
      this.setState(()=>{Object.assign(this.state,{sampleDistance: e.target.value})})
    }
    handleMeasureTargetNameChange=(e)=>{
      this.setState(()=>{Object.assign(this.state,{measureTargetName: e.target.value})})
    }
    
    

  sendFather = ()=>{
    this.props.handleSend('who i am')
  }
  
  render() {
    const inputvalue = this.state.sampleDistance;
    return(
      
      <div className="MeasurePanel">
          <div className='MeasurePanel-top-row' >
              <div className='MeasurePanel-action-sample' style={{display: 'flex',justifyContent:'start',marginTop:'20px',marginLeft:'10px'}}>
                <Space.Compact>
                  <Input style={{width:'240px'}} placeholder='采样线段真实长度 (单位: m)'  onChange={this.handleSampleDistanceChange}></Input>
                  <Button onClick={(event)=>{window.addEventListener('dblclick',this.sampleLine,false)}}>采样</Button>
                </Space.Compact>
            
              </div>
              
              {/* <div className='MeasurePanel-scale'>
                <Statistic title='尺度' value={112} ></Statistic>

              </div> */}
          </div>
        
          <div className="MeasurePanel-measure">
            <div className="MeasurePanel-action-measure" style={{display: 'flex',justifyContent:'start',marginTop:'50px',marginLeft:'10px'}}>
              <Space.Compact>
                <Input style={{width:'240px'}} placeholder='请输入测量目标的名字' onChange={this.handleMeasureTargetNameChange}></Input>
              </Space.Compact>
              <Button onClick={(event)=>{window.addEventListener('dblclick',this.measureLine,false)}}>
                  测量
              </Button>
            </div>
            
          </div>
          <div className='MeasurePanel-length' style={{marginTop:'50px'}}>
              <div>
                <Table columns={columns} dataSource={this.props.state.target_length_sequence.slice(1)} ></Table>
              </div>
          </div>
          
      </div>
    )  
  }
  
}
const mapStateToProps = (state) => {
  return {
    state: state 
  }
}
export default connect(mapStateToProps)(MeasurePanel);