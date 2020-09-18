<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button type="success" style="float: right;margin-left: 15px;" @click="exportData" size="small">导出</el-button>
				<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
					查询搜索
				</el-button>
				<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="">
						<el-date-picker class="input-width" v-model="listQuery.retailerTime" value-format="yyyy-MM-dd  HH:mm:ss" type="date" placeholder="成为分销商时间">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="">
						<el-select v-model="listQuery.memStatus" placeholder="状态" clearable class="input-width" style="width: 90px;">
							<el-option v-for="item in memStatus" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="">
						<el-select v-model="listQuery.levelId" placeholder="分销商" clearable class="input-width" style="width: 90px;">
							<el-option v-for="item in retailerOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

				<!--	<el-form-item label="">
						<el-select placeholder="关注" clearable class="input-width" style="width: 90px;">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>-->

					<!--<el-form-item label="">
						<el-select v-model="listQuery.type" placeholder="等级" clearable class="input-width" style="width: 90px;">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>-->

				<!--	<el-form-item label="">
						<el-select v-model="listQuery.topOptions" placeholder="是否有上级" clearable class="input-width" style="width: 130px;">
							<el-option v-for="item in topOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>-->

					<el-form-item label="">
						<el-input v-model="listQuery.keyword" class="input-width" placeholder="昵称/姓名/手机号/ID" clearable></el-input>
					</el-form-item>
				</el-form>
				<!--<el-row>
					<el-button size="mini" icon="el-icon-s-custom">设置黑名单</el-button>
					<el-button size="mini" icon="el-icon-user">取消黑名单</el-button>
					<el-button size="mini" icon="el-icon-document-checked">审核通过</el-button>
					<el-button size="mini" icon="el-icon-document-delete">取消审核</el-button>
					<el-button size="mini" icon="el-icon-document">修改时长</el-button>
					<el-button size="mini" icon="el-icon-delete-solid">删除</el-button>
				</el-row>-->
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<!--<el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>-->
		</el-card>
		<div class="table-container">

			<el-table ref="newProductTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<!--<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>-->
				<el-table-column label="姓名" align="center">
					<template slot-scope="scope" style="width: 400px;">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple">
									<!--<img :src="img_user"/>-->
									<el-avatar @error="errorHandler" v-if="scope.row.nickname=== undefined " :src="scope.row.nickname"></el-avatar>
									<el-avatar @error="errorHandler" v-else :src="img_user"></el-avatar>

								</div>
							</el-col>
							<el-col :span="16">
								<div class="grid-content bg-purple-light">
									<span>{{scope.row.nickname}}</span><br/>
								</div>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column label="手机号" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<!--<div>{{scope.row.nickname}}</div>-->
						<div>{{scope.row.phone}}</div>
					</template>
				</el-table-column>
				<el-table-column label="等级" align="center" style="width: 166px;" :render-header="renderheader">
					<template slot-scope="scope">
						<!--<div>{{scope.row.levelName}}</div>-->
						<div>{{scope.row.levelName}}</div>
					</template>
				</el-table-column>
				<el-table-column label="推荐人" align="center" style="width: 166px;" :render-header="renderheader">
					<template slot-scope="scope">
						<!--<div>{{scope.row.levelName}}</div>-->
						<div>{{scope.row.pName}}</div>
					</template>
				</el-table-column>

				<el-table-column label="直属" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.zjcount}}</div>
						<!--<div style="color: orange;">{{scope.row.yJtx}}</div>-->
					</template>
				</el-table-column>
				<el-table-column label="非直属" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.jjcount}}</div>
						<!--<div style="color: orange;">{{scope.row.jJtx}}</div>-->
					</template>
				</el-table-column>
				<el-table-column label="月累计销售" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.price}}</div>
						<!--<div style="color: orange;">{{scope.row.jDtx}}</div>-->
					</template>
				</el-table-column>
				<!--<el-table-column label="团队分销商人数" align="center">
					<template slot-scope="scope">{{scope.row.usCount}}</template>
				</el-table-column>-->
				<el-table-column label="开店时间" align="center" :render-header="renderheader">
					<template slot-scope="scope">
						<div>{{scope.row.createTime | formatDateTime}}</div>
						<!--<div>{{scope.row.retailerTime | formatDateTime}}</div>
						<div v-if="scope.row.downgradeStatus === 1">永久</div>
						<div v-else>{{scope.row.agentSenTime | formatDateTime}}</div>
