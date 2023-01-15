import instance from './api/instance';

export const getData = (url) => instance.get(url);
export const postData = (url, data) => instance.post(url, data);
// export const getDataById = (url) => instance.get(url);
export const deleteData = (url) => instance.delete(url);
export const editData = (url, data) => instance.patch(url, data);
