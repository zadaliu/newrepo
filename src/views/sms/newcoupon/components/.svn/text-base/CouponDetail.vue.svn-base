<template>
	<el-card class="form-container" shadow="never">
		<el-form :model="coupon" :rules="rules" ref="couponFrom" label-width="150px" size="small">
			<el-form-item label="优惠券名称" prop="couponName">
				<el-input v-model="coupon.couponName" class="input-width"></el-input>
			</el-form-item>
			<el-form-item label="优惠券礼包组" prop="couponGiftBagId">
				<el-select v-model="coupon.couponGiftBagId">
					<el-option v-for="type in bags" :key="type.id" :label="type.groupName" :value="type.id">
					</el-option>
				</el-select>
			</el-form-item>

			<!--<el-form-item label="适用平台：">
        <el-select v-model="coupon.platform">
          <el-option
            v-for="item in platformOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->

			<el-form-item label="发放总量" prop="count">
				<el-input v-model.number="coupon.count" placeholder="只能输入正整数" class="input-width"></el-input>
			</el-form-item>

			<el-form-item label="每人限领" prop="limitNumber">
				<el-input v-model.number="coupon.limitNumber" placeholder="只能输入正整数" class="input-width"></el-input>
			</el-form-item>

			<!--<el-form-item label="适用商品" prop="publishCount">
      	<el-radio v-model="radio0" label="1">全部商品</el-radio>
      	<br />
      	<el-radio v-model="radio0" label="2">指定商品</el-radio>-->
			<el-form-item label="适用商品">
				<el-radio-group v-model="coupon.commonType">
					<el-radio-button :label="0">全部商品</el-radio-button>
					<el-radio-button :label="1">指定商品</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-show="coupon.commonType==1">
				<el-button type="text" @click="dialog">选择指定商品</el-button>

				<el-table :data="tableData1" style="width: 70%">
					<el-table-column property="productId" v-if="show" label="id" width="150"></el-table-column>

					<el-table-column prop="productName" label="商品名称" width="180">
					</el-table-column>
					<el-table-column prop="price" label="价格" width="180">
					</el-table-column>

				</el-table>
			</el-form-item>
			<el-form-item label="使用门槛">

				<!--<el-radio-group v-model="coupon.text1" @change="changeHandler">
					<el-radio class="radio" label="0">无门槛</el-radio>
					<el-radio class="radio" label="1">订单满</el-radio>
				</el-radio-group>-->
				<el-radio class="radio" v-model="text1" :label="0">无门槛</el-radio>
				<br />
				<el-radio class="radio" v-model="text1" :label="1">订单满</el-radio>
				<el-input type="text" v-model="coupon.minPoint" placeholder="请输入金额" style="width:100px"></el-input>元
			</el-form-item>
			<el-form-item v-show="coupon.couponType==0" label="优惠内容" prop="couponAmountDiscount">
				<el-radio v-model="coupon.text2" label="0">打</el-radio>
				<el-input v-model="coupon.couponAmountDiscount" placeholder="请输入金额" style="width:100px"></el-input>折
				<br />最多优惠
				<el-input v-model="coupon.lowerTax" placeholder="请输入金额" style="width:100px"></el-input>元
			</el-form-item>
			<el-form-item v-show="coupon.couponType==1" label="优惠内容" prop="couponAmountDiscount">
				<el-radio v-model="coupon.text3" label="0">减免
					<el-input v-model="coupon.couponAmountDiscount" placeholder="请输入金额" style="width:100px"></el-input>元
				</el-radio>
			</el-form-item>
			<el-form-item label="用券时间">
				<el-date-picker type="date"  placeholder="选择日期" v-model="coupon.startTime" style="width: 150px"></el-date-picker>
				<span style="margin-left: 20px;margin-right: 20px">至</span>
				<el-date-picker type="date"  placeholder="选择日期" v-model="coupon.endTime" style="width: 150px"></el-date-picker>
			</el-form-item>
			<el-form-item label="可用时间">
				<el-radio v-model="radio2" label="1">领券当日起
					<el-input  v-model="coupon.uptimeToday" placeholder="请输入金额" style="width:100px"></el-input>
					天内可用
				</el-radio>
				<br />
				<el-radio v-model="radio2" label="2">领券次日起
					<el-input  v-model="coupon.uptimeTomorrow" placeholder="请输入金额" style="width:100px"></el-input>
					天内可用
				</el-radio>
			</el-form-item>
			<!--<el-form-item label="领取限制" prop="publishCount">
      	<el-radio v-model="radio3" label="1">不限制,所有人可领取</el-radio>
      	<br />
      	<el-radio v-model="radio3" label="2">指定客户等级领取</el-radio>
      </el-form-item>-->
			<el-form-item label="领取限制">
				<el-radio-group v-model="coupon.astrict">
					<el-radio-button :label="0">不限制</el-radio-button>
					<el-radio-button :label="1">指定客户等级</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-show="coupon.astrict==1">
				<el-button type="text" @click="dialog1()">指定客户领取</el-button>

				<el-table :data="tableData2" style="width: 70%">
					<el-table-column property="attributeId" v-if="show" label="客户等级" width="30"></el-table-column>

					<el-table-column prop="levelName" label="客户等级" width="180">
					</el-table-column>
					<!--<el-table-column prop="value" label="规格" width="180">
					</el-table-column>
					<el-table-column prop="stock" label="库存">-->
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item label="分享设置">
				<el-checkbox v-model="coupon.couponShare" @change="change">优惠券允许被分享</el-checkbox>
			</el-form-item>

			<el-form-item label="使用说明">
				<el-input class="input-width" type="textarea" :rows="5" placeholder="请输入内容" v-model="coupon.couponExplain">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('couponFrom')">保存</el-button>
				<el-button @click="resetForm()">取消</el-button>
			</el-form-item>
		</el-form>
		<el-dialog title="选择指定可用商品" :close-on-click-modal='false' :visible.sync="dialogTableVisible">

				<div style="margin-top: 15px">
					<el-form :inline="true" :model="listQuery" size="small" label-width="140px">
						<el-form-item label="活动名称：">
							<el-input v-model="listQuery.name" style="width: 160px;" class="input-width" placeholder="请输入活动名称"></el-input>
						</el-form-item>
						<!--<el-form-item label="活动状态：">
							<el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
								<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>-->

						</el-form-item>

					</el-form>
				</div>
				<div>
					<i class="el-icon-search"></i>
					<span>筛选搜索</span>
					<el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
						查询搜索
					</el-button>
					<el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
						重置
					</el-button>
				</div>

			<el-table :data="gridData" ref="table1" :row-key="getDetail" border fit highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
				<el-table-column property="productId" v-if="show" label="id" width="150"></el-table-column>
				<el-table-column property="productName" label="商品名称" width="150"></el-table-column>
				<el-table-column property="price" label="价格" width="100"></el-table-column>
				<el-table-column property="groupName" label="商品分组" width="100"></el-table-column>
				<el-table-column property="stock" label="库存" width="100"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p>{{scope.row.sale| formatSale}}</p>
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="onCancel">取 消</el-button>
				<el-button type="primary" @click="onSaveDiaBtn">确 定</el-button>
			</div>
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :current-page.sync="listQuery.pageNum" :total="total">
			</el-pagination>
		</el-dialog>

		<el-dialog title="选择客户等级" :visible.sync="dialogTableVisible1">

			<el-table :data="gridData1" ref="table2" :row-key="getDetails" @selection-change="handleSelectionLevelChange">
				<el-table-column type="selection" :reserve-selection="true"></el-table-column>
				<el-table-column property="levelName" label="客户等级"></el-table-column>
				<!--<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>-->
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="onCancel1">取 消</el-button>
				<el-button type="primary" @click="onSaveDiaBtn1">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>
