/** Created by cihong.liu 2024-10-16 */

import axios from 'axios';
import { validateUser } from './validate-user';
import { K3ConfigEntry } from './k3-config-entry';

/** 创建 axios 实例 */
export const createAxiosInstance = async (config: K3ConfigEntry) => {
  const { LoginResultType, KDSVCSessionId } = await validateUser(config);

  return axios.create({
    baseURL: config.url,
    headers: {
      'Content-Type': 'application/json',
      'kdservice-sessionid': LoginResultType === 1 ? KDSVCSessionId : '',
    },
    withCredentials: true,
  });
};
