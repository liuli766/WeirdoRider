<template>
	<view class="mine comm">
		<view class="person-box">
			<image src="../../../static/img/personbg.png" mode=""></image>
			<view class="mine-box flex flex_be flex_al-cen" style="width: 690rpx;">
				<view class="flex flex_al-cen">
					<image :src="personInfo.head_img?personInfo.head_img:'../../../static/img/head.png'" mode="" class="mine-img"></image>
					<view class="flex flex-col">
						<text class="bold font36 colorfff lh">{{personInfo.user_name}}</text>
						<text class="font500 colorfff font28 mine-tel lh">{{personInfo.mobile}}</text>
					</view>
					<view class="font500 font24 unauthorized text_cen" v-if="userReal==0">未认证</view>
					<view class="font500 font24 authorized text_cen unauthorized" v-if="userReal==1" style="color: #fff;">已实名</view>
					<view class="font500 font24 authorized text_cen unauthorized" v-if="userReal==2" style="color: #fff;">审核中</view>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
			<view class="mb30 mt30">
				<view class="flex flex_be list-item line" @tap="GoAccountSet">
					<text class="color3434 font500 font30">账户设置</text>
					<text class="iconfont icon-you"></text>
				</view>
				<view class="flex flex_be list-item line" @tap="GorealName">
					<text class="color3434 font500 font30">实名认证</text>
					<text class="iconfont icon-you"></text>
				</view>
				<view class="flex flex_be list-item" @tap="WorkSet">
					<text class="color3434 font500 font30">工作设置</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
			<view class="flex flex_be list-item" @tap="GohandBook">
				<text class="color3434 font500 font30">骑手手册</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		<view class="popbox" v-if="isShowPop">
			<view class="popup text_cen">
				<view class="poptitle font36 bold color333">
					工作设置
				</view>
				<view style="position: relative;" class="mb30" @tap="OnInput">
					<input type="text" placeholder="请选择接单区域(可多选)" class="input" disabled="disabled" v-model="selectText" />
					<text class="sanj"></text>
				</view>
				<view style="position: relative;" @tap="handShowTime">
					<input type="text" placeholder="选择接单时间" :value="suretime" class="input" disabled="disabled" />
					<text class="sanj"></text>
				</view>
				<view class="list-container font28 color666" v-if="isShowList">
					<!-- 					<span class="popper__arrow"></span> -->
					<scroll-view scroll-y=true scroll-x=true style="background-color: #fff;" class="list" :style="'max-height: ' + listBoxHeight +'upx;'">
						<view v-for="(item,i) in CancelList" :key='i' @tap="onClickItem(item,i)" class="flex flex_al-cen flex_jus-cen p30 itemlist">
							<view style="flex: 1;">{{item.name}}</view>
							<view class="cicle" :class="{'cicle-active':item.isCheck}"></view>
						</view>
						<view v-if="CancelList.length==0" class="data-state item">无数据</view>
					</scroll-view>
					<view class="font32 font500 flex selctbot" style="margin-top: 60upx;">
						<view class="confirm color666 text_cen" @tap="handcancel" style="width: 250upx;border-radius:0 0 0 10upx">取消</view>
						<view class="cancel colorfff text_cen" @tap="handconfirm" style="width: 250upx;border-radius:0 0 10upx 0">确认提交</view>
					</view>
				</view>
				<view class="font32 font500 flex" style="margin-top: 60upx;">
					<view class="confirm color666 text_cen ml mr" @tap="handcancelPop">取消</view>
					<view class="cancel colorfff text_cen"  @tap="handCommConfirm">确认提交</view>
				</view>
			</view>
			<view class="sfm-time" v-if="isshowtime">
				<view class="flex font28 color666 flex_ar">
					<text @tap="Canceltimepop">取消</text>
					<text class="color333 bold font32">选择时间</text>
					<text class="colorfac" @tap="Confirmtimepop">确定</text>
				</view>
				<view class="font28 color999 flex flex_ar" style="margin: 28upx 0 40upx 0;">
					<text>营业时间</text>
					<text>休息时间</text>
				</view>
				<view class="flex">
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in hours" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in minus" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
					<view class="color999" style="line-height: 300rpx;">—</view>
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday1" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in hours" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in minus" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			const date = new Date()
			const hours = []
			const hour = date.getHours();
			const minus = []
			const minu = date.getMinutes();
			for (let i = 0; i < date.getHours(); i++) {
				hours.push(i)
			}
			for (let i = 0; i < date.getMinutes(); i++) {
				minus.push(i)
			}
			return {
				isShowPop: false,
				CancelList: [], //区域列表
				isShowList: false, // 是否显示列表框
				selectText: [], //选中的文字
				isshowtime: false, //时间弹框
				title: 'picker-view',
				hours,
				hour,
				minus,
				minu,
				newbefortime: '', //开始时间
				newaftertime: '', //结束时间
				suretime: '', //input确定时间
				value: [60, hour - 1, minu - 1],
				personInfo:{},//个人信息
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
				userReal: (state) => state.userReal,
			}),
		},
		onLoad() {
			let that = this
			let params = {
				user_id: this.userId,
			}
			that.request.getdata('getSchoolList').then(res => { //区域列表
				for (let i = 0; i < res.data.length; i++) {
					res.data[i].isCheck = false
				}
				this.CancelList = res.data
				console.log(this.CancelList, '区域列表')
			})
			that.request.getdata('getUserInfo',params).then(res => {
				console.log(res, '骑手中心')
				this.personInfo=res.data
			})
		},
		methods: {
			listBoxHeight() { // 列表框的总高度
				const itemHeight = 80; // 每个列表项的高度(upx)
				return this.CancelList.length * itemHeight;
			},
			onClickItem(item, i) { //多选
				item.isCheck = !item.isCheck
				if (item.isCheck) {
					this.selectText.push(item.name)
				} else {
					this.selectText.pop(item.name)
				}
				console.log(this.selectText)
			},
			OnInput() { //显示下拉列表框
				this.isShowList = true
			},
			WorkSet() { //打开整个弹框
				this.isShowPop = true
			},
			handcancel() { //区域取消
				this.isShowList = false
				this.selectText = []
				this.CancelList.map((item, i) => {
					this.CancelList[i].isCheck = false
				})
			},
			handconfirm() { //区域确定
				this.isShowList = false
			},
			handShowTime() { //显示时间弹框
				this.isshowtime = true
			},
			bindChangeday: function(e) {
				const val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minu = this.minus[val[1]]
				let hour = this.hours[val[0]]
				let minu = this.minus[val[1]]
				this.newbefortime = hour + ':' + minu
			},
			bindChangeday1(e) {
				const val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minu = this.minus[val[1]]
				let hour = this.hours[val[0]]
				let minu = this.minus[val[1]]
				this.newaftertime = hour + ':' + minu
			},
			Canceltimepop() { //关闭时间弹窗
				this.isshowtime = false
			},
			Confirmtimepop() { //确定时间弹窗
			console.log(this.newaftertime=='','dsasds')
			if(this.newaftertime==''||this.newbefortime==''){
				uni.showToast({
					title: '请选择时间',
					icon: 'none',
					duration:2000
				});
				return false;
			}else{
				this.suretime = this.newbefortime + '-' + this.newaftertime
				this.isshowtime = false
			}
				console.log(this.suretime)
			},
			handCommConfirm(){ //工作设置
				let that = this
				let region=this.selectText.toString()
				let params = {
					user_id:this.userId,
					region,
					start_time:this.newbefortime,
					end_time:this.newaftertime,
				}
				if(region.length==0){
					uni.showToast({
						title: '请选择区域',
						icon: 'none',
						duration:2000
					});
					return false;
				}
				if(this.newaftertime==''||this.newbefortime==''){
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration:2000
					});
					return false;
				}
				that.request.getdata('getSettingWork', params).then(res => {
					console.log(res, '工作设置')
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration:2000
					});
				})
				this.isShowPop = false
			},
			handcancelPop(){ //关闭整个弹窗
				this.isShowPop=false
			},
			GoAccountSet() {
				uni.navigateTo({
					url: '../../Other/AccountSet/AccountSet'
				})
			},
			GohandBook() {
				uni.navigateTo({
					url: '../../Other/handbook/handbook'
				})
			},
			GorealName() {
				uni.navigateTo({
					url: '../../Other/realName/realName'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person-box {
		image {
			width: 100%;
			height: 180upx;
			position: relative;
		}

		.mine-box {
			position: absolute;
			top: 41upx;
			left: 31upx;

			.mine-tel {
				opacity: 0.6;
				margin-top: 23upx;
			}

			.mine-img {
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 29upx;
			}

			.unauthorized {
				color: #FFAC68;
				width: 100upx;
				height: 34upx;
				border: 1upx solid #FFAC68;
				border-radius: 4upx;
				line-height: 34upx;
				margin-left: 20upx;
				margin-right: 160upx;
				align-self: flex-start;
				margin-top: 10rpx;
			}
			.authorized{
				background: #FFAC68;
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
			top: 30%;
			left: 50%;
			margin-left: -280upx;
			margin-top: -262upx;
			width: 560upx;
			height: 524upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;

			.poptitle {
				margin: 60upx 0 40upx 0;
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

			.list-container {
				position: absolute;
				width: 500upx;
				left: 30upx;
				box-sizing: border-box;
				z-index: 100;
				border: 1px solid #DEDEDE;
				height: 560upx;
				top: 240upx;
				border-radius: 10upx;
				background: #fff;

				.list {
					width: 500upx;
					height: 480upx;
					background-color: #fff;
					padding: 5px 0;
					position: relative;
				}

				.selctbot {
					position: absolute;
					bottom: 0;
				}

				.itemlist {
					line-height: 80upx;
				}
			}

			.p30 {
				padding-right: 30upx;
			}

			.cicle {
				display: inline-block;
				width: 32upx;
				height: 32upx;
				border: 1upx solid #666666;
				border-radius: 50%;
				margin-right: 10upx;
				position: relative;
			}

			.cicle-active::after {
				content: "";
				display: block;
				position: absolute;
				width: 16upx;
				height: 16upx;
				border-radius: 50%;
				top: 50%;
				left: 50%;
				margin-top: -8upx;
				margin-left: -8upx;
				background: #FFAC68;
			}

			textarea {
				width: 500upx;
				height: 280upx;
				border: 1upx solid #DEDEDE;
				border-radius: 10upx;
				padding: 28upx 30upx;
				box-sizing: border-box;
				text-align: left;
			}
		}

		.sfm-time {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 496upx;
			background: #fff;
			padding: 30upx;
			box-sizing: border-box;
		}

		.time-pop-box {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -280upx;
			margin-top: -207upx;
			width: 560upx;
			height: 414upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;
			padding-top: 60upx;
			box-sizing: border-box;
		}
	}
</style>
