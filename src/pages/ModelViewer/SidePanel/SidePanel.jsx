import PublicIcon from '@mui/icons-material/Public';
import StraightenIcon from '@mui/icons-material/Straighten';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

import MeasurementPanel from './MeasurementPanel';

function Panel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {index === value && children}
    </div>
  );
}

const SidePanel = (props) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="side-panel w-full h-full border-r-black/30 border border-solid">
      <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange}>
        <Tab icon={<PublicIcon />} />

        <Tab icon={<StraightenIcon />} />
      </Tabs>
      <div className="">
        <Panel index={0} value={tabValue}>
          <div>scene panel</div>
        </Panel>
        <Panel index={1} value={tabValue}>
          <MeasurementPanel viewerRef={props.viewerRef} />
        </Panel>
      </div>
    </div>
  );
};

export default SidePanel;
