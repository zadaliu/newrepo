<template> 
  <discount-detail :isEdit="false"></discount-detail>
</template>
<script>
  import DiscountDetail from './components/DiscountDetail'
  export default {
    name: 'addDiscount',
    components: { DiscountDetail }
  }
</script>
<style></style>
