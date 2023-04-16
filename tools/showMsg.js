// 1. 封装弹窗的方法
export default function(title = "数据请求失败",duration = 1500){
    uni.showToast({
        title,
        icon:'none',
        duration,
    })
}