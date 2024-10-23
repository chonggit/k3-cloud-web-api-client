/** Created by cihong.liu 2024-10-23 */

import { FormId } from "./form-id";

/** 单据查询参数 */
export interface QueryParam {
    /** 业务对象表单Id（必录） */
    FormId: FormId;
    /** 需查询的字段key集合，字符串类型，格式："key1,key2,..."（必录） 注（查询单据体内码,需加单据体Key和下划线,如：FEntryKey_FEntryId） */
    FieldKeys: string;
    /** 过滤条件 */
    FilterString?: string;
    /** 排序字段，字符串类型（非必录） */
    OrderString?: string;
    /** 开始行索引，整型（非必录） */
    StartRow?: number;
    /** 最大行数，整型，不能超过10000（非必录） */
    Limit?: number;
    /** 返回总行数，整型（非必录） */
    TopRowCount?: number;
}