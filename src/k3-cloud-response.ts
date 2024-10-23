/** Created by cihong.liu 2024-10-23 */

export interface K3CloudResponse {
    Result: ResponseResult
}

export interface ResponseResult<TResult = any> {
    /** 返回结果信息 */
    ResponseStatus: ResponseStatus;
    /** 返回的数据 */
    Result?: TResult
}

export interface ResponseStatus {
    /** 错误代码，不成功则为500 */
    ErrorCode: string;
    /** 错误代码：0：默认
     * 1：上下文丢失
     * 2：没有权限
     * 3：操作标识为空
     * 4：异常
     * 5：单据标识为空
     * 6：数据库操作失败
     * 7：许可错误
     * 8：参数错误
     * 9：指定字段/值不存在
     * 10：未找到对应数据
     * 11：验证失败
     * 12：不可操作
     * 13：网控冲突
     * 14：调用限制
     * 15：禁止管理员登录 */
    MsgCode: number;
    /** 操作是否成功 */
    IsSuccess: boolean;
    /** 错误列表 */
    Errors: ResponseError[];
    /** 成功列表 */
    SuccessEntitys: SuccessEntity[];
    /** 提示信息 */
    SuccessMessages: SuccessMessage[];
}

export interface ResponseError {
    /** 字段名称 */
    FieldName: string;
    /** 消息内容 */
    Message: string;
    /** 原始数据行号 */
    DIndex: number;
}

export interface SuccessEntity {
    /** 内码 */
    Id: String;
    /** 编码  */
    Number: string;
    /** 原始数据行号 */
    DIndex: string;
}

export interface SuccessMessage {
    /** 字段名称 */
    FieldName: string;
    /** 消息内容 */
    Message: string;
    /** 原始数据行号 */
    DIndex: number;
}