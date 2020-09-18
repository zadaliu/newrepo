<template>
	<div style="margin-top: 50px">
		<el-form :model="value" ref="productInfoForm" label-width="2f20px" style="width: 600px" size="small">

			<el-form-item label="是否参与分销：" prop="isRetail">
				<el-radio v-model="value.pmsProductRootList.isRetail" :label="1">参与</el-radio>
				<el-radio v-model="value.pmsProductRootList.isRetail" :label="0">不参与</el-radio>
			</el-form-item>
			<el-form-item label="开启独立销售金：" prop="isTwoRetail">
				<el-radio v-model="value.pmsProductRootList.isTwoRetail" :label="1">开启</el-radio>
				<el-radio v-model="value.pmsProductRootList.isTwoRetail" :label="0">不开启</el-radio>
			</el-form-item>

			<el-form-item label="" prop="isSalasGold">
				<el-radio v-model="value.pmsProductRootList.isSalasGold" @change="tm(1)" :label="1">统一销售佣金</el-radio>
				<el-radio v-model="value.pmsProductRootList.isSalasGold" @change="tm(0)" :label="0">详情销售佣金</el-radio>
			</el-form-item>
			<div class="ty" :class="{red: !isshow}">
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<!--<el-form-item label="一级销售比例：" prop="oneSalaGoldRatio">
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.oneSalaGoldRatio"></el-input>%
							</el-form-item>-->
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item label="一级销售佣金：">
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.oneSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>

					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<!--<el-form-item label="二级销售佣比例：" prop="twoSalaGoldRatio">
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.twoSalaGoldRatio"></el-input>%
							</el-form-item>-->
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item label="二级销售佣金：">
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.twoSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>

					</el-col>
				</el-row>
			</div>
			<div class="xq" :class="{blue: !istwo}">
				<el-row>
					<el-col :span="12">
						<div class="block">
							<span class="demonstration" style="text-align: center;">一级销售金</span>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="block">
							<span class="demonstration" style="text-align: center;">二级销售金</span>
						</div>

					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12" style="padding-top: 20px;">
						<div class="grid-content bg-purple">
							<el-form-item label="店主：">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.dzOneSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.dzOneSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12" style="padding-top: 20px;">
						<div class="grid-content bg-purple-light">
							<el-form-item label="">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.dzTwoSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.dzTwoSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item label="总监：">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.zjOneSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.zjOneSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item label="">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.zjTwoSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.zjTwoSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item label="服务商：">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.fwsOneSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.fwsOneSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item label="">
								<!--<el-input style="width: 70px;" v-model="value.pmsProductRootList.fwsTwoSalaGoldRatio"></el-input>%-->
								<el-input style="width: 70px;" v-model="value.pmsProductRootList.fwsTwoSalaGold"></el-input>&nbsp;&nbsp;元
							</el-form-item>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-form-item style="text-align: center">
				<el-button size="medium" @click="handlePrev">上一步，填写商品属性</el-button>
				<el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写会员分销</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { fetchListWithChildren } from '@/api/productCate'
	import { fetchList as fetchBrandList } from '@/api/brand'
	import { getProduct } from '@/api/product';

	export default {
		name: "ProductJcjxDetail",
		props: {
			value: Object,
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isshow: false,
				istwo: false,
				hasEditCreated: false,
				//选中商品分类的值
				selectProductCateValue: [],
				productCateOptions: [],
				brandOptions: [],
				rules: {
					name: [{
							required: true,
							message: '请输入商品名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 140,
							message: '长度在 2 到 140 个字符',
							trigger: 'blur'
						}
					],
					subTitle: [{
						required: true,
						message: '请输入商品副标题',
						trigger: 'blur'
					}],
					productCategoryId: [{
						required: true,
						message: '请选择商品分类',
						trigger: 'blur'
					}],
					brandId: [{
						required: true,
						message: '请选择商品品牌',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入商品介绍',
						trigger: 'blur'
					}],
					requiredProp: [{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {

			//			console.log(this.value.pmsProductRootList)
			//			console.log(this.value.pmsProductRootList.isSalasGold)
			//			this.getProductCateList();
			//			this.getBrandList();
		},
		computed: {
			//商品的编号
			productId() {
				return this.value.id;
			},
			isSalasGoldNum() {
				return this.value.pmsProductRootList.isSalasGold;
			}
		},
		watch: {
			isSalasGoldNum: function(newValue) {
				this.tm(this.value.pmsProductRootList.isSalasGold);

			},
			productId: function(newValue) {
				if(!this.isEdit) return;
				if(this.hasEditCreated) return;
				if(newValue === undefined || newValue == null || newValue === 0) return;
				//this.handleEditCreated();
			},
			selectProductCateValue: function(newValue) {
				if(newValue != null && newValue.length === 2) {
					this.value.productCategoryId = newValue[1];
					this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId);
				} else {
					this.value.productCategoryId = null;
					this.value.productCategoryName = null;
				}
			}
		},
		methods: {
			tm: function(e) {
				if(e == 0) {
					this.istwo = true
					this.isshow = false
				} else {
					this.istwo = false
					this.isshow = true

				}

			},
			//处理编辑逻辑
			//			handleEditCreated() {
			//				if(this.value.productCategoryId != null) {
			//					this.selectProductCateValue.push(this.value.cateParentId);
			//					this.selectProductCateValue.push(this.value.productCategoryId);
			//				}
			//				this.hasEditCreated = true;
			//			},
			//			getProductCateList() {
			//				fetchListWithChildren().then(response => {
			//					let list = response.data;
			//					this.productCateOptions = [];
			//					for(let i = 0; i < list.length; i++) {
			//						let children = [];
			//						if(list[i].children != null && list[i].children.length > 0) {
			//							for(let j = 0; j < list[i].children.length; j++) {
			//								children.push({
			//									label: list[i].children[j].name,
			//									value: list[i].children[j].id
			//								});
			//							}
			//						}
			//						this.productCateOptions.push({
			//							label: list[i].name,
			//							value: list[i].id,
			//							children: children
			//						});
			//					}
			//				});
			//			},
			//			getBrandList() {
			//				fetchBrandList({
			//					pageNum: 1,
			//					pageSize: 100
			//				}).then(response => {
			//					this.brandOptions = [];
			//					let brandList = response.data.list;
			//					for(let i = 0; i < brandList.length; i++) {
			//						this.brandOptions.push({
			//							label: brandList[i].name,
			//							value: brandList[i].id
			//						});
			//					}
			//				});
			//			},
			//			getCateNameById(id) {
			//				let name = null;
			//				for(let i = 0; i < this.productCateOptions.length; i++) {
			//					for(let j = 0; j < this.productCateOptions[i].children.length; j++) {
			//						if(this.productCateOptions[i].children[j].value === id) {
			//							name = this.productCateOptions[i].children[j].label;
			//							return name;
			//						}
			//					}
			//				}
			//				return name;
			//			},
			handleNext(formName) {
				this.$refs[formName].validate((valid) => {

					if(this.value.pmsProductRootList.isTwoRetail == 1) {
						if(this.value.pmsProductRootList.isSalasGold == 1) {
							if(this.value.pmsProductRootList.oneSalaGold == null || this.value.pmsProductRootList.oneSalaGold == "") {
								this.$message({
									message: '一级销售佣金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
							if(this.value.pmsProductRootList.twoSalaGold == null || this.value.pmsProductRootList.twoSalaGold == "") {
								this.value.pmsProductRootList.twoSalaGold=0;
//								this.$message({
//									message: '二级销售佣金不能为空',
//									type: 'error',
//									duration: 1000
//								});
//								valid = false;
//								return false;
							}
						} else {
							if(this.value.pmsProductRootList.dzOneSalaGold == null || this.value.pmsProductRootList.dzOneSalaGold == "") {
								this.$message({
									message: '店主一级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
							if(this.value.pmsProductRootList.dzTwoSalaGold == null || this.value.pmsProductRootList.dzTwoSalaGold == "") {
								this.$message({
									message: '店主二级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
							if(this.value.pmsProductRootList.zjOneSalaGold == null || this.value.pmsProductRootList.zjOneSalaGold == "") {
								this.$message({
									message: '总监一级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
							if(this.value.pmsProductRootList.zjTwoSalaGold == null || this.value.pmsProductRootList.zjTwoSalaGold == "") {
								this.$message({
									message: '总监二级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;

							}

							if(this.value.pmsProductRootList.fwsOneSalaGold == null || this.value.pmsProductRootList.fwsOneSalaGold == "") {
								this.$message({
									message: '服务商一级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
							if(this.value.pmsProductRootList.fwsTwoSalaGold == null || this.value.pmsProductRootList.fwsTwoSalaGold == "") {
								this.$message({
									message: '服务商二级销售金不能为空',
									type: 'error',
									duration: 1000
								});
								valid = false;
								return false;
							}
						}
					}

					if(valid) {
						this.$emit('nextStep');
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
			handlePrev() {
				this.$emit('prevStep')
			},
			handleBrandChange(val) {
				let brandName = '';
				for(let i = 0; i < this.brandOptions.length; i++) {
					if(this.brandOptions[i].value === val) {
						brandName = this.brandOptions[i].label;
						break;
					}
				}
				this.value.brandName = brandName;
			}
		}
	}
</script>

<style scoped>
	.red {
		color: red;
		font-size: 14px;
		display: none;
	}
	
	.blue {
		color: blue;
		font-size: 20px;
		display: none;
	}
</style>