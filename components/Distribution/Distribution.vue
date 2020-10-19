<template>
	<view class="content colorfff">
		<view class="title flex flex_be flex_al-cen">
			<text class="color3434 bold font32">立即配送</text>
			<text class="color9a9a font26 font500">距离：1.8km</text>
		</view>
		<view class="addrbox">
			<view class="addrlist">
				<view class="addrtit flex flex_al-cen">
					<image src="../../static/img/mapqi.png" mode=""></image>
					<text class="color9a9a font24 font500">瑞幸咖啡（科技大学店）</text>
				</view>
				<view class="color3434 font28 font500 addr">长安区广安大街68号</view>
			</view>
			<view class="addrlist">
				<view class="addrtit flex flex_al-cen">
					<image src="../../static/img/mapzhong.png" mode=""></image>
					<text class="color9a9a font24 font500">瑞幸咖啡（科技大学店）</text>
				</view>
				<view class="color3434 font28 font500 noneaddr">长安区广安大街68号</view>
			</view>
		</view>
		<view class="bottom flex flex_be flex_al-cen">
			<view class="price">
				<text class="colorred"><text class="font12">￥</text>28.00</text>
				<text class="color9a9a font24 font500">实收￥28.00</text>
			</view>
			<view class="btn colorfff font500 font32 text_cen" @tap.stop="GunList">抢单</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState, 
	} from 'vuex';
	export default {
		props:{
			
		},
		computed: {
		    ...mapState({
				isPop: (state) => state.isPop,
			}),
		},
		data() {
			return {
				
			}
		},
		methods: {
			GunList(){
				this.$store.commit("showPop", true);
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
		.btn{
			width: 200upx;
			height: 60upx;
			background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
			box-shadow: 1upx 5upx 20upx 0upx rgba(209, 109, 78, 0.2);
			border-radius: 30upx;
			line-height: 60upx;
		}
	}
}
</style>
