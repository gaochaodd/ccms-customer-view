/**
 * 会员卡标签index
 * customerLabel.js
 * @author wangbo
 * @since 2018/11/15
 */

import angular from 'angular';
import template from './customerLabel.tpl.html';
import controller from './CustomerLabelCtrl';
import './_customerLabel.less';

const customerLabelOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.customerLabel', [])
	.component('customerLabel', customerLabelOption)
	.name;
