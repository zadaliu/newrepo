<template> 
  <div class="app-container">
    <div>
      <div>
        <!--<i class="el-icon-search"></i>
        <span>筛选搜索</span>-->
        <el-button
          
          type="primary"
          @click="handleAdd()"
          size="small">
          创建分组
        </el-button>
           <el-input placeholder="名称" v-model="listQuery.name" @keyup.enter.native="handleSearchList" style="float:right;width:300px">
    					<el-button slot="append" icon="el-icon-search" @click="handleSearchList()">搜索</el-button>
  					</el-input>
        <!-- <el-select v-model="listQuery.type" placeholder="商品分组" clearable class="input-width" style="float:right">
              <el-option v-for="item in listQuery"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>-->
    
      </div>
      
    </div>
     <div class="table-container">
      <el-table ref="couponTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="分组名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.groupName}}</template>
        </el-table-column>
        <el-table-column label="优惠劵数量" width="200" align="center">
          <template slot-scope="scope">{{scope.row.count}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope">{{scope.row.creatTime|formatDate}}</template>
        </el-table-column>
        <el-table-column label="最后修改时间" width="200" align="center">
          <template slot-scope="scope">{{scope.row.modifiedTime|formatDate}}</template>
        </el-table-column>
        
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">复制链接</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    	
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,deleteCoupon,updateCoupon} from '@/api/coupongroup';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null
    
  };
  const input3 = "";
  const defaultTypeOptions=[
    {
      label: '折扣券',
      value: 0
    },
    {
      label: '满减券',
      value: 1
    }
  ];
  const defaultTypeOptions1=[
    {
      label: '未开始',
      value: 0
    },
    {
      label: '进行中',
      value: 1
    },
    {
      label: '已结束',
      value: 2
    }
  ];
  
  export default {
    name:'couponList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions),
        list:[],
        total:null,
        listLoading:false,
        multipleSelection:[],
        count:"0"
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatType(type){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(type===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatType1(type){
        for(let i=0;i<defaultTypeOptions1.length;i++){
          if(type===defaultTypeOptions1[i].value){
            return defaultTypeOptions1[i].label;
          }
        }
        return '';
      },
      formatUseType(useType){
        if(useType===0){
          return '全场通用';
        }else if(useType===1){
          return '指定分类';
        }else{
          return '指定商品';
        }
      },
      formatPlatform(platform){
        if(platform===1){
          return '移动平台';
        }else if(platform===2){
          return 'PC平台';
        }else{
          return '全平台';
        }
      },
      formatDate(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(endTime){
        let now = new Date().getTime();
        let endDate = new Date(endTime);
        if(endDate>now){
          return '未过期'
        }else{
          return '已过期';
        }
      }
     
    },
    methods:{
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd(){
        this.$router.push({path: '/sms/addGroup'})
      },
      handleView(index, row) {
        this.$router.push({path: '/sms/couponHistory', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/sms/updateGroup', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCoupon(row.id).then(response=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        })
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response=>{
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
     
    }
  }
</script>
<style scoped>
  .input-width {
    width: 150px;
  }
  .layout-title {
		color: #606266;
		padding: 15px 20px;
		background: #F2F6FC;
		font-weight: bold;
		border: 5px;
	}
	
	.un-handle-layout {
		margin-top: 50px;
		border: 0px solid #DCDFE6;
		width:1150px;
	}
	
	div>div>span {
		position: relative;
		margin-right: 65px;
	}
	
	.total-title1 {
		/*position: relative;*/
		display: inline-block;
		font-size: 13px;
		color: #909399;
		left: 70px;
		top: -50px;
	}
	
	.layout-t2 {
		position: relative;
		display: inline-block;
		width: 100px;
		height: auto;
		margin-right: 40px;
	}
	
	.layout-title1 {
		padding: 15px 20px;
		margin-top: 20px;
	}
	
	.layout-t4 {
		 float: right;
	}
	
		hr {
		background-color: #BBBBBB;
		height: 1px;
		border: none;
	}
</style>


