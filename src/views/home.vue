<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>

    <el-row align="middle">
      <el-col :span="6">
        <label-wrap>请输入要生成二维码的文字：</label-wrap>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="2">
        <el-button type="primary" @click="submit()">生成QRcode</el-button>
      </el-col>
    </el-row>
    <!--    展示图片内容开始-->

    <el-row :gutter="10" align="middle">
      <div class="block" style="width: 20%; height: 20%; margin-left: 40%; margin-top: 5%" v-if="convert">
        <el-image :src="src" style="margin-top:30px ">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </el-row>
    <!--    展示图片内容结束-->

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      input: '',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      convert: false
    }
  },
  methods: {
    submit () {
      this.convert = true
      axios({
        method: 'get',
        url: '/qrcode',
        params: {
          url: this.input
        }
      }).then((res) => {
        const name = res.data.data
        this.src = 'api/static/' + name
        console.log('数据：', res)
      })
    }
  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;

}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
