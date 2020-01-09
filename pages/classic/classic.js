import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel() //要调用一个类中的实例方法 需要实例对象
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false,
    x:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 数据更新
    console.log('WeLOVEの心')
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  }, //少打了个逗号报2错dt

  onNext: function(event) {
    this._updateClassic('next')
  },

  onPrevious: function(event) {
    this._updateClassic('previous')
    // this.setData({
    //   first: true
    // })
    // console.log(this.data.first)
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id,res.type)
      console.log(res)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
      })
    })
    // console.log(this.data.first)

  },  

  _getLikeStatus:function(artID,category){
     likeModel.getClassicLikeStatus(artID,category,
     (res)=>{
       this.setData({
         likeCount:res.fav_nums,
         likeStatus:res.like_status
       })
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log("onReady + "+this.data.first)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log(this.data.first)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})