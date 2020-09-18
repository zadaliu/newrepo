<template> 
  <subjectDetail :is-edit='false'></subjectDetail>
</template>
<script>
  import subjectDetail from './subject/subjectDetail'
  export default {
    name: 'addNewSubject',
    components: { subjectDetail }
  }
</script>
<style>
</style>


