/**
 * @author chao
 * @since 2018/11/14
 */

import angular from 'angular';
import template from './order.tpl.html';
import controller from './OrderCtrl';
import './_order.less';

const orderOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '<',
		'customerOwnedPlatList': '<'
	}
};

export default angular.module('ccms.components.order', [])
	.component('order', orderOption)
	.name;
