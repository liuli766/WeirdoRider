<template>
	<view class="handbook comm">
		<view class="mb30 font500 bfff book-box">
			<view class="bold font32 color3434 book-xy">用户协议</view>
			<view class="font28 color666 book-p">
				{{data1}}
			</view>
		</view>
		<view class="mb30 font500 bfff book-box mt30">
			<view class="bold font32 color3434 book-xy">入驻须知</view>
			<view class="font28 color666 book-p" v-html="data2">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data1: '',
				data2: ''
			}
		},
		onLoad() {
			this.getxieyi();
		},
		methods: {
			getxieyi() {
				this.request.getdata('getxieyi').then(res => {
					console.log(res, '协议')
					this.data1 = res.data1.info
					this.data2 = res.data2.info
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.handbook {
		.book-box {
			padding: 40upx 30upx 17upx 30upx;

			.book-p {
				line-height: 52upx;
				text-align: justify;
			}

			.book-xy {
				margin-bottom: 18rpx;
			}
		}

	}
</style>