<script>
	import { retailerLevellist } from '@/api/retailerLevel';
	import { createCoupon, getCoupon, updateCoupon, queryListById } from '@/api/newcoupon';
	import { queryList } from '@/api/coupongroup';
	import { createUserLevel, getUserLevel, updateUserLevel } from '@/api/userLevel';
	import { createCouponProduct, getCouponProduct, updateCouponProduct } from '@/api/couponProduct';
	import { fetchSimpleList as fetchProductList } from '@/api/product';
	import { fetchListWithChildren } from '@/api/productCate'
	const defaultCoupon = {
		limitNumber: 0,
		couponType: null,
		couponGiftBagId: null,
		commonType: 0,
		couponName: null,
		count: null,
		couponAmountDiscount: null,
		amount: null,
		perLimit: 1,
		minPoint: null,
		startTime: null,
		endTime: null,
		uptimeToday: null,
		uptimeTomorrow: null,
		couponShare: null,
		astrict: 0,
		useType1: 0,
		note: null,
		lowerTax: 0,
		publishCount: null,
		couponExplain: null,
		productRelationList: [],
		productCategoryRelationList: [],
		text1: 0,
		text2: '',
		text3: '',
		status: '1'
	};
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
		name: null,
		type: null,
		endTime: null
	};
	const defaultTypeOptions = [{
			label: '全场赠券',
			value: 0
		},
		{
			label: '会员赠券',
			value: 1
		},
		{
			label: '购物赠券',
			value: 2
		},
		{
			label: '注册赠券',
			value: 3
		}
	];
	const defaultPlatformOptions = [{
			label: '全平台',
			value: 0
		},
		{
			label: '移动平台',
			value: 1
		},
		{
			label: 'PC平台',
			value: 2
		}
	];
	export default {
		name: 'CouponDetail',
		props: {
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				text1:0,
				status1: null,
				status2: null,
				status3: null,
				coupon: Object.assign({}, defaultCoupon),
				listQuery: Object.assign({}, defaultListQuery),
				typeOptions: Object.assign({}, defaultTypeOptions),
				platformOptions: Object.assign({}, defaultPlatformOptions),
				rules: {
					couponName: [{
							required: true,
							message: '请输入优惠券名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					count: [{
						required: true,
						message: '请输入发放总量',
						trigger: 'blur'
					}, {
						type: 'number',
						required: true,
						message: '只能输入正整数',
						trigger: 'blur'
					}],
					limitNumber: [{
						required: true,
						message: '请输入每人限领',
						trigger: 'blur'
					}, {
						type: 'number',
						required: true,
						message: '只能输入正整数',
						trigger: 'blur'
					}],
					couponGiftBagId: [{
						required: true,
						message: '请选择优惠券礼包组',
						trigger: 'blur'
					}, {
						type: 'number',
						required: true,
						message: '只能输入正整数',
						trigger: 'blur'
					}],
					text1: [{
						required: true,
						message: '请选择使用门槛',
						trigger: 'blur'
					}],

					text3: [{
						required: true,
						message: '请选择优惠内容',
						trigger: 'blur'
					}],
					couponAmountDiscount: [{
						required: true,
						message: '请填写信息',
						trigger: 'blur'
					}],

				},
				bags: [],
				show: false,
				total: "",
				radio0: null,
				radio1: null,
				radio2: null,
				radio3: null,
				radio4: null,
				checked0: null,
				selectProduct: null,
				selectProductLoading: false,
				selectProductOptions: [],
				selectProductCate: null,
				productCateOptions: [],
				hierarchy: [],
				resDate: [],
				couponProduct: [],
				gridData: [],
				gridData1: [],
				dialogTableVisible: false,
				dialogTableVisible1: false,
				tableData1: [],
				tableData2: [],
				proType: 0
			}
		},
		created() {
			if(this.isEdit) {
				getCoupon(this.$route.query.id).then(response => {
					//可用时间
					this.coupon = response.data;
					console.log(this.coupon.minPoint)
					if(this.coupon.minPoint>0){
						this.text1  = 1;
					}else{
						this.text1  = 0;
					}
					this.coupon.uptimeTomorrow = response.data.uptimeTomorrow;
					if(this.coupon.couponShare == 1) {
						this.coupon.couponShare = true;
					} else {
						this.coupon.couponShare = false;

					}
					//判断回显数值禁止渲染输入

					if(this.coupon.startTime != null && this.coupon.endTime != "") {
						//						this.status2 = 1;
						//						this.status3 = 1;
						//						console.log(this.status3+this.status2)
					}

					this.coupon.text2 = "0";
					this.coupon.text3 = "0";

					if(this.coupon.uptimeTomorrow != null) { //当日
						this.radio2 = "2";

					} else if(this.coupon.uptimeToday != null) { //次日
						this.radio2 = "1";

					}

//					if(this.coupon.minPoint == 0) { //使用门槛
//						this.coupon.text1 = "1";
//					} else {
//						this.coupon.text1 = "0";
//					}
				});
				getCouponProduct(this.$route.query.id).then(response => {
					this.tableData1 = response.data.list;
					this.couponProduct = this.tableData1;
				});
				getUserLevel(this.$route.query.id).then(response => {
					this.tableData2 = response.data.list;
				});

			}
			this.getProductCateList();
			this.getList();

			this.checkOut();
			this.coupon.couponType = this.$route.params.id;

		},
		computed: {
			startTime() {
				return this.coupon.startTime;
			},
			endTime() {
				return this.coupon.endTime;
			},
			radio2() {

				return this.radio2;
			},
			uptimeToday() {

				return this.coupon.uptimeToday;
			},
			uptimeTomorrow() {

				return this.coupon.uptimeTomorrow;
			},

		},
		watch: {

			startTime(val) {

				this.coupon.startTime = val;
				if(this.coupon.startTime == null) {
					this.status2 = 1;
					this.status3 = 1;

				} else {
					this.status2 = 1;
					this.status3 = 1;
				}
				return this.coupon.startTime;

			},
			endTime(val) {

				if(this.coupon.endTime) {
					this.status2 = 1;
					this.status3 = 1;

				}
				if(this.coupon.startTime == null) {
					this.status2 = 0;
					this.status3 = 0;
				} else {

					//					this.$message({
					//						message: '请选择结束时间',
					//						type: 'error',
					//						duration: 1000
					//					});
				}
				return this.coupon.endTime;
				//				if(this.coupon.startTime == null && this.coupon.endTime == null) {
				//					this.coupon.uptimeTomorrow = null;
				//
				//					this.coupon.uptimeTomorrow = null;
				//				}
			},
			radio2(val) {
				if(val == 1) {
					this.status3 = 1;
					this.status2 = 0;
					this.status1 = 1;
					this.coupon.uptimeTomorrow = null;

				} else if(val == 2) {
					this.status2 = 1;
					this.status3 = 0;
					this.status1 = 1;
					this.coupon.uptimeToday = null;
				}
				this.coupon.startTime = null;
				this.coupon.endTime = null;
				return this.radio2 = val;
			},
			uptimeToday(val) {
				if(val.length == 0) {
					this.status3 = 1;
					this.status2 = 1;
					this.status1 = 0;
					this.coupon.startTime = null;
					this.coupon.endTime = null;

				} else {
					this.status1 = 1;
				}
				return this.coupon.uptimeToday = val;
			},
			uptimeTomorrow(val) {
				if(val.length == 0) {
					this.status2 = 1;
					this.status3 = 0;
					this.status1 = 0;
					this.coupon.startTime = null;
					this.coupon.endTime = null;
				} else {
					this.status1 = 1;
				}
				return this.coupon.uptimeTomorrow = val;
			},
			//			text1(val) {
			//				if(val == 1) {
			//					if(this.coupon.minPoint==0 ||this.coupon.minPoint.length==0||this.coupon.minPoint==null||this.coupon.minPoint>=10) {
			//						this.$message({
			//							message: '使用门槛金额不规范',
			//							type: 'error',
			//							duration: 1000
			//						});
			//					}
			//				}
			//				this.coupon.text1 = val;
			//			}
			//if(this.coupon.minPoint == 0 || this.coupon.minPoint.length == 0 || this.coupon.minPoint == null || this.coupon.minPoint >= 10) {
			//						this.$message({
			//							message: '使用门槛金额不规范',
			//							type: 'error',
			//							duration: 1000
			//						});
			//						return;
			//					}
			//					if(this.coupon.couponType==null||this.coupon.couponType.length){
			//						
			//					}
			//			}
		},

		filters: {
			formatSale(type) {
				if(type == 0) {
					return '下架';
				} else if(type == 1) {
					return '上架';
				}
			},
		},

		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(this.coupon.couponType)
					if(this.coupon.couponType == 1) {
						//验证信息输入
						if(this.text1 == 1) {
							if(this.coupon.minPoint == null || this.coupon.minPoint == 0 || this.coupon.minPoint.length == 0) { //  || this.coupon.minPoint >= 10
								this.$message({
									message: '使用门槛金额不规范',
									type: 'error',
									duration: 1000
								});
								return;
							}
						}
						//							if(this.coupon.couponAmountDiscount == null || this.coupon.couponAmountDiscount == 0 || this.coupon.couponAmountDiscount.length == 0 || this.coupon.couponAmountDiscount >= 10) {
						//
						//								this.$message({
						//									message: '优惠内容不规范',
						//									type: 'error',
						//									duration: 1000
						//								});
						//								return;
						//							}

						//							if(this.coupon.lowerTax == null || this.coupon.lowerTax == 0 || this.coupon.lowerTax.length == 0) {
						//								console.log(2)
						//								this.$message({
						//									message: '优惠内容最多优惠不规范',
						//									type: 'error',
						//									duration: 1000
						//								});
						//								return;
						//							}
					} else {
						if(this.text1 == 1) {
							if(this.coupon.minPoint == null || this.coupon.minPoint == 0 || this.coupon.minPoint.length == 0) {
								this.$message({
									message: '使用门槛金额不规范',
									type: 'error',
									duration: 1000
								});
								return;
							}
						}
						if(this.coupon.couponAmountDiscount == null || this.coupon.couponAmountDiscount == 0 || this.coupon.couponAmountDiscount.length == 0 || this.coupon.couponAmountDiscount == 10 || this.coupon.couponAmountDiscount > 10) {
							this.$message({
								message: '优惠内容折扣不规范',
								type: 'error',
								duration: 1000
							});
							return;
						}

						if(this.coupon.lowerTax == null || this.coupon.lowerTax == 0 || this.coupon.lowerTax.length == 0) {
							this.$message({
								message: '优惠内容最多优惠不规范',
								type: 'error',
								duration: 1000
							});
							return;
						}
						
						if((this.coupon.startTime!=null || this.coupon.endTime!=null) && this.coupon.uptimeToday!=null) {
							this.$message({
								message: '用券时间和可用时间有且只能使用一个！',
								type: 'error',
								duration: 1000
							});
							return;
						}
						
						if((this.coupon.startTime!=null || this.coupon.endTime!=null) && this.coupon.uptimeTomorrow!=null) {
							this.$message({
								message: '用券时间和可用时间有且只能使用一个！',
								type: 'error',
								duration: 1000
							});
							return;
						}
						

					}
					//					<el-input v-model="coupon.couponAmountDiscount" placeholder="请输入金额" style="width:100px"></el-input>折

					//				<el-input v-model="coupon.lowerTax" placeholder="请输入金额" style="width:100px"></el-input>元

					//当选择用劵时间就不能选择下列的可用时间
					//					if(this.coupon.startTime != "" || this.coupon.endTime != "") {
					//						
					//						if(this.coupon.uptimeToday!=null||this.coupon.uptimeToday=="") {
					//							console.log(this.coupon.uptimeToday )
					//							this.$message({
					//								message: '请清除领券当日起天数',
					//								type: 'error',
					//								duration: 1000
					//							});
					//							return ; 
					//						} 
					//						if(this.coupon.uptimeTomorrow != null||this.coupon.uptimeTomorrow=="") {
					//							this.$message({
					//								message: '请清除输入领券次日起天数',
					//								type: 'error',
					//								duration: 1000
					//							});
					//							return ; 
					//						}
					//					}

					//					//选择可用时间就不能选择用劵时间
					//					if(this.coupon.uptimeToday == null || this.coupon.uptimeToday.length == 0) {
					//						this.$message({
					//							message: '请清除用劵时间',
					//							type: 'error',
					//							duration: 1000
					//						});
					//						return;
					//					}
					//
					//					if(this.coupon.uptimeTomorrow.length == 0 || this.coupon.uptimeTomorrow == null) {
					//						this.$message({
					//							message: '请清除用劵时间',
					//							type: 'error',
					//							duration: 1000
					//						});
					//						return;
					//					}

					if(valid) {
						this.$confirm('是否提交数据', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.isEdit) {
								updateCoupon(this.$route.query.id, this.coupon).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
								});
								updateUserLevel(this.$route.query.id, this.tableData2).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
								});
								updateCouponProduct(this.$route.query.id, this.proType, this.couponProduct).then(response => {
									this.$refs[formName].resetFields();
									this.$message({
										message: '修改成功',
										type: 'success',
										duration: 1000
									});
									this.$router.back();
								});

							} else {
								createCoupon(this.coupon).then(response => {
									let id = response.data;
									createUserLevel(id, this.tableData2).then(response => {});
									createCouponProduct(id, this.proType, this.resDate).then(response => {});
									this.$refs[formName].resetFields();
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
			change(val) {
				this.coupon.couponShare = val;

			},
			clear1(num) {

				//				console.log("576==========" + num)
				//				if(num == 1) {
				//					console.log('清除可用时间1')
				//					this.coupon.uptimeTomorrow = "";
				//
				//				} else if(num == 2) {
				//					console.log('清除可用时间2')
				//					this.coupon.uptimeToday = "";
				//				}
			},
			//			clear23() {
			//				this.status3 = 1
			//				this.coupon.uptimeTomorrow = null;
			//				this.coupon.uptimeToday = null;
			//			},
			changeHandler(value) {
				console.log('改变之后的值是:' + value)
			},
			getDetail(row) {
				return row.productId; //此时就能拿到整行的信息
			},
			getDetails(row) {
				return row.id; //此时就能拿到整行的信息
			},

			dialog() {

				queryListById(this.listQuery).then(response => {
					this.listLoading = false;
					this.gridData = response.data.list;
					this.total = response.data.total;

				});
				this.dialogTableVisible = true;
			},
			dialog1() {
				/*productByGroupId(this.listQuery).then(response => {
					console.log(response.data)
					this.listLoading = false;
					this.gridData = response.data.list;
					console.log(this.gridData)
					this.total = response.data.total;
				});*/

				retailerLevellist().then(response => {
					this.gridData1 = response.data.list;
				});
				this.dialogTableVisible1 = true;
			},
			handleSelectionChange(val) {
				this.resDate = this.$refs.table1.selection;
				this.tableData1 = this.resDate

			},
			handleSearchList() {

				this.listQuery.pageNum = 1;
				this.getList();
			},
			handleResetSearch() {

				this.listQuery = Object.assign({}, defaultListQuery);
			},
			handleSelectionLevelChange(val) {
				this.tableData2 = this.$refs.gridData1.selection;

			},
			resetForm() {
				this.$router.back();
			},

			checkOut() {

			},
			/**
			 *	商品状态 
			 */
			//			formatterPs(row, col, cellValue) {
			//				return cellValue == 1 ? "上架" : "下架";
			//			},
			searchProductMethod(query) {
				if(query !== '') {
					this.loading = true;
					fetchProductList({
						keyword: query
					}).then(response => {
						this.loading = false;
						let productList = response.data;
						this.selectProductOptions = [];
						for(let i = 0; i < productList.length; i++) {
							let item = productList[i];
							this.selectProductOptions.push({
								productId: item.id,
								productName: item.name,
								productSn: item.productSn
							});
						}
					});
				} else {
					this.selectProductOptions = [];
				}
			},
			handleAddProductRelation() {
				if(this.selectProduct === null) {
					this.$message({
						message: '请先选择商品',
						type: 'warning'
					});
					return
				}
				this.coupon.productRelationList.push(this.getProductById(this.selectProduct));
				this.selectProduct = null;
			},
			handleDeleteProductRelation(index, row) {
				this.coupon.productRelationList.splice(index, 1);
			},
			handleAddProductCategoryRelation() {
				if(this.selectProductCate === null || this.selectProductCate.length === 0) {
					this.$message({
						message: '请先选择商品分类',
						type: 'warning'
					});
					return
				}
				this.coupon.productCategoryRelationList.push(this.getProductCateByIds(this.selectProductCate));
				this.selectProductCate = [];
			},
			handleDeleteProductCateRelation(index, row) {
				this.coupon.productCategoryRelationList.splice(index, 1);
			},
			getProductById(id) {
				for(let i = 0; i < this.selectProductOptions.length; i++) {
					if(id === this.selectProductOptions[i].productId) {
						return this.selectProductOptions[i];
					}
				}
				return null;
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
			getList() {
				queryList().then(response => {
					this.bags = response.data;
				});
				queryListById(this.listQuery).then(response => {
					this.listLoading = false;
					this.gridData = response.data.list;
					this.total = response.data.total;
				})
			},
			getProductCateByIds(ids) {
				let name;
				let parentName;
				for(let i = 0; i < this.productCateOptions.length; i++) {
					if(this.productCateOptions[i].value === ids[0]) {
						parentName = this.productCateOptions[i].label;
						for(let j = 0; j < this.productCateOptions[i].children.length; j++) {
							if(this.productCateOptions[i].children[j].value === ids[1]) {
								name = this.productCateOptions[i].children[j].label;
							}
						}
					}
				}
				return {
					productCategoryId: ids[1],
					productCategoryName: name,
					parentCategoryName: parentName
				};
			},
			/**
			 *Dialog确认点击事件 
			 */
			onSaveDiaBtn() {
				this.tableData1 = this.$refs.table1.selection;
				this.couponProduct = this.tableData1;
				this.proType = "0";
				this.dialogTableVisible = false;
			},
			onSaveDiaBtn1() {

				this.tableData2 = this.$refs.table2.selection;
				this.hierarchy = this.tableData2;

				this.dialogTableVisible1 = false;
			},
			onCancel() {
				this.dialogTableVisible = false;
			},
			onCancel1() {
				this.dialogTableVisible1 = false;
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
		}
	}
</script>
<style scoped>
	.input-width {
		width: 60%;
	}
</style>