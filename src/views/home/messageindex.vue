<template>
	<div class="app-container">
		<div class="address-layout">
		</div>

		<div class="un-handle-layout">
			<div class="layout-title">会员分销

			</div>

		</div>
		<div class="un-handle-layout">
			<div class="layout-title">
				<span>通知场景</span>
				<span>接收人</span>
				<span>标题文案</span>
				<span>内容文案</span>
				<span>跳转链接</span>
				<span>操作</span>
			</div>
			<div class="layout-title1" v-for="(item,i) in pageNum0">
				<div class="layout-t2">
					<div class="layout-t3">{{item.informName}} </div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">{{item.recipientName}}</div>
				</div>
				<div class="layout-t2" >
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.title"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.content"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">
						<div class="layout-t3-1" style="margin-left: 25px;">
							商城首页
						</div>
					</div>
				</div>
				<div class="layout-t2" >
					<div class="layout-t3 layout-t3-1">
						<el-button type="text" @click="onclear(i)">清空内容</el-button>
						<el-button type="text" @click="choose1(item)">保存</el-button>
					</div>
				</div>
				<hr style="margin-top: 18px;"/>
			</div>
			
			<div class="layout-title1" v-for="(item , i) in pageNum" >
				<div class="layout-t2">
					<div class="layout-t3">
						{{item.informName}} </div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">{{item.recipientName}} </div>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.title"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.content"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">
						<div class="layout-t3-1">
							<el-button type="primary" size="small" >选择链接</el-button>
						</div>
					</div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3 layout-t3-1">
						<el-button type="text"  @click="onclear1(i)">清空内容</el-button>
						<el-button type="text" @click="choose1(item)">保存</el-button>
					</div>
				</div>
					<hr style="margin-top: 18px;"/>
			</div>
			
			
			
			
		

		</div>
	
		<div class="un-handle-layout">
			<div class="layout-title">区域代理

			</div>

		</div>
		<div class="un-handle-layout" >
			<div class="layout-title">
				<span>通知场景</span>
				<span>接收人</span>
				<span>标题文案</span>
				<span>内容文案</span>
				<span>跳转链接</span>
				<span>操作</span>
			</div>
			<div class="layout-title1" :flag="1" v-for="(item,i) in pageNum1">
				<div class="layout-t2">
					<div class="layout-t3">{{item.informName}} </div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">{{item.recipientName}} </div>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.title"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.content"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">
						<div style="width: 80px;">
							<div class="layout-t3-1">
							<el-button type="primary" size="small">选择链接</el-button>
						</div>
						</div>
					</div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3 layout-t3-1">
						<el-button type="text" @click="onclear2(i)">清空内容</el-button>
						<el-button type="text" @click="choose1(item)">保存</el-button>
					</div>
				</div>
				<hr style="margin-top: 18px;"/>
			</div>
			
			
		</div>
		<div class="un-handle-layout">
			<div class="layout-title">交易信息

			</div>

		</div>

		<div class="un-handle-layout">
			<div class="layout-title">
				<span>通知场景</span>
				<span>接收人</span>
				<span>标题文案</span>
				<span>内容文案</span>
				<span>跳转链接</span>
				<span>操作</span>
			</div>
			
			<div class="layout-title1" v-for="(item,i) in pageNum2">
				<div class="layout-t2">
					<div class="layout-t3">
						{{item.informName}}  </div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">{{item.recipientName}}</div>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.title"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
						<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="item.content"
					  maxlength="50"
					  rows="3"
					  show-word-limit
					  >
				</el-input>
				</div>
				<div class="layout-t2">
					<div class="layout-t3">
						<div class="layout-t3-1">
							<el-button type="primary" size="small">选择链接</el-button>
						</div>
					</div>
				</div>
				<div class="layout-t2">
					<div class="layout-t3 layout-t3-1">
						<el-button type="text" @click="onclear3(i)">清空内容</el-button>
						<el-button type="text" @click="choose1(item)">保存</el-button>
					</div>
				</div>
				<hr style="margin-top: 18px;"/>
			</div>
			
			
			

		</div>

		<!--<div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">200</el-col>
                <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
   </div>-->
	</div>
</template>

