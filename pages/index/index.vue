<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<account v-if="PageCur=='account'"></account>
		<basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<recharge v-if="PageCur=='recharge'"></recharge>
		<login v-if="PageCur=='login'"></login>
		<article v-if="PageCur=='article'"></article>
		<bids v-if="PageCur=='bids'"></bids> 
		
		
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill text-green">
				</view>
				首页
			</button> 
			<view class="action text-orange" @click="NavChange" data-cur="account">
				<view class="cuIcon-profilefill"></view> 账户中心
			</view>
			<!-- <button class="action text-orange" open-type="contact">
				<view class="cuIcon-communityfill"></view> 客服
			</button> -->
			<!-- <view class="action text-orange" @click="NavChange" data-cur="basics">
				<view class="cuIcon-profilefill"></view> 基本
			</view>
			<view class="action text-orange" @click="NavChange" data-cur="component">
				<view class="cuIcon-profilefill"></view> 组件
			</view> -->
			<view class="bg-red submit" @click="NavChange" data-cur="recharge">充值</view>
		</view>
	</view> 
</template> 

<script>
	export default { 
		data() { 
			return {
				PageCur: 'home',
				// PageCur: 'article',
				// PageCur: 'account',
				// PageCur: 'login',
				// PageCur: 'recharge',
				// PageCur: 'bids',

			} 
		},
		onLoad() {
			
			
			
			
		}, 
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				console.log(this.PageCur)
			},
		}
	}
</script>

<style>

</style>
