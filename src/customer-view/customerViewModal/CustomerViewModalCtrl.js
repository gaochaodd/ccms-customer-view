/**
 * @author  chao
 * @date on 2018/11/07
 */
import { Inject } from 'angular-es-utils';

import customerService from '../common/service';

import jeasy from 'jeasy';

import { UNIFIFCATION_AREA_SELECTOR_DATA, GENDER_LIST, PLAT_MAP, TAB_LIST, CUSTOMER_PLAT_ID_LIST } from '../constants/index';


@Inject('$ccTips', '$element', '$timeout', '$window', 'uniId')
export default class customerViewCtrl {
	constructor() {
		// 提示弹窗
		this.TipsModal = this._$element[0].querySelector('.modal-body');

		this.init();
		this.initData();
	}

	/**
	 * 初始化
	 * @returns {Promise<void>}
	 */
    init() {
        this.customerViewLoading = true;

		// tab切换区域 默认显示第一个
        this.tabList = TAB_LIST;
		this.nowLabel = this.tabList[0].key;

		this.today = new Date();

		// 姓名
		this.customerName = {
			loading: false,

			// 用于控制是否显示全称
			displayFullName: true,

			// 是否处于编辑状态
			isEditing: false
		};

		// 性别
		this.gender = {
			selected: '',
			isEditing: false,
			loading: false,

			// 完整列表
			list: GENDER_LIST,

			// 编辑时使用的列表，该列表不包含未知性别
			listForEditing: GENDER_LIST.splice(0, 2),
			fieldsMap: {
				valueField: 'value',
				displayField: 'title'
			}
		};

		// 客户拥有的平台列表
		this.customerOwnedPlatList = [];
		this.selectedArea = {};
		this.onMobileCheck = this.onEmailCheck = true;
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
	}


	/**
	 * 初始化数据
	 * @returns {Promise<void>}
	 */
	async initData() {
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
	    let areasData = null;
	    try {
		    areasData = JSON.parse(localStorage.getItem(UNIFIFCATION_AREA_SELECTOR_DATA));
	    } catch (e) {
	    	// 地址信息格式错误
	    }
	    if (!areasData || !Array.isArray(areasData) || areasData.length === 0) {
		    await customerService.getLocationAreas().then(areas => {
			    localStorage.setItem(UNIFIFCATION_AREA_SELECTOR_DATA, JSON.stringify(areas));
		    });
	    }
	    return JSON.parse(localStorage.getItem(UNIFIFCATION_AREA_SELECTOR_DATA));
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
	        this.customerIdsList = CUSTOMER_PLAT_ID_LIST.map(item => {
                if (item.field === 'OMNI') {
                    item.value = this._uniId;
                }
                if (item.field === plat.platCode) {
                    this.customerOwnedPlatList.push(plat.platCode);
                    item.value = plat[item.type];
                }
                return item;
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
                this.customerMarketingInfoFirstCol[key].overWidth = jeasy.getTextWidth(this.customerMarketingInfoFirstCol[key].value) > 240;
            } else if (this.customerMarketingInfoFirstCol[key].type === 'shopList') {
                this.customerMarketingInfoFirstCol[key].value = this.reformShopList(customerInfo[key]);
                // 420为展示区最大宽度
                this.customerMarketingInfoFirstCol[key].overWidth = jeasy.getTextWidth(this.customerMarketingInfoFirstCol[key].value) > 240;
            } else {
                this.customerMarketingInfoFirstCol[key].value = customerInfo[key];
            }
        }
        for (const key in this.customerMarketingInfoSecondCol) {
            if (this.customerMarketingInfoSecondCol[key].type === 'plat') {
                this.customerMarketingInfoSecondCol[key].value = this.reformPlat(customerInfo[key]).title || '';
            } else {
                this.customerMarketingInfoSecondCol[key].value = customerInfo[key];
            }
        }
        for (const key in this.customerMarketingInfoThirdCol) {
            if (this.customerMarketingInfoThirdCol[key].type === 'plat') {
                this.customerMarketingInfoThirdCol[key].value = this.reformPlat(customerInfo[key]).title || '';
            } else {
                this.customerMarketingInfoThirdCol[key].value = customerInfo[key];
            }
        }
        this.boughtPlatformList = [];
        // 666为展示区最大宽度
        this.isAddressOverWidth = jeasy.getTextWidth(this.customerBasicInfo.address) > 666;
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
		if (gender === 'm' || gender === 'M') {
			this.defaultAvatarClass = 'maleAvatar';
			return;
		}
		if (gender === 'f' || gender === 'F') {
			this.defaultAvatarClass = 'femaleAvatar';
			return;
		}
		if (gender === 'w' || gender === 'W' || !gender) {
			this.defaultAvatarClass = 'unknownAvatar';
			return;
		}
	}

