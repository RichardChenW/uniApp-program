<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="200" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	import { $http } from "@escook/request-miniprogram"

	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			// 获取用户授权之后的信息
			getUserInfo(e) {
				if (e.detail.errMsg === "getUserInfo:fail auth deny") return uni.$showMsg("您取消了授权！") // 说明授权失败
				else {
					this.updateUserInfo(e.detail.userInfo)
					this.getToken(e.detail)
				}
			},
			async getToken(info) {
				// 获取 code 对应的值
				const res = await uni.login().catch(err => err)
				if(res.errMsg !== "login:ok") return uni.$showMsg("登录失败！")
				else{
					console.log(res.code)
					console.log(info)
					
					// 准备参数
					const query = {
						code:res.code,
						encryptedData:info.encryptedData,
						iv:info.iv,
						rawData:info.rawData,
						signature:info.signature,
					}
					let loginRes= await uni.request({
						url:"http://127.0.0.1:8000/login",
						method:"POST",
						data:query,
					})
					if(loginRes.statusCode !== 200) return uni.$showMsg("登录失败！")
					else{
						uni.$showMsg("登录成功！")
						console.log(loginRes)
						this.updateToken(loginRes.data.message.token)
					}
				}
			},
			...mapMutations("moduleUser", ["updateUserInfo","updateToken"])
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>