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
			<el-form-item label="参团人数：" prop="delegationNumber">
				<el-input v-model.number="homeAdvertise.delegationNumber" class="input-width" placeholder="参团人数"></el-input>
			</el-form-item>
			<el-form-item label="拼团时间：" prop="delegationMinute">
				<el-input v-model.number="homeAdvertise.delegationMinute" class="input-width" placeholder="请输入时间"></el-input>&nbsp;&nbsp;分钟
				<p>开团后，客户需在规定时间内完成拼团，否则拼团超时失败。</p>
			</el-form-item>
			<el-form-item label="限购设置：">
				<el-radio-group v-model="homeAdvertise.quotaSetup">
					<el-radio :label="0">不限购</el-radio><br></br>
					<el-radio :label="1">每人每种商品限购</el-radio>
					<el-input v-model="homeAdvertise.quotaNum" class="input-width" placeholder="请输入金额"></el-input>
					件
				</el-radio-group>

			</el-form-item>

			<el-form-item label="凑团设置：" prop="name">
				<el-radio-group v-model="homeAdvertise.groupSetup">
					<el-radio :label="1">开启凑团</el-radio>
					<el-radio :label="0">不开启凑团</el-radio>
				</el-radio-group>
				<p>开启凑团后，对于未参团的买家，活动商品详情页会显示未成团的团列表，买家可以直接任选一个参团，提升成团率。</p>
			</el-form-item>

			<el-form-item label="模拟成团：" prop="fictitiousGroup">
				<el-radio-group v-model="homeAdvertise.fictitiousGroup">
					<el-radio :label="1">开启模拟成团</el-radio>
					<el-radio :label="0">不开模拟成团</el-radio>
				</el-radio-group>
				<p>开启模拟成团后，拼团有效期内人数未满的团，系统将会模拟"匿名买家"凑满人数，是该团成团。</p>
			</el-form-item>

			<el-form-item label="购买设置：" prop="purchaseSetup">
				<el-radio-group v-model="homeAdvertise.purchaseSetup">
					<el-radio :label="1">允许原价购买</el-radio>
					<el-radio :label="0">不允许原价购买</el-radio>
				</el-radio-group>
				<p>开启允许原价购买，客户可自主选择不参与拼团，按照原价购买。</p>
			</el-form-item>

			<el-form-item label="选择商品：">
				<el-button type="text" @click="dialog()">选择参加活动的商品</el-button>

				<el-table :data="assemble" style="width: 70%">
					<el-table-column property="attributeId" v-if="show" label="商品" width="30"></el-table-column>

					<el-table-column prop="name" label="商品" width="180">
					</el-table-column>
					<el-table-column prop="value" label="规格" width="180">
						<template slot-scope="scope">
							<el-row v-for="json in JSON.parse(scope.row.value)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="stock" label="库存">
					</el-table-column>
				</el-table>

			</el-form-item>

			<el-dialog title="选择参加活动的商品 " :visible.sync="dialogTableVisible">

				<div style="margin-top: 15px">
					<el-form :inline="true" :model="listQuery" size="small" label-width="160px">
						<el-form-item label="活动名称：">
							<el-input v-model="listQuery.name" style="width: 160px;" class="input-width" placeholder="请输入活动名称"></el-input>
						</el-form-item>
						<!--<el-form-item label="活动状态：">
							<el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
								<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>-->

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

				<el-table :data="gridData" ref="brandTable" @row-click="getDetails" row-key="attributeId" border fit highlight-current-row style="width: 100%;margin-top: 20px;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
					<el-table-column type="selection" :reserve-selection="true"></el-table-column>
					<el-table-column property="attributeId" v-if="show" label="商品"></el-table-column>
					<el-table-column property="name" label="商品"></el-table-column>
					<el-table-column property="value" label="规格">
						<template slot-scope="scope">
							<el-row v-for="json in JSON.parse(scope.row.value)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
						</template>
					</el-table-column>
					<el-table-column property="groupName" label="商品分组"></el-table-column>
					<el-table-column property="sale" label="近30天销量/累计销量"></el-table-column>
					<el-table-column property="stock" label="库存"></el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							{{scope.row.sale|formatStatus}}
						</template>
					</el-table-column>
				</el-table>

				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
				</el-pagination>
			</el-dialog>

			<el-form-item label="拼团价格：">
				拼团价格全部设置为
				<el-input v-model="homeAdvertise.money" style="width: 100px;" class="input-width" placeholder="请输入金额"></el-input>
				<el-button type="primary" @click="homeMoney()">确定</el-button>
				<el-table :data="assembleSel" ref="assemble" style="width: 54%;margin-top: 20px;" @selection-change="handleSelection" border>
					<!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
					<el-table-column property="attributeId" v-if="show" label="商品" width="130"></el-table-column>
					<el-table-column property="productId" v-if="show" label="商品id" width="130"></el-table-column>
					<el-table-column property="name" label="商品" width="130"></el-table-column>
					<el-table-column property="value" label="规格" width="110">
						<template slot-scope="scope">
							<el-row v-for="json in JSON.parse(scope.row.value)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
						</template>
					</el-table-column>
					<el-table-column property="stock" label="库存" width="90"></el-table-column>
					<el-table-column property="stock" label="设置拼团价格" width="153">
						<template slot-scope="scope">
							<el-input v-model="scope.row.productAssembleMoney" placeholder="金额"></el-input>
						</template>
					</el-table-column>

				</el-table>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
				<el-button @click="ongoto">返回</el-button>
				<el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import SingleUpload from '@/components/Upload/singleUpload'
	import { createAssemble, createAssembleMoney, updateAssemble, updateAssembleMoney, fetchList, getAssemble, productByGroupId, productByAssemble } from '@/api/assemble'
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
		groupSetup: 0, //'凑团设置 0 关闭凑团 1开启凑团',
		fictitiousGroup: 0, //'虚拟凑团 0 关闭虚拟凑团 1 开启虚拟凑团',
		purchaseSetup: 0, //'购买设置 0 不允许原价购买 1 允许原价购买',
		money: null //拼团金额
	};
	export default {
		name: 'AssembleDetail',
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
				productByAssemble(this.$route.query.id).then(response => {
					this.assemble = response.data.list;
					this.assembleSel = response.data.list;

				});

				getAssemble(this.$route.query.id).then(response => {
					this.homeAdvertise = response.data;
				});
			} else {
				this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
			}
		},
		methods: {
			getSumMoney() {
				for(let i = 0; i < this.assembleSel.length; i++) {
						if(this.assembleSel[i].productAssembleMoney == null || this.assembleSel[i].productAssembleMoney.length == 0) {
							return 0;
						}
				}
				return 1;
			},
			getDetails(row) {
				console.log(row) //此时就能拿到整行的信息
			},
			homeMoney() {
				for(let i = 0; i < this.assembleSel.length; i++) {
					//					this.assembleSel[i].productAssembleMoney = this.homeAdvertise.money;
					this.$set(this.assembleSel[i], 'productAssembleMoney', this.homeAdvertise.money)

				}
			},
			dialog() {
				productByGroupId(this.listQuery).then(response => {
					console.log(response.data)
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
			ongoto() {
				this.$router.go(-1)
			},
			onSubmit(formName) {
				var resul = this.getSumMoney()
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
								console.log(this.isEdit)
								console.log(this.assembleSel)
								updateAssembleMoney(this.$route.query.id, this.assembleSel).then(response => {
									console.log("updateAssembleMoney")
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
								});
								updateAssemble(this.$route.query.id, this.homeAdvertise).then(response => {

									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {

								createAssemble(this.homeAdvertise).then(response => {
									let id = response.data;
									createAssembleMoney(id, this.assembleSel).then(response => {
										console.log("okok")
										this.$router.back();
									});

									this.$refs[formName].resetFields();
									this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
									this.$message({
										message: '提交成功',
										type: 'success',
										duration: 1000
									});
									console.log("okok222")

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
				console.log("table选择")
				this.resDate = this.$refs.brandTable.selection;
				console.log(this.resDate)
				this.assemble = this.resDate
				this.assembleSel = this.resDate

			},
			handleCurrentChange(val) {
				console.log("分页跳转")
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