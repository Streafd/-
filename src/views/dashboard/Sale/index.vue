<template>
  <div style="margin: 10px 0">
    <el-card class="sale-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 右侧 -->
      <div class="slae-right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          class="date"
          v-model="value1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          size="mini"
        >
        </el-date-picker>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="ce" ref="echart"></div>
          </el-col>
          <el-col :span="6">
            <span style="font-weight: 800; font-size: 18px"
              >门店{{ title }}排名</span
            >
            <ul class="row-ul">
              <li>
                <span>1</span>
                <span>苹果</span>
                <span>12345</span>
              </li>
              <li>
                <span>2</span>
                <span>华为</span>
                <span>12321</span>
              </li>
              <li>
                <span>3</span>
                <span>小米</span>
                <span>1921</span>
              </li>
              <li>
                <span>4</span>
                <span>oppo</span>
                <span>1888</span>
              </li>
              <li>
                <span>5</span>
                <span>vivi</span>
                <span>1777</span>
              </li>
              <li>
                <span>6</span>
                <span>索尼</span>
                <span>1666</span>
              </li>
              <li>
                <span>7</span>
                <span>1加</span>
                <span>1555</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      activeName: 'first',
      value1: '',
      myChart: null
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echart)
    this.myChart.setOption({
      title: { text: '销售额趋势' },
      xAxis: {
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25, 10, 10, 30, 22, 24],
          color: 'orange'
        }
      ]
    })
  },
  computed: {
    title() {
      return this.activeName == 'first' ? '销售额' : '访问量'
    }
  },
  watch: {
    title(newval, oldval) {
      //监听title的变化，修改图表的数值
      //表配置数据可以再次修改，如果有新的数值，覆盖旧的那一项数值，没有新数值的不变
      this.myChart.setOption({
        title: { text: this.title }
      })
    }
  }
}
</script>

<style scoped>
.sale-card {
  position: relative;
}
.slae-right {
  position: absolute;
  right: 0px;
  top: 20px;
}
span {
  margin: 0px 10px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.echart {
}
.ce {
  width: 100%;
  height: 300px;
}
.row-ul {
  height: 300px;
  width: 100%;
  padding: 0px;
}
.row-ul li {
  display: flex;
  list-style: none;
  height: 8%;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
