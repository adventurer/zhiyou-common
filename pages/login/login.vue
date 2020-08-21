<template name="login">
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">知游加速登录</block>
		</cu-custom>
		<view class="btn_login">
			<!-- <button @tap="login()" open-type='getUserInfo' class="cu-btn block bg-black margin-tb-sm lg" :loading="loading"> 点击登录</button> -->
			<button @tap="login()" open-type='getUserInfo' class="cu-btn block bg-blue margin-tb-sm lg" :loading="loading" :disabled="disable" type="">点击登录</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clientid:null,
				info:{},
				loading:false,
				disable:'',
			};
		},
		onLoad: function (options) {
			console.log("login onload run...") 
			console.log(this)
			var url = decodeURIComponent(options.q)
			console.log(url)
			var sat = url.indexOf('=')
			var val = url.substr(sat+1) 
			this.clientid = val
			this.info = this.$store.state
		},
		methods: {
			login() {
				let that = this
				that.loading = true
				that.disable = 'disabled'
				
				wx.getSetting({
					//获取成功后进入
				  success(res) {
					console.log("res", res.authSetting['scope.userInfo'])
					  //authSetting是这个权限的列表，这一句是看里面有没有录音这个权限
					if (!res.authSetting['scope.userInfo']) {
						//没有权限的话就会走这一句，这个方法的作用是获取权限
					  wx.authorize({
						  //固定写法权限就是scope.xxx这样的
						scope: 'scope.userInfo',
						success() {
						  that.loginDo()
						},
						  //在失败前就已经调用了上面的获取权限，如果没有给权限的话，就会走这个方法。
						fail() {
						  console.log("你没有授权")
						}
					  })
					} else {
					  that.loginDo()
					}
				  }
				})
					
				
				 
				// console.log(res)
				console.log(that)
				
			},
			loginDo(){
				let that = this
				wx.getUserInfo({
				  success: function(res) {
				    that.info.nickName = res.userInfo.nickName
				    that.info.avatarUrl = res.userInfo.avatarUrl
					
					
					wx.request({
						url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/micrologin',
						data: {
							openid: that.$store.state.openid,
							nickname: that.info.nickName,
							avatarurl: that.info.avatarUrl,
							clientid: that.clientid
						}, 
						header: {
						    'content-type': 'application/x-www-form-urlencoded' // 默认值
						},
						method:"POST",
						success (res) {
							wx.showModal({
							  title: '提示',
							  content: res.data.Msg,
							  showCancel:false,
							  success (res) {
							    if (res.confirm) {
							      wx.redirectTo({
							        url: '/pages/index/index'
							      })
							    }
							  }
							})
						}
					})
				  }
				})
			}
		}
	}
</script>

<style>
.btn_login{
	margin: 50rpx;
}
</style>
