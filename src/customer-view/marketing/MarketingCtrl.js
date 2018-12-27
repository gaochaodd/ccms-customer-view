/**
 * 营销信息controller
 * MarketingCtrl.js
 * @author wangbo
 * @since 2018/11/12
 */

import { Inject } from 'angular-es-utils';
import { componentResource } from '../common/resource';

@Inject('$scope')
export default class MarketingCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// 列表列
		let marketingData = [
			{
				text: '营销时间',
				key: 'marketingTime',
				align: 'left'
			},
			{
				text: '营销场景',
				align: 'left',
				key: 'marketingType'
			},
			{
				text: '活动名称',
				key: 'activityName',
				align: 'left',
				template: '<span cc-tooltip="row.activityName">{{row.activityName}}</span>'
			},
			{
				text: '沟通方式',
				align: 'left',
				key: 'communicationMode'
			},
			{
				text: '沟通内容',
				align: 'left',
				key: 'communicationContent',
				template: '<span cc-tooltip="row.communicationContent">{{row.communicationContent}}</span>'
			}
		];
		this.marketingOptions = {
			query: {uniId: this.uniId},
			gridManagerName: 'marketingInfo',
			ajax_data: (setting, params) => {
				return componentResource.marketingInfo.get(params).$promise;
			},
			columnData: marketingData,
			responseHandler: res => {
				this.marketingCount = res.marketingCount;
				this.lastMarketingTime = res.lastMarketingTime;
				return res;
			}
		};
	}
}
