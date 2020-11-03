<template>
	<view class="billings comm">
		<view class="flex flex_ar billings-nav mb30">
			<view class="color666 font500 font32 tabnav" v-for="(item,i) in billingNav" :key='i' @tap="handNavSweich(i,$event)"
			 :class="{'nav-active':navIndex===i}">{{item}}</view>
			<view class="line" :style="{left:indicatorLineLeft + 'rpx'}"></view>
		</view>
		<view class="font500" v-if="navIndex===0">
			<view class="billings-list flex_be flex">
				<view class="flex flex-col">
					<text class="color333 font30">订单配送：瑞幸咖啡</text>
					<text class="color999 font24 billing-time">2020-09-18</text>
				</view>
				<view class="billing-price font28"><text>+</text>￥8.00</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计收入：<text class="billing-total-price font36">478.50</text>元
			</view>
		</view>
		<view class="font500" v-if="navIndex===1">
			<view class="billings-list flex_be flex">
				<view class="flex flex-col">
					<text class="color333 font30">提现成功</text>
					<text class="color999 font24 billing-time">2020-09-18</text>
				</view>
				<view class="billing-price font28"><text>-</text>￥8.00</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计提现：<text class="billing-total-price font36">478.50</text>元
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
				billingNav: ['收入明细', '提现明细'],
				navIndex: 0,
				indicatorLineLeft: 162
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
			}),
		},
		onLoad() {
			this.getUserBonus(1)
		},
		methods: {
			handNavSweich(i, e) {
				this.navIndex = i
				var offsetX = e.currentTarget.offsetLeft
				var pageX = e.detail.x
				this.indicatorLineLeft = offsetX + pageX
				this.getUserBonus(i+1)
			},
			getUserBonus(type){
				let that = this
				let params = {
					user_id: this.userId,
					type,
					page:1
				}
				that.request.getdata('getUserBonus', params).then(res => {
					console.log(res, '账单记录')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.billings {
		.nav-active {
			color: #333;
			font-weight: bold;
		}

		.billings-nav {
			background: #FFFFFF;

			.tabnav {
				height: 88upx;
				line-height: 88upx;
				position: relative;
			}

			.line {
				width: 50upx;
				height: 6upx;
				background: #5D82FF;
				border-radius: 3upx;
				position: absolute;
				top: 82upx;
				left: 162upx;
				transition: all .2s;
			}
		}

		.billings-list {
			background: #FFFFFF;
			padding: 30upx;
			border-bottom: 1px solid #eee;
			.billing-price {
				color: #FF6868;
			}

			.billing-time {
				margin-top: 23upx;
			}
		}
		.billings-list:nth-last-of-type(1){
			border: none;
		}
		.billing-total-price{
			color: #FFAC68;
		}
		.billing-bot{
			line-height: 88upx;
			background: #fff;
			padding-right: 30upx;
			text-align: right;
		}
	}
</style>
