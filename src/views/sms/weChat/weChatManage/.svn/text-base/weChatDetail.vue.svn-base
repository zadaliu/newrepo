<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
			
			<el-form-item label="图片：" prop="imgUrl">
				<single-upload v-model="brand.imgUrl"></single-upload>
			</el-form-item>

			<el-form-item label="排序数值：" prop="numOrder">
				<el-input v-model="brand.numOrder"></el-input>
			</el-form-item>


		
		

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { createTitle, getTitle, updateTitle } from '@/api/weChatBanner'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		imgUrl: '',
		name: '',
		numOrder: '',
		
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
					
					numOrder: [{
							required: true,
							message: '请输入排序数值',
							trigger: 'blur'
						}
					],

					imgUrl: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur'
					}],

					
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