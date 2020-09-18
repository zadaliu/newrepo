<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
			<el-form-item label="名称：" prop="name">
				<el-input v-model="brand.name"></el-input>
			</el-form-item>
			<el-form-item label="电话：" prop="phone">
				<el-input v-model="brand.phone"></el-input>
			</el-form-item>
			<el-form-item label="公司名称：" prop="copName">
				<el-input v-model="brand.copName"></el-input>
			</el-form-item>

			<el-form-item label="营业执照：" prop="businessPic">
				<single-upload v-model="brand.businessPic"></single-upload>
			</el-form-item>

			<el-form-item label="银行卡号：" prop="cardNumber">
				<el-input v-model="brand.cardNumber"></el-input>
			</el-form-item>

			<el-form-item label="银行名称：" prop="bankName">
				<el-input v-model="brand.bankName"></el-input>
			</el-form-item>

			<el-form-item label="开户名称：" prop="accountBankName">
				<el-input v-model.number="brand.accountBankName"></el-input>
			</el-form-item>
			<el-form-item label="账户类型：" >
			<el-radio v-model="brand.flag" :label="0">对公</el-radio>
  			<el-radio v-model="brand.flag" :label="1">对私</el-radio>
  			</el-form-item>
			<!--<el-form-item label="是否显示：">
        <el-radio-group v-model="brand.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>-->

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { createTitle, getTitle, updateTitle } from '@/api/supplier'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		businessPic: '',
		name: '',
		phone: '',
		copName: '',
		cardNumber: '',
		bankName: '',
		accountBankName:'',
		flag:0,
	};
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
				rules: {
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
							required: true,
							message: '请输入电话',
							trigger: 'blur'
						},
						{
							min: 8,
							message: '长度不能小于8个字符',
							trigger: 'blur'
						}
					],

					copName: [{
							required: true,
							message: '请输入公司名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],

					businessPic: [{
						required: true,
						message: '请上传营业执照',
						trigger: 'blur'
					}],

					cardNumber: [{
						required: true,
						message: '请输入银行卡号',
						trigger: 'blur'
					}],
					bankName: [{
							required: true,
							message: '请输入银行名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					accountBankName: [{
							required: true,
							message: '请输入开户名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		created() {
			if(this.isEdit) {
				getTitle(this.$route.query.id).then(response => {
					this.brand = response.data;
				});
			} else {
				this.brand = Object.assign({}, defaultBrand);
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
								updateTitle(this.$route.query.id, this.brand).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								createTitle(this.brand).then(response => {
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