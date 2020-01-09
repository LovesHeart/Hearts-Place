import {
  BookModel
} from '../../models/book.js'

import{
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const books= await bookModel.getHotList()
    this.setData({
      books
    })
      // .then(res => {
      //   console.log(res)
      //   this.setData({
      //     books:res
      //   })
      // })
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom(){
    // console.log(789)
    this.setData({
      more:random(16) 
    })
  }

})