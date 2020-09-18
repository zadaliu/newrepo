<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
			<el-form-item label="名称：" prop="title">
				<el-input v-model="brand.title"></el-input>
			</el-form-item>
			<el-form-item label="分组：" prop="categoryId">
				<el-select v-model="brand.categoryId">
					<el-option v-for="type in bags" :key="type.id" :label="type.name" :value="type.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="专题主图：" prop="pic">
				<single-upload v-model="brand.pic"></single-upload>
			</el-form-item>
			<el-form-item label="跳转路径：" prop="vurl">
				<el-input v-model="brand.surl"></el-input>
			</el-form-item>

			<el-form-item label="是否显示：">
				<el-radio v-model="brand.showStatus" :label="0">否</el-radio>
				<el-radio v-model="brand.showStatus" :label="1">是</el-radio>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { createTitle, getTitle, updateTitle } from '@/api/newSubject'
	import { queryList } from '@/api/newSubjectCategory'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		pic: '',
		title: '',
		showStatus: 0,
		categoryId: '',
		surl: ''
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
				bags: [],
				rules: {
					title: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 30个字符',
							trigger: 'blur'
						}
					],

					categoryId: [{
						required: true,
						message: '请选择',
						trigger: 'blur'
					}],

					pic: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur'
					}],

				}
			}
		},
		created() {
			if(this.isEdit) {
				this.getList();
				getTitle(this.$route.query.id).then(response => {

					this.brand = response.data;

					console.log(this.brand);
				});
			} else {
				this.brand = Object.assign({}, defaultBrand);
				this.getList();
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
									console.log(this.brand);
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
			getList() {
				queryList().then(res => {
					console.log(res);
					this.bags = res.data;
				})
			}
		}
	}
</script>
<style>

</style>