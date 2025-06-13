<script lang="ts" setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { videoPathMap } from "./index.ts";

const videoRef = ref(null)
const videoSrc = ref<string>(null)

// 获取当前路由信息
const route = useRoute();

const showVideoDialog = ref<boolean>(false);

const consolePath = () => {

  const currentPath = route.path;
  console.info("path", currentPath)
  for (let key in videoPathMap) {
    let videoPathMapElement = videoPathMap[key];
    console.info("key ", key, videoPathMapElement)
    if(currentPath.startsWith(key)) {
      videoSrc.value = videoPathMapElement
      showVideoDialog.value = true;
      return;
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
</script>

<template>
  <div class="notify">
    <VideoPlay @click="consolePath" class="svg-icon"/>
    <el-dialog title="帮助视频" v-model="showVideoDialog" destroy-on-close :width="950">
      <div class="video-container">
        <video
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
</style>
