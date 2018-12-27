/**
 * @author  chao
 * @date on 2018/11/07
 */
import { Inject } from 'angular-es-utils';
import customerViewBody from './customerViewModal/customerViewModalBody.tpl.html';
import customerViewCtrl from './customerViewModal/CustomerViewModalCtrl';
import { setEnvName } from "./common/resource";

@Inject('$ccModal', '$scope')
export default class CustomerView {
	constructor() {
		this.formatUniId = this.uniId.substr(0, 1) + '*****' + this.uniId.substr(this.uniId.length - 1);
        setEnvName(this.envName);
	}
	openCustomerView() {
		this._$ccModal
		.modal({
			scope: false,
			title: '客户视图',
			fullscreen: false,
			hasFooter: false,
			locals: {
				uniId: this.uniId
			},
            __body: customerViewBody,
			controller: customerViewCtrl,
			controllerAs: 'vm'
		}).open();
	}
}
