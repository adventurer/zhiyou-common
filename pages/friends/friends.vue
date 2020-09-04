<template name="friends">
	<view class="">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">官方群</block>
		</cu-custom>
		
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="/static/qun.jpg" mode="widthFix"></image>
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	export default { 
		data() {
			return {
				expiredAt:null,
				nickName:null,
				avatarUrl:"http://admin.jiasu.zhifool.com:8080/uploads/about.png",
				bids:{},
			}
		},
		mounted() {
			
			
			
		},
		methods: {
			freeHours(){
				let that = this
				wx.request({
					url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microfreehours',
					data: {
						openid: that.$store.state.openid,
					}, 
					header: {
					    'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					method:"POST",
					success (res) {
						console.log(res.data)
						wx.showModal({
						  title: '提示',
						  content: res.data.Msg,
						  showCancel:false,
						  success (res) {
						    if (res.confirm) {
						      console.log('用户点击确定')
						    } else if (res.cancel) {
						      console.log('用户点击取消')
						    }
						  }
						})
					}
				})
			}
		}
	}
</script>

<style>
.userinfo-avatar {
	overflow:hidden;  
	display: block;  
	width: 100rpx;  
	height: 100rpx;  
 
	border-radius: 50%;  
	border: 2px solid #fff;  
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);  
}  
</style>