	/**
	 * 格式化性别
	 * @param gender 性别参数: 'f', 'm', 'w'
	 */
	reformGender(gender) {
		const genderList = this.gender.list.filter(item => item.value === gender);
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
		return jeasy.moment(birthday).format('YYYY/mm/DD');
	}
	/**
	 * 格式化年龄
	 * @param birthday
	 */
	reformAge(birthday) {
		if (!birthday) return '--';
		const year = jeasy.moment(birthday).fullYear;
		return `${jeasy.moment().fullYear - year}岁`;
	}
	/**
	 * 格式化平台
	 * @param platCode
	 */
	reformPlat(platCode) {
		return PLAT_MAP[platCode] || {};
	}

	/**
	 * 格式化平台数组
	 * @param platStr 逗号隔开的platCode串
	 * @returns 顿号隔开的platName串
	 */
	reformPlatList(platStr) {
		if (!platStr) {
			return '--';
		}
		const boughtPlatformList = [];
		platStr.split(',').forEach(platCode => {
			boughtPlatformList.push(this.reformPlat(platCode).title || '');
		});
		return boughtPlatformList.join('、');
	}
	/**
	 * 格式化平台店铺组
	 * @param shopStr 逗号隔开的shopName串
	 * @returns 顿号隔开的shopName串
	 */
	reformShopList(shopStr) {
		if (!shopStr) {
			return '--';
		}
		return shopStr.replace(/,/g, '、');
	}

	/**
	 * 重置各模块编辑状态
	 */
	resetEditState() {
		this.customerName.isEditing = this.onMobileEdit = this.onEmailEdit = this.onBirthdayEdit = this.onBirthdayEdit = this.gender.isEditing = this.onAddressEdit = false;
	}

	/**
	 * 查看/隐藏姓名
	 */
	checkFullName() {
		this.customerName.loading = true;
		if (this.customerName.displayFullName === true) {
			customerService.getDecryptCustomerInfo(this._uniId, 'fullName').then(res => {
				this.customerBasicInfo.fullName = res.data;
				this.customerName.displayFullName = false;
				this.customerName.loading = false;
			});
			return;
		}
		this.customerBasicInfo.fullName = this.encodeMessage.fullName;
		this.customerName.displayFullName = true;
		this.customerName.loading = false;
	}
	/**
	 * 编辑姓名
	 */
	editFullName() {
		this.resetEditState();

		this.customerName.isEditing = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'fullName').then(res => {
			this.customerBasicInfo.fullName = res.data;
			let element = this._$window.document.getElementById('fullName');
			if (element) element.focus();
		});
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
		this.customerName.loading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'fullName', value: this.customerBasicInfo.fullName}).then(res => {
			this.customerBasicInfo.fullName = res.data;
			this.encodeMessage.fullName = res.data;
			this.customerName.displayFullName = true;
			this.customerName.isEditing = false;
			this.customerName.loading = false;
		}).catch(err => {
			this.customerName.loading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消姓名保存
	 */
	cancelFullNameSave() {
		this.customerBasicInfo.fullName = this.encodeMessage.fullName;
		this.customerName.isEditing = false;
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
		this.resetEditState();

		this.onMobileEdit = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'mobile').then(res => {
			this.customerBasicInfo.mobile = res.data;
			let element = this._$window.document.getElementById('mobile');
			if (element) element.focus();
		});
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
		this.resetEditState();

		this.onEmailEdit = true;
		customerService.getDecryptCustomerInfo(this._uniId, 'email').then(res => {
			this.customerBasicInfo.email = res.data;
			let element = this._$window.document.getElementById('email');
			if (element) element.focus();
		});
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
		this.resetEditState();

		this.birthday = new Date(this.customerBasicInfo.birthday);
		this.onBirthdayEdit = true;
	}
	handleBirthdaySave() {
		this.birthdayLoading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'birthday', value: jeasy.moment(this.birthday).format('yyyyMMdd')}).then(res => {
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
		this.resetEditState();

		this.gender.selected = this.customerBasicInfo.gender;
		this.gender.isEditing = true;
	}
	handleGenderSave() {
		this.gender.loading = true;
		customerService.setCustomerInfo(this._uniId, {field: 'gender', value: this.gender.selected}).then(res => {
			this.customerBasicInfo.gender = res.data;
			this.gender.selected = res.data;

			// 修改性别后重新更换头像
			this.setAvatar(this.customerBasicInfo.gender);
			this.gender.isEditing = false;
			this.gender.loading = false;
		}).catch(err => {
			this.gender.loading = false;
			this._$ccTips.error(err.data.msg, this.TipsModal);
		});
	}
	/**
	 * 取消性别保存
	 */
	cancelGenderSave() {
		this.gender.isEditing = false;
	}
	/**
	 * 编辑地址
	 */
	editStateAndCity() {
		this.resetEditState();
		this.onAddressEdit = true;
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
	 * @param key
	 */
	changeTab(key) {
		this.nowLabel = key;
	}
}
