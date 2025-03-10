import { Axios } from 'axios';
import { K3CloudResponse } from './k3-cloud-response';

/** 向金蝶 API 发送请求 */
export const sendRequest = async <T>(
  axios: Axios,
  serviceName: string,
  param: T
): Promise<K3CloudResponse> => {
  const { data } = await axios.post<K3CloudResponse | any[]>(serviceName, param);

  if (Array.isArray(data)) {
    // 单据查询调用失败时
    // 异常信息在返回数组的第一个元素
    const result = data[0]?.[0]?.Result || {
      ResponseStatus: { IsSuccess: true },
      Result: data,
    };

    return { Result: result } as K3CloudResponse;
  }

  return data;
};
