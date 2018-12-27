/**
 * 权益信息index
 * preferential.js
 * @author wangbo
 * @since 2018/11/13
 */
import angular from 'angular';
import template from './preferential.tpl.html';
import controller from './PreferentialCtrl';
import './_preferential.less';

const preferentialOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.preferential', [])
	.component('preferential', preferentialOption)
	.name;
