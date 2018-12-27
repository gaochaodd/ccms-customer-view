/**
 * 互动信息index
 * interactive.js
 * @author wangbo
 * @since 2018/11/15
 */

import angular from 'angular';
import template from './interactive.tpl.html';
import controller from './InteractiveCtrl';
import './_interactive.less';

const interactiveOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.interactive', [])
	.component('interactive', interactiveOption)
	.name;
