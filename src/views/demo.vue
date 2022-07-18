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
          <el-input v-model="form.name" autocomplete="off" show-passwor size="small"></el-input>
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
export default {
  name: 'demo',
  data () {
    return {
      list: false,
      form: {
        name: ''
      },
      dialogFormVisible: false,
      fileList: [],
      tableData: []
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
          text: this.input
        }
      }).then((res) => {
        this.tableData = res.data
        console.log('数据：', this.tableData)
      })
    }
    // formatFileSize (bytes, decimalPoint) {
    //   if (bytes === 0) return '0 Bytes'
    //   // eslint-disable-next-line one-var
    //   const k = 1000,
    //     dm = decimalPoint || 2,
    //     sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //     i = Math.floor(Math.log(bytes) / Math.log(k))
    //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    // }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
