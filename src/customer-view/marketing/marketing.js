/**
 * 营销信息index
 * marketing.js
 * @author wangbo
 * @since 2018/11/12
 */

import angular from 'angular';
import template from './marketing.tpl.html';
import controller from './MarketingCtrl';
import './_marketing.less';

const marketingOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '='
	}
};

export default angular.module('ccms.components.marketing', [])
	.component('marketing', marketingOption)
	.name;
