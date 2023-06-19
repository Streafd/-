export default {
  methods: {
    getCaterID(category) {
      // console.log(a)
      if (category.leave == 1) {
        this.category1id = category.region
        //清除之前的2,3级id数据
        this.category2id = ''
        this.category3id = ''
        this.attrsList = []
      } else if (category.leave == 2) {
        this.category2id = category.two
        //清除之前的3级id数据
        this.category3id = ''
        this.attrsList = []
      } else if (category.leave == 3) {
        this.category3id = category.three
        //一旦三级获取到了，就发请求
        // this.getAttrsList()
        console.log('mixin成功')
      }
    }
  }
}
