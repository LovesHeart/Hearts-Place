// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    openType:{
      type:String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      console.log(1)
      this.triggerEvent('getuserinfo',event.detail,{})

      //第一个参数为传出名 二参为内容
      
    },
    test(){
      console.log('tap')
    }
  }
})
