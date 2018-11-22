// pages/list/list.js
const { request } = getApp().tools;
Page({
  async showNearMe () {
     wx.getLocation({
       success:async res=>{
         let { data } = await request({
           url: `shops/near?categoryId=${this.data.cid}&longitude=${res.longitude}&latitude=${res.latitude}`,       
         });
         this.setData({
           shopList:data
         })
       }
     })
  },
  async showListByScroe(){
    let { data, header } = await request({
      url: `shops?_sort=score&_order=desc`
    });
    this.setData({
      shopList:data
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],// 商铺列表
    page:1,// 页码
    cid:'',// 路由参数
    viewCount:6,// 页显示数
    hasMore:true,// 是否还有数据
    inputShowed:false, // 是否显示input搜索框
    searchValue:'',//查找值
  },
  // 点击label切换input显示
  showInput() {
    console.log('准备显示Input');
    // inputShowed 进行变更
    this.setData({
      inputShowed:true
    })
  },
  // 接收查找输入的值
  inputTyping(e) {
    let value = e.detail.value;
    // 获取本地存储的数据
    // wx.getStorageSync(key)
    let info = wx.getStorageInfoSync();
    console.log(info.keys);

    // info.keys是数据数组
    let newTextList = info.keys.filter( key => key.includes(value) );

    this.setData({
      searchValue: value,
      newTextList
    })
  },
   searchBefore(e) {
    console.log(e)
    console.log(e.target.dataset)
    console.log(e.target.dataset.text)
    // data-value
     this.data.searchValue = e.target.dataset.text; 
    // 调用下面函数
     this.doSearch()
  },
  // 搜索
  async doSearch() {
    console.log(this.data.searchValue);
    // 发请求
    let { data } = await request({
      url:'shops?name_like=' + this.data.searchValue
    });
    // 更新视图
    this.setData({
      shopList:data
    });
    // 存储本地数据
    wx.setStorageSync(this.data.searchValue, '');
  },
  // 隐藏
  hideInput() {
    this.setData({
      inputShowed: false
    })
  },
  // 清除Input
  clearInput() {
    this.setData({
      searchValue:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 1:获取路由参数
    this.data.cid = options.cid;
    this.loadShopListByPage();
  },

  async loadShopListByPage() {
    if(!this.data.hasMore) {
      wx.showToast({
        title: '没有更多数据啦！',
      });
      return;
    }

    // 1: 通过页码计算db索引((页码-1)*页显示数)
    let startIndex = (this.data.page - 1) * this.data.viewCount;
    // 2: 发起请求
    let { data,header } = await request({
      url: `shops?_start=${startIndex}&_limit=${this.data.viewCount}&categoryId=${this.data.cid}`
      // ?_start=0&_limit=2
    });
    // 页码自增
    this.data.page ++;

    // 当前页码是自增以后的，将这个页码计算总数，如果大于X-Total-Count
    if((startIndex + this.data.viewCount) > header['X-Total-Count']) {
      // 下次不必出发上啦触底
      this.data.hasMore = false;
    }
    

    

    console.log(data);
    // 视图更新
    this.setData({
      shopList: this.data.shopList.concat(data),
      hasMore:this.data.hasMore
    });
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
    this.init();
    this.loadShopListByPage();
  },
  init() {
    this.data.shopList = [];
    this.data.page = 1;
    this.data.hasMore = true;
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadShopListByPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})