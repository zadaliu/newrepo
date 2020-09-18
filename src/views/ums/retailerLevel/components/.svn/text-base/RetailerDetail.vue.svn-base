<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
			<el-form-item label="等级名称： ">
				<el-input v-model="brand.levelName " style="width: 300px; " autocomplete="off "></el-input>(店主)
			</el-form-item>
			<el-form-item label="一级佣金： ">
				<el-input v-model="brand.oneCommission " style="width: 340px; " autocomplete="off "></el-input>
			</el-form-item>
			<el-form-item label="二级佣金： ">
				<el-input v-model="brand.towCommission " style="width: 340px; " autocomplete="off "></el-input>
			</el-form-item>
			<el-form-item label="直属奖金： ">
				<el-input v-model="brand.directBonus " style="width: 340px; " autocomplete="off "></el-input>
			</el-form-item>
			<el-form-item label="间接奖金： ">
				<el-input v-model="brand.visBonus " style="width: 340px; " autocomplete="off "></el-input>
			</el-form-item>

			<el-form-item label="条件设置：" style="width: 500px;">
				<el-radio-group v-model="brand.levelType"   @change="clickitem" size="medium">
					<el-radio-button @click="clickitem(0)" :label="0" >A</el-radio-button>
					<el-radio-button @click="clickitem(1)" :label="1" >B</el-radio-button>
					<el-radio-button @click="clickitem(2)" :label="2" >C</el-radio-button>
					<!--<el-radio-button @click="clickitem(3)" :label="3" >D</el-radio-button>-->
				</el-radio-group>
			</el-form-item>
			<el-form-item label="升级条件：" v-if="brand.levelType==0" style="width: 500px;">
				无
			</el-form-item>

			<el-form-item label="升级条件：" v-if="brand.levelType==1" style="width: 666px;">
				礼包商品组内累计自身消费+直接礼包销售额满
				<el-input v-model="brand.packageTeamMoney " style="width: 90px; " autocomplete="off "></el-input>元<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 直推
				<el-input v-model="brand.directPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.directMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间推
				<el-input v-model="brand.betweenPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.betweenMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;团队
				<el-input v-model="brand.teamPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.teamMoney " style="width: 100px; " autocomplete="off "></el-input>元的会员等级用户<br/>
			</el-form-item>

			<el-form-item label="升级条件：" v-if="brand.levelType==2" style="width: 666px;">
				礼包商品组内累计自身消费+团队销售额满
				<el-input v-model="brand.packageTeamMoney " style="width: 90px; " autocomplete="off "></el-input>元<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直属总监满
				<el-input v-model="brand.directPeople " style="width: 90px; " autocomplete="off "></el-input>人<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 直推
				<el-input v-model="brand.directPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.directMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间推
				<el-input v-model="brand.betweenPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.betweenMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;团队
				<el-input v-model="brand.teamPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.teamMoney " style="width: 100px; " autocomplete="off "></el-input>元的会员等级用户<br/>
			</el-form-item>

			<el-form-item label="升级条件：" v-if="brand.levelType==3" style="width: 666px;">
				礼包商品组内自身消费+团队礼包销售多少元
				<el-input v-model="brand.packageTeamMoney " style="width: 90px; " autocomplete="off "></el-input>元<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 直推
				<el-input v-model="brand.directPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.directMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间推
				<el-input v-model="brand.betweenPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.betweenMoney " style="width: 100px; " autocomplete="off "></el-input>元的店主<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;团队
				<el-input v-model="brand.teamPush " style="width: 70px; " autocomplete="off "></el-input>个销售佣金达到
				<el-input v-model="brand.teamMoney " style="width: 100px; " autocomplete="off "></el-input>元的会员等级用户<br/> 测试三
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { fetchList, createTitle, updateTitle, createRetail, updateRetail, getTitle, getRetailerById ,banrdLevel} from '@/api/retailerLevel'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {
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
		betweenMoney: '',
		levelType: "",
		teamPush: '',
		teamMoney: ''
	};
	
		const isCreateNewUserBrand = [{
			label: '无',
			value: 0
		},
		{
			label: 'A',
			value: 1
		},
		{
			label: 'B',
			value: 2
		},
		{
			label: 'C',
			value: 3
		}
	];
	
	export default {
		name: 'BrandDetail',
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
				brand: Object.assign({}, defaultBrand),
				isCreateNewUser:Object.assign({}, isCreateNewUserBrand),
				rules: {
					name: [{
							required: true,
							message: '请输入品牌名称',
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
				getTitle(this.$route.query.id).then(response => {
					this.brand = response.data;
				});
				getRetailerById(this.$route.query.id).then(response => {
					this.$set(this.brand, 'packageTeamMoney', response.data.packageTeamMoney)
					this.$set(this.brand, 'directPush', response.data.directPush)
					this.$set(this.brand, 'directMoney', response.data.directMoney)
					this.$set(this.brand, 'betweenPush', response.data.betweenPush)
					this.$set(this.brand, 'betweenMoney', response.data.betweenMoney)
					this.$set(this.brand, 'teamPush', response.data.teamPush)
					this.$set(this.brand, 'teamMoney', response.data.teamMoney)
					this.$set(this.brand, 'directPeople', response.data.directPeople)

					// this.brand.packageTeamMoney = response.data.packageTeamMoney;
					// this.brand.directPush = response.data.directPush;
					//  this.brand.directMoney = response.data.directMoney;
					// this.brand.betweenPush = response.data.betweenPush;
					// this.brand.betweenMoney = response.data.betweenMoney;
					// this.brand.teamPush = response.data.teamPush;
					// this.brand.teamMoney = response.data.teamMoney;

					console.log(this.brand)
				});
			} else {
				this.brand = Object.assign({}, defaultBrand);
			}
		},
		watch:{
			isCreateNewUser(val){
				console.log(val)
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {
								updateRetail(this.brand).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								// let json = JSON.stringify(this.brand);
								createRetail(this.brand).then(response => {
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
			},
			clickitem(e) {
//				banrdLevel(e).then(response => {
//									this.$refs[formName].resetFields();
//									this.brand = Object.assign({}, defaultBrand);
//									this.$message({
//										message: '提交成功',
//										type: 'success',
//										duration: 1000
//									});
//									this.$router.back();
//								});
			},
		}
	}
</script>
<style>

</style>