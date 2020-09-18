<template> 
  <div class="app-container">
    <div>
      
            <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery"  label-width="140px">
          <el-form-item label="统计时间：">
          	<el-select v-model="listQuery.state" placeholder="自然日" clearable class="input-width">
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
   <div id="app">
    <v-chart class="my-chart" :options="bar"/>
  </div>
 </div>
</template>
<script>
  import {fetchList,deleteCoupon} from '@/api/newcoupon';
  import {formatDate} from '@/utils/date';
  import ECharts from "vue-echarts/components/ECharts";
	import "echarts/lib/chart/bar";
   const defaultTypeOptions3=[
    {
      label: '今天',
      value: 0
    },
    {
      label: '昨天',
      value: 1
    }
  ];
  const defaultListQuery={
  	pageNum: 1,
    pageSize: 10,
    name: null,
    type: null,
    state:null,
    name:null
  };
  export default {
    name:'couponList',
    name: "App",
  components: {
    "v-chart": ECharts
  },
    data() {
      return {
      	listQuery:Object.assign({},defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions3),
      	bar: {
        title: {
          text: "选择指标："
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
       	
        axisTick:{       //y轴刻度线
          show:false
        },
        splitLine: {     //网格线
          show: false
        },
          data: ["300-350元","250-300元", "200-250元", "150-200元", "100-150元", "5-100元", "0-50元"]
        },
        xAxis: {
        	show:false,
        	splitLine: {     //网格线
          show: false
        }
        },
        series: [
          {
            name: "客户数",
            type: "bar",
            color: 'rgba(30,144,255,1)',
            barWidth: 15,
            barGap: "-100%",
            data: [5, 10, 20, 30, 40, 50,60]
          },
          {
            name: "支付总额",
            type: "bar",
            color: 'rgba(124,252,0,1)',
            barGap: "-100%",
            barWidth: 15,
            data: [70, 60, 50, 40, 30, 20,10]
          },
           {
            name: "支付件数",
            type: "bar",
            color: 'rgba(255,97,0,1)',
            barGap: "-100%",
            barWidth: 15,
            data: [1, 2, 3 ,5, 7, 13,15]
          }
        ]
      },
    
        
        value1:''
        
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatType(type){
        for(let i=0;i<defaultTypeOptions3.length;i++){
          if(type==defaultTypeOptions3[i].value){
            return defaultTypeOptions3[i].label;
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
</style>


