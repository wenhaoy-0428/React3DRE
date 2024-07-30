import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UploadPanel from './UploadPanel';

export default function UploadButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ translateY: 30, opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ translateY: -10 }}
        className="fixed bottom-0 justify-center w-[300px] h-[60px] rounded-lg bg-blue-500"
      >
        <Button
          variant="contained"
          endIcon={<FileUploadIcon />}
          onClick={handleOpen}
          className="backdrop-blur-lg shadow-lg w-full h-full rounded-xl"
        >
          Upload
        </Button>
      </motion.div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className="flex justify-center items-center z-[98]"
      >
        <UploadPanel />
      </Modal>
    </>
  );
}
