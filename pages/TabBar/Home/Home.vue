<template>
	<view class="home comm">
		<scroll-view id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view class="flex flex_al-cen flex_ar" style="padding-top: 30upx;padding-bottom: 22upx;">
				<view class="uni-tab-item" v-for="(tab,index) in homenavList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
				 :data-id="index" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</view>
		</scroll-view>
		<swiper class="tab-box" ref="swiper1" :current="tabIndex" :duration="300" @change="onswiperchange" style="margin-top: 88rpx;"
		 @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(page, index) in homenavList" :key="index">
				<scroll-view scroll-y>
					<block>
						<view class="component">
							<!-- 待抢单 -->
							<view class="page-item">
								<distribution class="pageitem" v-for="(list,i) in 3" :key="i" v-if='tabIndex===0' @tap="GodistribuDetail"></distribution>
							</view>
							<!-- 已完成 -->
							<view class="page-item">
								<ordercomplted class="pageitem" v-if='tabIndex===3' @tap="GoOrderComDetail">
									<text class="color3434 bold font32" slot='tit'>订单已完成</text>
									<text class="color333 font26 font500" slot='concat' @tap.stop="Concat">联系商家</text>
									<view class="color999 font500 font24 text_cen">距离：1.8km</view>
									<view class="flex text_cen" slot='btn'>
										<view class="sjbtn font500" @tap.stop="Concat">联系商家</view>
										<view class="gkbtn colorfff font500">联系顾客</view>
									</view>
								</ordercomplted>
							</view>
							<!-- 待取货 -->
							<view class="page-item">
								<ordercomplted class="pageitem" v-if='tabIndex===1' @tap="GoPickupDetail">
									<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
									<text class="color333 font26 font500" slot='concat'>距离：1.8km</text>
									<view class="flex text_cen" slot='btn'>
										<view class="sjbtn font500" @tap.stop="Concat">联系商家</view>
										<view class="gkbtn colorfff font500">联系顾客</view>
									</view>
								</ordercomplted>
							</view>
							<!-- 配送中 -->
							<view class="page-item">
								<ordercomplted class="pageitem" v-if='tabIndex===2' @tap="GoPickupDetail">
									<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
									<text class="color333 font26 font500" slot='concat'>距离：1.8km</text>
									<view class="flex text_cen" slot='btn'>
										<view class="sjbtn font500" @tap.stop="Concat">联系商家</view>
										<view class="gkbtn colorfff font500">联系顾客</view>
									</view>
								</ordercomplted>
							</view>
						</view>

					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		<Pop v-if="isPop">
			<view class="color3434 bold font36 successtxt" slot="successtxt">抢单成功</view>
			<view class="color9a9a font500 font26" slot="subtet">请前往商家取货配送</view>
			<view class="btnpop font500 font32 text_cen colorfff" slot='btnpop'>前往取货</view>
		</Pop>
		<concatpop v-if="isConcatPop" />
	</view>
</template>

<script>
	import distribution from '@/components/Distribution/Distribution.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import ordercomplted from '@/components/OrderCompleted/OrderCompleted.vue'
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			distribution,
			Pop,
			ordercomplted,
			concatpop
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop
			}),
		},
		data() {
			return {
				homenavList: [{
						id: "tab01",
						name: '待抢单',
						newsid: 0
					},
					{
						id: "tab02",
						name: '待取货',
						newsid: 1
					},
					{
						id: "tab03",
						name: '配送中',
						newsid: 2
					},
					{
						id: "tab04",
						name: '已完成',
						newsid: 3
					},
				],
				tabIndex: 0,
				scrollInto: '',
				indicatorLineLeft: 64,
				isTap: false,
			}
		},
		methods: {
			ontabtap(e) {
				let index = e.currentTarget.dataset.id;
				this.tabIndex = index
				const query = uni.createSelectorQuery().in(this);
				query.select('.uni-tab-item-title-active').boundingClientRect(data => {
					console.log(data);
					var offsetX = data.left
					var offsetXEl = data.right
					var lineL = (2 * (offsetXEl) - (1.5 * (offsetXEl - offsetX)))
					// this.updateIndicator(lineL);
				}).exec();
			},
			onswiperchange(e) {
				let index = e.detail.current;
				this.tabIndex = index
				this.scrollInto = this.homenavList[index].id
			},
			animationfinish(e) {
				let index = e.detail.current;
				this.tabIndex = index
			},
			GoOrderComDetail() {
				uni.navigateTo({
					url: `../../Detail/OrdercompDetail/OrdercompDetail`
				});
			},
			GoPickupDetail() {
				uni.navigateTo({
					url: '../../Detail/PickupDetail/PickupDetail'
				})
			},
			GodistribuDetail() {
				uni.navigateTo({
					url: '../../Detail/distribuDetail/distribuDetail'
				})
			},
			Concat() {
				this.$store.commit("showConcatPop", true);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		width: 750upx;
		white-space: nowrap;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 999;

		.uni-tab-item {
			font: 500 28upx/1 'PingFang SC';
			color: #666;
		}

		.uni-tab-item-title-active {
			font: bold 32upx/1 'PingFang SC';
			color: #343434;
			padding-bottom: 28upx;
			transition: all .3s;
			position: relative;
		}

		.uni-tab-item-title-active:after {
			content: "";
			position: absolute;
			left: 18upx;
			bottom: 8upx;
			width: 50upx;
			border-radius: 3px;
			padding: 6upx;
			background: #5E82FF;
		}

		.scroll-view-indicator {
			position: relative;
			height: 6upx;
			background-color: transparent;
			margin-top: 28upx;
		}

		.scroll-view-underline {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 50upx;
			background-color: #5E82FF;
		}

		.scroll-view-animation {
			transition-duration: 0.2s;
			transition-property: left;
		}
	}

	.tab-bar ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/deep/ wx-swiper .wx-swiper-wrapper {
		overflow: visible;
	}

	/deep/ .swiper-item {
		overflow: visible !important;
	}

	/deep/ wx-swiper {
		height: auto;
	}

	.page-item {
		margin: 30upx;
	}

	.pageitem {
		margin-bottom: 30upx;
	}

	.component {
		margin-bottom: 200upx;
	}

	.sjbtn {
		width: 220upx;
		height: 80upx;
		border: 1upx solid #EEEEEE;
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		color: #666;
		font-size: 32upx;
		line-height: 80upx;
		margin-right: 30upx;
	}

	.gkbtn {
		width: 380upx;
		height: 80upx;
		background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		line-height: 80upx;
	}

	.successtxt {
		margin: 42upx 0 20upx 0;
	}

	.btnpop {
		width: 500upx;
		height: 80upx;
		background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
		box-shadow: 1upx 5upx 20upx 0px rgba(209, 109, 78, 0.2);
		border-radius: 10upx;
		line-height: 80upx;
		margin: 0 auto;
		margin-top: 60upx;
	}
</style>
