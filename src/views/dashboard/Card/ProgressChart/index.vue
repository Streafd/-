<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    let lineChatr = echarts.init(this.$refs.charts)
    lineChatr.setOption({
      xAxis: { show: false, min: 0, max: 100 },
      yAxis: { show: false, type: 'category' },
      //系列
      series: [
        {
          type: 'bar',
          data: [78],
          //柱图宽度
          barWidth: 10,
          //柱图颜色
          color: 'yellow',
          //柱图背景颜色
          showBackground: true,
          backgroundStyle: { color: '#eee' },
          //设置文本
          label: {
            show: true,
            //改变文本内容
            formatter: '|',
            //位置
            position: 'right'
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      }
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
