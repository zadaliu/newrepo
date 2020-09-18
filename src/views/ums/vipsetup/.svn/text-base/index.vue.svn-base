<template>
	<el-card class="form-container" style="width:1042px;" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本" name="first">

					<el-form-item label="分销内购：" prop="resource">
						<el-radio-group v-model="brand.retailPurchase">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
						<p>开启分销内购，分销上自己购买商品， 享受一级佣金，上级享受二级佣金
						</p>
					</el-form-item>

					<!--<el-form-item label="分销自省：" prop="resource">
						<el-radio-group v-model="brand.retailSelf">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
						<p>开启之后，会员自购分销商不计算佣金，奖金</p>
					</el-form-item>

					<el-form-item label="首笔管理奖金比例:">
						<el-input style="width: 100px;" v-model="brand.firstMasterMoney"></el-input>&nbsp;&nbsp;%
					</el-form-item>

					<el-form-item label="首页佣金显示：" prop="resource">
						<el-radio-group v-model="brand.firstCommission">
							<el-radio :label="1">最高价</el-radio>
							<el-radio :label="0">最低价</el-radio>
						</el-radio-group>
					</el-form-item>-->

				</el-tab-pane>

				<el-tab-pane label="分销关系" name="second">
					<el-form-item label="成为分销商条件:">
						一次性购买礼包商品金额&nbsp;&nbsp;
						<el-input style="width: 90px;" v-model="brand.onlyOneGoodMoney"></el-input>&nbsp;&nbsp;元
					</el-form-item>

				<!--	<el-form-item label="会员资格时长：" prop="resource">
						<el-radio-group v-model="brand.vipMemberStatus">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="默认会员天数:">
						<el-input style="width: 100px;" v-model="brand.vipMemberTime"></el-input>&nbsp;&nbsp;天
					</el-form-item>-->

				</el-tab-pane>

				<el-tab-pane label="提现设置" name="third">
					<el-form-item label="提现最低金额：">
						<el-input v-model="brand.minCashMoney"></el-input>
					</el-form-item>
					<!--<el-form-item label="提现最高金额:">
						<el-input v-model="brand.maxCashMoney"></el-input>
					</el-form-item>-->

					<el-form-item label="每月提现次数:">
						<el-input v-model="brand.monthCashMoney"></el-input>
					</el-form-item>

					<el-form-item label="提现天数:">
						<el-input v-model="brand.dayAccount"></el-input>
					</el-form-item>

					<el-form-item label="提现手续费:">
						<div class="moneyTo" v-for="(list,index) in lists">
							从（元）
							<el-input style="width: 80px" v-model="list.starCashMoney"></el-input>
							至（元）
							<el-input style="width: 80px" v-model="list.endCashMoney"></el-input>
							收取手续费（%）
							<el-input style="width: 80px" v-model="list.chargeCashMoney"></el-input>
							<el-button type="danger" icon="el-icon-delete" @click="del(index)"></el-button>
						</div>
					</el-form-item>

					<el-form-item label="">
						<el-button @click="addEl">➕&nbsp;&nbsp;&nbsp;添加提现阶梯条件</el-button>
						<p>金额从小到大顺序填写，当第一项设置为空或者0时表示第二项以下的搜狐费，第二项设置同理手续费设置空或者0表示不收取手续费</p>
					</el-form-item>

					<el-form-item label="提现说明文案：">
						<el-input type="textarea" placeholder="请输入内容" v-model="brand.cashText" maxlength="90" show-word-limit>
						</el-input>
					</el-form-item>

					<br></br>
					<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
					</el-dialog>

				</el-tab-pane>

				<el-tab-pane label="阶段奖金" name="four">

					<el-form-item label="阶段奖金：" prop="resource">
						<el-radio-group v-model="brand.stageMoney">
							<el-radio :label="1">开启</el-radio>
							<el-radio :label="0">关闭</el-radio>
						</el-radio-group>
						阶段奖金开启后，必须设置计算开始时间
					</el-form-item>

					<el-form-item label="可提现销售佣金计算">
						<span>开始时间:</span>
						<el-date-picker type="date" placeholder="选择日期" v-model="brand.startTime" style="width: 200px;">

						</el-date-picker>
					</el-form-item>

					<el-form-item label="阶段设置:">

						<el-row>
							<el-col :span="12">
								<div class="grid-content bg-purple" style="text-align:center;">阶段</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content bg-purple-light" style="text-align:center;">奖金金额</div>
							</el-col>
						</el-row>

						<el-row v-if="list.deleteFlg == 1" style="padding-left: 39px;padding-top: 20px;" v-for="(list,index) in lists2" :key="index">
							<el-col :span="6">
								<div class="grid-content bg-purple">

									<el-input style="width: 183px" v-model="list.invaitatonMoney" :disabled="true" placeholder="被邀请人可提现销售佣金达到"></el-input>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light">
									<el-input style="width: 170px" v-model="list.salesMoney" placeholder="可提现销售佣金金额"></el-input>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple">
									<el-input style="width: 148px" v-model="list.inviterMoney" placeholder="邀请人获得的奖金"></el-input>
								</div>
							</el-col>
							<el-col :span="6" style="display :none">
								<div class="grid-content bg-purple">
									<el-input style="width: 148px" v-model="list.deleteFlg" placeholder=""></el-input>
								</div>
							</el-col>
							<!--<el-col :span="6">
								<div class="grid-content bg-purple-light">
									<el-button type="danger" icon="el-icon-delete" @click="del2(index)"></el-button>
								</div>
							</el-col>-->
						</el-row>
						<!--<el-button style="margin-top: 20px;" @click="addE2">&nbsp;&nbsp;&nbsp;增加奖金阶段奖励</el-button>-->

					</el-form-item>
					<br></br>
				</el-tab-pane>

			</el-tabs>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<!--				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
