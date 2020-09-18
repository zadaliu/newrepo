<template> 
  <div class="app-container">
    <div>
      
            <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery"  label-width="140px">
          <el-form-item label="统计时间：">
          	<el-select v-model="state" placeholder="自然日" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        	<el-date-picker
      					v-model="value1"
     						type="date"
      					placeholder="支付时间">
    					</el-date-picker>
          <el-button type="primary" style="margin-left: 20px;">查询</el-button>
        </el-form>
      </div>

  </div>
  <div class="title-top">
  	 <el-row>
  			<el-col :span="3">
  				<div class="grid-content">
  					<el-span class="span1">浏览访问</el-span>
  				</div>
  			</el-col>
  			<el-col :span="18">
  				<div class="grid">
  						<el-row>
  						<el-col :span="4">
  							<div class="grid-content-3">
  								<div class="total-title">访客数</div>
  								<div class="total-value">3450</div>
  								<div class="total-amount">较前一日上涨21%</div>
  							</div>
  						</el-col>
 							<el-col :span="4"><div class="grid-content-3" style="margin-left: 40px;">
 								<div class="total-title">新访客数</div>
  								<div class="total-value">450</div>
  								<div class="total-amount">较前一日上涨21%</div>
 							</div></el-col>
 							<el-col :span="4">
  							<div class="grid-content-3" style="margin-left: 80px;">
  								<div class="total-title">浏览量</div>
  								<div class="total-value">32456</div>
  								<div class="total-amount">较前一日上涨21%</div>
  							</div>
  						</el-col>
 							<el-col :span="4"><div class="grid-content-3" style="margin-left: 80px;">
 								<div class="total-title">平均停留时长</div>
  								<div class="total-value">145.1</div>
  								<div class="total-amount">较前一日上涨21%</div>
 							</div></el-col>
 						<el-col :span="12"></el-col>
 							<el-col :span="4">
  							<div class="grid-content-3" style="margin-top: 40px;">
  								<div class="total-title">人均浏览量</div>
  								<div class="total-value">8.1</div>
  								<div class="total-amount">较前一日上涨21%</div>
  							</div>
  						</el-col>
 							<el-col :span="4"><div class="grid-content-3" style="margin-left: 40px;margin-top: 40px;">
 								<div class="total-title">跳失率</div>
  								<div class="total-value">34.5%</div>
  								<div class="total-amount">较前一日上涨21%</div>
 							</div></el-col>
  						
					</el-row>
  			</div>
  			</el-col>
		</el-row>
  </div>
  <div class="title-top-2" >
  	 <el-row>
  			<el-col :span="3"><div class="grid-content-2">
  				<el-span class="span2">成交转化</el-span>
  			</div></el-col>
  			<el-col :span="18">
  				<div class="grid-content-2">
  				<el-row>
  						<el-col :span="4">
  							<div class="grid-content-3">
  								<div class="total-title">支付人数</div>
  								<div class="total-value">8.1%</div>
  								<div class="total-amount">较前一日上涨21%</div>
  							</div>
  						</el-col>
 							<el-col :span="4"><div class="grid-content-3" style="margin-left: 40px;">
 								<div class="total-title">访问-支付转化率</div>
  								<div class="total-value">34.5%</div>
  								<div class="total-amount">较前一日上涨21%</div>
 							</div></el-col>
  						<el-col :span="4"><div class="grid-content-3"></div></el-col>
  						<el-col :span="4"><div class="grid-content-3"></div></el-col>
					</el-row>
  			</div>
  			</el-col>
		</el-row>
  </div>
 
   <div id="app" style="margin-top: 80px;">
    <v-chart class="my-chart" :options="bar"/>
  </div>
 </div>
</template>
<script>
  import {fetchList,deleteCoupon} from '@/api/newcoupon';
  import {formatDate} from '@/utils/date';
  import ECharts from "vue-echarts/components/ECharts";
	import "echarts/lib/chart/bar";
  
  export default {
    name:'couponList',
    name: "App",
  components: {
    "v-chart": ECharts
  },
    data() {
      return {
      	bar: {
        title: {
          text: ""
        },
        tooltip: {
        	shared: true
        },
        plotOptions: {
				column: {
				grouping: false,
				shadow: false,
				borderWidth: 0
				},
					bar: {
					dataLabels: {
					enabled: true,
					allowOverlap: true,
					
					
				
			}
		}
	},
        legend: {
         shadow: false
        },
        yAxis: {
        /*	 axisLine:{       //y轴
          show:false

        },*/
       	show:true,
        axisTick:{       //y轴刻度线
          show:false
        },
        splitLine: {     //网格线
          show: true
        },
          data: ["0","0.2", "0.4", "0.6", "0.8", "1"]
        },
        xAxis: {
        	show:true,
        	splitLine: {     //网格线
          show: true
        }
        },
        series: [
          {
            name: "访客数",
            type: "line",
            color: 'rgba(30,144,255,1)',
            barWidth: 15,
            barGap: "-100%",
            data: []
          },
          /*{
            name: "支付总额",
            type: "line",
            color: 'rgba(124,252,0,1)',
            barGap: "-100%",
            barWidth: 15,
            data: [70, 60, 50, 40, 30, 20,10]
          },
           {
            name: "支付件数",
            type: "line",
            color: 'rgba(255,97,0,1)',
            barGap: "-100%",
            barWidth: 15,
            data: [1, 2, 3 ,5, 7, 13,15]
          }*/
        ]
      },
    
        listQuery:[],
        state:'',
        value1:''
        
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatType(type){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(type==defaultTypeOptions[i].value){
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
        return formatDate(date, 'yyyy-MM-dd')
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
      /*handleResetSearch() {
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
        this.$router.push({path: '/sms/addCoupon1'})
      },
      handleAdd1(){
        this.$router.push({path: '/sms/addCoupon3'})
      },
      handleView(index, row) {
        this.$router.push({path: '/sms/couponHistory', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/sms/updateCoupon1', query: {id: row.id}})
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
    }*/
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
	.my-chart {
  width: 800px;
  height: 500px;
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
	.grid-content{
		height: 300px;
		background-color: #888888;
		border-right: 1px solid #F2F6FC;
	}
	.grid-content-2{
		
		height: 150px;
		background-color: #AAAAAA;
		border-right: 1px solid #F2F6FC;
	}
	.grid-content-3{
		width: 200px;
		
	}
	.grid{
		height: 300px;
		background-color: #888888;
	}
	.title-top{
		margin-left: 80px;
		margin-top: 20px;
	}
	.title-top-2{
		margin-left: 80px;
		margin-top: 4px;
	}
	.span1{
		display: inline-block;
		margin-top: 150px;
		margin-left: 30px;
		color: #E6E6E6;
	}
	.span2{
		display: inline-block;
		margin-top: 70px;
		margin-left: 30px;
		color: #E6E6E6;
	}
	.total-title{
		margin-left: 50px;
		margin-top: 20px;
		font-size: 14px;
		color: #000000;
		
	}
	.total-value{
		margin-left: 50px;
		margin-top: 40px;
		font-size: 14px;
		color: #000000;
	
	}
	.total-amount{
		margin-left: 50px;
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
	}
</style>


