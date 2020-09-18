<template> 
	<el-card class="form-container" shadow="never" style="width: 1170px;">
		<el-form :model="homeAdvertise" :rules="rules" ref="homeAdvertiseFrom" label-width="150px" size="small">
			<el-form-item label="模板名称：" prop="activityName">
				<el-input v-model="homeAdvertise.activityName" class="input-width" maxlength="10" show-word-limit placeholder="请输入活动名称最多10个字"></el-input>
			</el-form-item>

			<el-form-item label="快递运费：">
				<el-radio-group v-model="homeAdvertise.quotaSetup">
					<el-radio :label="0">统一运费</el-radio><el-input v-model="homeAdvertise.quotaNum" class="input-width" placeholder="请输入运费金额"></el-input>
					<el-radio :label="1">计件收费</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="计件方式：">
				<el-radio-group v-model="homeAdvertise.quotaSetups">
					<el-radio :label="0">按件数</el-radio>
					<el-radio :label="1">按重量</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="配送区域:">
				<el-table :data="assembleSel" ref="assemble" style="width: 100%;margin-top: 20px;" @row-click="getSumMoney" @selection-change="handleSelection" border>
					<el-table-column type="selection" width="60" align="center"></el-table-column>
					<el-table-column property="attributeId" v-if="show" label="商品" width="130"></el-table-column>
					<el-table-column property="productId" v-if="show" label="商品id" width="130"></el-table-column>
					<el-table-column property="name" label="商品" width="130"></el-table-column>
					<el-table-column property="stock" label="首件(个)" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.productMoneys" style="width: 60px;" placeholder="请输入"></el-input>折
						</template>
					</el-table-column>
					<el-table-column property="stock" label="运费(元)" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.productMoneys" style="width: 60px;" placeholder="请输入"></el-input>折
						</template>
					</el-table-column>
					<el-table-column property="stock" label="续件(个)" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.productMoneys" style="width: 60px;" placeholder="请输入"></el-input>折
						</template>
					</el-table-column>
					<el-table-column property="stock" label="续费(元)" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.productMoneys" style="width: 60px;" placeholder="请输入"></el-input>折
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="text" @click="dialog()">设置可配送区域和运费</el-button>
			</el-form-item>
			
			
			<el-form-item label="包邮规则：">
				<el-radio-group v-model="homeAdvertise.quotaSetup">
					<el-radio :label="0">无</el-radio>
					<el-radio :label="1">付款满</el-radio>	
				</el-radio-group>
				<el-input v-model="homeAdvertise.quotaNum" style="width: 130px;" class="input-width" placeholder="请输入付款金额"></el-input>免运费

			</el-form-item>

			<el-dialog title="选择可配送区域 " :visible.sync="dialogTableVisible">

				<el-row :gutter="20">
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		  <!--<el-checkbox v-model="checked">备选项</el-checkbox>
				  		    <el-checkbox v-model="checked">备选项</el-checkbox>
				  		      <el-checkbox v-model="checked">备选项</el-checkbox>
				  		        <el-checkbox v-model="checked">备选项</el-checkbox>-->
				  		        
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="grid-content bg-purple">
				  		<el-tree
						  :data="data"
						  show-checkbox
						  default-expand-all
						  node-key="id"
						  ref="tree"
						  highlight-current
						  :props="defaultProps">
						</el-tree>
				  	</div>
				  </el-col>
				</el-row>
				

				

			
			</el-dialog>

			<el-form-item>
				<!--<el-button @click="batchDelete()">批量删除</el-button>-->
				<br />
				<br />
				<br />
				<el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import SingleUpload from '@/components/Upload/singleUpload'
	import { createDiscount, createDiscountMoney, updateDiscount, updateAssembleMoney, fetchList, getAssemble, productByGroupId, productByDisCountId } from '@/api/discount'
	import { freightList } from '@/api/freight'

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
		data() {
			return {
				 checked: true,
				paginationBoxReflow: false,
				show: false,
				assembleMoney: null,
				listQuery: Object.assign({}, defaultListQuery),
				resDate: [],
				assemble: [],
				assembleSel: [],
				gridData: [],
				dialogTableVisible: false,
				   data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
       
      defaultProps: {
          children: 'children',
          label: 'name'
       },
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
				
				freightList().then(response => {
					this.data = response.data;
				});
				productByDisCountId(this.$route.query.id).then(response => {
					this.assemble = response.data.list;
					this.assembleSel = response.data.list;
					for(let i = 0; i < this.assembleSel.length; i++) {
						//					this.assembleSel[i].productMoneys = response.data.list;
						//					if(this.assembleSel[i].productDisCountType == 0) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.homeAdvertise.discount / 10)
						//					} else if(this.assembleSel[i].productDisCountType == 1) {
						//						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.homeAdvertise.money
						//					}
						//					console.log(this.assembleSel)
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

			getDetails(row) {
				console.log(row) //此时就能拿到整行的信息
			},

			getSumMoney(row) {

				for(let i = 0; i < this.assembleSel.length; i++) {
					console.log("type==" + this.assembleSel[i].productDisCountType)
					if(this.assembleSel[i].productDisCountType == 0) {
						console.log("打折算法")
						console.log(this.assembleSel[i].price)
						console.log(this.assembleSel[i].productMoneys)
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.assembleSel[i].productMoneys / 10)
						console.log("第" + i + "条" + this.assembleSel[i].discountedPrice)
					} else if(this.assembleSel[i].productDisCountType == 1) {
						console.log("减去算法")
						console.log(this.assembleSel[i].price)
						console.log(this.assembleSel[i].productDisCount)
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.assembleSel[i].productDisCount
						console.log("第" + i + "条" + this.assembleSel[i].discountedPrice)
					}
					let arr = this.assembleSel;

					let array = []; //为了重新渲染加载付款信息,算出付款金额(与合同单价,合同金额无关)

					for(let i = 0; i < this.assembleSel.length; i++) {

						let obj = this.assembleSel[i];

						array.push(obj);

					}
					this.assembleSel = array;
					console.log(this.assembleSel)
				}
			},

			homeMoney() {
				for(let i = 0; i < this.assembleSel.length; i++) {
					if(this.assembleSel[i].productDisCountType == 0) {
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.homeAdvertise.discount / 10)
					} else if(this.assembleSel[i].productDisCountType == 1) {
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.homeAdvertise.money
					}
				}
			},
			homeDiscount() {

				console.log(this.assembleSel)
				for(let i = 0; i < this.assembleSel.length; i++) {
					console.log("次数====" + i)
					this.assembleSel[i].productMoneys = this.homeAdvertise.discount;
					if(this.assembleSel[i].productDisCountType == 0) {
						console.log(this.assembleSel[i].price)
						console.log(this.assembleSel[i].productMoneys)
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price * (this.homeAdvertise.discount / 10)
						console.log(this.assembleSel[i].discountedPrice)
					} else if(this.assembleSel[i].productDisCountType == 1) {
						console.log(this.assembleSel[i].price)
						console.log(this.assembleSel[i].productMoneys)
						this.assembleSel[i].discountedPrice = this.assembleSel[i].price - this.homeAdvertise.money
						console.log(this.assembleSel[i].discountedPrice)
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
					console.log(response.data)
					this.listLoading = false;
					this.gridData = response.data.list;
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