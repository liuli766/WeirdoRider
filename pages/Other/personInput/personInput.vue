<template>
	<view class="personinput comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<commoninput @back='handback' @Keep='handKeep' :key='ids'>
			<view class="nickname" slot='nickname'>{{title}}</view>
			<input type="text" v-model="subName" slot="inputcontent"/>
		</commoninput>

	</view>

</template>

<script>
	import commoninput from '@/components/commoninput/commoninput.vue'
	export default {
		components: {
			commoninput,
		},
		data() {
			return {
				show: false,
				title: '',
				subName:'',
				ids:''
			}
		},
		onLoad: function(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item)
			this.title = item.name
			this.subName = item.placeholder
			this.ids= item.ids
		},
		methods: {
			handback() {
				uni.navigateBack(1)
			},
			handKeep(){
				let subName = this.subName
				uni.navigateTo({
					url:'/pages/Other/realName/realName?item='+encodeURIComponent(JSON.stringify(subName))+'&id='+this.ids
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

	.nickname {
		margin-left: 240upx;
	}
	input{
		flex: 1;
	}
</style>
