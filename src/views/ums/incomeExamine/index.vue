<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<!--<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
					导出公猫模板
				</el-button>
				--><el-button style="float:right;margin-right: 15px" type="primary" @click="handleSearchList()" size="small">
					查询搜索
				</el-button>
				<!--<el-button type="success" style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					导出
				</el-button>-->
				<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					重置
				</el-button>

			</div>
			<div style="margin-top: 30px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="">
						<el-select v-model="listQuery.type" placeholder="不按时间" :disabled="true" clearable class="input-width" style="width: 120px;">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<div>
							<el-date-picker v-model="listQuery.star" value-format=" yyyy-MM-dd HH:mm:ss" type="datetime" :picker-options="pickerOptions1" placeholder="选择开始时间">
							</el-date-picker>至
							<el-date-picker v-model="listQuery.endt" value-format=" yyyy-MM-dd HH:mm:ss" type="datetime" :picker-options="pickerOptions1" placeholder="选择结束时间">
							</el-date-picker>
						</div>
					</el-form-item>

					<el-form-item label="">
						<el-select v-model="listQuery.cashStatus" placeholder="全部" clearable class="input-width" style="width: 120px;">
							<el-option v-for="item in cashStatusQuery" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="">
						<el-select v-model="listQuery.levelId" placeholder="等级" clearable class="input-width" style="width: 90px;">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="">
						<!--<el-select v-model="listQuery.type" placeholder="会员ID" clearable class="input-width" style="width: 130px;">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>-->

						<el-input v-model="listQuery.memberId" class="input-width" placeholder="会员ID" clearable></el-input>
					</el-form-item>

					<el-form-item label="">
						<el-input v-model="listQuery.keyword" class="input-width" placeholder="请输入关键词" clearable></el-input>
					</el-form-item>
				</el-form>
				<!--<el-row>
					<el-button size="mini" icon="el-icon-circle-check" @click="handleSus()">批量审核通过</el-button>
					<el-button size="mini" icon="el-icon-circle-close" @click="handleres()">批量驳回申请</el-button>
					<el-button size="mini">全部通过</el-button>
				</el-row>-->
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<!--<el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>-->
		</el-card>
		<div class="table-container">

			<el-table ref="adminTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<el-table-column label="提现单号" width="200" align="center">
					<template slot-scope="scope">
						<el-row>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<span>提现单号:{{scope.row.orNumber}}</span>
								</div>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="10">

								<div class="grid-content bg-purple">
									<!--<img :src="img_user"/>-->
									<el-avatar v-if="scope.row.icon=== undefined " :src="scope.row.icon"></el-avatar>
									<el-avatar v-else :src="img_user"></el-avatar>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light">
									<span>{{scope.row.nickName}}</span><br/>
								</div>
							</el-col>
						</el-row>

					</template>
				</el-table-column>
				<el-table-column label="分销等级" align="center">
					<template slot-scope="scope">{{scope.row.levelId|formatLevel}}</template>
				</el-table-column>
				<el-table-column label="提现方式" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>银行卡</div>
					</template>
				</el-table-column>
				<el-table-column label="申请收益" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div style="color: red;">{{scope.row.realCash==""?0:scope.row.realCash+scope.row.feeCash==""?0:scope.row.feeCash}}</div>
					</template>
				</el-table-column>
				<el-table-column label="实际收益" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div style="color: red;">{{scope.row.realCash==null?0:scope.row.realCash}}</div>
					</template>
				</el-table-column>
				<el-table-column label="佣金收益/管理收益/阶段收益" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.cashAmountYj==null?0:scope.row.cashAmountYj}}</div>
						<div>{{scope.row.cashAmountJj==null?0:scope.row.cashAmountJj}}</div>
						<div>{{scope.row.cashAmountJd==null?0:scope.row.cashAmountJd}}</div>
					</template>
				</el-table-column>
				<el-table-column label="提现手续费" align="center">
					<template slot-scope="scope">{{scope.row.feeCash}}</template>
				</el-table-column>
				<el-table-column label="申请时间" width="160" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.insDate | formatDateTime}}</div>
					</template>

				</el-table-column>
				<el-table-column label="提现状态" align="center">
					<template slot-scope="scope">{{scope.row.cashStatus|formatStatus}}</template>
				</el-table-column>
				<el-table-column label="税优地状态" align="center">
					<template slot-scope="scope">{{scope.row.state|formatState}}</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<i class="el-icon-zoom-in" size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,15,20]" :total="total">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	import { fetchList, updateSucsee } from '@/api/accountCash';
	import img_user from '@/assets/images/user.png';

	import { formatDate } from '@/utils/date';
	const defaultTypeOptions = [{
			label: '普通用户',
			value: 0
		},
		{
			label: '会员',
			value: 1
		},
		{
			label: '经理',
			value: 2
		}, {
			label: '分销商',
			value: 3
		}

	];

	const cashStatusOptions = [{
			label: '未审核',
			value: 0
		},
		{
			label: '审核成功',
			value: 1
		},
		{
			label: '审核失败  ',
			value: 2
		}
	];

	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		keyword: null,
		cashStatus: null,
		levelId: null,
		memberId: null,
		star: null,
		endt: null
	};
	const defaultAdmin = {
		id: null,
		username: null,
		password: null,
		nickName: null,
		email: null,
		note: null,
		status: 1
	};
	export default {
		name: 'adminList',
		data() {
			return {
				img_user,
				multipleSelection: [],
				typeOptions: Object.assign({}, defaultTypeOptions),
				listQuery: Object.assign({}, defaultListQuery),
				cashStatusQuery: Object.assign({}, cashStatusOptions),
				list: null,
				total: null,
				listLoading: false,
				dialogVisible: false,
				admin: Object.assign({}, defaultAdmin),
				isEdit: false,
				allocDialogVisible: false,
				allocRoleIds: [],
				allRoleList: [],
				allocAdminId: null
			}
		},
		created() {
			this.getList();
		},
		filters: {
			formatDateTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatLevel(value) {
				if(value == 1) {
					return '店主';
				} else if(value == 2) {
					return '经理';
				} else if(value == 3) {
					return '服务商';
				} else {
					return '普通用户';
				}
			},
			formatStatus(value){
				if(value == 1) {
					return '审核成功';
				} else if(value == 2) {
					return '审核失败';
				}else{
					return '暂未审核';
				}
			},
			formatState(value){
				// 0：已受理 1：处理中 2：提现中 3：成功 4：失败'
				if(value == 0) {
					return '已受理';
				} else if(value == 1) {
					return '处理中';
				}else if(value == 2){
					return '提现中';
				}else if(value == 3){
					return '成功';
				}else if(value == 4){
					return '失败';
				} else {
					return '未申请';
				}
			},
		},
		methods: {

			handleSus() {
				console.log("批量通过")
				for(let i = 0; i < this.multipleSelection.length; i++) {
					let param = new URLSearchParams();
					param.append("status", "1");
					updateSucsee(this.multipleSelection[i].id, param).then(response => {
						this.$nextTick(() => {
							this.getList();
						})
					})
				}
				this.$nextTick(() => {
					this.getList();
				})
				this.$message({
					message: '更改成功！',
					type: 'success'
				});
			},
			handleres() {
				console.log("批量驳回")
				for(let i = 0; i < this.multipleSelection.length; i++) {
					let param = new URLSearchParams();
					param.append("status", "2");
					updateSucsee(this.multipleSelection[i].id, param).then(response => {

					})
				}
				this.$nextTick(() => {
					this.getList();
				})
				this.$message({
					message: '更改成功！',
					type: 'success'
				});
			},
			renderheader(h, {
				column,
				$index
			}) {
				return h('span', {}, [
					h('span', {}, column.label.split('/')[0]),
					h('br'),
					h('span', {}, column.label.split('/')[1]),
					h('br'),
					h('span', {}, column.label.split('/')[2])
				])
			},
			handleSelectionChange(val) {
				console.log(val)
				this.multipleSelection = val;
			},
			handleResetSearch() {
				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSearchList() {
				this.listQuery.pageNum = 1;
				this.getList();
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
				this.dialogVisible = true;
				this.isEdit = false;
				this.admin = Object.assign({}, defaultAdmin);
			},
			handleStatusChange(index, row) {
				this.$confirm('是否要修改该状态?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateStatus(row.id, {
						status: row.status
					}).then(response => {
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消修改'
					});
					this.getList();
				});
			},
			handleDelete(index, row) {
				this.$confirm('是否要删除该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteAdmin(row.id).then(response => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList();
					});
				});
			},
			handleUpdate(index, row) {

				this.$router.push({
					path: '/mem/info',
					query: {
						id: row.id

					}
				})
				//				this.dialogVisible = true;
				//				this.isEdit = true;
				//				this.admin = Object.assign({}, row);
			},
			handleDialogConfirm() {
				this.$confirm('是否要确认?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.isEdit) {
						updateAdmin(this.admin.id, this.admin).then(response => {
							this.$message({
								message: '修改成功！',
								type: 'success'
							});
							this.dialogVisible = false;
							this.getList();
						})
					} else {
						createAdmin(this.admin).then(response => {
							this.$message({
								message: '添加成功！',
								type: 'success'
							});
							this.dialogVisible = false;
							this.getList();
						})
					}
				})
			},
			handleAllocDialogConfirm() {
				this.$confirm('是否要确认?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("adminId", this.allocAdminId);
					params.append("roleIds", this.allocRoleIds);
					allocRole(params).then(response => {
						this.$message({
							message: '分配成功！',
							type: 'success'
						});
						this.allocDialogVisible = false;
					})
				})
			},
			handleSelectRole(index, row) {
				this.allocAdminId = row.id;
				this.allocDialogVisible = true;
				this.getRoleListByAdmin(row.id);
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
				});
			},

			getRoleListByAdmin(adminId) {
				getRoleByAdmin(adminId).then(response => {
					let allocRoleList = response.data;
					this.allocRoleIds = [];
					if(allocRoleList != null && allocRoleList.length > 0) {
						for(let i = 0; i < allocRoleList.length; i++) {
							this.allocRoleIds.push(allocRoleList[i].id);
						}
					}
				});
			}
		}
	}
</script>
<style></style>