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
          <el-button  @click="copyInput('digest')">复制</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.cover" label="封面">
          <div class="article_cover"><img :src="articleInfo.cover"></div>
          <el-button @click="saveCover">保存封面</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.images" label="图片">
          <el-input type="textarea" autosize id="images" v-model="articleInfo.images"/>
          <el-button @click="saveImgs">保存图片</el-button>
        </el-form-item>
        <el-form-item v-if="articleInfo.videos" label="视频">
          <el-input type="textarea" autosize id="videos" v-model="articleInfo.videos"/>
          <el-button @click="copyInput('videos')">复制视频链接</el-button>
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
        linkUrl: this.$store.state.url
      }
    },
    methods: {
      copyInput: function (id) {
        var input = document.getElementById(id)
        input.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
      },
      saveCover: function () {
        this.axios({
          method: 'get',
          url: "http://pimg.39.net//PictureLib/A/f3/c4//org/13418114157068.jpg",
          responseType: 'arraybuffer'
        }).then(data => {
          resolve(data.data)
        }).catch(error => {
          reject(error.toString())
        })
      },
      saveImgs: function () {

      },
      articleUrl: function () {
        this.axios({
          method: 'get',
          params: {
            url: this.linkUrl
          },
          url: 'http://localhost:18080/weixin/article'
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
  function StartGETRequest(url, handler)
  {
    xmlhttp = null;
    if (is_ie) {
      var control = (is_ie5) ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP";
      try {
        xmlhttp = new ActiveXObject(control);
      } catch(e) {
        alert("You need to enable active scripting and activeX controls");
        DumpException(e);
      }
    } else {
      xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function() {handler();}
    if (url.indexOf("?") != -1){
      var urltemp = url + "&rand=" + UniqueNum();
    } else {
      var urltemp = url + "?rand=" + UniqueNum();
    }
    //alert(urltemp);
    xmlhttp.open('GET', urltemp, true);

    xmlhttp.send(null);
  }
</script>

<style scoped>
  @import "../assets/css/article.css";
</style>
