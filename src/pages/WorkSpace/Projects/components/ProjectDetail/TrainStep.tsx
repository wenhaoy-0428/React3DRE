import { Button, LinearProgress } from '@mui/material';
import { useState } from 'react';

const TrainStatus = {
  UNTRAINED: 0,
  TRAINING: 1,
  FINISHED: 2,
};

type TrainStepProps = {
  id: number;
  state: number;
  onStart: (id: any) => Promise<any>;
};

export default function TrainStep({ id, state, onStart }: TrainStepProps) {
  // Define state for the training status
  const [status, setStatus] = useState<number>(state);

  console.log('TrainStep', id, state);
  // Function to start the training
  const startTraining = () => {
    setStatus(TrainStatus.TRAINING);
    onStart(id)
      .then((response: any) => {
        console.log(response);
        const status = response.status;
        if (status === 'success') {
          setStatus(TrainStatus.TRAINING);
        }
      })
      .catch((error) => {
        alert('请求发生错误');
      });
  };

  return (
    <div className="flex justify-center">
      {status === TrainStatus.UNTRAINED && (
        <Button onClick={startTraining}>未进行训练，点击开始训练</Button>
      )}
      {status === TrainStatus.TRAINING && (
        <div className="w-full">
          <div className="text-center font-bold">训练中</div>
          <LinearProgress />
        </div>
      )}
      {status === TrainStatus.FINISHED && <Button>训练完成</Button>}
    </div>
  );
}
