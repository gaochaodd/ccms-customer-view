/**
 * 评价信息controller
 * EvaluationCtrl.js
 * @author wangbo
 * @since 2018/11/15
 */

import {Inject} from 'angular-es-utils';
import customerService from '../common/service';
import {PLAT_MAP} from '../constants/index';
import jeasy from 'jeasy';

@Inject('$ccTips', '$element', '$gridManager')
export default class EvaluationCtrl {
    constructor() {
        // 提示弹窗
        this.TipsModal = this._$element[0].querySelector('.modal-body');
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 平台下拉初始化
        this.platListFieldMap = {
            valueField: 'platCode',
            displayField: 'platName'
        };
        this.allPlat = [{'platCode': '', 'platName': '不限'}];
        this.currentPlat = '';
        if (this.customerOwnedPlatList.length !== 0) {
            this.customerOwnedPlatList.forEach(platCode => {
                if (platCode === 'OMNI') return;
                const platName = this.reformPlat(platCode).title;
                this.allPlat.push({platCode, platName});
            });
        } else {
            customerService.getPlatInfo().then(res => {
                res.forEach(plat => {
                    this.allPlat.push(plat);
                });
            }).catch(err => {
                this._$ccTips.error(err.message, this.TipsModal);
            });
        }

        // 店铺下拉初始化
        this.shopListFieldMap = {
            valueField: 'shopId',
            displayField: 'shopName'
        };
        this.shopList = [{shopId: '', shopName: '不限'}];
        this.currentShop = '';
        this.initQuery = {uniId: this.uniId, oneYearLater: false};

        this.evaluationOptions = {
            query: {
                uniId: this.uniId,
                oneYearLater: false
            },
            height: '100%',
            disableBorder: true,
            gridManagerName: 'evaluationInfo',
            ajax_data: (setting, params) => {
                return customerService.getEvaluationInfo(params);
            },
            topFullColumn: {
                template: row => {
                    row.createdStr = row.created ? jeasy.moment(row.created).format('yyyy-MM-dd HH:mm:ss') : '--';

                    return `<div class="main-evaluation-info-style">
								<div class="main-evaluation-title-style">
								<svg class="main-evaluation-icon-style"
									aria-hidden="true">
									<use xlink:href="{{vm.reformPlat(row.platCode).icon}}"></use>
								</svg>
								{{vm.reformPlat(row.platCode).title}} - {{row.shopName}}
								</div>
								<div class="main-evaluation-order-info-group-style">
									<div style="display: flex">
										订单号：
										<span
										cc-tooltip="'双击可复制'"
										tooltip-placement="top-left">
											<cv-copyable copy-text="row.orderId"/>
										</span>
									</div>
									<div>下单：<span style="display: inline-block; min-width: 110px">{{row.createdStr}}</span></div>
								</div>
							</div>`;
                }
            },
            columnData: [
                {
                    key: 'productName',
                    text: `<div class="evaluation-gird-title-style">
								<div class="evaluation-gird-title-first-col-style">
									商品
								</div>
								<div>评价</div>
							</div>`,
                    align: 'left',
                    template: row => {
                        return `<div ng-repeat="item in row.rates track by $index"
									class="evaluation-gird-row-style">
									<div class="evaluation-gird-first-col-style">
										<a ng-href="{{item.detailUrl}}" target="_blank">
											<img ng-src="{{item.picUrl}}" width="56px" height="56px">
										</a>
										<div class="evaluation-gird-product-style">
											<div cc-tooltip="vm.isProductNameOverWidth(item.productName)"
											class="evaluation-gird-product-name-style">
												{{item.productName}}
											</div>
											<div class="evaluation-gird-product-sku-style">
												<span>{{item.skuDetail}}</span>
											</div>
										</div>
									</div>
									<div class="evaluation-gird-rate-style">
										<div>
											<span class="evaluation-gird-rate-time-style">
												评价时间: {{vm.reformTime(item.estimateTime)}}
											</span>
											<icon-good-review ng-if="item.estimateResult === 'good'"></icon-good-review>
											<icon-medium-review ng-if="item.estimateResult === 'neutral'"></icon-medium-review>
											<icon-poor-review ng-if="item.estimateResult === 'bad'"></icon-poor-review>
										</div>	
										<div
										class="color:#3D3D3D;">
											{{item.estimateContent}}
										</div>
										<div
										ng-if="item.estimateReplay"
										style="color:#E99100;">
											回复: {{item.estimateReplay}}
										</div>
									</div>
								</div>`;
                    }
                }
            ]
        };
    }
    reformPlat(platCode) {
        return PLAT_MAP[platCode] || {};
    }

    reformTime(time) {
        return time ? jeasy.moment(time).format('yyyy-MM-dd HH:mm:ss') : '--';
    }
    onPlatChange() {
        const query = {
            ...this.initQuery
        };
        if (this.currentPlat !== '') {
            query.platCode = this.currentPlat;
            this.onShoplistLoading = true;
            customerService.getPlatShopsInfo(this.currentPlat).then(res => {
                this.shopList = res;
                this.shopList.unshift({shopId: '', shopName: '不限'});
                this.currentShop = '';
                this.onShoplistLoading = false;
            }).catch(err => {
                this._$ccTips.error(err, this.TipsModal);
                this.onShoplistLoading = false;
            });
            this._$gridManager.setQuery('evaluationInfo', query);
            return;
        }
        this.shopList = [{shopId: '', shopName: '不限'}];
        this.currentShop = '';
        this._$gridManager.setQuery('evaluationInfo', query);
    }
    onShopChange() {
        if (!this.currentPlat) return;
        const query = {
            ...this.initQuery,
            shopId: this.currentShop,
            platCode: this.currentPlat
        };
        this._$gridManager.setQuery('evaluationInfo', query);
    }
    /**
     * 计算商品名称是否超过宽度
     * @param productName 商品名称String
     */
    isProductNameOverWidth(productName) {
        if ((jeasy.getTextWidth(productName) / 2) + 20 > 300) return productName;
        return '';
    }
}
