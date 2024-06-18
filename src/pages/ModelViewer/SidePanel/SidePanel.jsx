import React, { useState } from 'react';
import './sidepanel.css';
import MeasurementPanel from './MeasurementPanel';

const SidePanel = (props) => {
    const [activePanel, setActivePanel] = useState('measurement');


    function ScenePanel(){
        return (<i>scene panel</i>);
    }
    // function MeasurementsPanel() {
    //     return (
    //     <div style={{padding: '20px'}}>
    //         <h2>测量功能</h2>
    //         <p>这里是测量功能的具体内容。</p>
    //     </div>
    //     );
    // }

    return (
        <div className='sidePanel' style={{position:'fixed', top: '60px', left: '0px', width:'320px', height: 'calc(100% - 60px)', backgroundColor:'#fff'}}>
            <div className='Tabs'>
                <ul className='Functions'>
                    <li className={`Function ${activePanel === 'scene' ? 'active' : ''}`} id='scene' onClick={() => setActivePanel('scene')}>场景</li>
                    <li className={`Function ${activePanel === 'measurement' ? 'active' : ''}`} id='measurement' onClick={() => setActivePanel('measurement')}><img src='/icons/measurement.svg' alt='测量' style={{width:'30px', height:'30px'}}></img>测量</li>
                </ul>
            </div>
            <div className='Panel'>
                {activePanel === 'scene' && <ScenePanel />}
                {activePanel === 'measurement' && <MeasurementPanel  viewerRef={props.viewerRef}></MeasurementPanel> }
            </div>
        </div>
    );
};

export default SidePanel;
