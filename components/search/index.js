// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js' //此处并不能有多余的空格

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  attached() {
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      console.log(123)
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      // 锁
      if (this.hasMore()) {
        // this.data.loading = true
        this.lock()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unlock(),
            () => {
              this.unlock()
            }
        })
        // 死锁
      }
    },

    

    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._unShowLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _unShowLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

    // scroll-view | Page onReachBottom

  }
})