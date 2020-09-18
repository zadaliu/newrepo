<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
			<el-form-item label="名称：" prop="name">
				<el-input v-model="brand.name"></el-input>
			</el-form-item>

			<el-form-item label="分类图标：" prop="icon">
				<single-upload v-model="brand.icon"></single-upload>
			</el-form-item>

			<!--<el-form-item label="跳转路径：" prop="vurl">
				<el-input v-model="brand.vurl"></el-input>
			</el-form-item>-->


			<el-form-item label="是否显示：" >
			<el-radio v-model="brand.showStatus" :label="0">否</el-radio>
  			<el-radio v-model="brand.showStatus" :label="1">是</el-radio>
  			</el-form-item>
  			
  			<el-form-item label="排序：" prop="sort">
				<el-input v-model="brand.sort"></el-input>
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
	import { createTitle, getTitle, updateTitle } from '@/api/newSubjectCategory'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		icon: '',
		name: '',
		vurl: '',
		showStatus:0,
		sort:''
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
					

					sort: [{
							required: true,
							message: '请输入序号',
							trigger: 'blur'
						}
					],

					icon: [{
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