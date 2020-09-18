<template> 
  <shop-detail :is-edit='false'></shop-detail>
</template>
<script>
  import ShopDetail from './shopManage/ShopDetail'
  export default {
    name: 'addShopManage',
    components: { ShopDetail }
  }
</script>
<style>
</style>


