<template>
	<div>

		<el-card class="form-container" shadow="never" style="width:77%">

			<el-row>
				<el-col :span="24">
					<div v-if="fdata.cashStatus==0 && fdata.state==null" class="operate-container" shadow="never">
						<span>&nbsp;</span>
						<el-button class="btn-add" type="primary" @click="handleAdd()">提交申请</el-button>
						<el-button class="btn-add" type="danger" @click="handleres()" style="margin-right: 10px;">驳回申请</el-button>
					</div>
					<div class="grid-content bg-purple-dark">
						<el-steps :space="1100" :active="ststu" finish-status="success">
							<el-step title="申请中"></el-step>
							<el-step title="优地税审核中"></el-step>
							<el-step title="商家打款"></el-step>
							<el-step title="无效"></el-step>
						</el-steps>

					</div>
				</el-col>
			</el-row>

			<el-row style="border: 1px;">
				<p>提现者信息</p>
				<el-col :span="6">
					<el-row style="border: 1px;">
						<el-col :span="8">
							<el-avatar :size="60" v-if="fdata.icon=== undefined " :src="fdata.icon"></el-avatar>
							<el-avatar :size="60" v-else :src="img_user"></el-avatar>
						</el-col>
						<el-col :span="7">
							<p>昵称:{{fdata.nickName}}</p>
							<p>姓名:{{fdata.realName}}</p>
							<p>手机号:{{fdata.phone}}</p>
							<p>微信号:</p>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple-light">
						<p>分销等级:</p>
						<p>{{fdata.levelId |formatLevel}}</p>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<p>团队分销商总人数</p>
						<p><span style="color: red;">{{teamCount}}</span>人</p>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">
						<p>打款方式</p>
						<el-tag size="medium" type="danger">银行卡</el-tag>
						<p>姓名:<span style="color: red;">{{fdata.realName}}</span></p>
						<p>银行:<span style="color: red;">{{fdata.bankName}}</span></p>
						<p>分支行:<span style="color: red;">{{fdata.bankSubName}}</span></p>
						<p>卡号:<span style="color: red;">{{fdata.userNankId}}</span></p>
						<p>手机号:<span style="color: red;">{{fdata.phone}}</span></p>
						<p>身份证号:<span style="color: red;">{{fdata.userCardId}}</span></p>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<p>申请信息</p>
						<p>此次收益总额:<span style="color: red;">{{fdata.realCash}}</span></p>
						<p>佣金收益:<span style="color: red;">{{fdata.cashAmountYj==null?0:fdata.cashAmountYj}}</span></p>
						<p>管理收益:<span style="color: red;">{{fdata.cashAmountJj==null?0:fdata.cashAmountJj}}</span></p>
						<p>阶段收益:<span style="color: red;">{{fdata.cashAmountJd==null?0:fdata.cashAmountJd}}</span></p>
						<p></p>
						<p>打款收益:<span style="color: red;">{{fdata.realCash==null?0:fdata.realCash}}</span></p>
						<p>提现手续费金额:<span style="color: red;">{{fdata.feeCash==null?0:fdata.feeCash}}</span></p>
						<p>提现手续费:{{fdata.feeCashDou==null?0:fdata.feeCashDou}}&nbsp;%</p>
					</div>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<p>当前打款状态：<span style="color: red;">{{fdata.state | formatState }}</span>
							<el-button @click="selectSYD">查询税优地接口</el-button>
						</p>
						
					</div>
				</el-col>
			</el-row>


			<el-row>
				<!--<el-button size="mini" type="success">批量审核通过</el-button>
				<el-button size="mini" type="danger">批量审核不通过</el-button>-->
				<el-button @click="gotodown">返回</el-button>
				<el-button type="success" style="float: right;margin-left: 10px;" @click="exportExcel">导出</el-button>
			</el-row>

			<el-row>
				<h3 id="dai-ban-ma-wen-biao-ge"> 订单信息</h3>
			</el-row>

			<el-row>
				<el-table :data="tableData" style="width: 90%" id="out-table">
					<!--<el-table-column type="index" :index="indexMethod">
					</el-table-column>-->
					<el-table-column label="订单号">
						<template slot-scope="scope">
							<el-row>
								<el-col>
									<p>{{" "+scope.row.order_sn}}</p>
								</el-col>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="商品">
						<template slot-scope="scope">
							<el-row>
								<el-col class="table-cell">
									<img :src="scope.row.productPic" style="height: 80px">
								</el-col>
								<el-col>
									<p>{{scope.row.productName}}</p>
								</el-col>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="realAmount" label="订单金额">
					</el-table-column>
					<el-table-column label="支付方式">
						<template slot-scope="scope">
							<p>线上支付</p>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="收益">
					</el-table-column>
				</el-table>
			</el-row>
		</el-card>
	</div>
