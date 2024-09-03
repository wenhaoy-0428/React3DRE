import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

export default function DropDownSection({ title, children }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="cursor-pointer bg-inherit hover:bg-slate-200 active:bg-slate-300"
      >
        <div className="flex justify-between">
          <div className="w-full font-bold text-[20px] italic">{title}</div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
}
