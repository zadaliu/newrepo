<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button style="float: right" @click="searchBrandList()" type="primary" size="small">
					查询结果
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="菜单名称：">
						<el-input v-model="listQuery.name" class="input-width" placeholder="菜单名称"></el-input>
					</el-form-item>
					<el-form-item label="启用状态：">
						<el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">

							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button class="btn-add" @click="addBrand()" size="mini">
				添加
			</el-button>
		</el-card>
		<div class="table-container">

			

			
   
      <el-table
	    :data="list"
	    style="width: 100%;margin-bottom: 20px;"
	    row-key="id"
	    border
	    default-expand-all
	    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
 				<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="菜单名称" align="center">
					<template slot-scope="scope">{{scope.row.name}}</template>
				</el-table-column>
				<el-table-column label="权限名称" align="center">
					<template slot-scope="scope">{{scope.row.value}}</template>
				</el-table-column>
				<el-table-column label="权限类型" width="100" align="center">
					<template slot-scope="scope">{{scope.row.type|formatPlatform}}</template>
				</el-table-column>
				<el-table-column label="前端路径" width="180" align="center">
					<template slot-scope="scope">{{scope.row.uri}}</template>
				</el-table-column>

				<el-table-column label="创建时间" width="100" align="center">
					<template slot-scope="scope">{{scope.row.createTime |formatDate}}</template>
				</el-table-column>

				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--<div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>-->

		<!--<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>-->
	</div>
</template>
<script>
	import { fetchList, deletepermission } from '@/api/permissiondetail'
	import { formatDate } from '@/utils/date';
	import { treeList } from '@/api/role'
	export default {
		name: 'permissionList',
		data() {
			return {
				
				options: [{
					value: 1,
					label: '启用'
				}, {
					value: 0,
					label: '禁用'
				}],
				operateType: null,
				listQuery: {
					status: '',
					name: '',
					pageNum: 1,
					pageSize: 10
				},
				list: [],
				total: null,
				listLoading: true,
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
				return formatDate(date, 'yyyy-MM-dd')
			},
			formatPlatform(platform) {
				if(platform === 0) {
					return '目录';
				} else if(platform === 1) {
					return '菜单';
				} else {
					return '按钮';
				}
			}
		},
		methods: {
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data;
					console.log(this.list)
//					this.total = response.data.total;
//					this.totalPage = response.data.totalPage;
//					this.pageSize = response.data.pageSize;
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/ums/permissionUpdate',
					query: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('是否要删除该品牌', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletepermission(row.id).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				});
			},
			getProductList(index, row) {
				console.log(index, row);
			},
			getProductCommentList(index, row) {
				console.log(index, row);
			},

			handleShowStatusChange(index, row) {
				let data = new URLSearchParams();;
				data.append("ids", row.id);
				data.append("showStatus", row.showStatus);

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
			searchBrandList() {
				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleBatchOperate() {
				console.log(this.multipleSelection);
				if(this.multipleSelection < 1) {
					this.$message({
						message: '请选择一条记录',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				let showStatus = 0;
				if(this.operateType === 'showBrand') {
					showStatus = 1;
				} else if(this.operateType === 'hideBrand') {
					showStatus = 0;
				} else {
					this.$message({
						message: '请选择批量操作类型',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				let ids = [];
				for(let i = 0; i < this.multipleSelection.length; i++) {
					ids.push(this.multipleSelection[i].id);
				}
				let data = new URLSearchParams();
				data.append("ids", ids);
				data.append("showStatus", showStatus);
				updateShowStatus(data).then(response => {
					this.getList();
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			addBrand() {
				this.$router.push({
					path: '/ums/permissionAdd'
				})
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>