<template name="login">
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">知游加速登录</block>
		</cu-custom>
		<view class="btn_login">
			<!-- <button @tap="login()" open-type='getUserInfo' class="cu-btn block bg-black margin-tb-sm lg" :loading="loading"> 点击登录</button> -->
			<button @getuserinfo="handleGetUserInfo" open-type='getUserInfo' class="cu-btn block bg-blue margin-tb-sm lg" :loading="loading" :disabled="disable" type="">点击登录</button>
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
			handleGetUserInfo(e) {
				let that = this
				if(that.$store.state.openid == null){
					wx.showModal({
					  title: '提示',
					  content: "稍等,数据还未准备完成",
					  showCancel:false,
					  success (res) {
					  }
					})
					return
				}
				that.loading = true
				that.disable = 'disabled'
				
				console.log("handle...")
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
						  // that.loginDo()
						  console.log("手动授权")
						},
						fail() {
						  wx.showModal({
						    title: '提示',
						    content: "需要获得授权才能登录",
						    showCancel:false,
						    success (res) {
						    }
						  })
						}
					  })
					} else {
					  console.log("自动授权")
					  wx.request({
					  	url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/micrologin',
					  	data: {
					  		openid: that.$store.state.openid,
					  		nickname: e.detail.userInfo.nickName,
					  		avatarurl: e.detail.userInfo.avatarUrl,
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
				  }
				})
			    // console.log(e.detail)
			},
			login() {
				console.log("login...")
				let that = this
				that.loading = true
				that.disable = 'disabled'
				
				
				// wx.getSetting({
				// 	//获取成功后进入
				//   success(res) {
				// 	console.log("res", res.authSetting['scope.userInfo'])
				// 	  //authSetting是这个权限的列表，这一句是看里面有没有录音这个权限
				// 	if (!res.authSetting['scope.userInfo']) {
				// 		//没有权限的话就会走这一句，这个方法的作用是获取权限
				// 	  wx.authorize({
				// 		  //固定写法权限就是scope.xxx这样的
				// 		scope: 'scope.userInfo',
				// 		success() {
				// 		  that.loginDo()
				// 		},
				// 		fail() {
				// 		  console.log("你没有授权")
				// 		  wx.showModal({
				// 		    title: '提示',
				// 		    content: "需要获得授权才能登录",
				// 		    showCancel:false,
				// 		    success (res) {
				// 		    }
				// 		  })
				// 		}
				// 	  })
				// 	} else {
				// 	  that.loginDo()
				// 	}
				//   }
				// })
				// console.log(res)
				// console.log(that)
				
			},
			loginDo(){
				console.log("loginDo...")
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
