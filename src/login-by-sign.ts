import { createHash } from 'crypto';
import axios from 'axios';
import { K3ConfigEntry } from './k3-config-entry';
import { ValidateUserResult } from './validate-user-result';
import { LOGIN_BY_SIGN } from './k3-cloud-services';

function getTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function generateEncryptedData(parameters: string[]) {
  const parametersString = parameters
    .sort((a, b) => a.localeCompare(b))
    .join('');
  return createHash('sha256').update(parametersString, 'utf8').digest('hex');
}

export async function loginBySign(config: K3ConfigEntry) {
  const timestamp = getTimestamp();
  const parameters = [
    config.acctid,
    config.username,
    config.appId || '',
    config.appSecret || '',
    timestamp,
  ];

  const encryptedData = generateEncryptedData(parameters);

  const response = await axios.post<ValidateUserResult>(
    `${config.url.replace(/\/+$/, '')}/${LOGIN_BY_SIGN}`,
    {
      parameters: [
        config.acctid,
        config.username,
        config.appId,
        timestamp,
        encryptedData,
        `${config.lcid || 2052}`,
      ],
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data;
}
