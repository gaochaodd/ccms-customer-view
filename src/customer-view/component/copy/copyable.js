/**
 * copy组件
 * @author chao.gao
 * @since 2018/11/11
 */
import angular from 'angular';
import template from './copyable.tpl.html';
import controller from './CopyCtrl';

const copyOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'copyText': '<'
	}
};

export default angular.module('ccms.components.copyable', [])
	.component('cvCopyable', copyOption)
	.name;

