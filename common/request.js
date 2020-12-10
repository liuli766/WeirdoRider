export default {
	base: 'http://freak.jisapp.cn/index.php/api',
	interface: {
		getRegister: '/Rider/register', //骑手注册
		getLogin: '/Rider/login', //骑手登录
		getOrderList: '/Rider/orderCenter', //骑手首页-订单列表
		getOrderGrabbing:'/Rider/orderGrabbing',//快速接单，抢单
		getOrderInfo:'/Rider/orderInfo', //订单详情
		getCancel:'/Rider/cancel',// 取消订单
		getCancelList:'/Rider/cancelList',//手取消订单-理由列表
		getOrderCounts:'/Rider/orderCounts',//	数据统计
		getUserCash:'/Rider/userCash',//提现申请
		getUserBonusInfo:'/Rider/userBonusInfo',//资金管理，
		getBanKList:'/Rider/banKList',//开户行列表
		getUserSave:'/Rider/userSave',//修改资料
		getUserReal:'/Rider/userReal',//实名认证
		getSettingWork:'/Rider/settingWork',//工作设置
		getSchoolList:'/Rider/schoolList',//区域列表
		getSendCode:'/Rider/sendCode',//发送短信
		getBindBank:'/Rider/bindBank',//绑定银行卡
		getUserBonus:'/Rider/userBonus',//资金收入/提现记录
		getFindBank:'/Rider/findBank',//打开提现检测（银行卡）
		getUserInfo:'/Rider/userInfo',//骑手中心
		getorderPickup:'/Rider/orderPickup',//骑手确认取货
		getorderOk:'/Rider/orderOk',//骑手确认送达
		getarrSchool:'/Index/arrSchool',//获取学校列表
		getxieyi:"/Users/xieyi",//用户协议
	},
	getdata: function(url, data, method) {
		let vm = this;
		uni.showLoading({
			title: "加载中..."
		})
		if (this.interface[url]) {
			let u = vm.base + this.interface[url];
			let header = {
				"X-Requested-With": "XMLHttpRequest" //则为 Ajax 异步请求。
			}
			return new Promise(function(resolve, reject) {
				uni.request({
					url: u,
					data: data,
					header: header,
					method: method ? method : 'POST',
					success: (res) => {
						if (res.data.code == 200) {
							console.log(res.data.code)
							resolve(res.data);
						}
						if (res.data.code == 300) {
							console.log(res.data.code)
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 3000
							});
							resolve(res.data);
						}
						if (res.data.code == 401) {
							uni.showToast({
								title: '请先登录',
								icon: 'none',
								duration: 3000
							});
						}
						if (res.data.code == 400 || res.data.code == 404) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 3000
							});
						}
					},
					fail: (error) => {
						reject(error);
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			})
		} else {
			return new Promise(function(resolve, reject) {
				reject('接口错误');
			})
		}
	},
}
