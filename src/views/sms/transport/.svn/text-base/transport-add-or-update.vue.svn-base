<template>
	<el-dialog :title="!dataForm.transportId ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible" width="1400px">
		<el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
			<el-form-item label="模板名称" prop="transName" :rules="[{ required: true, message: '模板名称不能为空'}]">
				<el-input v-model="dataForm.transName" placeholder="模板名称"></el-input>
			</el-form-item>
			<el-form-item label="模板类型" prop="isFreeFee" required="required">
				<template>
					<el-radio-group v-model="dataForm.isFreeFee" @change="changeFreeFee">
						<el-radio :label="0">买家承担运费</el-radio>
						<el-radio :label="1">统一运费</el-radio>
					</el-radio-group>
				</template>
			</el-form-item>

			<el-form-item label="运费金额" v-show="!show">
				<template>
					<el-input type="number" v-model="dataForm.useMoney"></el-input>
				</template>
			</el-form-item>

			<el-form-item label="收费方式" prop="chargeType">
				<template>
					<el-radio-group v-model="dataForm.chargeType" :disabled="dataForm.isFreeFee == 1">
						<el-radio :label="0">按件数</el-radio>
						<el-radio :label="1">按重量</el-radio>
						<!--<el-radio :label="2">按体积</el-radio>-->
					</el-radio-group>
				</template>
			</el-form-item>
			<el-table :data="dataForm.transfees" v-show="show" border style="width: 100%;">
				<el-table-column header-align="center" align="center" width="450" label="可配送区域">
					<template slot-scope="scope">
						<span v-if="scope.$index == 0">所有地区</span>
						<span v-if="(!scope.row.cityList || !scope.row.cityList.length) && scope.$index > 0">请选择可配送区域</span>
						<span v-if="scope.$index > 0">
              <el-tag v-for="city in scope.row.cityList"
                    :key="city.areaId"
                    >{{city.areaName}}</el-tag>
            </span>
						<el-button type="text" v-if=" scope.$index > 0" size="small" @click="addOrUpdateHandle(`${scope.$index}`)">编辑</el-button>
						<el-button type="text" v-if=" scope.$index > 0" size="small" @click="deleteHandle(`${scope.$index}`)">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="center" width="180" :label="tableTitle[0]">
					<template slot-scope="scope">
						<el-form-item :prop="`transfees.${scope.$index}.firstPiece`" label-width="0px" :rules="[{ required: true, message: `${tableTitle[0]}不能为空`}]">
							<el-input type="number" v-model="scope.row.firstPiece" :disabled="!scope.row.status && scope.$index === 0"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="center" :label="tableTitle[1]">
					<template slot-scope="scope">
						<el-form-item :prop="`transfees.${scope.$index}.firstFee`" label-width="0px" :rules="[{ required: true, message: `${tableTitle[1]}不能为空`}]">
							<el-input type="number" v-model="scope.row.firstFee" :disabled="!scope.row.status && scope.$index === 0"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="center" :label="tableTitle[2]">
					<template slot-scope="scope">
						<el-form-item :prop="`transfees.${scope.$index}.continuousPiece`" label-width="0px" :rules="[{ required: true, message: `${tableTitle[2]}不能为空`}]">
							<el-input type="number" v-model="scope.row.continuousPiece" :disabled="!scope.row.status && scope.$index === 0"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="center" :label="tableTitle[3]">
					<template slot-scope="scope">
						<el-form-item :prop="`transfees.${scope.$index}.continuousFee`" label-width="0px" :rules="[{ required: true, message: `${tableTitle[3]}不能为空`}]">
							<el-input type="number" v-model="scope.row.continuousFee" :disabled="!scope.row.status && scope.$index === 0"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px" v-if="dataForm.isFreeFee == 0">
				<el-button type="primary" icon="el-icon-location-outline" @click="addTransfee()">点击添加可配送的区域和运费</el-button>
			</div>
			<!--<el-checkbox v-model="dataForm.hasFreeCondition" v-if="!dataForm.isFreeFee" style="margin-top:10px;font-size:50px">指定条件包邮</el-checkbox>-->
			<el-table v-if="dataForm.hasFreeCondition && !dataForm.isFreeFee" :data="dataForm.transfeeFrees" border style="width: 100%;">
				<el-table-column header-align="center" align="center" width="350" label="指定区域">
					<template slot-scope="scope">
						<span v-if="!scope.row.freeCityList || !scope.row.freeCityList.length">请选择指定包邮城市</span>
						<el-tag v-for="city in scope.row.freeCityList" :key="city.areaId">{{city.areaName}}</el-tag>
						<el-button type="text" v-if=" scope.$index > 0" size="small" @click="addOrUpdateTransfeeFree(`${scope.$index}`)">编辑</el-button>
						<el-button type="text" v-if=" scope.$index > 0" size="small" @click="deleteTransfeeFree(`${scope.$index}`)">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="center" width="600" label="设置包邮条件">
					<template slot-scope="scope">
						<el-radio-group v-model="scope.row.freeType">
							<el-radio :label="0">满件/重量/体积包邮</el-radio>
							<el-radio :label="1">满金额包邮</el-radio>
							<el-radio :label="2">满件/重量/体积且满金额包邮</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column header-align="center" align="left">
					<template slot-scope="scope">
						<el-form-item :prop="`transfeeFrees.${scope.$index}.amount`" v-if="scope.row.freeType == 1 || scope.row.freeType == 2" label-width="0px" :rules="[{ required: true, message: `不能为空`}]">
							满
							<el-input style="width:100px" v-model="scope.row.amount"></el-input> 元包邮
						</el-form-item>
						<el-form-item :prop="`transfeeFrees.${scope.$index}.piece`" v-if="scope.row.freeType == 0 || scope.row.freeType == 2" label-width="0px" :rules="[{ required: true, message: `不能为空`}]">
							满
							<el-input style="width:100px" v-model="scope.row.piece"></el-input> 件/重量/体积包邮
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<!--<el-button type="primary" icon="el-icon-location-outline" @click="addTransfeeFree()">点击添加指定包邮条件</el-button>-->
				<el-form-item label="包邮规则">
					<el-checkbox v-model="dataForm.ruleStatus"></el-checkbox>付款满&nbsp;&nbsp;&nbsp;
					<el-input v-model="dataForm.rulsMoney" style="width: 200px;" placeholder="请输入付款金额"></el-input>&nbsp;&nbsp;&nbsp; 包邮
				</el-form-item>
			</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</el-dialog>
