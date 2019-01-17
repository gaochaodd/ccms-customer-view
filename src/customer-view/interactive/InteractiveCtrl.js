/**
 * InteractiveCtrl.js
 * @author wangbo
 * @since 2018/11/15
 */

import { componentResource } from '../common/resource';

export default class InteractiveCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// 列表列
		let interactiveData = [
			{
				text: '互动时间',
				key: 'interactionTime',
				align: 'left'
			},
			{
				text: '互动渠道',
				align: 'left',
				key: 'interactionChannel'
			},
			{
				text: '互动类型',
				key: 'interactionType',
				align: 'left'

			},
			{
				text: '互动详情',
				align: 'left',
				key: 'interactionDetail',
				template: '<span cc-tooltip="row.interactionDetail">{{row.interactionDetail}}</span>'
			}
		];
		this.interactiveOptions = {
			query: {uniId: this.uniId},
			gridManagerName: 'interactiveInfo',
			ajax_data: (setting, params) => {
				return componentResource.interactiveInfo.get(params).$promise;
			},
			columnData: interactiveData,
			responseHandler: res => {
				this.interactiveCount = res.interactionCount;
				this.lastInteractionTime = res.lastInteractionTime;
				return res;
			}
		};
	}
}
