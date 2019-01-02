/**
 * @author  chao
 * @date on 2018/11/07
 */
import moment from 'moment';
import { Inject } from 'angular-es-utils';

import customerService from '../common/service';
import maleAvatar from '../assets/img/male.png';
import femaleAvatar from '../assets/img/female.png';
import unknownAvatar from '../assets/img/unknown.png';

import utils from '../common/utils';

import { UNIFIFCATION_AREA_SELECTOR_DATA, GENDER_LIST, PLAT_LIST, TAB_TITLE } from '../constants/index';


@Inject('$ccModal', '$scope', '$ccTips', '$element', '$timeout', '$window', 'uniId')
export default class customerViewCtrl {
	constructor() {
		// 提示弹窗
		this.TipsModal = this._$element[0].querySelector('.modal-body');
		// 性别
		this.customerSexConf = GENDER_LIST;
		this.customerSexList = [{
			title: '男',
			value: 'm'
		},
		{
			title: '女',
			value: 'f'
		}];
		this.platConf = PLAT_LIST;
		this.init();
	}
	// 初始化
    async init() {
        this.customerViewLoading = true;

        this.tabTitle = TAB_TITLE;
		this.today = new Date();
		this.index = 0;

		this.fieldsMap = {
			valueField: 'value',
			displayField: 'title'
		};
		this.selectedPlatList = [];
		this.selectedArea = {};
		this.onFullNameCheck = this.onMobileCheck = this.onEmailCheck = true;
		this.prepareEditFullName = false;
		this.customerMarketingInfoFirstCol = {
			boughtPlatform: {title: '购买过的平台', type: 'platList'},
			boughtShopName: {title: '购买过的店铺', type: 'shopList'},
			totalPurchaseAmount: {title: '总购买金额', type: 'money'}
		};
		this.customerMarketingInfoSecondCol = {
			firstPurchasePlatform: {title: '首次购买平台', field: 'firstPurchasePlatform', type: 'plat'},
			firstPurchaseShopName: {title: '首次购买店铺', field: 'firstPurchaseShopName'},
			totalPurchaseTimes: {title: '总购买次数', field: 'totalPurchaseTimes', unit: '次'}
		};
		this.customerMarketingInfoThirdCol = {
			lastPurchasePlatform: {title: '最近一次购买平台', field: 'lastPurchasePlatform', type: 'plat'},
			lastPurchaseShopName: {title: '最近一次购买店铺', field: 'lastPurchaseShopName'},
			averageCustomerPrice: {title: '平均客单价', field: 'averageCustomerPrice', type: 'money'}
		};
		this.customerIdsList = [
			{title: '全渠道客户ID', field: 'OMNI', type: 'platAccount'},
			{title: '淘宝昵称', field: 'TAOBAO', type: 'platAccount'},
			// {title: '微信昵称', field: 'WX'},
			{title: '京东用户名', field: 'JOS', type: 'platAccount'},
			{title: '线下账号', field: 'OFFLINE', type: 'platAccount'},
			{title: '有赞昵称', field: 'YOUZAN', type: 'platAccount'},
			{title: '苏宁账号', field: 'SUNING', type: 'platAccount'},
			{title: '美丽说账号', field: 'MGJ', type: 'platAccount'},
			{title: '当当账号', field: 'DD', type: 'platAccount'}];

        const customerInfo = await this.getCustomerInfo();
        this.initCustomerInfo(customerInfo);
        await this.initAreasData();

        this._$timeout(() => {
            this.customerViewLoading = false;
        });
	}

    /**
     * 获取客户信息数据
     * @returns {Promise<void>}
     */
    async getCustomerInfo() {
        return await customerService.getCustomerInfo(this._uniId);
    }

