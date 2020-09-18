<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="分组名称：" prop="groupName">
        <el-input v-model="brand.groupName"></el-input>
      </el-form-item>
     
      <el-form-item label="是否启用：">
        <el-radio-group v-model="brand.isStatic">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否是礼包：">
        <el-radio-group v-model="brand.isGood">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <!--<el-form-item label="非区域商品：">
        <el-radio-group v-model="brand.isCity">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>-->
      
     
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">保存设置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createBrand,createGroup, getBrand, updateBrand} from '@/api/brand'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultBrand={
    groupName: '',
    isGood: 0,
    isStatic: 0,
    isCity : 0 
  };
  export default {
    groupName: 'BrandDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        brand:Object.assign({}, defaultBrand),
        rules: {
          groupName: [
            {required: true, message: '请输入分组名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
//        logo: [
//          {required: true, message: '请输入品牌logo', trigger: 'blur'}
//        ],
//        sort: [
//          {type: 'number', message: '排序必须为数字'}
//        ],
        }
      }
    },
    created() {
    	console.log("data======"+this.isEdit);
      if (this.isEdit) {
      	console.log("data======");
      	console.log("data"+response.data);
        getBrand(this.$route.query.id).then(response => {
          this.brand = response.data;
        });
      }else{
        this.brand = Object.assign({},defaultBrand);
      }
    },
    methods: {
      onSubmit(formName) {
      	
        this.$refs[formName].validate((valid) => {
        	console.log("valid=================="+valid)
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateBrand(this.$route.query.id, this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createGroup(this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.brand = Object.assign({},defaultBrand);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultBrand);
      }
    }
  }
</script>
<style>
</style>


