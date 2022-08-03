<template>
  <div>
    <el-row align="middle">
      <el-col :offset=9 :span=6>
        <el-upload v-show="list"
                   :file-list="fileList"
                   :on-change="handleChange"
                   :on-success="handleSuccess"
                   action="/api/upload"
                   class="upload-demo">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <el-button size="small" type="primary" @click.stop="handleClick">取消</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="0.5" style="width: 100%">
        <el-table v-show="!list"
                  :data="tableData"
                  border
        >
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column
            label="日期"
            prop="date"
            width="180">
          </el-table-column>
          <el-table-column
            label="文件名称"
            prop="name"
            width="580">
          </el-table-column>
          <el-table-column
            label="大小"
            prop="size">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template v-slot="scope">
              <el-button size="small" type="primary" @click="handleDownLoad(scope.row)">下载</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template v-slot="scope">
              <el-button size="small" type="info" @click="handleClick(scope.row)">上传</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--    删除对话框部分-->
    <el-dialog :visible.sync="dialogFormVisible" title="输入密码">
      <el-form :model="form">
        <el-form-item label="输入密码" label-width="auto">
          <el-input v-model="form.password" autocomplete="off" show-password size="small"></el-input>
          <el-input v-show="true" v-model="form.name" :disabled="true" autocomplete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDelCancel">取 消</el-button>
        <el-button type="primary" @click="fileDelSubmit">确 定</el-button>
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
        name: '',
        password: ''
      },
      dialogFormVisible: false,
      fileList: [],
      tableData: [],
      input: '',
      search_content: ''
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleSuccess (response, file, filelist) {
      this.list = !this.list

      this.$router.go('/demo').catch(() => {
      })
      this.fileList = []
    },
    handleClick () {
      this.list = !this.list
    },
    handleDelete (row) {
      console.log(row)
      this.form.name = row.name
      this.dialogFormVisible = true
    },

    handleDownLoad (row) {
      this.$axios({
        method: 'get',
        url: '/filedown/' + row.name,
        params: {},
        responseType: 'blob'
      }).then((res) => {
        const {data, headers} = res
        console.log(headers)
        const fileName = headers['content-disposition'].replace('attachment; filename=', '')
        console.log(fileName)
        // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
        // const blob = new Blob([JSON.stringify(data)], ...)
        const blob = new Blob([data], {type: headers['content-type']})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
        console.log('下载成功：')
      })
    },
    getData () {
      this.$axios({
        method: 'get',
        url: 'file',
        params: {
          search: this.search_content
        }
      }).then((res) => {
        this.tableData = res.data
        // console.log('数据：', this.tableData)
      })
    },
    fileDelCancel () {
      this.dialogFormVisible = false
    },
    fileDelSubmit () {
      /* formData格式提交： */
      let formData = new FormData()
      for (var key in this.form) {
        console.log(key + '----------' + this.form[key])
        formData.append(key, this.form[key])
      }

      axios({
        method: 'post',
        url: 'delete',
        withCredentials: true,
        data: formData
      }).then((res) => {
        this.dialogFormVisible = false
        this.$router.go(0)
      })
    }
  },
  created () {
    this.getData()
  },
  mounted: function () {
    var vm = this
    // 用$on事件来接收参数
    this.bus.$on('search', (data) => {
      vm.search_content = data
      this.getData()
    })
  },
  beforeDestroy () {
    // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    this.bus.$off('search')
  }
}

</script>

<style scoped>

</style>
