<template>
	<div class="mod-transport">
		<div class="el-row" style="margin-left: -10px; margin-right: -10px;">
			<div class="el-col el-col-24 el-col-xs-24 el-col-md-6" style="padding-left: 10px; padding-right: 10px;">
				<div class="el-form-item">
					<label for="addrName" class="el-form-item__label" style="width: 80px;">模板名称:</label>
					<div class="el-form-item__content" style="margin-left: 80px;">
								<el-input v-model="page.transName"  type="text" autocomplete="off" placeholder="模板名称" ></el-input>
					</div>
				</div>
			</div>
			<div class="el-col el-col-24 el-col-xs-24 el-col-md-6" style="padding-left: 10px; padding-right: 10px;">
				<div class="el-form-item">
					<div class="el-form-item__content" style="margin-left: 0px;">
						<div class="avue-crud-search__menu">
							<button type="button" class="el-button el-button--primary el-button--small" @click.stop="selectList()" > <!----><i class="el-icon-search"></i><span>搜 索
              </span></button>
              <button type="button" class="el-button el-button--default el-button--small"><i class="el-icon-delete" @click.stop="selectClear()"></i><span>清 空
              </span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<avue-crud ref="crud"  :option="tableOption"  :data="dataList"  @search-change="searchChange" @on-load="getDataList">
<!--:page="page" -->
			<template slot="menuLeft">
				<el-button type="primary" icon="el-icon-plus" size="small" @click.stop="addOrUpdateHandle()">新增</el-button>
			</template>

			<template slot-scope="scope" slot="menu">
				<el-button type="primary" icon="el-icon-edit" size="small" @click.stop="addOrUpdateHandle(scope.row.transportId)">修改</el-button>

				<el-button type="danger" icon="el-icon-delete" size="small" @click.stop="deleteHandle(scope.row.transportId)">删除</el-button>
			</template>
		</avue-crud>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="page.pageSize" :page-sizes="[20,50,100]" :current-page.sync="page.currentPage" :total="page.total">
			</el-pagination>
		</div>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script>
	import { fetchList, deletetransport ,test,fors} from '@/api/transport';

	import { umsAdminList, updateStatus, deleteAdminSelectAll } from '@/api/homeAdvertise';

	export const tableOption = {
		page:false,
		border: true,
		index: false,
		//election: true,
		indexLabel: '序号',
		stripe: true,
		menuAlign: 'center',
		menuWidth: 350,
		align: 'center',
		refreshBtn: false,
		searchSize: 'mini',
		addBtn: false,
		editBtn: false,
		delBtn: false,
		viewBtn: false,
		props: {
			label: 'label',
			value: 'value'
		},
		column: [{
			label: '模板名称',
			prop: 'transName',
			search: false
		}]
	}
	import AddOrUpdate from './transport-add-or-update'
	export default {
		data() {
			return {
				dataForm: {
					transName: ''
				},
				dataList: [],
				dataListLoading: false,
				dataListSelections: [],
				addOrUpdateVisible: false,
				page: {
					pageNum: 1, // 总页数
					total: 1, // 当前页数
					pageSize: 20, // 每页显示多少条
					transName: ''
				},
				tableOption: tableOption
			}
		},
		components: {
			AddOrUpdate
		},
		created() {
			this.getDataList(this.page);
			
//			test().then(response => { 
//						console.log(response.data)
//					})
//			
//			fors().then(response => {
//					console.log(response.data)
//				})
		},
		mounted() {
			let dom1 = document.querySelector(".avue-crud__pagination");
			dom1.parentNode.removeChild(dom1);
		},
		methods: {
			
			getDataList(val) {
				this.dataListLoading = true;
				fetchList(this.page).then(response => {
					this.dataList = response.data.list;
					this.pageNum = response.data.pageNum;
					this.page.total = response.data.total;

					this.dataListLoading = false;
				})

			},
			handleSizeChange(val) {
				this.page.pageNum = 1;
				this.page.pageSize = val;
				this.getDataList();
			},
			handleCurrentChange(val) {
				this.page.pageNum = val;
				fetchList(this.page).then(response => {
					this.dataList = response.data.list;
					this.pageNum = response.data.pageNum;
					this.page.total = response.data.total;
				})
			},
			//			getDataList(page, params) {
			//				this.dataListLoading = true
			//				this.$http({
			//					url: this.$http.adornUrl('/shop/transport/page'),
			//					method: 'get',
			//					params: this.$http.adornParams(
			//						Object.assign({
			//								current: page == null ? this.page.currentPage : page.currentPage,
			//								size: page == null ? this.page.pageSize : page.pageSize
			//							},
			//							params
			//						)
			//					)
			//				}).then(({
			//					data
			//				}) => {
			//					this.dataList = data.records
			//					this.page.total = data.total
			//					this.dataListLoading = false
			//				})
			//			},
			// 新增 / 修改
			addOrUpdateHandle(id) {
				console.log(id)
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
					this.$refs.addOrUpdate.init(id)
				})
			},
			// 删除
			deleteHandle(id) {
				var ids = id ? [id] :
					this.dataListSelections.map(item => {
						return item.transportId
					})
				this.$confirm(
					`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
					'提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
				).then(() => {
					deletetransport(ids).then(response => {
						this.listLoading = false;
						this.dataList = response.data.list;
						this.page.total = response.data.total;
					})
					this.$message({
						message: '操作成功',
						type: 'success',
						duration: 1500,
						onClose: () => {
							this.getDataList(this.page)
						}
					})
				}).catch(() => {});

				//						this.$http({
				//							url: this.$http.adornUrl('/shop/transport'),
				//							method: 'delete',
				//							data: this.$http.adornData(ids, false)
				//						}).then(({
				//							data
				//						}) => {
				//							this.$message({
				//								message: '操作成功',
				//								type: 'success',
				//								duration: 1500,
				//								onClose: () => {
				//									this.getDataList(this.page)
				//								}
				//							})
				//						})
				//					})
				//					.catch(() => {})
			},

			// 条件查询
			searchChange(params) {
				
				this.page.transName = params.transName
				this.getDataList(params)
			},

			// 多选变化
			selectionChange(val) {
				this.dataListSelections = val
			},
			selectList(params) {
				this.page.pageNum = 1;
				this.getDataList(params)
			},
			selectClear(params) {
				this.page.pageNum = 1;
				this.page.transName = "";
				this.getDataList(params)
			},
		}
	}
</script>