/**
 * @author  chao.gao
 * @date on 2018.11.09
 */

import { componentResource } from './resource';
import genResource from "angular-es-utils/rs-generator/index";

// 获取会员基本信息
function getCustomerInfo(uniId) {
	return componentResource.customerView.get({uniId}).$promise;
}

// 更新会员基本信息
function setCustomerInfo(uniId, body) {
	return componentResource.customerView.update({uniId}, body).$promise;
}

// 获取会员加密信息
function getDecryptCustomerInfo(uniId, field) {
	return componentResource.customerDecryptMessage.get({uniId, field}).$promise;
}

// 获取会员卡信息
function getCustomerCardInfo(uniId) {
	return componentResource.customerCard.query({uniId}).$promise;
}

// 获取订单信息
function getOrderInfo(body) {
	return componentResource.orderInfo.get(body).$promise;
}

// 获取标签信息
function getTagsInfo(uniId, platCode, shopId) {
	return componentResource.getTagsInfo.get({uniId, platCode, shopId}).$promise;
}

// 获取指定店铺RFM信息
function getSoloPlatRfmInfo(uniId, platCode, shopId) {
	return componentResource.getSoloPlatRfmInfo.get({uniId, platCode, shopId}).$promise;
}

// 新增自定义标签
function addTag(uniId, body) {
	return componentResource.addTag.save({uniId}, body).$promise;
}

// 修改自定义标签
function updateTag(uniId, body) {
	return componentResource.updateTag.update({uniId}, body).$promise;
}

// 删除自定义标签
function deleteTag(uniId, tagId) {
	return componentResource.deleteTag.delete({uniId, tagId}).$promise;
}

// 获取租户平台
function getPlatInfo() {
	return componentResource.platInfo.query().$promise;
}

// 获取指定平台的所有店铺
function getPlatShopsInfo(platCode) {
	return componentResource.getPlatShopsInfo.query({platCode}).$promise;
}

// 获取地区信息
function getAreaInfo() {
	return componentResource.areaInfo.query({platform: 'unification'}).$promise;
}

// 获取常用收货地址信息明文
function getReceiveAddressDecryptMessage(uniId, uuId, field) {
	return componentResource.receiveAddressDecryptMessage.get({uniId, uuId, field}).$promise;
}

// 获取评价信息
function getEvaluationInfo(body) {
	return componentResource.evaluationInfo.get(body).$promise;
}

// 获取地址信息
function getLocationAreas() {
	return componentResource.getLocationAreas.query().$promise;
}

const service = {
	getCustomerInfo,
	getCustomerCardInfo,
	setCustomerInfo,
	getDecryptCustomerInfo,
	getOrderInfo,
	getTagsInfo,
	addTag,
	getSoloPlatRfmInfo,
	updateTag,
	deleteTag,
	getPlatInfo,
	getPlatShopsInfo,
	getAreaInfo,
	getReceiveAddressDecryptMessage,
	getEvaluationInfo,
	getLocationAreas
};

export default service;
