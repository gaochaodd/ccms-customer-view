/**
 * 会员卡信息controller
 * CustomerCardCtrl.js
 * @author wangbo
 * @since 2018/11/10
 */


import {Inject} from 'angular-es-utils';
import customerCardService from '../common/service';
import { componentResource } from '../common/resource';
import jeasy from 'jeasy';

@Inject('$timeout', '$gridManager')
export default class customerCardCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// 等级记录和积分选中，默认选中等级变更记录
		this.selectedGrade = true;

		// 默认会员配置（普通用户不显示会员卡以及变更列表）
		this.isMember = true;
		// 获取会员卡信息
		this.getCustomerCardInfo();
		// 默认显示第一张卡片
		this.isShowIndex = 0;
		// 获取表格数据
		this.getGridData();
	}

	/**
	 * 获取表格数据
	 */
	getGridData() {
		let gradeColumnsData = [
			{
				key: 'changeTime',
				text: '变更时间',
				align: 'left'
			},
			{
				key: 'gradeNameBeforeChange',
				text: '变更前等级',
				align: 'right'
			},
			{
				key: 'gradeNameAfterChange',
				text: '变更后等级',
				align: 'right'

			},
			{
				key: 'changeType',
				text: '变更类型',
				align: 'left'
			},
			{
				key: 'changeSource',
				text: '变更来源',
				align: 'left'
			},
			{
				key: 'gradePeriod',
				text: '等级有效期',
				align: 'left'
			}
		];
		let pointColumnsData = [
			{
				key: 'changeTime',
				text: '变更时间',
				align: 'left'
			},
			{
				key: 'changeValue',
				text: '<span class="change-value">积分变更</span>',
				align: 'right',
				template: '<span class="change-value">{{row.changeValue}}</span>'
			},
			{
				key: 'actionType',
				text: '行为类型',
				align: 'left'
			},
			{
				key: 'source',
				text: '变更来源',
				align: 'left'
			}
		];

		this.customerGradeOptions = {
			gridManagerName: 'customerGradeInfo',
			firstLoading: false,
			ajax_data: (setting, params) => {
				return componentResource.gradeChangeRecord.get(params).$promise;
			},
			columnData: gradeColumnsData
		};

		this.customerPointOptions = {
			gridManagerName: 'customerPointInfo',
			firstLoading: false,
			ajax_data: (setting, params) => {
				return componentResource.pointChangeRecord.get(params).$promise;
			},
			columnData: pointColumnsData
		};
	}
	/**
	 * 获取会员卡信息
	 */
	getCustomerCardInfo() {
		this.showLoading = true;
		customerCardService.getCustomerCardInfo(this.uniId).then(res => {
			if (!res.length) {
				this.showLoading = false;
				return;
			}
			// 只有一张会员卡且等级为0则不是会员
			if (res.length === 1 && res[0].grade === '0') {
				this.showLoading = false;
				this.isMember = false;
				return;
			}
			this.customerCardInfo = res;
			this.cardPlanId = this.customerCardInfo[0].cardPlanId;
			this.viewChangeRecord('point');
			this.showLoading = false;
		}).catch(err => {
			this.showLoading = false;
			console.error(err.message);
		});
	}

	/**
	 * 转换时间格式
	 */
	formatDate(date) {
		return jeasy.moment(date).format('yyyy/MM/dd');
	}

	/**
	 * 切换会员卡信息
	 */
	changeCard(type, index) {


		if (type === 'left') {
			this.cardFromLeft = true;
			this.isShowIndex = index - 1;
			if (index === 0) {
				this.isShowIndex = this.customerCardInfo.length - 1;
			}
		}
		if (type === 'right') {
			this.cardFromLeft = false;
			this.isShowIndex = index + 1;
			if (index === this.customerCardInfo.length - 1) {
				this.isShowIndex = 0;
			}
		}
		this.cardPlanId = this.customerCardInfo[this.isShowIndex].cardPlanId;

		// 切换会员卡重新加载变更记录
		this.viewChangeRecord(this.selectedGrade ? 'grade' : 'point');
	}

	/**
	 * 事件：变更记录查看
	 * @param type
	 * type为grade时表示查看会员等级变更记录
	 * type为point时表示查看会员积分变更记录
	 */
	viewChangeRecord(type) {
		this.selectedGrade = type === 'grade';
		const params = {uniId: this.uniId, cardPlanId: this.cardPlanId};
		this._$timeout(() => {
			if (this.selectedGrade) {
				this._$gridManager.setQuery('customerGradeInfo', params);
			} else {
				this._$gridManager.setQuery('customerPointInfo', params);
			}
		}, 100);
	}
}
