/**
 * 新建或编辑自定义标签controller
 * LabelModalCtrl.js
 * @author wangbo
 * @since 2018/11/16
 */
import {Inject} from 'angular-es-utils';
import './_labelModal.less';
import service from '../../common/service';

@Inject('$scope', '$ccTips', 'modalInstance', '$ccModal')
export default class labelModalCtrl {
	constructor() {
		// todo 客户标签接口待定
		this.init();
	}

	/**
	 * 初始化;
	 */
	init() {
		// 获取传递的数据,新建的时候传递tag为空
		this.data = {
			uniId: this.uniId, // uniId
			tagInfo: this.tag, // 标签
			type: this.type // 标签类型
		};
	}

	/**
	 * 获取标签列表
	 */
	getTags() {
		//
	}

	/**
	 * 删除标签
	 */
	deleteTag() {
		const tagInfo = this.data.tagInfo;
		this._$ccModal.confirm('确定删除标签？').open().result
			.then(() => {
				service.deleteTag(this.data.uniId, tagInfo.tagId).then(res => {
					this._$ccTips.success('删除成功');
					this.cancel();
				}).catch(err => {
					console.error(err.message);
				});
			});
	}

	/**
	 * 保存标签
	 */
	saveTag() {
		const tagInfo = this.data.tagInfo;
		const saveType = this.data.type === 'add'; // true表示新增，false表示更新

		// 更新保存参数
		const updateParams = {
			tagId: saveType ? '' : tagInfo.tagId,
			tagName: this.tagName,
			tagType: this.tagType
		};
		// 新建保存参数
		const addParams = {
			tagName: this.tagName,
			tagType: this.tagType
		};

		const saveParams = saveType ? addParams : updateParams;
		const saveMethod = saveType ? 'addTag' : 'updateTag';

		service[saveMethod](this.data.uniId, saveParams).then(res => {
			this._$ccTips.success('保存成功');
			this.cancel();
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * 取消保存关闭modal
	 */
	cancel() {
		this._modalInstance.ok(true);
	}
}
