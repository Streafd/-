<template>
  <div class="sku">
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column
        label="序号"
        width="80"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column
        label="名称"
        width="width"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        width="width"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" width="100">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        width="120"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        width="80"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="width" prop="prop" align="center">
        <!-- 操作 -->
        <template slot-scope="{ row, $index }">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-bottom"
            v-if="row.isSale != 0"
            @click="cancle(row)"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-top"
            @click="sale(row)"
            v-else
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-warning-outline"
            @click="edit()"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout=" prev, pager, next, jumper,->,sizes,total "
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            style="margin-left: 5px"
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            >{{ item.attrName }}:{{ item.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="330px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" class="carousel-img" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'sku',
  data() {
    return {
      //分页器
      currentPage: 1,
      pageSize: 10,
      total: 0,
      //sku
      skuList: [],
      skuInfo: [],
      // 抽屉
      drawer: false,
      direction: 'rtl'
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getSkuList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getSkuList()
    },
    async getSkuList() {
      let result = await this.$API.sku.reqSkuList(
        this.currentPage,
        this.pageSize
      )
      if (result.code == 200) {
        this.skuList = result.data.records
        this.total = result.data.total
      }
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqOnSale(row.id)
      console.log(result)
      if (result.code == 200) {
        row.isSale = 1
        this.$message({
          message: '上架成功',
          type: 'success'
        })
      }
    },
    //下架
    async cancle(row) {
      try {
        let result = await this.$API.sku.reqCancelSale(row.id)
        if (result.code == 200) {
          row.isSale = 0
          this.$message({
            message: '下架成功',
            type: 'success'
          })
        }
      } catch (error) {}
    },
    edit() {
      this.$message({
        message: '开发中...',
        type: 'info'
      })
    },
    //查看当前sku详情
    async getSkuInfo(row) {
      this.drawer = true
      let result = await this.$API.sku.reqSkuById(row.id)
      if (result.code == 200) {
        this.skuInfo = result.data
      }
    }
  },
  mounted() {
    this.getSkuList()
  }
}
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
.carousel-img {
  width: 100%;
  height: 100%;
}
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>
