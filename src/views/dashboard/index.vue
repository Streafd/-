<template>
  <div class="dashboard-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            <Card title="总销售额" count="￥ 126560">
              <template slot="charts">
                <span>周同比 56.67%</span>&nbsp;<i
                  class="el-icon-caret-top"
                  style="color: red"
                ></i>
                &nbsp;
                <span>同日比 19.96%</span>&nbsp;<i
                  class="el-icon-caret-bottom"
                  style="color: greenyellow"
                ></i>
              </template>
              <template slot="footer">
                <span>日销售额 ￥12345</span>
              </template>
            </Card>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <Card title="访问量" count="￥ 88460">
              <template slot="charts">
                <LineChatr></LineChatr>
              </template>
              <template slot="footer">
                <span>日访问量 123</span>
              </template>
            </Card>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <Card title="支付笔数" count="￥ 88460">
              <template slot="charts">
                <BarChart></BarChart>
              </template>
              <template slot="footer">
                <span>日转化率 64%</span>
              </template>
            </Card>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <Card title="运营活动效果" count="78%">
              <template slot="charts">
                <Pro></Pro>
              </template>
              <template slot="footer">
                <span>周同比 56.67%</span>&nbsp;<i
                  class="el-icon-caret-top"
                  style="color: red"
                ></i>
                &nbsp;
                <span>同日比 19.96%</span>&nbsp;<i
                  class="el-icon-caret-bottom"
                  style="color: greenyellow"
                ></i>
              </template>
            </Card>
          </el-card>
        </el-col>
      </el-row>
      <Sale></Sale>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from './Card'
import Sale from './Sale'
import LineChatr from './Card/lineChart'
import BarChart from './Card/BarChart'
import Pro from './Card/ProgressChart'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  components: {
    Card,
    Sale,
    LineChatr,
    BarChart,
    Pro
  }
}
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
</style>
