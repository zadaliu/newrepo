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
				<el-form :inline="true" :model="listQuery" size="small" label-width="180px">
					<el-form-item label="名称：">
						<el-input v-model="listQuery.keyword" class="input-width" placeholder="标签名"></el-input>
					</el-form-item>
					<!--<el-form-item label="全部标签类型：">
            <el-select v-model="listQuery.titleStatus" placeholder="全部" clearable class="input-width">
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
			<el-button size="mini" class="btn-add" @click="handleAdd() ">创建公司</el-button>
		</el-card>
		<div class="table-container ">
			<el-table ref="homeAdvertiseTable " :data="list " style="width: 100%; " @selection-change="handleSelectionChange " v-loading="listLoading " border>
				<el-table-column label="名称 " align="center ">
					<template slot-scope="scope ">{{scope.row.name}}</template>
				</el-table-column>

				<el-table-column label="电话" align="center ">
					<template slot-scope="scope ">{{scope.row.phone}}</template>
				</el-table-column>

				<el-table-column label="公司名称 " align="center ">
					<template slot-scope="scope ">{{scope.row.copName}}</template>
				</el-table-column>

				<el-table-column label="卡号 " align="center ">
					<template slot-scope="scope ">{{scope.row.cardNumber}}</template>
				</el-table-column>

				<el-table-column label="银行名称 " align="center ">
					<template slot-scope="scope ">{{scope.row.bankName}}</template>
				</el-table-column>

				<el-table-column label="开户行名称 " align="center ">
					<template slot-scope="scope ">{{scope.row.accountBankName}}</template>
				</el-table-column>
				
				<el-table-column label="对公对私 " align="center ">
					<template slot-scope="scope ">{{scope.row.flag|flagFilter}}</template>
				</el-table-column>

				<!--<el-table-column label="创建时间 "  align="center ">
          <template slot-scope="scope ">{{scope.row.insDate |formatDate}}</template>
        </el-table-column>
             <el-table-column label="最后修改时间 "  align="center ">
          <template slot-scope="scope ">{{scope.row.updDate |formatDate}}</template>
        </el-table-column>-->

				<el-table-column label="操作 " align="center ">
					<template slot-scope="scope ">
						<el-button size="mini " type="text " @click="handleUpdate(scope.$index, scope.row) ">编辑
						</el-button>
						<el-button size="mini " type="text " @click="handleDelete(scope.$index, scope.row) ">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--<div class="batch-operate-container ">
      <el-select
        size="small "
        v-model="operateType " placeholder="批量操作 ">
        <el-option
          v-for="item in operates "
          :key="item.value "
          :label="item.label "
          :value="item.value ">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px "
        class="search-button "
        @click="handleBatchOperate() "
        type="primary "
        size="small ">
        确定
      </el-button>
    </div>-->

		<el-dialog title="添加标签 " :visible.sync="dialogVisible " width="30% " :before-close="handleClose ">

			<el-form :model="form " ref="form ">
				<el-form-item label="标签内容： " :label-width="formLabelWidth ">
					<el-input v-model="form.titleName " autocomplete="off "></el-input>
				</el-form-item>
				<el-form-item label="打标签条件： " :label-width="formLabelWidth ">
					<el-select v-model="form.markingStatus " placeholder="请选择活动区域 ">
						<el-option v-for="item in options " :key="item.value " :label="item.label " :value="item.value "> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer " class="dialog-footer ">
    <el-button type="primary " @click="addTitle( 'form') " >确 定</el-button><!--@click="dialogVisible=f alse "-->
  </span>
		</el-dialog>

		<el-dialog title="修改标签 " :visible.sync="dialogVisibleEdit " width="30% " :before-close="handleClose ">

			<el-form :model="form " ref="form ">
				<el-form-item label="标签内容： " :label-width="formLabelWidth ">
					<el-input v-model="form.titleName " autocomplete="off "></el-input>
				</el-form-item>
				<el-form-item label="打标签条件： " :label-width="formLabelWidth ">
					<el-select v-model="form.markingStatus " placeholder="请选择活动区域 ">
						<el-option v-for="item in options " :key="item.value " :label="item.label " :value="item.value "> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer " class="dialog-footer ">
							
		<el-button @click="close( 'form') ">取 消</el-button>
    <el-button type="primary " @click="editTitle( 'form') " >确 定</el-button><!--@click="dialogVisible=f alse "-->
  </span>
		</el-dialog>

		<div class="pagination-container ">
			<el-pagination background @size-change="handleSizeChange " @current-change="handleCurrentChange " layout="total, sizes,prev, pager, next,jumper " :page-size="listQuery.pageSize " :page-sizes="[5,10,15] " :current-page.sync="listQuery.pageNum " :total="total ">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { deleteSelectAll, fetchList, getTitle, updateTitle } from '@/api/supplier';
	import { departmentListAll } from '@/api/department';

	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		name: null,
		keyword: null
	};
	const defaultTypeOptions = [{
			label: '全部',
			value: ''
		}, {
			label: '设置',
			value: 1
		},
		{
			label: '未设置',
			value: 0
		}

	];
	export default {
		name: 'homeAdvertiseList',
		data() {
			return {
				options: [{
						value: 0,
						label: '未设置'
					},
					{
						value: 1,
						label: '打标条件'
					}
				],

				form: {
					titleName: '', //标签名称
					markingStatus: '' //打标条件
				},

				dialogVisible: false,
				dialogVisibleEdit: false,
				listQuery: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				list: null,
				total: null,
				listLoading: false,
				multipleSelection: [],
				operates: [{
					label: "删除 ",
					value: 0
				}],
				operateType: null
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
			 flagFilter(value) {
			        if (value === 0) {
			          return '对公';
			        } else if (value === 1) {
			          return '对私';
			        }
      },
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
			close(formName) {

				this.dialogVisibleEdit = false
			},

			editTitle(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {

							} else {
								updateTitle(this.form.id, this.form).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							}
						});

					} else {
						this.$message({
							message: '验证失败',
							type: 'error',
							duration: 1000
						});
						return false;
					}
				});

			},
			addTitle(formName) {
				console.log(formName)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {

							} else {
								console.log("1321321 ")
								console.log(this.form)
								createTitle(this.form).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '提交成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							}
						});

					} else {
						this.$message({
							message: '验证失败',
							type: 'error',
							duration: 1000
						});
						return false;
					}
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
			handleAdd() {
				console.log('清空表单')
				//    	this.dialogVisible = true;
				this.$router.push({
					path: '/sup/addSupplierManage'
				})
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sup/updateSupplierManage',
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
				this.$confirm('是否要删除该标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", ids);
					params.append("status", 0);
					deleteSelectAll(params).then(response => {
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