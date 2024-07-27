import { PlusCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function UploadButton() {
  return (
    <Button key="1" type="primary">
      <Link to="/upload">
        <PlusCircleTwoTone />
        创建模型
      </Link>
    </Button>
  );
}
