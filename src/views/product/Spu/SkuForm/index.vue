<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{ spu.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model.number="skuInfo.price"
          placeholder="价格(元)"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          v-model="skuInfo.skuDesc"
          rows="4"
          placeholder="规格描述"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <!-- 在attrInfoList 数组每一项中动态创建一个双向绑定：attrIdAndValueId，用于保存是整合数据 -->
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrItem.valueName"
                :value="`${attr.id}:${attrItem.id}`"
                v-for="attrItem in attr.attrValueList"
                :key="attrItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form lable-width="80px">
          <el-form-item
            :label="item.saleAttrName"
            v-for="item in SpuSaleAttrList"
            :key="item.id"
          >
            <!-- 在SpuSaleAttrList 数组每一项中动态创建一个双向绑定：attrIdAndValueId，用于保存是整合数据 -->
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                :label="item2.saleAttrValueName"
                :value="`${item.id}:${item2.id}`"
                v-for="item2 in item.spuSaleAttrValueList"
                :key="item2.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="图片列表">
        <el-table
          border
          style="width: 100%"
          :data="SpuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="prop" label="图片">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="!row.isDefault"
                @click="changeDefault(row, $index)"
                >设置默认</el-button
              >
              <el-button type="success" size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      //图片数据
      SpuImageList: [],
      //销售属性数据
      SpuSaleAttrList: [],
      //平台属性数据
      attrInfoList: [],
      //收集sku数据字段
      skuInfo: {
        // 第一类：收集的数据，父组件传递的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：双向绑定收集
        skuName: '',
        weight: '',
        price: 0,
        skuDesc: '',

        //第三类
        //设置默认图片
        skuDefaultImg: '',
        //收集平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0
          }
        ],
        //收集图片字段
        skuImageList: [
          {
            // id: 0,
            // imgName: 'string',
            // imgUrl: 'string',
            // isDefault: 'string',
            // skuId: 0,
            // spuImgId: 0
          }
        ],
        //收集销售属性
        skuSaleAttrValueList: [
          {
            // id: 0,
            // saleAttrId: 0,
            // saleAttrName: 'string',
            // saleAttrValueId: 0,
            // saleAttrValueName: 'string',
            // skuId: 0,
            // spuId: 0
          }
        ]
      },
      spu: {},
      //收集图片字段
      imageList: []
    }
  },
  methods: {
    //获取sku数据 reqSpuSaleAttrList reqAttrInfoList
    async getData(category1id, category2id, row) {
      //收集父组件传递的数据
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      this.spu = row
      //获取图片数据
      let spuImageResult = await this.$API.sku.reqSpuImageList(row.id)
      if (spuImageResult.code == 200) {
        let list = spuImageResult.data
        //添加一个默认值字段
        list.forEach((item) => {
          item.isDefault = 0
        })
        this.SpuImageList = list
      }
      //获取销售属性
      let spuSaleAttrResult = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (spuSaleAttrResult.code == 200) {
        this.SpuSaleAttrList = spuSaleAttrResult.data
      }

      //获取平台属性
      let attrInfoResult = await this.$API.sku.reqAttrInfoList(
        category1id,
        category2id,
        row.category3Id
      )
      if (attrInfoResult.code == 200) {
        this.attrInfoList = attrInfoResult.data.slice(0, 3)
      }
    },
    //图片表格复选框事件
    handleSelectionChange(params) {
      //选中的图片赋值给 imageList
      this.imageList = params
    },
    //设置默认图片
    changeDefault(row, index) {
      //全部设置为0，设置默认
      this.SpuImageList.forEach((item) => {
        item.isDefault = 0
      })
      //选择的一项设置为1，选中
      row.isDefault = 1
      //收集默认图片信息
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    //取消
    cancel() {
      this.$emit('changeScenes', 0)
      //清除之前填写的数据
      Object.assign(this._data, this.$options.data())
    },
    async save() {
      //整理参数
      //将整理好的参数赋值给 skuInfo.skuAttrValueList
      this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      //整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.SpuSaleAttrList.reduce(
        (prev, item) => {
          if (item.attrIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
            prev.push({ saleAttrId, saleAttrValueId })
          }
          return prev
        },
        []
      )

      //整理图片
      // this.imageList
      this.skuInfo.skuImageList = this.imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      let result = await this.$API.sku.reqAddsku(this.skuInfo)
      if (result.code == 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('changeScenes', 0)
      } else {
        this.$message({
          message: '保存失败',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
