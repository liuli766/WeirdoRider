<template>
	<view class="pickupdetail comm">
		<view class="page-item">
			<ordercomplted class="page-item">
				<text class="color3434 bold font32" slot='tit'>立即配送</text>
				<view class="evaluate font500 font24 text_cen" slot='stay'>待接单</view>
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
		<view class="flex text_cen">
			<view class="gkbtn colorfff font500" @tap="GunList">立即抢单</view>
		</view>
		<Pop v-if="isPop">
			<view class="color3434 bold font36 successtxt" slot="successtxt">抢单成功</view>
			<view class="color9a9a font500 font26" slot="subtet">请前往商家取货配送</view>
			<view class="btnpop font500 font32 text_cen colorfff" slot='btnpop'>前往取货</view>
		</Pop>
	</view>
</template>

<script>
	import ordercomplted from '@/components/OrderCompleted/OrderCompleted.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import {
		mapState, 
	} from 'vuex';
	export default {
		components: {
			ordercomplted,
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
			},
			GunList(){
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
	.gkbtn{
		width: 690upx;
		height: 80upx;
		background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		line-height: 80upx;
		margin: 0 auto;
		margin-top: 114upx;
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
