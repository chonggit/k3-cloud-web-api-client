/** Created by cihong.liu 2024-10-23 */

/** 单据下推参数 */
export interface PushParam {
    /** 单据内码集合，字符串类型，格式："Id1,Id2,..."（使用内码时必录） */
    Ids?: string;
    /** 单据编码集合，数组类型，格式：[No1,No2,...]（使用编码时必录） */
    Numbers?: string[];
    /** 分录内码集合，逗号分隔（分录下推时必录） 注（按分录下推时，单据内码和编码不需要填,否则按整单下推） */
    EntryIds?: string;
    /** 转换规则内码，字符串类型（未启用默认转换规则时，则必录） */
    RuleId?: string;
    /** 目标单据类型内码，字符串类型（非必录） */
    TargetBillTypeId?: string;
    /** 目标组织内码，整型（非必录） */
    TargetOrgId?: number;
    /** 目标单据FormId，字符串类型，（启用默认转换规则时，则必录） */
    TargetFormId?: string;
    /** 是否启用默认转换规则，布尔类型，默认false（非必录） */
    IsEnableDefaultRule?: boolean;
    /** 保存失败时是否暂存，布尔类型，默认false（非必录） 注（暂存的单据是没有编码的） */
    IsDraftWhenSaveFail?: boolean;
    /** 自定义参数，字典类型，格式："{key1:value1,key2:value2,...}"（非必录） 注（传到转换插件的操作选项中，平台不会解析里面的值） */
    CustomParams?: any;
}