<template>
	<view class="accountset comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" style="color: #333333 !important;"  @tap="back"></view>
			<view class="nickname">账户设置</view>
		</view>
		<view class="account-head font500 font30 color3434 flex flex_be mt30 mb30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg?headimg:'../../../static/img/head.png'" class="user-img"></image>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view class="mt30">
			<view class="flex flex_be list-item line" v-for="(item,i) in usersetList" :key="i" @tap="GoComminput(i)">
				<text class="color3434 font500 font30">{{item.name}}</text>
				<view class="flex flex_al-cen flex_jus-cen color666">
					<input type="text" v-if="i!==3" :value="item.placeholder" disabled />
					<input type="password" v-if="i==3" :value="item.placeholder" placeholder="**********" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<view class="user-btn text_cen font32 font500 colorfff" @tap="handConfirm">确定修改</view>
		<comminput v-if="iscomminput && (selectId==i)" :userinfoList='item' :idNum='i' v-for="(item,i) in usersetList" :key='i'
		:IdCard='30'
		 @handKeep='handKeep'></comminput>
	</view>
</template>

<script>
	import comminput from '@/components/personInput.vue'
	import {
		mapState,
	} from 'vuex';
	import uploadImage from '../../../utils/uploadFile.js'
	import util from '../../../utils/util.js'
	let pwd = uni.getStorageSync('pawd');
	export default {
		components: {
			comminput,
		},
		data() {
			return {
				headimg: "",
				selectId: '', //当前选中的下标
				usersetList: [{
						name: '昵称',
						placeholder: ''
					},
					{
						name: '真实姓名',
						placeholder: ''
					},
					{
						name: '手机号码',
						placeholder: ''
					},
					{
						name: '登录密码',
						placeholder: pwd
					},
				],
			}
		},
		onLoad() {
			this.person();
			console.log(pwd)
		},
		computed: {
			...mapState({
				userId: (state) => state.userId,
				iscomminput: (state) => state.iscomminput,
			}),
		},
		methods: {
			handConfirm() { //确定修改资料
				let user_name = this.usersetList[0].placeholder //用户昵称
				let mobile = this.usersetList[2].placeholder //手机号
				let password = this.usersetList[3].placeholder //登录密码
				let real_name = this.usersetList[1].placeholder //登录密码
				let that = this
				let params = {
					user_id: that.userId,
					user_name,
					mobile,
					password,
					real_name,
					head_img: that.headimg,
				}
				that.request.getdata('getUserSave', params).then(res => {
					console.log(res, '修改资料')
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
					uni.navigateBack({
						delta: 1
					});
				})
			},
			GoComminput(i) {
				this.selectId = i
				this.$store.commit("Showcomminput", true);
			},
			handKeep(data) { //账户设置内容
				this.usersetList.map((item, i) => {
					if (this.selectId == i) {
						item.placeholder = data
					}
				})
			},
			UploadHeadimg() {//上传头像
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.headimg = res.tempFilePaths[0]
						// console.log(JSON.stringify(res.tempFilePaths));
						var tempFilePaths = res.tempFilePaths;
						var nowTime = util.formatTime(new Date());
						
						//支持多图上传
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
								title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
								mask: true
							})
						
							//上传图片
							//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
							//图片路径可自行修改
							uploadImage(res.tempFilePaths[i], 'poster/' + nowTime + '/',
								function(result) {
									console.log("======上传成功图片地址为：", result);
									that.headimg = result
						
									uni.hideLoading();
								},
								function(result) {
									console.log("======上传失败======", result);
									uni.hideLoading()
								}
							)
						}
					}
				});
			},
			back(){ //返回上一级
				uni.navigateBack({
				    delta: 1
				});
			},
			person(){
				let that = this
				let params = {
					user_id: this.userId,
				}
				that.request.getdata('getUserInfo',params).then(res => {
					console.log(res, '骑手中心')
					this.headimg=res.data.head_img
					this.usersetList[0].placeholder=res.data.user_name			
					this.usersetList[1].placeholder=res.data.real_name
					this.usersetList[2].placeholder=res.data.mobile
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		height: 88upx;
		background: #fff;
	}

	.person-nav {
		padding-left: 10upx;
		background: #fff;
		padding-bottom: 27upx;
		box-sizing: border-box;
		height: 100rpx;
		padding-top: 30rpx;

		.nickname {
			margin-left: 240upx;
		}
	}

	.accountset {
		.account-head {
			background: #fff;
			line-height: 140upx;
			padding: 0 32upx;

			.user-img {
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 26upx;
			}
		}

		.icon-yjt {
			margin-left: 27upx;
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

		input {
			text-align: right;
		}

		.user-btn {
			width: 690upx;
			height: 80upx;
			background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
			box-shadow: 1px 5upx 20upx 0px rgba(209, 109, 78, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
			margin: 0 auto;
			margin-top: 80upx;
		}
	}
</style>
