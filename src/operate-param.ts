/** Created by cihong.liu 2024-10-23 */

/** 单据操作参数 */
export interface OperateParam {
    /** 单据内码集合，字符串类型，格式："Id1,Id2,..."（使用内码时必录） */
    Ids?: string;
    /** 创建者组织内码（非必录） */
    CreateOrgId?: number;
    /** 使用者组织内码（非必录） */
    UseOrgId?: number;
    /** 单据编码集合，数组类型，格式：[No1,No2,...]（使用编码时必录 */
    Numbers?: string[];
};