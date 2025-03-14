/** Created by cihong.liu 2024-10-15 */

import axios from 'axios';
import { K3ConfigEntry } from './k3-config-entry';
import { VALIDATE_USER_SERVICE_NAME } from './k3-cloud-services';
import { ValidateUserResult } from './validate-user-result';

/**
 * 用户登录
 */
export const validateUser = async (config: K3ConfigEntry) => {
  const requestData = {
    acctid: config.acctid,
    username: config.username,
    password: config.password,
    lcid: config.lcid || 2052,
  };

  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  // 发送登录请求
  const { data } = await axios.post<ValidateUserResult>(
    `${config.url}/${VALIDATE_USER_SERVICE_NAME}`,
    requestData,
    requestOptions
  );

  return data;
};
