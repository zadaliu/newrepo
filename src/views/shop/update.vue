<template> 
  <shop-detail :is-edit='true'></shop-detail>
</template>
<script>
  import ShopDetail from './shopManage/ShopDetail'
  export default {
    name: 'updateShopManage',
    components: { ShopDetail }
  }
</script>
<style>
</style>


