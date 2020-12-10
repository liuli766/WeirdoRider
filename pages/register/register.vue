<template>
	<view class="login-box comm">
		<view class="login-bg">
			<image src="../../static/img/register-bg.png"></image>
			<view class="login-nav">
				<text class="back iconfont icon-iconfont-left"></text>
				<text class="colorfff bold font36" style="margin-left: 190rpx;">申请成为骑手</text>
			</view>
		</view>
		<view class="form">
			<view class="font32 bold color333 bfff" style="padding:30upx;border-radius: 10upx 10upx 0 0;">请认真填写以下资料</view>
			<form @submit="formSubmit">
				<view class="bfff" style="padding:0 30upx;">
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">姓名</view>
						<input type="text"  name='name' placeholder="你的姓名" placeholder-style='text-align:right' @input="Name" />
					</view>
					<view class="login-list flex flex_be meun-name" @tap="handDownmeun">
						<view class="color3434 font32 font500 login-user">性别</view>
						<input type="text" v-model="userinfo.sex" placeholder="选择性别" name="sex" disabled placeholder-style='text-align:right' />
						<view class="meun flex flex-col text_cen" v-if="isDownmeun">
							<text v-for="(gender,sexid) in sex" :key='sexid' @tap.stop="handSex(gender)">{{gender}}</text>
						</view>
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">所在专业</view>
						<input type="text"  name="major" placeholder="填写所在专业" placeholder-style='text-align:right' @input="major" />
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">学号</view>
						<input type="number"  name="study_num" placeholder="填写学生证号" placeholder-style='text-align:right' @input="studyNum" />
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">手机号码</view>
						<input type="number"  name="mobile" placeholder="填写登录手机号" placeholder-style='text-align:right' @input="mobile" />
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">登录密码</view>
						<input type="password"  name="password" placeholder="输入商家登录密码" placeholder-style='text-align:right' @input="password" />
					</view>
					<view class="flex login-list flex_be" style="border: none;">
						<view class="color3434 font32 font500 login-user">确认密码</view>
						<input type="password"  name="surepwd" placeholder="确认商家登录密码" placeholder-style='text-align:right' @input="surepwd" />
					</view>
					<view class="login-list flex flex_be meun-name" @tap="handleSchool">
						<view class="color3434 font32 font500 login-user">所在学校</view>
						<input type="text" v-model="school" placeholder="选择学校" name="cat_id" disabled placeholder-style='text-align:right' />
						<view class="meun flex flex-col text_cen font32" v-if="isschool" style="width: 400upx;height: 400upx;" >
							<text v-for="(item,k) in schoolList" :key='k' @tap.stop="handslectschool(item)">{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="font24 font500 color999 register-xy">
					我已阅读并同意《<text class="colorffa">平台骑手入驻须知</text>》
				</view>
				<button form-type="submit" class="login-btn text_cen colorfff font32 font500">提交申请</button>
			</form>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				isDownmeun: false,//是否显示性别下拉框
				sex: ['男', '女'],
				showClearIcon: false,
				userinfo: {
					name: '',
					sex: '',
					major: '',
					study_num: '',
					mobile: '',
					password: '',
					surepwd: '',
				},
				school:'',
				isschool:false,
				schoolList:[],
				isschoolid:"",
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
			}),
		},
		onLoad() {
			if(this.userId!==''){
				uni.switchTab({
					url: '../TabBar/Home/Home',
				})
			}
			let that = this;
			let params = {
				supplier_id: this.supplier_id,
			}
			that.request.getdata('getarrSchool', params).then(res => {
				console.log(res, '学校')
				that.schoolList=res.data
			})
		},
		methods: {
			/*
			***解决uniapp input框输入文字乱跳
			*/
			mobile(e){ 
				let val=e.detail.value
				this.userinfo.mobile=val
			},
			Name(e){
				let val=e.detail.value
				this.userinfo.name=val
			},
			studyNum(e){
				let val=e.detail.value
				this.userinfo.study_num=val
			},
			major(e){
				let val=e.detail.value
				this.userinfo.major=val
			},
			password(e){
				let val=e.detail.value
				this.userinfo.password=val
			},
			surepwd(e){
				let val=e.detail.value
				this.userinfo.surepwd=val
			},
			formSubmit: function(e) { //注册
				let sex = ''
				this.userinfo.sex == '男' && (sex = 1)
				this.userinfo.sex == '女' && (sex = 2)

				let params = {
					name: this.userinfo.name,
					sex,
					major: this.userinfo.major,
					study_num: this.userinfo.study_num,
					mobile: this.userinfo.mobile,
					password: this.userinfo.password,
					surepwd: this.userinfo.surepwd,
				}
				if (!this.userinfo.name) {
					uni.showToast({
						title: '姓名不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.sex) {
					uni.showToast({
						title: '请选择性别',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.major) {
					uni.showToast({
						title: '专业不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.study_num) {
					uni.showToast({
						title: '学号不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.mobile) {
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none"
					});
					return false;
				}
				if (!/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(this.userinfo.mobile)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.password) {
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.surepwd) {
					uni.showToast({
						title: '确认密码不能为空',
						icon: "none"
					});
					return false;
				}
				if (this.userinfo.password !== this.userinfo.surepwd) {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: "none"
					});
					return false;
				}

				let that = this
				that.request.getdata('getRegister', params).then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
					uni.navigateTo({
						url: '../login/login',
						success: res => {},fail: () => {},complete: () => {}
					})
				})
			},
			handSex(gender) { //选择性别
				this.userinfo.sex = gender
				this.isDownmeun = false
			},
			handDownmeun() { //显示性别下拉框
				this.isDownmeun = !this.isDownmeun
			},
			handleSchool(){
				this.isschool = !this.isschool
			},
			handslectschool(item){
				this.school = item.name
				this.isschool= false
				this.isschoolid= item.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		.login-bg {
			image {
				width: 100%;
				height: 365upx;
				position: relative;
			}

			.login-nav {
				position: absolute;
				width: 100%;
				top: 115upx;
				left: 0;
				padding-left: 38upx;
			}
		}

		.form {
			width: 690rpx;
			height: 716rpx;
			box-sizing: border-box;
			margin: 30upx;
			border-radius: 10upx;
			position: absolute;
			top: 202upx;
			left: 0;

			.login-list {
				line-height: 88rpx;
				border-bottom: 1rpx solid #EEEEEE;
				align-items: center;
				position: relative;
			}

			input {
				text-align: right;
				padding-right: 20upx;
			}

			.login-btn {
				width: 690upx;
				height: 80upx;
				background: #FFAC68;
				opacity: 1;
			}

			.register-xy {
				margin: 40upx 0 80upx 0;
			}

			.meun-name {
				position: relative;

				.meun {
					position: absolute;
					top: 66rpx;
					right: 0;
					width: 200upx;
					height: 200upx;
					background: #fff;
					box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.05);
					border-radius: 10upx;
					z-index: 9;
					transition: all .2s;
					overflow: auto;
					text:hover {
						background: #F7F9FA;
					}
				}
			}

		}
	}
</style>
