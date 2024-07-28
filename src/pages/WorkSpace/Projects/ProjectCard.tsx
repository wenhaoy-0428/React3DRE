type ProjectsCardProps = {
  project: API.ProjectsAttribute;
};

import { Avatar, Card, CardActions, CardContent, CardMedia, Popover } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectDetail from './ProjectDetail';

export default function ProjectsCard({ project }: ProjectsCardProps) {
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div className="max-h-[500px] rounded-2xl">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="w-[300px]" onClick={handleClick}>
          <CardMedia sx={{ height: 180 }} image={project.avatar} />
          <CardContent className="flex justify-between">
            <div>
              <div className="italic text-gray-400 text-[10px]">{project.datetime.toString()}</div>
              <div className="font-bold text-[18px]">{project.title}</div>
            </div>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </motion.div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
    </div>
  );
}

// const items: MenuProps['items'] = [
//   {
//     key: '1',
//     label: (
//       <Button type="text">1st</Button>
//       // <a target='_blank' rel='noopener noreferrer' href=''>
//       //   1st menu item
//       // </a>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <a rel="noopener noreferrer" href=" javascript:void(0)" onClick={handleTrain_N2M}>
//         Nerf2Mesh
//       </a>
//     ),
//   },
//   {
//     key: '3',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="">
//         3st menu item
//       </a>
//     ),
//     disabled: true,
//   },
// ];
// cover={<AvatarConvert imageData={item.avatar} />}
//       actions={[
//         <Popover content={'hello'} title="训练进度">
//           <PartitionOutlined />
//         </Popover>,
//         // TODO: YWH
//         // <RenderButton title={item.title} state={item.state} />,

//         <ModalForm
//           title="编辑信息"
//           formRef={restFormRef}
//           open={modalVisible}
//           trigger={<EditOutlined key="edit" />}
//           onOpenChange={setModalVisible}
//           submitter={{
//             searchConfig: {
//               resetText: '重置',
//             },
//             resetButtonProps: {
//               onClick: () => {
//                 restFormRef.current?.resetFields();
//               },
//             },
//           }}
//           onFinish={async (values) => {
//             await waitTime(2000);
//             console.log(values);
//             message.success('提交成功');
//             return true;
//           }}
//         >
//           <ProFormText
//             width="md"
//             name="title"
//             label="模型名称"
//             tooltip=""
//             placeholder={item.title}
//           />
//           <ProFormUploadButton
//             name="avatar"
//             label="封面"
//             max={1}
//             fieldProps={{
//               name: 'file',
//               listType: 'picture-card',
//             }}
//           />
//         </ModalForm>,

//         // TOOD 一个下拉菜单
//         <Dropdown menu={{ items }}>
//           <a onClick={(e) => e.preventDefault()}>
//             <EllipsisOutlined key="extra" />
//           </a>
//         </Dropdown>,
//       ]}
//     >
//       <Meta
//         avatar={}
//         title={props.title}
//       />
