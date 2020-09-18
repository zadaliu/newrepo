<template> 
  <supplier-detail :is-edit='true'></supplier-detail>
</template>
<script>
  import supplierDetail from './supplierManage/supplierDetail'
  export default {
    name: 'updateSupplierManage',
    components: { supplierDetail }
  }
</script>
<style>
</style>


