<template> 
  <we-chat-detail :is-edit='false'></we-chat-detail>
</template>
<script>
  import weChatDetail from './weChatManage/weChatDetail'
  export default {
    name: 'addWeChatBannerManage',
    components: { weChatDetail }
  }
</script>
<style>
</style>


