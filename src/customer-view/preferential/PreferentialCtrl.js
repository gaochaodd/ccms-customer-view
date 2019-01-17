/**
 * 权益信息controller
 * PreferentialCtrl.js
 * @author wangbo
 * @since 2018/11/13
 */

import { componentResource } from '../common/resource';

export default class PreferentialCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		this.getData();
	}

	/**
	 * 获取列表数据
	 */
	getData() {
		// 列表列
		let preferentialData = [
			{
				text: '发放时间',
				key: 'sendTime',
				align: 'left'
			},
			{
				text: '发放场景',
				align: 'left',
				key: 'sendType'
			},
			{
				text: '权益类型',
				key: 'preferentialType',
				align: 'left'

			},
			{
				text: '平台',
				key: 'platName',
				align: 'left'

			},
			{
				text: '店铺',
				key: 'shopName',
				align: 'left',
				template: '<span cc-tooltip="row.shopName">{{row.shopName}}</span>'
			},
			{
				text: '权益名称',
				align: 'left',
				key: 'preferentialName',
				template: '<span cc-tooltip="row.preferentialName">{{row.preferentialName}}</span>'
			},
			{
				text: '权益详情',
				align: 'left',
				key: 'preferentialContent',
				template: '<span cc-tooltip="row.preferentialContent">{{row.preferentialContent}}</span>'
			},
			{
				text: '是否核销',
				align: 'left',
				key: 'isVerification'
			}
		];

		this.preferentialOptions = {
			query: {uniId: this.uniId},
			gridManagerName: 'preferentialInfo',
			ajax_data: (setting, params) => {
				return componentResource.preferentialInfo.get(params).$promise;
			},
			columnData: preferentialData,
			responseHandler: res => {
				this.preferentialCount = res.benefitCount;
				this.lastPreferentialTime = res.lastBenefitTime;
				this.list = res.list;
				const platList = [
					{title: '淘宝', field: 'TAOBAO'},
					{title: '京东', field: 'JOS'},
					{title: '线下', field: 'OFFLINE'},
					{title: '有赞', field: 'YOUZAN'},
					{title: '苏宁', field: 'SUNING'},
					{title: '美丽说', field: 'MGJ'},
					{title: '当当平台', field: 'DD'}];

				// 添加一个platName显示转换后的平台
				this.list.forEach(item => {
					platList.forEach(plat => {
						if (item.platCode === plat.field) {
							item.platName = plat.title;
						}
					});
				});
				return res;
			}
		};
	}
}
