// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const host = 'http://10.177.35.181:8081';
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/getProjects */
export async function getProjectsInfo(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/getProjects', {
    method: 'GET',
    ...(options || {}),
  });
}

// 获取项目列表
export async function getAllProjects(options?: { [key: string]: any }) {
  return request<{
    projects: API.Projects;
  }>(host + '/common/getAllProjects', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getAllNerfProjects(options?: { [key: string]: any }) {
  return request<{
    projects: API.NerfProjects;
  }>(host + '/api/getAllProjects', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function viewer(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(host + '/api/viewer', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function runColmapAndTrain_NerfStudio(params: API.runColmapAndTrainParams_NerfStudio, options?: { [key: string]: any }) {
  const formdata = new FormData();
  formdata.append('title', params.title as string);
  formdata.append('pano', params.pano as string);
  return request<API.runColmapAndTrainResponse_NerfStudio>(host + '/api/runColmapAndTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function openViewer(params: API.OpenViewerParams, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const title = params;
  if (title !== undefined) {
    formdata.append('title', <string>title);
  }
  // console.log(formdata)
  return request<API.OpenViewerResult>(host + '/api/viewer', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

//12/27
export async function openNerfViewer(params: API.OpenNerfViewerParams, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const id = params;
  if (id !== undefined) {
    formdata.append('id', <string>id);
  }
  // console.log(formdata)
  return request<API.OpenNerfViewerResult>(host + '/common/viewer', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function closeViewer(params: string, flag: number) {
  const formdata = new FormData();
  formdata.append('title', params);
  if (flag == 2) {
    const url = host + '/api/viewerClose';
    const result = window.navigator.sendBeacon(url, formdata);
  }
  return request<API.CloseViewerResult>(host + '/api/viewerClose', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
}

export async function createProject(
  params: API.CreateProjectParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  formData.append('datetime', params.datetime as string);
  formData.append('avatar', params.avatar as File);
  formData.append('pano', params.pano as string)
  return request<API.CreateProjectResult>(host + '/common/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function uploadImages(
  params: API.UploadImageParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('id', params.id as string);
  if (params.imageFiles !== undefined) {
    for (let file of params.imageFiles) {
      formData.append('imageFiles', file);
    }
  }
  return request<API.UploadImageResult>(host + '/common/uploadImgs', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

// Nerf2Mesh方法的api
export async function createProject_N2M(
  params: API.UploadCreateProjectParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  formData.append('datetime', params.datetime as string);
  formData.append('avatar', params.avatar as File);
  return request<API.UploadCreateProjectResult>(host + '/nerf2mesh/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function uploadImages_N2M(
  params: API.UploadImageParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  if (params.imageFiles !== undefined) {
    for (let file of params.imageFiles) {
      formData.append('imageFiles', file);
    }
  }
  return request<API.UploadImageResult>(host + '/nerf2mesh/uploadImgs', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function runColmap_N2M(params: API.runColmapAndTrainParams_NerfStudio, options?: { [key: string]: any }) {
  const formdata = new FormData();
  formdata.append('title', params.title as string);
  formdata.append('pano', params.pano as string);
  return request<API.runColmapAndTrainResponse_NerfStudio>(host + '/nerf2mesh/runColmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}
export async function runTrain_N2M(params: API.runTrainParams_N2M, options?: { [key: string]: any }) {
  const formdata = new FormData();
  const title = params;
  if (title !== undefined) {
    formdata.append('title', <string>title);
  }
  return request<API.runTrainResponse_N2M>(host + '/nerf2mesh/runTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function openViewer_N2M(params: API.openViewerParams_N2M, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const title = params;
  if (title !== undefined) {
    formdata.append('title', <string>title);
  }
  // console.log(formdata)
  return request<API.openViewerResponse_N2M>(host + '/nerf2mesh/viewer', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}
/*
export async function closeViewer_N2M(params: string, flag: number) {
  const formdata = new FormData();
  formdata.append('title', params);
  if (flag == 2) {
    const url = host + '/api/viewerClose';
    const result = window.navigator.sendBeacon(url, formdata);
  }
  return request<API.CloseViewerResult>(host + '/api/viewerClose', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
}
*/

// export async function openViewer_3dgs(params: API.SplatFileParams, options?: { [key: string]: any }) {
//   const formdata = new FormData();
//   const title = params;
//   if (title !== undefined) {
//     formdata.append('title', <string>title);
//   }
//   return request<API.SplatFileResponse>(host + '/gs/viewer', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data: formdata,
//     ...(options || {}),
//   });
// }

export async function createProject_GS(
  params: API.UploadCreateProjectParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  formData.append('datetime', params.datetime as string);
  formData.append('avatar', params.avatar as File);
  return request<API.OpenViewerResult>(host + '/gs/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function uploadImages_GS(
  params: API.UploadImageParams,
  options?: { [key: string]: any },
) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  if (params.imageFiles !== undefined) {
    for (let file of params.imageFiles) {
      formData.append('imageFiles', file);
    }
  }
  return request<API.UploadImageResult>(host + '/gs/uploadImgs', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

export async function runColmapAndTrain_3DGS(params: API.runColmapAndTrainParams_3DGS, options?: { [key: string]: any }) {
  const formdata = new FormData();
  formdata.append('title', params.title as string);
  formdata.append('pano', params.pano as string);
  return request<API.runColmapAndTrainResponse_3DGS>(host + '/gs/runColmapAndTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function openViewer_3DGS(params: API.Open3DGSViewerParams, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const id = params;
  if (id !== undefined) {
    formdata.append('title', <string>id);
  }
  // console.log(formdata)
  return request<API.Open3DGSViewerResult>(host + '/common/GSviewer', {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function runColmap_Common(params: API.runColmapParams, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const id = params;
  if (id !== undefined) {
    formdata.append('id', <string>id);
  }
  // formdata.append('pano', params.pano as string);
  return request<API.runColmapResult>(host + '/common/runColmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}
export async function runTrain_NS(params: API.runTrainParams_NS, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const id = params;
  if (id !== undefined) {
    formdata.append('id', <string>id);
  }
  // formdata.append('pano', params.pano as string);
  return request<API.runTrainResult_NS>(host + '/common/runNSTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

export async function runTrain_3DGS(params: API.runTrainParams_3DGS, options?: { [key: string]: any }) {
  const formdata = new FormData();
  //console.log(params)
  const id = params;
  if (id !== undefined) {
    formdata.append('id', <string>id);
  }
  // formdata.append('pano', params.pano as string);
  return request<API.runTrainResult_3DGS>(host + '/common/runGSTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
    ...(options || {}),
  });
}

