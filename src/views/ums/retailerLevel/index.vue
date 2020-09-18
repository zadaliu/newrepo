<template>
	<div class="app-container">
		<el-alert style="height: 50px;" title="提示：没有设置等级的分销商将按默认设置计算提成。商品指定的佣金金额优先级仍是最高的，也就是说只要商品指定了佣金金额就按商品的佣金金额来计算，不受等级影响" type="info" description="   ">
		</el-alert>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<!--<el-button size="mini" class="btn-add" @click="handleAdd()">添加新等级</el-button>-->

		</el-card>
		<div class="table-container ">
			<el-table ref="homeAdvertiseTable " :data="list " style="width: 100%; " @selection-change="handleSelectionChange " v-loading="listLoading " border>
				<!--<el-table-column type="selection " width="60 " align="center "></el-table-column>-->
				<el-table-column label="id "  align="center ">
					<template slot-scope="scope ">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="等级名称 "  align="center ">
					<template slot-scope="scope ">{{scope.row.levelName}}</template>
				</el-table-column>

				<el-table-column label="一级佣金比例 "  align="center ">
					<template slot-scope="scope ">{{scope.row.oneCommission}}</template>
				</el-table-column>

				<el-table-column label="二级佣金比例 "  align="center ">
					<template slot-scope="scope ">{{scope.row.towCommission}}</template>
				</el-table-column>

				<el-table-column label="直属推荐奖金系数 "  align="center ">
					<template slot-scope="scope ">{{scope.row.directBonus }}</template>
				</el-table-column>

				<el-table-column label="同级推荐奖金系数 " align="center ">
					<template slot-scope="scope ">{{scope.row.visBonus}}</template>
				</el-table-column>
				<el-table-column label="升级条件 " width="350px" align="left ">

					<template slot-scope="scope ">
						
						
						<span v-for="(site,index) in scope.row.remark">
							条件{{index+1}}:{{site}}
						 <br/>
					</span>

					</template>
					<!--<template slot-scope="scope " v-if="scope.row.levelStatus===2">
						</template>-->
				</el-table-column>

				<el-table-column label="操作 " align="center ">
					<template slot-scope="scope ">
						<el-button size="mini " type="text " @click="handleUpdate(scope.$index, scope.row) ">编辑
						</el-button>
						<!--<el-button size="mini " type="text " @click="handleDelete(scope.$index, scope.row) ">删除
						</el-button>-->
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog title="修改标签 " :visible.sync="dialogVisibleEdit " ref="reform" width="35% " @close="resetForm('form')">

			<el-form :model="form" :ref="forms">
				<el-form-item label="等级名称： ">
					<el-input v-model="form.levelName " style="width: 300px; " autocomplete="off "></el-input>(店主)
				</el-form-item>
				<el-form-item label="一级佣金： ">
					<el-input v-model="form.oneCommission " style="width: 340px; " autocomplete="off "></el-input>
				</el-form-item>
				<el-form-item label="二级佣金： ">
					<el-input v-model="form.towCommission " style="width: 340px; " autocomplete="off "></el-input>
				</el-form-item>
				<el-form-item label="直属奖金： ">
					<el-input v-model="form.directBonus " style="width: 340px; " autocomplete="off "></el-input>
				</el-form-item>
				<el-form-item label="间接奖金： ">
					<el-input v-model="form.visBonus " style="width: 340px; " autocomplete="off "></el-input>
				</el-form-item>

				<el-form-item label="条件设置：" style="width: 500px;">
					<el-radio-group v-model="types" @change="agreeChange" size="medium">
						<el-radio-button label="0">A</el-radio-button>
						<el-radio-button label="1">B</el-radio-button>
						<el-radio-button label="2">C</el-radio-button>
						<el-radio-button label="4">D</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="升级条件：" v-if="types==0" style="width: 500px;">
					无
				</el-form-item>

				<el-form-item label="升级条件：" v-if="types==1" style="width: 500px;">
					礼包商品组内累计自身消费+直接礼包销售额满
					<el-input v-model="form.packageTeamMoney " style="width: 90px; " autocomplete="off "></el-input>元<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 直推
					<el-input v-model="form.directPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
					<el-input v-model="form.directMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间推
					<el-input v-model="form.betweenPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
					<el-input v-model="form.betweenMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/>
				</el-form-item>

				<el-form-item label="升级条件：" v-if="types==2" style="width: 500px;">
					礼包商品组内累计自身消费+团队销售额满
					<el-input v-model="form.packageTeamMoney " style="width: 90px; " autocomplete="off "></el-input>元<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直属总监满
					<el-input v-model="form.directPeople " style="width: 90px; " autocomplete="off "></el-input>人<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直推
					<el-input v-model="form.directPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
					<el-input v-model="form.directMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间推
					<el-input v-model="form.betweenPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
					<el-input v-model="form.betweenMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
							
		<el-button @click="resetForm('form')">取 消</el-button>
    <el-button type="primary" @click="addTitle('form')" >确 定</el-button><!--@click="dialogVisible = false"-->
  </span>
		</el-dialog>

		<div class="pagination-container ">
			<el-pagination background @size-change="handleSizeChange " @current-change="handleCurrentChange " layout="total, sizes,prev, pager, next,jumper " :page-size="listQuery.pageSize " :page-sizes="[5,10,15] " :current-page.sync="listQuery.pageNum " :total="total ">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import { fetchList, createTitle, getTitle, updateTitle, createRetail } from '@/api/retailerLevel'

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
		name: 'retailerLevel',
		data() {
			return {
				types: null,
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
					levelName: '',
					oneCommission: '',
					towCommission: '',
					directBonus: '',
					visBonus: '',
					packageTeamMoney: '',
					directPeople: '',
					directPush: '',
					directMoney: '',
					betweenPush: '',
					betweenMoney: ''
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

			formatTitleStatus(status) {
				if(status === 0) {
					return '默认标签';
				} else {
					return '手动标签 ';
				}
			}

		},
		methods: {
			agreeChange: function(value) {
				this.types = value;
			},
			resetForm(form) {
				if(this.$refs[form] !== undefined) {
					this.$refs[form].resetFields();
				}
				this.dialogVisibleEdit = false;

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

				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {

							} else {
								//	createTitle
								console.log(this.form)
								createRetail(this.form).then(response => {
									this.$nextTick(() => {
										this.$refs[formName].resetFields();　　　　

									})

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
			handleAdd(form) {
				//				this.$nextTick(() => {
				//					this.form.levelName = '';
				//					this.form.oneCommission = '';
				//					this.form.towCommission = '';
				//					this.form.directBonus = '';
				//					this.form.visBonus = '';
				//					this.form.packageTeamMoney = '';
				//					this.form.directPeople = '';
				//					this.form.directPush = '';
				//					this.form.directMoney = '';
				//					this.form.betweenPush = '';
				//					this.form.betweenMoney = '';
				//				});
				//				//    	this.dialogVisible = true;
				//				this.dialogVisibleEdit = true;
				this.$router.push({
					path: '/mem/addRetailer'
				})

			},
			handleUpdate(index, row) {
				//				this.types = 1;
				//				getTitle(row.id).then(response => {
				//					this.form = response.data;
				//				})
				//				this.dialogVisibleEdit = true;
				this.$router.push({
					path: '/mem/updateRetailer',
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
					params.append("ids ", ids);
					params.append("status ", 0);
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