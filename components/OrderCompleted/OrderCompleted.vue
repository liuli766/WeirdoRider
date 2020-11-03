<template>
	<view>
		<view class="content colorfff">
			<view class="title flex flex_be flex_al-cen">
				<slot name='tit'></slot>
				<slot name="concat"></slot>
			</view>
			<view class="addrbox" >
				<view class="addrlist" @tap="apen_add(orderList.supplier_lat,orderList.supplier_lon,orderList.supplier_address)" >
					<view class="addrtit flex flex_al-cen">
						<image src="../../static/img/mapqi.png" mode=""></image>
						<text class="color9a9a font24 font500">{{orderList.supplier_name}}</text>
					</view>
					<view class="color3434 font28 font500 addr">{{orderList.supplier_address}}</view>
				</view>
				<view class="addrlist" @tap="apen_add(orderList.user_lat,orderList.user_lon,orderList.user_address)">
					<view class="addrtit flex flex_al-cen">
						<image src="../../static/img/mapzhong.png" mode=""></image>
						<text class="color9a9a font24 font500">{{orderList.supplier_name}}</text>
					</view>
					<view class="color3434 font28 font500 noneaddr">{{orderList.user_address}}</view>
				</view>
			</view>
			<view class="bottom flex flex_be flex_al-cen">
				<view class="price">
					<text class="colorred"><text class="font12">￥</text>{{orderList.delivery_money}}</text>
					<text class="color9a9a font24 font500">实收￥{{orderList.delivery_money}}</text>
				</view>
				<slot name="stay"></slot>
			</view>
			<view >
				<slot name='btn'></slot>
			</view>
			
		</view>
		<concatpop v-if="isConcatPop" />
	</view>
	
</template>

<script>
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import {
		mapState, 
	} from 'vuex';
	export default {
		components: {
			concatpop
		},
		props:{
			orderList:{
				type:[Array,Object],
				default: function() {
					return {}
				}
			}
		},
		computed: {
		    ...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop,
			}),
		},
		data() {
			return {
				
			}
		},
		methods: {
			  apen_add(lat,log,name){
				  let that = this
				  that.map.map(lat,log,name)
			  }
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 30upx;
	border-radius: 10upx;
	background: #fff;
	.title{
		height: 90upx;
	}
	.addrbox{
		padding: 20upx;
		background: #FAFAFA;
		.addrlist{
			.addrtit{
				image{
					width: 36upx;
					height: 36upx;
					margin-right: 11upx;
				}
			}
			.addr{
				margin: 19upx 0 0upx 67upx;
				padding-bottom: 30upx;
				border-bottom: 1px solid #EEEEEE;
			}
			.noneaddr{
				margin: 19upx 0 0upx 67upx;
			}
		}
	}
	.bottom{
		height: 120upx;
		.colorred{
			color: #FF5E5E;
			margin-right: 17upx;
			.font12{
				font-size: 12upx;	
			}
		}
	}
	
}

</style>
