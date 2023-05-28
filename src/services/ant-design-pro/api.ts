// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';
const host="http://10.177.35.76:8081";
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
  }>(host+'/api/getAllProjects', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function viewer(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(host+'/api/viewer', {
    method: 'POST',
    ...(options || {}),
  });
}
// TODO 暂时不知道怎么合理封装这个接口
// export async function closeviewer(options?: { [key: string]: any }) {
//   return axios.post(host+'/api/viewerClose', {
//     ...(options || {}),
//   })
// }
// export async function closeviewer(options?: { [key: string]: any }) {
//   return request<API.ProjectsTitle>(host+'/api/viewerClose', {
//     method: 'POST',
//     ...(options || {}),
//   });

export async function processData(params: API.HandleDataParams, options?: { [key: string]: any }) {
  const formdata = new FormData();
  const title = params
  if (title !== undefined){
    formdata.append('title', <string>title);
  }
  return request<API.HandleDataResult>(host + '/api/runColmap', {
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
  const title = params
  if (title !== undefined){
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

export async function closeViewer(params:string, flag:number) {

  const formdata = new FormData();
  formdata.append('title', params);
  if (flag == 2) {
    const url = host + '/api/viewerClose'
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

export async function createProject(params: API.UploadCreateProjectParams, options?: { [key: string]: any }) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  formData.append('datetime', params.datetime as string);
  formData.append('avatar', params.avatar as File)
  return request<API.OpenViewerResult>(host + '/api/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}
export async function uploadImages(params: API.UploadImageParams, options?: { [key: string]: any }) {
  console.log(params);
  const formData = new FormData();
  formData.append('title', params.title as string);
  if(params.imageFiles !== undefined) {
    for (let file of params.imageFiles) {
      formData.append('imageFiles', file);
    }
  }
  return request<API.UploadImageResult>(host + '/api/uploadImgs', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}