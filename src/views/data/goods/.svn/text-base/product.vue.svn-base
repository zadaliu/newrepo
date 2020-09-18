<template>
	<div class="app-container">
		<div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" label-width="140px">
					<el-form-item label="商品分组：">
						<el-select v-model="listQuery.state" placeholder="全部分组" clearable class="input-width">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select v-model="listQuery.type" placeholder="全部分组" clearable class="input-width">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" style="margin-left: 20px;">查询</el-button>
				</el-form>
			</div>

		
		</div>
		
		<div class="table-container">
			<el-table ref="couponTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<el-table-column label="商品信息" width="150" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="价格" width="150" align="center">
					<template slot-scope="scope">{{scope.row.couponType | formatType}}</template>
				</el-table-column>
				<el-table-column label="访客数" width="150" align="center">
					<template slot-scope="scope">{{scope.row.couponAmountDiscount}}</template>
				</el-table-column>
				<el-table-column label="浏览量" width="140" align="center">
					<template slot-scope="scope">满{{scope.row.minPoint}}元可用</template>
				</el-table-column>
				<el-table-column label="支付人数" width="150" align="center">
					<template slot-scope="scope">{{scope.row.amount}}元</template>
				</el-table-column>
				<el-table-column label="单品转化率" align="center">
					<template slot-scope="scope">{{scope.row.platform | formatPlatform}}</template>
				</el-table-column>

			</el-table>
		</div>
		
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { fetchList, deleteCoupon } from '@/api/newcoupon';
	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		name: null,
		type: null,
		state: null,
		name: null
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
				listQuery: Object.assign({}, defaultListQuery),
				listQuery1: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				typeOptions1: Object.assign({}, defaultTypeOptions1),
				list: null,
				total: null,
				input3: null,
				listLoading: false,
				value1: '',
				multipleSelection: []
			}
		},
		created() {
			this.getList();
		},
		filters: {
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
			formatDate(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd')
			},
			formatStatus(endTime) {
				let now = new Date().getTime();
				let endDate = new Date(endTime);
				if(endDate > now) {
					return '未过期'
				} else {
					return '已过期';
				}
			}
		},
		methods: {
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
					path: '/sms/addCoupon1'
				})
			},
			handleAdd1() {
				this.$router.push({
					path: '/sms/addCoupon3'
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
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sms/updateCoupon1',
					query: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('是否进行删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteCoupon(row.id).then(response => {
						this.$message({
							type: 'success',
							message: '删除成功!'
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