<script>
	
	import { str2Date } from '@/utils/date'
	import img_home_order from '@/assets/images/home_order.png';
	import img_home_today_amount from '@/assets/images/home_today_amount.png';
	import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
	import {queryList,update} from '@/api/message'
	const DATA_FROM_BACKEND = {
		columns: ['date', 'orderCount', 'orderAmount'],
		rows: [{
				date: '2018-11-01',
				orderCount: 10,
				orderAmount: 1093
			},
			{
				date: '2018-11-02',
				orderCount: 20,
				orderAmount: 2230
			},
			{
				date: '2018-11-03',
				orderCount: 33,
				orderAmount: 3623
			},
			{
				date: '2018-11-04',
				orderCount: 50,
				orderAmount: 6423
			},
			{
				date: '2018-11-05',
				orderCount: 80,
				orderAmount: 8492
			},
			{
				date: '2018-11-06',
				orderCount: 60,
				orderAmount: 6293
			},
			{
				date: '2018-11-07',
				orderCount: 20,
				orderAmount: 2293
			},
			{
				date: '2018-11-08',
				orderCount: 60,
				orderAmount: 6293
			},
			{
				date: '2018-11-09',
				orderCount: 50,
				orderAmount: 5293
			},
			{
				date: '2018-11-10',
				orderCount: 30,
				orderAmount: 3293
			},
			{
				date: '2018-11-11',
				orderCount: 20,
				orderAmount: 2293
			},
			{
				date: '2018-11-12',
				orderCount: 80,
				orderAmount: 8293
			},
			{
				date: '2018-11-13',
				orderCount: 100,
				orderAmount: 10293
			},
			{
				date: '2018-11-14',
				orderCount: 10,
				orderAmount: 1293
			},
			{
				date: '2018-11-15',
				orderCount: 40,
				orderAmount: 4293
			},
			{
				date: '2018-12-31',
				orderCount: 40,
				orderAmount: 4293
			},
			{
				date: '2019-01-02',
				orderCount: 40,
				orderAmount: 4293
			},
			{
				date: '2018-01-01',
				orderCount: 40,
				orderAmount: 4293
			},
			{
				date: '2018-01-04',
				orderCount: 40,
				orderAmount: 4293
			}
		]
	};

	export default {
		name: 'home',
		data() {
			return {
				options: [{
					value: '0',
					label: '全部时间'
				}, {
					value: '1',
					label: '昨日'
				}, {
					value: '2',
					label: '今日'
				}, {
					value: '3',
					label: '上月'
				}, {
					value: '4',
					label: '本月'
				}],
				value: '',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							let start = new Date();
							start.setFullYear(2018);
							start.setMonth(10);
							start.setDate(1);
							end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一月',
						onClick(picker) {
							const end = new Date();
							let start = new Date();
							start.setFullYear(2018);
							start.setMonth(10);
							start.setDate(1);
							end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value1: '',
				chartSettings: {
					xAxisType: 'time',
					area: true,
					axisSite: {
						right: ['orderAmount']
					},
					labelMap: {
						'orderCount': '订单数量',
						'orderAmount': '订单金额'
					}
				},
				chartData: {
					columns: [],
					rows: []
				},
				loading: false,
				dataEmpty: false,
				img_home_order,
				img_home_today_amount,
				img_home_yesterday_amount,
				pageNum:[],
				pageNum1:[],
				pageNum2:[],
				pageNum0:[],
				param:{}
				
				
				
				
			}
		},
		created() {
			this.initOrderCountDate();
			this.getData();
			this.getList();
		},
		methods: {
			handleDateChange() {
				this.getData();
			},
			initOrderCountDate() {
				let start = new Date();
				start.setFullYear(2018);
				start.setMonth(10);
				start.setDate(1);
				const end = new Date();
				end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
				this.orderCountDate = [start, end];
			},
			getData() {
				setTimeout(() => {
					this.chartData = {
						columns: ['date', 'orderCount', 'orderAmount'],
						rows: []
					};
					for(let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
						let item = DATA_FROM_BACKEND.rows[i];
						let currDate = str2Date(item.date);
						let start = this.orderCountDate[0];
						let end = this.orderCountDate[1];
						if(currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
							this.chartData.rows.push(item);
						}
					}
					this.dataEmpty = false;
					this.loading = false
				}, 1000)
			},
			
			onclear(i){
				
       			this.pageNum0[i].title="";
				this.pageNum0[i].content="";
				},
			onclear1(i){
				this.pageNum[i].title="";
				this.pageNum[i].content="";
			},
			onclear2(i){
				this.pageNum1[i].title="";
				this.pageNum1[i].content="";
			},
			onclear3(i){
				this.pageNum2[i].title="";
				this.pageNum2[i].content="";
			},
			choose1(item){
				let data = new URLSearchParams();
		        data.append('id',item.id);
		        data.append('title',item.title);
		        data.append("content",item.content);
		        update(data).then(response=>{
		          this.$message({
		            message: '修改成功',
		            type: 'success',
		            duration: 1000
		          });
		          
        			});
		
			},
			getList(){
        	queryList({type:1}).then(response => {
        	
          	this.pageNum1 = response.data;
          
        	});
        	queryList({type:0}).then(response => {
        	
          	this.pageNum = response.data;
          
        	});
        	queryList({type:2}).then(response => {
        	
          	this.pageNum2 = response.data;
          
        	});
        	queryList({type:3}).then(response => {
        	
          	this.pageNum0 = response.data;
          
        	});
      }
			}
			
		}
	
	
</script>

<style scoped>
	.app-container {
		margin-top: 40px;
		margin-left: 120px;
		margin-right: 120px;
	
	}
	
	.address-layout {}
	
	.total-layout {
		margin-top: 20px;
	}
	
	.total-frame {
		/*border: 1px solid #DCDFE6;*/
		padding: 20px;
		height: 100px;
	}
	
	.total-icon {
		color: #409EFF;
		width: 60px;
		height: 60px;
	}
	
	.total-title {
		position: relative;
		font-size: 16px;
		color: #909399;
		left: 70px;
		top: -50px;
	}
	
	.total-title1 {
		/*position: relative;*/
		display: inline-block;
		font-size: 13px;
		color: #909399;
		left: 70px;
		top: -50px;
	}
	
	.total-title2 {
		margin-left: 100px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.total-title3 {
		font-size: 16px;
		color: #909399;
	}
	
	.total-value {
		position: relative;
		font-size: 18px;
		color: #606266;
		left: 90px;
		top: -40px;
	}
	
	.un-handle-layout {
		margin-top: 10px;
		border: 0px solid #DCDFE6;
		width:910px;
	}
	
	.layout-title {
		color: #606266;
		padding: 15px 20px;
		background: #F2F6FC;
		font-weight: bold;
		border: 5px;
	}
	
	.layout-title1 {
		padding: 15px 20px;
	}
	
	.layout-t2 {
		position: relative;
		display: inline-block;
		width: 100px;
		height: auto;
		margin-right: 40px;
	}
	
	div>div>span {
		position: relative;
		margin-right: 85px;
	}
	
	.un-handle-content {
		padding: 20px 40px;
	}
	
	.un-handle-item {
		border-bottom: 1px solid #EBEEF5;
		padding: 10px;
	}
	
	.overview-layout {
		margin-top: 20px;
	}
	
	.overview-item-value {
		font-size: 24px;
		text-align: center;
	}
	
	.overview-item-title {
		margin-top: 10px;
		text-align: center;
	}
	
	.out-border {
		border: 1px solid #DCDFE6;
	}
	
	.statistics-layout {
		margin-top: 20px;
		border: 1px solid #DCDFE6;
	}
	
	.mine-layout {
		position: absolute;
		right: 140px;
		top: 107px;
		width: 250px;
		height: 235px;
	}
	
	.address-content {
		padding: 20px;
		font-size: 18px
	}
	
	.block {
		display: inline-block;
	}
	
	.total-line {
		position: relative;
		width: 1px;
		height: 140px;
		transform: scaleX(0.5);
		left: 18px;
		bottom: 100px;
		background: #E1E1E1;
	}
	
	.total-line-two {
		position: relative;
		width: 1px;
		height: 140px;
		transform: scaleX(0.5);
		left: 34px;
		bottom: 100px;
		background: #E1E1E1;
	}
	
	.total-line-three {
		position: relative;
		width: 60px;
		height: 60px;
		border: 1px solid #8B8B8B;
		border-radius: 5px;
		margin-bottom: 7px;
	}
	
	.total-line-three>img {
		width: 60px;
		height: 60px;
	}

	

	
	.layout-t3 {
		position: relative;
		display: inline-block;
		vertical-align: 20px;
		font-size: 14px;
		font-style: inherit;
	}
	.layout-t3-1{
		margin-left: 15px;
	}
	
	hr {
		background-color: #BBBBBB;
		height: 1px;
		border: none;
	}
</style>