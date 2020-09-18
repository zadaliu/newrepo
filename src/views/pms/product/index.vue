<template>
	<div class="app-container">
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button type="success" style="float: right;margin-left: 10px;" @click="exportData" size="small">导出</el-button>

				<el-button style="float: right;margin-right: 10px" @click="handleSearchList()" type="primary" size="small">
					查询
				</el-button>
				<el-button style="float: right;margin-right: 10px" @click="handleResetSearch()" size="small">
					重置
				</el-button>
			</div>
			<div style="margin-top: 30px">
				<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
					<el-form-item label="输入搜索：">
						<el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"></el-input>
					</el-form-item>
					<el-form-item label="商品货号：">
						<el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"></el-input>
					</el-form-item>
					<el-form-item label="商品分类：">
						<el-cascader clearable v-model="selectProductCateValue" :options="productCateOptions">
						</el-cascader>
					</el-form-item>
				<el-form-item label="商品品牌：">
						<el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
							<el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上架状态：">
						<el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
							<el-option v-for="item in publishStatusOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核状态：">
						<el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
							<el-option v-for="item in verifyStatusOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-dialog title="审核状态" :visible.sync="dialogFormVisible">
						<el-form :model="form" ref="form">

							<el-form-item label="是否通过">
								<el-select v-model="form.status" placeholder="请选择是否通过">
									<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>

								</el-select>
							</el-form-item>
							<el-form-item label="理由备注">
								<el-input v-model="form.detail" style="width: 200px;"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="recordAdd('this.form')">确 定</el-button>
						</div>
					</el-dialog>
				</el-form>
			</div>
		</el-card>
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
			<el-button class="btn-add" @click="handleAddProduct()" size="mini">
				添加
			</el-button>
		</el-card>
		<div class="table-container">
			<el-table ref="productTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading" border>
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<el-table-column label="编号" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="商品图片" width="120" align="center">
					<template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
				</el-table-column>
				<el-table-column label="商品名称" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.name}}</p>
						<p>品牌：{{scope.row.brandName}}</p>
					</template>
				</el-table-column>
				<el-table-column label="运费" width="100" align="center">
					<template slot-scope="scope">{{scope.row.freight}}</template>
				</el-table-column>
				<el-table-column label="价格/货号" width="120" align="center">
					<template slot-scope="scope">
						<p>价格：￥{{scope.row.price}}</p>
						<p>货号：{{scope.row.productSn}}</p>
					</template>
				</el-table-column>
				<el-table-column label="标签" width="140" align="center">
					<template slot-scope="scope">
						<p>上架：
							<el-switch @change="handlePublishStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.publishStatus">
							</el-switch>
						</p>
						<!--<p>新品：
							<el-switch @change="handleNewStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.newStatus">
							</el-switch>
						</p>-->
						<p>推荐：
							<el-switch @change="handleRecommendStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.recommandStatus">
							</el-switch>
						</p>
					</template>
				</el-table-column>
				<el-table-column label="排序" width="100" align="center">
					<template slot-scope="scope">{{scope.row.sort}}</template>
				</el-table-column>
				<el-table-column label="SKU库存" width="100" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
					</template>
				</el-table-column>
				<el-table-column label="销量" width="100" align="center">
					<template slot-scope="scope">{{scope.row.sale}}</template>
				</el-table-column>
				<el-table-column label="跳转链接" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id | linkFormat}}</template>
				</el-table-column>
				<el-table-column label="审核状态" width="100" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>
						<p>
							<el-button type="text" v-if="scope.row.verifyStatus === 0" @click="handleShowVerifyDetail(scope.$index, scope.row)">审核详情
							</el-button>
						</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
						<p>
							<el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看
							</el-button>
							<el-button size="mini" @click="handleUpdateProduct(scope.$index, scope.row)">编辑
							</el-button>
						</p>
						<p>
							<!--<el-button size="mini" @click="handleShowLog(scope.$index, scope.row)">日志
							</el-button>-->
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</p>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="batch-operate-container">
			<el-select size="small" v-model="operateType" placeholder="批量操作">
				<el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary" size="small">
				确定
			</el-button>
		</div>
		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="编辑货品信息" :visible.sync="editSkuInfo.dialogVisible" width="40%">
			<span>商品货号：</span>
			<span>{{editSkuInfo.productSn}}</span>
			<el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
				<el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
			</el-input>
			<el-table style="width: 100%;margin-top: 20px" :data="editSkuInfo.stockList" border>
				<el-table-column label="SKU编号" align="center">
					<template slot-scope="scope">
						<el-input v-model="scope.row.skuCode"></el-input>
					</template>
				</el-table-column>
				<el-table-column v-for="(item,index) in editSkuInfo.productAttr" :label="item.name" :key="item.id" align="center">
					<template slot-scope="scope">
						{{getProductSkuSp(scope.row,index)}}
					</template>
				</el-table-column>
				<el-table-column label="销售价格" width="80" align="center">
					<template slot-scope="scope">
						<el-input v-model="scope.row.price"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="商品库存" width="80" align="center">
					<template slot-scope="scope">
						<el-input v-model="scope.row.stock"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="库存预警值" width="100" align="center">
					<template slot-scope="scope">
						<el-input v-model="scope.row.lowStock"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
		</el-dialog>
	</div>
