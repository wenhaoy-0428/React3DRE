import {
  Button,
  Chip,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import Dialog from '@mui/material/Dialog';
import DropDownSection from './DropDownSection';
import PointSet from './PointSet';

function MeasurementPanel(props) {
  const [sampling, setSampling] = useState(Number(0)); // 采样的状态0:未采样 1:采样中 2:采样完成
  const [measuring, setMeasuring] = useState(Number(0)); // 测量的状态0:未测量 1:测量中

  const [samplePoints, setSamplePoints] = useState({
    startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
    endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
    line: null,
  });

  const samplePointsRef = useRef({
    startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
    endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
    line: null,
  });

  // const [measurePoints, setMeasurePoints] = useState([
  //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null}
  // ]);
  const measurePointsRef = useRef([
    {
      startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      line: null,
      realLength: 0,
    },
  ]);
  const [measurePoints, setMeasurePoints] = useState(measurePointsRef.current);

  const [measureSets, setMeasureSets] = useState([{ name: null, realLength: 0 }]); //采样点
  const currentSamplePoint = useRef(0); //当前采样点是起始点还是终点
  const currentMeasurePoint = useRef(0);
  // const [inputValue, setInputValue] = useState(0);                  //真实
  // const [scale, setScale] = useState(Number(0));
  const scale = useRef(0); // 比例

  // let currentSamplePoint = 0 ;
  // let sampleLength = 0 ;

  const [showInput, setShowInput] = useState(false); // 取点完成后显示输入框
  const [measureComplete, setMeasureComplete] = useState(false); // 每次测量的完成情况
  // const [sampleLength, setSampleLength] = useState(0);            // 采样线段的真实长度

  const sampleLength = useRef(0);
  const measureLength = useRef([{ name: null, length: 0 }]);

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
    console.log('开始采样');

    setSampling(1);
    setMeasuring(0);

    console.log(sampling, measuring);
  };
  const samplePointPair = {};

  const handleSamplingStop = () => {
    console.log('停止采样');
    sampleRelativeDistance.current = 0;
    currentSamplePoint.current = 0;
    sampleLength.current = 0;
    scale.current = 0;
    setSampling(0);
    setMeasuring(0);
    // setSamplePoints(
    //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null}, line: null }
    // );
    samplePointsRef.current = {
      startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      line: null,
    };
    console.log(sampling, measuring, sampleRelativeDistance.current);
    console.log(samplePoints);
  };

  const handleSamplingReset = () => {
    console.log('重置');
    sampleLength.current = 0;
    currentSamplePoint.current = 0;
    sampleRelativeDistance.current = 0;
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
      startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
      line: null,
    };

    measurePointsRef.current.forEach((measure) => {
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
        startPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
        endPoint: { point: new THREE.Vector3(0, 0, 0), threePoint: null },
        line: null,
        realLength: 0,
      },
    ];
    setMeasurePoints(measurePointsRef.current);
    // setMeasurePoints([
    //     { startPoint: {point:new THREE.Vector3(0, 0, 0), threePoint: null}, endPoint: {point:new THREE.Vector3(0, 0, 0),threePoint: null} , line: null}
    // ]);
    console.log(sampling, measuring, sampleLength.current);
    console.log(samplePoints);
  };

  const handleMeasureStart = () => {
    console.log('开始测量');
    setMeasuring(1);
  };
  const handleMeasureStop = () => {
    console.log('停止测量');
    setMeasuring(0);
  };

  const onClickSample = (event) => {
    const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
    if (hit !== undefined) {
      const point = new THREE.Vector3(hit.origin.x, hit.origin.y, hit.origin.z);
      const threePoint = createPoint(point, 0);
      viewer.threeScene.add(threePoint);
      // samplePointPair = [{}];
      const pairId = `pair-${Date.now()}`;

      console.log(sampling, measuring, currentSamplePoint);
      if (currentSamplePoint.current == 0) {
        currentSamplePoint.current = 1;

        samplePointPair[pairId] = { startPoint: threePoint, endPoint: null, line: null };

        // setSamplePoints(()=>{Object.assign(samplePoints.startPoint, {point: point, threePoint:threePoint})})
        samplePointsRef.current.startPoint = { point: point, threePoint: threePoint };
      } else {
        currentSamplePoint.current = 0;

        // setSamplePoints(()=>{Object.assign(samplePoints.endPoint, {point: point, threePoint:threePoint})})

        samplePointsRef.current.endPoint = { point: point, threePoint: threePoint };
        console.log(samplePointsRef.current);

        const threeLine = createLine(
          samplePointsRef.current.startPoint.point,
          samplePointsRef.current.endPoint.point,
          0,
        );
        viewer.threeScene.add(threeLine);
        samplePointsRef.current.line = threeLine;
        // setSamplePoints(()=>{Object.assign(samplePoints,{line: threeLine})})

        // samplePointPair[pairId] = { startThreePoint: samplePoints.startPoint.threePoint, endThreePoint: samplePoints.endPoint.threePoint, threeLine: threeLine};
        // console.log(samplePointPair)
        const dx =
          samplePointsRef.current.startPoint.point.x - samplePointsRef.current.endPoint.point.x;
        const dy =
          samplePointsRef.current.startPoint.point.y - samplePointsRef.current.endPoint.point.y;
        const dz =
          samplePointsRef.current.startPoint.point.z - samplePointsRef.current.endPoint.point.z;
        console.log(dx, dy, dz);
        // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        sampleRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz);
        console.log(sampleRelativeDistance.current);

        setShowInput(true);
      }
      console.log(samplePoints);
    }
  };

  const onClickMeasure = (event) => {
    measureRelativeDistance.current = 0;

    const hit = raycastSplatMesh(event.offsetX, event.offsetY, viewer);
    console.log(hit);
    if (hit !== undefined) {
      const point = new THREE.Vector3(hit.origin.x, hit.origin.y, hit.origin.z);
      const threePoint = createPoint(point, 1);
      viewer.threeScene.add(threePoint);

      console.log(measuring, currentMeasurePoint);
      if (currentMeasurePoint.current == 0) {
        currentMeasurePoint.current = 1;
        setMeasureComplete(true);

        // measurePointsRef.current = {startPoint:{point: point, threePoint:threePoint}, endPoint:null,line:null}
        if (
          measurePointsRef.current.length == 1 &&
          measurePointsRef.current[0].endPoint.threePoint == null
        ) {
          measurePointsRef.current[0].startPoint = { point: point, threePoint: threePoint };
        } else {
          measurePointsRef.current.push({
            startPoint: { point: point, threePoint: threePoint },
            endPoint: null,
            line: null,
            realLength: 0,
          });
        }
      } else {
        currentMeasurePoint.current = 0;

        // setMeasurePoints(()=>{Object.assign(measurePoints, {endPoint: point})})

        const lastMeasure = measurePointsRef.current[measurePointsRef.current.length - 1];
        lastMeasure.endPoint = { point: point, threePoint: threePoint };
        const threeLine = createLine(lastMeasure.startPoint.point, lastMeasure.endPoint.point, 1);
        lastMeasure.line = threeLine;

        const startPoint = lastMeasure.startPoint.point;
        const dx = startPoint.x - point.x;
        const dy = startPoint.y - point.y;
        const dz = startPoint.z - point.z;
        // console.log(dx,dy,dz)
        // sampleRelativeDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        measureRelativeDistance.current = Math.sqrt(dx * dx + dy * dy + dz * dz);
        console.log(measureRelativeDistance);
        // measureLength =
        const realLength = measureRelativeDistance.current * scale.current;
        lastMeasure.realLength = realLength;
        console.log(lastMeasure);
        console.log(measurePointsRef.current);

        setMeasureComplete(false);
        // setSamplePoints(()=>{Object.assign(samplePoints.startPoint, {point: point, threePoint:threePoint})})

        // console.log(measureSets)
        setMeasurePoints([...measurePointsRef.current]);
      }
      console.log(measurePoints);
    }
  };
  useEffect(() => {
    setMeasurePoints(measurePointsRef.current);
  }, [measurePointsRef.current]);

  const raycastSplatMesh = (function () {
    const renderDimensions = new THREE.Vector2();
    const toNewFocalPoint = new THREE.Vector3();
    const mousePos = new THREE.Vector3();
    const outHits = [];

    return function (x, y, viewer) {
      viewer.getRenderDimensions(renderDimensions);
      mousePos.set(x, y);
      console.log(mousePos);
      outHits.length = 0;
      viewer.raycaster.setFromCameraAndScreenPosition(viewer.camera, mousePos, renderDimensions);
      viewer.raycaster.intersectSplatMesh(viewer.splatMesh, outHits);
      if (outHits && outHits.length > 0) {
        console.log(outHits[0]);
      }
      const alpha = 100;
      const tempColor = new THREE.Vector4();
      let maxColor = { w: -1 };
      let targetHit = null;
      targetHit = outHits.find((hit) => {
        splatMesh.getSplatColor(hit.splatIndex, tempColor);
        console.log(tempColor);
        return tempColor.w >= alpha;
      });
      // outHits.forEach(hit => {
      //     splatMesh.getSplatColor(hit.splatIndex, tempColor);

      //     if (tempColor.w > maxColor.w) {
      //         maxColor = { ...tempColor }; // 更新最大值
      //         targetHit = hit; // 更新对应的hit
      //     }
      // });

      return targetHit;
    };
  })();

  const createPoint = (pos, type, config = { color: 0x009bea, size: 0.01 }) => {
    console.log(type);
    if (type == 0) {
      // 采样点
      config.color = 0xa52a2a;
    }
    let mat = new THREE.MeshBasicMaterial({ color: type ? 0x009bea : 0xffcc00 });
    let sphereGeometry = new THREE.SphereGeometry(config.size || 0.3, 32, 32);
    let sphere = new THREE.Mesh(sphereGeometry, mat);
    sphere.position.set(pos.x, pos.y, pos.z);
    console.log(sphere);
    return sphere;
  };

  const createLine = (p1, p2, type, config = { color: 0x009bea }) => {
    // console.log(p1,p2)
    if (type == 0) {
      // 采样点
      config.color = 0xa52a2a;
    }
    const points = [];
    points.push(new THREE.Vector3().copy(p1));
    points.push(new THREE.Vector3().copy(p2));
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    let lineMaterial = new THREE.LineBasicMaterial({ color: type ? 0x009bea : 0xffcc00 });

    // lineGeometry.vertices.push(new THREE.Vector3().copy(p1), new THREE.Vector3().copy(p2));

    let line = new THREE.Line(lineGeometry, lineMaterial);
    return line;
  };

  //动态绘制线段
  const createSampleTrack = (p1, p2, config = { color: 0x009bea }) => {
    let points = [];
    let lineMaterial = new THREE.LineBasicMaterial({ color: config.color });
    let lineGeometry = new THREE.BufferGeometry();
    points.push(new THREE.Vector3().copy(start), new THREE.Vector3().copy(end));
    lineGeometry.setFromPoints(points);

    let line = new THREE.Line(lineGeometry, lineMaterial);
  };

  const handleInputChange = (e) => {
    sampleLength.current = e.target.value;
  };

  // value of the input
  const [sampleInput, setSampleInput] = useState(undefined);
  const [sampleInputError, setSampleInputError] = useState(false);

  const handleSampleSubmit = () => {
    const length = parseFloat(sampleInput);
    if (!isNaN(length)) {
      // Use the sampleLength value as needed
      console.log(`Sample Length: ${length}`);
      sampleLength.current = length;
      setShowInput(false);
      setSampling(2);
      calculateScale();
    } else {
      setSampleInputError(true);
    }
  };

  const calculateScale = () => {
    console.log(sampleLength.current);
    let tempscale = 0;
    if (sampleLength.current !== 0) {
      tempscale = sampleLength.current / sampleRelativeDistance.current;

      scale.current = tempscale;
    }
    console.log(tempscale);
  };

  useLayoutEffect(() => {
    console.log(sampling, measuring, currentSamplePoint);
  }, [sampling, measuring, currentSamplePoint]);

  useEffect(() => {
    if (measuring === 1) {
      viewer.renderer.domElement.addEventListener('contextmenu', onClickMeasure, false);
    } else {
      viewer.renderer.domElement.removeEventListener('contextmenu', onClickMeasure, false);
    }
    return () => {
      viewer.renderer.domElement.removeEventListener('contextmenu', onClickMeasure, false);
    };
  }, [measuring]);

  useEffect(() => {
    //移除事件
    if (sampling === 1) {
      viewer.renderer.domElement.addEventListener('contextmenu', onClickSample, false);
    } else {
      viewer.renderer.domElement.removeEventListener('contextmenu', onClickSample, false);
    }

    return () => {
      viewer.renderer.domElement.removeEventListener('contextmenu', onClickSample, false);
    };
  }, [sampling]);

  const displaySamplingOptions = () => {
    switch (sampling) {
      case 0:
        return (
          <Button
            onClick={() => {
              handleSamplingStart();
              console.log(sampling, measuring);
            }}
            variant="contained"
          >
            采样
          </Button>
        );
      case 1:
        return (
          <Button
            onClick={() => {
              handleSamplingStop();
            }}
            variant="contained"
          >
            停止
          </Button>
        );
      case 2:
        return (
          <Button onClick={handleSamplingReset} className="text-red-400">
            重置
          </Button>
        );
    }
  };

  return (
    <div className="">
      <DropDownSection title="比例尺设定">
        <div className="flex flex-col">
          <div className="grid-cols-3 grid justify-center justify-items-start p-3 gap-3 ">
            <div>比例</div>
            <input
              className="w-full rounded-md bg-slate-400 col-span-2 px-2"
              value={scale.current}
              readOnly
            />
            <div className="col-start-3 justify-self-end">{displaySamplingOptions()}</div>
          </div>
          <Divider className="w-full">
            <Chip label="引导" size="small" />
          </Divider>
          <div className="p-3">
            <div>通过采样可定义模型的尺寸</div>
            <div className="">1.点击采样，右键点击模型添加测量点（两个点）</div>
            <div className="">2.给出从起始点到终点的直线真实距离</div>
            <div className="">3.得到比例，之后可以进行线段测量</div>
          </div>
        </div>
      </DropDownSection>

      <DropDownSection title="线段测量">
        <div className="p-3 flex justify-center">
          {measuring === 0 ? (
            <Button onClick={() => handleMeasureStart()} size="large">
              开始测量
            </Button>
          ) : (
            <Button color="error" onClick={() => handleMeasureStop()} size="large">
              停止测量
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 p-3">
          {measurePoints &&
            measurePointsRef.current.map((measure, index) => (
              <PointSet
                startPoint={measure.startPoint.point}
                endPoint={measure.endPoint.point}
                length={measure.realLength}
                key={index}
              />
            ))}
        </div>
      </DropDownSection>

      <Dialog open={showInput}>
        <div className="w-[500px] h-[200px] flex flex-col justify-center gap-3 px-[80px]">
          <div className="text-center text-xl font-bold">请输入采样线段真实长度</div>
          <FormControl error={sampleInputError}>
            <FilledInput
              endAdornment={<InputAdornment position="end">米</InputAdornment>}
              value={sampleInput}
              onChange={(e) => {
                setSampleInput(e.target.value);
              }}
            />

            {sampleInputError && <FormHelperText>Please enter a valid number</FormHelperText>}
          </FormControl>

          <Button onClick={handleSampleSubmit}>Submit</Button>
        </div>
      </Dialog>
    </div>
  );
}
export default MeasurementPanel;
