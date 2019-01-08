/**
 * 客户订单mock数据
 * @author chao
 * @since 2018/11/14
 */

module.exports = {
	'/data-manage-x/1.0/order/detail': {
		"list": [{
			"created": "2018-12-14 12:14:35",
			"orderId": "61010410002000",
			"orderList": [{
				"detailUrl": "http://www.baidu.com",
				"isRefund": "1",
				"orderItemId": "61010410002001",
				"picUrl": "https://img.alicdn.com/imgextra/i1/3892117632/O1CN01To7kWB26FVG7FhulI_!!0-item_pic.jpg_430x430q90.jpg",
				"price": "50.00",
				"productId": "10001",
				"productName": "我本将心向明月，奈何明月照沟渠",
				"productNum": "2",
				"skuDetail": "红色,M码",
				"skuId": "90001",
				"uniOrderItemId": "TAOBAO|61010410002001"
			}, {
				"detailUrl": "http://www.taobao.com",
				"isRefund": "0",
				"orderItemId": "61010410002002",
				"picUrl": "https://gd3.alicdn.com/imgextra/i3/2864501364/TB2jcAFXmBYBeNjy0FeXXbnmFXa_!!2864501364.jpg",
				"price": "30.00",
				"productId": "10002",
				"productName": "床前明月光，疑似地上霜，举头望明月，低头思故乡，四句写完了，还是有点短，胡乱补充下，测试悬浮窗",
				"productNum": "1",
				"skuDetail": "蓝色,L码",
				"skuId": "90002",
				"uniOrderItemId": "TAOBAO|61010410002002"
			}],
			"orderStatus": "买家已签收 ",
			"payTime": "2018-10-30 12:22:42",
			"payment": "99.00",
			"platCode": "TAOBAO",
			"postFee": "11.00",
			"shopName": "数云食堂",
			"tradeDiscountFee": "44.00",
			"uniOrderId": "TAOBAO|61010410002000",
			"uniShopId": "TAOBAO|106878997"
		}, {
			"created": null,
			"orderId": "61010410003000",
			"orderList": [{
				"detailUrl": "http://www.taobao.com",
				"isRefund": "1",
				"orderItemId": "61010410003001",
				"picUrl": "https://gd3.alicdn.com/imgextra/i3/2864501364/TB2jcAFXmBYBeNjy0FeXXbnmFXa_!!2864501364.jpg",
				"price": "60.00",
				"productId": "10002",
				"productName": "床前明月光，疑似地上霜，举头望明月，低头思故乡，四句写完了，还是有点短，胡乱补充下，测试悬浮窗",
				"productNum": "2",
				"skuDetail": "蓝色,L码",
				"skuId": "90002",
				"uniOrderItemId": "TAOBAO|61010410003001"
			}],
			"orderStatus": "交易成功 ",
			"payTime": null,
			"payment": "66.00",
			"platCode": "TAOBAO",
			"postFee": "0.00",
			"shopName": "数云食堂",
			"tradeDiscountFee": "33.00",
			"uniOrderId": "TAOBAO|61010410003000",
			"uniShopId": "TAOBAO|106878997"
		}], "pageNum": 1, "pageSize": 10, "totalPages": null, "totals": 2
	}
};
