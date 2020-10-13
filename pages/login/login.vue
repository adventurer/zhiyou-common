<template name="login">
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">知游加速登录</block>
		</cu-custom>
		<view class="btn_login">
			<!-- <button @tap="login()" open-type='getUserInfo' class="cu-btn block bg-black margin-tb-sm lg" :loading="loading"> 点击登录</button> -->
			<button @getuserinfo="handleGetUserInfo" open-type='getUserInfo' class="cu-btn block bg-blue margin-tb-sm lg" :loading="loading" :disabled="disable" type="">{{loginText}}</button>
		</view>
		
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub">
				<view class="text-xl padding text-center">
					<text class="text-black text-bold ">登录说明</text>
				</view>
				<view class="padding">1.点击登录将打开30秒视频广告,此时后台将在广告播放进行时打开加速器.若10秒内未弹出加速器界面,您可以关闭广告和小程序重新扫码尝试登录.</view>
				<view class="padding">2.由于可弹出的广告数量有限,请尽量点击广告来延长次日集体补时时长.</view>
			</view>
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
				adshow:false,
				loginText:"点击观看广告并登录",
				videoAd:null,
			};
		},
		onLoad: function (options) {
			console.log("login onload...")
			var url = decodeURIComponent(options.q)
			console.log(options)
			var sat = url.indexOf('=')
			console.log(sat)
			var val = url.substr(sat+1) 
			this.clientid = val
			this.info = this.$store.state
			
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			  this.videoAd = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-414e4f5508476e77'
			  })
			  this.videoAd.onLoad(() => {
				  console.log("ad loaded...")
			  })
			  this.videoAd.onError((err) => {
				  wx.showModal({
				    title: '提示',
				    content: err.errMsg,
				    showCancel:false,
				    success (res) {
				  	  if (res.confirm) {
				  	    wx.redirectTo({
				  	      url: '/pages/index/index'
				  	    })
				  	  }
				    }
				  })
			  })
			  this.videoAd.onClose((res) => {
					if (res && res.isEnded) {
						wx.showModal({
						  title: '提示',
						  content: "广告播放完成,感谢您的鼓励,将跳转到首页",
						  showCancel:false,
						  success (res) {
							  if (res.confirm) {
							    wx.redirectTo({
							      url: '/pages/index/index'
							    })
							  }
						  }
						})
					} else {
						wx.showModal({
						  title: '提示',
						  content: "由于您提前关闭了视频广告,我们将无法取得任何服务经费",
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
			

			
		},
		methods: {
			handleGetUserInfo(e) {
				let that = this
				// 准备clientid
				if(that.clientid == null){
					wx.showModal({
					  title: '提示',
					  content: "clientid未准备好,请重新扫码",
					  showCancel:false,
					  success (res) {
					  }
					})
					return
				}
				// 准备openid
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
				
				
				// 用户触发广告后，显示激励视频广告
				if (this.videoAd) {
				  this.videoAd.show().catch(() => {
				    // 失败重试
				    this.videoAd.load()
				      .then(() => this.videoAd.show())
				      .catch(err => {
				        console.log('激励视频 广告显示失败')
				      })
				  })
				}
				
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
							if(res.data.Sta == 0){
								wx.showModal({
								  title: '提示',
								  content: res.data.Msg,
								  showCancel:false,
								  success (res) {
								    
								  }
								})
							}
					  		
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
