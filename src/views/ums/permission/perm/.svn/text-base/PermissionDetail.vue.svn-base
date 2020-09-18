<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">

			<el-form-item label="选择上级菜单：">
				<el-input v-model="perName" :disabled="true" style="width:86%"></el-input>
				<el-button type="text" @click="getInfo()">选择部门</el-button>

			</el-form-item>

			<el-form-item label="菜单名称：" prop="name">
				<el-input v-model="brand.name"></el-input>
				<el-input v-model="brand.pid" style="display: none;"></el-input>
			</el-form-item>
			<el-form-item label="权限名称：">
				<el-input v-model="brand.value"></el-input>
			</el-form-item>
			<el-form-item label="前端路径：">
				<el-input v-model="brand.uri"></el-input>
			</el-form-item>
			<el-form-item label="权限类型：">
				<el-select v-model="brand.type" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="启用状态：">
				<el-radio-group v-model="brand.status">
					<el-radio :label="1">启用</el-radio>
					<el-radio :label="0">禁用</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-dialog title="上级部门" :visible.sync="centerDialogVisible" width="30%" center>
				<el-tree :data="data" show-checkbox default-expand-all node-key="id" @check-change="handleClick" show-checkbox :check-strictly="true" ref="tree" highlight-current :props="defaultProps">
				</el-tree>
				<span slot="footer" class="dialog-footer">
				    <el-button @click="centerDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
				    
				    
				  </span>
			</el-dialog>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import { fetchList, getPermissionDetail, creatPermission, updatePermission, deleteBrand } from '@/api/permissiondetail'
	import { treeList } from '@/api/role'
	//	import { createBrand, getBrand, updateBrand } from '@/api/brand'
	import SingleUpload from '@/components/Upload/singleUpload'
	const defaultBrand = {

		name: '',
		value: '',
		uri: '',
		pid: null,
		status: 0
	};
	export default {
		name: 'PermissionDetail',
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
				perName : '',
				centerDialogVisible: false,
				data: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				options: [{
					value: 0,
					label: '目录'
				}, {
					value: 1,
					label: '菜单'
				}, {
					value: 2,
					label: '按钮'
				}],
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
				getPermissionDetail(this.$route.query.id).then(response => {
					this.brand = response.data;
					defaultBrand.pid = response.data.pid;
					console.log(response.data.pid)
					getPermissionDetail(response.data.pid).then(response => {
						    this.perName = response.data.name;
//							defaultBrand.perName = response.data.name;
							console.log(this.perName)
					});
				});
				treeList().then(response => {
					this.data = response.data;
				});

			} else {
				treeList().then(response => {
					this.data = response.data;
				});
				this.brand = Object.assign({}, defaultBrand);
			}
		},
		methods: {
			getCheckedKeys() {

				this.perName = this.$refs.tree.getCheckedNodes()[0].name;
				console.log(this.$refs.tree.getCheckedNodes()[0].name);
				defaultBrand.pid = this.$refs.tree.getCheckedKeys();
				this.brand.pid = this.$refs.tree.getCheckedKeys()[0];
				this.centerDialogVisible = false;
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
								updatePermission(this.$route.query.id, this.brand).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
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