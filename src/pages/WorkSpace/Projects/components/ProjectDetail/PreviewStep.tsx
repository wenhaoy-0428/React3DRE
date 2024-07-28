import { Button } from '@mui/material';

type PreviewStepProps = {
  onPreview: () => void;
};

export default function PreviewStep({ onPreview }: PreviewStepProps) {
  return (
    <div className="flex justify-center">
      <Button onClick={onPreview}>预览</Button>
    </div>
  );
}
