<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="用户管理" name="first">

					<el-form-item label="用户：">
						<el-input v-model="brand.nickname"></el-input>
					</el-form-item>
					<el-form-item label="注册时间:">
						<!--<el-input v-model="brand.createTime"></el-input>-->
						<el-date-picker v-model="brand.createTime" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>

					</el-form-item>

					<el-form-item label="用户标签:">
						<!--<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>-->
						<el-col :span="24">
							<el-checkbox-group @change="getValue()" v-model="note" size="medium ">
								<!--<el-checkbox 
									v-for="item in titleList" :key="item.id"
		                            :label="item.titleName"
		                            :value="item.id" border>
								</el-checkbox>-->

								<el-checkbox v-for="(item,i) in titleList" :key="i" :label="item.id" :disabled="item.disabled" :checked="item.checked" border>
									{{item.titleName}}
								</el-checkbox>

							</el-checkbox-group>
						</el-col>
					</el-form-item>
					<el-form-item label="提现信息:">
					</el-form-item>
					<el-form-item label="真实姓名:">
						<el-input v-model="brand.realName"></el-input>
					</el-form-item>
					<el-form-item label="身份证号:">
						<el-input v-model="brand.userCardId"></el-input>
					</el-form-item>
					<el-form-item label="手机号码:">
						<el-input v-model="brand.phone"></el-input>
					</el-form-item>
					<el-form-item label="银行名称:">
						<el-input v-model="brand.bankName"></el-input>
					</el-form-item>
					<el-form-item label="开户支行:">
						<el-input v-model="brand.bankSubName"></el-input>
					</el-form-item>
					<el-form-item label="银行卡号:">
						<el-input v-model="brand.userBankId"></el-input>
					</el-form-item>

				</el-tab-pane>
				<el-tab-pane label="配置管理" name="second">
					<el-form-item label="用户：">
						<el-input v-model="brand.nickname"></el-input>
					</el-form-item>
					<el-form-item label="上级分销商:">
						{{topFxsIdName.length==0?'顶级用户':topFxsIdName}}
						<el-input v-show="false" v-model="brand.topFxsId"></el-input>
					</el-form-item>
					<!--<el-form-item label="是否固定上级" prop="resource">
						<el-radio-group v-model="brand.topStatus">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>-->
					<!--<el-form-item label="绑定关系时间:">
						<el-date-picker v-model="brand.bindTime" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
					</el-form-item>-->
					<el-form-item label="分销等级">
						<el-select v-model="brand.levelId" placeholder="请选择分销等级" clearable @change="fnEdit">
							<el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.status" clearable></el-option>
							<!--
							<el-option label="普通用户" value="0">普通用户</el-option>
							<el-option label="会员" value="1">会员</el-option>
							<el-option label="总监" value="2">总监</el-option>
							<el-option label="经销商" value="3">经销商</el-option>-->
						</el-select>
					</el-form-item>

					<el-form-item label="代理商">
						<el-select v-model="brand.topFxsId" @change="fxsEdit" placeholder="请选择分销等级" value-key="id" style="width:300px">
							<el-option v-for="item in topList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<!--<el-form-item label="是否永不降级" prop="resource">
						<el-radio-group v-model="brand.downgradeStatus">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
						<span>设定后，任何条件都无法降级</span>
					</el-form-item>

					<el-form-item label="分销资格到期时间:">
						<el-date-picker v-model="brand.agentSenTime" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
					</el-form-item>-->

				</el-tab-pane>

				<!--<el-tab-pane label="区域信息" name="third">
					<el-form-item label="用户：">
						<el-input v-model="brand.nickname"></el-input>
					</el-form-item>
					<el-form-item label="代理等级:">
						<el-input v-model="brand.agentLevel"></el-input>
					</el-form-item>

					<el-form-item label="同级代理商:">
						<el-input v-model="brand.agentSameLevel"></el-input>
					</el-form-item>
					<el-form-item label="代理省份:">
						<span>{{brand.agentProvince}}</span>
					</el-form-item>
					<el-form-item label="代理城市:">
						<span>{{brand.agentCity}}</span>
					</el-form-item>
					<el-form-item label="代理县区:">
						<span>{{brand.agentArea}}</span>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="dialogVisible = true">添加代理区</el-button>
					</el-form-item>
					<el-form-item label="累计分红:">
						<el-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark" style="margin-right: 10px;">
							{{ item.label }}
						</el-tag>
					</el-form-item>
					<el-dialog title="添加代理区域" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
						<span>选择代理区域</span>
						<el-cascader size="large" :options="options" v-model="selectedOptions" @change="addressChange">
						</el-cascader>
						<br></br>
						<span>选择代理区域</span>
						<br></br>

						<el-radio-group v-model="brand.agentCityStatus">
							<el-radio :label="0">省份</el-radio>
							<el-radio :label="1">城市</el-radio>
							<el-radio :label="2">地区</el-radio>
						</el-radio-group>

						<br></br>
						<span style="color: red;">省级代理可代理任何地区，市级代理只能代理城市和地区，区级代理只能代理区</span>
						<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
					</el-dialog>

				</el-tab-pane>-->

			</el-tabs>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	//	import { fetchList, getPermissionDetail, creatPermission, updatePermission, deleteBrand } from '@/api/permissiondetail'
	//	import { treeList } from '@/api/role'
	//	import { createBrand, getBrand, updateBrand } from '@/api/brand'
	import { getUser, updateUser, updateUserTitle, getTopMemberLevel } from '@/api/tarnslate'; //用户基本信息

	import { titleList } from '@/api/title' //标签列表
	import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		name: '',
		value: '',
		uri: '',
		pid: null,
		status: 0
	};
	const defaultTypeOptions2 = [{
			status: 'false',
			label: '普通用户',
			value: 0
		},
		{
			status: 'false',
			label: '会员',
			value: 1
		},
		{
			status: 'false',
			label: '总监',
			value: 2
		},
		{
			label: '经销商',
			value: 3
		}
	];
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
				topFxsIdName: '',
				objectFxs: Object,
				levelList: Object.assign({}, defaultTypeOptions2),
				topList: [],
				dialogVisible: false,
				options: regionData,
				selectedOptions: [],
				note: [],
				activeName: 'first',
				centerDialogVisible: false,
				data: [],
				titleList: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				items: [{
						type: 'info',
						label: '总计：0'
					},
					{
						type: 'info',
						label: '省级：0'
					},
					{
						type: 'info',
						label: '市级：0'
					},
					{
						type: 'info',
						label: '区级：0'
					}
				],
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
			this.getTopMemberLevels();
			if(this.isEdit) {
				getUser(this.$route.query.id).then(response => {
					this.brand = response.data;
					this.djint = this.brand.levelId;
					getUser(this.brand.topFxsId).then(response => {
						if(response.data) {
							console.log("有值" + response.data.USERNAME)
							this.topFxsIdName = response.data.USERNAME;
						} else {
							console.log("走入空")
							this.topFxsIdName = '';
							console.log(this.topFxsIdName.length)
						}

						//						console.log(this.topFxsIdName.size);
						//						if(this.topFxsIdName) {
						//							
						//						}
					});

				});
				titleList(this.$route.query.id).then(response => {
					this.titleList = response.data;
				});
			} else {

				this.brand = Object.assign({}, defaultBrand);
			}
		},
		methods: {
			fxsEdit(vId) {
				this.brand.topFxsId = vId;
				console.log(vId);
			},
			fnEdit(vId) {
				if(vId != 3) {
					this.$message({
						message: '等级不能低于经销商',
						type: 'error',
						duration: 1000
					});
					this.brand.levelId = this.djint;

				}
			},

			getTopMemberLevels() {
				getTopMemberLevel().then(response => {
					this.topList = [];
					let list = response.data;
					for(let i = 0; i < list.length; i++) {
						this.topList.push({
							label: list[i].phone + "--" + list[i].nickname,
							value: list[i].id
						});
					}
				});
			},

			getValue() {
				//				this.homeAdvertise.note = JSON.stringify(this.note);
				console.log(this.note)
				//				console.log("this.homeAdvertise.test-------" + this.homeAdvertise.note)

			},
			formatTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			addressChange(value) {
				this.brand.agentProvince = CodeToText[value[0]]
				this.brand.agentCity = CodeToText[value[1]]
				this.brand.agentArea = CodeToText[value[2]]
				console.log(value)
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			getInfo() {
				if(this.isEdit) {
					this.centerDialogVisible = true;
					this.$nextTick(() => {
						console.log(defaultBrand.pid)
						this.$refs.tree.setCheckedKeys([defaultBrand.pid]);
					});
					console.log("修改")

				} else {
					this.centerDialogVisible = true;
				}

			},

			//设置为单选
			handleClick(data, checked, node) {
				//				console.log(data)
				//				this.brand.perName = data.name;
				//				if(checked == true) {
				//					this.checkedId = data.comcode;
				//					defaultBrand.pid = data.id;
				//					this.brand.pid = data.id;
				//					console.log(data.id)
				//					this.$refs.tree.setCheckedNodes([data]);
				//
				//				}
				if(checked == true) {
					this.checkedId = data.comcode;
					this.$refs.tree.setCheckedNodes([data]);
				}
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

								updateUser(this.$route.query.id, this.brand).then(response => {

									let pararm = JSON.stringify(this.note);
									updateUserTitle(this.$route.query.id, pararm).then(response => {
										console.log(response)
									});
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