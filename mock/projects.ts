import { Request, Response } from 'express';

const getProjects = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/MSbDR4FR2MUAAAAAAAAAAAAAFl94AQBr',
        title: '教堂',
        datetime: '2017-08-09',
        state: 'success',
      },
      {
        id: '000000002',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/hX-PTavYIq4AAAAAAAAAAAAAFl94AQBr',
        title: '驴背诗思',
        datetime: '2017-08-08',
        state: 'success',
      },
      {
        id: '000000003',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/jHX5R5l3QjQAAAAAAAAAAAAAFl94AQBr',
        title: '光华楼',
        datetime: '2017-08-07',
        read: true,
        state: 'success',
      },
      {
        id: '000000004',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Wr4mQqx6jfwAAAAAAAAAAAAAFl94AQBr',
        title: '老校门',
        datetime: '2017-08-07',
        state: 'success',
      },
      {
        id: '000000005',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Mzj_TbcWUj4AAAAAAAAAAAAAFl94AQBr',
        title: '北区食堂',
        datetime: '2017-08-07',
        state: 'success',
      },
      {
        id: '000000006',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/eXLzRbPqQE4AAAAAAAAAAAAAFl94AQBr',
        title: '四教',
        datetime: '2017-08-07',
        state: 'success',
      },
      {
        id: '000000007',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/w5mRQY2AmEEAAAAAAAAAAAAAFl94AQBr',
        title: '三教',
        datetime: '2017-08-07',
        state: 'success',
      }
    ],
  });
};

export default {
  'GET /api/getProjects': getProjects,
};
