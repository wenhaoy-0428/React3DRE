// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  // 以下为项目写的接口数据类型
  // 项目属性
  // type ProjectsAttribute = {
  //   id?: number;
  //   avatar?: string;
  //   title?: string;
  //   datetime?: String;
  //   state?: number;
  // };
  // // 项目集合
  // type Projects={
  //   projects:Array<ProjectsAttribute>;
  // };
  // 项目名称（唯一）
  type ProjectsTitle={
    title:string;
  };

  // type HandleDataParams={
  //   title?: string;
  // }
  // type HandleDataResult={
  //   status?: string;
  // }

  // 处理数据和训练统一
  type runColmapAndTrainParams_NerfStudio={
    title?: string;
    pano?: string;
  }
  type runColmapAndTrainResponse_NerfStudio={
    status?: string;
  }
  
  // 打开nerfstudio viewer /api/viewer
  type OpenViewerParams={
    title?: string;
  }
  type OpenViewerResult={
    status?: string;
    websocket_url?: string;
  }

  // 关闭nerfstudio viewer /api/viewerClose
  type CloseViewerParams={
    title?: string;
  }
  type CloseViewerResult={
    status?: string;
    message?: string;
  }

  // 创建项目 /api/createProject /nerf2mesh/createProject
  type UploadCreateProjectParams={
    title?: string;
    datetime?: string;
    avatar?: File;
  }
  type UploadCreateProjectResult={
    status?: string;
  }

  //上传图片(独立步骤) 
  // type UploadImageParams={
  //   id?: number
  //   imageFiles?: File[];
  // }
  // type UploadImageResult={
  //   status?: string;
  // }
  
  // Nerf2Mesh 与上面类似
  type ProjectsAttribute_N2M = {
    id?: number;
    avatar?: string;
    imgNum?: number;
    title?: string;
    datetime?: String;
    state?: number;
  };
  type Projects_N2M={
    projects:Array<ProjectsAttribute_N2M>;
  };

  type runColmapParams_N2M={
    title?: string;
  }
  type runColmapResponse_N2M={
    status?: string;
  }
  
  type runTrainParams_N2M={
    title?: string;
  }
  type runTrainResponse_N2M={
    status?: string;
  }

  type openViewerParams_N2M={
    title?: string;
  }
  type openViewerResponse_N2M={
    status?: string;
    stage1_path?: string;
  }

  type SplatFileParams = {
    id?:  string;
  }

  type SplatFileResponse={
    splat_file?: Blob;
  }
  type runColmapAndTrainParams_3DGS={
    title?: string;
    pano?: string;
  }
  type runColmapAndTrainResponse_3DGS={
    status?: string;
  }
  type openViewerParams_3DGS={
    title?: string;
  }
  type openViewerResponse_3DGS={
    status?: string;
    url?: string;
  }


  // 23/12/26 数据处理统一
  type ProjectsAttribute = {
    id: number;
    title: string;
    avatar: string;
    datetime: Date;
    colmap_state:  number;
    ns_state:  number;
    n2m_state: number;
    gs_state:  number;

  };
  // 项目集合
  type Projects={
    projects:Array<ProjectsAttribute>;
  };

  type CreateProjectParams={
    title?: string;
    datetime?: string;
    avatar?: File;
    pano?:  string;
  };

  type CreateProjectResult={
    status?:  string;
    id?:  string;
  };

  type UploadImageParams={
    id?: string
    imageFiles?: File[];
  }
  type UploadImageResult={
    status?: string;
  }

  type runColmapParams={
    id?: string;
  }
  type runColmapResult={
    status?: string;
  }
  type runTrainParams_NS={
    id?: number;
  }
  type runTrainResult_NS={
    status?: string;
  }
  type runTrainParams_3DGS={
    id?: number;
  }
  type runTrainResult_3DGS={
    status?: string;
  }


  type OpenNerfViewerParams={
    id?: number;
  }

  type OpenNerfViewerResult={
    status?: string;
    websocket_url?: string;
  }
  type Open3DGSViewerParams={
    id?: number;
  }

  type Open3DGSViewerResult={
    status?: string;
    url?: string;
  }

  type NerfProjectsAttribute = {
    id?: number;
    avatar?: string;
    title?: string;
    datetime?: String;
    state?: number;
  };
  // 项目集合
  type NerfProjects={
    projects:Array<NerfProjectsAttribute>;
  };
}



