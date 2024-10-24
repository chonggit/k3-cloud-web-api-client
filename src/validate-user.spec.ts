/** Created by cihong.liu 2024-10-24 */
import axios from 'axios';
import { validateUser } from './validate-user';

jest.mock('axios');

test('validate user test', async () => {

    const post = axios.post as jest.Mock;
    post.mockResolvedValue({ data: { LoginResultType: 1, KDSVCSessionId: 'KDSVCSessionId' } });
    const result = await validateUser({ url: 'http://test', username: 'username', password: 'pwd', acctid: 'acctid' });

    expect(result.LoginResultType).toEqual(1);
    expect(result.KDSVCSessionId).toEqual('KDSVCSessionId');
});