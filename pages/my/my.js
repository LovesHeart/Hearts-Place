import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'
import {
  promisic
} from '../../util/common.js'
import {config} from '../../config.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad(options) {
    this.userAuthorized2()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor() {
    return new Promise((resolve, reject) => wx.request({
      url: 'http://bl.7yue.pro/v1/' + 'classic/favor',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject()
      }
    })).then(res=>{
      this.setData({
        classics:res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  async userAuthorized2(){
    const data = await promisic(wx.getSetting)()
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)()
      if(!res)return
      const userInfo= res.userInfo
      this.setData({
        authorized:true,
        userInfo
      })
    }
  },

  userAuthorized1(){  
    promisic(wx.getSetting)()
    .then(data=>{
      if(data.authSetting['scope.userInfo']){
        return promisic(wx.getUserInfo)()//return后对data进行了更新
      }
      return false
    })
    .then(data=>{
      if(!data)return
      this.setData({
        authorized:true,
        userInfo:data.userInfo
      })
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    console.log(111)
    const userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  test() {
    console.log('test')
  }


})