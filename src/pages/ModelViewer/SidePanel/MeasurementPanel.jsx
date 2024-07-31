import * as React from 'react';
import * as THREE from 'three';
import { useState, useEffect,  useLayoutEffect, useRef } from 'react';

import { flushSync } from 'react-dom';

function MeasurementPanel(props) {
    
    const [sampling, setSampling] = useState(Number(0));           // 采样的状态0:未采样 1:采样中 2:采样完成
    const [measuring, setMeasuring] = useState(Number(0));          // 测量的状态0:未测量 1:测量中 

    const [samplePoints, setSamplePoints] = useState(
        { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null }
    ); 
    
    const samplePointsRef = useRef({ startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null });

    // const [measurePoints, setMeasurePoints] = useState([
    //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null}
    // ]);
    const measurePointsRef = useRef([
        { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null, realLength: 0 }
    ]);
    const [measurePoints, setMeasurePoints] = useState(measurePointsRef.current);

    const [measureSets, setMeasureSets] = useState([{name: null, realLength: 0}]);                                                                              //采样点    
    const currentSamplePoint= useRef(0);  //当前采样点是起始点还是终点
    const currentMeasurePoint= useRef(0);
    // const [inputValue, setInputValue] = useState(0);                  //真实
    // const [scale, setScale] = useState(Number(0)); 
    const scale = useRef(0);                 // 比例
    
    // let currentSamplePoint = 0 ;
    // let sampleLength = 0 ;

    const [showInput, setShowInput] = useState(false);              // 取点完成后显示输入框
    const [measureComplete, setMeasureComplete] = useState(false);    // 每次测量的完成情况
    // const [sampleLength, setSampleLength] = useState(0);            // 采样线段的真实长度

    const sampleLength = useRef(0);
    const measureLength = useRef([{name: null, length: 0}])

    // let sampleLength = 0      
    
    // const [sampleRelativeDistance, setSampleRelativeDistance]= useState(0);
    const sampleRelativeDistance = useRef(0);
    const measureRelativeDistance = useRef(0);
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
    const samplePointPair = {}
    
    const handleSamplingStop = () => {
        console.log("停止采样");
        sampleRelativeDistance.current =  0;
        currentSamplePoint.current = 0;
        sampleLength.current = 0;
        scale.current = 0;
        setSampling(0);
        setMeasuring(0);
        // setSamplePoints(
        //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null }
        // );
        samplePointsRef.current = {
            startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null},
            endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null},
            line: null
        }
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
        // setSamplePoints(
        //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null} , line: null}
        // );
        if (samplePointsRef.current.startPoint.threePoint) {
            viewer.threeScene.remove(samplePointsRef.current.startPoint.threePoint);
        }
        if (samplePointsRef.current.endPoint.threePoint) {
            viewer.threeScene.remove(samplePointsRef.current.endPoint.threePoint);
        }
        if (samplePointsRef.current.line) {
            viewer.threeScene.remove(samplePointsRef.current.line);
        }

        samplePointsRef.current = {
            startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null},
            endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null},
            line: null
        }

        measurePointsRef.current.forEach(measure => {
            if (measure.startPoint.threePoint) {
                viewer.threeScene.remove(measure.startPoint.threePoint);
            }
            if (measure.endPoint.threePoint) {
                viewer.threeScene.remove(measure.endPoint.threePoint);
            }
            if (measure.line) {
                viewer.threeScene.remove(measure.line);
            }
        });

        measurePointsRef.current = [
            { 
                startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, 
                endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, 
                line: null ,
                realLength: 0
            }
        ];
        setMeasurePoints(measurePointsRef.current);
        // setMeasurePoints([
        //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null} , line: null}
        // ]);
        console.log(sampling,measuring, sampleLength.current)
        console.log(samplePoints);
    }

    const handleMeasureStart = () => {
        console.log("开始测量");
        setMeasuring(1);
    };
    const handleMeasureStop = () => {
        console.log("停止测量");
        setMeasuring(0);
    };

    const onClickSample =(event)=> {
        
        const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
        if (hit !== undefined) {
            const point = new THREE.Vector3(hit.origin.x,hit.origin.y,hit.origin.z)
            const threePoint = createPoint(point, 0);
            viewer.threeScene.add(threePoint);
            // samplePointPair = [{}];
            const pairId = `pair-${Date.now()}`;

            console.log(sampling,measuring,currentSamplePoint)
            if (currentSamplePoint.current == 0) {
                currentSamplePoint.current = 1;

                
                samplePointPair[pairId] = { startPoint: threePoint, endPoint:null, line:null};
                
                // setSamplePoints(()=>{Object.assign(samplePoints.startPoint, {point: point, threePoint:threePoint})})
                samplePointsRef.current.startPoint = {point: point, threePoint:threePoint}
    
                
            } else {
                currentSamplePoint.current = 0;
                
                // setSamplePoints(()=>{Object.assign(samplePoints.endPoint, {point: point, threePoint:threePoint})})
                
                samplePointsRef.current.endPoint = {point: point, threePoint:threePoint}
                console.log(samplePointsRef.current)
                setShowInput(true);

                const threeLine = createLine(samplePointsRef.current.startPoint.point, samplePointsRef.current.endPoint.point, 0);
                viewer.threeScene.add(threeLine)
                samplePointsRef.current.line = threeLine;
                // setSamplePoints(()=>{Object.assign(samplePoints,{line: threeLine})})

                
                // samplePointPair[pairId] = { startThreePoint: samplePoints.startPoint.threePoint, endThreePoint: samplePoints.endPoint.threePoint, threeLine: threeLine};
                // console.log(samplePointPair)
                const dx = samplePointsRef.current.startPoint.point.x - samplePointsRef.current.endPoint.point.x;
                const dy = samplePointsRef.current.startPoint.point.y - samplePointsRef.current.endPoint.point.y;
                const dz = samplePointsRef.current.startPoint.point.z - samplePointsRef.current.endPoint.point.z;
                console.log(dx,dy,dz)
                // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                sampleRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz)
                console.log(sampleRelativeDistance.current)

                const popup = sampleLengthInput();
                document.body.appendChild(popup);
                
                // sampleLengthInput()
                
                

            }
            console.log(samplePoints)
        }
    };

    // const sampleLengthInput = () => {
    //     const dom1 = document.getElementById("rootDiv");
    //     var length = dom1.prompt("请输入采样线段真实长度（以米为单位）", 0);
    //     if (length !== null) {
    //         sampleLength.current = length;
    //         setShowInput(false);
    //         setSampling(2);
    //         calculateScale();
    //     }
        
    // }
    const sampleLengthInput = () => {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)';
        popup.style.zIndex = '1000';
        
    
        const label = document.createElement('label');
        label.innerText = '请输入采样线段真实长度（以米为单位）: ';
        popup.appendChild(label);
    
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'sample-length';
        input.style.marginLeft = '10px';
        popup.appendChild(input);
    
        const button = document.createElement('button');
        button.innerText = 'Submit';
        button.style.marginLeft = '10px';
        button.onclick = () => {
            const length = parseFloat(document.getElementById('sample-length').value);
            if (!isNaN(length)) {
                // Use the sampleLength value as needed
                console.log(`Sample Length: ${length}`);
                sampleLength.current = length;
                setShowInput(false);
                setSampling(2);
                calculateScale();
                document.body.removeChild(popup);
            } else {
                alert('Please enter a valid number.');
            }
        };
        popup.appendChild(button);
    
        return popup;
    };

    const onClickMeasure =(event)=> {
        measureRelativeDistance.current = 0;

        const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
        console.log(hit);
        if (hit !== undefined) {
            const point = new THREE.Vector3(hit.origin.x,hit.origin.y,hit.origin.z);
            const threePoint = createPoint(point, 1);
            viewer.threeScene.add(threePoint);

            console.log(measuring,currentMeasurePoint)
            if (currentMeasurePoint.current == 0) {
                currentMeasurePoint.current = 1;
                setMeasureComplete(true);
                
                // measurePointsRef.current = {startPoint:{point: point, threePoint:threePoint}, endPoint:null,line:null}
                if (measurePointsRef.current.length == 1 && measurePointsRef.current[0].endPoint.threePoint == null) {
                    measurePointsRef.current[0].startPoint = {point: point, threePoint:threePoint};
                } else {
                    measurePointsRef.current.push({
                        startPoint: {point: point, threePoint:threePoint},
                        endPoint: null,
                        line: null,
                        realLength: 0
                    });
                }
                
                
            } else {
                currentMeasurePoint.current = 0;
                
                // setMeasurePoints(()=>{Object.assign(measurePoints, {endPoint: point})})
                
                const lastMeasure = measurePointsRef.current[measurePointsRef.current.length-1];
                lastMeasure.endPoint = {point: point, threePoint:threePoint};
                const threeLine = createLine(lastMeasure.startPoint.point, lastMeasure.endPoint.point, 1);
                lastMeasure.line = threeLine;

                const startPoint = lastMeasure.startPoint.point;
                const dx = startPoint.x - point.x;
                const dy = startPoint.y - point.y;
                const dz = startPoint.z - point.z;
                // console.log(dx,dy,dz)
                // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                measureRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz)
                console.log(measureRelativeDistance)
                // measureLength = 
                const realLength = measureRelativeDistance.current * scale.current;
                lastMeasure.realLength = realLength;
                console.log(lastMeasure)
                console.log(measurePointsRef.current)

                setMeasureComplete(false);
                // setSamplePoints(()=>{Object.assign(samplePoints.startPoint, {point: point, threePoint:threePoint})})
                
                // console.log(measureSets)
                setMeasurePoints([...measurePointsRef.current])
            }
            console.log(measurePoints)
        }
    };
    useEffect(() => {
        setMeasurePoints(measurePointsRef.current);
        
    }, [measurePointsRef.current]);

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
            targetHit = outHits.find(hit => {
                splatMesh.getSplatColor(hit.splatIndex,tempColor)
                console.log(tempColor)
                return tempColor.w >= alpha;
            })
            // outHits.forEach(hit => {
            //     splatMesh.getSplatColor(hit.splatIndex, tempColor);
                
            //     if (tempColor.w > maxColor.w) {
            //         maxColor = { ...tempColor }; // 更新最大值
            //         targetHit = hit; // 更新对应的hit
            //     }
            // });
            
            return targetHit;
            
            
        };
    }();

    const createPoint = (pos, type, config={color:0x009bea, size:0.01}) => {
        console.log(type)
        if (type == 0) {  // 采样点
            config.color = 0xa52a2a;
        }
        let mat = new THREE.MeshBasicMaterial({color: (type? 0x009bea : 0xffcc00)  });
        let sphereGeometry = new THREE.SphereGeometry(config.size || 0.3, 32, 32);
        let sphere = new THREE.Mesh(sphereGeometry, mat);
        sphere.position.set(pos.x, pos.y, pos.z);
        console.log(sphere)
        return sphere;
    };

    const createLine = (p1, p2, type, config={color:0x009bea}) => {
        // console.log(p1,p2)
        if (type == 0) {  // 采样点
            config.color = 0xa52a2a;
        }
        const points = [];
        points.push(new THREE.Vector3().copy(p1));
        points.push(new THREE.Vector3().copy(p2));
        let lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        let lineMaterial = new THREE.LineBasicMaterial({color: (type? 0x009bea : 0xffcc00)  });
        
        // lineGeometry.vertices.push(new THREE.Vector3().copy(p1), new THREE.Vector3().copy(p2));
    
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
            viewer.renderer.domElement.addEventListener('contextmenu', onClickMeasure, false);
        } else {
            viewer.renderer.domElement.removeEventListener('contextmenu', onClickMeasure, false);
        }
        return () => {
            viewer.renderer.domElement.removeEventListener('contextmenu', onClickMeasure, false);
        };
    }, [ measuring ]);

    useEffect(() => {              //移除事件
        if (sampling === 1) {
            viewer.renderer.domElement.addEventListener('contextmenu', onClickSample, false);
        } else {
            viewer.renderer.domElement.removeEventListener('contextmenu', onClickSample, false);
        }

        return () => {
            viewer.renderer.domElement.removeEventListener('contextmenu', onClickSample, false);
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
           {/* {showInput && (
                
                <div>
                <label>现在输入采样长度(m)</label>
                <input 
                    type="text" 
                    onChange={handleInputChange} 
                    placeholder="Enter value" 
                />
                <button onClick={handleButtonClick}>Submit</button>
                </div>
            )} */}
            <p/>
           <span>通过采样可定义模型的尺寸</span>
           <div className='prompt-box'>
                <span className='prompt-text'>1.点击采样，右键点击模型添加测量点（两个点）</span><br></br>
                <span className='prompt-text'>2.给出从起始点到终点的直线真实距离</span>
                <span className='prompt-text'>3.得到比例，之后可以进行线段测量</span>
           </div>
           <p/>
           <hr/>
           <div className='widget-header'>
                <span style={{paddingLeft:'25px',fontSize:'20'}}>线段测量</span>
           </div>
           {measuring === 0 && <button onClick={()=>handleMeasureStart()}>开始测量</button>}
           {measuring === 1 && <button onClick={()=>handleMeasureStop()}>停止测量</button>}
           <hr/>
           
           
           <div>
            <ul>
            {measurePoints  && measurePointsRef.current.map((measure,index) => (
                    <li key={index}>
                        <div>
                            <strong>起点: </strong> 
                            {` (${measure.startPoint.point.x}, ${measure.startPoint.point.y}, ${measure.startPoint.point.z})`}
                        </div>
                        {measure.endPoint && 
                            <div>
                                <strong>终点: </strong> 
                                {` (${measure.endPoint.point.x}, ${measure.endPoint.point.y}, ${measure.endPoint.point.z})`}
                            </div>
                        }
                        {measure.realLength &&
                            <div>
                                <strong>真实长度: </strong> {measure.realLength}
                            </div>
                        }
                        
                    </li>
                
                ))} 
            </ul>
           </div>
        </div>
    )
}
export default MeasurementPanel;