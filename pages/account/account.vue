<template name="account">
	<view class="">
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">账户中心</block>
		</cu-custom>
		
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
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
								<button @click="freeHours" class="cu-btn bg-red fr">领免费时长</button>
							</view>
							<view class="text-sm flex justify-between">
								当前有效期至:<text>{{expiredAt}}</text>
							</view>  
						</view>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button @click="copyOpenid()" class="cu-btn bg-mauve margin-tb-sm lg">复制openid</button>
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
			}
		},
		mounted() {
			
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
					that.expiredAt = res.data.Data.ExpiredAt
					that.nickName = res.data.Data.NickName
					that.avatarUrl = res.data.Data.HeadImgURL
					
					
				}
			})
			
			
			
			
		},
		methods: {
			copyOpenid(){
				let that = this
				wx.setClipboardData({
				  data: that.$store.state.openid,
				  success (res) {
				    wx.getClipboardData({
				      success (res) {
				        wx.showModal({
				          title: '提示',
				          content: "已复制openid到剪辑板",
				          showCancel:false,
				          success (res) {
				          }
				        })
				      }
				    })
				  }
				})
			},
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
