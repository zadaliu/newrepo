<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
					查询搜索
				</el-button>
				<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="运费模板名称：">
						<el-input v-model="listQuery.activityName" class="input-width" placeholder="请输入活动名称"></el-input>
					</el-form-item>
					<!--<el-form-item label="活动状态：">
						<el-select v-model="listQuery.activityStatus" placeholder="全部" clearable class="input-width">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>-->
					<!--<el-form-item label="到期时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>-->
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button size="mini" class="btn-add" @click="handleAdd()">新建限时折扣</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="homeAdvertiseTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<el-table-column label="编号" width="120" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="运费模板名称" align="center">
					<template slot-scope="scope">{{scope.row.activityName}}</template>
				</el-table-column>

				
				

				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">复制
						</el-button>
						<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog title="效果数据" :visible.sync="dialogTableVisible">
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">活动名称:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light"></div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
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
					<div class="grid-content bg-purple"></div>付款商品件数</el-col>
			</el-row>
			
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">￥{{assebleEffect.orderMoney}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">￥{{assebleEffect.couponMoney}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">{{assebleEffect.costRatio}}%</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">{{assebleEffect.productNum}}</div>
				</el-col>
			</el-row>
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">新成交客户数</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">老成交客户数</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
			<el-row style="padding-top: 20px;">
				<el-col :span="6">
					<div class="grid-content bg-purple">{{assebleEffect.newCustomers}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">{{assebleEffect.oldCustomers}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
		</el-dialog>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { fetchList, deleteHomeAdvertise, EffectList } from '@/api/discount';
	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		activityName: null,
		activityStatus: null
	};
	const defaultTypeOptions = [{
			label: '未开启 ',
			value: 0
		},
		{
			label: '进行中',
			value: 1
		},
		{
			label: '以结束',
			value: 2
		}
	];
	export default {
		name: 'homeAdvertiseList',
		data() {
			return {
				dialogTableVisible: false,
				listQuery: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				list: null,
				total: null,
				listLoading: false,
				multipleSelection: [],
				operates: [{
					label: "删除",
					value: 0
				}],
				assebleEffect: {
					assembleId: "",
					orderMoney: 0,
					couponMoney: 0,
					costRatio: 0,
					newCustomers: 0,
					oldCustomers: 0
				},
				operateType: null
			}
		},
		created() {
			this.getList();
		},
		filters: {
			formatType(type) {
				if(type === 0) {
					return '未开启';
				} else if(type === 1) {
					return '进行中';
				} else {
					return '以结束';
				}
			},
			formatTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
		},
		methods: {
			lockUp(index, row) {
				this.dialogTableVisible = true
				EffectList(row.id).then(response => {
					this.assebleEffect = response.data
					console.log(this.assebleEffect )
				})
				
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
			handleDelete(index, row) {
				this.deleteHomeAdvertise(row.id);
			},
			handleBatchOperate() {
				if(this.multipleSelection < 1) {
					this.$message({
						message: '请选择一条记录',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				let ids = [];
				for(let i = 0; i < this.multipleSelection.length; i++) {
					ids.push(this.multipleSelection[i].id);
				}
				if(this.operateType === 0) {
					//删除
					this.deleteHomeAdvertise(ids);
				} else {
					this.$message({
						message: '请选择批量操作类型',
						type: 'warning',
						duration: 1000
					});
				}
			},
			handleAdd() {
				this.$router.push({
					path: '/sms/addFreight'
				})
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sms/updateFreight',
					query: {
						id: row.id
					}
				})
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
				})
			},
			deleteHomeAdvertise(ids) {
				this.$confirm('是否要删除该显示折扣?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", ids);
					deleteHomeAdvertise(params).then(response => {
						this.getList();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					});
				})
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 203px;
	}
</style>