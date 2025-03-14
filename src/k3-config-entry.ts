/** Created by cihong.liu 2024-10-16 */

/** 金蝶配置 */
export type K3ConfigEntry = {
  /** 金蝶 API 地址 */
  url: string;
  /** 数据中心ID */
  acctid: string;
  /** 用户名 */
  username: string;
  /**
   * 登录密码
   * @deprecated 使用加密登录，不明传输密码
   */
  password?: string;
  /** 语言标识符 */
  lcid?: number;
  /** 第三方系统应用Id */
  appId?: string;
  /** 第三方系统应用秘钥 */
  appSecret?: string;
};
