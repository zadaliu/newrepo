<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="homeAdvertise" :rules="rules" ref="homeAdvertiseFrom" label-width="150px" size="small">
			<el-form-item label="部门名称：" prop="deparName">
				<el-input v-model="homeAdvertise.deparName" class="input-width"></el-input>
			</el-form-item>

			<el-form-item label="上级部门名称：">
				<!--<el-select v-model="homeAdvertise.type"  >-->
				<el-input @click="centerDialogVisible = true" v-model="grouName" :disabled="true" class="input-width"></el-input>
				<el-button type="text" @click="getInfo()">选择部门</el-button>
			</el-form-item>

		
				<el-input @click="centerDialogVisible = true" v-model="homeAdvertise.topDeparId" :disabled="true" style="display: none" class="input-width"></el-input>
	
			
			<el-form-item label="排序号：" prop="orderNum">
				<el-input v-model="homeAdvertise.orderNum" class="input-width"></el-input>
			</el-form-item>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
			</el-form-item>

			<el-dialog title="上级部门" :visible.sync="centerDialogVisible" ref="top" width="30%" center>

				<el-tree :data="data" 
					show-checkbox default-expand-all node-key="id" 
						@check-change="handleClick" 
	 show-checkbox 
	 :check-strictly="true" 
					ref="tree" highlight-current :props="defaultProps">
				</el-tree>

				<span slot="footer" class="dialog-footer">
				    <el-button @click="centerDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
				    
				    
				  </span>
			</el-dialog>

		</el-form>
	</el-card>
</template>
<script>
	import SingleUpload from '@/components/Upload/singleUpload'
	import { createHomeAdvertise, getGroup, getHomeAdvertise, updateGroup, groupList } from '@/api/department'
	const defaultTypeOptions = [{
		label: '一级公司',
		value: 0
	}];
	const defaultHomeAdvertise = {
		deparName: null, //部门名称
		topDeparId: 0, //上级部门
		topDeparName: null,
		orderNum: 0 //排序号
	};
	export default {
		name: 'HomeAdvertiseDetail',
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
				grouName :null,
				data: [],
				rules: {
					deparName: [{
					required: true,
					message: '请输入分组名称',
					trigger: 'blur'
				}, ]
				},
				homeAdvertise: null,
				centerDialogVisible: false,
				typeOptions: Object.assign({}, defaultTypeOptions),
				defaultProps: {
					children: 'children',
					label: 'deparName'
				},
			}
		},
		created() {
			if(this.isEdit) {
				groupList().then(response => {
					this.data = response.data;
				});
				getGroup(this.$route.query.id).then(response => {
					this.homeAdvertise = response.data;
					console.log("response.data.topDeparId" + this.homeAdvertise.topDeparId)
				
					getGroup(this.homeAdvertise.topDeparId).then(response => {
					this.grouName = response.data.deparName;
							console.log("grouName======"+grouName)				
					});
				});

			} else {
				this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
			}
		},
		methods: {
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
				this.homeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
				defaultHomeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
				console.log("===========结束获取上级" + defaultHomeAdvertise.topDeparId);
				getGroup(this.$refs.tree.getCheckedKeys()[0]).then(response => {
					this.grouName = response.data.deparName;
					console.log("response.data" + response.data)
				});
				this.centerDialogVisible = false;
			},
				//设置为单选
			handleClick(data, checked, node){
               if(checked == true){
                      this.checkedId = data.comcode;
                      this.$refs.tree.setCheckedNodes([data]);
                }
      		 },
			getInfo() {
				this.centerDialogVisible = true;
				getGroup(this.$route.query.id).then(response => {
					this.homeAdvertise = response.data;
				
					this.$nextTick(() => {
						console.log(this.$refs)
						this.$refs.tree.setCheckedKeys([this.homeAdvertise.topDeparId]);
					});
			
				});
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
								updateGroup(this.$route.query.id, this.homeAdvertise).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {
								createGroup(this.homeAdvertise).then(response => {
									this.$refs[formName].resetFields();
									this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
									this.$message({
										message: '提交成功',
										type: 'success',
										duration: 1000
									});
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
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 70%;
	}
</style>