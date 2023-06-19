<template>
  <div class="attr">
    <el-card>
      <Card @getCaterID="getCaterID" :disabled="!ishowTable"></Card>
    </el-card>
    <el-card style="margin: 20px 0">
      <!-- 展示品牌属性 -->
      <div v-show="ishowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3id"
          @click="addAttrValue"
          >添加属性</el-button
        >
        <el-table :data="attrsList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width=" 80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 0px 5px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="180">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="modifyAttr(row)"
                >修改</el-button
              >
              <el-button type="danger" size="mini" icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性/修改属性 -->
      <div v-show="!ishowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <!--添加属性值/取消 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="ishowTable = true">取消</el-button>
        <!-- 表格 -->
        <el-table
          style="margin: 15px 0px; width: 100%"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 输入框和span之间的来回切换 -->
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                v-if="row.flag"
                :ref="$index"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <!-- display:block 转成块元素，是因为点击空白的地方不会触发点击事件 -->
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue(row, $index)"
              >
                <el-button
                  slot="reference"
                  icon="el-icon-delete"
                  siez="mini"
                  type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="!attrInfo.attrValueList.length"
          >保存</el-button
        >
        <el-button @click="ishowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'attr',
  data() {
    return {
      category1id: '',
      category2id: '',
      category3id: '',
      attrsList: [],
      //控制显示
      ishowTable: true,

      //添加新属性/修改属性
      attrInfo: {
        //属性名
        attrName: '',
        //属性值
        attrValueList: [],
        //三级分类id
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
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
        this.getAttrsList()
      }
    },
    //获取品牌属性的数据
    async getAttrsList() {
      const result = await this.$API.attrs.reqAttrInfoList(
        this.category1id,
        this.category2id,
        this.category3id
      )
      // console.log(result)
      if (result.code == 200) {
        this.attrsList = result.data
      }
    },
    //添加属性值回调
    addAttr() {
      //向属性值的数组里面添加元素
      //添加flag属性用于控制input和span之间的切换,每个都有自己的flag控制显示隐藏，不会互相干扰
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      //添加属性是自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    //添加属性按钮
    addAttrValue() {
      //清除之前填写的数据
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        //
        categoryId: this.category3id,
        categoryLevel: 3
      }
      this.ishowTable = false
    },
    //修改属性按钮
    modifyAttr(row) {
      this.ishowTable = false
      /*
      this.attrInfo = row 这是浅拷贝，这样当修改里面的数据时，不保存，点击取消也会修改数据

      由于数据结构当中存在嵌套层级,简单方式的深拷贝，只能作用于第一层，更深层级的嵌套依旧会修改
      简单方式的深拷贝：1.Object.assing()->针对对象
      2.扩展运算符->对象数组都行
      3.concat()->针对数组
      this.attrInfo = { ...row }

      真正的深拷贝(层级嵌套)
      方式1：先把js对象转换成JSON.stringify()格式的,再通过JSON.parse()回转成js格式的对象
      方式2：通过安装函数库loadsh,使用其中的cloneDeep()方法
      方式3:递归实现深拷贝
      */
      this.attrInfo = cloneDeep(row)
      //在修改某个属性时，将相应的属性值元素添加上falg这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        //后续添加的的属性不具备响应式，需要使用this.$set(对象,'键名',键值)
        this.$set(item, 'flag', false)
      })
    },
    //失去焦点
    toLook(row) {
      //如果不填写属性值则不切换成span
      if (row.valueName.trim() == '') {
        this.$message({
          message: '请你输入属性值',
          type: 'warning'
        })
        return
      }
      //新增的属性值不能与已有的属性值重复
      //如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //row是attrValueList数组中最新的一项
        //所以这个判断是过滤attrValueList最新的一项，不能自己和自己比
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      //如果重复就是true，没有false
      if (isRepat) {
        this.$message({
          message: '属性值重复，请重新输入',
          type: 'warning'
        })
        return
      }
      row.flag = false
    },
    //点击span，切换会编辑模式
    toEdit(row, index) {
      row.flag = true
      //获取input节点，实现自动聚焦
      //点击span，重绘重排input是需要耗费时间的，不可能一点击span就获取到input
      //$nextTick(),当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    //属性内的删除按钮
    deleteAttrValue(row, index) {
      //删除选中的数据
      this.attrInfo.attrValueList.splice(index, 1)
    },
    //保存按钮
    async addOrUpdateAttr() {
      /*
      整理参数注意事项：1.如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      2.提交给服务器数据当中不应该出现flag字段
      */
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤属性值不为空的
          if (item.valueName != '') {
            //删除flag属性
            delete item.flag
            return true
          }
        }
      )
      try {
        //发请求
        await this.$API.attrs.reqSaveAttrInfo(this.attrInfo)
        this.ishowTable = true
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        //再次获取品牌属性
        this.getAttrsList()
      } catch {
        //失败
        this.$message({
          message: '保存失败',
          type: 'danger'
        })
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
