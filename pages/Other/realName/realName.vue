<template>
	<view class="comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" style="color: #333333 !important;" @tap="back"></view>
			<view class="nickname">实名认证</view>
		</view>
		<view class="font28 font500 real-tit">
			请认真填写，<text class="real-rz">一经认证不可更改</text>
		</view>
		<view class="mb30">
			<view class="flex flex_be list-item line" v-for="(item,i) in usersetList" :key="i" @tap="GoComminput(i)">
				<text class="color3434 font500 font30" v-if="i!==2">{{item.name}}</text>
				<view class="flex flex_al-cen flex_jus-cen" v-if="i!==2">
					<input type="text" :placeholder="item.placeholder" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
				<text class="color3434 font500 font30" v-if="i==2">性别</text>
				<view class="flex flex_al-cen flex_jus-cen meun-name" @tap.stop="handDownmeun" v-if="i==2">
					<input type="text" :placeholder="gender" disabled />
					<view class="icon-yjt iconfont icon-you" :class="{rotate: isDownmeun}"></view>
					<view class="meun flex flex-col text_cen" v-if="isDownmeun">
						<text v-for="(gender,sexid) in sex" :key='sexid' @tap.stop="handSex(gender)">{{gender}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 上传身份证照片 -->
		<view class="font28 color666 cardtit">上传身份证照片</view>
		<view class="bfff cardbox font24 color333 flex">
			<view class="flex flex_al-cen flex_jus-cen flex-col" style="margin-right: 24upx;" @click="UploadFace_img">
				<image :src="face_img?face_img:'../../../static/img/zhengmian.png'" mode=""></image>
				<text>上传身份证主页</text>
			</view>
			<view class="flex flex_al-cen flex_jus-cen flex-col" @click="UploadBack_img">
				<image :src="back_img?back_img:'../../../static/img/fanmian.png'"  mode=""></image>
				<text>上传身份证副页</text>
			</view>
		</view>
		<view class="commbtn text_cen colorfff" @tap="handConfirm">确认提交</view>
		<comminput v-if="iscomminput && (selectId==i)" :userinfoList='item' :idNum='i' v-for="(item,i) in usersetList" :key='i'
		 @handKeep='handKeep'></comminput>
	</view>
</template>

<script>
	import comminput from '@/components/personInput.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			comminput,
		},
		data() {
			return {
				isDownmeun: false,
				sex: ['男', '女'],
				gender: '',
				selectId: '', //当前选中的下标
				face_img: '', //身份证正面照文件
				back_img: '', //身份证反面照文件
				usersetList: [{
						name: '姓名',
						placeholder: ''
					},
					{
						name: '身份证号',
						placeholder: ''
					},
					{
						name: '性别',
						placeholder: ''
					},
					{
						name: '专业',
						placeholder: ''
					},
					{
						name: '学号',
						placeholder: ''
					},
				],
			}
		},
		computed: {
			...mapState({
				iscomminput: (state) => state.iscomminput,
				userId: (state) => state.userId,
				userReal: (state) => state.userReal,
			}),
		},
		methods: {
			handConfirm() { //确定修改资料
				let name = this.usersetList[0].placeholder //姓名
				let number = this.usersetList[1].placeholder //身份证号
				let study_type = this.usersetList[3].placeholder //专业
				let study_num = this.usersetList[4].placeholder //学号
				let sex = ''
				this.gender=='男' && (sex=1)
				this.gender=='女' && (sex=2)
				let that = this
				let params = {
					user_id: this.userId,
					name,
					number,
					sex,
					study_type,
					study_num,
					face_img: this.face_img,
					back_img: this.back_img,
				}
				
				// let imgs = [
				// 	{
				// 		name: "face_img", 
				// 		uri: this.face_img
				// 	},{
				// 		name: "back_img", 
				// 		uri: this.back_img
				// 	}
				// ]
				// console.log(that.request.base+'/Rider/userReal')
				// uni.uploadFile({
				//     url:that.request.base+'/Rider/userReal', 
				//     files:imgs,
				// 	filePath: this.back_img, // uni.chooseImage函数调用后获取的本地文件路劲
				// 	name:'file', 
				//     formData: JSON.stringify(params),
				//     header:{"Content-Type": "multipart/form-data"},
				// 	success: (res) => {
				// 		console.log(res)
				// 	},
				// 	fail: (res) => {
				// 	    console.log(res)
				// 	}
				// })
				that.request.getdata('getUserReal', params).then(res => {
					console.log(res, '实名认证')
					this.$store.commit('handuserReal',res.is_real)
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
				})
			},
			GoComminput(i) {
				this.selectId = i
				this.$store.commit("Showcomminput", true);
			},
			handKeep(data) { //实名认证内容
				this.usersetList.map((item, i) => {
					if (this.selectId == i) {
						item.placeholder = data
					}
				})
				console.log(this.usersetList)
			},
			UploadFace_img() {//上传身份证正面照文件
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.face_img = res.tempFilePaths[0]
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			UploadBack_img() {//上传身份证背面照文件
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.back_img = res.tempFilePaths[0]
						console.log(JSON.stringify(res.tempFilePaths));
					},
				});
			},
			handDownmeun() {
				this.isDownmeun = true
			},
			handSex(gender) {
				this.gender = gender
				this.isDownmeun = false
			},
			back() { //返回上一级
				uni.navigateBack({
					delta: 1
				});
			},
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
	}

	.comm {
		.real-tit {
			padding: 30upx;
		}

		.real-rz {
			color: #FFAC68;
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

	input {
		text-align: right;
		margin-right: 7upx;
	}

	/deep/.rotate {
		transform: rotate(90deg) !important;
		transition: all .2s;
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

			text:hover {
				background: #F7F9FA;
			}
		}
	}

	.cardtit {
		margin: 20upx 32upx 32upx 32upx;
	}

	.cardbox {
		padding: 30upx;

		image {
			margin-bottom: 16upx;
			width: 330upx;
			height: 200upx;
		}
	}

	.nickname {
		margin-left: 240upx;
	}
</style>
