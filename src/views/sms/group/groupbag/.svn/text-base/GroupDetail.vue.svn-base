<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="coupon"
             :rules="rules"
             ref="couponFrom"
             label-width="150px"
             size="small">
      <el-form-item label="分组名称" prop="groupName">
        <el-input v-model="coupon.groupName" class="input-width" ></el-input>
      </el-form-item>
       <el-form-item label="是否启用">
      	<el-radio v-model="coupon.useType" label="0">不启用</el-radio>
      	<el-radio v-model="coupon.useType" label="1">启用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('couponFrom')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCoupon,updateCoupon,getCoupon} from '@/api/coupongroup';
  const defaultCoupon = {
    groupName: null,
    creatTime: null,
    modifedTime: null,
    useType:"0"
    
  };
  
  export default {
    name: 'CouponDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        coupon: Object.assign({}, defaultCoupon),
        rules: {
          groupName: [
            {required: true, message: '请输入优惠券组名称', trigger: 'blur'},
//          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        },
        radio0:null,
        radio1:null,
        radio2:null,
        radio3:null,
        radio4:null,
        checked0:null,
        selectProduct:null,
        selectProductLoading: false,
        selectProductOptions:[],
        selectProductCate: null,
        productCateOptions: []
      }
    },
    created(){
      if(this.isEdit){
      	console.log("111111"+this.isEdit);
        getCoupon(this.$route.query.id).then(response=>{
          this.coupon=response.data;
          
        });
      }
//    this.getProductCateList();
    },
    methods:{
    	
      onSubmit(formName) {
    
        this.$refs[formName].validate((valid) => {
        let v = this;
          if (valid) {
            v.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(v.isEdit){
                updateCoupon(v.$route.query.id,v.coupon).then(response=>{
                  v.$refs[formName].resetFields();
                  v.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  v.$router.back();
                });
              }else{
                createCoupon(v.coupon).then(response=>{
                  v.$refs[formName].resetFields();
                  v.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  v.$router.back();
                });
              }
            });
          } else {
            v.$message({
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
        this.coupon = Object.assign({},defaultCoupon);
      },
      searchProductMethod(query){
        if (query !== '') {
          this.loading = true;
          fetchProductList({keyword:query}).then(response=>{
            this.loading=false;
            let productList = response.data;
            this.selectProductOptions = [];
            for(let i=0;i<productList.length;i++){
              let item = productList[i];
              this.selectProductOptions.push({productId:item.id,productName:item.name,productSn:item.productSn});
            }
          });
        } else {
          this.selectProductOptions = [];
        }
      },
      handleAddProductRelation(){
        if(this.selectProduct===null){
          this.$message({
            message: '请先选择商品',
            type: 'warning'
          });
          return
        }
        this.coupon.productRelationList.push(this.getProductById(this.selectProduct));
        this.selectProduct=null;
      },
      handleDeleteProductRelation(index,row){
        this.coupon.productRelationList.splice(index,1);
      },
      handleAddProductCategoryRelation(){
        if(this.selectProductCate===null||this.selectProductCate.length===0){
          this.$message({
            message: '请先选择商品分类',
            type: 'warning'
          });
          return
        }
        this.coupon.productCategoryRelationList.push(this.getProductCateByIds(this.selectProductCate));
        this.selectProductCate=[];
      },
      handleDeleteProductCateRelation(index,row){
        this.coupon.productCategoryRelationList.splice(index,1);
      },
      getProductById(id){
        for(let i=0;i<this.selectProductOptions.length;i++){
          if(id===this.selectProductOptions[i].productId){
            return this.selectProductOptions[i];
          }
        }
        return null;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getProductCateByIds(ids){
        let name;
        let parentName;
        for (let i = 0; i < this.productCateOptions.length; i++) {
          if (this.productCateOptions[i].value === ids[0]) {
            parentName = this.productCateOptions[i].label;
            for (let j = 0; j < this.productCateOptions[i].children.length; j++) {
              if (this.productCateOptions[i].children[j].value === ids[1]) {
                name = this.productCateOptions[i].children[j].label;
              }
            }
          }
        }
        return {productCategoryId: ids[1], productCategoryName: name, parentCategoryName: parentName};
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


