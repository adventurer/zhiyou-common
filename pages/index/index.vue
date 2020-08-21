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
		
		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view> 
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view>
		</view> -->
		<!-- <view class="cu-bar tabbar bg-white foot">
			<view class="action text-green" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill" :class="PageCur=='home'?'text-green':'text-gray'"></view> 首页
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="basics">
				<view class="cuIcon-similar" :class="PageCur=='basics'?'text-green':'text-gray'"></view> 元素
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				扫一扫
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="component">
				<view class="cuIcon-cart">
					<view class="cu-tag badge" :class="PageCur=='component'?'text-green':'text-gray'">99</view>
				</view>
				组件
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-my">
					<view class="cu-tag badge" :class="PageCur=='plugin'?'text-green':'text-gray'"></view>
				</view> 
				扩展
			</view>
		</view> -->
		
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill text-green">
				</view>
				首页
			</button> 
			<view class="action text-orange" @click="NavChange" data-cur="account">
				<view class="cuIcon-profilefill"></view> 账户中心
			</view>
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
