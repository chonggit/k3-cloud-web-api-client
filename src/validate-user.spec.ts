/** Created by cihong.liu 2024-10-24 */
import axios from 'axios';
import { validateUser } from './validate-user';
import { VALIDATE_USER_SERVICE_NAME } from './k3-cloud-services';

jest.mock('axios');

test('validate user 返回用户验证信息', async () => {

    const post = axios.post as jest.Mock;
    post.mockResolvedValue({ data: { LoginResultType: 1, KDSVCSessionId: 'KDSVCSessionId' } });
    const result = await validateUser({ url: 'http://test', username: 'username', password: 'pwd', acctid: 'acctid' });

    expect(result.LoginResultType).toEqual(1);
    expect(result.KDSVCSessionId).toEqual('KDSVCSessionId');
});

test('validate user 验证 POST Url', async () => {
    const post = axios.post as jest.Mock;
    post.mockResolvedValue({ data: { LoginResultType: 1, KDSVCSessionId: 'KDSVCSessionId' } });
    const result = await validateUser({ url: 'http://test', username: 'username', password: 'pwd', acctid: 'acctid' });

    const [url] = post.mock.lastCall;

    expect(`http://test/${VALIDATE_USER_SERVICE_NAME}`);
});