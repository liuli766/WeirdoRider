<template>
	<view>
		<view class="content colorfff">
			<view class="title flex flex_be flex_al-cen">
				<text class="color3434 bold font32">立即配送</text>
				<text class="color9a9a font26 font500">距离：{{orderList.distance}}km</text>
			</view>
			<view class="addrbox">
				<view class="addrlist">
					<view class="addrtit flex flex_al-cen">
						<image src="../../static/img/mapqi.png" mode=""></image>
						<text class="color9a9a font24 font500">{{orderList.supplier_name}}</text>
					</view>
					<view class="color3434 font28 font500 addr">{{orderList.supplier_address}}</view>
				</view>
				<view class="addrlist">
					<view class="addrtit flex flex_al-cen">
						<image src="../../static/img/mapzhong.png" mode=""></image>
						<text class="color9a9a font24 font500">{{orderList.address}}</text>
					</view>
					<view class="color3434 font28 font500 noneaddr">{{orderList.user_address}}</view>
				</view>
			</view>
			<view class="bottom flex flex_be flex_al-cen">
				<view class="price">
					<text class="colorred"><text class="font24">￥</text>{{orderList.delivery_money}}</text>
					<text class="color9a9a font24 font500">实收￥{{orderList.delivery_money}}</text>
				</view>
				<slot name="qiangdan"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import pop from '../PopBox/PopBox.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			pop,
		},
		props: {
			orderList: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				userId: (state) => state.userId,
				order: (state) => state.order,
			}),
		},
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30upx;
		border-radius: 10upx;
		background: #fff;
		margin-bottom: 30upx;

		.title {
			height: 90upx;
		}

		.addrbox {
			padding: 20upx;
			background: #FAFAFA;

			.addrlist {
				.addrtit {
					image {
						width: 36upx;
						height: 36upx;
						margin-right: 11upx;
					}
				}

				.addr {
					margin: 19upx 0 0upx 67upx;
					padding-bottom: 30upx;
					border-bottom: 1px solid #EEEEEE;
				}

				.noneaddr {
					margin: 19upx 0 0upx 67upx;
				}
			}
		}

		.bottom {
			height: 120upx;

			.colorred {
				color: #FF5E5E;
				margin-right: 17upx;

				.font12 {
					font-size: 12upx;
				}
			}
		}
	}
</style>
