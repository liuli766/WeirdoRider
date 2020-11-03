<template>
	<view class="datastatic comm">
		<image src="../../../static/img/bg.png" mode="" class="bg"></image>
		<view class="bannerbg">
			<view class="colorfff font500 font28 titnav">
				<text v-for="(item,i) in titnav" :key="i" :class="{'data-title-active':i===navnum}" @tap="handNav(i)">{{item}}</text>
			</view>
			<view v-show="navnum===0">
				<view class="order-whrite-box text_cen">
					<view class="bold order-price">{{Talent.one}}</view>
					<view class="color9a9a font24 font500 order-single">累计单量(单)</view>
					<view class="flex">
						<view class="flex-col order-single-list">
							<text class="font36 bold order-single-price">{{Talent.two}}</text>
							<text class="color9a9a font24 font500">累计收入(元)</text>
						</view>
						<view class="flex-col order-single-list1">
							<text class="font36 bold order-single-price">{{Talent.three}}</text>
							<text class="color9a9a font24 font500">派送达人榜</text>
						</view>
					</view>
				</view>
				<view class="talent-list-box">
					<view class="talent-list font36 text_cen">
						派送达人榜
					</view>
					<view class="talent-list-item flex flex_be flex_al-cen" v-for="(item,i) in dataList" :key="i" v-if="dataList.length!==0">
						<view class="font500 color3434 font30 flex flex_al-cen">
							<image src="../../../static/img/num1.png" class="num" v-if="item.status===1"></image>
							<image src="../../../static/img/num2.png" class="num" v-if="item.status===2"></image>
							<image src="../../../static/img/num3.png" class="num" v-if="item.status===3"></image>
							<image :src="item.head" class="head"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="bold talent-list-price font28">
							{{item.numberval}}
						</view>
					</view>
					<view class="talent-list-item flex flex_jus-cen flex_al-cen text_cen font26 color666" v-if="dataList.length==0">-没有更多数据拉-</view>
				</view>
			</view>
			<view v-show="navnum===1">
				<view class="order-whrite-box text_cen">
					<view class="bold order-price">{{Talent.one}}</view>
					<view class="color9a9a font24 font500 order-single">正常送达(单)</view>
					<view class="flex">
						<view class="flex-col order-single-list">
							<text class="font36 bold order-single-price">{{Talent.two}}</text>
							<text class="color9a9a font24 font500">延时订单(单)</text>
						</view>
						<view class="flex-col order-single-list1">
							<text class="font36 bold order-single-price">{{Talent.three}}</text>
							<text class="color9a9a font24 font500">平均送达时间(分)</text>
						</view>
					</view>
				</view>
				<view class="talent-list-box">
					<view class="talent-list font36 text_cen">
						派送达人榜
					</view>
					<view class="talent-list-item flex flex_be flex_al-cen" v-for="(item,i) in dataList" :key="i" v-if="dataList.length!==0">
						<view class="font500 color3434 font30 flex flex_al-cen">
							<image src="../../../static/img/num1.png" class="num" v-if="item.status===1"></image>
							<image src="../../../static/img/num2.png" class="num" v-if="item.status===2"></image>
							<image src="../../../static/img/num3.png" class="num" v-if="item.status===3"></image>
							<image :src="item.head" class="head"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="bold talent-list-price font28">
							{{item.numberval}}
						</view>
					</view>
					<view class="talent-list-item flex flex_jus-cen flex_al-cen text_cen font26 color666" v-if="dataList.length==0">-没有更多数据拉-</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				titnav: ['订单统计', '收入统计'],
				navnum: 0,
				Talent: [],
				dataList:[],//达人榜列表
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
			}),
		},
		created() {
			this.getOrderCounts(1)
		},
		methods: {
			handNav(i) {
				this.navnum = i
				this.getOrderCounts(i+1)
			},
			getOrderCounts(type) {
				let that = this
				let params = {
					user_id: this.userId,
					type,
				}
				that.request.getdata('getOrderCounts', params).then(res => {
					this.Talent = res.data
					this.dataList=res.data.dataList
					console.log(res, '数据统计')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.datastatic {
		.bannerbg {
			width: 100%;
			height: 350upx;
			padding: 60upx 30upx 0 30upx;
			box-sizing: border-box;
		}

		.bg {
			width: 100%;
			height: 350upx;
		}

		.titnav {
			position: absolute;
			top: 62rpx;
			opacity: 0.8;
			margin-bottom: 62upx;

			text {
				margin-right: 42upx;
				position: relative;
			}
		}

		.data-title-active {
			font-size: 32upx;
			font-weight: bold;
		}

		.data-title-active:after {
			content: "";
			position: absolute;
			left: 38upx;
			top: 50upx;
			width: 50upx;
			border-radius: 3px;
			padding: 6upx;
			background: #FFAC68;
		}

		.order-whrite-box {
			position: absolute;
			background: #fff;
			padding: 60upx 0;
			box-sizing: border-box;
			border-radius: 10upx;
			margin-bottom: 30upx;
			top: 153rpx;
			left: 30rpx;
			width: 690rpx;

			.order-price {
				font-size: 50upx;
				color: #5E82FF;
				line-height: 1;
			}

			.order-single {
				margin: 20upx 0 50upx 0;
				line-height: 1;
			}

			.order-single-list {
				padding-right: 100upx;
				border-right: 1px solid #EEEEEE;
				margin-left: 98upx;

				text {
					line-height: 1;
				}
			}

			.order-single-list1 {
				margin: 0 80upx 0 80upx;

				text {
					line-height: 1;
				}
			}

			.order-single-price {
				color: #5E82FF;
				margin-bottom: 20upx;
			}
		}

		.talent-list-box {
			padding: 0 30upx 30upx 30upx;
			background: #fff;
			border-radius: 10upx;
			margin-top: 121rpx;

			.talent-list {
				width: 300upx;
				height: 63upx;
				background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
				box-shadow: 0px 0px 16upx 0px rgba(0, 0, 0, 0.06);
				border-radius: 0 0 88upx 88upx;
				color: #FEFEFE;
				font-weight: 800;
				line-height: 63upx;
				margin: 0 auto;
				padding: 15upx 60upx;
				margin-bottom: 62upx;
			}

			.talent-list-price {
				color: #FFAC68;
				font-family: Arial;
			}

			.talent-list-item {
				position: relative;
				padding: 28upx 0;

				.num {
					width: 48upx;
					height: 48upx;
				}

				.head {
					width: 64upx;
					height: 64upx;
					margin: 0 16upx 0 20upx;
				}
			}

			.talent-list-item:after {
				content: "";
				position: absolute;
				left: 68upx;
				top: 120upx;
				width: 562upx;
				padding: 1upx;
				background: #eee;
			}

			.talent-list-item:nth-last-of-type(1):after {
				content: "";
				padding: 0upx;
			}
		}

	}
</style>
