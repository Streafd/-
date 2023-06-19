<template>
  <div class="spu">
    <el-card style="margin-bottom: 20px">
      <Card @getCaterID="getCaterID" :disabled="scene != 0"></Card>
    </el-card>
    <el-card>
      <!-- 展示spu列表结构 -->
      <div v-show="scene == 0">
        <el-button
          icon="el-icon-plus"
          type="primary"
          :disabled="!category3id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <!-- 表格 -->
        <el-table border style="width: 100%" :data="spuList">
          <el-table-column
            label="序号"
            type="index"
            prop="date"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column label="sup名称" prop="spuName"></el-table-column>
          <el-table-column label="sup描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="addSku(row)"
                >添加sku</el-button
              >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="upDateSpu(row)"
                >修改</el-button
              >
              <el-button
                type="info"
                size="mini"
                icon="el-icon-info"
                @click="handler(row)"
                >查看</el-button
              >
              <template>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  style="margin-left: 10px"
                  @onConfirm="deleteSpu(row)"
                >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10]"
            :page-size="pageSize"
            :pager-count="7"
            layout=" prev, pager, next, jumper,->,sizes,total"
            :total="total"
            align="center"
          >
          </el-pagination>
        </div>
      </div>
      <!--添加/修改spu  -->
      <div v-show="scene == 1">
        <Spu @changeScene="changeScene" ref="spu"></Spu>
      </div>
      <!-- 添加sku -->
      <div v-show="scene == 2">
        <Sku ref="sku" @changeScenes="changeScenes"></Sku>
      </div>
    </el-card>
    <!-- 对话框 -->
    <!-- before-close :关闭前的回调，会暂停 Dialog 的关闭 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" v-loading="loading" style="width: 100%">
        <el-table-column
          property="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100%; height: 100%"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Spu from './SpuForm/'
import Sku from './SkuForm/'
export default {
  name: 'spu',
  data() {
    return {
      category1id: '',
      category2id: '',
      category3id: '',
      ishowTable: true,

      spuList: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      //0代表展示SPU列表数据，1添加SPU|修改SPU，2添加SKU
      scene: 0,
      dialogTableVisible: false,
      spu: [],
      //存储sku列表的数据
      skuList: [],

      //对话框加载效果
      loading: true
    }
  },
  methods: {
    //接收1,2,3级id
    getCaterID(category) {
      if (category.leave == 1) {
        this.category1id = category.region
        //清除之前的2,3级id数据
        this.category2id = ''
        this.category3id = ''
        // this.attrsList = []
      } else if (category.leave == 2) {
        this.category2id = category.two
        //清除之前的3级id数据
        this.category3id = ''
        // this.attrsList = []
      } else if (category.leave == 3) {
        this.category3id = category.three
        //一旦三级获取到了，就发请求
        this.getSpuList()
      }
    },
    //获取spu列表数据
    async getSpuList() {
      const result = await this.$API.spu.reqSupList(
        this.currentPage,
        this.pageSize,
        this.category3id
      )
      if (result.code == 200) {
        this.spuList = result.data.records
        this.total = result.data.total
      }
      // console.log(result)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getSpuList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getSpuList()
    },
    //添加SPU
    addSpu() {
      this.scene = 1
      this.$refs.spu.addUpdata(this.category3id)
    },
    //修改spu
    upDateSpu(row) {
      this.scene = 1
      // console.log(this.$refs.spu)
      //給SpuForm子组件添加ref,利用$refs 调用子组件的方法
      this.$refs.spu.initSpuData(row)
    },
    //自定义事件回调，SPU取消
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag == '修改') {
        //停留在当前页
        this.getSpuList(this.currentPage)
      } else {
        //返回第一页
        this.getSpuList()
      }
    },
    //删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        //根据数组的长度，判断是否展示上一页，
        this.getSpuList(
          this.spuList.length > 1 ? this.currentPage : this.currentPage - 1
        )
      }
    },
    //添加sku
    addSku(row) {
      this.scene = 2
      // console.log(row)
      this.$refs.sku.getData(this.category1id, this.category2id, row)
    },
    //sku表单组件
    changeScenes(value) {
      this.scene = value
    },
    //查看
    async handler(row) {
      // this.loading = true
      this.dialogTableVisible = true
      this.spu = row
      let result = await this.$API.sku.reqFindBySpu(row.id)
      // console.log(result)
      if (result.code == 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    //关闭loading前的回调
    close(done) {
      this.loading = true

      //清除skuLIst数组
      this.skuList = []

      //关闭对话框
      done()
    }
  },
  components: {
    Spu,
    Sku
  }
}
</script>

<style lang="scss" scoped></style>
