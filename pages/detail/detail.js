// pages/detail/detail.js
const { request } = getApp().tools;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setNavigationBarTitle({
      title: '我的店铺详情',
    });
      // 获取路由参数
   let shopid =  options.shopid;
   // 发起请求
   let { data } = await request({
     url:'shops?id=' + shopid
   });
  // 渲染视图
  this.setData({
    shop:data[0]
  });

  },
  // 图片预览
  showPreview(e) {
    console.log(e.target.dataset.url)
      wx.previewImage({
        urls: [e.target.dataset.url],
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})