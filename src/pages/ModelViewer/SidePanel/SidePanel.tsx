import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import MeasurementPanel from './MeasurementPanel';

type TabPanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};
function TabPanel({ value, index, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

export default function SidePanel({ viewerRef }: { viewerRef: React.RefObject<HTMLDivElement> }) {
  const [activePanel, setActivePanel] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActivePanel(newValue);
  };

  return (
    <div className="side-panel w-full h-full border-r-black/30 border border-solid">
      <Tabs value={activePanel} onChange={handleChange} variant="fullWidth">
        <Tab label="场景" id="tab-0" />
        <Tab label="测量" id="tab-1" />
      </Tabs>
      <TabPanel value={activePanel} index={0}>
        <div>scene panel</div>
      </TabPanel>
      <TabPanel value={activePanel} index={1}>
        <MeasurementPanel viewerRef={viewerRef} />
      </TabPanel>
    </div>
  );
}
