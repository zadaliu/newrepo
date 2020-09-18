<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div style="margin-bottom: 30px;">
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
					查询搜索
				</el-button>
				<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="输入搜索：">
						<el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号"></el-input>
					</el-form-item>
					<el-form-item label="收货人：">
						<el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
					</el-form-item>

					<el-form-item label="订单状态：">
						<el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
							<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单分类：">
						<el-select v-model="listQuery.orderType" class="input-width" placeholder="全部" clearable>
							<el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单来源：">
						<el-select v-model="listQuery.sourceType" class="input-width" placeholder="全部" clearable>
							<el-option v-for="item in sourceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="供货商：" v-show="supSupplierFlg">
						<el-select v-model="listQuery.supplierId" class="input-width" placeholder="全部" clearable>
							<el-option v-for="item in supSupplier" :key="item.id" :label="item.copName" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="开始时间：">
						<el-date-picker v-model="listQuery.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间：">
						<el-date-picker v-model="listQuery.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>

			<el-upload style="padding-top: 10px;" class="upload-demo" ref="upload" action="doUpload" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
				<el-button slot="trigger" size="primary" type="success" :loading="requested" style="margin-right: 20px">
					<i class="el-icon-upload2"></i> &nbsp;&nbsp;上传excel
				</el-button>
				<!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>-->
				<!-- <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>-->
				<el-button size="primary" class="btn-add" @click="handleExcelUpload() ">
					<i class="el-icon-download"></i> &nbsp;&nbsp; 导出
				</el-button>

			</el-upload>
			<!--<span slot="footer" class="dialog-footer">-->
			<!-- <el-button @click="visible = false">取消</el-button>-->
			<!-- <el-button type="primary" @click="submitUpload()">确定</el-button>-->
			<!--</span>-->

		</el-card>
		<div class="table-container">

			<!--<el-table :data="lists" v-show="show" ref="lists" style="width: 100%;" v-loading="listLoading" border id="out-table">
				<el-table-column label="id" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="订单编号" align="center">
					<template slot-scope="scope">{{scope.row.orderSn}}</template>
				</el-table-column>
				<el-table-column label="子订单编号" align="center">
					<template slot-scope="scope">{{scope.row.itemOrderCode}}</template>
				</el-table-column>

				<el-table-column label="产品名称" align="center">
					<template slot-scope="scope">{{scope.row.productName}}</template>
				</el-table-column>
				<el-table-column label="价格" align="center">
					<template slot-scope="scope">{{scope.row.productPrice}}</template>
				</el-table-column>
				<el-table-column label="数量" align="center">
					<template slot-scope="scope">{{scope.row.productQuantity}}</template>
				</el-table-column>
				<el-table-column label="提交时间" align="center">
					<template slot-scope="scope">{{scope.row.createTime| formatCreateTime}}</template>
				</el-table-column>
				<el-table-column label="用户手机号" align="center">
					<template slot-scope="scope">{{scope.row.receiverPhone}}</template>
				</el-table-column>
				<el-table-column label="快递公司单号">
					<template slot-scope="scope"></template>
				</el-table-column>
				<el-table-column label="快递公司名称">
					<template slot-scope="scope"></template>
				</el-table-column>
			</el-table>-->

			<el-table ref="orderTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border id="out-table">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column label="主订单id" align="center">
					<template slot-scope="scope">{{scope.row.orderSn}}</template>
				</el-table-column>
				<el-table-column label="子订单id" align="center">
					<template slot-scope="scope">{{scope.row.itemOrderCode}}</template>
				</el-table-column>
				<el-table-column label="订单编号" align="center">
					<template slot-scope="scope">{{scope.row.orderSn}}</template>
				</el-table-column>
				<el-table-column label="提交时间" align="center">
					<template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
				</el-table-column>
				<el-table-column label="用户账号" align="center">
					<template slot-scope="scope">{{scope.row.memberUsername}}</template>
				</el-table-column>
				<el-table-column label="金额" align="center">
					<template slot-scope="scope">￥{{scope.row.payAmount}}</template>
				</el-table-column>
				<el-table-column label="数量" align="center">
					<template slot-scope="scope">{{scope.row.productQuantity}}</template>
				</el-table-column>
				<el-table-column label="支付方式" align="center">
					<template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
				</el-table-column>
				<el-table-column label="订单来源" align="center">
					<template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
				</el-table-column>
				<el-table-column label="订单状态" align="center">
					<template slot-scope="scope">{{scope.row | formatStatus}}</template>
				</el-table-column>
				<el-table-column label="用户手机号" align="center">
					<template slot-scope="scope">{{scope.row.receiverPhone}}</template>
				</el-table-column>
				<el-table-column label="快递公司单号">
					<template slot-scope="scope"></template>
				</el-table-column>
				<el-table-column label="快递公司代码">
					<template slot-scope="scope"></template>
				</el-table-column>

				<el-table-column label="快递公司名称">
					<template slot-scope="scope"></template>
				</el-table-column>
				<el-table-column label="商品图片">
					<template slot-scope="scope"><img style="width: 50px;height: 50px;" :src="scope.row.productPic"></template>
				</el-table-column>
				<el-table-column label="商品名称">
					<template slot-scope="scope">{{scope.row.productName}}</template>
				</el-table-column>
				<el-table-column label="商品规格">
					<template slot-scope="scope">{{scope.row.productAttr | formatjson}}</template>
				</el-table-column>

				<el-table-column label="收货地址">
					<template slot-scope="scope">{{scope.row.address}}</template>
				</el-table-column>

			</el-table>
		</div>

		<el-dialog title="导入数据" :visible.sync="dialogVisibleEdit" width="30%">
			<el-upload class="upload" action="" :multiple="false" :show-file-list="false" accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :http-request="httpRequest">
				<el-button size="primary" type="success">上传</el-button>

			</el-upload>
			<!--<span slot="footer" class="dialog-footer">
				<el-button @click="close('form')">取 消</el-button>
	   		 	<el-button type="primary" @click="editTitle('form')" >确 定</el-button>
	  		</span>-->
		</el-dialog>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,50,100,500]" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible" width="30%">
			<span style="vertical-align: top">操作备注：</span>
			<el-input style="width: 80%" type="textarea" :rows="5" placeholder="请输入内容" v-model="closeOrder.content">
			</el-input>
			<span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
		</el-dialog>
		<logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
	</div>