</template>
<script>
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	import SingleUpload from '@/components/Upload/singleUpload'
	import { findById, findByIdToMap, updateSucsee,memberTeamCount,selectSyd } from '@/api/accountCash';
	import img_user from '@/assets/images/user.png';
	
	export default {
		name: 'SeckillDetail',
		components: {
			SingleUpload
		},
		inject: ['reload'],
		data() {
			return {
				ststu : -1 ,
				teamCount: 0,
				status: 0,
				img_user,
				fdata: Object,
				tableData: []
			}
		},
		filters: {
			formatState(value){
				console.log("_______________d____"+value);
				if(value=="0"){
					return "已受理";
				} else if(value == "1"){
					return "处理中";
				} else if(value == "2"){
					return "提现中";
				} else if(value == "3"){
					return "成功";
				} else {
					return "失败";
				}
			},
			formatDateTime(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatLevel(value) {
				if(value == 1) {
					return '店主';
				} else if(value == 2) {
					return '经理';
				} else if(value == 3) {
					return '服务商';
				} else {
					return '普通用户';
				}
			},
		},
		created() {
			this.findId();
		},
		
		watch: {
		    ststu(value) {
		    	console.log("______"+value);
//		    	if(value=="2"){
//		    		this.ststu  = 4;
//		    
//		    	}
//		    	if(value=="1"){
//		    		this.ststu  = 3;
//		    
//		    	}
//		    	
//		    	if(value=="3"){
//		    		this.ststu  = 2;
//		    	}
		    },
		  }, 
		methods: {
			//单行删除
			gotodown() {
				this.$router.go(-1)
			},
			handleDelete(index) {
				this.assembleSel.splice(index, 1)
			},
			selectSYD() {
				selectSyd(this.$route.query.id).then(response => {
				console.log(response.data);
				this.reload();
					if(response.data) {
						this.$message({
							message: response.data,
							type: 'success'
						});
					} else {
						this.$message({
							message: '申请失败！',
							type: 'error'
						});
					}
				})
			},
			handleAdd() {
				console.log("通过审核")
				let param = new URLSearchParams();
				param.append("status", "1");
				updateSucsee(this.$route.query.id, param).then(response => {

					if(response.data) {
						this.$message({
							message: '申请成功！',
							type: 'success'
						});
						this.$router.go(-1)
					} else {
						this.$message({
							message: '申请失败！',
							type: 'error'
						});

					}
				})
			},
			handleres() {
				console.log("拒绝审核")
				let param = new URLSearchParams();
				param.append("status", "2");
				updateSucsee(this.$route.query.id, param).then(response => {
					if(response.data) {
						this.$message({
							message: '申请成功！',
							type: 'success'
						});
						this.$router.go(-1)
					} else {
						this.$message({
							message: '申请失败！',
							type: 'error'
						});

					}
				})
			},
			findId() {
				console.log("DDDDDDDDDDDDDDDDDD");
				findById(this.$route.query.id).then(response => {
					this.fdata = response.data;
					console.log(this.fdata);
					var status = Number(response.data.cashStatus);
					var vifStatus = Number(response.data.state);
					console.log(status+"___"+vifStatus);
					if(status==0 && vifStatus!=3 ){
						this.ststu = "2";
						console.log("-------------------1");
					}
					if(status == 1){
						this.ststu = "3";
						console.log("-------------------2");
					}
					
					if(status == 2){
						this.ststu = "4";
						console.log("-------------------3");
					}
						//this.ststu = status;
					memberTeamCount(this.fdata.memberId).then(response => {
					
							this.teamCount = response.data;
					})
				})
				findByIdToMap(this.$route.query.id).then(response => {
					this.tableData = response.data;
				})
			},
				//定义导出Excel表格事件
			exportExcel() {
				var xlsxParam = { raw: true };
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"),xlsxParam);
				/* 获取二进制字符串作为输出 */
				var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					FileSaver.saveAs(
						//Blob 对象表示一个不可变、原始数据的类文件对象。
						//Blob 表示的不一定是JavaScript原生格式的数据。
						//File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
						//返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
						new Blob([wbout], {
							type: "application/octet-stream;charset=utf-8"
						}),
						//设置导出文件名称
						"税务.xlsx"
					);
				} catch(e) {
					if(typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			}
		}
	}
</script>
<style scoped>
	.input-width {
		width: 70%;
	}
</style>