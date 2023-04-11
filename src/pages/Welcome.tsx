import { getProjectsInfo } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Divider } from 'antd';
import React from 'react';
// import { Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const { Meta } = Card;
const InfoCard: React.FC<API.ProjectsAttribute> = ({ title, avatar }) => {
  // const { useToken } = theme;

  // const { token } = useToken();
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={avatar} />}
      actions={[
        // TODO 需要判断是否已经重建完成来决定该图标状态
        <PlayCircleOutlined key="start" />,
        // TODO 新开一个页面
        <EditOutlined key="edit" />,
        // TOOD 一个下拉菜单
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={title} />
    </Card>
  );
};
let projectInfos: any[];
getProjectsInfo().then((res) => {
  projectInfos = res.data;
}, null);
const Welcome: React.FC = () => {
  // const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      extra={[
        <Button key="1" type="primary">
          <Link to="/create_model">
            <PlusCircleTwoTone />
            创建模型
          </Link>
        </Button>,
      ]}
    >
      {/* TODO 这个Divider 太丑了 */}
      <Divider></Divider>
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {projectInfos.map((item, key) => (
            <InfoCard key={key} title={item.title} avatar={item.avatar} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
