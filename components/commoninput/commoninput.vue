<template>
	<view>
		<view class="mb30 flex person-nav">
			<view class="back iconfont icon-iconfont-left font50" @tap="handback"></view>
			<slot name="nickname"></slot>
		</view>
		<view class="person-input mt30 flex flex_al-cen font500 font30 color666">
			<slot name="inputcontent"></slot>
			<text class="keep" @tap="handKeep">保存</text>
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
			handback(){
				this.$emit('back');
			},
			handKeep(){
				this.$emit('Keep');
			}
		}
	}
</script>

<style lang="scss" scoped>
		.person-nav {
			padding-left: 10upx;
			background: #fff;
			padding-bottom: 27upx;
			box-sizing: border-box;
			height: 100rpx;
			padding-top: 30rpx;
		}
		.person-input{
			height: 88upx;
			padding: 30upx 32upx;
			background: #fff;
			box-sizing: border-box;
			.keep{
				padding-left: 21upx;
				border-left: 1px solid #EEEEEE;
			}
		}
</style>
