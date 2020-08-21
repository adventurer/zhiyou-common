<template name="article">
	<view>
		<!-- <cu-custom bgColor="bg-gradual-pink">
			<block slot="content">消息中心</block>
		</cu-custom> -->
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">消息中心</block>
		</cu-custom>
		
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">{{detail.Name}}</text>
				</view>
				<rich-text :nodes="detail.Content" class="padding"></rich-text>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		data() {
			return { 
				detail:{},
			}
		},
		onLoad: function (options) {
			console.log(options.id)
			let that = this
			wx.request({ 
				url: 'https://admin.jiasu.zhifool.com/api/v1/article/detail?id='+options.id,
				data: {
					openid: that.$store.state.openid,
				}, 
				header: {
				    'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				method:"POST",
				success (res) {
					console.log(res.data)
					that.detail = res.data.Data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
