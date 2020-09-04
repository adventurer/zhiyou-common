<template name="bids">
	<view class="">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">充值记录</block>
		</cu-custom>
		
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">只显示最后10条！</text>
				</view>
			</view>
		</view>
		
		<view class="padding text-center" v-if="loading">
			<view class="padding-xl radius shadow shadow-lg bg-blue margin-top">
				{{tips}}
			</view>
		</view>
		
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu">
					<view class="cu-item" :class="menuArrow?'arrow':''" v-for="(item,index) in bids">
						<view class="content padding-tb-sm">
							<view>
								<text class="text-blue margin-right-xs"></text>{{item.Name}}</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill margin-right-xs"></text>{{item.CreatedAt}}</view>
						</view>
						<view class="action">
							<view class="solid-bottom text-xxl padding">
								<text v-if="item.Status==2" class="cuIcon-roundcheckfill text-green"></text>
								<text v-if="item.Status==1" class="cuIcon-roundcheckfill red"></text>
							</view>
						</view>
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
				expiredAt:null,
				nickName:null,
				avatarUrl:"http://admin.jiasu.zhifool.com:8080/uploads/about.png",
				bids:{},
				loading:true,
				tips:"充值记录加载中!"
			}
		},
		mounted() {
			
			//获取账户基本信息
			let that = this  
			// wx.request({ 
			// 	url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microuinfo',
			// 	data: {
			// 		openid: that.$store.state.openid,
			// 	}, 
			// 	header: {
			// 	    'content-type': 'application/x-www-form-urlencoded' // 默认值
			// 	},
			// 	method:"POST",
			// 	success (res) {
			// 		console.log(res.data)
			// 		that.expiredAt = res.data.Data.ExpiredAt
			// 		that.nickName = res.data.Data.NickName
			// 		that.avatarUrl = res.data.Data.HeadImgURL
					
					
			// 	}
			// })
			 
			wx.request({
				url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microrechargelog',
				data: {
					openid: that.$store.state.openid,
				}, 
				header: {
				    'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				method:"POST",
				success (res) {
					// console.log(res.data)
					if(res.data.Sta == 0){
						wx.showModal({
						  title: '提示',
						  content: res.data.Msg,
						  showCancel:false,
						  success (res) {
						  }
						})
					}else{
						that.bids = res.data.Data
						if(that.bids.length == 0){
							that.tips = "您还没有充值记录"
						}else{
							that.loading = false
						}
					}
					
					
					
				}
			})
			
			
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
