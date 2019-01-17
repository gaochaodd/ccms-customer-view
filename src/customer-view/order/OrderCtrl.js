/**
 * @author chao
 * @since 2018/11/14
 */

import { Inject } from 'angular-es-utils';
import service from '../common/service';
import {PLAT_MAP} from '../constants/index';
import jeasy from 'jeasy'

@Inject('$ccTips', '$element', '$gridManager')
export default class OrderCtrl {
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
            service.getPlatInfo().then(res => {
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
        // 表格初始化
        this.gmOptions = {
            gridManagerName: 'orderInfo',
            width: '1070px',
            height: '100%',
            disableBorder: true,
            pageSize: 10,
            query: this.initQuery,
            ajax_data: (setting, params) => {
                return service.getOrderInfo(params);
            },
            topFullColumn: {
                template: row => {
                    return `<div class="main-order-info-style">
								<div style="display:flex; line-height: 16px">
								<svg style="fill: currentColor;width: 16px;height: 16px"
									aria-hidden="true">
									<use xlink:href="{{vm.reformPlat(row.platCode).icon}}"></use>
								</svg>
								{{vm.reformPlat(row.platCode).title}} - {{row.shopName}}
								</div>
								<div style="display:flex;">
									<div style="margin-right: 40px; display: flex">
										订单号：
										<span
										cc-tooltip="'双击可复制'"
										tooltip-placement="top-left">
											<cv-copyable copy-text="row.orderId"/>
										</span>
									</div>
									<div style="margin-right: 40px">下单：<span style="display: inline-block; min-width: 110px">{{row.created || '--'}}</span></div>
									<div style="margin-right: 40px">付款：<span style="display: inline-block; min-width: 110px">{{row.payTime || '--'}}</span></div>
									<div>交易状态：{{row.orderStatus}}</div>
								</div>
							</div>`;
                }
            },
            columnData: [
                {
                    key: 'productName',
                    text: '商品',
                    align: 'left',
                    useCompile: true,
                    template: row => {
                        return `<div class="sub-order-info-stlye">
									<div
									class="product-detail-info-style" 
									ng-repeat="item in row.orderList track by $index">
										<a ng-href="{{item.detailUrl}}" target="_blank">
											<img ng-src="{{item.picUrl}}" width="56px" height="56px">
										</a>
										<div class="product-name-sku-refund-style">
											<div
											class="product-name-style"
											cc-tooltip="vm.isProductNameOverWidth(item.productName)">
												<a ng-href="{{item.detailUrl}}" target="_blank">
													{{item.productName}}
												</a>
												<a ng-href="{{item.detailUrl}}" target="_blank">
													{{vm.abc()}}
												</a>
											</div>
											<div class="product-sku-refund-style">
												<span>{{item.skuDetail}}</span>
												<span class="product-refund-style">
													{{item.isRefund === '1' ? '退款成功' : ''}}
												</span>
											</div>
										</div>
									</div>
								</div>`;
                    }
                },
                {
                    key: 'price',
                    text: '价格',
                    align: 'left',
                    width: '80px',
                    useCompile: true,
                    template: () => {
                        return `<div class="sub-order-info-stlye">
									<div class="product-price-style" ng-repeat="item in row.orderList track by $index">￥{{item.price}}</div>
								</div>`;
                    }
                },
                {
                    key: 'productNum',
                    text: '商品数量',
                    align: 'left',
                    width: '230px',
                    useCompile: true,
                    template: () => {
                        return `<div class="sub-order-info-stlye">
									<div class="product-num-style" ng-repeat="item in row.orderList track by $index">{{item.productNum}}</div>
								</div>`;
                    }
                },
                {
                    key: 'tradeDiscountFee',
                    align: 'center',
                    text: '优惠金额',
                    width: '190px',
                    useCompile: true,
                    template: () => {
                        return `<div 
								class="sub-order-tradeDiscountFee-stlye"
								style="height: calc({{row.orderList.length}} * 79px)">
									￥{{row.tradeDiscountFee}}
								</div>`;
                    }
                },
                {
                    key: 'payment',
                    align: 'center',
                    width: '190px',
                    text: '订单总金额',
                    useCompile: true,
                    template: () => {
                        return `<div
								class="sub-order-payment-stlye"
								style="height: calc({{row.orderList.length}} * 79px)">
									<div>￥{{row.payment}}</div>
									<div ng-if="row.postFee">（含运费：￥{{row.postFee}}）</div>
								</div>`;
                    }
                }
            ]
        };
    }
    onPlatChange() {
        const query = {
            ...this.initQuery
        };
        if (this.currentPlat !== '') {
            query.platCode = this.currentPlat;
            this.onShoplistLoading = true;
            service.getPlatShopsInfo(this.currentPlat).then(res => {
                this.shopList = res;
                this.shopList.unshift({shopId: '', shopName: '不限'});
                this.currentShop = '';
                this.onShoplistLoading = false;
            }).catch(err => {
                this._$ccTips.error(err, this.TipsModal);
                this.onShoplistLoading = false;
            });
            this._$gridManager.setQuery('orderInfo', query);
            return;
        }
        this.shopList = [{shopId: '', shopName: '不限'}];
        this.currentShop = '';
        this._$gridManager.setQuery('orderInfo', query);
    }
    onShopChange() {
        const query = {
            ...this.initQuery,
            shopId: this.currentShop,
            platCode: this.currentPlat
        };
        this._$gridManager.setQuery('orderInfo', query);
    }

    reformPlat(platCode) {
        return PLAT_MAP[platCode] || {};
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
