<template>
  <div class="trademark">
    <el-button
      @click="showDialog"
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      >添加</el-button
    >
    <!-- 表格组件 
      data:显示的数据，数组类型
      border:边框;
      column的属性
      label:显示的标题
      width:列的宽度
      align:标题的对齐方式
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        align="center"
        width="width"
      ></el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width"
        align="center"
      >
        <template slot-scope="{ row }">
          <img :src="row['logoUrl']" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
      current-page：当前页
      total:总数据条数
      pager-count:
      page-size:每一页展示数据的数量
      page-sizes:设置每一页需要展示多少条数量
      layout:实现分页器的布局
      page-count:按钮数量，如果是7，连续页码是5
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 对话框 
    :visible.sync:控制对话框显示与隐藏用的
    -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 表单 -->
      <el-form
        :model="tmForm"
        style="width: 80%"
        :rules="rules"
        ref="rulesForm"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--           
          action: 设置图片上传的地址  
          :on-success="handleAvatarSuccess" 可以检测到图片上传成功，当图片上传成功会执行一次
          :before-upload="beforeAvatarUpload" ：可以在上传图片之前，会执行一次 
        -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark(tmForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqTradeMarkList } from '@/api/product/tradmark'
export default {
  name: 'trademark',
  data() {
    //自定义验证规则(重点)
    var validatetmName = (rule, value, callback) => {
      //自定义校验规则
      if (value.trim().length < 2 || value.trim().length > 10) {
        callback(new Error('品牌名称2 - 10位'))
      } else {
        //成功回调
        callback()
      }
    }
    return {
      //代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 3,
      //总共数据条数
      total: 10,
      //列表展示的数据
      list: [],
      //true显示对话框
      dialogFormVisible: false,
      //上传图片的属性
      imageUrl: '',
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      //表单验证规则
      rules: {
        //品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          //自定义校验规则
          { validator: validatetmName, trigger: 'change' }
        ],
        //品牌logo验证规则
        logoUrl: [
          { required: true, message: '请选择品牌图片', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.limit = val
      this.getPageList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getPageList()
    },
    //获取品牌列表的数据
    async getPageList() {
      //接口参数
      const { page, limit } = this

      //获取品牌列表的接口
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      // const result = await reqTradeMarkList(page, limit)
      if (result.code == 200) {
        //总条数
        this.total = result.data.total
        //显示品牌列表数据
        this.list = result.data.records
      }
    },
    //点击添加按钮
    showDialog() {
      this.dialogFormVisible = true
      //清空之前的表单数据
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    //修改品牌按钮
    updateTrademark(row) {
      //row 当前用户选中的品牌信息

      this.dialogFormVisible = true

      //将已有的品牌信息赋值给tmForm进行展示
      //将服务器返回品牌信息，直接赋值给tmForm进行展示
      //只有第一层数据，可以简单深拷贝
      this.tmForm = { ...row }
      // this.addOrUpdateTradeMark()
    },
    //确认按钮
    addOrUpdateTradeMark() {
      //当全部验字段通过，再去抒写业务逻辑
      this.$refs.rulesForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$API.trademark.reqAddUpdateTradeMark(
            this.tmForm
          )
          // console.log(result)
          this.dialogFormVisible = false
          if (result.code == 200) {
            this.$message({
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            })
          }
          // 添加或修改品牌成功以后，需要再次获取品牌列表进行展示
          //如果添加品牌，停留在第一页，修改品牌停留在当前页
          this.getPageList(this.tmForm.id ? this.page : 1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //删除按钮
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`你确定删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          //当用户点击确定按钮触发

          const result = await this.$API.trademark.reqRemoveTradeMark(row.id)

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //再次获取品牌数据
          //如果数组的长度大于1，就停留在原位，否则就减一
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        })
        .catch(() => {
          //当用户点击取消按钮触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res 是上传成功后返回给前端数据
      //file 是上传成功后之后服务器返回给前端数据
      this.tmForm.logoUrl = res.data
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },

  mounted() {
    //获取列表数据方法
    this.getPageList()
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
