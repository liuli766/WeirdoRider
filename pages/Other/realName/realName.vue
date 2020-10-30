<template>
	<view class="comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" style="color: #333333 !important;"></view>
			<view class="nickname">实名认证</view>
		</view>
		<view class="font28 font500 real-tit">
			请认真填写，<text class="real-rz">一经认证不可更改</text>
		</view>
		<view class="mb30">
			<view class="flex flex_be list-item line" @tap="GOpersonInput('姓名',username,1)">
				<text class="color3434 font500 font30">姓名</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" class="color666" v-model="username" placeholder="王小二" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line">
				<text class="color3434 font500 font30">身份证号</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" v-model="idCard" placeholder="请填写你的身份证" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line">
				<text class="color3434 font500 font30">性别</text>
				<view class="flex flex_al-cen flex_jus-cen meun-name" @tap.stop="handDownmeun">
					<input type="text" :placeholder="gender" disabled />
					<view class="icon-yjt iconfont icon-you" :class="{rotate: isDownmeun}"></view>
					<view class="meun flex flex-col text_cen" v-if="isDownmeun">
						<text v-for="(gender,sexid) in sex" :key='sexid' @tap.stop="handSex(gender)">{{gender}}</text>
					</view>
				</view>
			</view>
			<view class="flex flex_be list-item line">
				<text class="color3434 font500 font30">专业</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" placeholder="计算机应用" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line">
				<text class="color3434 font500 font30">学号</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" placeholder="2020092011" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<!-- 上传身份证照片 -->
		<view class="font28 color666 cardtit">上传身份证照片</view>
		<view class="bfff cardbox font24 color333 flex">
			<view class="flex flex_al-cen flex_jus-cen flex-col" style="margin-right: 24upx;">
				<image src="../../../static/img/zhengmian.png" mode=""></image>
				<text>上传身份证主页</text>
			</view>
			<view class="flex flex_al-cen flex_jus-cen flex-col">
				<image src="../../../static/img/fanmian.png" mode=""></image>
				<text>上传身份证副页</text>
			</view>
		</view>
		<view class="commbtn text_cen colorfff">确认提交</view>
		<comminput v-if="iscomminput" :username='username' @Gusername='Gusername'></comminput>
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
				gender: '男',
				username:'王小二'
			}
		},
		computed: {
			...mapState({
				iscomminput: (state) => state.iscomminput,
			}),
		},
		methods: {
			handDownmeun() {
				this.isDownmeun = true
			},
			handSex(gender) {
				this.gender = gender
				this.isDownmeun = false
			},
			GOpersonInput() {
				this.$store.commit("Showcomminput", true);
			},
			Gusername(data){
				console.log(data)
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
	.cardtit{
		margin: 20upx 32upx 32upx 32upx;
	}
	.cardbox{
		padding: 30upx;
		image{
			margin-bottom: 16upx;
			width: 330upx;
			height: 200upx;
		}
	}
	.nickname {
		margin-left: 240upx;
	}
</style>
