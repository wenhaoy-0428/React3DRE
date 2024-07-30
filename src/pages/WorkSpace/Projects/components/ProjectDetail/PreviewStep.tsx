import { Button } from '@mui/material';

type PreviewStepProps = {
  onPreview: () => void;
  method: number;
  id: number;
};

export default function PreviewStep({ onPreview, id, method }: PreviewStepProps) {

  const hrefStr = '/viewer_3dgs?id=' + id + '&method='+method;
  
  const redirectToViewer = () => {
    window.location.href = hrefStr;
  };
  return (
    <div className="flex justify-center">
      <Button onClick={redirectToViewer}>预览</Button>
    </div>
  );
}
