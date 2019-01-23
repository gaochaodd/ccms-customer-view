/**
 * 常用收货地址controller
 * ReceiveAddressCtrl.js
 * @author wangbo
 * @since 2018/11/10
 */

import { Inject } from 'angular-es-utils';
import { componentResource } from '../common/resource';
import service from '../common/service';

@Inject('$timeout')
export default class ReceiveAddressCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		this.showName = true;
		this.showMobile = true;
		// 列表列
		let receiveAddressData = [
			{
				text: '收货人姓名',
				key: 'fullName',
				align: 'left',
				template: '<span ng-mouseover="vm.showNameEye = true" ng-mouseleave="vm.showNameEye = false">{{row.fullName}} <icon-eye ng-if="index === vm.selectedIndex && vm.showNameEye" ng-click="vm.getDecrypt(\'fullName\', row)"></icon-eye></span>'
			},
			{
				text: '收货人手机',
				align: 'left',
				key: 'mobile',
				template: '<span ng-mouseover="vm.showMobileEye = true" ng-mouseleave="vm.showMobileEye = false">{{row.mobile}} <icon-eye ng-show="index === vm.selectedIndex && vm.showMobileEye" ng-click="vm.getDecrypt(\'mobile\', row)"></icon-eye></span>'
			},
			{
				text: '省份',
				key: 'stateName',
				align: 'left'

			},
			{
				text: '城市',
				align: 'left',
				key: 'cityName'
			},
			{
				text: '区县',
				align: 'left',
				key: 'districtName'
			},
			{
				text: '街道',
				align: 'left',
				key: 'townName',
				template: '<span cc-tooltip="row.townName">{{row.townName}}</span>'
			},
			{
				text: '详细地址',
				key: 'address',
				align: 'left',
				template: '<span cc-tooltip="row.address">{{row.address}}</span>'
			},
			{
				text: '<span class="trade-count">收货订单数</span>',
				key: 'tradeCount',
				align: 'right',
				template: '<span class="trade-count">{{row.tradeCount}}</span>'
			}
		];
		this.receiveAddressOptions = {
			query: {uniId: this.uniId},
			gridManagerName: 'receiveAddressInfo',
			ajax_data: (setting, params) => {
				return componentResource.receiveAddress.get(params).$promise;
			},
			cellHover: (row, rowIndex, colIndex) => {
				this._$timeout(() => {
					this.selectedIndex = rowIndex;
				});
			},
			columnData: receiveAddressData
		};

		this.getDecrypt = (field, row) => {
			service.getReceiveAddressDecryptMessage(this.uniId, row.uuId, field).then(res => {
				row[field] = res.data;
				field === 'mobile' ? this.showMobile = false : this.showName = false;
			}).catch(err => {
				console.error(err.message);
			});
		};
	}
}
