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
  //定义类型并继承map方法
  type ProjectsAttribute = {
    id?: number;
    avatar?: string;
    imgNum?: number;
    title?: string;
    datetime?: String;
    state?: number;
    method?: number;
  };
  type Projects={
    projects:Array<ProjectsAttribute>;
  };
  type ProjectsTitle={
    title:string;
  };

  type HandleDataParams={
    title?: string;
  }
  type HandleDataResult={
    status?: string;
  }
  
  type OpenViewerParams={
    title?: string;
  }
  type OpenViewerResult={
    status?: string;
    websocket_url?: string;
  }
  type CloseViewerParams={
    title?: string;
  }
  type CloseViewerResult={
    status?: string;
    message?: string;
  }

  type UploadCreateProjectParams={
    title?: string;
    datetime?: string;
    avatar?: File;
  }
  type UploadCreateProjectResult={
    status?: string;
  }
  type UploadImageParams={
    title?: string
    imageFiles?: File[];
  }
  type UploadImageResult={
    status?: string;
  }
  
  // Nerf2Mesh
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

}



