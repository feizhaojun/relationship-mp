<template>
	<view class="app" data-v-app="">
		<view class="wrapper" data-v-8ee9a716="">
			<view class="inner" data-v-8ee9a716="">
				<view class="container" data-v-8ee9a716="">
					<view class="mod-calculator">
						<view class="screen">
							<view class="tip">
								{{tips}}
							</view>
							<view class="input">
								<text>{{input}}</text>
							</view>
							<view class="output">
								<text>{{output}}</text>
							</view>
							<view class="setting">
								<view class="label" @click="handleSex">
									<text>我是 </text>
									<text>男</text>
									<text :class="options.sex===1?'switch':'switch female'"></text>
									<text>女</text>
								</view>
								<!-- <a class="copyright" href="https://passer-by.com/" target="_blank">
								</a> -->
							</view>
						</view>
						<view class="panel">
							<view class="row">
								<view class="col">
									<view class="row">
										<button class="btn-first" data-value="爸爸" data-sex="1" @click="handleButton">
											父
										</button>
									</view>
									<view class="row">
										<button class="btn-first" data-value="哥哥" data-sex="1" @click="handleButton">
											兄
										</button>
									</view>
									<view class="row">
										<button class="btn-first" data-value="弟弟" data-sex="1" @click="handleButton">
											弟
										</button>
									</view>
									<view class="row">
										<button class="btn-first" data-value="儿子" data-sex="1" @click="handleButton">
											子
										</button>
									</view>
								</view>
								<view class="col">
									<view class="row">
										<button data-value="妈妈" @click="handleButton">
											母
										</button>
									</view>
									<view class="row">
										<button data-value="姐姐" @click="handleButton">
											姐
										</button>
									</view>
									<view class="row">
										<button data-value="妹妹" @click="handleButton">
											妹
										</button>
									</view>
									<view class="row">
										<button data-value="女儿" @click="handleButton">
											女
										</button>
									</view>
								</view>
								<view class="col">
									<view class="row">
										<button data-value="back" @click="handleBackspace" :disabled="arr.length===0" :class="arr.length===0?'disable':''">
											←
										</button>
									</view>
									<view class="row">
										<button data-value="老公" :disabled="targetSex===1" data-sex="1" @click="handleButton" :class="targetSex===1?'disable':''">
											夫
										</button>
									</view>
									<view class="row">
										<button class="" data-value="exchange" @click="handleExchange">
											⇌
										</button>
									</view>
									<view class="row">
										<button href="#/help/" class="" @click="handleHelp">
											?
										</button>
									</view>
								</view>
								<view class="col">
									<view class="row">
										<button data-value="reset" @click="handleClear" :disabled="arr.length===0" :class="arr.length===0?'disable':''">
											↻
										</button>
									</view>
									<view class="row">
										<button data-value="老婆" :disabled="targetSex===0" @click="handleButton" :class="targetSex===0?'disable':''">
											妻
										</button>
									</view>
									<view class="row row2">
										<button class="btn-equal" data-value="equal" @click="handleEqual">
											=
										</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<footer data-v-ca1f780f="" data-v-8ee9a716="" style="display: none;">
					<nav data-v-ca1f780f="">
						<a href="#/" class="link-active router-link-exact-active" data-v-ca1f780f=""
						aria-current="page">
							<text class="icon-default" data-v-ca1f780f="">
								称谓
							</text>
						</a>
						<a href="#/chain/" class="" data-v-ca1f780f="">
							<text class="icon-chain" data-v-ca1f780f="">
								关系
							</text>
						</a>
						<a href="#/both/" class="" data-v-ca1f780f="">
							<text class="icon-both" data-v-ca1f780f="">
								两者
							</text>
						</a>
						<a href="#/pair/" class="" data-v-ca1f780f="">
							<text class="icon-pair" data-v-ca1f780f="">
								合称
							</text>
						</a>
					</nav>
				</footer>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="mod-detail">
				<view class="hd">
					<view @click="handleClose">
						返回
					</view>
				</view>
				<view class="bd">
					<view class="h3">
						使用说明
					</view>
					<view class="p">
						<text class="name">
							←
						</text>
						<text>
							删除上一层关系
						</text>
					</view>
					<view class="p">
						<text class="name">
							↻
						</text>
						<text>
							清除所有输入
						</text>
					</view>
					<view class="p">
						<text class="name">
							⇌
						</text>
						<text>
							互称间切换
						</text>
					</view>
					<view class="p">
						开始计算前，先在键盘左上方选择自己的性别
					</view>
				</view>
				<view class="ad">
					<ad unit-id="adunit-026c7d6a4c9ace5f"></ad>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import relationship from 'relationship.js'
	import { onReady, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
	export default {
		data() {
			return {
				options: {
					text: '',		// 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
					// target:'',	    	// 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
					sex: 1,			// 本人性别：0表示女性,1表示男性
					// type: 'default',		// 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
					reverse: false,		// 称呼方式：true对方称呼我,false我称呼对方
					// mode: 'default',		// 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
					// optimal: false,       	// 最短关系：计算两者之间的最短关系
				},
				targetSex: 1,
				tips: '我称呼Ta',
				arr: [],
				input: '',
				output: '',
			}
		},
		onLoad() {
			// 转发和分享到朋友圈
			onShareAppMessage(() => {
				return {
					title:'算算这个亲戚应该怎么称呼？',
					path:'/pages/index/index'
				}
			})
			onShareTimeline(() => {
				return {
					title:'算算这个亲戚应该怎么称呼？',
					path:'/pages/index/index'
				}
			});
		},
		methods: {
			handleSex() {
				this.options.sex = this.options.sex ? 0 : 1
				if (this.arr.length === 0) {
					this.targetSex = this.options.sex
				}
			},
			handleButton(e) {
				this.targetSex = e.target.dataset.sex ? 1 : 0
				this.tips = '我称呼' + (this.targetSex ? '他' : '她')
				this.arr.push(e.target.dataset.value)
				this.output = this.arr.join('的')
				this.options.text = this.output
			},
			handleBackspace() {
				this.arr.pop()
				this.output = this.arr.join('的')
				this.options.text = this.output
			},
			handleClear() {
				this.arr = []
				this.output = ''
				this.input = ''
				this.options.text = ''
			},
			handleEqual() {
				this.output = this.arr.join('的')
				if (!this.options.text) {
					this.output = '请输入'
					return
				}
				this.input = this.output
				this.options.reverse = false
				const result = relationship(this.options)
				console.log(result)
				this.tips = '我称呼' + (this.targetSex ? '他' : '她')
				this.output = (result.length ? result.join('、') : '出错了')
			},
			handleExchange() {
				this.output = this.arr.join('的')
				if (!this.options.text) {
					this.output = '请输入'
					return
				}
				this.input = this.output
				this.options.reverse = !this.options.reverse
				const result = relationship(this.options)
				console.log(result)
				const tips = ('我称呼' + (this.targetSex ? '他' : '她'))
				this.tips = this.options.reverse ? tips.split('').reverse().join('') : tips
				this.output = (result.length ? result.join('、') : '出错了')
			},
			handleHelp() {
				this.$refs.popup.open('bottom')
			},
			handleClose() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		// min-width: 280px;
		// min-height: 280px;
		height: 100vh;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 28rpx;
		color: #fff;
		.wrapper {
			position: relative;
			height: 100%;
			background-color: #555;
			overflow: hidden;
			.inner {
				position: relative;
				height: 100%;
				margin: 0 auto;
				padding-bottom: 106rpx;
				box-sizing: border-box;
				background-color: #333;
				.container {
					height: 100%;
					box-sizing: border-box;
					overflow: auto;
				}
				.mod-calculator {
				    height: 100%;
				    background: #333;
					text {
						vertical-align: middle;
					}
					.screen {
						width: 100%;
						height: 40%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: stretch;
						.tip {
							width: 100%;
							padding: 0 30rpx;
							height: 60rpx;
							line-height: 60rpx;
							color: #bbb;
							box-sizing: border-box;
						}
						.input, .output {
							width: 100%;
							padding: 0 30rpx 0 20rpx;
							text-align: right;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: center;
						}
						.input {
							flex: 2;
							font-size: 32rpx;
							color: #bbb;
						}
						.output {
							flex: 3;
							font-size: 42rpx;
							color: #fff;
						}
						.setting {
							width: 100%;
							padding: 0 30rpx;
							height: 80rpx;
							background: rgba(0,0,0,.15);
							line-height: 80rpx;
							font-size: 32rpx;
							color: rgba(255,255,255,.9);
							box-sizing: border-box;
						}
						
						.label {
							input[type=checkbox] {
								display: none;
							}
							text {
								line-height: 20rpx;
								vertical-align: middle;
							}
							.switch {
							    margin: 0 14rpx;
							    position: relative;
							    display: inline-block;
							    width: 80rpx;
							    height: 40rpx;
							    background: rgba(255,255,255,.15);
							    line-height: 40rpx;
							    vertical-align: middle;
							    text-align: center;
							    border-radius: 20rpx;
							    user-select: none;
							    webkit-user-select: none;
								&:before {
									position: absolute;
									left: 0;
									width: 40rpx;
									height: 40rpx;
									content: "";
									background: rgba(255,255,255,.72);
									border-radius: 20rpx;
								}
								&.female {
									background: #e7763e;
									&:before {
										left: auto;
										right: 0
									}
								}
							}
						}
					}
					.panel {
						width: 100%;
						height: 60%;
						font-size: 32rpx;
						button, a {
							position: relative;
							background: transparent;
							border: none;
							border-left: 1rpx solid #444;
							border-top: 1rpx solid #444;
							font-family: Arial,Helvetica,Microsoft Yahei;
							font-size: 36rpx;
							color: rgba(255,255,255,.9);
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							text-align: center;
							vertical-align: middle;
							border-radius: 4rpx;
							outline: none;
							user-select: none;
							webkit-user-select: none;
							&.disable {
								background: transparent;
								color: rgba(255,255,255,.3);
							}
						}
						button:active, a:active {
							background-color: rgba(0,0,0,.1);
							color: rgba(255,255,255,.8);
						}
						.btn-first {
							border-left: none;
						}
						.btn-equal {
							background: #e7763e;
							&:hover {
								background: #e66747;
							}
						}
						.btn-first {
							border-left: none;
						}
						.btn-active {
							background-color: rgba(0,0,0,.2);
							color: rgba(255,255,255,.7)
						}
					}
					.row {
						height: 100%;
						flex: 1;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: stretch;
						box-sizing: border-box;
					}
					.row2 {
						flex: 2;
					}
					.col {
						width: 100%;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: stretch;
						box-sizing: border-box;
					}
				}
			}
		}
	}
	.mod-detail {
		height: 60vh;
		background: #333;
		position: relative;
		.hd {
			height: 96rpx;
			background: #444;
			border-bottom: 1px solid rgba(255,255,255,.08);
			view {
				position: relative;
				display: inline-block;
				height: 40rpx;
				margin: 18rpx 30rpx 18rpx 48rpx;
				padding: 10rpx 20rpx 10rpx 10rpx;
				background: #333;
				line-height: 40rpx;
				border-top-right-radius: 6rpx;
				border-bottom-right-radius: 6rpx;
				color: rgba(255,255,255,.8);
				&:before {
					position: absolute;
					left: -59rpx;
					top: 0;
					content: "";
					width: 0;
					border: 30rpx solid transparent;
					border-right-color: #333;
				}
			}
		}
		.bd {
			padding: 30rpx;
			color: rgba(255,255,255,.8);
			view {
				line-height: 60rpx;
			}
			.h3 {
				font-weight: 700;
				font-size: 32rpx;
			}
		}
		.ad {
			width: 100%;
			position: absolute;
			bottom: 16rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>
