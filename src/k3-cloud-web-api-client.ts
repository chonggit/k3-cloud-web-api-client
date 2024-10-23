/** Created by cihong.liu 2024-10-22 */

import { Axios } from 'axios';
import { K3ConfigEntry } from './k3-config-entry';
import { createAxiosInstance } from './create-axios-instance';
import { K3CloudResponse } from './k3-cloud-response';
import { sendRequest } from './send-request';
import { QueryParam } from './query-param';
import { FormId } from './form-id';
import { OperateParam } from './operate-param';
import { SaveParam } from './save-param';
import { PushParam } from './push-param';

export class K3CloudWebAPIClient {

    static AUDIT_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Audit.common.kdsvc';
    static UN_AUDIT_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.UnAudit.common.kdsvc';
    static DRAFT_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Draft.common.kdsvc';
    static EXECUTE_BILL_QUERY_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.ExecuteBillQuery.common.kdsvc';
    static PUSH_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Push.common.kdsvc';
    static SAVE_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Save.common.kdsvc';
    static DELETE_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Delete.common.kdsvc';
    static SUBMIT_SERVICE_NAME = 'Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Submit.common.kdsvc';

    private _axios?: Axios;

    constructor(private readonly _config: K3ConfigEntry) { }

    // 获取 Axios 实例
    private async getAxiosInstance() {
        if (!this._axios) {
            this._axios = await createAxiosInstance(this._config);
        }
        return this._axios;
    }

    /** 根据金蝶返回的响应结果，判断用户是否已登录或登录信息是否过期 */
    private async isLoginExpired(response: K3CloudResponse) {
        // 返回的数据为数组
        if (Array.isArray(response)) {
            return false;
        }
        return response.Result.ResponseStatus.MsgCode === 1;
    }

    /** 发送 http 请求 */
    async send<T>(serviceName: string, param: T): Promise<K3CloudResponse> {
        const result = await sendRequest(await this.getAxiosInstance(), serviceName, param);
        // 未登录或登录过期，删除 Axios 实例，重新登录，再次发送请求
        if (await this.isLoginExpired(result)) {
            delete this._axios;
            return await sendRequest(await this.getAxiosInstance(), serviceName, param);
        }
        return result;
    }

    /** 执行查询 */
    async executeBillQuery(param: QueryParam) {
        const response = await this.send(K3CloudWebAPIClient.EXECUTE_BILL_QUERY_SERVICE_NAME, { data: param });
        // 执行成功，转换查询结果
        if (response.Result.ResponseStatus.IsSuccess) {
            const results = response.Result.Result as [][];
            const keys = param.FieldKeys.split(',');
            const newResults = [];
            for (const result of results) {
                const newResult: { [name: string]: any } = {};
                for (let i = 0, len = result.length; i < len; i++) {
                    newResult[keys[i]] = result[i];
                }
                newResults.push(newResult);
            }
            response.Result.Result = newResults;
        }
        return response;
    };

    /** 审核单据 */
    aduit(formId: FormId, param: OperateParam) {
        return this.send(K3CloudWebAPIClient.AUDIT_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 单据保存为草稿 */
    draft<T = any>(formId: FormId, param: SaveParam<T>) {
        return this.send(K3CloudWebAPIClient.DRAFT_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 下推单据 */
    push(formId: FormId, param: PushParam) {
        return this.send(K3CloudWebAPIClient.PUSH_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 删除单据 */
    remove(formId: FormId, param: OperateParam) {
        return this.send(K3CloudWebAPIClient.DELETE_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 保存单据 */
    save<T = any>(formId: FormId, param: SaveParam<T>) {
        return this.send(K3CloudWebAPIClient.SAVE_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 提交单据 */
    submit(formId: FormId, param: OperateParam) {
        return this.send(K3CloudWebAPIClient.SUBMIT_SERVICE_NAME, { formid: formId, data: param });
    };

    /** 驳回已审单据 */
    unAduit(formId: FormId, param: OperateParam) {
        return this.send(K3CloudWebAPIClient.UN_AUDIT_SERVICE_NAME, { formid: formId, data: param });
    };
}