</template>

<script>
	import { createtransport, transportInfo, updatetransport } from '@/api/transport';

	import AddOrUpdate from './transcity-add-or-update'
	export default {
		data() {
			return {
				num: 0,
				onpresscTime: 0, //  阻止短时间内连续点击
				show: true,
				hasFreeCondition: 0,
				visible: false,
				addOrUpdateVisible: false,
				dataForm: {
					hasFreeCondition: false,
					transName: '',
					createTime: '',
					chargeType: 0,
					transportId: 0,
					isFreeFee: 0,
					ruleStatus: false,
					rulsMoney: 0,
					useMoney: 0,
					transfees: [{
						cityList: [],
						status: 1
					}],
					transfeeFrees: [{
						freeCityList: []
					}]
				},
				formadd: {
					shopId: "1",
					transportId: "",
					transName: "",
					chargeType: "",
					isFreeFee: "",
					transfees: "",
					transfeeFrees: "",
					hasFreeCondition: "",
					ruleStatus: false,
					rulsMoney: 0,
					useMoney: "0"
				},
				page: {
					total: 0, // 总页数
					currentPage: 1, // 当前页数
					pageSize: 10 // 每页显示多少条
				},
				editVisible: false
			}
		},
		components: {
			AddOrUpdate
		},
		watch: {
			// 如果当前对话框不可见，则关闭选择城市的对话框
			visible: function(val) {
				if(!val) {
					this.addOrUpdateVisible = false
				}
			}
		},
		computed: {
			tableTitle() {
				var titles = [
					['首件(个)', '运费(元)', '续件(个)', '续费(元)'],
					['首重(kg)', '运费(元)', '续重(kg)', '续费(元)'],
					['首体积(m³)', '运费(元)', '续体积(m³)', '续费(元)']
				]
				if(this.dataForm.chargeType) {
					return titles[this.dataForm.chargeType]
				}
				return titles[0]
			}
		},
		methods: {

			init(id) {
				this.visible = true
				this.dataForm.transportId = id || 0
				this.$nextTick(() => {
					this.$refs.dataForm.resetFields()
					this.dataForm = {
						hasFreeCondition: false,
						transName: '',
						createTime: '',
						chargeType: 0,
						transportId: 0,
						isFreeFee: 0,
						ruleStatus: false,
						rulsMoney: 0,
						transfees: [{
							cityList: [],
							status: 1
						}],
						transfeeFrees: [{
							freeCityList: []
						}]
					}
				})
				console.log(this.dataForm.isFreeFee)
				console.log(this.dataForm.transportId)
				if(this.dataForm.transportId) {

					transportInfo(this.dataForm.transportId).then(response => {
						if(response.data.isFreeFee) {
							response.data.transfees[0].status = 0
						} else {
							response.data.transfees[0].status = 1
						}
						this.$nextTick(() => {
							this.dataForm = response.data;
						})
						//						this.dataForm.hasFreeCondition = !!response.data.hasFreeCondition
						//						console.log(this.dataForm.hasFreeCondition)
					})

					//					this.$http({
					//						// 获取运费模板数据
					//						url: this.$http.adornUrl(`/shop/transport/info/${this.dataForm.transportId}`),
					//						method: 'get'
					//					}).then(({
					//						data
					//					}) => {
					//						if(data.isFreeFee) {
					//							data.transfees[0].status = 0
					//						} else {
					//							data.transfees[0].status = 1
					//						}
					//						this.dataForm = data
					//						this.dataForm.hasFreeCondition = !!data.hasFreeCondition
					//					})
				}
			},
			getDataList(row, cityList, type) {
				if(type === 0) {
					this.$set(this.dataForm.transfees[row], 'cityList', cityList)
				}
				if(type === 1) {
					this.$set(this.dataForm.transfeeFrees[row], 'freeCityList', cityList)
				}
			},
			// 添加运费项
			addTransfee() {
				this.editVisible = true
				this.dataForm.transfees.push({
					cityList: [],
					status: 1
				})
			},
			// 删除运费项
			deleteHandle(rowIndex) {
				this.dataForm.transfees.splice(rowIndex, 1)
			},
			// 可配送区域和运费编辑
			addOrUpdateHandle(rowIndex) {
				console.log(rowIndex)
				this.addOrUpdateVisible = true
				let allSelectCityList = []
				for(let i = 1; i < this.dataForm.transfees.length; i++) {
					const cityList = this.dataForm.transfees[i].cityList
					allSelectCityList = allSelectCityList.concat(cityList)
				}
				this.$nextTick(() => {
					this.$refs.addOrUpdate.init(rowIndex, this.dataForm.transfees[rowIndex].cityList || [], allSelectCityList, 0)
				})
			},
			// 添加指定包邮条件
			addTransfeeFree() {
				this.dataForm.transfeeFrees.push({
					freeCityList: []
				})
			},
			// 删除指定包邮条件
			deleteTransfeeFree(rowIndex) {
				this.dataForm.transfeeFrees.splice(rowIndex, 1)
			},
			// 指定包邮条件编辑
			addOrUpdateTransfeeFree(rowIndex) {
				this.addOrUpdateVisible = true
				let allSelectCityList = []
				if(this.dataForm.transfeeFrees.length === 0) {
					this.$message({
						message: '请选择指定包邮条件',
						type: 'error',
						duration: 1500
					})
					return
				}
				for(let i = 1; i < this.dataForm.transfeeFrees.length; i++) {
					const freeCityList = this.dataForm.transfeeFrees[i].freeCityList
					allSelectCityList = allSelectCityList.concat(freeCityList)
				}
				this.$nextTick(() => {
					this.$refs.addOrUpdate.init(rowIndex, this.dataForm.transfeeFrees[rowIndex].freeCityList || [], allSelectCityList, 1)
				})
			},
			// 改变模板类型， 0 买家承担运费 1 卖家包邮
			changeFreeFee(val) {
				console.log(val)
				this.show = true
				this.dataForm.hasFreeCondition = false
				if(val) {
					console.log(val)
					this.show = false,
						this.dataForm.chargeType = 0
					this.dataForm.transfees = [{
						cityList: [],
						status: 0,
						firstPiece: 1,
						firstFee: 0,
						continuousPiece: 1,
						continuousFee: 0
					}]
				} else {
					this.dataForm.transfees = [{
						cityList: [],
						status: 1
					}]
				}
			},
			// 表单提交
			dataFormSubmit() {
				//  两秒后再执行
				//  当前时间和上次点击的时候进行对比，大于2000微秒才执行
				if((Date.now() - this.onpresscTime) > 2000) {
					this.onpresscTime = Date.now()
					this.num += 1
					console.log(this.num)

					console.log(this.onpresscTime)

				} else {
					this.$message({
						message: '操作过于频繁',
						type: 'error',
						duration: 1500
					})
					return;
				}
				if(this.num > 1) {
					console.log(this.num)
					return;
				}
				this.$refs['dataForm'].validate((valid) => {
					let sum = 0;
					if(valid) {
						for(let i = 1; i < this.dataForm.transfees.length; i++) {
							const transfee = this.dataForm.transfees[i]
							if(transfee.cityList.length === 0) {
								this.$message({
									message: '请选择可配送区域',
									type: 'error',
									duration: 1500
								})
								return
							}
						}
						if(this.dataForm.hasFreeCondition) {
							this.hasFreeCondition = 1
						} else {
							this.hasFreeCondition = 0
						}
						this.dataForm.transfees[0].cityList = []
						sum = sum + 1;
						console.log(sum)
						if(sum > 2) {
							this.$message({
								message: '请求过于频繁',
								type: 'success',
								duration: 1000
							});
							return
						}
						if(!this.dataForm.transportId) {
							this.formadd.transportId = this.dataForm.transportId || undefined,
								this.formadd.transName = this.dataForm.transName,
								this.formadd.chargeType = this.dataForm.chargeType,
								this.formadd.isFreeFee = this.dataForm.isFreeFee,
								this.formadd.transfees = this.dataForm.transfees,
								this.formadd.transfeeFrees = this.dataForm.transfeeFrees,
								this.formadd.hasFreeCondition = this.hasFreeCondition,
								this.formadd.ruleStatus = this.dataForm.ruleStatus,
								this.formadd.rulsMoney = this.dataForm.rulsMoney == null ? "0" : this.dataForm.rulsMoney,
								this.formadd.useMoney = this.dataForm.useMoney
							console.log(this.formadd)
							createtransport(this.formadd).then(response => {
								this.$message({
									message: '提交成功',
									type: 'success',
									duration: 1000
								});
								//			
								this.$emit('refreshDataList', this.page)
								this.$router.go(0);
							});
						} else {
							this.formadd.transportId = this.dataForm.transportId || undefined,
								this.formadd.transName = this.dataForm.transName,
								this.formadd.chargeType = this.dataForm.chargeType,
								this.formadd.isFreeFee = this.dataForm.isFreeFee,
								this.formadd.transfees = this.dataForm.transfees,
								this.formadd.transfeeFrees = this.dataForm.transfeeFrees,
								this.formadd.hasFreeCondition = this.hasFreeCondition,
								this.formadd.ruleStatus = this.dataForm.ruleStatus,
								this.formadd.rulsMoney = this.dataForm.rulsMoney == null ? "0" : this.dataForm.rulsMoney,
								this.formadd.useMoney = this.dataForm.useMoney
							console.log(this.formadd)
														updatetransport(this.formadd).then(response => {
															console.log(this.formadd)
															this.$message({
																message: '修改成功',
																type: 'success',
																duration: 1000
															});
															this.$router.go(0);
															//								this.$emit('refreshDataList', this.page)
														});
						}

						//        this.$http({
						//          url: this.$http.adornUrl(`/shop/transport`),
						//          method: this.dataForm.transportId ? 'put' : 'post',
						//          data: this.$http.adornData({
						//            'transportId': this.dataForm.transportId || undefined,
						//            'transName': this.dataForm.transName,
						//            'chargeType': this.dataForm.chargeType,
						//            'isFreeFee': this.dataForm.isFreeFee,
						//            'transfees': this.dataForm.transfees,
						//            'transfeeFrees': this.dataForm.transfeeFrees,
						//            'hasFreeCondition': this.hasFreeCondition
						//          })
						//        }).then(({ data }) => {
						//          this.$message({
						//            message: '操作成功',
						//            type: 'success',
						//            duration: 1500,
						//            onClose: () => {
						//              this.visible = false
						//              this.$emit('refreshDataList', this.page)
						//            }
						//          })
						//        })
					}
				})
			}
		}
	}
</script>