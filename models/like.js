import { HTTP } from '../util/http.js'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',//就因为写了一个等号无限的Uncaught SyntaxError : Unexpected token bug
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url:'classic/'+category+'/'+artID+'/favor',
      success:sCallback
    })
  }
}

export {
  LikeModel
}