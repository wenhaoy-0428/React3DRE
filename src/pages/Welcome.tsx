import { PageContainer,ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import{getProjectsInfo} from '@/services/ant-design-pro/api'
import { Button} from 'antd';
// import { Col, Row } from 'antd';
import { EditOutlined,PlayCircleOutlined , EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

{/* <Card
hoverable
style={{ width: 240 }}
cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
>
<Meta title="Europe Street beat" description="www.instagram.com" />
</Card> */}
const { Meta } = Card;
const InfoCard: React.FC<API.ProjectsAttribute> = ({ title,avatar }) => {
  const { useToken } = theme;

  const { token } = useToken();
return(
  <Card
hoverable
style={{ width: 240 }}
cover={<img alt="example" src={avatar} />}
actions={[
  <PlayCircleOutlined  key="start" />,
  <EditOutlined key="edit" />,
  <EllipsisOutlined key="ellipsis" />,
]}
>
<Meta title={title}  />
</Card>
)

};
let projectInfos: any[];
getProjectsInfo().then((res)=>
{
  projectInfos=res.data;
},null);
const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      
      {/* <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      > */}
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
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 Ant Design Pro
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
            的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {/* <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="了解 umi"
              desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
            />
            <InfoCard
              index={2}
              title="了解 ant design"
              href="https://ant.design"
              desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
            /> */}
            {
            projectInfos.map((item,idx)=>(
                          <InfoCard
                          title={item.title}
                          avatar={item.avatar}
                        />  
                        ))
            }
          </div>
        </div>
      {/* </Card> */}
    </PageContainer>
  );
};

export default Welcome;
