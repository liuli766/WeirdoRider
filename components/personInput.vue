<template>
	<view class="personinput comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" @tap="handback" style="color: #333333 !important;"></view>
			<view class="nickname">{{userinfoList.name}}</view>
		</view>
		<view class="person-input mt30 flex flex_al-cen font500 font30 color666">
			<input type="text"   v-model="userinfoList.placeholder"/>
			<text class="keep" @tap="handKeep(userinfoList)">保存</text>
		</view>

	</view>

</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		props:{
			userinfoList:{
				type:Object,
				default: function() {
					return {}
				}
			},
			idNum:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				show: false,
				
			}
		},
		onLoad() {
			console.log(this.userinfoList)
		},
		computed: {
			...mapState({
				iscomminput: (state) => state.iscomminput,
			}),
		},
		methods: {
			handback() {
				this.$store.commit("Showcomminput", false);
			},
			handKeep(item){
				this.$emit('handKeep',item.placeholder);
				console.log(item.placeholder)
				this.$store.commit("Showcomminput", false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comm{
		background-color: #F7F9FA;
		height: 100%;
		position: absolute;
		width: 100%;
		overflow: auto;
		z-index: 9;
		top: 0;
		transition: all .2s;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		height: 88upx;
		background: #fff;
	}

	.nickname {
		margin-left: 240upx;
	}
	input{
		flex: 1;
	}
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
