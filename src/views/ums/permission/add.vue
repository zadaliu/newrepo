<template> 
	  <permission-detail :is-edit='false'></permission-detail>
</template>
<script>
  import PermissionDetail from './perm/PermissionDetail'
  export default {
    name: 'permissionAdd',
    components: { PermissionDetail }
  }
</script>
<style>
</style>


