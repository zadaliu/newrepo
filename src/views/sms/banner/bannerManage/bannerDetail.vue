<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

			<el-form-item label="商品分类关联：" prop="grId">
				<el-select v-model="brand.grId" @change="handleGroupChange" placeholder="请选择分类">
					<el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="跳转页面路径：" prop="vurl">
				<el-input v-model="brand.vurl"></el-input>
			</el-form-item>

			<el-form-item label="banner图片：" prop="imgUrl">
				<single-upload v-model="brand.imgUrl"></single-upload>
			</el-form-item>

			
			<el-form-item label="是否显示：">
				<el-radio v-model="brand.flag" :label="0">否</el-radio>
				<el-radio v-model="brand.flag" :label="1">是</el-radio>
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
	import { createTitle, getTitle, updateTitle } from '@/api/banner'
	import { fetchList, deleteProductCate, updateShowStatus, updateNavStatus } from '@/api/productCate'

	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {
		grId: '',
		imgUrl: '',
		vurl: '',
		flag: 0,
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
				listQuery: {
					pageNum: 1,
					pageSize: 100
				},
				brand: Object.assign({}, defaultBrand),
				groupOptions: [],
				rules: {
					vurl: [{
						required: true,
						message: '请输入前端跳转路径',
						trigger: 'blur'
					}, ],

					imgUrl: [{
						required: true,
						message: '请上传banner图片',
						trigger: 'blur'
					}],
					grId: [{
						required: true,
						message: '请选择商品分类',
						trigger: 'blur'
					}],

				}
			}
		},
		created() {
			if(this.isEdit) {
				this.getGroupList();
				getTitle(this.$route.query.id).then(response => {
					this.brand = response.data;
				});
			} else {
				this.getGroupList();
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
			handleGroupChange(val) {
				let groupName = '';
				for(let i = 0; i < this.groupOptions.length; i++) {
					if(this.groupOptions[i].value === val) {
						groupName = this.groupOptions[i].label;
						break;
					}
				}
				this.value.groupName = groupName;
			},
			getGroupList() {
				fetchList(0, this.listQuery).then(response => {
					this.groupOptions = [];
					let groupList = response.data.list;
					for(let i = 0; i < groupList.length; i++) {
						this.groupOptions.push({
							label: groupList[i].name,
							value: groupList[i].id
						});
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