type ProjectsCardProps = {
  project: API.ProjectsAttribute;
};

import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Popover,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectDetail from './ProjectDetail';
import ProjectEdit from './ProjectEdit';
export default function ProjectsCard({ project }: ProjectsCardProps) {
  // State variables
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const openDetail = Boolean(anchorEl);

  // Event handlers
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setAnchorEl(null);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: mounted ? 0.2 : project.id * 0.1,
        delay: mounted ? 0 : project.id * 0.1,
      },
    },
    exit: { scale: 0 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-h-[500px] ">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
      >
        <Card className="w-[300px] rounded-2xl" onClick={handleClick}>
          <CardMedia image={project.avatar} className="h-[180px] shadow-md" />
          <CardContent className="flex justify-between">
            <div>
              <div className="italic text-gray-400 text-[10px]">{project.datetime.toString()}</div>
              <div className="font-bold text-[18px]">{project.title}</div>
            </div>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          </CardContent>
          <CardActions className="flex justify-between">
            <IconButton
              aria-label="project-config"
              onClick={(e) => {
                e.stopPropagation();
                setOpenEdit(true);
              }}
            >
              <SettingsIcon />
            </IconButton>
            <div
              className="font-bold italic hover:bg-slate-200 h-full p-3 cursor-pointer text-[13px]  rounded-md shadow-lg overflow-hidden bg-slate-50"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Nerf2Mesh');
              }}
            >
              Nerf2Mesh
            </div>
          </CardActions>
        </Card>
      </motion.div>

      {/* Popover for project detail */}
      <Popover
        open={openDetail}
        anchorEl={anchorEl}
        onClose={handleDetailClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        slotProps={{ paper: { className: 'rounded-2xl w-[400px]' } }}
      >
        <ProjectDetail
          id={project.id}
          colmap_state={project.colmap_state}
          ns_state={project.ns_state}
          n2m_state={project.n2m_state}
          gs_state={project.gs_state}
        />
      </Popover>

      {/* Modal for project edit */}
      <Modal open={openEdit} onClose={handleEditClose} className="flex justify-center items-center">
        <ProjectEdit />
      </Modal>
    </div>
  );
}
