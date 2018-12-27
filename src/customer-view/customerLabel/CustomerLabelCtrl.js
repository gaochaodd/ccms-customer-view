/**
 * 会员标签controller
 * CustomerLabelCtrl.js
 * @author wangbo
 * @since 2018/11/15
 */

import { Inject } from 'angular-es-utils';
import service from '../common/service';
import labelModal from './labelModal/labelModal.tpl.html';
import labelModalFooter from './labelModal/labelModalFooter.tpl.html';
import labelModalCtrl from './labelModal/LabelModalCtrl';
import { PLAT_LIST } from '../constants/index';

@Inject('$scope', '$ccModal')
export default class customerCardCtrl {
	constructor() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		this.cloudTag = []; // 初始化云标签
		this.defineTag = []; // 初始化自定义标签
		this.rfmList = []; // 初始化rfm标签
		this.platForm = PLAT_LIST; // 已购买过店铺列表
		this.selected = 0;
		this.parentSelected = 0;
		this.getTags();
	}

	/**
	 * 获取标签信息
	 */
	getTags() {
		const uniId = this.uniId;
		this.showLoading = true;
		service.getTagsInfo(uniId)
			.then(res => {
				// 筛选自定义标签和云标签
				// res.tagList.filter(item => {
				// 	if (item.tagType === 'system') {
				// 		this.cloudTag.push(item);
				// 	} else {
				// 		this.defineTag.push(item);
				// 	}
				// });
				this.showLoading = false;
				this.rfmList = res.rfmList;
				this.rfmList.forEach(item => {
					item.shopList.unshift({shopName: '不限', shopId: ''});
				});
			}).catch(err => {
				this.showLoading = false;
				console.error(err.message);
			});
	}

	/**
	 * 根据platCode获取为平台名称和平台图标
	 */
	getPlatInfo(platCode) {
		const platName = this.platForm.filter(item => {
			return item.value === platCode;
		});
		if (platCode === 'OFFLINE') {
			// 线下平台无图标
			return [platName[0].title];
		}
		return [platName[0].title, platName[0].icon];
	}

	/**
	 * 打开新建或编辑自定义标签modal
	 */
	openDefineTagModal(type, tag) {
		const uniId = this.uniId;
		this._$ccModal.modal({
			scope: this._$scope,
			title: type === 'add' ? '新增标签' : '编辑标签',
			fullscreen: false,
			bindings: {
				uniId: uniId,
				tag: tag,
				type: type
			},
			style: {
				'min-height': '120px',
				'min-width': '450px'
			},
            __body: labelModal,
			__footer: labelModalFooter,
			controller: labelModalCtrl,
			controllerAs: 'vm'
		}).open();
	}


	/**
	 * 是否编辑自定义标签
	 * @param type
	 * @param index
	 */
	editLabel(type, index) {
		if (type === 'show') {
			this.prepareEdit = index;
		} else {
			// 隐藏编辑按钮
			this.prepareEdit = -1;
		}
	}

	/**
	 * 切换店铺
	 * @param platCode
	 * @param shopId
	 */
	changeShop(platCode, shopId, index, parentIndex) {
		const uniId = this.uniId;
		this.selected = index;
		this.parentSelected = parentIndex;
		service.getSoloPlatRfmInfo(uniId, platCode, shopId)
			.then(res => {
				this.rfmList[parentIndex].allPayment = res.allPayment;
				this.rfmList[parentIndex].allCountBuy = res.allCountBuy;
				this.rfmList[parentIndex].allAvgPayment = res.allAvgPayment;
				this.rfmList[parentIndex].yearPayment = res.yearPayment;
				this.rfmList[parentIndex].yearCountBuy = res.yearCountBuy;
				this.rfmList[parentIndex].yearAvgPayment = res.yearAvgPayment;
				this.rfmList[parentIndex].firstCreated = res.firstCreated;
				this.rfmList[parentIndex].lastCreated = res.lastCreated;
				this.rfmList[parentIndex].lastPayment = res.lastPayment;
			}).catch(err => {
				console.error(err.message);
			});
	}
}
