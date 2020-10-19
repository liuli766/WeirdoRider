<template>
	<view class="pickupdetail comm">
		<view class="page-item">
			<ordercomplted class="page-item">
				<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
				<view class="evaluate font500 font24 text_cen" slot='stay'>待取货</view>
				<text class="color333 font26 font500" slot='concat' @tap.stop='Concat'>联系商家</text>
			</ordercomplted>
		</view>
		<view class="information  font28  font500">
			<view class="color333 bold font32 title">订单信息</view>
			<view class="flex  flex_be flex_al-cen infor-list">
				<text class="color333">订单编号</text>
				<text class="color666">FKMW202009171838</text>
			</view>
			<view class="flex  flex_be flex_al-cen infor-list">
				<text class="color333">下单时间</text>
				<text class="color666">2020-09-18 14:25:36</text>
			</view>
		</view>
		<view class="color666 font24 font500 infor-tousu">
			订单配送遇到问题，未能按时到达，
			<text style="color: #5D82FF;">提起申诉</text>
		</view>
		<view class="flex text_cen">
			<view class="sjbtn font500">取消订单</view>
			<view class="gkbtn colorfff font500" @tap="Goods">确认收货</view>
		</view>
		<concatpop v-if="isConcatPop"/>
		<Pop v-if="isPop">
			<view class="color3434 bold font36 successtxt" slot="successtxt">已收货</view>
			<view class="color9a9a font500 font26" slot="subtet">请快马加鞭给顾客送餐</view>
			<view class="btnpop font500 font32 text_cen colorfff" slot='btnpop'>知道了</view>
		</Pop>
	</view>
</template>

<script>
	import ordercomplted from '@/components/OrderCompleted/OrderCompleted.vue'
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import {
		mapState, 
	} from 'vuex';
	export default {
		components: {
			ordercomplted,
			concatpop,
			Pop
		},
		data() {
			return {
				
			}
		},
		computed: {
		    ...mapState({
				isPop: (state) => state.isPop,
				isConcatPop:(state) => state.isConcatPop
			}),
		},
		methods: {
			Concat(){
				this.$store.commit("showConcatPop", true);
			},
			Goods(){
				this.$store.commit("showPop", true);
			}
		}
	}
</script>

<style lang="scss" scoped>
.pickupdetail{
	.page-item {
		margin: 30upx;
	}
	.evaluate {
		color: #FF6868;
	}
	.information {
		padding: 40upx 30upx 58upx 30upx;
		background: #fff;
		margin: 0 30upx;
		.title {
			height: 94upx;
			line-height: 94upx;
			border-bottom: 1px solid #EEEEEE;
			margin-bottom: 40upx;
		}
	
		.infor-list {
			margin-bottom: 54upx;
		}
	}
	.infor-tousu{
		margin: 30upx auto 60upx 30upx;
	}
	.sjbtn{
		width: 250upx;
		height: 80upx;
		border: 1upx solid #EEEEEE;
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		color: #666;
		font-size: 32upx;
		line-height: 80upx;
		margin-right: 30upx;
		margin-left: 30upx;
	}
	.gkbtn{
		width: 410upx;
		height: 80upx;
		background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		line-height: 80upx;
	}
}
.successtxt{
		margin: 42upx 0 20upx 0;
	}
	.btnpop{
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
