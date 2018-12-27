/**
 * 会员卡信息index
 * customerCard.js
 * @author wangbo
 * @since 2018/11/10
 */
import angular from 'angular';
import template from './customerCard.tpl.html';
import controller from './CustomerCardCtrl';
import './_customerCard.less';

const customerCardOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.customerCard', [])
	.component('customerCard', customerCardOption)
	.name;
