<template>
	<div class="app-container">
		<div>
			<div>
				<!--<i class="el-icon-search"></i>
        <span>筛选搜索</span>-->

				<el-select v-model="listQuery.sort" placeholder="排序" clearable class="input-width">
					<el-option v-for="item in typeOptions1" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="listQuery.grade" placeholder="等级" clearable class="input-width">
					<el-option v-for="item in levelList" :key="item.id" :label="item.levelName" :value="item.id">
					</el-option>
				</el-select>
				<el-select v-model="listQuery.pro" placeholder="请选择商品" clearable class="input-width">
					<el-option v-for="item in typeOptions2" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input placeholder="请输入用户id" v-model="listQuery.id" style="width:200px">
				</el-input>
				<el-date-picker v-model="listQuery.time" type="date" placeholder="支付时间">
				</el-date-picker>
				<el-button type="success" style="float: right;margin-left: 10px;" @click="exportExcel">导出</el-button>
				<el-button type="primary" style="float: right;" @click="handleSearchList()">搜索</el-button>

				<!--<el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>-->
			</div>
			<!--<div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="优惠券名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="优惠券名称"></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>-->
		</div>
		<!--<el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>-->
		<div class="table-container">
			<el-table ref="couponTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border id="out-table">
				<!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
				<el-table-column prop="date" label="排行" width="100" align="center">
					<template slot-scope="scope">{{scope.row.rankNo}}</template>
				</el-table-column>
				<el-table-column prop="name" label="id" width="100" align="center">
					<template slot-scope="scope">{{scope.row.id}}</template>
				</el-table-column>
				<el-table-column prop="address" label="粉丝" width="150" align="center">
					<template slot-scope="scope">{{scope.row.couponType | formatType}}</template>
				</el-table-column>
				<el-table-column label="姓名" width="110" align="center">
					<template slot-scope="scope">{{scope.row.userName}}</template>
				</el-table-column>
				<el-table-column label="手机号" width="140" align="center">
					<template slot-scope="scope">{{scope.row.phone}}</template>
				</el-table-column>
				<el-table-column label="等级" width="100" align="center">
					<template slot-scope="scope">{{scope.row.levelName}}</template>
				</el-table-column>
				<el-table-column label="团队业绩" width="100" align="center">
					<template slot-scope="scope">{{scope.row.teamAmount == null ? 0 : scope.row.teamAmount}}</template>
				</el-table-column>
				<el-table-column label="团队销售商品总件数" width="180" align="center">
					<template slot-scope="scope">{{scope.row.num}}</template>
				</el-table-column>
				<el-table-column label="个人业绩" align="center">
					<template slot-scope="scope">{{scope.row.performance}}</template>
				</el-table-column>

			</el-table>
		</div>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	import { getLevel, getAchievementList } from '@/api/retailerLevel';
	import { formatDate } from '@/utils/date';
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		id: null,
		sort: null,
		pro: null,
		grade: null,
		time: null
	};
	const defaultTypeOptions = [{
			label: '折扣券',
			value: 0
		},
		{
			label: '满减券',
			value: 1
		}
	];
	const defaultTypeOptions1 = [{
			label: '升序',
			value: "asc"
		},
		{
			label: '降序',
			value: "desc"
		}
		
	];
	const defaultTypeOptions2 = [{
			label: '商品1',
			value: 0
		},
		{
			label: '商品2',
			value: 1
		},
		{
			label: '商品3',
			value: 2
		}
	];

	export default {
		name: 'couponList',
		data() {
			return {
				listQuery: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				typeOptions1: Object.assign({}, defaultTypeOptions1),
				typeOptions2: Object.assign({}, defaultTypeOptions2),
				list: null,
				levelList: [],
				total: null,
				input3: null,
				listLoading: false,
				multipleSelection: [],
				tableData: [{
						date: "2016-05-02",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1517 弄"
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1519 弄"
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1516 弄"
					}
				]
			}
		},
		created() {
			this.getList();
			this.getLevel();
		},
		filters: {
			formatType(type) {
				for(let i = 0; i < defaultTypeOptions.length; i++) {
					if(type == defaultTypeOptions[i].value) {
						return defaultTypeOptions[i].label;
					}
				}
				return '';
			},
			formatType1(type) {
				for(let i = 0; i < defaultTypeOptions1.length; i++) {
					if(type === defaultTypeOptions1[i].value) {
						return defaultTypeOptions1[i].label;
					}
				}
				return '';
			},
			formatUseType(useType) {
				if(useType === 0) {
					return '全场通用';
				} else if(useType === 1) {
					return '指定分类';
				} else {
					return '指定商品';
				}
			},
			formatPlatform(platform) {
				if(platform === 1) {
					return '移动平台';
				} else if(platform === 2) {
					return 'PC平台';
				} else {
					return '全平台';
				}
			},
			formatDate(time) {
				if(time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd')
			},
			formatStatus(endTime) {
				let now = new Date().getTime();
				let endDate = new Date(endTime);
				if(endDate > now) {
					return '未过期'
				} else {
					return '已过期';
				}
			}
		},
		methods: {
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
			handleSizeChange(val) {
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.listQuery.pageNum = val;
				this.getList();
			},
			handleAdd() {
				this.$router.push({
					path: '/sms/addCoupon1'
				})
			},
			handleAdd1() {
				this.$router.push({
					path: '/sms/addCoupon3'
				})
			},
			handleView(index, row) {
				this.$router.push({
					path: '/sms/couponHistory',
					query: {
						id: row.id
					}
				})
			},
			handleUpdate(index, row) {
				this.$router.push({
					path: '/sms/updateCoupon1',
					query: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('是否进行删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteCoupon(row.id).then(response => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList();
					});
				})
			},
			getList() {
				this.listLoading = true;
				getAchievementList(this.listQuery).then(response => {
					this.listLoading = false;
					this.list = response.data.list;
					console.log(this.list)
					this.total = response.data.total;
				});
			},
			getLevel() {
				getLevel().then(response => {

					this.levelList = response.data;

				});
			},

			//定义导出Excel表格事件
			exportExcel() {
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
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
							type: "application/octet-stream"
						}),
						//设置导出文件名称
						"performance.xlsx"
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
		width: 150px;
	}
	
	.layout-title {
		color: #606266;
		padding: 15px 20px;
		background: #F2F6FC;
		font-weight: bold;
		border: 5px;
	}
	
	.un-handle-layout {
		margin-top: 50px;
		border: 0px solid #DCDFE6;
		width: 1150px;
	}
	
	div>div>span {
		position: relative;
		margin-right: 65px;
	}
</style>