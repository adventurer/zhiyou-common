<template name="home">
	<view class="">
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">知游加速</block>
		</cu-custom>
		
		<view style="margin-bottom:50px;">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
			
			<!-- 宫格图标开始 -->
			<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<radio-group class="block" @change="Gridchange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in 3" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{index +3}} 列</view>
									<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="cu-list menu text-left solid-top">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">边框</text>
							</view>
							<view class="action">
								<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="menuClick(item.nameEn)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- 宫格图标结束 -->
			
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 消息
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item " v-for="(item,index) in articles" @click="NaviToArticle(item.ID)">
					<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
					<view class="content">
						<view class="text-pink"><view class="text-cut">{{item.Name}}</view></view>
						<view class="text-gray text-sm flex"> <view class="text-cut">{{item.CreatedAt}}</view></view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.Created}}</view>
					</view>
				</view>
				
			</view>
			</scroll-view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<ad unit-id="adunit-bebcfa8da6c5f5bb" ad-type="video" ad-theme="white"></ad>
				</view>
			</view>
			
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cuIconList: [{
					cuIcon: 'scan',
					color: 'red',
					badge: 0,
					nameEn: 'scan',
					name: '扫码'
				}, {
					cuIcon: 'recharge',
					color: 'orange',
					badge: 0,
					nameEn: 'bids',
					name: '充值记录'
				}, {
					cuIcon: 'friend',
					color: 'olive',
					badge: 0,
					nameEn: 'friends',
					name: '官方群'
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '', 
				articles:[],
			};
		},
		mounted() {
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			let that = this
			wx.request({ 
				url: 'https://admin.jiasu.zhifool.com/api/v1/article/list',
				data: {
					openid: that.$store.state.openid,
				}, 
				header: {
				    'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				method:"POST",
				success (res) {
					console.log(res.data)
					that.articles = res.data.Data
					
					
				}
			})
		}, 
		
		methods: {
			menuClick(e){
				if(e =="scan"){
					wx.scanCode({
					  onlyFromCamera: true,
					  success (res) {
					    console.log(res)
						let sat = res.result.indexOf("=")
						let clientid = res.result.substr(sat)
						wx.navigateTo({
						  url: "/pages/login/login?q"+clientid
						})
					  }
					})
				}
				
				if(e =="bids"){ 
					wx.navigateTo({
					  url: "/pages/bids/bids"
					})
				}
				
				if(e =="friends"){
					wx.navigateTo({
					  url: "/pages/friends/friends"
					})
				}
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			NaviToArticle(id){
				wx.navigateTo({
				  url: '/pages/article/article?id='+id,
				  events: {
				    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				    // acceptDataFromOpenedPage: function(data) {
				    //   console.log(data)
				    // },
				    // someEvent: function(data) {
				    //   console.log(data)
				    // }
				  },
				  success: function(res) {
				    // 通过eventChannel向被打开页面传送数据
				    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
				  }
				})
			}
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
