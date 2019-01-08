/**
 * 评价信息index
 * evaluation.js
 * @author wangbo
 * @since 2018/11/15
 */

import angular from 'angular';
import template from './evaluation.tpl.html';
import controller from './EvaluationCtrl';
import './_evaluation.less';

const evaluationOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '<',
		'customerOwnedPlatList': '<'
	}
};

export default angular.module('ccms.components.evaluation', [])
	.component('evaluation', evaluationOption)
	.name;
