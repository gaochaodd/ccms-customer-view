/**
 * @author  chao
 * @date on 2018/11/10
 */
// import angular from 'angular';
import {Bind} from 'angular-es-utils/decorators';
import { Inject } from 'angular-es-utils';

@Inject('$element', '$scope', '$ccTips')
export default class Copy{

	// 设置触发方式
	$postLink() {
		this._$element.bind('dblclick', this.onCopy);
	}

	$onDestroy() {
		this._$element.unbind('dblclick', this.onCopy);
	}

	@Bind
	onCopy() {
		const value = this.combinationValue();
		const ele = this.createCopyEle(value);
		document.body.appendChild(ele);
		ele.select();
		// 复制触焦节点的文本
		document.execCommand('copy');
		ele.remove();
		this._$ccTips.success('复制成功');
	}

	createCopyEle(value) {
		const ele = document.createElement('input');

		ele.style.cssText = `
			position: absolute;
			top: 0;
			z-index: -9;
		`;
		ele.value = value;

		return ele;
	};

	combinationValue() {
		const value = this.copyText;
		switch (typeof value) {
			case 'string':
				return value;
			case 'object':
				if (Array.isArray(value)) {
					return value.join('');
				}
				return value;
			default:
				return value;
		}
	};
}
