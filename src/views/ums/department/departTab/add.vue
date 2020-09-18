<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="部门名称：" prop="deparName">
        <el-input v-model="homeAdvertise.deparName" class="input-width"></el-input>
      </el-form-item>
    
      <el-form-item label="上级部门：" >
        <!--<el-select v-model="homeAdvertise.type"  >-->
        	 <el-input @click="centerDialogVisible = true" v-model="grouName" :disabled="true" class="input-width"></el-input>
        	  <el-button type="text" @click="centerDialogVisible = true">选择部门</el-button>
        	         	  <el-input @click="centerDialogVisible = true" v-model="homeAdvertise.topDeparId" :disabled="true" style="display: none" class="input-width"></el-input>
      </el-form-item>
      
      
       <el-form-item label="排序号：" prop="orderNum">
        <el-input v-model="homeAdvertise.orderNum" class="input-width"></el-input>
      </el-form-item>
      
     
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
      
      <el-dialog
				  title="上级部门"
				  :visible.sync="centerDialogVisible"
				  width="30%"
				  center>
				 
						<el-tree :data="data"
	@check-change="handleClick" 
	 show-checkbox 
	 :check-strictly="true" 
							 show-checkbox default-expand-all node-key="id" 
							  ref="tree" 
							  highlight-current 
							  :props="defaultProps">
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
  import {createHomeAdvertise,createGroup,groupList,getGroup} from '@/api/department'
//const defaultTypeOptions = [
//  {
//    label: '一级公司',
//    value: 0
//  }
//];
  const defaultHomeAdvertise = {
    deparName: null,//部门名称
    topDeparId: 0,  //上级部门
    orderNum: 0//排序号
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

			rules: {
				deparName: [{
					required: true,
					message: '请输入分组名称',
					trigger: 'blur'
				}, ]
			},
			data: [],
			centerDialogVisible: false,
			grouName: null,

			homeAdvertise: null,//        				data: [{
//					id: 1,
//					label: '一级 1',
//					children: [{
//						id: 4,
//						label: '二级 1-1',
//						children: [{
//							id: 9,
//							label: '三级 1-1-1'
//						}, {
//							id: 10,
//							label: '三级 1-1-2'
//						}]
//					}]
//				}, {
//					id: 2,
//					label: '一级 2',
//					children: [{
//						id: 5,
//						label: '二级 2-1'
//					}, {
//						id: 6,
//						label: '二级 2-2'
//					}]
//				}, {
//					id: 3,
//					label: '一级 3',
//					children: [{
//						id: 7,
//						label: '二级 3-1'
//					}, {
//						id: 8,
//						label: '二级 3-2'
//					}]
//				}, {
//					id: 4,
//					label: '一级 3',
//					children: [{
//						id: 9,
//						label: '二级 3-1'
//					}, {
//						id: 10,
//						label: '二级 3-2'
//					}]
//				}, {
//					id: 5,
//					label: '一级 3',
//					children: [{
//						id: 11,
//						label: '二级 3-1'
//					}, {
//						id: 12,
//						label: '二级 3-2'
//					}]
//				}]
        	defaultProps: {
					children: 'children',
					label: 'deparName'
				},
        
//      typeOptions: Object.assign({}, defaultTypeOptions)
      }
    },
    created(){
      if (this.isEdit) {
//      getHomeAdvertise(this.$route.query.id).then(response => {
//        this.homeAdvertise = response.data;
//      });
      }else{
      	groupList().then(response => {
          this.data = response.data;
        });
      	
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },
    methods: {
    	getCheckedKeys() {
    		
			console.log(this.$refs.tree.getCheckedKeys());
			this.homeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
			defaultHomeAdvertise.topDeparId = this.$refs.tree.getCheckedKeys()[0];
			getGroup(this.$refs.tree.getCheckedKeys()[0]).then(response => {
					this.grouName = response.data.deparName;
					console.log("response.data" + response.data)
				});
			
			console.log("===========结束获取上级"+defaultHomeAdvertise.topDeparId);
			this.centerDialogVisible= false;
			},
			//设置为单选
			handleClick(data, checked, node){
               if(checked == true){
                      this.checkedId = data.comcode;
                      this.$refs.tree.setCheckedNodes([data]);
                }
       },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
//              updateHomeAdvertise(this.$route.query.id, this.homeAdvertise).then(response => {
//                this.$refs[formName].resetFields();
//                this.$message({
//                  message: '修改成功',
//                  type: 'success',
//                  duration:1000
//                });
//                this.$router.back();
//              });
              } else {
                createGroup(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                   this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