    /**
     * 初始化地址信息
     */
    async initAreasData() {
	    if (!localStorage.getItem('UNIFIFCATION_AREA_SELECTOR_DATA')) {
		    await customerService.getLocationAreas().then(areas => {
			    localStorage.setItem('UNIFIFCATION_AREA_SELECTOR_DATA', JSON.stringify(areas));
		    });
	    }
	    return JSON.parse(localStorage.getItem('UNIFIFCATION_AREA_SELECTOR_DATA'));
    }
    /**
     * 初始化客户信息
     * @param customerInfo
     */
	initCustomerInfo(customerInfo) {
        const {
            fullName,
            // fullNameSource,
            gender,
            // genderSource,
            birthday,
            // birthdaySource,
            mobile,
            // mobileSource,
            email,
            // emailSource,
            state,
            city,
            district,
            town,
            stateName,
            cityName,
            districtName,
            townName,
            address,
            // addressSource,
            platAccountList
        } = customerInfo;
        // 整理用户账号区域
        platAccountList.forEach(plat => {
            this.customerIdsList.forEach(item => {
                if (item.field === 'OMNI') {
                    item.value = this._uniId;
                }
                if (item.field === plat.platCode) {
                    this.selectedPlatList.push(plat.platCode);
                    item.value = plat[item.type];
                    return;
                }
            });
            if (plat.platCode === 'WX') {
                this.wxAvatarUrl = plat.platAvatar;
            }
            if (plat.platCode === 'YOUZAN') {
                this.yuoZanAvatarUrl = plat.platAvatar;
            }
        });
        // 保存加密信息
        this.encodeMessage = {
            fullName,
            mobile,
            email
        };
        // 整理用户基本信息模块
        this.customerBasicInfo = {
            fullName,
            // isFullNameChangable: fullNameSource !== 'BIND_CARD',
            gender,
            // isGenderChangable: genderSource !== 'BIND_CARD',
            birthday: this.reformBirthday(birthday),
            // isBirthdayChangable: birthdaySource !== 'BIND_CARD',
            age: this.reformAge(birthday),
            mobile: mobile,
            // isMobileChangable: mobileSource !== 'BIND_CARD',
            email: email,
            // isEmailChangable: emailSource !== 'BIND_CARD',
            address: `${stateName || ''} ${cityName || ''} ${districtName || ''} ${townName || ''} ${address || ''}`
            // isAddressChangable: addressSource !== 'BIND_CARD'
        };
        // 整理用户头像
        this.setAvatar(gender);
        // 初始化用户地区信息
        this.selectedArea = {state, city, district, town, address};
        // 整理用户销售信息
        for (const key in this.customerMarketingInfoFirstCol) {
            if (this.customerMarketingInfoFirstCol[key].type === 'platList') {
                this.customerMarketingInfoFirstCol[key].value = this.reformPlatList(customerInfo[key]);
                // 420为展示区最大宽度
                this.customerMarketingInfoFirstCol[key].overWidth = utils.getWidth(this.customerMarketingInfoFirstCol[key].value) > 240;
            } else if (this.customerMarketingInfoFirstCol[key].type === 'shopList') {
                this.customerMarketingInfoFirstCol[key].value = this.reformShopList(customerInfo[key]);
                // 420为展示区最大宽度
                this.customerMarketingInfoFirstCol[key].overWidth = utils.getWidth(this.customerMarketingInfoFirstCol[key].value) > 240;
            } else {
                this.customerMarketingInfoFirstCol[key].value = customerInfo[key];
            }
        }
        for (const key in this.customerMarketingInfoSecondCol) {
            if (this.customerMarketingInfoSecondCol[key].type === 'plat') {
                this.customerMarketingInfoSecondCol[key].value = this.reformPlat(customerInfo[key]);
            } else {
                this.customerMarketingInfoSecondCol[key].value = customerInfo[key];
            }
        }
        for (const key in this.customerMarketingInfoThirdCol) {
            if (this.customerMarketingInfoThirdCol[key].type === 'plat') {
                this.customerMarketingInfoThirdCol[key].value = this.reformPlat(customerInfo[key]);
            } else {
                this.customerMarketingInfoThirdCol[key].value = customerInfo[key];
            }
        }
        this.boughtPlatformList = [];
        // 666为展示区最大宽度
        this.isAddressOverWidth = utils.getWidth(this.customerBasicInfo.address) > 666;
    }

