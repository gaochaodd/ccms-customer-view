/**
 * 常用收货地址index
 * receiveAddress.js
 * @author wangbo
 * @since 2018/11/10
 */
import angular from 'angular';
import template from './receiveAdress.tpl.html';
import controller from './ReceiveAddressCtrl';
import './_receiveAddress.less';

const receiveAddressOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.receiveAddress', [])
	.component('receiveAddress', receiveAddressOption)
	.name;
