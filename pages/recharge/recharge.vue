<template name="recharge">
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">充值</block>
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				{{text}}
			</view>
		</view>
		
		<scroll-view scroll-y class="page">
			<view class="nav-list" style="margin-top: 80rpx;">
				<view @tap="recharge(item.Fee)" style="width: 100%;" hover-class='none' :open-type='none' class="nav-li" :class="'bg-'+item.Color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.Title}}</view>
					<view class="nav-name">{{item.Name}}</view>
					<text :class="'cuIcon-' + item.CuIcon"></text>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				elements: [
					// {
					// 	Title: '充值一个月',
					// 	Name: '获得30天/10元',
					// 	Color: 'purple',
					// 	CuIcon: 'vipcard',
					// 	Fee:1
					// },
					// {
					// 	Title: '充值三个月',
					// 	Name: '获得100天/30元',
					// 	Color: 'mauve',
					// 	CuIcon: 'vipcard',
					// 	Fee:3
					// },
					// {
					// 	Title: '充值一年',
					// 	Name: '获得400天/120元',
					// 	Color: 'red',
					// 	CuIcon: 'vipcard',
					// 	Fee:12
					// }
				],
				timeStamp: '',
				nonceStr: '',
				package: '',
				signType: 'MD5',
				paySign: '',
				text:'由于相关规范,ios功能暂不可用',
			};
		},
		mounted() { 
			let that = this
			wx.request({
				url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microrechargesetting',
				data: {
				}, 
				header: { 
				    'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				method:"POST",
				success (res) {
					
					let sysinfo = wx.getSystemInfoSync()
					if(sysinfo.brand != "iPhone"){
						that.elements = res.data.Data
						that.text = "请点选卡片进行充值"
					}
					
					
				}
			})
		},
		methods: {
			recharge(index) {
				this.commitTicket(index)

			},
			async commitTicket(index){
				let that = this
				wx.request({ 
					url: 'https://admin.jiasu.zhifool.com/api/v1/weixin/microrecharge',
					data: {
						openid: that.$store.state.openid,
						fee:index
					}, 
					header: {
					    'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					method:"POST",
					success (res) {
						console.log(res.data.Sta)
						if(res.data.Sta==0){
							// wx.showModal({
							//   title: '提示',
							//   content: '获取订单失败',
							//   success (res) {
							//     if (res.confirm) {
							//       console.log('用户点击确定')
							//     } else if (res.cancel) {
							//       console.log('用户点击取消')
							//     }
							//   }
							// })
							return false
						}else{
							that.timeStamp = res.data.Data.timestamp
							that.nonceStr = res.data.Data.nonceStr
							that.package = res.data.Data.package
							that.paySign = res.data.Data.paySign
							that.signType = res.data.Data.signType
							that.commitPay()
							return true
						}
						
					}
				})
			},
			async commitPay(){
				let that = this
				wx.requestPayment({
				  timeStamp: that.timeStamp,
				  nonceStr: that.nonceStr,
				  package: that.package,
				  signType: that.signType,
				  paySign: that.paySign,
				  success (res) { 
					  // console.log(res)
				  },
				  fail (res) { 
					  // console.log(res)
				  }
				})	
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>