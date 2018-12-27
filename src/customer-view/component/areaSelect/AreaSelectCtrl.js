/**
 * @author  chao
 * @date on 2018/11/20
 */
import { $Inject } from 'angular-utils';
@$Inject('$scope', '$ccTips')
export default class AreaSelectCtrl {
	constructor($scope, $ccTips) {
		this._$scope = $scope;
		this._$ccTips = $ccTips;
		this.init();
	}
	init() {
		this.loading = true;
		this.fieldMap = {
			valueField: 'id',
			displayField: 'name'
		};
		this.finalArea = this.selectedArea;
		this.stateList = [];
		this.cityList = [];
		this.districtList = [];
		this.townList = [];

		this.areaList = this.getAreasFromLocalStorage();
		if (this.selectedArea) {
			console.log(this.selectedArea);
			const {state, city, district, town, address} = this.selectedArea;
			this.state = state;
			this.areaList.forEach((stateInfo, index) => {
				if (stateInfo.id === this.state) {
					this.cityList = this.areaList[index].children;
					this.loading = false;
					return;
				};
			});
			this.city = city;
			this.cityList.forEach((cityInfo, index) => {
				if (cityInfo.id === this.city) {
					this.districtList = this.cityList[index].children;
					this.loading = false;
					return;
				};
			});
			this.district = district;
			this.districtList.forEach((districtInfo, index) => {
				if (districtInfo.id === this.district) {
					this.townList = this.districtList[index].children;
					this.loading = false;
					return;
				};
			});
			this.town = town;
			this.detailAddress = address;
			this.loading = false;
			return;
		}
		this.loading = false;
		this.state = this.city = this.district = this.town = this.detailAddress = '';
	}
	getAreasFromLocalStorage() {
		if (!localStorage.getItem('UNIFIFCATION_AREA_SELECTOR_DATA')) {
			const areas = require('../../constants/unificationAreas.json');
			localStorage.setItem('UNIFIFCATION_AREA_SELECTOR_DATA', JSON.stringify(areas));
		}
		return JSON.parse(localStorage.getItem('UNIFIFCATION_AREA_SELECTOR_DATA'));
	}
	onProvenceChange(oldValue, newValue, itemIndex) {
		this.city = '';
		this.finalArea = {state: this.state, city: '', district: '', town: ''};
		this.cityList = this.areaList[itemIndex].children;
	}
	onCityChange(oldValue, newValue, itemIndex) {
		this.district = '';
		this.finalArea = { state: this.state, city: this.city, district: '', town: '' };
		if (!this.city) {
			this.districtList = [];
			return;
		}
		this.districtList = this.cityList[itemIndex].children;
	}
	onDistrictChange(oldValue, newValue, itemIndex) {
		this.town = '';
		this.finalArea = { state: this.state, city: this.city, district: this.district, town: '' };
		if (!this.district) {
			this.townList = [];
			return;
		}

		if (this.districtList[itemIndex].children) {
			this.townList = this.districtList[itemIndex].children;
			return;
		}
		this.townList = null;
	}
	onTownChange() {
		if (!this.town) {
			return;
		}
		this.finalArea = {state: this.state, city: this.city, district: this.district, town: this.town};
	}
	handleSaveArea() {
		if (!this.finalArea.state && !this.detailAddress) {
			this._$ccTips.error('地址不能为空');
			return;
		}
		this.finalArea.address = this.detailAddress;
		this.onSaveDone({area: this.finalArea});
	}
	handleCancelArea() {
		this.onCancelDone();
	}
	handleDetailAddressEdit(event) {
		if (event.keycode === 13) {
			this.handleSaveArea();
		}
	}
}
