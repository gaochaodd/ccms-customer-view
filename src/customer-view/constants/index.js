// 平台 MAP
export const PLAT_MAP = {
	'TAOBAO':{
		title: '淘宝',
		value: 'TAOBAO'
	},
	'JOS': {
		title: '京东',
		value: 'JOS'
	},
	'YHD': {
		title: '一号店',
		value: 'YHD'
	},
	'SUNING': {
		title: '苏宁',
		value: 'SUNING'
	},
	'MGJ': {
		title: '美丽说',
		value: 'MGJ'
	},
	'YOUZAN': {
		title: '有赞',
		value: 'YOUZAN'
	},
	'OFFLINE': {
		title: '线下',
		value: 'OFFLINE'
	},
	'DD': {
		title: '当当',
		value: 'DD'
	},
	'WX': {
		title: '微信',
		value: 'WX'
	},
	'OMNI': {
		title: '全渠道',
		value: 'OMNI'
	}
};

// 客户平台ID列表
export const CUSTOMER_PLAT_ID_LIST = [
	{title: '全渠道客户ID', field: 'OMNI', type: 'platAccount'},
	{title: '淘宝昵称', field: 'TAOBAO', type: 'platAccount'},
	// {title: '微信昵称', field: 'WX'},
	{title: '京东用户名', field: 'JOS', type: 'platAccount'},
	{title: '线下账号', field: 'OFFLINE', type: 'platAccount'},
	{title: '有赞昵称', field: 'YOUZAN', type: 'platAccount'},
	{title: '苏宁账号', field: 'SUNING', type: 'platAccount'},
	{title: '美丽说账号', field: 'MGJ', type: 'platAccount'},
	{title: '当当账号', field: 'DD', type: 'platAccount'}
];

// 客户性别
export const GENDER_LIST = [
	{
		title: '男',
		value: 'M'
	},
	{
		title: '女',
		value: 'F'
	},
	{
		title: '未知',
		value: 'w'
	}
];

// tab选项
export const TAB_LIST = [
	{key: 'customerLabel', name: '客户标签'},
	{key: 'customerCard', name: '会员卡信息'},
	{key: 'order', name: '订单信息'},
	{key: 'marketing', name: '营销信息'},
	{key: 'interactive', name: '互动信息'},
	{key: 'evaluation', name: '评价信息'},
	{key: 'preferential', name: '权益信息'},
	{key: 'receiveAddress', name: '常用收货信息'}];

// 地址信息 localStorage key
export const UNIFIFCATION_AREA_SELECTOR_DATA = 'UNIFIFCATION_AREA_SELECTOR_DATA';
