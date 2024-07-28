//主页那个播放按钮
export default function RenderButton(props) {
  const [state, setState] = useState<number>(props.state);
  function showMessage() {
    message.success('Success!');
  }
  function showModal() {
    modal.warning({
      title: 'warning message',
      content: 'something went wrong',
    });
  }

  //发送打开渲染请求
  // function handleRender (title: API.OpenViewerParams) {
  //   setLoading(true)
  //   openViewer(title)
  //     .then((response) => {
  //       console.log(response);
  //       const status = response.status;
  //       console.log(status)
  //       if (status == 'success') {
  //         setLoading(false);
  //         // {showMessage();}
  //         // debugger;
  //         window.location.href = '/show_model?id='+title+'&websocket_url='+response.websocket_url;
  //       }

  //     })
  //     .catch((error) => {
  //       console.error('Open Viewer error:', error);
  //       // {showModal();}

  //     });
  // }

  //发送runCOLMAP请求
  function runColmapAndTrain(params: API.runColmapAndTrainParams_NerfStudio) {
    runColmapAndTrain_NerfStudio(params)
      .then((response) => {
        console.log(response.status);
        setState(1);
      })
      .catch((error) => {
        console.error('run colmap and train error:', error);
      });
  }
  const [isHandleDataModalOpen, setIsHandleDataModalOpen] = useState(false);
  const showHandleDataModal = () => {
    setIsHandleDataModalOpen(true);
  };
  const handleDataModalOK = (title, pano) => {
    const runColmapParams = { title, pano } as API.runColmapAndTrainParams_NerfStudio;
    console.log(runColmapParams);
    // debugger;
    runColmapAndTrain(runColmapParams);
    setIsHandleDataModalOpen(false);
  };
  const handleDataModalCancel = () => {
    setIsHandleDataModalOpen(false);
  };

  const [colmapDataType, setColmapDataType] = useState(0);
  const colmapDataTypeChange = (e: RadioChangeEvent) => {
    setColmapDataType(e.target.value);
  };

  //根据请求返回的state改变按钮状态
  if (state == 2) {
    return (
      <Button type="link" onClick={() => handleRender(props.title as API.OpenViewerParams)} block>
        <PlayCircleTwoTone key="start" twoToneColor="#52c41a" />
      </Button>
    );
  } else if (state == 1) {
    return (
      <Button block>
        <ClockCircleTwoTone key="start" />
      </Button>
    );
  } else if (state == 0) {
    return (
      <>
        <Button type="link" onClick={showHandleDataModal} block>
          <PlayCircleTwoTone key="start" twoToneColor="#eb2f2f" />
        </Button>
        <Modal
          title="数据处理选择"
          open={isHandleDataModalOpen}
          onOk={() => handleDataModalOK(props.title, colmapDataType)}
          onCancel={handleDataModalCancel}
        >
          <Radio.Group onChange={colmapDataTypeChange} value={colmapDataType}>
            <Radio value={0}>透视图</Radio>
            <Radio value={1}>全景图</Radio>
          </Radio.Group>
        </Modal>
      </>
    );
  }
}