-->
					</template>
				</el-table-column>
			<!--	<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<el-tag>{{scope.row.statuss | formatStatus}}</el-tag>
					</template>
				</el-table-column>-->
			<!--	<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<i class="el-icon-s-promotion" size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)"></i>
						<i class="el-icon-delete" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)"></i>
						<i class="el-icon-s-claim" size="mini" type="text" @click="handleShopping(scope.$index, scope.row)"></i>
						<i class="el-icon-thumb" size="mini" type="text" @click="level(scope.$index, scope.row)"></i>
						<i class="el-icon-search" size="mini" type="text" @click="level(scope.$index, scope.row)"></i>
						
					</template>
				</el-table-column>-->
			</el-table>

		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,15,20]" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="上级变更记录" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="date" align="center" label="微信昵称">
				</el-table-column>
				<el-table-column prop="userId" align="center" label="id">
				</el-table-column>
				<el-table-column prop="remarks" align="center" label="备注">
				</el-table-column>
				<el-table-column prop="parentId" align="center" label="绑定id">
				</el-table-column>
				<el-table-column align="center" label="时间">
					<template slot-scope="scope">
						<div>{{scope.row.topDate | formatDateTime}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="id" align="center" label="变更次数">
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
  			  <el-button type="primary" @click="handleClose" >关闭</el-button><!--@click="dialogVisible = false"-->
  			</span>
		</el-dialog>
	</div>
</template>
<script>
	import { underList, levelTopById, memberStatus } from '@/api/retailerManage';
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	import { formatDate } from '@/utils/date';
	import img_user from '@/assets/images/user.png';

	const defaultTypeOptions = [{
			label: '禁用',
			value: 0
		},
		{
			label: '启用',
			value: 1
		}
	];
	const defaultopOptions = [{
			label: '无',
			value: 0
		},
		{
			label: '有',
			value: 1
		}
	];

	const retailerTypeOptions = [{
			label: '店主',
			value: 1
		},
		{
			label: '总监',
			value: 2
		},
		{
			label: '经销商',
			value: 3
		}
	];

	const statusOptions = [

		{
			label: '以审核',
			value: 1
		},
		{
			label: '未审核',
			value: 0
		}
	];

	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		keyword: null,
		retailerTime: null,
		levelId: null,
		topOptions: null,
		type:0,
		memberId:null

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
				multipleSelection: [],
				tableData: [],
				memStatus: Object.assign({}, statusOptions),
				topOptions: Object.assign({}, defaultopOptions),
				typeOptions: Object.assign({}, defaultTypeOptions),
				retailerOptions: Object.assign({}, retailerTypeOptions),
				listQuery: Object.assign({}, defaultListQuery),
				list: null,
				total: null,
				listLoading: false,
				dialogVisible: false,
				admin: Object.assign({}, defaultAdmin),
				isEdit: false,
				allocDialogVisible: false,
				allocRoleIds: [],
				allRoleList: [],
				allocAdminId: null,
				img_user,
				excelData:[]
			}
		},
		created() {
			this.listQuery.memberId = this.$route.query.memberId
			this.getList();
//			this.getAllRoleList();
		},
		filters: {
			formatDateTime(time) {
				if(time == null || time === '') {
					return '';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatStatus(status) {
				if(status === 1) {
					return '已审核';
				} else {
					return '未审核';
				}
			}
		},
		methods: {
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
				this.$confirm('是否要禁用该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					memberStatus(row.id).then(response => {
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
					path: '/oms/order',
					query: {
						memberId: row.id

					}
				})
			},
			handleShopping(index, row) {
				this.$router.push({
					path: '/oms/order',
					query: {
						shoppingType: 1,
						memberId: row.id

					}
				})
			},
			level(index, row) {
				levelTopById(row.id).then(response => {
					this.tableData = response.data.list;
				});

				this.dialogVisible = true;
			},
			handleClose() {
				this.dialogVisible = false;
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
				underList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
				});
			},
			getAllRoleList() {
				fetchAllRoleList().then(response => {
					this.allRoleList = response.data;
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
			},
			//触发按钮点击下载事件
			exportData() {
				//		this.getHistoryList();
				//		this.excelData = this.historyList; //将你要导出的数组数据（historyList）赋值给excelDate
				this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {

						confirmButtonText: "确定",

						cancelButtonText: "取消",

						type: "warning"

					})

					.then(() => {
					this.$set(this.listQuery,"type",1);
					underList(this.listQuery).then(response => {
						console.log("-----"+JSON.stringify(response));
					this.excelData = response.data.list;
					this.export2Excel();
				});
					}).catch(()=>{
						
					})

				

			},
			//表格数据写入excel
			export2Excel() {
				var that = this;
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require("@/assets/excel/Export2Excel");
					//这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
					const tHeader = ["姓名", "手机号", "等级", "推荐人","直属","非直属","月累计销售",
					"开店时间"]; // 导出的excel表头名信息
					const filterVal = [
						"nickname",
						"phone",
						"levelName",
						"pName",
						"zjcount",
						"jjcount",
						"price",
						"createTime"
						
					]; // 导出的excel表头字段名，需要导出表格字段名
					const list = that.excelData;
					const data = that.formatJson(filterVal, list);

					export_json_to_excel(tHeader, data, "分销商下级信息汇总"); // 导出的表格名称，根据需要自己命名
				});
			},
			//格式转换，直接复制即可,不需要修改什么
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			}
		}
	}
</script>
<style></style>