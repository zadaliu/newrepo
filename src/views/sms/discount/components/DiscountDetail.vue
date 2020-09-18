<template>
	<el-card class="form-container" shadow="never" style="width: 1170px;">
		<el-form :model="homeAdvertise" :rules="rules" ref="homeAdvertiseFrom" label-width="150px" size="small">
			<el-form-item label="活动名称：" prop="activityName">
				<el-input v-model="homeAdvertise.activityName" class="input-width" maxlength="10" show-word-limit placeholder="请输入活动名称最多10个字"></el-input>
			</el-form-item>

			<el-form-item label="活动时间：" prop="startTime">
				<el-date-picker type="datetime" placeholder="请选择日期" v-model="homeAdvertise.startTime"></el-date-picker>
				至
				<el-date-picker type="datetime" placeholder="请选择日期" v-model="homeAdvertise.endTime"></el-date-picker>
			</el-form-item>

			<el-form-item label="活动标签：" prop="activityTag">
				<el-input v-model="homeAdvertise.activityTag" class="input-width" placeholder="请输入活动标签，建议2-5个字"></el-input>
			</el-form-item>

			<el-form-item label="限购设置：">
				<el-radio-group v-model="homeAdvertise.quotaSetup">
					<el-radio :label="0">不限购</el-radio><br></br>
					<el-radio :label="1">每人每种商品限购</el-radio>
					<el-input v-model="homeAdvertise.quotaNum" class="input-width" placeholder="请输入金额"></el-input>
					件
				</el-radio-group>
			</el-form-item>

			<el-form-item label="选择商品：">
				<el-button type="text" @click="dialog()">选择参加活动的商品</el-button>

				<el-table :data="assemble" style="width: 70%" border>
					<el-table-column property="attributeId" v-if="show" label="商品" width="30"></el-table-column>

					<el-table-column prop="name" label="商品" width="180">
					</el-table-column>
					<el-table-column prop="value" label="规格1" width="180">
						<template slot-scope="scope">
							<el-row v-for="json in JSON.parse(scope.row.value)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="价格">
						<template slot-scope="scope">
							{{scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column prop="stock" label="库存">
					</el-table-column>
				</el-table>

			</el-form-item>

			<el-dialog title="选择参加活动的商品 " :visible.sync="dialogTableVisible">

				<div style="margin-top: 15px">
					<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
						<el-form-item label="活动名称：">
							<el-input v-model="listQuery.name" style="width: 160px;" class="input-width" placeholder="请输入活动名称"></el-input>
						</el-form-item>
						<!--<el-form-item label="活动状态：">
							<el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
								<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>-->

						</el-form-item>

					</el-form>
				</div>
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

				<el-table :data="gridData" ref="brandTable" @row-click="getDetails" style="width: 100%;margin-top: 20px;" row-key="attributeId" border fit highlight-current-row @selection-change="handleSelectionChange" border>
					<el-table-column type="selection" align="center" :reserve-selection="true"></el-table-column>
					<el-table-column property="attributeId" v-if="show" label="商品"></el-table-column>
					<el-table-column property="name" label="商品"></el-table-column>
					<el-table-column property="value" label="规格">
						<template slot-scope="scope">
							<el-row v-for="json in JSON.parse(scope.row.value)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
						</template>
					</el-table-column>
					<el-table-column property="price" label="价格">
					</el-table-column>
					<el-table-column property="groupName" label="商品分组"></el-table-column>
					<el-table-column property="sale" label="近30天销量/累计销量"></el-table-column>
					<el-table-column property="stock" label="库存"></el-table-column>
					<el-table-column property="detail" label="状态">
						<template slot-scope="scope">
							{{scope.row.sale|formatStatus}}
						</template>
					</el-table-column>
				</el-table>

				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
				</el-pagination>
			</el-dialog>

			<el-form-item label="设置折扣:">
				全部打
				<el-input v-model="homeAdvertise.discount" style="width: 100px;" class="input-width" placeholder="请输入折扣"></el-input>
				折
				<el-button type="primary" @click="homeDiscount()">确定</el-button>
				<br /> 全部减
				<el-input v-model="homeAdvertise.money" style="width: 100px;padding-top: 10px;" class="input-width" placeholder="请输入金额"></el-input>
				元
				<el-button type="primary" @click="homeMoney()">确定</el-button>

				<el-table :data="assembleSel" ref="assemble" style="width: 100%;margin-top: 20px;" @row-click="getSumMoney" @selection-change="handleSelection" border>
					<el-table-column type="selection" width="60" align="center"></el-table-column>
					<el-table-column property="attributeId" v-if="show" label="商品" width="130"></el-table-column>
					<el-table-column property="productId" v-if="show" label="商品id" width="130"></el-table-column>
					<el-table-column property="name" label="商品" width="130"></el-table-column>
					<el-table-column property="stock" label="库存" width="90"></el-table-column>
					<el-table-column label="价格">
						<template slot-scope="scope">
							{{scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column label="设置折扣">
						<template slot-scope="scope">
							<el-radio v-model="scope.row.productDisCountType" :label="0">打</el-radio>
							<el-input v-model="scope.row.productMoney" style="width: 60px;" placeholder="折扣"></el-input>折
							<el-radio v-model="scope.row.productDisCountType" :label="1">减</el-radio>
							<el-input v-model="scope.row.productDisCount" style="width: 60px;" placeholder="金额"></el-input>元
						</template>
					</el-table-column>
					<el-table-column label="折扣后价格" width="130">

						<template slot-scope="scope">
							{{scope.row.discountedPrice}}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>

			<el-form-item>
				<el-button @click="batchDelete()">批量删除</el-button>
				<br />
				<br />
				<br />
				<el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
				<el-button @click="ongoto">返回</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import SingleUpload from '@/components/Upload/singleUpload'
	import { createDiscount, createDiscountMoney, updateDiscount, updateAssembleMoney, fetchList, getAssemble, productByGroupId, productByDisCountId } from '@/api/discount'
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		name: null,
		type: null,
		endTime: null
	};
	const defaultHomeAdvertise = {
		activityName: "", //'活动名称',
		activityStatus: 0, //'0 未开启 1 进行中 2 以结束',
		startTime: "", //开始时间',
		endTime: "", //结束时间',
		activityTag: "", //活动标签',
		delegationNumber: 0, //'参团人数',
		delegationMinute: 0, //'参团时间',
		quotaSetup: 0, //'限购设置 0 不限购 1每人每种商品限购',
		quotaNum: 0, //'限购件数',
		discountOrderMoney: 0, //订单实付金额
		delegationDiscountNumber: 0, //付款订单数
		delegationMemberNumber: 0, //付款人数
		money: null, //金额
		discount: null //折扣
	};
	export default {
		name: 'SeckillDetail',
		components: {
			SingleUpload
		},
		props: {
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			formatStatus(status) {
				if(status === 1) {
					return '上架';
				} else {
					return '下架';
				}
			},
		},
		data() {
			return {
				total: 0,
				paginationBoxReflow: false,
				show: false,
				assembleMoney: null,
				listQuery: Object.assign({}, defaultListQuery),
				resDate: [],
				assemble: [],
				assembleSel: [],
				gridData: [],
				dialogTableVisible: false,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '1000'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '1000'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '1000'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '1000'
				}],
				homeAdvertise: null,
				rules: {
					delegationNumber: [{
							required: true,
							message: '请输入参团人数',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '参团人数必须为数字',
							trigger: 'blur'
						}
					], //参团人数
					delegationMinute: [{
							required: true,
							message: '请输入参团时间',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '参团时间必须为数字',
							trigger: 'blur'
						}
					], //参团时间
					activityName: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 10 个字符',
							trigger: 'blur'
						}
					],
					startTime: [{
						required: true,
						message: '请选择活动时间',
						trigger: 'blur'
					}],
					activityTag: [{
							required: true,
							message: '请填写活动标签',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5个字符',
							trigger: 'blur'
						}
					]

				}
			}
		},
		created() {
			if(this.isEdit) {
				productByDisCountId(this.$route.query.id).then(response => {
					this.assemble = response.data.list;
					this.assembleSel = response.data.list;
					for(let i = 0; i < this.assembleSel.length; i++) {

						//							if(this.assembleSel[i].productDisCountType == null || this.assembleSel[i].productDisCountType.length == 0) {
						//								return 0;
						//							}

						if(this.assembleSel[i].productDisCountType == 0) {
							this.assembleSel[i].discountedPrice = (this.assembleSel[i].price * (this.assembleSel[i].productMoney / 10)).toFixed(2);

							if(this.assembleSel[i].discountedPrice == null || this.assembleSel[i].discountedPrice.length == 0) {
								return 0;
							}
							if(this.assembleSel[i].productMoney == null || this.assembleSel[i].productMoney.length == 0) {
								return 0;
							}
						} else if(this.assembleSel[i].productDisCountType == 1) {
							this.assembleSel[i].discountedPrice = (this.assembleSel[i].price - this.assembleSel[i].productDisCount).toFixed(2);
							if(this.assembleSel[i].discountedPrice == null || this.assembleSel[i].discountedPrice.length == 0) {
								return 0;
							}
							if(this.assembleSel[i].productDisCount == null || this.assembleSel[i].productDisCount.length == 0) {
								return 0;
							}
						}

						let arr = this.assembleSel;

						let array = []; //为了重新渲染加载付款信息,算出付款金额(与合同单价,合同金额无关)

						for(let i = 0; i < this.assembleSel.length; i++) {

							let obj = this.assembleSel[i];

							array.push(obj);

						}
						this.assembleSel = array;
					}

				});

				getAssemble(this.$route.query.id).then(response => {
					this.homeAdvertise = response.data;
				});

			} else {
				this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
			}
		},
		methods: {
			ongoto() {
				this.$router.go(-1)
			},
			getDetails(row) {},

			getSumMoney(row) {
				for(let i = 0; i < this.assembleSel.length; i++) {
					
						console.log(this.assembleSel[i].productDisCountType)
						
						if(this.assembleSel[i].productDisCountType == undefined || this.assembleSel[i].productDisCountType == null || this.assembleSel[i].productDisCountType.length == 0) {
								return 0;
							}

						if(this.assembleSel[i].productDisCountType == 0) {
							this.assembleSel[i].discountedPrice = (this.assembleSel[i].price * (this.assembleSel[i].productMoney / 10)).toFixed(2);
							if(this.assembleSel[i].discountedPrice == null || this.assembleSel[i].discountedPrice.length == 0) {
								return 0;
							}
							if(this.assembleSel[i].productMoney == null || this.assembleSel[i].productMoney.length == 0) {
								return 0;
							}
						} else if(this.assembleSel[i].productDisCountType == 1) {
							this.assembleSel[i].discountedPrice = (this.assembleSel[i].price - this.assembleSel[i].productDisCount).toFixed(2);
							if(this.assembleSel[i].discountedPrice == null || this.assembleSel[i].discountedPrice.length == 0) {
								return 0;
							}
							if(this.assembleSel[i].productDisCount == null || this.assembleSel[i].productDisCount.length == 0) {
								return 0;
							}
						}
				
					let arr = this.assembleSel;

					let array = []; //为了重新渲染加载付款信息,算出付款金额(与合同单价,合同金额无关)

					for(let i = 0; i < this.assembleSel.length; i++) {

						let obj = this.assembleSel[i];

						array.push(obj);

					}
					this.assembleSel = array;
				}
				return 1;
			},

			homeMoney() {

				for(let i = 0; i < this.assembleSel.length; i++) {
					this.$set(this.assembleSel[i], 'productDisCountType', 1);

					this.assembleSel[i].productDisCount = this.homeAdvertise.money;
					if(this.assembleSel[i].productDisCountType == 0) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.homeAdvertise.discount / 10)
						this.$set(this.assembleSel[i], 'discountedPrice', this.assembleSel[i].price * (this.homeAdvertise.discount / 10));
					} else if(this.assembleSel[i].productDisCountType == 1) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.homeAdvertise.money
						this.$set(this.assembleSel[i], 'discountedPrice', this.assembleSel[i].price - this.homeAdvertise.money);
					}
				}
			},
			homeDiscount() {

				for(let i = 0; i < this.assembleSel.length; i++) {
					this.$set(this.assembleSel[i], 'productDisCountType', 0);

					//					this.assembleSel[i].productMoney = this.homeAdvertise.discount;
					this.$set(this.assembleSel[i], 'productMoney', this.homeAdvertise.discount);
					if(this.assembleSel[i].productDisCountType == 0) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.homeAdvertise.discount / 10)
						this.$set(this.assembleSel[i], 'discountedPrice', this.assembleSel[i].price * (this.homeAdvertise.discount / 10));

					} else if(this.assembleSel[i].productDisCountType == 1) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.homeAdvertise.money
						this.$set(this.assembleSel[i], 'discountedPrice', this.assembleSel[i].price - this.homeAdvertise.money);
					}

				}

			},
			//单行删除

			handleDelete(index) {
				this.assembleSel.splice(index, 1)
			},
			batchDelete() {
				this.assembleSel = null;
			},

			dialog() {
				productByGroupId(this.listQuery).then(response => {
					this.listLoading = false;
					this.gridData = response.data.list;
					console.log(this.gridData)
					this.total = response.data.total;
				});
				this.dialogTableVisible = true
			},

			getList() {
				this.listLoading = true;
				productByGroupId(this.listQuery).then(response => {
					this.listLoading = false;
					this.gridData = response.data.list;
					this.total = response.data.total;
				})
			},
			onSubmit(formName) {
				var resul = this.getSumMoney()
				console.log(resul+"========")
				if(resul == 0 || resul == undefined) {
					this.$message({
						message: '请保证数据准确',
						type: 'error',
						duration: 1000
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {
								updateAssembleMoney(this.$route.query.id, this.assembleSel).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
								});
								updateDiscount(this.$route.query.id, this.homeAdvertise).then(response => {

									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								createDiscount(this.homeAdvertise).then(response => {
									let id = response.data;
									createDiscountMoney(id, this.assembleSel).then(response => {
										this.$router.back();
									});

									this.$refs[formName].resetFields();
									this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
									this.$message({
										message: '提交成功',
										type: 'success',
										duration: 1000
									});

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

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
			},
			handleResetSearch() {

				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSearchList() {

				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleSelectionChange(val) {
				this.resDate = this.$refs.brandTable.selection;
				this.assemble = this.resDate
				this.assembleSel = this.resDate

			},
			handleCurrentChange(val) {
				this.listQuery.pageNum = val;
				this.getList();
			},
			handleSelection(val) {

				console.log(this.$refs.assemble.selection)

			},
			handleSizeChange(val) {
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 70%;
	}
</style>