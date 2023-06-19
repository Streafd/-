<template>
  <div>
    <!-- inline:表示行内表单 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :disabled="disabled"
    >
      <el-form-item label="一级分类">
        <!-- 也可以使用@change事件,监听选项是否方式变化 -->
        <el-select
          v-model="formInline.region"
          placeholder="请选择"
          @change="handler1"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in Category1List"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="formInline.two"
          placeholder="请选择"
          @change="handler2"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in Category2List"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="formInline.three"
          placeholder="请选择"
          @change="handler3"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in Category3List"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['disabled'],
  data() {
    return {
      //一级菜单
      Category1List: [],
      //二级菜单
      Category2List: [],
      //三级菜单
      Category3List: [],
      //收集相应的1,2,3级id
      formInline: {
        region: '',
        two: '',
        three: ''
      }
    }
  },
  watch: {
    //监听一级菜单id
    // 'formInline.region': {
    //   handler(newval, oldval) {
    //     console.log(`新值：${newval},旧值：${oldval}`)
    //     //清空之前的选项
    //     this.Category2List = []
    //     this.Category3List = []
    //     this.formInline.two = ''
    //     this.formInline.three = ''
    //     this.getCategory2List(newval)
    //   }
    // },
    // //监听二级菜单id
    // 'formInline.two': {
    //   handler(newval) {
    //     this.Category3List = []
    //     this.formInline.three = ''
    //     this.getCategory3List(newval)
    //   }
    // }
  },
  methods: {
    //一级分类
    async getCategory1List() {
      const result = await this.$API.attrs.reqGetCategory1List()
      if (result.code == 200) {
        this.Category1List = result.data
      }
    },
    //二级
    async getCategory2List(id) {
      const result = await this.$API.attrs.reqGetCategory2List(id)
      if (result.code == 200) {
        this.Category2List = result.data
      }
    },
    //三级
    async getCategory3List(id) {
      const result = await this.$API.attrs.reqGetCategory3List(id)
      if (result.code == 200) {
        this.Category3List = result.data
      }
    },
    //选择一级菜单，获取二级菜单数据
    handler1() {
      //清除上一次选中二级，三级分类
      this.Category2List = []
      this.Category3List = []
      this.formInline.two = ''
      this.formInline.three = ''
      const { region } = this.formInline

      this.$emit('getCaterID', { region, leave: 1 })
      this.getCategory2List(region)
    },
    //选择二级菜单，获取三级菜单数据
    async handler2() {
      //清除上一次选中的三级分类
      this.Category3List = []
      this.formInline.three = ''
      const { two } = this.formInline

      this.$emit('getCaterID', { two, leave: 2 })
      this.getCategory3List(two)
    },
    //三级分类事件的回调，当选择三级分类就触发
    handler3() {
      const { three } = this.formInline
      this.$emit('getCaterID', { three, leave: 3 })
    },
    //子组件给父组件传递1,2,3级id
    getCater() {
      this.$emit('getCaterID', this.formInline)
    }
  },
  mounted() {
    //获取一级分类
    this.getCategory1List()
  }
}
</script>

<style lang="less" scoped></style>
