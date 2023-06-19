<template>
  <div>
    <el-form ref="form" :model="spu" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 品牌下拉选择 -->
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="item in tradeMarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- texteare -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spu.description" rows="4"></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="SpuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性下拉选择 -->
      <el-form-item label="销售属性">
        <el-select
          :placeholder="
            upSelectSaleAttr.length
              ? `还有${upSelectSaleAttr.length}未选择`
              : '没有更多了'
          "
          :disabled="!upSelectSaleAttr.length"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            v-for="item in upSelectSaleAttr"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-plus"
          type="primary"
          style="margin-left: 10px"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 表格 -->
        <el-table
          style="width: 100%; margin-top: 15px"
          border
          :data="spu.spuSaleAttrList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="spuSaleAttrValueList"
            label="属性名列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row.spuSaleAttrValueList.splice(index, 1))"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- input和button切换 -->
              <!--                 @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row, $index)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                icon="el-icon-delete"
                type="danger"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdataSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      //上传图片相关
      dialogImageUrl: '',
      dialogVisible: false,
      // tab相关
      inputVisible: false,
      inputValue: '',
      //存储spu信息属性
      spu: {
        category3Id: 0,
        //描述
        description: '',
        id: 0,
        //收集spu图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0
          // }
        ],
        //pinp名称
        spuName: '',
        //平台属性
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ],
        //品牌id
        tmId: ''
      },
      //存储品牌信息
      tradeMarkList: [],
      //存储销售属性
      SaleAttrList: [],
      //存储图片信息
      SpuImageList: [],
      //收集为选择的销售属性id
      attrIdAndAttrName: ''
    }
  },
  methods: {
    // 照片墙删除事件
    handleRemove(file, fileList) {
      // file 删除图片的信息
      //fileList 剩余图片的信息

      //收集图片的信息
      this.spuImageList = fileList
    },
    //照片墙预览功能
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //照片墙上传成功
    handleSuccess(response, file, fileList) {
      //收集图片的信息
      this.SpuImageList = fileList
    },
    //初始化spuFor数据修改
    async initSpuData(spu) {
      // spu 数据
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code == 200) {
        this.spu = spuResult.data
      }
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 品牌性
      let SaleAttrResult = await this.$API.spu.reqSaleAttrList()
      if (SaleAttrResult.code == 200) {
        this.SaleAttrList = SaleAttrResult.data
      }
      //图片
      let SpuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (SpuImageResult.code == 200) {
        let listAttr = SpuImageResult.data
        //由于file-list的数组里面的元素需要携带name和url字段，对服务器返回的数据进行修改
        listAttr.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })

        this.SpuImageList = listAttr
      }
    },
    //添加初始化数据
    async addUpdata(id) {
      //收集第三级id
      this.spu.category3Id = id
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      //品牌属性
      let SaleAttrResult = await this.$API.spu.reqSaleAttrList()
      if (SaleAttrResult.code == 200) {
        this.SaleAttrList = SaleAttrResult.data
      }
    },
    //添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = ''
    },
    //添加tab事件
    addSaleAttrValue(row, index) {
      //挂载ininputVisible属性，切换input和button
      this.$set(row, 'inputVisible', true)
      //挂载inputValue属性，收集tab的输入内容
      this.$set(row, 'inputValue', '')
      // console.log(index)
      // this.$nextTick(() => {
      //   // this.$refs.saveTagInput[index].focus()
      //   // console.log(this.$refs.saveTagInput[index])
      //   console.log(this)
      // })
    },
    //以下和tab相关事件
    handleClose(tag) {},

    //失焦
    handleInputConfirm(row) {
      //从row解构出以下两个属性
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() == '') {
        this.$message({ message: '属性值不能为空', type: 'warning' })
        return
      }
      //判断属性值是否重复，
      let result = row.spuSaleAttrValueList.some((item) => {
        return item.saleAttrValueName == inputValue
      })
      if (result) {
        this.$message({ message: '属性值不能重复', type: 'warning' })
        return
      }
      //把解构出来的属性整合成对象
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
      // row.inputValue = ''
    },
    //保存
    async addOrUpdataSpu() {
      /*
      整理参数：整理照片墙的数据
      */
      this.spu.spuImageList = this.SpuImageList.map((item) => {
        return {
          imageName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if (result.code == 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        //需要区分是添加还是保存
        this.$emit('changeScene', {
          scene: 0,
          flag: this.spu.id ? '修改' : '保存'
        })
      }
      //清除数据
      Object.assign(this._data, this.$options.data())
    },
    //取消
    cancel() {
      //修改用于停留在当前页面
      $emit('changeScene', { scene: 0, flag: '修改' })
      //清除数据
      //Object.assign()合并对象
      //组件实例this._data,可以操作data当中的响应式数据
      //this.$options 可以配置对象，配置对象data函数执行，返回响应式数据为空
      Object.assign(this._data, this.$options.data())
    }
  },
  computed: {
    // 计算出还为选择的销售属性
    upSelectSaleAttr() {
      let result = this.SaleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  },
  mounted() {}
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