</template>
<script>
	import {
		fetchList,
		updateDeleteStatus,
		updateNewStatus,
		updateRecommendStatus,
		updatePublishStatus
	} from '@/api/product'
	import { fetchList as fetchSkuStockList, update as updateSkuStockList } from '@/api/skuStock'
	import { fetchList as fetchProductAttrList } from '@/api/productAttr'
	import { fetchList as fetchBrandList, vertifyRecord, vertifyRecordById } from '@/api/brand'

	import { fetchListWithChildren } from '@/api/productCate'
	const defaultTypeOptions = [{
			label: '审核失败',
			value: 0
		},
		{
			label: '审核通过',
			value: 1
		}
	];

	const defaultListQuery = {
		keyword: null,
		pageNum: 1,
		pageSize: 5,
		publishStatus: null,
		verifyStatus: null,
		productSn: null,
		productCategoryId: null,
		brandId: null
	};
	export default {
		name: "productList",
		data() {
			return {
				typeOptions: Object.assign({}, defaultTypeOptions),
				dialogFormVisible: false, //审核弹出
				form: {
					productId: null,
					status: 0,
					detail: null
				},

				editSkuInfo: {
					dialogVisible: false,
					productId: null,
					productSn: '',
					productAttributeCategoryId: null,
					stockList: [],
					productAttr: [],
					keyword: null
				},
				operates: [{
						label: "商品上架",
						value: "publishOn"
					},
					{
						label: "商品下架",
						value: "publishOff"
					},
					{
						label: "设为推荐",
						value: "recommendOn"
					},
					{
						label: "取消推荐",
						value: "recommendOff"
					},
					{
						label: "设为新品",
						value: "newOn"
					},
					{
						label: "取消新品",
						value: "newOff"
					},
					{
						label: "转移到分类",
						value: "transferCategory"
					},
					{
						label: "移入回收站",
						value: "recycle"
					}
				],
				operateType: null,
				listQuery: Object.assign({}, defaultListQuery),
				list: null,
				total: null,
				listLoading: true,
				selectProductCateValue: null,
				multipleSelection: [],
				productCateOptions: [],
				brandOptions: [],
				publishStatusOptions: [{
					value: 1,
					label: '上架'
				}, {
					value: 0,
					label: '下架'
				}],
				verifyStatusOptions: [{
					value: 1,
					label: '审核通过'
				}, {
					value: 0,
					label: '未审核'
				}]
			}
		},
		created() {
			console.log(fetchList);
			this.getList();
			this.getBrandList();
			this.getProductCateList();
		},
		watch: {
			selectProductCateValue: function(newValue) {
				if(newValue != null && newValue.length == 2) {
					this.listQuery.productCategoryId = newValue[1];
				} else {
					this.listQuery.productCategoryId = null;
				}

			}
		},
		filters: {
			verifyStatusFilter(value) {
				if(value === 1) {
					return '审核通过';
				} else {
					return '未审核';
				}
			},
			linkFormat(id) {
				return '/pages/components/shop-detail?id='+id+'&entryPage=普通&up=home';
			}
		},
		methods: {
			getProductSkuSp(row, index) {
				//      if (index === 0) {
				//        return row.sp1;
				//      } else if (index === 1) {
				//        return row.sp2;
				//      } else {
				//        return row.sp3;
				let spData = JSON.parse(row.spData);
				if(spData != null && index < spData.length) {
					return spData[index].value;
				} else {
					return null;
				}
			},
			getList() {
				this.listLoading = true;
				fetchList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.list;
					this.total = response.data.total;
				});
			},
			getBrandList() {
				fetchBrandList({
					pageNum: 1,
					pageSize: 100
				}).then(response => {
					this.brandOptions = [];
					let brandList = response.data.list;
					for(let i = 0; i < brandList.length; i++) {
						this.brandOptions.push({
							label: brandList[i].name,
							value: brandList[i].id
						});
					}
				});
			},
			getProductCateList() {
				fetchListWithChildren().then(response => {
					let list = response.data;
					this.productCateOptions = [];
					for(let i = 0; i < list.length; i++) {
						let children = [];
						if(list[i].children != null && list[i].children.length > 0) {
							for(let j = 0; j < list[i].children.length; j++) {
								children.push({
									label: list[i].children[j].name,
									value: list[i].children[j].id
								});
							}
						}
						this.productCateOptions.push({
							label: list[i].name,
							value: list[i].id,
							children: children
						});
					}
				});
			},
			handleShowSkuEditDialog(index, row) {
				this.editSkuInfo.dialogVisible = true;
				this.editSkuInfo.productId = row.id;
				this.editSkuInfo.productSn = row.productSn;
				this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
				this.editSkuInfo.keyword = null;
				fetchSkuStockList(row.id, {
					keyword: this.editSkuInfo.keyword
				}).then(response => {
					this.editSkuInfo.stockList = response.data;
				});
				if(row.productAttributeCategoryId != null) {
					fetchProductAttrList(row.productAttributeCategoryId, {
						type: 0
					}).then(response => {
						this.editSkuInfo.productAttr = response.data.list;
					});
				}
			},
			handleSearchEditSku() {
				fetchSkuStockList(this.editSkuInfo.productId, {
					keyword: this.editSkuInfo.keyword
				}).then(response => {
					this.editSkuInfo.stockList = response.data;
				});
			},
			handleEditSkuConfirm() {
				if(this.editSkuInfo.stockList == null || this.editSkuInfo.stockList.length <= 0) {
					this.$message({
						message: '暂无sku信息',
						type: 'warning',
						duration: 1000
					});
					return
				}
				this.$confirm('是否要进行修改', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateSkuStockList(this.editSkuInfo.productId, this.editSkuInfo.stockList).then(response => {
						this.$message({
							message: '修改成功',
							type: 'success',
							duration: 1000
						});
						this.editSkuInfo.dialogVisible = false;
					});
				});
			},
			handleSearchList() {
				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleAddProduct() {
				this.$router.push({
					path: '/pms/addProduct'
				});
			},
			handleBatchOperate() {
				if(this.operateType == null) {
					this.$message({
						message: '请选择操作类型',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if(this.multipleSelection == null || this.multipleSelection.length < 1) {
					this.$message({
						message: '请选择要操作的商品',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				this.$confirm('是否要进行该批量操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let ids = [];
					for(let i = 0; i < this.multipleSelection.length; i++) {
						ids.push(this.multipleSelection[i].id);
					}
					switch(this.operateType) {
						case this.operates[0].value:
							this.updatePublishStatus(1, ids);
							break;
						case this.operates[1].value:
							this.updatePublishStatus(0, ids);
							break;
						case this.operates[2].value:
							this.updateRecommendStatus(1, ids);
							break;
						case this.operates[3].value:
							this.updateRecommendStatus(0, ids);
							break;
						case this.operates[4].value:
							this.updateNewStatus(1, ids);
							break;
						case this.operates[5].value:
							this.updateNewStatus(0, ids);
							break;
						case this.operates[6].value:
							break;
						case this.operates[7].value:
							this.updateDeleteStatus(1, ids);
							break;
						default:
							break;
					}
					this.getList();
				});
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
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handlePublishStatusChange(index, row) {
				let ids = [];
				ids.push(row.id);
				this.updatePublishStatus(row.publishStatus, ids);
			},
			handleNewStatusChange(index, row) {
				let ids = [];
				ids.push(row.id);
				this.updateNewStatus(row.newStatus, ids);
			},
			handleRecommendStatusChange(index, row) {
				let ids = [];
				ids.push(row.id);
				this.updateRecommendStatus(row.recommandStatus, ids);
			},
			handleResetSearch() {
				this.selectProductCateValue = [];
				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleDelete(index, row) {
				this.$confirm('是否要进行删除操作?,当前商品删除后不可在现实！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let ids = [];
					ids.push(row.id);
					this.updateDeleteStatus(1, ids);
				});
			},
			handleUpdateProduct(index, row) {
				this.$router.push({
					path: '/pms/updateProduct',
					query: {
						id: row.id
					}
				});
			},
			handleShowProduct(index, row) {
				this.$router.push({
					path: '/pms/updateProduct',
					query: {
						id: row.id
					}
				});
				console.log("handleShowProduct", row);
			},
			recordAdd(form) {

				console.log(this.form)
				vertifyRecord(this.form).then(response => {
					this.$message({
						message: '审核完毕',
						type: 'success',
						duration: 1000
					});
				});
				this.$nextTick(function() {
					this.getList();
				})

				this.dialogFormVisible = false;
				//	this.$forceUpdate();

			},
			handleShowVerifyDetail(index, row) {

				console.log(this.form.productId)
				vertifyRecordById(row.id).then(response => {
					this.$nextTick(() => {
						this.form.productId = row.id
						this.form.detail = response.data.detail;
						this.form.status = response.data.status;
					})
				});

				console.log("handleShowVerifyDetail", row);
				this.dialogFormVisible = true;
			},
			handleShowLog(index, row) {
				console.log("handleShowLog", row);
			},
			updatePublishStatus(publishStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('publishStatus', publishStatus);
				updatePublishStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateNewStatus(newStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('newStatus', newStatus);
				updateNewStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateRecommendStatus(recommendStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('recommendStatus', recommendStatus);
				updateRecommendStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateDeleteStatus(deleteStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('deleteStatus', deleteStatus);
				updateDeleteStatus(params).then(response => {
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000
					});
				});
				this.getList();
			},
			//触发按钮点击下载事件
			exportData() {
				//		this.getHistoryList();
				//		this.excelData = this.historyList; //将你要导出的数组数据（historyList）赋值给excelDate
				this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {

						confirmButtonText: "确定",

						cancelButtonText: "取消",

						type: "warning"

					})

					.then(() => {
//					this.$set(this.listQuery,"type",1);
					let param = Object.assign({}, this.listQuery);
					console.log("1111111"+JSON.stringify(param));
					param.pageSize=100000;
					fetchList(param).then(response => {
						console.log("-----"+response);
					this.excelData = response.data.list;
					this.export2Excel();
				});
					}).catch(()=>{
						
					})

				

			},
			//表格数据写入excel
			export2Excel() {
				var that = this;
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require("@/assets/excel/Export2Excel");
					//这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
					const tHeader = ["编号", "商品名称", "品牌", "运费", "货号","价格","销量","审核状态",]; // 导出的excel表头名信息
					const filterVal = [
						"id",
						"name",
						"brandName",
						"freight",
						"productSn",
						"price",
						"sale",
						"verifyStatus",
					]; // 导出的excel表头字段名，需要导出表格字段名
					const list = that.excelData;
					for(let i=0;i<list.length;i++){
						let status = list[i].verifyStatus;
						if(status==1){
							list[i].verifyStatus="审核通过"
						}else{
							list[i].verifyStatus="未审核"
						}
					}
					const data = that.formatJson(filterVal, list);

					export_json_to_excel(tHeader, data, "商品列表"); // 导出的表格名称，根据需要自己命名
				});
			},
			//格式转换，直接复制即可,不需要修改什么
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j].toString()));
			}
		}
	}
</script>
<style></style>

<!--console.log("handleShowVerifyDetail", row);
				this.dialogFormVisible = true;
			},
			
			handleShowLog(index, row) {
				console.log("handleShowLog", row);
			},
			updatePublishStatus(publishStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('publishStatus', publishStatus);
				updatePublishStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateNewStatus(newStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('newStatus', newStatus);
				updateNewStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateRecommendStatus(recommendStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('recommendStatus', recommendStatus);
				updateRecommendStatus(params).then(response => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: 1000
					});
				});
			},
			updateDeleteStatus(deleteStatus, ids) {
				let params = new URLSearchParams();
				params.append('ids', ids);
				params.append('deleteStatus', deleteStatus);
				updateDeleteStatus(params).then(response => {
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000
					});
				});
				this.getList();
			}
		}
	}
</script>
<style></style>-->