/** 金蝶单据类型 */
export type FormId = 'BD_MATERIAL'          // 物料 
    | 'BOS_ASSISTANTDATA_DETAIL'            // 辅助属性
    | 'PRD_INSTOCK'                         // 生产入库单
    | 'PRD_MO'                              // 生产订单
    | 'STK_AssembledApp'                    // 组装拆卸单
    | 'STK_MISCELLANEOUS'                   // 其他入库单
    | 'STK_MisDelivery'                     // 其他出库单
    | 'STK_LOTADJUST'                       // 批号调整单
    | 'STK_StatusConvert'                   // 形态转换单
    | 'STK_TransferDirect'                  // 直接调拨单
    | 'IOS_PriceList';                      // 组织间结算价目表