	/**
	 * 设置头像
	 * @param gender 性别参数: 'f', 'm', 'w'
	 */
	setAvatar(gender) {
		if (this.wxAvatarUrl) {
			this.avatarUrl = this.wxAvatarUrl;
			return;
		}
		if (this.yuoZanAvatarUrl) {
			this.avatarUrl = this.yuoZanAvatarUrl;
			return;
		}
		if (gender === 'm') {
			this.avatarUrl = maleAvatar;
			return;
		}
		if (gender === 'f') {
			this.avatarUrl = femaleAvatar;
			return;
		}
		if (gender === 'w' || !gender) {
			this.avatarUrl = unknownAvatar;
			return;
		}
	}

	/**
	 * 格式化性别
	 * @param gender 性别参数: 'f', 'm', 'w'
	 */
	reformGender(gender) {
		const genderList = this.customerSexConf.filter(item => item.value === gender);
		if (genderList.length === 0) {
			return '--';
		}
		return genderList[0].title;
	}
	/**
	 * 格式化生日
	 * @param birthday 参数格式'YYYYMMDD'
	 */
	reformBirthday(birthday) {
		if (!birthday) return '--';
		return moment(`${birthday}`).format('YYYY/MM/DD');
	}
	/**
	 * 格式化年龄
	 * @param birthday 参数格式'YYYYMMDD'
	 */
	reformAge(birthday) {
		if (!birthday) return '--';
		return `${moment().year() - moment(`${birthday}`).year()}岁`;
	}
	/**
	 * 格式化平台
	 * @param platCode
	 */
	reformPlat(platCode) {
		return this.platConf.filter(item => item.value === platCode)[0].title;
	}
	/**
	 * 格式化平台数组
	 * @param platStr 逗号隔开的platCode串
	 * @returns 顿号隔开的platName串
	 */
	reformPlatList(platStr) {
		const boughtPlatformList = [];
		platStr.split(',').forEach(platCode => {
			boughtPlatformList.push(this.reformPlat(platCode));
		});
		return boughtPlatformList.join('、');
	}
	/**
	 * 格式化平台店铺组
	 * @param shopStr 逗号隔开的shopName串
	 * @returns 顿号隔开的shopName串
	 */
	reformShopList(shopStr) {
		return shopStr.replace(/,/g, '、');
	}

	/**
	 * 查看是否有模块正在编辑
	 */
	isEdit() {
		this.onFullNameEdit = this.onMobileEdit = this.onEmailEdit = this.onBirthdayEdit = this.onBirthdayEdit = this.onGenderEdit = this.onAddressEdit = false;
	}

