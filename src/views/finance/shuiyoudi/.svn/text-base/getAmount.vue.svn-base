<template>
	<div class="app-container">
		<div class="table-container ">
			<el-table :data="list" v-loading="listLoading " border>
				<!--<el-table-column label="商户号" align="center ">
					<template slot-scope="scope ">{{scope.row.corpId}}</template>
				</el-table-column>

				<el-table-column label="商户名称 " align="center ">
					<template slot-scope="scope ">{{scope.row.corpName}}</template>
				</el-table-column>-->

				<el-table-column label="余额" align="center ">
					<template slot-scope="scope ">{{scope.row.price}}</template>
				</el-table-column>

			</el-table>
		</div>

	</div>
</template>
<script>
	import { getAmount } from '@/api/FinanceKuaiShang';

	export default {
		data() {
			return {
				list: [],
				listLoading: false,
			}
		},
		mounted() {
			this.getList();
		},
		methods: {

			getList() {
				this.listLoading = true;
				getAmount().then(response => {

					this.listLoading = false;
					let obj = response.data
					if(obj) {
						let num = Math.round((obj / 100 + Number.EPSILON) * 100) / 100;
						console.log(num);
						let balance = {
							price: 0
						}
						balance.price = num;
						let arr = [];
						arr.push(balance);
						this.list = [...arr];
					}

				})
			}

		}
	}
</script>
<style scoped>
	.input-width {
		width: 203px;
	}
</style>