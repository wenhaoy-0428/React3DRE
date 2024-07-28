import { runColmap_Common } from '@/services/ant-design-pro/api';
import { LinearProgress } from '@mui/material';
import { Button } from 'antd';
import { useState } from 'react';

const DataStatus = {
  INITIALIZED: 0,
  PROCESSING: 1,
  FINISHED: 2,
};

export default function DataProcessStep({
  id,
  colmap_state,
}: {
  id: number;
  colmap_state: number;
}) {
  const [state, setState] = useState<number>(colmap_state);

  console.log('DataProcessStep', id, state);

  const processData = (id: API.runColmapParams) => {
    runColmap_Common(id)
      .then((response) => {
        console.log(response);
        const status = response.status;
        if (status == 'success') {
          setState(DataStatus.PROCESSING);
        }
      })
      .catch((error) => {
        alert('请求发生错误');
      });
  };

  return (
    <div className="flex justify-center">
      {state === DataStatus.INITIALIZED && (
        <Button
          onClick={() => {
            // processData(id as API.runColmapParams);
            setState(DataStatus.PROCESSING);
          }}
        >
          数据未处理，点击开始处理数据
        </Button>
      )}
      {state === DataStatus.PROCESSING && (
        <div className="w-full">
          <div className="text-center font-bold">数据处理中</div>
          <LinearProgress />
        </div>
      )}
      {state === DataStatus.FINISHED && <Button>数据处理完成</Button>}
    </div>
  );
}