	/**
	 * 查看/隐藏姓名
	 */
	checkFullName() {
		this.fullNameLoading = true;
		if (this.onFullNameCheck === true) {
			customerService.getDecryptCustomerInfo(this._uniId, 'fullName').then(res => {
				this.customerBasicInfo.fullName = res.data;
				this.onFullNameCheck = false;
				this.fullNameLoading = false;
			});
			return;
		}
		this.customerBasicInfo.fullName = this.encodeMessage.fullName;
		this.onFullNameCheck = true;
		this.fullNameLoading = false;
	}
	/**
	 * 编辑姓名
	 */
	editFullName() {
		if (this.isEdit()) return;
		// if (this.customerBasicInfo.isFullNameChangable) {
			// this.onFullNameEdit = true;
			// customerService.getDecryptCustomerInfo(this._uniId, 'fullName').then(res => {
			// 	this.customerBasicInfo.fullName = res.data;
			// 	let element = this._$window.document.getElementById('fullName');
			// 	if (element) element.focus();
		// 	});
		// 	return;
		// }
		this.onFullNameEdit = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'fullName').then(res => {
			this.customerBasicInfo.fullName = res.data;
			let element = this._$window.document.getElementById('fullName');
			if (element) element.focus();
		});
		// this._$ccTips.error('姓名为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	/**
	 * 监听姓名输入框
	 * @param event
	 */
	handleFullNameEdit(event) {
		if (event.keyCode === 13) {
			this.handleFullNameSave();
		}
	}
	/**
	 * 保存姓名数据
	 */
	handleFullNameSave() {
		if (!this.customerBasicInfo.fullName) {
			this._$ccTips.error('姓名不能为空', this.TipsModal);
			return;
		}
		this.fullNameLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'fullName', value: this.customerBasicInfo.fullName}).then(res => {
			this.customerBasicInfo.fullName = res.data;
			this.encodeMessage.fullName = res.data;
			this.onFullNameCheck = true;
			this.onFullNameEdit = false;
			this.fullNameLoading = false;
		}).catch(err => {
			this.fullNameLoading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消姓名保存
	 */
	cancelFullNameSave() {
		this.customerBasicInfo.fullName = this.encodeMessage.fullName;
		this.onFullNameEdit = false;
	}
	/**
	 * 查看/隐藏手机号
	 */
	checkMobile() {
		this.mobileLoading = true;
		if (this.onMobileCheck === true) {
			customerService.getDecryptCustomerInfo(this._uniId, 'mobile').then(res => {
				this.customerBasicInfo.mobile = res.data;
				this.onMobileCheck = false;
				this.mobileLoading = false;
			});
			return;
		}
		this.customerBasicInfo.mobile = this.encodeMessage.mobile;
		this.onMobileCheck = true;
		this.mobileLoading = false;
	}
	/**
	 * 编辑手机号
	 */
	editMobile() {
		if (this.isEdit()) return;
		// 是否有权限修改电话号码（暂时取消）
		// if (this.customerBasicInfo.isMobileChangable) {
		// 	this.onMobileEdit = true;
		// 	customerService.getDecryptCustomerInfo(this._uniId, 'mobile').then(res => {
		// 		this.customerBasicInfo.mobile = res.data;
		// 		let element = this._$window.document.getElementById('mobile');
		// 		if (element) element.focus();
		// 	});
		// 	return;
		// }
		this.onMobileEdit = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'mobile').then(res => {
			this.customerBasicInfo.mobile = res.data;
			let element = this._$window.document.getElementById('mobile');
			if (element) element.focus();
		});
		// this._$ccTips.error('手机号为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	/**
	 * 监听手机号输入框
	 */
	handleMobileEdit(event) {
		if (event.keyCode === 13) {
			this.handleMobileSave();
		}
	}
	/**
	 * 手机号储存
	 */
	handleMobileSave() {
		const reg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/;
		if (!this.customerBasicInfo.mobile) {
			this._$ccTips.error('手机号不能为空', this.TipsModal);
			return;
		}
		if (!this.customerBasicInfo.mobile.match(reg)) {
			this._$ccTips.error('请输入符合规则的手机号', this.TipsModal);
			return;
		}
		this.mobileLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'mobile', value: this.customerBasicInfo.mobile}).then(res => {
			this.customerBasicInfo.mobile = res.data;
			this.encodeMessage.mobile = res.data;
			this.onMobileCheck = true;
			this.onMobileEdit = false;
			this.mobileLoading = false;
		}).catch(err => {
			this.mobileLoading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消手机号保存
	 */
	cancelModileSave() {
		this.customerBasicInfo.mobile = this.encodeMessage.mobile;
		this.onMobileEdit = false;
	}
	/**
	 * 查看/隐藏邮箱
	 */
	checkEmail() {
		this.emailLoading = true;
		if (this.onEmailCheck === true) {
			customerService.getDecryptCustomerInfo(this._uniId, 'email').then(res => {
				this.customerBasicInfo.email = res.data;
				this.onEmailCheck = false;
				this.emailLoading = false;
			});
			return;
		}
		this.customerBasicInfo.email = this.encodeMessage.email;
		this.onEmailCheck = true;
		this.emailLoading = false;
	}
	/**
	 * 编辑邮箱
	 */
	editEmail() {
		if (this.isEdit()) return;
		// 是否可修改邮箱（暂时取消）
		// if (this.customerBasicInfo.isEmailChangable) {
		// 	this.onEmailEdit = true;
		// 	customerService.getDecryptCustomerInfo(this._uniId, 'email').then(res => {
		// 		this.customerBasicInfo.email = res.data;
		// 		let element = this._$window.document.getElementById('email');
		// 		if (element) element.focus();
		// 	});
		// 	return;
		// }
		this.onEmailEdit = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'email').then(res => {
			this.customerBasicInfo.email = res.data;
			let element = this._$window.document.getElementById('email');
			if (element) element.focus();
		});
		// this._$ccTips.error('邮箱为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	handleEmailEdit(event) {
		if (event.keyCode === 13) {
			this.handleEmailSave();
		}
	}
	handleEmailSave() {
		const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
		if (!this.customerBasicInfo.email) {
			this._$ccTips.error('邮箱不能为空', this.TipsModal);
			return;
		}
		if (!this.customerBasicInfo.email.match(reg)) {
			this._$ccTips.error('请输入符合规则的邮箱', this.TipsModal);
			return;
		}
		this.emailLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'email', value: this.customerBasicInfo.email}).then(res => {
			this.customerBasicInfo.email = res.data;
			this.encodeMessage.email = res.data;
			this.onEmailCheck = true;
			this.onEmailEdit = false;
			this.emailLoading = false;
		}).catch(err => {
			this.emailLoading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消邮箱保存
	 */
	cancelEmailSave() {
		this.customerBasicInfo.email = this.encodeMessage.email;
		this.onEmailEdit = false;
	}
	/**
	 * 编辑生日
	 */
	editBirthday() {
		if (this.isEdit()) return;
		// 判断是否可编辑（暂时取消）
		// if (this.customerBasicInfo.isBirthdayChangable) {
		// 	this.birthday = new Date(this.customerBasicInfo.birthday);
		// 	this.onBirthdayEdit = true;
		// 	return;
		// }
		this.birthday = new Date(this.customerBasicInfo.birthday);
		this.onBirthdayEdit = true;
		// this._$ccTips.error('生日为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	handleBirthdaySave() {
		this.birthdayLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'birthday', value: moment(this.birthday).format('YYYYMMDD')}).then(res => {
			this.customerBasicInfo.birthday = this.reformBirthday(res.data);
			this.customerBasicInfo.age = this.reformAge(res.data);
			this.onBirthdayEdit = false;
		}).catch(err => {
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
		this.birthdayLoading = false;
	}
	/**
	 * 取消邮箱保存
	 */
	cancelBirthdaySave() {
		this.onBirthdayEdit = false;
	}

	/**
	 * 编辑性别
	 */
	editGender() {
		if (this.isEdit()) return;
		// if (this.customerBasicInfo.isGenderChangable) {
		// 	this.onGenderEdit = true;
		// 	this.gender = this.customerBasicInfo.gender;
		// 	return;
		// }
		this.gender = this.customerBasicInfo.gender;
		this.onGenderEdit = true;
		// this._$ccTips.error('性别为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	handleGenderSave() {
		this.genderLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'gender', value: this.gender}).then(res => {
			this.customerBasicInfo.gender = res.data;
			this.gender = res.data;
			// 修改性别后重新更换头像
			this.setAvatar(this.customerBasicInfo.gender);
			this.onGenderEdit = false;
			this.genderLoading = false;
		}).catch(err => {
			this.genderLoading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消性别保存
	 */
	cancelGenderSave() {
		this.onGenderEdit = false;
	}
	/**
	 * 编辑地址
	 */
	editStateAndCity() {
		if (this.isEdit()) return;
		// 判断是否可修改地址（暂时取消）
		// if (this.customerBasicInfo.isAddressChangable) {
		// 	this.onAddressEdit = true;
		// 	return;
		// }
		this.onAddressEdit = true;
		// this._$ccTips.error('地址为领卡入会时设置，请前往忠诚度管理中编辑', this.TipsModal);
	}
	/**
	 * 储存地址
	 */
	handleAddressSave(area) {
		this.addressLoading = true;
		const { state, city, district, town, address } = area;
		customerService.setCustomerInfo(this._uniId, {field: 'unionAddress', value: `${state || ''},${city || ''},${district || ''},${town || ''},${address || ''}`}).then(res => {
			// const areaNameList = res.data.split(',');
			// this.customerBasicInfo.address = `${areaNameList[0] || '--'} ${areaNameList[1] || '--'} ${areaNameList[2] || '--'} ${areaNameList[3] || '--'} ${areaNameList[4] || '--'}`;
			this.onDetailAddressEdit = false;
			this.selectedArea = {state, city, district, town, address};
			this.onAddressEdit = false;
			this.addressLoading = false;
		}).catch(err => {
			this.addressLoading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消地址保存
	 */
	cancelAddressSave() {
		this.onAddressEdit = false;
	}
	/**
	 * 切换tab
	 */
	changeTab(index) {
		this.index = index;
	}
}
