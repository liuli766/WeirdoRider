<template>
	<view class="comm">
		<view class="font28 font500 real-tit">
			请认真填写，<text class="real-rz">一经认证不可更改</text>
		</view>
		<view class="mb30">
			<view class="flex flex_be list-item line" v-for="(item,i) in realnameList" :key='item.ids' @tap="personInput(item,i)">
				<text class="color3434 font500 font30" v-if="i!==2">{{item.name}}</text>
				<view class="flex flex_al-cen flex_jus-cen" v-if="i!==2">
					<input type="text" :placeholder="item.placeholder" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
				<text class="color3434 font500 font30" v-if="i==2">{{item.name}}
				</text>
				<view class="flex flex_al-cen flex_jus-cen meun-name" v-if="i==2" @tap.stop="handDownmeun">
					<input type="text" :placeholder="gender" disabled />
					<view class="icon-yjt iconfont icon-you" :class="{rotate: isDownmeun}"></view>
					<view class="meun flex flex-col text_cen" v-if="isDownmeun">
						<text v-for="(gender,sexid) in sex" :key='sexid' @tap.stop="handSex(gender)">{{gender}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realnameList:[
					{   ids:0,
						name:'姓名',
						placeholder:'王小二'
					},
					{	ids:1,
						name:'身份证号',
						placeholder:'请填写你的身份证'
					},
					{	ids:2,
						name:'性别',
						placeholder:'男'
					},
					{	ids:3,
						name:'专业',
						placeholder:'计算机应用'
					},
					{	ids:4,
						name:'学号',
						placeholder:'2020092011'
					},
				],
				isDownmeun:false,
				sex:['男','女'],
				gender:'男'
			}
		},
		onLoad: function(option) {
			if(option.item!==undefined){
				const subitem = JSON.parse(decodeURIComponent(option.item));
				console.log(subitem)
				this.realnameList.map((item,k)=>{
					if(k==option.id){
						item.placeholder=subitem
					}
				})
				console.log(option.id)
			}
		},
		methods: {
			personInput(item,i){
				if(i!==2){
					uni.navigateTo({
						url:'/pages/Other/personInput/personInput?item='+encodeURIComponent(JSON.stringify(item))
					})
				}
			},
			handDownmeun(){
				this.isDownmeun=true
			},
			handSex(gender){
				this.gender=gender 
				this.isDownmeun=false
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	/deep/.rotate{
		transform: rotate(90deg) !important;
		transition: all .2s;
	}
	.meun-name{
		position: relative;
		.meun{
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
			text:hover{
				background: #F7F9FA;
			}
		}
	}
	
</style>
