/**
 * 客户订单mock数据
 * @author chao
 * @since 2018/11/14
 */

module.exports = {
	'/data-manage-x/1.0/order/detail': {
		'pageNum': 1,
		'pageSize': 10,
		'totals': 100,
		'list': [
			{
				'platCode': 'TAOBAO',
				'shopId': '000001',
				'shopName': '数云食堂',
				'uniOrderId': '000001',
				'orderId': '000001',
				'created': 1531066600000,
				'payTime': 1531066600000,
				'orderStatus': '已完成',
				'orderList': [
					{
						'orderItemId': '12321',
						'productId': '000001',
						'productName': '数据赢家',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999999',
						'skuDetail': '颜色:蓝色;型号:XL',
						'price': 100.00,
						'productNum': 1,
						'isRefund': '1'
					},
					{
						'orderItemId': '12320',
						'productId': '000001',
						'productName': '这是一个测试使用的商品名称-看看超长名称显示是否正常-若是长度太长了需要...和hover组合提示商品名',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999998',
						'skuDetail': '颜色:蓝色;型号:XXL',
						'price': 100.00,
						'productNum': 2,
						'isRefund': '0'
					}
				],
				'tradeDiscountFee': 12.12,
				'payment': 90.10
			},
			{
				'platCode': 'TAOBAO',
				'shopId': '000001',
				'shopName': '数云食堂',
				'uniOrderId': '000001',
				'orderId': '000002',
				// 'created': 1531065600000,
				'created': null,
				// 'payTime': 1531066600000,
				'payTime': null,
				'orderStatus': '已完成',
				'orderList': [
					{
						'orderItemId': '12321',
						'productId': '000001',
						'productName': '楼兰蜜语红枣夹核桃仁270gx2楼兰蜜语红枣夹核桃楼兰蜜语红枣夹核桃仁270gx2楼兰蜜语红枣夹核桃楼兰蜜语红枣夹核桃仁270gx2楼兰蜜语红枣夹核桃',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999999',
						'skuDetail': '颜色:蓝色;型号:XL',
						'price': 100.00,
						'productNum': 1,
						'isRefund': '0'
					},
					{
						'orderItemId': '12320',
						'productId': '000001',
						'productName': '数据赢家',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999998',
						'skuDetail': '颜色:蓝色;型号:XXL',
						'price': 100.00,
						'productNum': 2,
						'isRefund': '0'
					}
				],
				'tradeDiscountFee': 12.12,
				'payment': 90.10
			},
			{
				'platCode': 'OFFLINE',
				'shopId': '000001',
				'shopName': '数云食堂',
				'uniOrderId': '000001',
				'orderId': '000003',
				'created': 1531066600000,
				'payTime': 1531066600000,
				'orderStatus': '已完成',
				'orderList': [
					{
						'orderItemId': '12321',
						'productId': '000001',
						'productName': '数据赢家',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999999',
						'skuDetail': '颜色:蓝色;型号:XL',
						'price': 100.00,
						'productNum': 1,
						'isRefund': '0'
					},
					{
						'orderItemId': '12320',
						'productId': '000001',
						'productName': '数据赢家',
						'picUrl': 'https://www.lovejavascript.com/upload/user/photo/8495_1.jpg',
						'detailUrl': 'https://baidu.com',
						'skuId': '999998',
						'skuDetail': '颜色:蓝色;型号:XXL',
						'price': 100.00,
						'productNum': 2,
						'isRefund': '1'
					}
				],
				'tradeDiscountFee': 12.12,
				'payment': 90.10
			}
		]
	}
};
