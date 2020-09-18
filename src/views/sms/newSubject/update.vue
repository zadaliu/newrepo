<template> 
  <subjectDetail :is-edit='true'></subjectDetail>
</template>
<script>
   import subjectDetail from './subject/subjectDetail'
  export default {
    name: 'updateNewSubject',
    components: { subjectDetail }
  }
</script>
<style>
</style>


