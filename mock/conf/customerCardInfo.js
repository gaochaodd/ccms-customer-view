/**
 * 会员卡信息mock数据
 * customerCardInfo.js
 * @author wangbo
 * @since 2018/11/10
 */

module.exports = {
	'/data-manage-x/1.0/customerCard/card/:uniId': [
		{
			cardNumber: '456756747567583',
			cardName: '至尊黑金卡',
			grade: '7',
			gradeName: '黑卡会员',
			cardPlanId: 1,
			availablePoint: 45645,
			gradePeriod: '2013-12-12 15:54:20',
			totalPoint: 35,
			upcomingExpiredPoint: 56768,
			consumedPoint: 23,
			expiredPoint: 43,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '4569834769457698',
			cardName: '超级黄金卡',
			grade: '6',
			cardPlanId: 2,
			gradeName: 'ccc',
			availablePoint: 45645,
			gradePeriod: '2013-12-12 15:54:20',
			totalPoint: 35,
			upcomingExpiredPoint: 56768,
			consumedPoint: 23,
			expiredPoint: 43,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '364362564624564',
			cardName: '炫酷白金卡',
			grade: '5',
			cardPlanId: 3,
			gradeName: '白金会员',
			availablePoint: 5464654,
			gradePeriod: '2017-09-27 15:54:20',
			totalPoint: 353,
			upcomingExpiredPoint: 6556,
			consumedPoint: 76,
			expiredPoint: 12341,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '657465756756',
			cardName: '低端橙光卡',
			grade: '2',
			cardPlanId: 4,
			gradeName: '橙色会员',
			availablePoint: 2232,
			gradePeriod: '2012-08-27 05:54:20',
			totalPoint: 345,
			upcomingExpiredPoint: 34534,
			consumedPoint: 675,
			expiredPoint: 123,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '46767565745334',
			cardName: '亮眼红宝卡',
			grade: '3',
			cardPlanId: 5,
			gradeName: '红色会员',
			availablePoint: 23423,
			gradePeriod: '2018-11-27 15:54:20',
			totalPoint: 2342,
			upcomingExpiredPoint: 6556,
			consumedPoint: 45,
			expiredPoint: 24125,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '435234324',
			cardName: '深沉棕摩卡',
			grade: '4',
			cardPlanId: 6,
			gradeName: '棕色会员',
			availablePoint: 768567,
			gradePeriod: '2018-02-12 15:54:20',
			totalPoint: 457,
			upcomingExpiredPoint: 324,
			consumedPoint: 879,
			expiredPoint: 678,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '435234324',
			cardName: '湛蓝精致卡',
			grade: '1',
			cardPlanId: 7,
			gradeName: '蓝色会员',
			availablePoint: 768567,
			gradePeriod: '2018-02-12 15:54:20',
			totalPoint: 457,
			upcomingExpiredPoint: 324,
			consumedPoint: 879,
			expiredPoint: 678,
			uniId: 'uniId_0'
		},
		{
			cardNumber: '435234324',
			cardName: '至尊黑金卡',
			grade: '7',
			cardPlanId: 8,
			gradeName: '黑金会员',
			availablePoint: 768567,
			gradePeriod: '2018-02-12 15:54:20',
			totalPoint: 457,
			upcomingExpiredPoint: 324,
			consumedPoint: 879,
			expiredPoint: 678,
			uniId: 'uniId_0'
		}
	],

	'/data-manage-x/1.0/customerCard/pointChangeRecord/:uniId': {
		pageNum: 1,
		pageSize: 15,
		totals: 100,
		list: [
			{
				changeTime: '2018-11-11',
				changeValue: '积分变化',
				actionType: 1,
				source: '变更来源',
				uniId: '23143'
			},
			{
				changeTime: '2018-11-11',
				changeValue: '积分变化',
				actionType: 1,
				source: '变更来源',
				uniId: '23143'
			},
			{
				changeTime: '2018-11-11',
				changeValue: '积分变化',
				actionType: 1,
				source: '变更来源',
				uniId: '23143'
			},
			{
				changeTime: '2018-11-11',
				changeValue: '积分变化',
				actionType: 1,
				source: '变更来源',
				uniId: '23143'
			}
		]
	},

	'/data-manage-x/1.0/customerCard/gradeChangeRecord/:uniId': {
		pageNum: 1,
		pageSize: 15,
		totals: 200,
		list: [
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '1',
				gradeNameBeforeChange: '更改前等级1',
				gradeAfterChange: '3',
				gradeNameAfterChange: '更改后等级3',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			},
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '4',
				gradeNameBeforeChange: '更改前等级4',
				gradeAfterChange: '5',
				gradeNameAfterChange: '更改后等级5',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			},
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '2',
				gradeNameBeforeChange: '更改前等级2',
				gradeAfterChange: '5',
				gradeNameAfterChange: '更改后等级5',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			},
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '7',
				gradeNameBeforeChange: '更改前等级7',
				gradeAfterChange: '3',
				gradeNameAfterChange: '更改后等级3',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			},
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '5',
				gradeNameBeforeChange: '更改前等级5',
				gradeAfterChange: '2',
				gradeNameAfterChange: '更改后等级2',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			},
			{
				changeTime: '2018-11-11',
				gradeBeforeChange: '4',
				gradeNameBeforeChange: '更改前等级4',
				gradeAfterChange: '7',
				gradeNameAfterChange: '更改后等级7',
				changeType: '更改类型',
				changeSource: '更改来源',
				gradePeriod: '2018-11-11',
				memberId: '2345354'
			}
		]
	}
};
