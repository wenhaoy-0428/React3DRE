import { runTrain_3DGS, runTrain_NS } from '@/services/ant-design-pro/api';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useMemo } from 'react';
import DataProcessStep from './ProjectDetail/DataProcessStep';
import PreviewStep from './ProjectDetail/PreviewStep';
import TrainStep from './ProjectDetail/TrainStep';

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
};

export default function ProjectDetail({
  id,
  colmap_state,
  ns_state,
  n2m_state,
  gs_state,
}: ProjectDetailProps) {
  const nerfSteps = ['数据处理', '训练', '预览'];

  ns_state = 0;
  colmap_state = 2;
  gs_state = 2;

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

  const displayNerfStep = () => {
    switch (nerfStep) {
      case 0:
        return <DataProcessStep id={id} colmap_state={colmap_state} />;
      case 1:
        return <TrainStep id={id} state={ns_state} onStart={runTrain_NS} />;
      case 2:
        return (
          <PreviewStep
            onPreview={() => {
              console.log('PAGE JUMPING');
            }}
          />
        );
    }
  };

  const display3DGStep = () => {
    switch (nerfStep) {
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
          />
        );
    }
  };

  return (
    <div className="p-4">
      <div className="nerf-stepper-wrapper bg-slate-50 p-3 my-3 rounded-lg flex flex-col gap-4">
        <div className="text-center font-bold text-[25px] italic">Nerf</div>
        <Stepper activeStep={nerfStep}>
          {nerfSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {displayNerfStep()}
      </div>

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
    </div>
  );
}
