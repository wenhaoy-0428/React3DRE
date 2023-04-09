import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Divider, theme } from 'antd';
import React from 'react';
import { getProjectsInfo } from '@/services/ant-design-pro/api'
import { Button } from 'antd';
import { Layout } from 'antd';
// import { Col, Row } from 'antd';
import { EditOutlined, PlayCircleOutlined, EllipsisOutlined, SettingOutlined, PlusCircleTwoTone } from '@ant-design/icons';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const { Meta } = Card;
const InfoCard: React.FC<API.ProjectsAttribute> = ({ title, avatar }) => {
  const { useToken } = theme;

  const { token } = useToken();
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={avatar} />}
      actions={[
        <PlayCircleOutlined key="start" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={title} />
    </Card>
  )

};
let projectInfos: any[];
getProjectsInfo().then((res) => {
  projectInfos = res.data;
}, null);
const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
    extra={[
      <Button key="1" type="primary">
        <PlusCircleTwoTone />创建模型
      </Button>,
    ]}>
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
          {
            projectInfos.map((item, idx) => (
              <InfoCard
                title={item.title}
                avatar={item.avatar}
              />
            ))
          }
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
