/**
 * 客户视图mock数据
 * @author chao
 * @since 2018/11/8
 */
module.exports = function (configurations) {
	configurations.add([
		{
			request: {
				method: 'GET',
				urlPattern: /^\/data-manage-x\/1.0\/customer\/((?!interactive|shops|decrypt|uniId\/receiver\/address)\w)+/
			},
			response: {
				status: 200,
				body: function () {
					return {

						'uniId': '00001',
						'platAccountList': [
							{
								'platCode': 'TAOBAO',
								'platAccount': '000001',
								'platNick': '数云掌门',
								'platAvatar': null
							},
							{
								'platCode': 'OMNI',
								'platAccount': '000001',
								'platNick': '数云掌门'
							},
							{
								'platCode': 'OFFLINE',
								'platAccount': '000001',
								'platNick': '数云掌门'
							}
						],
						'fullName': '测*',
						'fullNameSource': 'commonleUsed',
						'gender': 'm',
						'genderSource': 'register',
						'birthday': 19491001,
						'birthdaySource	': 'defined',
						'mobile': '150****0000',
						'mobileSource': 'defined',
						'mobileEffectiveness': 1,
						'mobileMarkting': 1,
						'email': 'g**m',
						'emailSource': 'defined',
						'emailEffectiveness': 1,
						'emailMarkting': 1,
						'country': '中国',
						'state': '14',
						'boughtShopName': '康龙鞋旗舰店,奥康品牌直营店,康龙鞋旗舰店,奥康品牌直营店,康龙鞋旗舰店,奥康品牌直营店,康龙鞋旗舰店,奥康品牌直营店,康龙鞋旗舰店,奥康品牌直营店',
						'firstPurchaseShopName': '奥康品牌直营店',
						'lastPurchaseShopName': '康龙鞋旗舰店',
						'city': '140700000000',
						'district': '140725000000',
						'town': '140725202000',
						'stateName': '山西省',
						'cityName': '晋中市',
						'districtName': '寿阳县',
						'townName': '温家庄乡',
						'address': '人保大厦18层',
						'addressSource': 'defined',
						'totalPurchaseAmount': '1111128.12',
						'boughtPlatform': 'TAOBAO,JOS,SUNING,TAOBAO,JOS,SUNING,TAOBAO,JOS,SUNING,TAOBAO,JOS,SUNING,TAOBAO,JOS,SUNING,TAOBAO,JOS,SUNING',
						'boughtShop': '数云食堂,黑色的琴键',
						'totalPurchaseTimes': '100',
						'averageCustomerPrice': '1000.34',
						'firstPurchaseTime': '20121111',
						'firstPurchasePlatform': 'TAOBAO',
						'firstPurchaseShop': '数云食堂',
						'lastPurchasePlatform': 'TAOBAO',
						'lastPurchaseShop': '黑色的琴键'
					};
				}
			}
		},
		{
			request: {
				method: 'PUT',
				urlPattern: '/data-manage-x/1.0/customer/:uniId'
			},
			response: {
				status: 200,
				body: function () {
					return {
						data: '20121212'
					};
				}
			}
		},
		{
			request: {
				method: 'GET',
				urlPattern: '/data-manage-x/1.0/customer/decrypt/:uniId/:field'
			},
			response: {
				status: 200,
				body: function () {
					return {
						data: '测试账号'
					};
				}
			}
		}]
	);
};
