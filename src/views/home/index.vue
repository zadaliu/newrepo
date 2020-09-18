<template>
	<div class="app-container" v-show="flg">
		<div class="address-layout">
		</div>
		<!--<div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <div class="total-icon"></div>
            <div class="total-title">今日订单总数</div>
            <div class="total-value">200</div>
          </div>
          
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <!--<el-col :span="6">-->
		<!--<div class="total-frame">-->
		<!--<svg-icon icon-class="total-week" class="total-icon">-->
		<!--</svg-icon>-->
		<!--<div class="total-title">近7天销售总额</div>-->
		<!--<div class="total-value">￥50000.00</div>-->
		<!--</div>-->
		<!--</el-col>-->
		<!--</el-row>
    </div>-->

		<div class="un-handle-layout">
			<div class="layout-title">数据概况&nbsp;

				<div class="total-title1">更新时间&nbsp;:&nbsp; {{home.serchDate | formatDateTime}}</div>
			</div>
			<br /> &nbsp;&nbsp;&nbsp;
			<template>

				<el-select v-model="checkSelect" @change="chickvalue" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</template>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<div class="block">
				<el-date-picker v-model="value1" type="daterange" @change="dataSearch" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>

			<div class="total-layout">
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">支付订单总数</div>
							<div class="total-value">{{home.orderOkCount}}</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title" style="text-indent:10px;">支付金额</div>
							<div class="total-value">{{home.orderOk}}</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">新进分销商数</div>
							<div class="total-value">{{home.retailerNew}}</div>
							<div class="total-line"></div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">累计分销商数</div>
							<div class="total-value">{{home.retailerNum}}</div>
						</div>
					</el-col>

					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">待发货订单数</div>
							<div class="total-value">{{home.orderUin}}</div>
							<div class="total-line-two"></div>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="total-frame">
						</div>
					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title" style="text-indent: 15px;">浏览量</div>
							<div class="total-value">3232</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">累计客户数</div>
							<div class="total-value">{{home.memberNum}}</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">待审核提现数</div>
							<div class="total-value">{{home.cashCount}}</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">待审核分销商数</div>
							<div class="total-value">0</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="total-frame">
							<div class="total-icon"></div>
							<div class="total-title">维权中订单数</div>
							<div class="total-value">2002</div>
						</div>

					</el-col>
					<!--<el-col :span="6">-->
					<!--<div class="total-frame">-->
					<!--<svg-icon icon-class="total-week" class="total-icon">-->
					<!--</svg-icon>-->
					<!--<div class="total-title">近7天销售总额</div>-->
					<!--<div class="total-value">￥50000.00</div>-->
					<!--</div>-->
					<!--</el-col>-->
				</el-row>
				<div style="margin-bottom: 25px;"></div>
			</div>

			<!--<div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>-->
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
		<div class="statistics-layout">
			<div class="layout-title">常用功能</div>
			<div class="total-title2">
				<el-row>
					<!--<el-col :span="3">
						<div class="total-line-three">
							<img src="../../assets/images/home_order.png" />

						</div>
						<div class="total-title3">店铺装修</div>-->
						<!--<div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>-->
					<!--</el-col>
					<el-col :span="3">
						<div class="total-line-three">
							<img src="../../assets/images/home_order.png" />

						</div>
						<div class="total-title3">消息推送</div>
					</el-col>-->
					<el-col :span="3">
						<div class="total-line-three" @click="orderList">

							<img src="../../assets/images/home_order.png" />
						</div>
						<div class="total-title3">订单管理</div>
					</el-col>
					<el-col :span="3">
						<div class="total-line-three" @click="dataList">

							<img src="../../assets/images/home_order.png" />
						</div>
						<div class="total-title3">数据分析</div>
					</el-col>
					<el-col :span="3">
						<div class="total-line-three" @click="retailerList">
							<img src="../../assets/images/home_yesterday_amount.png" />

						</div>
						<div class="total-title3">会员分销</div>
					</el-col>
					<!--<el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>-->
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { homeData,userCheckData } from '@/api/home';
	import { str2Date } from '@/utils/date';
	import { formatDate } from '@/utils/date';
	import store from '@/store';
	import moment from "moment";
	//import {fetchList} from '@api/companyAddress';
	import img_home_order from '@/assets/images/home_order.png';
	import img_home_today_amount from '@/assets/images/home_today_amount.png';
	import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
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
					label: '今日'
				}, {
					value: '2',
					label: '昨日'
				}, {
					value: '3',
					label: '本月'
				}, {
					value: '4',
					label: '上月'
				}],
				checkSelect: '',
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
				checkUser : {
					mobile: null
				},
				loading: false,
				dataEmpty: false,
				img_home_order,
				img_home_today_amount,
				img_home_yesterday_amount,
				home: {
					auditCount: '',
					cashCount: '',
					memberAll: '',
					orderOk: '',
					orderOkCount: '',
					orderUin: '',
					serchDate: ''
				},
				listQuery: {
					starttime: null,
					endtime: null
				},
				flg:true,
			}
		},
		filters: {
			formatDateTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		created() {
			console.log("++++++++++++++");
			console.log(store.getters.name);
			console.log("++++++++++++++");
			console.log(this.getToday()) //今日
			console.log(this.getYesterday()) //获取昨天的日期、
			console.log(this.getCurrMonthDays()) //本月日期
			console.log(this.getLastMonthDays()) //上个月日期
			this.checkUser.mobile=store.getters.name;
//			console.log(this.checkUser);
			
			userCheckData(this.checkUser).then(response => {
						console.log();
						if(response.data>0){
							this.flg=false;
						}
						
					})
			
			this.initOrderCountDate();
			this.getData();
			this.homeData();
		},
		methods: {

			homeData() {
				setTimeout(() => {
					homeData().then(response => {
						this.home = response.data;
					})
				}, 1000)
			},

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

			dataSearch() {
				let data = this.value1;
				console.log(data)
				if(data!=null){
					this.listQuery.starttime = data[0];
					this.listQuery.endtime = data[1];
				}else{
					this.listQuery.starttime = null;
					this.listQuery.endtime = null;
				}
				
				homeData(this.listQuery).then(response => {
					this.home = response.data;
				})
				
			},
			chickvalue() {
				if(this.checkSelect == 0) {
					homeData().then(response => {
						this.home = response.data;
					})
				} else if(this.checkSelect == 1) {
					let data = this.getToday();
					this.listQuery.starttime = data.starttime;
					this.listQuery.endtime = data.endtime;
					homeData(this.listQuery).then(response => {
						this.home = response.data;
					})

				} else if(this.checkSelect == 2) {
					let data = this.getYesterday();
					this.listQuery.starttime = data.starttime;
					this.listQuery.endtime = data.endtime;
					homeData(this.listQuery).then(response => {
						this.home = response.data;
					})
				} else if(this.checkSelect == 3) {
					let data = this.getCurrMonthDays();
					this.listQuery.starttime = data.starttime;
					this.listQuery.endtime = data.endtime;
					homeData(this.listQuery).then(response => {
						this.home = response.data;
					})
				} else if(this.checkSelect == 4) {
					let data = this.getLastMonthDays();
					this.listQuery.starttime = data.starttime;
					this.listQuery.endtime = data.endtime;
					homeData(this.listQuery).then(response => {
						this.home = response.data;
					})
				}
			},
			orderList() {
				this.$router.push({
					path: '/oms/order'
				})
			},
			dataList() {
				this.$router.push({
					path: '/data/achievement'
				})
			},
			retailerList() {
				this.$router.push({
					path: '/mem/retailerManage'
				})
			},
			// 获取今日的开始结束时间
			getToday() {
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
				obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss");
				return obj
			},
			//昨天
			getYesterday() {
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().add(-1, 'days').startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
				obj.endtime = moment(moment().add(-1, 'days').endOf('day').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				return obj
			},
			// 获取当前月的开始结束时间
			getCurrMonthDays() {
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().month(moment().month()).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				obj.endtime = moment(moment().month(moment().month()).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				return obj
			},
			// 获取上一个月的开始结束时间
			getLastMonthDays() {
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				obj.endtime = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				return obj
			},
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
		margin-top: 20px;
		border: 1px solid #DCDFE6;
	}
	
	.layout-title {
		color: #606266;
		padding: 15px 20px;
		background: #F2F6FC;
		font-weight: bold;
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
</style>