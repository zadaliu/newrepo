<template>
	<div class="app-container">
		<el-card class="operate-container" shadow="never">
			<i class="el-icon-tickets"></i>
			<span>发货列表</span>
		</el-card>
		<div class="table-container">
			<el-table ref="deliverOrderTable" style="width: 100%;" :data="list" border>
				<el-table-column label="订单编号" width="180" align="center">
					<template slot-scope="scope">{{scope.row.orderSn}}</template>
				</el-table-column>
				<el-table-column label="子订单编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.itemOrderCode}}</template>
        </el-table-column>
				<el-table-column label="收货人" width="180" align="center">
					<template slot-scope="scope">{{scope.row.receiverName}}</template>
				</el-table-column>
				<el-table-column label="手机号码" width="160" align="center">
					<template slot-scope="scope">{{scope.row.receiverPhone}}</template>
				</el-table-column>
				<el-table-column label="邮政编码" width="160" align="center">
					<template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
				</el-table-column>
				<el-table-column label="收货地址" align="center" v-show="false">
					<template slot-scope="scope">{{scope.row.address}}</template>
				</el-table-column>

				<el-table-column label="配送公司" width="160" align="center">
					<template slot-scope="scope">
						<el-select placeholder="请选择物流公司" @change="handleGroupChange" v-model="scope.row.deliveryCompany" size="small">
							<el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>

				<!--<el-table-column label="配送公司" width="160" align="center">
					<template slot-scope="scope">
						<template slot-scope="scope">{{scope.row.deliveryName}}</template>
					</template>
				</el-table-column>-->

				<el-table-column label="物流单号" width="180" align="center">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.deliverySn"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 15px;text-align: center">
				<el-button @click="cancel">取消</el-button>
				<el-button @click="confirm" type="primary">确定</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { deliveryOrder, logisticList,getOrderCofrim } from '@/api/order'
	const defaultLogisticsCompanies = ["顺丰快递", "圆通快递", "中通快递", "韵达快递"];
	export default {
		name: 'deliverOrderList',
		data() {
			return {
				deliveryName : '',
				deliveryCompany : '',
				groupOptions: [],
				groupName: '',
				list: [],
				companyOptions: defaultLogisticsCompanies
			}
		},
		created() {
			getOrderCofrim(this.$route.query.list).then(response => {
            this.$message({
              message: '分配成功！',
              type: 'success'
            });
            this.list = response.data;
         });
			this.list = this.$route.query.list;
			console.log(this.list)
			this.getGroupList();
		},
		methods: {
			getGroupList() {
				logisticList({
					isStatic: 1,
					pageNum: 1,
					pageSize: 100
				}).then(response => {
					this.groupOptions = [];
					let groupList = response.data.list;
					for(let i = 0; i < groupList.length; i++) {
						this.groupOptions.push({
							label: groupList[i].name,
							value: groupList[i].code
						});
					}
				});
			},
			handleGroupChange(val) {
				console.log(val)
				let groupName = '';
				let code = '';
				for(let i = 0; i < this.groupOptions.length; i++) {
					if(this.groupOptions[i].value === val) {
						groupName = this.groupOptions[i].label;
						code = this.groupOptions[i].value;
						break;
					}
				}
				this.deliveryName = groupName;
				this.deliveryCompany = code;
			},
			cancel() {
				this.$router.back();
			},
			confirm() {
				this.$confirm('是否要进行发货操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					for(let i = 0; i < this.list.length; i++) {
							this.$set(this.list[i], 'deliveryName', this.deliveryName)
              this.$set(this.list[i], 'deliveryCompany', this.deliveryCompany)
					}
					        deliveryOrder(this.list).then(response=>{
					          this.$router.back();
					          this.$message({
					            type: 'success',
					            message: '发货成功!'
					          });
					        });
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消发货'
					});
				});
			}
		}
	}
</script>
<style></style>