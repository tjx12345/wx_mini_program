
const { request } = getApp().tools;
const baseObj = require('./baseObj.js')
function initTime () {
  let arr = [];
  for(let i = 1; i < 25; i ++) {
    arr.push(i);
  }
  return arr;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    name:'',
    // 地址
    address:'', latitude:'', longitude:'', categoryId:''
  },
  // phone,name
  valueHandler(e) {
    this.setData({
      [e.target.dataset.type]:e.detail.value
    });
  },
  // 选择位置
  chooseLocation() {
    wx.chooseLocation({
      success:(res)=> {
        // address,latitude,longitude
        this.data.latitude = res.latitude;
        this.data.longitude = res.longitude;
        this.setData({
          address: res.address
        });
      }
    })
  },
  // 保存picker数据
  changeTime(e) {
    console.log(e.detail.value); // 索引
    // 获取dataType 知道要改变谁
    //this.data[e.target.dataset.type] = this.data.time[e.detail.value];
    console.log(e.target.dataset.type)
    this.setData({
      // begin
      [e.target.dataset.type]: this.data.time[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await request({
      url: 'categories'
    });
    console.log(res.data)
    this.setData({
      categories: res.data
    });
  },
  // 保存店铺类型
  saveType(e) {
    // detail.value索引
    this.setData({
      categoryId: this.data.categories[e.detail.value].id
    })

  },
  getWeek(e) {

    this.setData({
      workDates: e.detail.value,
    })
  },
  async addShop(e) {

    let { address,categoryId,latitude,longitude,name,phone} = this.data;
       let { data } = await request({
      url:'shops',
      data:{
        address, categoryId, latitude, longitude, name, phone
      },
      method:'post'
    });
    console.log(data);
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