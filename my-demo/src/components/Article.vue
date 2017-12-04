<!--suppress ALL -->
<template>
  <div class="article">
    <el-form :label-position="left" label-width="80px">
      <el-form-item label="URL : ">
        <el-input type="text" style="width:90%" id="thisUrl" v-model="linkUrl"/>
        <el-button @click="articleUrl">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="article_info">
      <div v-if="articleInfo.title">
        <h3>
          <span>{{articleInfo.title}}</span>
        </h3>
        <h4><span>{{articleInfo.name}}</span>&nbsp&nbsp<span>{{articleInfo.date}}</span></h4>
      </div>
      <el-form :label-position="left" label-width="80px">
        <el-form-item v-if="articleInfo.digest" label="摘要">
          <el-input type="textarea" autosize id="digest" v-model="articleInfo.digest"></el-input>
          <el-button @click="copyInput('digest')">复制</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.cover" label="封面">
          <div class="article_cover"><img :src="weixinImageApi+articleInfo.cover"></div>
          <a :href="weixinImageApi+articleInfo.cover" download="cover">
            <el-button>保存封面</el-button>
          </a>
        </el-form-item>
        <el-form-item v-if="articleInfo.images" label="图片">
          <el-input type="textarea" autosize id="images" v-model="articleInfo.images.join('\n')"/>
          <el-button @click="saveImgs">保存图片</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.videos" v-for="(video,index) in articleInfo.videos" label="视频">
          <el-input type="textarea" autosize v-bind:id="'video_'+index" v-model="articleInfo.videos[index]" />
          <el-button @click="copyInput('video_'+index)">复制视频链接</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.source" label="原文链接">
          <el-input type="textarea" autosize id="source" v-model="articleInfo.source"/>
          <el-button class="articleUrlButton" @click="copyInput('source')">复制原文链接</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'
  import ElInput from '../../node_modules/element-ui/packages/input/src/input.vue'
  import axios from 'axios'
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    components: {
      ElInput,
      ElFormItem,
      ElButton
    },
    name: 'article',
    data () {
      return {
        articleInfo: {},
        linkUrl: this.$store.state.url,
        weixinImageApi: BASE_API + '/weixin/image?url=',
      }
    },
    methods: {
      copyInput: function (id) {
        var input = document.getElementById(id)
        input.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
      },

      saveImgs: function () {
        const data = this.articleInfo.images// 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
        const zip = new JSZip()
        const cache = {}
        const promises = []
        data.forEach(item => {
            const promise = getFile(this.weixinImageApi + item).then(data => { // 下载文件, 并存成ArrayBuffer对象
              var imageFmt = 'jpg'
              var filename = Math.random() * 700 + 800
              filename = parseInt(filename, 10)
              const strs = item.toString().split('?')
              if (item.toString().includes('wx_fmt') && strs.length > 0) {
                const params = strs[1].split('&')
                if (params.length > 0) {
                  params.forEach(param => {
                    const format = param.split('=')
                    if (format[0] == 'wx_fmt') {
                      imageFmt = format[1]
                    }
                  })
                }
              } else {
                const strs = item.toString().split('/')
                if (strs[strs.length - 1].includes('.')) {
                  const format = strs[strs.length - 1].split("\\.");
                  imageFmt = format[1];
                  filename = format[0];
                }
              }

              if (imageFmt != 'jpg' && imageFmt != 'jpeg' && imageFmt != 'png' && imageFmt != 'gif') {
                imageFmt = 'jpg'
              }

              const file_name = filename + '.' + imageFmt // 获取文件名
              zip.file(file_name, data, {binary: true}) // 逐个添加文件
              cache[file_name] = data
            })
            promises.push(promise)
          }
        )

        Promise.all(promises).then(() => {
          zip.generateAsync({type: 'blob'}).then(content => { // 生成二进制流
            FileSaver.saveAs(content, 'images.zip') // 利用file-saver保存文件
          })
        })
      },
      articleUrl: function () {
        this.axios({
          method: 'get',
          params: {
            url: this.linkUrl
          },
          url: BASE_API + '/weixin/article'
        })
          .then((res) => {
            if (res.data.status) {
              this.articleInfo = res.data.data
              console.log(this.articleInfo)
//              this.$router.replace({path: '/hello'})
            } else {
              console.log(res.data)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
  const getFile = url => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer'
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error.toString())
      })
    })
  }

</script>

<style scoped>
  @import "../assets/css/article.css";
</style>
