import { Avatar, Card } from 'antd';
// TODO 和服务器同步状态的一段代码
const { Meta } = Card;

type ProjectsCardProps = {
  title: string;
};
export default function ProjectsCard(props: ProjectsCardProps) {
  return (
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
      title={props.title}
    />
  );
  // if (props.state == 0) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description={<Button>处理数据</Button>}
  //   />
  // } else if (props.state == 1) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description='run Colmap and Train'
  //   />
  // } else if (props.state == 2) {
  //   return <Meta
  //     avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"></Avatar>}
  //     title={props.title}
  //     description='training ends'
  //   />
  // } else {
  //   return <p>"something went wrong"</p>
  // }
}