-->
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { updateMemberStore, memberStoreList, updateCash, listCash, updateStage, listStage } from '@/api/memberStore'; //会员分销设置

	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {
		retailPurchase: '', //分销内购
		retailSelf: 0, //分销自省
		firstMasterMoney: '', //首笔管理奖金比例
		firstCommission: '', //首页佣金显示
		onlyOneGoodMoney: '', //成为分销商条件
		vipMemberStatus: '', //会员资格时长状态
		vipMemberTime: '', //默认会员天数
		minCashMoney: '', //提现最低金额
		maxCashMoney: '', //提现最高金额
		monthCashMoney: '', //每月提现次数
		dayAccount: '', //结算天数
		cashText: '', //提现说明文案
		stageMoney: '', //阶段奖金
		startTime: '' //可提现销售佣金计算开始时间
	};
	export default {
		name: 'PermissionDetail',
		components: {
			SingleUpload
		},
		props: {
			isEdit: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				lists: [{
					starCashMoney: "", //起始手续费（起）
					endCashMoney: "", //结束手续费（至）
					chargeCashMoney: "" //收取的手续费百分比%  
				}],
				lists2: [{
					invaitatonMoney: "", //被邀请人可提现销售佣金
					salesMoney: "", //可提现销售佣金
					inviterMoney: "", //邀请人可提现佣金
					deleteFlg: 1
				}],
				activeName: "first",
				data: [],
				titleList: [],

				value: '',
				brand: Object.assign({}, defaultBrand),
				rules: {
					name: [{
							required: true,
							message: '请输入菜单名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					logo: [{
						required: true,
						message: '请输入品牌logo',
						trigger: 'blur'
					}],
					sort: [{
						type: 'number',
						message: '排序必须为数字'
					}],
				}
			}
		},

		created() {
			if(this.isEdit) {

				listStage().then(response => {
					this.lists2 = response.data;
				});
				listCash().then(response => {
					this.lists = response.data;
				});
				memberStoreList().then(response => {
					this.brand = response.data;
				});

			} else {

				this.brand = Object.assign({}, defaultBrand);
			}
		},
		methods: {
			addEl: function() {
				var cope = {
					starCashMoney: "", //起始手续费（起）
					endCashMoney: "", //结束手续费（至）
					chargeCashMoney: "" //收取的手续费百分比%  
				}
				this.lists.push(cope);
			},
			del: function(index) {
				this.lists.splice(index, 1);
			},

			addE2: function() {
				var cope2 = {
					invaitatonMoney: "", //被邀请人可提现销售佣金
					salesMoney: "", //可提现销售佣金
					inviterMoney: "", //邀请人可提现佣金
					deleteFlg: 1
				}
				this.lists2.push(cope2);
			},
			del2: function(index) {
				this.$set(this.lists2[index], 'deleteFlg', 0)
			},

			formatTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},

			handleClick(tab, event) {
				console.log(tab, event);
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
								console.log(this.lists2)
								updateStage(1, this.lists2).then(response => {
									console.log(response)
								});
								updateCash(1, this.lists).then(response => {
									console.log(response)
								});
								updateMemberStore(1, this.brand).then(response => {

									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});

							} else {
								console.log(this.brand)
								creatPermission(this.brand).then(response => {
									this.$refs[formName].resetFields();
									this.brand = Object.assign({}, defaultBrand);
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.brand = Object.assign({}, defaultBrand);
			}
		}
	}
</script>
<style>

</style>