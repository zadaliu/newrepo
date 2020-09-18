<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="homeAdvertise" :rules="rules" ref="homeAdvertiseFrom" label-width="150px" size="small">
			<el-form-item label="用户名：" prop="username">
				<el-input v-model="homeAdvertise.username" class="input-width"></el-input>
			</el-form-item>

			<el-form-item label="所属部门：" prop="grouName">
				<!--<el-select v-model="homeAdvertise.type"  >-->
				<el-input @click="centerDialogVisible = true" v-model="grouName" :disabled="true" class="input-width"></el-input>
				<el-button type="text" @click="centerDialogVisible = true">选择部门</el-button>
				<el-input @click="centerDialogVisible = true" v-model="homeAdvertise.userGroupId" :disabled="true" style="display: none" class="input-width"></el-input>
			</el-form-item>

			<el-form-item label="密码：" prop="password">
				<el-input v-model="homeAdvertise.password" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="邮箱：" prop="email">
				<el-input v-model="homeAdvertise.email" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="手机号：" prop="userPhone">
				<el-input v-model="homeAdvertise.userPhone" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="状态：">
				<el-radio-group v-model="homeAdvertise.status">
					<el-radio :label="0">禁用</el-radio>
					<el-radio :label="1">正常</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="角色：">

				<el-checkbox-group v-model="note" @change="getValue()">
					<el-checkbox v-for="(item,i) in items" :key="i" :label="item.id" :disabled="item.disabled" :checked="item.checked">
						{{item.name}}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<!--<el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.startTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.endTime"></el-date-picker>
      </el-form-item>-->

			<!--<el-form-item label="广告图片：">
        <single-upload v-model="homeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
      </el-form-item>
      
      <el-form-item label="广告备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="homeAdvertise.note">
        </el-input>-->
			</el-form-item>
			<el-row>

			</el-row>
			<el-dialog title="上级部门" :visible.sync="centerDialogVisible" width="30%" center>

				<el-tree :data="data" @check-change="handleClick" show-checkbox :check-strictly="true" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
				</el-tree>

				<span slot="footer" class="dialog-footer">
				    <el-button @click="centerDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
				  </span>
			</el-dialog>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
				<el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import SingleUpload from '@/components/Upload/singleUpload'
	import { groupList, getGroup } from '@/api/department'

	import { createHomeAdvertise, createAdmin, getHomeAdvertise, updateHomeAdvertise } from '@/api/homeAdvertise'
	import { treeList, listRoleCheck } from '@/api/role'

	const defaultTypeOptions = [{
			label: 'PC首页轮播',
			value: 0
		},
		{
			label: 'APP首页轮播',
			value: 1
		}
	];
	const defaultHomeAdvertise = {
		userGroupId: null, //上级部门id
		username: null, //用户名
		type: 1, //所属部门没有写
		password: null, //密码
		status: 0, //状态 0 禁用 1 启用
		email: null, //邮箱
		userPhone: null //手机号
	};
	export default {
		name: 'HomeAdvertiseDetail',
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

				note: [], // 默认选项，要在el-checkbox-group里绑定一个空数组
				items: [{
						id: 0,
						content: "选项一",
						disabled: false,
						checked: true
					},
					{
						id: 2,
						content: "选项二",
						disabled: false,
						checked: false
					},
					{
						id: 3,
						content: "选项三",
						disabled: false,
						checked: false
					},
				],
				rules: {
					username: [{
						required: true,
						message: "请输入用户名称",
						trigger: "blur"
					}],
					//						             grouName: [
					//						                {required: true,message: "请选择上级部门",trigger: "blur"}
					//						            ],

					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					}],
					email: [{
						required: true,
						message: "请输入邮箱",
						trigger: "blur"
					}],
					userPhone: [{
						required: true,
						message: "请输入手机号",
						trigger: "blur"
					}],
				},
				homeAdvertise: null,
				grouName: null,
				data: [],
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
				getHomeAdvertise(this.$route.query.id).then(response => {
					this.homeAdvertise = response.data;
				});
			} else {

				groupList().then(response => {
					this.data = response.data;
				});

				listRoleCheck().then(response => {
					console.log("渲染页面" + response.data)
					this.items = response.data;
				});

				this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
			}
		},
		methods: {
			getValue() {
				this.homeAdvertise.note = JSON.stringify(this.note);
				console.log(this.note)
				console.log("this.homeAdvertise.test-------" + this.homeAdvertise.note)

			},
			getCheckedKeys() {

				console.log(this.$refs.tree.getCheckedKeys());
				this.homeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
				defaultHomeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
				this.homeAdvertise.userGroupId = this.$refs.tree.getCheckedKeys()[0];
				getGroup(this.$refs.tree.getCheckedKeys()[0]).then(response => {
					this.grouName = response.data.deparName;
					console.log("response.data" + response.data)
				});

				console.log("===========结束获取上级" + defaultHomeAdvertise.topDeparId);
				this.centerDialogVisible = false;
			},
			//设置为单选
			handleClick(data, checked, node) {
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
								updateHomeAdvertise(this.$route.query.id, this.homeAdvertise).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});
							} else {

								createAdmin(this.homeAdvertise).then(response => {
									this.$refs[formName].resetFields();
									this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
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