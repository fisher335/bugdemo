<template>
  <div className="animated fadeIn" style="background-color: white">
    <Row>
      <div id="main"></div>
    </Row>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'

export default {
  name: 'map',
  data () {
    return {
      dataList: [
        {name: '南海诸岛', value: 0},
        {name: '北京', value: 2170.7},
        {name: '天津', value: 1559.6},
        {name: '上海', value: 2423.78},
        {name: '重庆', value: 3048.43},
        {name: '河北', value: 7556.3},
        {name: '河南', value: 9605},
        {name: '云南', value: 4800.5},
        {name: '辽宁', value: 4359.3},
        {name: '黑龙江', value: 3788.7},
        {name: '湖南', value: 6860.2},
        {name: '安徽', value: 6323.6},
        {name: '山东', value: 10047.2},
        {name: '新疆', value: 2444.67},
        {name: '江苏', value: 8029.3},
        {name: '浙江', value: 5737},
        {name: '江西', value: 4622.1},
        {name: '湖北', value: 5917},
        {name: '广西', value: 4885},
        {name: '甘肃', value: 2625.71},
        {name: '山西', value: 3702.35},
        {name: '内蒙古', value: 2534},
        {name: '陕西', value: 3835.44},
        {name: '吉林', value: 2717.43},
        {name: '福建', value: 3941},
        {name: '贵州', value: 3580},
        {name: '广东', value: 11346},
        {name: '青海', value: 3983.8},
        {name: '西藏', value: 3371.5},
        {name: '四川', value: 8341},
        {name: '宁夏', value: 681.79},
        {name: '海南', value: 925.76},
        {name: '台湾', value: 2369},
        {name: '香港', value: 748.25},
        {name: '澳门', value: 63.2}
      ]
    }
  },
  methods: {
    buildMap () {
      let myChart = echarts.init(document.getElementById('main'))
      let option = {
        tooltip: {
          formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
          }// 数据格式化
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 取值范围的文字
          inRange: {
            color: ['#fff4e6', '#dd2002']// 取值范围的颜色
          },
          show: true// 图注
        },
        geo: {
          map: 'china',
          roam: false, // 不开启缩放和平移
          zoom: 1.23, // 视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10', // 注意：地图省份名字字体如果过大会导致字体重叠
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329', // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.dataList
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    this.buildMap()
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}

html, body {
  width: 100%;
  height: 100%;
}

#main {
  width: 600px;
  height: 450px;
  margin: 150px auto;
  border: none;
}
</style>
