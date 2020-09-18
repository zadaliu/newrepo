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
					<el-form-item label="昵称：">
						<el-input v-model="listQuery.nickName" class="input-width" placeholder="昵称"></el-input>
					</el-form-item>
					<!--<el-form-item label="标签分组：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
					<!--<el-form-item label="创建时间：">
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
		</el-card>
		<div class="table-container">
			<el-table ref="homeAdvertiseTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" align="center"></el-table-column>
				<!--<el-table-column label="用户ID" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->
				<el-table-column label="客户" align="center">
					<template slot-scope="scope">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple">
									<!--<img :src="img_user"/>-->
									<el-avatar @error="errorHandler" v-if="scope.row.nickname=== undefined " :src="scope.row.nickname"></el-avatar>
									<el-avatar @error="errorHandler" v-else :src="img_user"></el-avatar>

								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content bg-purple-light">
									<span>{{scope.row.nickname}}</span><br/>
									<span>{{scope.row.phone}}</span>
								</div>
							</el-col>
						</el-row>

					</template>
				</el-table-column>

				<el-table-column label="累计消费金额" align="center">
					<template slot-scope="scope">{{scope.row.totalAmount}}</template>
				</el-table-column>

				<el-table-column label="购买次数" align="center">
					<template slot-scope="scope">{{scope.row.memberCount}}</template>
				</el-table-column>

				<el-table-column label="上次消费时间" align="center">
					<template slot-scope="scope">{{scope.row.paymentTime | formatTime}}</template>
				</el-table-column>

				<el-table-column label="注册时间" align="center">
					<template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
				</el-table-column>

				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
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
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { fetchList, deleteAdminSelectAll,getExport } from '@/api/tarnslate';
	import img_user from '@/assets/images/user.png';
	import FileSaver from "file-saver";
	import XLSX from "xlsx";

	//import {umsAdminList,updateStatus,deleteAdminSelectAll} from '@/api/homeAdvertise';
	//import {departmentListAll} from '@/api/department';

	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		name: null,
		type: null,
		endTime: null
	};
	const defaultTypeOptions = [{
			label: '禁用',
			value: 0
		},
		{
			label: '启用',
			value: 1
		}
	];
	export default {
		name: 'homeAdvertiseList',
		data() {
			return {
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
				operateType: null,
				excelData:[],
				img_user
			}
		},
		created() {
			this.getList();
		},
		filters: {
			departmentListName(groupId) {
				departmentListAll(groupId).then(response => {
					console.log(response.data)
				});
			},
			formatType(type) {
				if(type === 1) {
					return 'APP首页轮播';
				} else {
					return 'PC首页轮播';
				}
			},
			formatTime(time) {
				if(time == null || time === '') {
					return '';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatUserStatus(status) {
				if(status === 0) {
					return '禁用';
				} else {
					return '启用';
				}
			}
		},
		methods: {
			errorHandler() {
				return true
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
			handleUpdateStatus(index, row) {
				this.$confirm('是否要修改上线/下线状态?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateStatus(row.id, {
						status: row.status
					}).then(response => {
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
			handleDelete(index, row) {
				this.deleteAdminSelectAll(row.id);
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
					this.deleteAdminSelectAll(ids);
				} else {
					this.$message({
						message: '请选择批量操作类型',
						type: 'warning',
						duration: 1000
					});
				}
			},

			handleUpdate(index, row) {
				this.$router.push({
					path: '/translate/translateUpdate',
					query: {
						id: row.id
					}
				})
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					console.log(response.data.list)
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
				})
			},
			deleteAdminSelectAll(ids) {
				this.$confirm('是否要删除该管理员?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", ids);
					params.append("status", 0);
					deleteAdminSelectAll(params).then(response => {
						this.getList();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					});
				})
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
					getExport(this.listQuery).then(response => {
						console.log("-----"+JSON.stringify(response));
					this.excelData = response.data;
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
					const tHeader = ["客户", "手机号", "累计消费金额", "购买次数", "上次消费时间","注册时间","真实姓名","身份证号",
					"银行名称","开户支行","银行卡号","上级分销商"]; // 导出的excel表头名信息
					const filterVal = [
						"nickname",
						"phone",
						"totalAmount",
						"memberCount",
						"paymentTime",
						"createTime",
						"realName",
						"userCardId",
						"bankName",
						"bankSubName",
						"userBankId",
						"pusername"
						
					]; // 导出的excel表头字段名，需要导出表格字段名
					const list = that.excelData;
					const data = that.formatJson(filterVal, list);

					export_json_to_excel(tHeader, data, "客户信息汇总"); // 导出的表格名称，根据需要自己命名
				});
			},
			//格式转换，直接复制即可,不需要修改什么
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 203px;
	}
</style>