<template>
	<div class="app-container">
		<div>
			<div>

				<el-button type="primary" @click="handleAdd()" size="small">
					新建满减券
				</el-button>
				<el-button type="primary" @click="handleAdd1()" size="small">
					新建折扣券
				</el-button>
				<el-input placeholder="请输入优惠券名称" v-model="listQuery.name" @keyup.enter.native="handleSearchList()" style="float:right;width:300px">
					<el-button slot="append" icon="el-icon-search" @click="handleSearchList()">搜索</el-button>
				</el-input>
				<el-select v-model="listQuery.state" placeholder="全部状态" clearable class="input-width" style="float:right;margin-right: 30px">
					<el-option v-for="item in typeOptions1" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="listQuery.type" placeholder="全部类型" clearable class="input-width" style="float:right;margin-right: 15px">
					<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

			</div>

		</div>

		<div class="table-container">
			<el-table ref="couponTable" :data="list" style="width: 100%;" v-loading="listLoading" border>

				<el-table-column label="优惠劵名称" align="center">
					<template slot-scope="scope">{{scope.row.couponName}}</template>
				</el-table-column>

				<el-table-column label="类型" align="center">
					<template slot-scope="scope">{{scope.row.couponType | formatType}}</template>
				</el-table-column>
				<el-table-column label="优惠内容" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.couponType ==1">无门槛，减{{scope.row.couponAmountDiscount}}元</div>
						<div v-else>无门槛，打{{scope.row.couponAmountDiscount}}折</div>
					</template>

				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">{{scope.row.status|formatStatus}}</template>
				</el-table-column>
				<el-table-column label="以领取/剩余" align="center">
					<template slot-scope="scope">
						<span style="color: #91BBE9;" @click="openTheCopon(scope.$index, scope.row)">{{scope.row.getCount}}/{{scope.row.count-scope.row.getCount}}</span>
					</template>
				</el-table-column>
				<el-table-column label="以使用" align="center">
					<template slot-scope="scope">{{scope.row.total}}</template>
				</el-table-column>
				<el-table-column label="支付金额" align="center">
					<template slot-scope="scope">{{scope.row.couponAmount}}</template>
				</el-table-column>
				<el-table-column label="客单价" align="center">
					<template slot-scope="scope">{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="创建时间" align="center">
					<template slot-scope="scope">{{scope.row.insDate|formatDate}}</template>
				</el-table-column>
				<el-table-column label="状态" width="200" align="center">
					<template slot-scope="scope">
						<el-switch @change="handleRecommendStatusStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.status">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">

						<el-button size="mini" type="text" @click="lockUp(scope.$index, scope.row)">查看效果
						</el-button>
						<!--<el-button size="mini" type="text" @click="handleView(scope.$index, scope.row)">查看</el-button>-->
						<el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
							编辑</el-button>

<!--<el-button size="mini" v-if="scope.row.status!=0" type="text" @click="handleDelete(scope.$index, scope.row)">关闭</el-button>-->					
					</template>
			
				</el-table-column>
			</el-table>
		</div>

		<el-dialog title="效果数据" :visible.sync="dialogTableVisible">
			<!--<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">活动名称:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">{{}}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>-->
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">订单实付金额</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">优惠总金额</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>费效比</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>用券笔单价</el-col>
			</el-row>

			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">￥{{assebleEffect.countMoney==null?0:assebleEffect.countMoney}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">￥{{assebleEffect.countCouponAmount==null?0:assebleEffect.countCouponAmount}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">{{parseFloat(assebleEffect.countCouponAmount/assebleEffect.countMoney).toFixed(2)|formatNan}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">{{parseFloat(assebleEffect.sumCouponAmount/assebleEffect.countCouponAmount).toFixed(2)|formatNan}}</div>
				</el-col>
			</el-row>
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">用劵老客户数</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">用劵新客户数</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">购买商品件数</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">{{assebleEffect.outMember==null?0:assebleEffect.outMember}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">{{assebleEffect.newMember==null?0:assebleEffect.newMember}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<div class="grid-content bg-purple">{{assebleEffect.productCount==null?0:assebleEffect.productCount}}</div>

					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
			<el-col :span="6">
				<!--<div class="grid-content bg-purple">{{assebleEffect.productCount}}</div>-->
			</el-col>
			<el-row style="padding-top: 60px;">
				<el-col :span="12">
					<div class="grid-content bg-purple">使用优惠券购买的商品</div>
				</el-col>
			</el-row>

			<el-row>
				<el-table :data="tableData3" width="100%" ref="multipleTable">

					<el-table-column prop="productName" label="商品图片">
						<template slot-scope="scope">
							<img :src="scope.row.productPic" style="height: 80px">
						</template>
					</el-table-column>
					<el-table-column prop="productName" label="商品"> </el-table-column>
					<el-table-column prop="productQuantity" label="商品件数"></el-table-column>
					<el-table-column prop="countMember" label="付款人数"></el-table-column>
				</el-table>
			</el-row>
		</el-dialog>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { fetchList, updateCouponStatus, couponInfo } from '@/api/newcoupon';
	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		name: null,
		type: null,
		state: null
	};
	const defaultTypeOptions = [{
			label: '折扣券',
			value: 0
		},
		{
			label: '满减券',
			value: 1
		}
	];
	const defaultTypeOptions1 = [{
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
		name: 'couponList',
		data() {
			return {
				tableData3: [{
					id: '1',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					IsAudit: 0,
					sex: '1'
				}, {
					id: '2',
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					IsAudit: 1,
					sex: '0'
				}, {
					id: '3',
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					IsAudit: 10,
					sex: '-1'
				}],
				assebleEffect: Object,
				dialogTableVisible: false,
				listQuery: Object.assign({}, defaultListQuery),
				listQuery1: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				typeOptions1: Object.assign({}, defaultTypeOptions1),
				list: null,
				total: null,
				input3: null,
				listLoading: false,
				multipleSelection: []
			}
		},
		created() {
			this.getList();
		},
		filters: {
			formatDate(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatNan(type) {
				if(isNaN(type)) {
					return '0';
				}
				return type;
			},
			formatType(type) {
				for(let i = 0; i < defaultTypeOptions.length; i++) {
					if(type == defaultTypeOptions[i].value) {
						return defaultTypeOptions[i].label;
					}
				}
				return '';
			},
			formatType1(type) {
				for(let i = 0; i < defaultTypeOptions1.length; i++) {
					if(type === defaultTypeOptions1[i].value) {
						return defaultTypeOptions1[i].label;
					}
				}
				return '';
			},
			formatUseType(useType) {
				if(useType === 0) {
					return '全场通用';
				} else if(useType === 1) {
					return '指定分类';
				} else {
					return '指定商品';
				}
			},
			formatPlatform(platform) {
				if(platform === 1) {
					return '移动平台';
				} else if(platform === 2) {
					return 'PC平台';
				} else {
					return '全平台';
				}
			},
		
			formatStatus(endTime) {
				if(endTime == 1) {
					return '开始';
				} else if(endTime == 0) {
					return '关闭';
				}
			}
		},
		methods: {
			lockUp(index, row) {
				this.dialogTableVisible = true
				couponInfo(row.id).then(response => {
					this.assebleEffect = response.data
					console.log(this.assebleEffect)
					this.tableData3 = response.data.list
				})

			},
			handleRecommendStatusStatusChange(index, row) {
				this.updateRecommendStatusStatus(row.id, row.status);
			},
			updateRecommendStatusStatus(ids,status){
		        this.$confirm('是否要修改状态?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let params=new URLSearchParams();
		          params.append("id",ids);
		          params.append("status",status);
		          updateCouponStatus(ids,status).then(response=>{
		            this.getList();
		            this.$message({
		              type: 'success',
		              message: '修改成功!'
		            });
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'success',
		            message: '已取消操作!'
		          });
		          this.getList();
		        });
		      },
			handleResetSearch() {
				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSearchList() {
				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleSelectionChange(val) {
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
			handleAdd() {
				this.$router.push({
					path: '/sms/addCoupon1/1'
				})
			},
			handleAdd1() {
				this.$router.push({
					path: '/sms/addCoupon1/0'
				})
			},
			handleView(index, row) {
				this.$router.push({
					path: '/sms/couponHistory',
					query: {
						id: row.id
					}
				})
			},

			openTheCopon(index, row) {
				this.$router.push({
					path: '/sms/openTheCopon',
					query: {
						id: row.id
					}
				})
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sms/updateCoupon1',
					query: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('是否进行停止操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateCouponStatus(row.id).then(response => {
						this.$message({
							type: 'success',
							message: '停止成功!'
						});
						this.getList();
					});
				})
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
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
		width: 1150px;
	}
	
	div>div>span {
		position: relative;
		margin-right: 65px;
	}
</style>