<script lang="ts" setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { videoPathInfo, videoPathItem } from "./index.ts"

const videoRef = ref(null)
const videoSrc = ref<string>(null)
const videoItemList = ref<videoPathItem[]>([])
// 获取当前路由信息
const route = useRoute()

const showVideoDialog = ref<boolean>(false)
const showVideoItem = ref<boolean>(false)

const playVideoFun = () => {
  showVideoDialog.value = false
  showVideoItem.value = false
  videoSrc.value = ""
  const currentPath = route.path
  console.info("path", currentPath)
  for (let key in videoPathInfo) {
    const videoPathMapElement = videoPathInfo[key]
    console.info("key ", key, videoPathMapElement)
    if(currentPath.startsWith(videoPathMapElement.url)) {
      const videoItemListTmp = videoPathMapElement.videoItemList
      if(videoItemListTmp.length === 1) {
        videoSrc.value = videoItemListTmp[0].url
        showVideoItem.value = true
      } else {
        videoItemList.value = videoItemListTmp
      }
      showVideoDialog.value = true
      return
    }
  }
  ElMessage.warning("本页面暂时无法提供帮助视频")
}

// 切换播放/暂停状态
const togglePlay = () => {
  const video = videoRef.value
  if(video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

const playVideoItem = (item: videoPathItem) => {
  videoSrc.value = item.url
  console.info("playVideoItem ", videoSrc.value)
  showVideoItem.value = true
  // togglePlay()
}
</script>

<template>
  <div class="notify">
    <VideoPlay @click="playVideoFun" class="svg-icon"/>
    <el-dialog title="帮助视频" v-model="showVideoDialog" :destroy-on-close="true" :width="950">
      <div class="video-container">
        <div v-show="!showVideoItem">
          <div class="videoItem" v-for="item in videoItemList" @click="playVideoItem(item)">{{ item.name }}</div>
        </div>
        <video
          v-if="showVideoItem"
          width="96%" height="550px"
          ref="videoRef"
          class="video-player"
          controls
          autoplay
          muted
          loop
          @click="togglePlay"
        >
          <source :src="videoSrc" type="video/mp4">
          您的浏览器不支持HTML5视频播放。
        </video>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  width: 20px;
  height: 20px;

  &:focus {
    outline: none;
  }
}

.video-container {
  text-align: center;
}

.videoItem:before {
  content: "-";
  margin-right: 5px;
}

.videoItem {
  line-height: 30px;
  height: 30px;
  font-size: 17px;
  text-align: left;
  margin-left: 10px;
}
</style>
