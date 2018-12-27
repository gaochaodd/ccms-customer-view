/**
 * 权益信息mock数据
 * preferentialInfo.js
 * @author wangbo
 * @since 2018/11/13
 */

module.exports = {
	'/data-manage-x/1.0/preferential/detail': {
		pageNum: 1,
		pageSize: 10,
		totals: 65,
		benefitCount: 0,
		list: [
			{
				sendTime: '2018-01-30 00:11:11',
				preferentialType: '权益类型',
				preferentialName: '权益名称',
				preferentialContent: '短信：短信内容',
				sendType: '发放场景',
				shopName: '店铺名称',
				platCode: 'TAOBAO',
				isVerification: '是否核销'
			},
			{
				sendTime: '2018-01-30 00:11:11',
				preferentialType: '权益类型',
				preferentialName: '权益名称',
				preferentialContent: '短信：短信内容',
				sendType: '发放场景',
				shopName: '店铺名称',
				platCode: 'JOS',
				isVerification: '是否核销'
			},
			{
				sendTime: '2018-01-30 00:11:11',
				preferentialType: '权益类型',
				preferentialName: '权益名称',
				preferentialContent: '短信：短信内容',
				sendType: '发放场景',
				shopName: '店铺名称',
				platCode: 'YOUZAN',
				isVerification: '是否核销'
			}],
		// lastBenefitTime: '2018-11-11 10:20:11'
		lastBenefitTime: null
	}
};
