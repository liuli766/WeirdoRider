<template>
	<view class="popbox" v-if="isPop">
		<view class="popup text_cen">
			<view class="pop">
				<image src="../../static/img/succss.png" class="success"></image>
				<slot name="successtxt"></slot>
				<slot name="subtet"></slot>
				<slot name="btnpop"></slot>
			</view>
			<slot name="img">
				<image src="../../static/img/close.png" mode="" class="close" @tap.stop="Close"></image>
			</slot>
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
				
			}
		},
		props:{
			detail:{
				type:[Object,Array],
				default: function() {
					return {}
				}
			},
			pick:{
				type:[Object,Array],
				default: function() {
					return {}
				}
			}
		},
		computed: {
		    ...mapState({
				isPop: (state) => state.isPop,
				order: (state) => state.order,
			}),
		},
		methods: {
			Close(){
				this.$store.commit("showPop", false);
			},
			Pickup(lat, log, name) {
				this.$emit('ChildPickup',lat, log, name)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popbox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		z-index: 10;
		.popup{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left:-280upx ;
			margin-top: -276.5upx;
			.pop{
				width: 560upx;
				height: 553upx;
				background: #FFFFFF;
				border-radius: 20upx;
				padding-top: 74upx;
				.success{
					width: 150upx;
					height: 158upx;
				}
			}
			.close{
				width: 80upx;
				height: 80upx;
				margin-top: 110upx;
			}
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
	
</style>
