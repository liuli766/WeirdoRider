<template>
	<view class="billings comm">
		<view class="flex flex_ar billings-nav mb30">
			<view class="color666 font500 font32 tabnav" v-for="(item,i) in billingNav" :key='i' @tap="handNavSweich(i,$event)"
			 :class="{'nav-active':navIndex===i}">{{item}}</view>
			<view class="line" :style="{left:indicatorLineLeft + 'rpx'}"></view>
		</view>
		<view class="font500" v-if="navIndex===0">
			<view v-for="(item,i) in UserBonus" :key='i'>
				<view class="billings-list flex_be flex">
					<view class="flex flex-col">
						<text class="color333 font26">{{item.matter}}</text>
						<text class="color999 font24 billing-time">{{item.add_time}}</text>
					</view>
					<view class="billing-price font28"><text>+</text>￥{{item.money}}</view>
				</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计收入：<text class="billing-total-price font36">{{total}}</text>元
			</view>
		</view>
		<view class="font500" v-if="navIndex===1">
			<view v-for="(item,i) in UserBonus" :key='i'>
				<view class="billings-list flex_be flex">
					<view class="flex flex-col">
						<text class="color333 font26">{{item.matter}}</text>
						<text class="color999 font24 billing-time">{{item.add_time}}</text>
					</view>
					<view class="billing-price font28"><text>-</text>￥{{item.money}}</view>
				</view>

			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计提现：<text class="billing-total-price font36">{{total}}</text>元
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import UniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			UniLoadMore
		},
		data() {
			return {
				billingNav: ['收入明细', '提现明细'],
				navIndex: 0,
				indicatorLineLeft: 162,
				UserBonus: [], //账单记录
				loadingType: 2,
				pages: 1,
				total: ''
			}

		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
			}),

		},
		onLoad() {
			this.pages = 1;
			this.UserBonus = []
			this.getUserBonus()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pages = 1;
			this.UserBonus = []
			this.getUserBonus()
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getUserBonus()
		},
		methods: {
			handNavSweich(i, e) {
				this.navIndex = i
				var offsetX = e.currentTarget.offsetLeft
				var pageX = e.detail.x
				this.indicatorLineLeft = offsetX + pageX
				this.pages = 1;
				this.UserBonus = []
				this.getUserBonus()
			},
			getUserBonus() {
				let that = this
				let params = {
					user_id: that.userId,
					type: that.navIndex+1,
					page: that.pages
				}
				that.request.getdata('getUserBonus', params).then(res => {
					uni.stopPullDownRefresh();
					console.log(res, '账单记录')
					// this.UserBonus = res.data
					that.total = res.total
					if (that.UserBonus.length < 1) {
						that.UserBonus = res.data
					} else {
						res.data.map((news) => {
							that.UserBonus.push(news);
						});
					}
					console.log(res.num,that.UserBonus.length)
					if (that.UserBonus.length == res.num) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
				})
			},
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

		.billings-list:nth-last-of-type(1) {
			border: none;
		}

		.billing-total-price {
			color: #FFAC68;
		}

		.billing-bot {
			line-height: 88upx;
			background: #fff;
			padding-right: 30upx;
			text-align: right;
		}
	}

	.loading-text {
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
