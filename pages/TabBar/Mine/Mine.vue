<template>
	<view class="mine comm">
		<view class="person-box">
			<image src="../../../static/img/personbg.png" mode=""></image>
			<view class="mine-box flex flex_al-cen">
				<view class="flex flex_al-cen">
					<image src="../../../static/img/head.png" mode="" class="mine-img"></image>
					<view class="flex flex-col">
						<text class="bold font36 colorfff lh">我是一名小保安</text>
						<text class="font500 colorfff font28 mine-tel lh">13000000000</text>
					</view>
					<view class="font500 font24 unauthorized text_cen">未认证</view>
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
				<view class="flex flex_be list-item">
					<text class="color3434 font500 font30">工作设置</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
			<view class="flex flex_be list-item" @tap="GohandBook">
				<text class="color3434 font500 font30">骑手手册</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			GoAccountSet(){
				uni.navigateTo({
					url:'../../Other/AccountSet/AccountSet'
				})
			},
			GohandBook(){
				uni.navigateTo({
					url:'../../Other/handbook/handbook'
				})
			},
			GorealName(){
				uni.navigateTo({
					url:'../../Other/realName/realName'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person-box{
		image{
			width: 100%;
			height: 180upx;
			position: relative;
		}
		.mine-box{
			position: absolute;
			top: 41upx;
			left: 31upx;
			.mine-tel{
				opacity: 0.6;
				margin-top: 23upx;
			}
			.mine-img{
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 29upx;
			}
			.unauthorized{
				color: #FFAC68;
				width: 100upx;
				height: 34upx;
				border: 1upx solid #FFAC68;
				border-radius: 4upx;
				line-height: 34upx;
				margin-left: 20upx;
				margin-right: 170upx;
				align-self: flex-start;
				margin-top: 10rpx;
			}
		}
		.list-item{
			height: 88upx;
			background: #fff;
			line-height: 88upx;
			padding: 0 30upx;
		}
		.line{
			border-bottom: 1px solid #EEEEEE;
		}
	}

</style>
