/** Created by cihong.liu 2024-10-16 */

import axios from 'axios';
import { login } from './login';
import { K3ConfigEntry } from './k3-config-entry';

/** 创建 axios 实例 */
export const createAxiosInstance = async (config: K3ConfigEntry) => {
    // 登录获取 session id
    const sessionId = await login(config);

    return axios.create({
        baseURL: config.url,
        headers: {
            'Content-Type': 'application/json',
            'kdservice-sessionid': sessionId
        },
        withCredentials: true
    });
};