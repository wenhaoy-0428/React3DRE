/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import * as THREE from 'three';

// import { Box, Typography, Tab, Tabs, Button } from '@mui/material';
import { LevaPanel, LevaStoreProvider, useCreateStore } from 'leva';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CategoryIcon from '@mui/icons-material/Category';
import LevaTheme from '../../../themes/leva_theme.json';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex } from 'antd';
import { useEffect, useState } from 'antd';
import { render } from '@testing-library/react';


export default class MeasurePanel extends React.Component = (props) => {
  // unpack relevant information
  const sceneTree = props.sceneTree;
//   console.log(sceneTree)
  
// const initialSamplePoints = { startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 } };
// const [samplePoints, setSamplePoints] = useState(initialSamplePoints);
// const dispatch = useDispatch();
// const sampleLine=(e)=> {
  
//     sceneTree.metadata.renderer.getSize(size);
    
//     if (samplePoints.startPoint.y==0)
//     { 
//       const newX = e.clientX / size.x;
//       const newY = (e.clientY - 50) / size.y;
//       console.log(1)
//       setSamplePoints((prevSamplePoints)=>{
//         const updatedStartPoint = {...prevSamplePoints.startPoint,x:newX,y:newY};
//         const updatedSamplePoint = {...prevSamplePoints,startPoint: updatedStartPoint};
//         return updatedSamplePoint;
//       });
//       // setStep((step)=> step+1);
//       return;
//     } else if (samplePoints.startPoint.y!=0 && samplePoints.endPoint.y==0) {
//       const newX = e.clientX / size.x;
//       const newY = (e.clientY - 50) / size.y;
//       setSamplePoints((prevSamplePoints)=>{
//         console.log(2)
//         const updatedEndPoint = {...prevSamplePoints.endPoint,x:newX,y:newY};
//         const updatedSamplePoint = {...prevSamplePoints,endPoint: updatedEndPoint};
//         return updatedSamplePoint;
//       });
//       // setStep((step)=>step+1);
//       return;
//     } else {
//         dispatch({
//           type: 'sample',
//           data: samplePoints,
//         });
      
//       console.log('init')
//       // setSamplePoints({...initialSamplePoints.startPoint,x:0,y:0 })
//       setSamplePoints(()=>initialSamplePoints)
//       // setStep(()=>0);
//       // setOpenMeasureSample(!openMeasureSample)
      
//     }
//     console.log(samplePoints)
//   }
//   useEffect(()=>{
//     console.log('samplePoints')
//     console.log(samplePoints)
//   })
  
  render(
    return{
        <div className="MeasurePanel">
            <div className='MeasurePanel-top-row' style={{display: 'flex',justifyContent:'space-evenly'}}>
                <Button
                
                >
                    采样
                </Button>
                <Button>
                    测量
                </Button>
                
            </div>
            
        </div>
  })
  
}
