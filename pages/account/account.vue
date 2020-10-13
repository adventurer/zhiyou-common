<template name="account">
	<view class="">
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">领时长</block>
		</cu-custom>
		
		
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			
			<!-- 头像卡片 -->
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<!-- <view class="cu-avatar round lg" :style="{'backgroundImage':'url('+avatarUrl+')'}"></view> -->
						<view class="userinfo-avatar cu-avatar">
							<open-data type="userAvatarUrl"></open-data>
						</view>
						<view class="content flex-sub">
							<view class="flex justify-between">
								<open-data type="userNickName" class=""></open-data>
								<button @click="freeHours" class="cu-btn bg-red fr" :loading="loading" :disabled="disable">{{btnText}}</button>
							</view>
							<view class="text-sm flex justify-between">
								加速到期时间:<text>{{expiredAt}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 集体补时卡 -->
			<view style="margin-left: 5%;margin-right: 5%;" class="">
				<button @click="teamCardGet()" class="cu-btn block bg-red lg" :loading="loadingCard" :disabled="disableCard">点击使用集体补时卡({{cardTime}}小时)</button>
			</view>
			
			<!-- 提示文字 -->
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub">
					<view class="text-sm padding-sm">
						<text class="text-bold">(1).免费时长为每日零点开始可领取5次.以领取时刻为准,每次领取加速器到期时间将向后顺延2个小时.</text>
					</view>
					<view class="text-sm padding-sm">
						<text class="text-bold">(2).由于广告资源有限,请大家尽量点击广告来提高次日集体补时时长.</text>
					</view>
					<view class="text-sm padding-sm">
						<text class="text-bold">(3).领取免费时长时若进行了广告点击,将增加次日集体补时卡时间（最长14小时）,具体时间由当日广告收益得出.只有前一天领取过免费时长的用户才能领取集体补时卡</text>
					</view>
				</view>
			</view>
			
			
			<!-- 广告 -->
			<view style="margin-bottom: 80rpx;" class="padding flex flex-wrap align-center">
				<ad  unit-id="adunit-bebcfa8da6c5f5bb" ad-type="video" ad-theme="white"></ad>
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
				board:"",
				// videoAd:null,
				btnText:"领免费时长(0/5)",
				loading:false,
				disable:'',
				loadingCard:false,
				disableCard:'',
				cardTime:null,
			}
		},
		mounted() {
			// 查询领取次数
			this.checkCount()
			//查询集体补时卡时间
			this.teamCardTimeCheck()
			//获取账户基本信息
			let that = this
			wx.request({ 
				url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microuinfo',
				data: {
					openid: that.$store.state.openid,
				}, 
				header: {
				    'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				method:"POST",
				success (res) {
					console.log(res.data)
					// that.expiredAt = res.data.Data.ExpiredAt
					that.nickName = res.data.Data.NickName
					that.avatarUrl = res.data.Data.HeadImgURL
					console.log(res.data.Data.ExpiredAt)
					
					
					
					that.expiredAt = new Date(res.data.Data.ExpiredAt).Format ("yyyy-MM-dd hh:mm:ss");
					// that.expiredAt = d.toLocaleString()
					// that.expiredAt = d
				}
			})
			
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			  if(that.$store.state.account_videoAd == null){
				  console.log(that.$store.state.account_videoAd)
				  console.log("ad init ...")
				  that.initAd()
			  }
			  
			  
			}
			
		},
		methods: {
			teamCardTimeCheck(){
				let that = this
				wx.request({
					url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microteamcardtimecheck',
					data: {
						openid: that.$store.state.openid,
					}, 
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					method:"POST",
					success (res) {
						that.cardTime = res.data.Data
					}
				})
			},
			teamCardGet(){
				let that = this
				that.loadingCard = true
				that.disableCard = 'disabled'
				wx.request({
					url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microteamcardget',
					data: {
						openid: that.$store.state.openid,
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
							  // 请求领取完毕
							  that.checkCount()
							  that.loadingCard = false
							  that.disableCard = ''
						  }
						})
					}
				})

			},
			initAd(){
				let that = this
				that.$store.state.account_videoAd = wx.createRewardedVideoAd({
				  adUnitId: 'adunit-75385a75bf02c5a3'
				})
				// console.log(that.$store.state.account_videoAd)
				that.$store.state.account_videoAd.onLoad(() => {})
				that.$store.state.account_videoAd.onError((err) => {
					wx.showModal({
					  title: '获取广告失败',
					  content: "由于没有适合您的广告,暂时无法领取",
					  showCancel:false,
					  success (res) {
						  // 广告拉取错误
						  that.loading = false
						  that.disable = ''
					  }
					})
				})
				that.$store.state.account_videoAd.onClose((res) => {
					that.loading = false
					that.disable = ''
					// that.$store.state.account_videoAd.onLoad(() => {})
					  if (res && res.isEnded) {
						//领取操作 
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
								wx.showModal({
								  title: '提示',
								  content: res.data.Msg,
								  showCancel:false,
								  success (res) {
									  // 请求领取完毕
									  that.checkCount()
									  
								  }
								})
							}
						})
						
					  } else {
						wx.showModal({
						  title: '提示',
						  content: "您提前中断了视频广告,无法获得时长奖励",
						  showCancel:false,
						  success (res) {
							  // 请求领取完毕

						  }
						})
					  }
				})
			},
			
			freeHours(){
				let that = this
				that.loading = true
				that.disable = 'disabled'
				wx.showToast({
				  title: '点击广告将为知游戏带来收益,并增加明日集体时长',
				  icon: 'none',
				  duration: 3000
				})
				
				// 用户触发广告后，显示激励视频广告
				if (that.$store.state.account_videoAd) {
				  that.$store.state.account_videoAd.show().catch(() => {
				    // 失败重试
				    that.$store.state.account_videoAd.load()
				      .then(() => that.$store.state.account_videoAd.show())
				      .catch(err => {
				        wx.showModal({
				          title: '获取广告重试失败',
				          content: "由于没有适合您的广告,暂时无法领取",
				          showCancel:false,
				          success (res) {
				        	  
				          }
				        })
				      })
				  })
				}
				
				
			},
			checkCount(){
				let that = this
				wx.request({
					url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microfreehourcount',
					data: {
						openid: that.$store.state.openid,
					}, 
					header: {
					    'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					method:"POST",
					success (res) {
						that.btnText = "领免费时长("+res.data.Data+"/5)"
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

.page {
		height: 100vh;
	}
</style>
