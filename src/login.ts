/** Created by cihong.liu 2024-10-15 */

import axios from 'axios';
import { K3ConfigEntry } from './k3-config-entry';

const VALIDATE_USER_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc';

interface LoginResult {
    Message: string;
    MessageCode: string;
    LoginResultType: number;
    KDSVCSessionId: string;
}

/**
 * 用户登录
 */
export const login = async (config: K3ConfigEntry) => {
    // 发送登录请求
    const { data } = await axios.post<LoginResult>(`${config.url}/${VALIDATE_USER_SERVICE_NAME}`,
        {
            acctid: config.acctid,
            username: config.username,
            password: config.password,
            lcid: config.lcid || 2052,
        },
        {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
        });

    // 登录失败
    if (data.LoginResultType !== 1) {
        return '';
    }

    // 登录成功，返回登录 cookie
    return data.KDSVCSessionId;
};