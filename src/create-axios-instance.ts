/** Created by cihong.liu 2024-10-16 */

import axios from 'axios';
import { validateUser } from './validate-user';
import { loginBySign } from './login-by-sign';
import { K3ConfigEntry } from './k3-config-entry';

function getValidateUserResult(config: K3ConfigEntry) {
  if (config.appId) {
    return loginBySign(config);
  }
  return validateUser(config);
}

/** 创建 axios 实例 */
export const createAxiosInstance = async (config: K3ConfigEntry) => {
  const { LoginResultType, KDSVCSessionId } = await getValidateUserResult(
    config
  );

  return axios.create({
    baseURL: config.url,
    headers: {
      'Content-Type': 'application/json',
      'kdservice-sessionid': LoginResultType === 1 ? KDSVCSessionId : '',
    },
  });
};
