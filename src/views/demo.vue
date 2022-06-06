<template>
  <div>
    <el-row align="middle">
      <el-col :span=6 :offset=9>
        <el-upload v-show="list"
                   class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :on-change="handleChange"
                   :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <el-button @click.stop="handleClick" size="small" type="primary">取消</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="width: 100%" :offset="0.5">
        <el-table v-show="!list"
                  :data="tableData"
                  border
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template v-slot="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small">下载</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template v-slot="scope">
              <el-button @click="handleClick(scope.row)" type="info" size="small">上传</el-button>
              <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--    删除对话框部分-->
    <el-dialog title="输入密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="输入密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    删除对话框部分结束-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'demo',
  data () {
    return {
      list: false,
      form: {
        name: ''
      },
      dialogFormVisible: false,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleClick () {
      this.list = !this.list
    },
    handleDelete (row) {
      console.log(row)
      this.dialogFormVisible = true
    },
    getData () {
      axios({
        method: 'get',
        url: this.$globle.baseUrl + 'list',
        params: {
          text: this.input
        }
      }).then((res) => {
        console.log('数据：', res)
      })
    }
  },
  created () {
    this.created()
  }
}
</script>

<style scoped>

</style>
