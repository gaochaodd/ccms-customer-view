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
	}
};
