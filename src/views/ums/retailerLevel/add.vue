<template> 
  <retailer-detail :is-edit='false'></retailer-detail>
</template>
<script>
  import RetailerDetail from './components/RetailerDetail'
  export default {
    name: 'addRetailer',
    components: { RetailerDetail }
  }
</script>
<style>
</style>


