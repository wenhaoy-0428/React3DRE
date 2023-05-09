// import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { ViserWebSocket } from '../../components/WebSocket/ViserWebSocket';
import  App  from './inner';
import store from '../../store';
const ShowModel = () => {
  return (
    <Provider store={store}>
      <ViserWebSocket>
        <App />
      </ViserWebSocket>
    </Provider>
  );
};

export default ShowModel;