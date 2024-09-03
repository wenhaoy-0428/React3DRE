import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function PointSet({ startPoint, endPoint, length }) {
  return (
    <div className="flex flex-col gap-3 bg-slate-50 rounded-md p-3  justify-center items-center shadow-md">
      <div className="flex justify-start items-center gap-3">
        <div className="bg-slate-100 rounded-lg  flex flex-col justify-center items-center p-2 shadow-lg">
          <div>({startPoint.toArray().join(', ')})</div>
        </div>
        <ArrowRightAltIcon />
        <div className="bg-slate-100 rounded-lg  flex flex-col justify-center items-center p-2 shadow-lg">
          <div>({endPoint.toArray().join(', ')})</div>
        </div>
      </div>
      <div className="flex gap-3 rounded-md bg-[#1976d2] w-full p-1 shadow-lg">
        <div className="text-white text">长度: </div>
        <div>{length}</div>
      </div>
    </div>
  );
}
