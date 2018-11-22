const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}






// 封装一个Promise请求的函数
const q = (options)=> {
 let baseURL = 'http://127.0.0.1:3000/';
 return new Promise((resolve,reject)=>{
   // 处理请求方式
  if(!options.method) options.method = 'get';
    // 加工对象，以options为基准，合并我们添加的属性
   Object.assign(options, {
     url: baseURL + options.url,
     success: resolve,
     fail: reject,
     complete: wx.hideLoading
   });

   wx.showLoading({
     title: '玩命儿加载中...',
   });
   // let that = this; ES6箭头函数，不用如此麻烦，箭头函数向上绑定上级function的this
   // 发起请求
   wx.request(options);
 });
}




module.exports = {
  formatTime: formatTime,
  request:q
}
