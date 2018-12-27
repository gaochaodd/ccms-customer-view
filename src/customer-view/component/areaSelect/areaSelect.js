/**
 * copy组件
 * @author chao.gao
 * @since 2018/11/11
 */
import angular from 'angular';
import template from './areaSelect.tpl.html';
import controller from './AreaSelectCtrl';
import './_areaSelect';

const areaSelectOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'selectedArea': '<',
		'onSaveDone': '&',
		'onCancelDone': '&'
	}
};

export default angular.module('ccms.components.areaSelect', [])
	.component('cvAreaSelect', areaSelectOption)
	.name;

