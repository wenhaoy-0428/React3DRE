import * as React from 'react';
import * as THREE from 'three';
import { useState, useEffect,  useLayoutEffect, useRef } from 'react';

import { flushSync } from 'react-dom';

function MeasurementPanel(props) {
    
    const [sampling, setSampling] = useState(Number(0));           // 采样的状态0:未采样 1:采样中 2:采样完成
    const [measuring, setMeasuring] = useState(Number(0));          // 测量的状态0:未测量 1:测量中 

    const [samplePoints, setSamplePoints] = useState(
        { startPoint: new THREE.Vector3(0, 0, 0), endPoint: new THREE.Vector3(0, 0, 0) }
    ); 
    const [measurePoints, setMeasurePoints] = useState(
        { startPoint: new THREE.Vector3(0, 0, 0), endPoint: new THREE.Vector3(0, 0, 0) }
    );
    const [measureSets, setMeasureSets] = useState([{name: null, length: 0}]);                                                                              //采样点    
    const currentSamplePoint= useRef(0);  //当前采样点是起始点还是终点
    
    // const [inputValue, setInputValue] = useState(0);                  //真实
    // const [scale, setScale] = useState(Number(0)); 
    const scale = useRef(0);                 // 比例
    
    // let currentSamplePoint = 0 ;
    // let sampleLength = 0 ;

    const [showInput, setShowInput] = useState(false);              // 取点完成后显示输入框
    // const [sampleLength, setSampleLength] = useState(0);            // 采样线段的真实长度

    const sampleLength = useRef(0);
    // let sampleLength = 0      
    
    // const [sampleRelativeDistance, setSampleRelativeDistance]= useState(0);
    const sampleRelativeDistance = useRef(0);
    // let sampleRelativeDistance = 0;                                   // 采样线段的相对长度

    const viewer = props.viewerRef.current;
    // const raycastSplatMesh = props.raycastSplatMesh;

    // const createPoint = props.createPoint;
    // const createLine = props.createLine;
    const splatMesh = viewer.splatMesh;
    
    const handleSamplingStart = () => {
        console.log("开始采样");
        
        setSampling(1);
        setMeasuring(0);
            
        
        console.log(sampling,measuring)
        

    };
    
    const handleSamplingStop = () => {
        console.log("停止采样");
        sampleRelativeDistance.current =  0;
        currentSamplePoint.current = 0;
        sampleLength.current = 0;
        scale.current = 0;
        setSampling(0);
        setMeasuring(0);
        setSamplePoints(
            { startPoint: new THREE.Vector3(0, 0, 0), endPoint: new THREE.Vector3(0, 0, 0) }
        );
        console.log(sampling,measuring,sampleRelativeDistance.current);
        console.log(samplePoints);
    }

    const handleSamplingReset = () => {
        console.log("重置");
        sampleLength.current = 0;
        currentSamplePoint.current = 0;
        sampleRelativeDistance.current =  0;
        scale.current = 0;
        // sampleRelativeDistance = 0;
        setSampling(0);
        setMeasuring(0);
        setSamplePoints(
            { startPoint: new THREE.Vector3(0, 0, 0), endPoint: new THREE.Vector3(0, 0, 0) }
        );
        setMeasurePoints(
            { startPoint: new THREE.Vector3(0, 0, 0), endPoint: new THREE.Vector3(0, 0, 0) }
        );
        console.log(sampling,measuring, sampleLength.current)
        console.log(samplePoints);
    }

    const handleMeasureStart = () => {
        console.log("开始测量");
        setSampling(0);
        setMeasuring(1);
    };
    const handleMeasureStop = () => {
        console.log("停止测量");
        setMeasuring(0);
    };

    const onClickSample =(event)=> {
        
        const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
        if (hit !== null) {
            const point = new THREE.Vector3(hit.origin.x,hit.origin.y,hit.origin.z)
            viewer.threeScene.add(createPoint(point, 0));

            console.log(sampling,measuring,currentSamplePoint)
            if (currentSamplePoint.current == 0) {
                currentSamplePoint.current = 1;
                
                setSamplePoints(()=>{Object.assign(samplePoints, {startPoint: point})})
                
            } else {
                currentSamplePoint.current = 0;
                
                setSamplePoints(()=>{Object.assign(samplePoints, {endPoint: point})})
                setShowInput(true);

                const dx = samplePoints.startPoint.x - samplePoints.endPoint.x;
                const dy = samplePoints.startPoint.y - samplePoints.endPoint.y;
                const dz = samplePoints.startPoint.z - samplePoints.endPoint.z;
                console.log(dx,dy,dz)
                // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                sampleRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz)
                console.log(sampleRelativeDistance)
            }
            
            
            
            console.log(samplePoints)

            
        }
        
    };

    const onClickMeasure =(event)=> {
        
        const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
        if (hit !== null) {
            const point = new THREE.Vector3(hit.origin.x,hit.origin.y,hit.origin.z)
            viewer.threeScene.add(createPoint(point, 0));

            console.log(sampling,measuring,currentSamplePoint)
            if (currentSamplePoint.current == 0) {
                currentSamplePoint.current = 1;
                
                setSamplePoints(()=>{Object.assign(samplePoints, {startPoint: point})})
                
            } else {
                currentSamplePoint.current = 0;
                
                setSamplePoints(()=>{Object.assign(samplePoints, {endPoint: point})})
                setShowInput(true);

                const dx = samplePoints.startPoint.x - samplePoints.endPoint.x;
                const dy = samplePoints.startPoint.y - samplePoints.endPoint.y;
                const dz = samplePoints.startPoint.z - samplePoints.endPoint.z;
                console.log(dx,dy,dz)
                // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                sampleRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz)
                console.log(sampleRelativeDistance)
            }
            
            
            
            console.log(samplePoints)

            
        }
        
    };

    // useEffect (()=>{
    //     console.log(currentSamplePoint);
    // },[currentSamplePoint])
    // const func = useCallback(() => {
    //     console.log(samplePoints);
    //   },[samplePoints]);

    const raycastSplatMesh = function() {
        
        const renderDimensions = new THREE.Vector2();
        const toNewFocalPoint = new THREE.Vector3();
        const mousePos = new THREE.Vector3();
        const outHits = [];
    
        return function(x, y, viewer) {
            viewer.getRenderDimensions(renderDimensions);
            mousePos.set(x, y);
            console.log(mousePos)
            outHits.length = 0;
            viewer.raycaster.setFromCameraAndScreenPosition(viewer.camera, mousePos, renderDimensions);
            viewer.raycaster.intersectSplatMesh(viewer.splatMesh, outHits);
            if (outHits && outHits.length > 0) {
            console.log(outHits[0])
            }
            const alpha = 100
            const tempColor = new THREE.Vector4();
            let maxColor = {w:-1};
            let targetHit = null;
            // const hit = outHits.find(hit => {
            //     splatMesh.getSplatColor(hit.splatIndex,tempColor)
            //     console.log(tempColor)
            //     return tempColor.w >= alpha;
            // })
            outHits.forEach(hit => {
                splatMesh.getSplatColor(hit.splatIndex, tempColor);
                
                if (tempColor.w > maxColor.w) {
                    maxColor = { ...tempColor }; // 更新最大值
                    targetHit = hit; // 更新对应的hit
                }
            });
            
            return targetHit;
            
            
        };
    }();

    const createPoint = (pos, type, config={color:0x009bea, size:0.03}) => {
        if (type == 0) {  // 采样点
            config.color = 0xa52a2a;
        }
        let mat = new THREE.MeshBasicMaterial({color: config.color || 0x009bea });
        let sphereGeometry = new THREE.SphereGeometry(config.size || 0.3, 32, 32);
        let sphere = new THREE.Mesh(sphereGeometry, mat);
        sphere.position.set(pos.x, pos.y, pos.z);
        console.log(sphere)
        return sphere;
    };

    const createLine = (p1, p2, config={color:0x009bea}) => {
        let lineGeometry = new THREE.Geometry();
        let lineMaterial = new THREE.LineBasicMaterial({ color: config.color });
    
        lineGeometry.vertices.push(new THREE.Vector3().copy(p1), new THREE.Vector3().copy(p2));
    
        let line = new THREE.Line(lineGeometry, lineMaterial);
        return line;
    };

    //动态绘制线段
    const createSampleTrack = (p1, p2, config={color:0x009bea}) => {
        let points = [];
        let lineMaterial = new THREE.LineBasicMaterial({ color: config.color });
        let lineGeometry = new THREE.BufferGeometry();
        points.push(new THREE.Vector3().copy(start),new THREE.Vector3().copy(end));
        lineGeometry.setFromPoints(points);

        let line = new THREE.Line(lineGeometry, lineMaterial);

    }
    
    const handleInputChange = (e) => {
        sampleLength.current = e.target.value;
      };
    
    const handleButtonClick = () => {
        // setRatioInput(sampleLength);
        // setSampleLength(inputValue);
        setShowInput(false);
        setSampling(2);
        calculateScale();
    };
    const calculateScale = () => {
        console.log(sampleLength.current)
        let tempscale = 0;
        if (sampleLength.current !== 0 ) {
            
            tempscale = (sampleLength.current) / sampleRelativeDistance.current;

            scale.current = tempscale;
        }
        console.log(tempscale)
    }


    
    useLayoutEffect(() => {
        console.log(sampling, measuring, currentSamplePoint)
    }, [sampling, measuring,currentSamplePoint]);
  
    useEffect(() => {
        if (measuring === 1) {
            viewer.renderer.domElement.addEventListener('click', onClickMeasure, false);
        } else {
            viewer.renderer.domElement.removeEventListener('click', onClickMeasure, false);
        }
    }, [ measuring ]);

    useEffect(() => {              //移除事件
        if (sampling === 1) {
            viewer.renderer.domElement.addEventListener('click', onClickSample, false);
        } else {
            viewer.renderer.domElement.removeEventListener('click', onClickSample, false);
        }

        return () => {
            viewer.renderer.domElement.removeEventListener('click', onClickSample, false);
        };
    }, [sampling]);

    return (
        <div>
           <div className='widget-header'>
                <span style={{paddingLeft:'25px'}}>比例尺设定</span>
                <br/>
           </div>

           <div className='input-row'>
                <label>比例</label>
                <input className='ratio-input' value={scale.current} readOnly></input>
           </div>
           
            {sampling === 0 && <button onClick={()=>{ handleSamplingStart();console.log(sampling,measuring)}}>采样</button>}
            {sampling === 1 && <button onClick={()=>{ handleSamplingStop()}}>停止采样</button>}
            {sampling === 2 && <button onClick={handleSamplingReset}>重置</button>}
           <p></p>
           {showInput && (
                
                <div>
                <label>现在输入采样长度(m)</label>
                <input 
                    type="text" 
                    onChange={handleInputChange} 
                    placeholder="Enter value" 
                />
                <button onClick={handleButtonClick}>Submit</button>
                </div>
            )}
            <p/>
           <span>通过采样可定义模型的尺寸</span>
           <div className='prompt-box'>
                <span className='prompt-text'>1.双击模型添加测量点（两个点）</span><br></br>
                <span className='prompt-text'>2.给从起始点到终点的直线距离添加一个适当的采样单位</span>
           </div>
           <p/>
           <div className='widget-header'>
                <span style={{paddingLeft:'25px',fontSize:'20'}}>线段测量</span>
           </div>
           {measuring === 0 && <button onClick={handleMeasureStart}>开始测量</button>}
           {measuring === 1 && <button onClick={handleMeasureStop}>停止测量</button>}
           
        </div>
    )
}
export default MeasurementPanel;