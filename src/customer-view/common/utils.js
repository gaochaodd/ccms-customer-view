export default {
	getWidth(str) {
		let overSizeDiv = document.getElementById('overSizeDiv');
		if (!overSizeDiv) {
			const ele = document.createElement('div');
			ele.style.position = 'absolute';
			ele.style.top = '0';
			ele.style.zIndex = '-10';
			ele.id = 'overSizeDiv';
			document.body.appendChild(ele);
			overSizeDiv = document.getElementById('overSizeDiv');
		}
		overSizeDiv.innerText = str;
		return parseInt(window.getComputedStyle(overSizeDiv).width, 10);
	},

	/**分割时间数字
	 * 需要注意的是dateNumber并不是时间戳
	 * 由于后端返回的是 19870101类型的时间，所以需要将这种时间进行分割
	 * @param dateNumber: 时间数字，如 19880101
	 * @returns {{year: string, month: string, day: string}}
	 */
	splitDateNumber(dateNumber) {
		const dateStr = dateNumber ? dateNumber.toString() : '';
		return {
			year: dateStr.substr(0, 4),
			month: dateStr.substr(4, 2),
			day: dateStr.substr(6, 2)
		};
	},

	/**
	 * 格式化数字类型的时间
	 * 需要注意的是dateNumber并不是时间戳
	 * @param dateNumber: 时间数字，如 19880101
	 * @param format: 格式，如'YYYY/MM/DD'
	 * @returns {*}
	 */
	formatDateNumber(dateNumber, format) {
		const dataObj = this.splitDateNumber(dateNumber);
		return format.replace(/YYYY/i, dataObj.year).replace(/MM/i, dataObj.month).replace(/DD/i, dataObj.day);
	}

};
