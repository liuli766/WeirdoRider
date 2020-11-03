<template>
	<view class="pickupdetail comm">
		<view class="page-item">
			<ordercomplted class="page-item" :orderList='detail'>
				<text class="color3434 bold font32" slot='tit'>顾客已等待3分钟</text>
				<view class="evaluate font500 font24 text_cen" slot='stay'>待取货</view>
				<text class="color333 font26 font500" slot='concat' @tap.stop='Concat(detail.supplier_mobile)'>联系商家</text>
			</ordercomplted>
		</view>
		<view class="information  font28  font500">
			<view class="color333 bold font32 title">订单信息</view>
			<view class="flex  flex_be flex_al-cen infor-list">
				<text class="color333">订单编号</text>
				<text class="color666">{{detail.order_sn}}</text>
			</view>
			<view class="flex  flex_be flex_al-cen infor-list">
				<text class="color333">下单时间</text>
				<text class="color666">{{detail.pay_time}}</text>
			</view>
		</view>
		<view class="color666 font24 font500 infor-tousu">
			订单配送遇到问题，未能按时到达，
			<text style="color: #5D82FF;">提起申诉</text>
		</view>
		<view class="flex text_cen">
			<view class="sjbtn font500" @tap="getCancel">取消订单</view>
			<view class="gkbtn colorfff font500" @tap="Goods">确认收货</view>
		</view>
		<concatpop v-if="isConcatPop" />
		<Pop v-if="isPop">
			<view class="color3434 bold font36 successtxt" slot="successtxt">已收货</view>
			<view class="color9a9a font500 font26" slot="subtet">请快马加鞭给顾客送餐</view>
			<view class="btnpop font500 font32 text_cen colorfff" slot='btnpop' @tap="Close">知道了</view>
		</Pop>
		<view class="popbox" v-if="isShowPop">
			<view class="popup text_cen">
				<view class="poptitle font36 bold color333">
					取消订单
				</view>
				<view style="position: relative;" @tap="Oninput">
					<input type="text" placeholder="请选择订单取消原因"  class="input" disabled="disabled" v-model="selectText" />
					<text class="sanj"></text>
				</view>
				<view class="list-container font28 color666" v-if="isShowList">
					<span class="popper__arrow"></span>
					<scroll-view scroll-y=true scroll-x=true style="background-color: #fff;"  class="list"
					:style="'max-height: ' + listBoxHeight +'upx;'">
						<view v-for="(item,i) in CancelList" :key='i' @tap="onClickItem(item)" class="itemlist">{{item.name}}</view>
						<view v-if="CancelList.length==0" class="data-state item">无数据</view>
					</scroll-view>
				</view>
				<view class="font26 color999 ml mt30">
					<textarea  placeholder="备注信息"  v-model="NoteText"/>
				</view>
				<view class="font32 font500 flex" style="margin-top: 60upx;">
					<view class="confirm color666 text_cen ml mr" @tap="handcancel">取消</view>
					<view class="cancel colorfff text_cen" @tap="handconfirm(detail)">确认提交</view>
				</view>
			</view>
		</view>
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
			Pop,
		},
		data() {
			return {
				detail: [], //详情
				CancelList: [], //骑手理由订单
				isShowList:false,// 是否显示列表框
				selectText:'',// 已经选择的内容
				isShowPop:false,//取消订单弹框
				NoteText:''
			}
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop,
				userId: (state) => state.userId,
				tel: (state) => state.tel,
			}),
		},
		onLoad(option) {
			console.log(option)
			let that = this
			let params = {
				order_id: option.id
			}
			that.request.getdata('getOrderInfo', params).then(res => {
				this.detail = res.data
				console.log(res, '详情')
			})
			that.request.getdata('getCancelList').then(res => {
				this.CancelList = res.data
				console.log(res, '取消订单理由')
			})
		},
		methods: {
			Concat(phone) {
				this.$store.commit('Call',phone)
				this.$store.commit("showConcatPop", true);
			},
			Goods() {
				this.$store.commit("showPop", true);
			},
			getCancel() { //取消订单按钮
				this.isShowPop=true
			},
			handcancel() { //取消
				this.isShowPop=false
			},
			handconfirm(item) { //确认取消订单
			console.log(item,'确认取消订单')
				let that = this
				let params = {
					order_id: item.id,
					user_id: this.userId,
				}
				if(this.selectText!==''){
					that.request.getdata('getCancel', params).then(res => {
						console.log(res, '取消订单')
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 3000
						});
					})
					this.isShowPop=false
				}else{
					uni.showToast({
						title:'请填写理由',
						icon: 'none',
						duration: 3000
					});
				}
				
			},
			listBoxHeight(){ // 列表框的总高度
				const itemHeight = 80; // 每个列表项的高度(upx)
				return this.CancelList.length*itemHeight;
			},
			Oninput(){ //显示列表框
				this.isShowList=true
			},
			onClickItem(item){ // 列表项上的点击事件
				this.selectText=item.name
				this.isShowList=false
			},
			Close(){
				this.$store.commit("showPop", false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pickupdetail {
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

		.infor-tousu {
			margin: 30upx auto 60upx 30upx;
		}

		.sjbtn {
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

		.gkbtn {
			width: 410upx;
			height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
		}
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

	.popbox {
		background: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		transition: all .2s;

		.popup {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -280upx;
			margin-top: -317upx;
			width: 560upx;
			height: 634upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;

			.poptitle {
				margin: 60upx 0 38upx 0;
			}

			.confirm {
				width: 200upx;
				line-height: 80upx;
				border: 1upx solid #EEEEEE;
				border-radius: 10upx;

			}

			.cancel {
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 10upx;
				border: none;
			}

			.input {
				width: 500upx;
				height: 80upx;
				border: 1upx solid #EDEDED;
				border-radius: 10upx;
				padding: 0 30upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-left: 30upx;
				text-align: left;
			}

			.sanj {
				width: 0;
				height: 0;
				border: 13upx solid transparent;
				border-top-color: #EDEDED;
				position: absolute;
				right: 46rpx;
				top: 40%;
			}
			.list-container{
				position: absolute; width: 500upx; left: 30upx;
				box-sizing: border-box; z-index: 100;
				.popper__arrow{
					 transform: translateX(-400%);
					 position: absolute;
					 display: block;
					 width: 0;
					 height: 0;
					 border-color: transparent;
					 border-style: solid;
					 border-width: 6px;
					 filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
					 left: 30%;
					 margin-right: 3px;
					 border-top-width: 0;
					 border-bottom-color: #dcdfe6;  
					 top: -5px;
				}
				.list{
					border-radius: 4px;
					border: 1px solid #dcdfe6; 
					width: 500upx; 
					max-height: 10em;
					background-color: #fff;
					box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
					padding: 5px 0;
				}
				.itemlist{
					line-height: 60upx;
					&:hover{
						background-color: #C0C0C0;
					}
					&.active{
						color: #C0C0C0;
						font-weight: 500;
						background-color: #C0C0C0;
					}
				}
			}
			textarea{
				width: 500upx;
				height: 280upx;
				border: 1upx solid #DEDEDE;
				border-radius: 10upx;
				padding: 28upx 30upx;
				box-sizing: border-box;
				text-align: left;
			}
		}
	}
</style>
