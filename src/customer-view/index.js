/**
 * @author chao
 * @since 18/11/07
 */

import angular from 'angular';
import iconList from './assets/iconfont';
import template from './customer_view.tpl.html';
import controller from './CustomerViewCtrl';
import './customerViewModal/customer_view_modal_style.less';
import './customer_view_style.less';
import receiveAddress from './receiveAddress/receiveAddress';
import customerCard from './customerCard/customerCard';
import marketing from './marketing/marketing';
import cvCopyable from './component/copy/copyable';
import preferential from './preferential/preferential';
import order from './order/order';
import interaction from './interactive/interactive';
import customerLabel from './customerLabel/customerLabel';
import evaluation from './evaluation/evaluation';
import cvAreaSelect from './component/areaSelect/areaSelect';

const customerViewOption = {
	template: template,
	controller,
	controllerAs: 'vm',
	bindings: {
		'uniId': '<',
        'envName': '<'
	}
};
export default angular.module('components.customerView', [
	receiveAddress,
	customerCard,
	marketing,
	preferential,
	order,
	interaction,
	customerLabel,
	evaluation,
	cvCopyable,
	cvAreaSelect,
	...iconList
]).component('customerView', customerViewOption)
	.name;
