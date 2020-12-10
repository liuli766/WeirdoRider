<template>
	<view class="fundment comm">
		<view class="commission-bg">
			<image src="../../../static/img/zjbg.png"></image>
			<view class="commission-box flex flex_al-cen text_cen">
				<view class="font500 colorfff flex flex-col frist">
					<text class="commission font28">当前佣金(元)</text>
					<text class="commission-price">{{user_money==null?0.00:user_money}}</text>
				</view>
				<view class="font500 colorfff flex flex-col two">
					<text class="commission font28">历史佣金(元)</text>
					<text class="commission-price">{{history_money==0?0.00:history_money}}</text>
				</view>
			</view>
		</view>
		<view class="mb30 color333 font500 font30">
			<view class="flex flex_be list-item line" @tap="Gocardinfo">
				<text>银行卡信息</text>
				<text class="iconfont icon-you"></text>
			</view>
			<view class="flex flex_be list-item" @tap="Gobilling">
				<text>账单记录</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		<view class="flex flex_be list-item " @tap="Gocash">
			<text class="color333  font30">我要提现</text>
			<text class="iconfont icon-you"></text>
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
				user_money:'',//当前佣金
				history_money:'',//历史佣金
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
			}),
		},
		onLoad() {
			let that = this
			let params = {
				user_id: that.userId,
			}
			that.request.getdata('getUserBonusInfo', params).then(res => {
				that.user_money=res.user_money
				that.history_money=res.history_money
				console.log(that.history_money, '资金管理')
			})
		},
		methods: {
			Gocash() {
				uni.navigateTo({
					url: `../../Other/cash/cash?user_money=${this.user_money}`
				})
			},
			Gocardinfo() {
				uni.navigateTo({
					url: '../../Other/cardInfo/cardInfo'
				})
			},
			Gobilling() {
				uni.navigateTo({
					url: '../../Other/billingRecords/billingRecords'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fundment {
		.commission-bg {
			margin-bottom: 30upx;

			image {
				width: 100%;
				height: 215upx;
				position: relative;
			}

			.commission-box {
				position: absolute;
				width: 100%;
				top: 0;
				margin: 66upx 0 0 125upx;

				.commission {
					opacity: 0.6;
				}

				.commission-price {
					font-size: 48upx;
					font-family: SF Pro Text;
				}

				.frist {
					padding-right: 94upx;
				}

				.frist:after {
					content: "";
					opacity: 0.6;
					display: block;
					position: absolute;
					width: 1upx;
					height: 60upx;
					background: #fff;
					top: 15upx;
					left: 262upx;
				}

				.two {
					padding-left: 94upx;
				}
			}
		}

		.list-item {
			height: 88upx;
			background: #fff;
			line-height: 88upx;
			padding: 0 30upx;
		}

		.line {
			border-bottom: 1px solid #EEEEEE;
		}
	}
</style>