</template>
<script>
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	import { Loading } from 'element-ui'
	import store from '@/store';
	import { fetchList, closeOrder, deleteOrder, fetchListSup, supDateList, supDateResult, exports } from '@/api/order'
	import { getSupplier } from '@/api/supplier';
	import { formatDate } from '@/utils/date';
	import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		orderSn: null,
		receiverKeyword: null,
		status: null,
		orderType: null,
		sourceType: null,
		createTime: null,
		shoppingType: null,
		memberId: null,
		startTime: null,
		endTime: null
	};
	export default {
		name: "orderList",
		components: {
			LogisticsDialog
		},
		data() {
			return {
				show: false,
				dialogVisibleEdit: false,
				itemList: [],
				fileList: [],
				listQuery: Object.assign({}, defaultListQuery),
				listLoading: true,
				list: [],
				lists: [],
				total: null,
				operateType: null,
				multipleSelection: [],
				closeOrder: {
					dialogVisible: false,
					content: null,
					orderIds: []
				},
				supOrderModel: {
					itemOrderCode: null,
					deliveryCompany: null,
					deliverySn: null
				},
				statusOptions: [{
						label: '待付款',
						value: 0
					},
					{
						label: '待发货',
						value: 1
					},
					{
						label: '已发货',
						value: 2
					},
					{
						label: '已完成',
						value: 3
					},
					{
						label: '已关闭',
						value: 4
					},
					{
						label: '退货',
						value: 5
					}
				],
				orderTypeOptions: [{
						label: '正常订单',
						value: 0
					},
					{
						label: '秒杀订单',
						value: 1
					}
				],
				dataSecond: [],
				sourceTypeOptions: [{
						label: 'PC订单',
						value: 0
					},
					{
						label: 'APP订单',
						value: 1
					}
				],
				operateOptions: [{
						label: "批量发货",
						value: 1
					},
					{
						label: "关闭订单",
						value: 2
					},
					{
						label: "删除订单",
						value: 3
					}
				],
				logisticsDialogVisible: false,
				supSupplier: [],
				supSupplierFlg: false,
			}
		},
		created() {

			if(store.getters.supplierid == 0) {
				this.supSupplierFlg = true;
			} else {
				this.supSupplierFlg = false;
			}

			getSupplier().then(response => {
				this.supSupplier = response.data;
				console.log(this.supSupplier)
			});

			this.listQuery.memberId = this.$route.query.memberId
			this.listQuery.shoppingType = this.$route.query.shoppingType
			this.getList(this.listQuery);
		},
		filters: {
			formatCreateTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatPayType(value) {
				if(value === 1) {
					return '支付宝';
				} else if(value === 2) {
					return '微信';
				} else {
					return '未支付';
				}
			},
			formatSourceType(value) {
				if(value === 1) {
					return 'APP订单';
				} else {
					return 'PC订单';
				}
			},
			formatStatus(value) {
				console.log("sssssssssssssssssss");
				console.log(value);
				if(value.returnStatus===0){
					if(value.status === 1) {
						return '待发货';
					} else if(value.status === 2) {
						return '已发货';
					} else if(value.status === 3) {
						return '已完成';
					} else if(value.status === 4) {
						return '已关闭';
					} else if(value.status === 5) {
						return '无效订单';
					} else {
						return '待付款';
					}
				} else {
					return '退款';
				}
			},
			formatjson(e) {
				console.log("______");
				console.log(e);
				let dataJson = JSON.parse(e);
				let name = "";

				for(var i = 0; i < dataJson.length; i++) {
					if(dataJson.length - 1 == i) {
						name += "[" + dataJson[i].key + " : " + dataJson[i].value + "]";
					} else {
						name += "[" + dataJson[i].key + " : " + dataJson[i].value + "] , ";
					}

				}
				return name;
			},
		},
		methods: {

			beforeUpload(file) {
				// console.log(file,'文件');
				this.files = file;
				const extension = file.name.split('.')[1] === 'xls'
				const extension2 = file.name.split('.')[1] === 'xlsx'
				const isLt5M = file.size / 1024 / 1024 < 5
				if(!extension && !extension2) {
					this.$message.warning('上传模板只能是 xls、xlsx格式!')
					return
				}
				if(!isLt5M) {
					this.$message.warning('上传模板大小不能超过 5MB!')
					return
				}
				this.fileName = file.name;
				setTimeout(() => {
					this.submitUpload();
				}, 500);
				return false; // 返回false不会自动上传
			},

			// 上传excel
			submitUpload() {
				console.log('上传' + this.files.name)
				if(this.fileName == "") {
					this.$message.warning('请选择要上传的文件！')
					return false
				}
				let fileFormData = new FormData();
				fileFormData.append("code", "t_pathology_info_excel");
				fileFormData.append("description", "excel上传测试");
				//filename是键，file是值，就是要传的文件，test是要传的文件名
				fileFormData.append('files', this.files, this.fileName);
				let requestConfig = {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
				}

				const loading = this.$loading({ // 声明一个loading对象
					lock: true, // 是否锁屏
					text: '拼命上传中...', // 加载动画的文字
					spinner: 'el-icon-loading', // 引入的loading图标
					background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
					target: '.sub-main', // 需要遮罩的区域
					body: true,
					//			    customClass: 'mask'                     // 遮罩层新增类名
					customClass: 'create-isLoading'
				})
				//			  console.log("loading");
				//			  console.log(loading);
				//			  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
				//			      loading.close();                      // 关闭遮罩层
				//			  },5000)

				// 执行上传excel
				console.log(fileFormData);
				console.log(requestConfig);
				let id = '';
				supDateResult(fileFormData, requestConfig).then(response => {
					let data = response.data;
					console.log(data);
					loading.close();
				});

				/*  this.http.postJson('/sys/file/upload', fileFormData, requestConfig).then(resp => {
				      if (resp.data.status != 200) {
				          this.$message.error("excel上传失败，请重新上传");
				      } else {
				          id = resp.data.result[0].attachmentId;
				      }
				  }).catch((e) => {
				      // console.log(e);
				      this.$message.error("excel上传失败，请重新上传");
				  }).finally(() => {
				      if(id) {
				          // 触发生成订单实体数据
				          this.generateBill(id);
				      }
				  });*/
			},

			handleExcelAdd() {
				console.log("OKOK")
				this.dialogVisibleEdit = true;

				supDateResult().then(response => {
					this.$nextTick(() => {
						console.log(response.data)
					})
				});
			},

			/**
			 * 生成参数字符串
			 * @param {Object} url 跳转路径
			 * @param {Object} data 数据{key,vlaue}
			 */
			generateUrlParams(url, data, separator) {
				let keys = Object.keys(data);
				let params = '';
				keys.forEach((key, index) => {
					if(index == 0) {
						params += `${separator}${key}=${data[key]}`;
					} else if(index > 0 && index < keys.length) {
						params += `&${key}=${data[key]}`;
					}
				})
				return url + params
			},

			handleExcelUpload() {
				let data = new URLSearchParams();
				if(this.listQuery.orderSn != null) {
					data.append('orderSn', this.listQuery.orderSn);
				}
				if(this.listQuery.receiverKeyword != null) {
					data.append('receiverKeyword', this.listQuery.receiverKeyword);
				}
				if(this.listQuery.status != null) {
					data.append("status", this.listQuery.status);
				}
				if(this.listQuery.orderType != null) {

					data.append("orderType", this.listQuery.orderType);
				}
				if(this.listQuery.sourceType != null) {

					data.append("sourceType", this.listQuery.sourceType);
				}
				if(this.listQuery.startTime != null) {

					data.append("startTime", this.listQuery.startTime);
				}
				if(this.listQuery.endTime != null) {

					data.append("endTime", this.listQuery.endTime);
				}
				if(this.listQuery.shoppingType != undefined) {
					data.append("shoppingType", this.listQuery.shoppingType);
				}
				if(this.listQuery.memberId != undefined) {
					data.append("memberId", this.listQuery.memberId);
				}

				if(this.listQuery.supplierId != undefined) {
					data.append("supplierId", this.listQuery.supplierId);
				}

				data.append("sysUser", store.getters.name);

				for(const [key, value] of data.entries()) {
					this.dataSecond[key] = value;
				}
				console.log(this.dataSecond);
				//114.215.131.135
				let url = this.generateUrlParams("http://localhost:8082/order/exports" ,this.dataSecond, '?');
//				let url = this.generateUrlParams("http://localhost:8082/order/exports", this.dataSecond, '?');
				console.log(url);
				//				location.href = 'http://192.168.43.23:8082/order' + '/exports'
				location.href = url;
				//				a.click();
				//				exports(data).then(response => {
				//									this.$nextTick(() => {
				//										console.log(response.data)
				//									})
				//								});

				//				exports(this.listQuery).then(response => {
				//					this.$nextTick(() => {
				//						console.log(response.data)
				//					})
				//				});
				//				var obj = [];
				//				var co = this.multipleSelection;
				//				if(co.length == 0) {
				//					this.$message({
				//						message: '请选择数据',
				//						type: 'error',
				//						duration: 1000
				//					});
				//					return;
				//				}
				//				//				console.log(this.multipleSelection)
				//				//				for(var i = 0; i < co.length; i++) {
				//				//					obj.push(co[i].id);
				//				//				}
				//				//				console.log(obj)
				//				//				let params = new URLSearchParams();
				//				//				params.append("ids", obj);
				//				//				console.log(obj)
				//				//				supDateList(params).then(response => {
				//				//					this.$nextTick(() => {
				//				//						this.lists = response.data;
				//				//					})
				//				//				});
				//				setTimeout(function() {
				//					var xlsxParam = {
				//						raw: true
				//					}; //转换成excel时，使用原始的格式
				//					var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"), xlsxParam);
				//					var wbout = XLSX.write(wb, {
				//						bookType: "xlsx",
				//						bookSST: true,
				//						type: "array"
				//					});
				//					try {
				//						FileSaver.saveAs(
				//							new Blob([wbout], {
				//								type: "application/octet-stream;charset=utf-8"
				//							}),
				//							"sheetjs.xlsx"
				//						);
				//					} catch(e) {
				//						if(typeof console !== "undefined") console.log(e, wbout);
				//					}
				//					return wbout;
				//					//					/* 从表生成工作簿对象 */
				//					//					var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
				//					//					/* 获取二进制字符串作为输出 */
				//					//					var wbout = XLSX.write(wb, {
				//					//						bookType: "xlsx",
				//					//						bookSST: true,
				//					//						type: "array"
				//					//					});
				//					//					try {
				//					//
				//					//						FileSaver.saveAs(
				//					//							//Blob 对象表示一个不可变、原始数据的类文件对象。
				//					//							//Blob 表示的不一定是JavaScript原生格式的数据。
				//					//							//File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
				//					//							//返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
				//					//							new Blob([wbout], {
				//					//								type: "application/octet-stream;charset=utf-8"
				//					//							}),
				//					//							//设置导出文件名称
				//					//							"performance.xlsx"
				//					//						);
				//					//					} catch(e) {
				//					//						if(typeof console !== "undefined") console.log(e, wbout);
				//					//					}
				//				}, 3000);
				//				return wbout;
			},

			fileToBase64(file) {
				let that = this,
					reader = new FileReader();
				reader.readAsDataURL(file);
				return new Promise((resolve, reject) => {
					reader.onload = function(e) { //这里是一个异步，所以获取数据不好获取在实际项目中，就用new Promise解决
						if(this.result) {
							resolve(this.result)
						} else {
							reject("err")
						}

					}
				})
			},
			handleResetSearch() {
				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSearchList() {
				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleViewOrder(index, row) {
				this.$router.push({
					path: '/oms/orderDetail',
					query: {
						id: row.id
					}
				})
			},
			handleCloseOrder(index, row) {
				this.closeOrder.dialogVisible = true;
				this.closeOrder.orderIds = [row.id];
			},
			handleDeliveryOrder(index, row) {
				let listItem = this.covertOrder(row);
				this.$router.push({
					path: '/oms/deliverOrderList',
					query: {
						list: [listItem]
					}
				})
			},
			handleViewLogistics(index, row) {
				this.logisticsDialogVisible = true;
			},
			handleDeleteOrder(index, row) {
				let ids = [];
				ids.push(row.id);
				this.deleteOrder(ids);
			},
			handleBatchOperate() {
				if(this.multipleSelection == null || this.multipleSelection.length < 1) {
					this.$message({
						message: '请选择要操作的订单',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if(this.operateType === 1) {
					//批量发货
					let list = [];
					for(let i = 0; i < this.multipleSelection.length; i++) {
						if(this.multipleSelection[i].status === 1) {
							list.push(this.covertOrder(this.multipleSelection[i]));
						}
					}
					if(list.length === 0) {
						this.$message({
							message: '选中订单中没有可以发货的订单',
							type: 'warning',
							duration: 1000
						});
						return;
					}
					this.$router.push({
						path: '/oms/deliverOrderList',
						query: {
							list: list
						}
					})
				} else if(this.operateType === 2) {
					//关闭订单
					this.closeOrder.orderIds = [];
					for(let i = 0; i < this.multipleSelection.length; i++) {
						this.closeOrder.orderIds.push(this.multipleSelection[i].id);
					}
					this.closeOrder.dialogVisible = true;
				} else if(this.operateType === 3) {
					//删除订单
					let ids = [];
					for(let i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].id);
					}
					this.deleteOrder(ids);
				}
			},
			handleSizeChange(val) {
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.listQuery.pageNum = val;
				this.getList();
			},
			handleCloseOrderConfirm() {
				if(this.closeOrder.content == null || this.closeOrder.content === '') {
					this.$message({
						message: '操作备注不能为空',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				let params = new URLSearchParams();
				params.append('ids', this.closeOrder.orderIds);
				params.append('note', this.closeOrder.content);
				closeOrder(params).then(response => {
					this.closeOrder.orderIds = [];
					this.closeOrder.dialogVisible = false;
					this.getList();
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			getList() {
				this.listLoading = true;
				fetchListSup(this.listQuery).then(response => {
					this.listLoading = false;
					//					console.log(JSON.parse(response.data.list[0].productAttr));
					this.list = response.data.list;
					this.total = response.data.total;
				});
			},
			getTime() {
				let data = this.listQuery.queryTime;
				this.listQuery.startTime = formatDate(data[0], 'yyyy-MM-dd hh:mm:ss');
				this.listQuery.endTime = formatDate(data[1], 'yyyy-MM-dd hh:mm:ss');
			},
			deleteOrder(ids) {
				this.$confirm('是否要进行该删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", ids);
					deleteOrder(params).then(response => {
						this.$message({
							message: '删除成功！',
							type: 'success',
							duration: 1000
						});
						this.getList();
					});
				})
			},
			covertOrder(order) {
				let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
				let listItem = {
					orderId: order.id,
					orderSn: order.orderSn,
					receiverName: order.receiverName,
					receiverPhone: order.receiverPhone,
					receiverPostCode: order.receiverPostCode,
					address: address,
					deliveryCompany: null,
					deliverySn: null
				};
				return listItem;
			}
		}
	}
</script>
<style lang="scss">
	.create-isLoading {
		.el-loading-spinner {
			top: 50%;
			left: 50%;
			margin-left: -55px;
			background: rgba(0, 0, 0, 0.7);
			padding: 20px;
			border-radius: 4px;
			width: auto;
			text-align: center;
			position: absolute;
			font-size: 100px;
			i {
				color: #eee;
			}
			.el-loading-text {
				color: #eee;
				font-size: 20px;
			}
		}
	}
</style>
<style scoped>
	.input-width {
		width: 203px;
	}
</style>