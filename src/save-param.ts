/** Created by cihong.liu 2024-10-23 */

import { SaveParamBase } from './save-param-base';

/** 单据保存参数 */
export class SaveParam<T = any> extends SaveParamBase {
  constructor(public readonly Model: T) {
    super();
  }
}
