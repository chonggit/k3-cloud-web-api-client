/** Created by cihong.liu 2024-10-15 */

import axios from 'axios';
import { K3ConfigEntry } from './k3-config-entry';

const VALIDATE_USER_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc';

interface ValidateUserResult {
    Message: string;
    MessageCode: string;
    LoginResultType: number;
    KDSVCSessionId: string;
}

/**
 * 用户登录
 */
export const validateUser = async (config: K3ConfigEntry) => {
    // 发送登录请求
    const { data } = await axios.post<ValidateUserResult>(`${config.url}/${VALIDATE_USER_SERVICE_NAME}`,
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

    return data;
};