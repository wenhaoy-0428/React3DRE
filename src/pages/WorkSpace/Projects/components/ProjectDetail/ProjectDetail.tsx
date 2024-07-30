import { runTrain_3DGS, runTrain_AbsGS, runTrain_GSObj, runTrain_NS } from '@/services/ant-design-pro/api';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useMemo } from 'react';
import DataProcessStep from './DataProcessStep';
import PreviewStep from './PreviewStep';
import TrainStep from './TrainStep';

// TODO (YWH): Integrate the following functions
// const openRender_NS = (id: API.OpenNerfViewerParams) => {
//   console.log(id);
//   setLoading(true);
//   openNerfViewer(id)
//     .then((response) => {
//       console.log(response);
//       const status = response.status;
//       console.log(status);
//       if (status == 'success') {
//         setLoading(false);
//         // {showMessage();}
//         // debugger;
//         window.location.href = '/show_model?id=' + id + '&websocket_url=' + response.websocket_url;
//       }
//     })
//     .catch((error) => {
//       console.error('Open Viewer error:', error);
//     });
// };

// const openRender_GS = (id: number) => {
//   window.location.href = '/viewer_3dgs?id=' + id;
// };

type ProjectDetailProps = {
  id: number;
  colmap_state: number;
  ns_state: number;
  n2m_state: number;
  gs_state: number;
  abs_state: number;
  gsobject_state: number;
};

const MethodType = {
  GS: 0,
  Abs3DGS: 1,
  GSObj: 2,
}

export default function ProjectDetail({
  id,
  colmap_state,
  ns_state,
  n2m_state,
  gs_state,
  abs_state,
  gsobject_state,
}: ProjectDetailProps) {
  const nerfSteps = ['数据处理', '训练', '预览'];

  // TODO (YWH): delete this when the data is ready
  // ns_state = 0;
  // colmap_state = 2;
  // gs_state = 2;

  // Function to calculate the step based on dataState and trainState
  const calStep = (dataState: number, trainState: number) => {
    let step = 0;
    if (dataState === 2) {
      step += 1;
    }
    if (trainState === 2) {
      step += 1;
    }
    return step;
  };

  // Calculate the step for the Nerf section based on colmap_state and ns_state
  const nerfStep = useMemo(() => calStep(colmap_state, ns_state), [colmap_state, ns_state]);

  // Calculate the step for the 3D Gaussian section based on colmap_state and gs_state
  const gsStep = useMemo(() => calStep(colmap_state, gs_state), [colmap_state, gs_state]);

  const absgsStep = useMemo(() => calStep(colmap_state, abs_state), [colmap_state, abs_state]);

  const gsobjectStep = useMemo(() => calStep(colmap_state, gsobject_state), [colmap_state, gsobject_state]);

  // const displayNerfStep = () => {
  //   switch (nerfStep) {
  //     case 0:
  //       return <DataProcessStep id={id} colmap_state={colmap_state} />;
  //     case 1:
  //       return <TrainStep id={id} state={ns_state} onStart={runTrain_NS} />;
  //     case 2:
  //       return (
  //         <PreviewStep
  //           onPreview={() => {
  //             console.log('PAGE JUMPING');
  //           }}
  //           id = {id}
  //         />
          
  //       );
  //   }
  // };

  const display3DGStep = () => {
    switch (gsStep) {
      case 0:
        return <DataProcessStep id={id} colmap_state={colmap_state} />;
      case 1:
        return <TrainStep id={id} state={gs_state} onStart={runTrain_3DGS} />;
      case 2:
        return (
          <PreviewStep
            onPreview={() => {
              console.log('PAGE JUMPING');
            }} 
            id = {id}
            method ={MethodType.GS}
          />
        );
    }
  };


  const displayAbsGStep = () => {
    switch (absgsStep) {
      case 0:
        return <DataProcessStep id={id} colmap_state={colmap_state} />;
      case 1:
        return <TrainStep id={id} state={abs_state} onStart={runTrain_AbsGS} />;
      case 2:
        return (
          <PreviewStep
            onPreview={() => {
              console.log('PAGE JUMPING');
            }} 
            id = {id}
            method ={MethodType.Abs3DGS}
          />
        );
    }
  };

  const displayGSObjStep = () => {
    switch (gsobjectStep) {
      case 0:
        return <DataProcessStep id={id} colmap_state={colmap_state} />;
      case 1:
        return <TrainStep id={id} state={abs_state} onStart={runTrain_GSObj} />;
      case 2:
        return (
          <PreviewStep
            onPreview={() => {
              console.log('PAGE JUMPING');
            }} 
            id = {id}
            method ={MethodType.GSObj}
          />
        );
    }
  };


  return (
    <div className="p-4">
      {/* <div className="nerf-stepper-wrapper bg-slate-50 p-3 my-3 rounded-lg flex flex-col gap-4">
        <div className="text-center font-bold text-[25px] italic">Nerf</div>
        <Stepper activeStep={nerfStep}>
          {nerfSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {displayNerfStep()}
      </div> */}

      <div className="3ds-stepper-wrapper bg-slate-50 p-3 my-3 rounded-lg flex flex-col gap-4">
        <div className="text-center font-bold text-[25px] italic">3D Gaussian</div>
        <Stepper activeStep={gsStep}>
          {nerfSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {display3DGStep()}
      </div>

      <div className="abs3ds-stepper-wrapper bg-slate-50 p-3 my-3 rounded-lg flex flex-col gap-4">
        <div className="text-center font-bold text-[25px] italic">Abs-3DGS</div>
        <Stepper activeStep={absgsStep}>
          {nerfSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {displayAbsGStep()}
      </div>

      <div className="abs3ds-stepper-wrapper bg-slate-50 p-3 my-3 rounded-lg flex flex-col gap-4">
        <div className="text-center font-bold text-[25px] italic">GS-Object</div>
        <Stepper activeStep={gsobjectStep}>
          {nerfSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {displayGSObjStep()}
      </div>

    </div>
  );
}
