<template>
	<div class="app-container">

		<div>
			<!--<i class="el-icon-search"></i>
          <span>筛选搜索</span>  right-->
			<el-button style="float: left;margin-bottom: 25px;" @click="goodGroupAdd" type="primary" size="small">
				创建分组
			</el-button>
		</div>
		<div style="float: right;">
			<el-form :inline="true" :model="listQuery"  label-width="100px">
				<el-select v-model="listQuery.isGood" placeholder="全部" clearable>
					<el-option v-for="item in goodOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-form-item>
					<el-input style="width: 203px;height:40px ;" v-model="listQuery.keyword" placeholder="ID/编号/商户名称"></el-input>
					<el-button type="primary" @click="searchBrandList()" style="height:40px ;">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>
		</el-card>
		<!--<el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addBrand()"
        size="mini">
        添加
      </el-button>
    </el-card>-->
		<div class="table-container">
			<el-table ref="brandTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>

				<!--<el-table-column label="编号"  hidden width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->

				<el-table-column label="分组名称" align="center">
					<template slot-scope="scope">{{scope.row.groupName}}</template>
				</el-table-column>
				<el-table-column label="商品数量" align="center">
					<template slot-scope="scope">{{scope.row.goodNumber}}</template>
				</el-table-column>
				<el-table-column label="礼包分组" align="center">

					<template slot-scope="scope">
						<span v-if="scope.row.isGood == 0 ">否</span>
						<span v-if="scope.row.isGood == 1 ">是</span>

					</template>
				</el-table-column>

				<el-table-column label="创建时间" align="center">
					<template slot-scope="scope">{{scope.row.creTime | formatCreateTime}}</template>
				</el-table-column>

				<el-table-column label="最后创建时间" align="center">
					<template slot-scope="scope">{{scope.row.updTime | formatCreateTime}}</template>
				</el-table-column>
				<!--<el-table-column label="品牌制" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleFactoryStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.factoryStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>-->

				<!--<el-table-column label="相关" width="220" align="center">
          <template slot-scope="scope">
            <span>商品：</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductList(scope.$index, scope.row)">100
            </el-button>
            <span>评价：</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductCommentList(scope.$index, scope.row)">1000
            </el-button>
          </template>
        </el-table-column>-->

				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="goodGroupEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="batch-operate-container">
			<el-select size="small" v-model="operateType" placeholder="批量操作">
				<el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary" size="small">
				确定
			</el-button>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { formatDate } from '@/utils/date';

	import { fetchList, groupList, deleteGroup, updateShowStatus, updateFactoryStatus, deleteBrand, deleteSelectAll } from '@/api/brand'

	export default {
		name: 'brandList',
		data() {
			return {
				goodOptions: [{
					value: '',
					label: '全部'
				}, {
					value: '0',
					label: '否'
				}, {
					value: '1',
					label: '是'
				}],
				operates: [{
						label: "批量删除",
						value: "showBrand"
					}
					//				,	{
					//						label: "隐藏品牌",
					//						value: "hideBrand"
					//					}
				],
				operateType: null,
				listQuery: {
					isGood: null,
					keyword: null,
					pageNum: 1,
					pageSize: 10
				},
				list: null,
				total: null,
				listLoading: true,
				multipleSelection: []
			}
		},
		created() {
			this.getList();
		},

		filters: {
			formatCreateTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		methods: {
			goodGroupAdd() {
				console.log("21321313");
				this.$router.push({
					name: 'goodGroupAdd',
					query: {
						id: 1
					}
				})
			},

			goodGroupEdit(index, row) {
				console.log("edit -----");
				//this.$router.push({path: '/pms/updateBrand', query: {id: row.id}})
				this.$router.push({
					path: '/pms/goodGroupEdit',
					query: {
						id: row.id
					}
				})
			},
			getList() {
				console.log("显示列表")
				this.listLoading = true;
				console.log("this.listQuery" + this.listQuery);
				let param = new URLSearchParams();
				param.append("keyword", this.listQuery.keyword);
				param.append("isGood", this.listQuery.isGood);
				param.append("isStatic", this.listQuery.isStatic);
				
				//fetchList
				groupList(this.listQuery).then(response => {
					console.log("response.data" + response);
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
					this.totalPage = response.data.totalPage;
					this.pageSize = response.data.pageSize;
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			handleDelete(index, row) {
				this.$confirm('是否要删除该品牌', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteGroup(row.id).then(response => {
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
			handleFactoryStatusChange(index, row) {
				var data = new URLSearchParams();
				data.append("ids", row.id);
				data.append("factoryStatus", row.factoryStatus);
				updateFactoryStatus(data).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				}).catch(error => {
					if(row.factoryStatus === 0) {
						row.factoryStatus = 1;
					} else {
						row.factoryStatus = 0;
					}
				});
			},
			handleShowStatusChange(index, row) {
				let data = new URLSearchParams();;
				data.append("ids", row.id);
				data.append("showStatus", row.showStatus);
				updateShowStatus(data).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				}).catch(error => {
					if(row.showStatus === 0) {
						row.showStatus = 1;
					} else {
						row.showStatus = 0;
					}
				});
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
				//				let showStatus = 0;
				//				if(this.operateType === 'showBrand') {
				//					showStatus = 1;
				//				} else if(this.operateType === 'hideBrand') {
				//					showStatus = 0;
				//				} else {
				//					this.$message({
				//						message: '请选择批量操作类型',
				//						type: 'warning',
				//						duration: 1000
				//					});
				//					return;
				//				}
				let ids = [];
				for(let i = 0; i < this.multipleSelection.length; i++) {
					ids.push(this.multipleSelection[i].id);
				}
				let data = new URLSearchParams();
				data.append("ids", ids);
				data.append("showStatus", 1);
				//				data.append("showStatus", showStatus);
				deleteSelectAll(data).then(response => {
					this.getList();
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			addBrand() {
				this.$router.push({
					path: '/pms/addBrand'
				})
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>