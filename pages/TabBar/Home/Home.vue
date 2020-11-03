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
							<view class="page-item" v-if='tabIndex===0'>
								<view v-if="orderList.length!==0">
									<distribution class="pageitem" v-for="(item,v) in orderList" :key='v' :orderList='item' @tap="GodistribuDetail(item)">
										<view class="btn1 colorfff font500 font32 text_cen" @tap.stop="GunList(item.supplier_lat,item.supplier_lon,item.supplier_address)" slot='qiangdan'>抢单</view>
									</distribution>
								</view>
								<view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view>
							</view>
							<!-- 已完成 -->
							<view class="page-item" v-if='tabIndex===3'>
								<view v-if="orderList.length!==0">
									<ordercomplted class="pageitem" @tap="GoOrderComDetail(item)" v-for="(item,v) in orderList" :key='v' :orderList='item'>
										<text class="color3434 bold font32" slot='tit'>订单已完成</text>
										<text class="color333 font26 font500" slot='concat' @tap.stop="Concat">联系商家</text>
										<view class="color999 font500 font24 text_cen">距离：{{item.distance}}km</view>
										<view class="flex text_cen" slot='btn'>
											<view class="sjbtn font500"  @tap.stop="Concat(item.supplier_mobile)">联系商家</view>
											<view class="gkbtn colorfff font500" @tap.stop="Concat(item.user_mobile)">联系顾客</view>
										</view>
									</ordercomplted>
								</view>
								<view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view>
							</view>
							<!-- 待取货 -->
							<view class="page-item" v-if='tabIndex===1'>
								<view v-if="orderList.length!==0">
									<ordercomplted class="pageitem" @tap="GoPickupDetail(item)" v-for="(item,v) in orderList" :key='v' :orderList='item'>
										<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
										<text class="color333 font26 font500" slot='concat'>距离：{{item.distance}}km</text>
										<view class="flex text_cen" slot='btn'>
											<view class="sjbtn font500" @tap.stop="Concat(item.supplier_mobile)">联系商家</view>
											<view class="gkbtn colorfff font500" @tap.stop="Concat(item.user_mobile)">联系顾客</view>
										</view>
									</ordercomplted>
								</view>
								<view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view>
							</view>
							<!-- 配送中 -->
							<view class="page-item" v-if='tabIndex===2'>
								<view v-if="orderList.length!==0">
									<ordercomplted class="pageitem" v-if='tabIndex===2' @tap="GogiveDetail(item)" v-for="(item,v) in orderList" :key='v'
									 :orderList='item'>
										<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
										<text class="color333 font26 font500" slot='concat'>距离：{{item.distance}}km</text>
										<view class="flex text_cen" slot='btn'>
											<view class="sjbtn font500" @tap.stop="Concat(item.supplier_mobile)">联系商家</view>
											<view class="gkbtn colorfff font500" @tap.stop="Concat(item.user_mobile)">联系顾客</view>
										</view>
									</ordercomplted>
								</view>
								<view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view>
							</view>
						</view>

					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		<Pop v-if="isPop">
			<view class="color3434 bold font36 successtxt" slot='successtxt'>抢单成功</view>
			<view class="color9a9a font500 font26" slot='subtet'>请前往商家取货配送</view>
			<view class="btnpop font500 font32 text_cen colorfff"
			slot='btnpop' @tap="ChildPickup(order)">前往取货</view>
		</Pop>
		<concatpop v-if="isConcatPop"  />
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
				isConcatPop: (state) => state.isConcatPop,
				userId: (state) => state.userId,
				tel: (state) => state.tel,
				order: (state) => state.order,
				
			}),
		},
		created() {
			this.getOrderCenter(1)
			console.log(this.userId)
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
				orderList: '' //订单列表
			}
		},
		methods: {
			getOrderCenter(type) { //获取订单列表
				let that = this
				let params = {
					user_id:this.userId,
					type,
					page: 1,
				}
				that.request.getdata('getOrderList', params).then(res => {
					this.orderList = res.data.orderList
					console.log(res, '订单列表')
				})
			},
			ontabtap(e) {
				let index = e.currentTarget.dataset.id;
				this.tabIndex = index
				const query = uni.createSelectorQuery().in(this);
				query.select('.uni-tab-item-title-active').boundingClientRect(data => {
					console.log(data);
					var offsetX = data.left
					var offsetXEl = data.right
					var lineL = (2 * (offsetXEl) - (1.5 * (offsetXEl - offsetX)))
				}).exec();
				this.getOrderCenter(index + 1)
			},
			onswiperchange(e) {
				let index = e.detail.current;
				this.tabIndex = index
				this.scrollInto = this.homenavList[index].id
				this.getOrderCenter(index + 1)
			},
			animationfinish(e) {
				let index = e.detail.current;
				this.tabIndex = index
			},
			GoOrderComDetail(item) {
				uni.navigateTo({
					url: `../../Detail/OrdercompDetail/OrdercompDetail?id=${item.id}`
				});
			},
			GoPickupDetail(item) {//取货详情
				uni.navigateTo({
					url: `../../Detail/PickupDetail/PickupDetail?id=${item.id}`
				})
			},
			GodistribuDetail(item) { //抢单详情
				uni.navigateTo({
					url: `../../Detail/distribuDetail/distribuDetail?id=${item.id}`
				})
			},
			GogiveDetail(item){
				uni.navigateTo({
					url: `../../Detail/giveDetail/giveDetail?id=${item.id}`
				})
			},
			Concat(phone) { //一键拨号
				console.log(phone)
				this.$store.commit('Call',phone)
				this.$store.commit("showConcatPop", true);
			},
			ChildPickup(item) { //取货
				let that = this
				console.log(item)
				that.map.map(item.lat,item.log,item.name)
				this.$store.commit("showPop", false);
			},
			GunList(lat, log, name) { //抢单
				let item={lat, log, name}
				this.$store.commit("showPop", true);
				this.$store.commit('Order',item)
				let that = this
				let params = {
					order_id: item.id,
					user_id: this.userId,
				}
				// that.request.getdata('getOrderGrabbing', params).then(res => {
				// 	console.log(res, '抢单')
				// 	res.code == 300 && uni.showToast({
				// 		title: '抢单失败',
				// 		icon: 'none',
				// 		duration: 3000
				// 	});
				// })
			
			}
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
	
	.btn1 {
		width: 200upx;
		height: 60upx;
		background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
		box-shadow: 1upx 5upx 20upx 0upx rgba(209, 109, 78, 0.2);
		border-radius: 30upx;
		line-height: 60upx;
	}
</style>
