<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="coupon"
             :rules="rules"
             ref="couponFrom"
             label-width="150px"
             size="small">
      <el-form-item label="优惠券名称">
        <el-input v-model="coupon.couponName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="优惠券礼包组">
        <el-select v-model="coupon.couponGiftBagId">
          <el-option
            v-for="type in bags"
            :key="type.id"
            :label="type.groupName"
            :value="type.id">
          </el-option>
        </el-select>
      </el-form-item>
      
      <!--<el-form-item label="适用平台：">
        <el-select v-model="coupon.platform">
          <el-option
            v-for="item in platformOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="发放总量" >
        <el-input v-model.number="coupon.count" placeholder="只能输入正整数" class="input-width"></el-input>
      </el-form-item>
      <!--<el-form-item label="适用商品" prop="publishCount">
      	<el-radio v-model="radio0" label="1">全部商品</el-radio>
      	<br />
      	<el-radio v-model="radio0" label="2">指定商品</el-radio>-->
      	<el-form-item label="适用商品">
        <el-radio-group v-model="coupon.commonType">
          <el-radio-button :label="0">全部商品</el-radio-button>
          <el-radio-button :label="1">指定商品</el-radio-button>
        </el-radio-group>
      </el-form-item>
        <el-form-item v-show="coupon.useType===1">
        <el-cascader
          clearable
          placeholder="请选择分类名称"
          v-model="selectProductCate"
          :options="productCateOptions">
        </el-cascader>
        <el-button @click="handleAddProductCategoryRelation()">添加</el-button>
        <el-table ref="productCateRelationTable"
                  :data="coupon.productCategoryRelationList"
                  style="width: 100%;margin-top: 20px"
                  border>
          <el-table-column label="分类名称" align="center">
            <template slot-scope="scope">{{scope.row.parentCategoryName}}>{{scope.row.productCategoryName}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         @click="handleDeleteProductCateRelation(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      </el-form-item>
      <el-form-item label="使用门槛" >
      	<el-radio v-model="coupon.minPoint" label="0">无门槛</el-radio>
      	<br />
      	<el-radio v-model="coupon.minPoint" label="1">订单满
      		<el-input type="text" v-model="radio0" placeholder="请输入金额" style="width:100px" ></el-input>元
      	</el-radio>
      </el-form-item>
        <el-form-item label="优惠内容" >
  					打
      		<el-input v-model="radio1" placeholder="请输入金额" style="width:100px" ></el-input>折
      		<br />
      		<el-checkbox  :label="1">最多优惠
      		<el-input v-model="radio1" placeholder="请输入金额" style="width:100px" ></el-input>元
      		</el-checkbox>
      	
      </el-form-item>
        <el-form-item label="用券时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="coupon.startTime" style="width: 150px"></el-date-picker>
        <span style="margin-left: 20px;margin-right: 20px">至</span>
        <el-date-picker type="date" placeholder="选择日期" v-model="coupon.endTime" style="width: 150px"></el-date-picker>
      </el-form-item>
        <el-form-item label="可用时间" >
      	<el-radio v-model="radio2" label="1">领券当日起
      	<el-input v-model="coupon.uptimeToday" placeholder="请输入金额" style="width:100px" ></el-input>
      	天内可用
      	</el-radio>
      	<br />
      	<el-radio v-model="radio2" label="2">领券次日起
      		<el-input v-model="coupon.uptimeTomorrow" placeholder="请输入金额" style="width:100px" ></el-input>
      		天内可用
      	</el-radio>
      </el-form-item>
       <!--<el-form-item label="领取限制" prop="publishCount">
      	<el-radio v-model="radio3" label="1">不限制,所有人可领取</el-radio>
      	<br />
      	<el-radio v-model="radio3" label="2">指定客户等级领取</el-radio>
      </el-form-item>-->
      <el-form-item label="领取限制">
        <el-radio-group v-model="coupon.useType1">
          <el-radio-button :label="0">不限制</el-radio-button>
          <el-radio-button :label="1">指定客户等级</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分享设置" >
      	<el-checkbox v-model="coupon.couponShare" :label="1">优惠券允许被分享</el-checkbox>
      </el-form-item>
      <!--<el-form-item label="面额：" prop="amount">
        <el-input v-model.number="coupon.amount" placeholder="面值只能是数值，限2位小数" class="input-width">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领：">
        <el-input v-model="coupon.perLimit" placeholder="只能输入正整数" class="input-width">
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="minPoint">
        <el-input v-model.number="coupon.minPoint" placeholder="只能输入正整数" class="input-width">
          <template slot="prepend">满</template>
          <template slot="append">元可用</template>
        </el-input>
      </el-form-item>
    
      <el-form-item label="可使用商品：">
        <el-radio-group v-model="coupon.useType">
          <el-radio-button :label="0">全场通用</el-radio-button>
          <el-radio-button :label="1">指定分类</el-radio-button>
          <el-radio-button :label="2">指定商品</el-radio-button>
        </el-radio-group>
      </el-form-item>-->
    

      <el-form-item label="使用说明">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="coupon.couponExplain">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('couponFrom')">保存</el-button>
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCoupon,getCoupon,updateCoupon} from '@/api/newcoupon';
  import {queryList} from '@/api/coupongroup';
  import {fetchSimpleList as fetchProductList} from '@/api/product';
  import {fetchListWithChildren} from '@/api/productCate'
  const defaultCoupon = {
  	couponType:0,
    couponGiftBagId: null,
    commonType:0,
    couponName: null,
    count: null,
    couponAmountDiscount:null,
    amount: null,
    perLimit: 1,
    minPoint: null,
    startTime: null,
    endTime: null,
    uptimeToday:null,
    uptimeTomorrow:null,
    couponShare:null,
    useType: 0,
    useType1: 0,
    note: null,
    publishCount: null,
    couponExplain:null,
    productRelationList: [],
    productCategoryRelationList: []
  };
  const defaultTypeOptions = [
    {
      label: '全场赠券',
      value: 0
    },
    {
      label: '会员赠券',
      value: 1
    },
    {
      label: '购物赠券',
      value: 2
    },
    {
      label: '注册赠券',
      value: 3
    }
  ];
  const defaultPlatformOptions = [
    {
      label: '全平台',
      value: 0
    },
    {
      label: '移动平台',
      value: 1
    },
    {
      label: 'PC平台',
      value: 2
    }
  ];
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
        typeOptions: Object.assign({}, defaultTypeOptions),
        platformOptions: Object.assign({}, defaultPlatformOptions),
        rules: {
          name: [
            {required: true, message: '请输入优惠券名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          publishCount: [
            {type: 'number',required: true, message: '只能输入正整数', trigger: 'blur'}
          ],
          amount: [
            {type: 'number',required: true,message: '面值只能是数值，0.01-10000，限2位小数',trigger: 'blur'}
          ],
          minPoint: [
            {type: 'number',required: true,message: '只能输入正整数',trigger: 'blur'}
          ]
        },
        bags:[],
        radio0: null,
        radio1: null,
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
        getCoupon(this.$route.query.id).then(response=>{
          this.coupon=response.data;
        });
      }
      this.getProductCateList();
      this.getList();
      	
      },
    
    methods:{
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
              	console.log("222222");
                updateCoupon(this.$route.query.id,this.coupon).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }else{
              	console.log("111111111"+this.coupon);
                createCoupon(this.coupon).then(response=>{
                	
                  this.$refs[formName].resetFields();
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
      resetForm() {
        this.$router.back();
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
      getList(){
      	queryList().then(response =>{
      	this.bags = response.data;
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


