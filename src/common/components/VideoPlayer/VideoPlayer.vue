<template>
  <div class="video-container relative">
    <div class="aspect-video bg-black relative">
      <!-- 视频元素 -->
      <video
        ref="videoRef"
        class="w-full h-full object-contain"
        :poster="posterUrl"
        @loadeddata="onVideoLoaded"
        @waiting="onVideoWaiting"
        @playing="onVideoPlaying"
        @error="onVideoError"
      >
        <source :src="videoSrc" type="video/mp4">
        您的浏览器不支持HTML5视频播放。
      </video>

      <!-- 加载动画 -->
      <div
        v-if="isLoading || isBuffering"
        class="absolute inset-0 flex items-center justify-center bg-black/70 z-10"
      >
        <div class="spinner border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
      </div>

      <!-- 错误提示 -->
      <div v-if="hasError" class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
        <div class="text-red-500 text-xl mb-2">
          <i class="fa fa-exclamation-triangle"></i> 视频加载失败
        </div>
        <p class="text-gray-300 text-sm">{{ errorMessage }}</p>
        <button class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition" @click="retryLoad">
          重试
        </button>
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="controls p-3 bg-gray-900 text-white">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-3">
          <button @click="togglePlay" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition">
            <i class="fa fa-{{ isPlaying ? 'pause' : 'play' }}"></i>
          </button>
          <button @click="toggleMute" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition">
            <i class="fa fa-{{ isMuted || volume === 0 ? 'volume-off' : 'volume-up' }}"></i>
          </button>
          <input type="range" min="0" max="1" step="0.01" v-model.number="volume"
                 class="w-24 accent-primary" @input="setVolume">
          <div class="text-sm ml-2">{{ currentTime }} / {{ duration }}</div>
        </div>
        <div class="flex items-center gap-3">
          <select v-model.number="playbackRate" @change="setPlaybackRate" class="bg-gray-800 text-white text-sm rounded px-2 py-1">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2.0x</option>
          </select>
          <button @click="toggleFullscreen" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition">
            <i class="fa fa-expand"></i>
          </button>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container relative cursor-pointer" @click="seek">
        <div class="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" :style="{ width: progressPercentage + '%' }">
            <div class="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2"
                 :style="{ left: progressPercentage + '%' }"></div>
          </div>
        </div>
        <!-- 缓冲进度 -->
        <div class="absolute top-0 left-0 h-1 bg-gray-500/50 rounded-full"
             :style="{ width: bufferedPercentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'

const videoRef = ref(null)
const videoSrc = ref('https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4')
const posterUrl = ref('https://picsum.photos/800/450?grayscale') // 视频封面图

// 播放控制状态
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(0.8)
const playbackRate = ref(1.0)
const currentTime = ref('00:00')
const duration = ref('00:00')
const progressPercentage = ref(0)
const bufferedPercentage = ref(0)

// 加载状态
const isLoading = ref(true)     // 初始加载
const isBuffering = ref(false)  // 播放中缓冲
const hasError = ref(false)     // 加载错误
const errorMessage = ref('')    // 错误信息

// 监听窗口大小变化以调整全屏按钮图标
const isFullscreen = ref(false)

onMounted(() => {
  const video = videoRef.value

  // 监听视频事件
  video.addEventListener('loadedmetadata', onVideoMetadataLoaded)
  video.addEventListener('timeupdate', onTimeUpdate)
  video.addEventListener('progress', updateBufferProgress)
  video.addEventListener('ended', onVideoEnded)

  // 监听全屏状态变化
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)
})

onUnmounted(() => {
  const video = videoRef.value

  // 移除事件监听器防止内存泄漏
  video.removeEventListener('loadedmetadata', onVideoMetadataLoaded)
  video.removeEventListener('timeupdate', onTimeUpdate)
  video.removeEventListener('progress', updateBufferProgress)
  video.removeEventListener('ended', onVideoEnded)

  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
  document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
})

// 视频元数据加载完成
const onVideoMetadataLoaded = () => {
  const video = videoRef.value
  updateDuration(video.duration)
  isLoading.value = false
}

// 视频数据可用，可以播放
const onVideoLoaded = () => {
  isLoading.value = false
}

// 视频需要缓冲
const onVideoWaiting = () => {
  isBuffering.value = true
}

// 视频正在播放
const onVideoPlaying = () => {
  isPlaying.value = true
  isBuffering.value = false
}

// 视频播放结束
const onVideoEnded = () => {
  isPlaying.value = false
}

// 视频加载错误
const onVideoError = () => {
  const video = videoRef.value
  hasError.value = true

  switch (video.error.code) {
    case video.error.MEDIA_ERR_ABORTED:
      errorMessage.value = '视频加载被取消'
      break
    case video.error.MEDIA_ERR_NETWORK:
      errorMessage.value = '网络错误，无法加载视频'
      break
    case video.error.MEDIA_ERR_DECODE:
      errorMessage.value = '视频解码错误'
      break
    case video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      errorMessage.value = '视频格式不支持'
      break
    default:
      errorMessage.value = '未知错误'
  }
}

// 重试加载视频
const retryLoad = () => {
  hasError.value = false
  isLoading.value = true
  const video = videoRef.value
  video.load()
  video.play().catch(err => {
    console.error('自动播放失败:', err)
    isPlaying.value = false
  })
}

// 更新视频时长
const updateDuration = (totalSeconds) => {
  duration.value = formatTime(totalSeconds)
}

// 更新播放进度
const onTimeUpdate = () => {
  const video = videoRef.value
  currentTime.value = formatTime(video.currentTime)
  progressPercentage.value = (video.currentTime / video.duration) * 100
}

// 更新缓冲进度
const updateBufferProgress = () => {
  const video = videoRef.value
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1)
    const duration = video.duration

    if (duration > 0) {
      bufferedPercentage.value = (bufferedEnd / duration) * 100
    }
  }
}

// 格式化时间为 MM:SS 或 HH:MM:SS
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  } else {
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
}

// 切换播放/暂停状态
const togglePlay = () => {
  const video = videoRef.value
  if (video.paused) {
    video.play().catch(err => {
      console.error('播放失败:', err)
      isPlaying.value = false
    })
  } else {
    video.pause()
  }
}

// 切换静音状态
const toggleMute = () => {
  const video = videoRef.value
  video.muted = !video.muted
  isMuted.value = video.muted
}

// 设置音量
const setVolume = () => {
  const video = videoRef.value
  video.volume = volume.value
  isMuted.value = video.volume === 0
}

// 设置播放速度
const setPlaybackRate = () => {
  const video = videoRef.value
  video.playbackRate = playbackRate.value
}

// 点击进度条跳转到指定位置
const seek = (e) => {
  const progressBar = e.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const pos = (e.clientX - rect.left) / rect.width
  const video = videoRef.value
  video.currentTime = pos * video.duration
}

// 全屏控制
const toggleFullscreen = () => {
  const videoContainer = videoRef.value.parentElement
  const doc = document.documentElement

  if (!document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement) {
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen()
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen()
    } else if (videoContainer.mozRequestFullScreen) {
      videoContainer.mozRequestFullScreen()
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen()
    }
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    isFullscreen.value = false
  }
}

// 处理全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement ||
    !!document.webkitFullscreenElement ||
    !!document.mozFullScreenElement ||
    !!document.msFullscreenElement
}
</script>

<style scoped>
.video-container {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-container {
  height: 4px;
}

.controls {
  font-size: 14px;
}

/* 自定义滚动条样式 */
input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #4a5568;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  transition: all 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #2563eb;
  transform: scale(1.2);
}
</style>