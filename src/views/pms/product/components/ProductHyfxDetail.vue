<template>
	<div style="margin-top: 30px">
		<el-form :model="value" :rules="rules" ref="productInfoForm" label-width="220px" style="width: 700px" size="small">

			<el-form-item label="是否开启礼包奖金：">
				<el-radio v-model="value.pmsProductRootList.isGiftPack" :label="1">开启</el-radio>
				<el-radio v-model="value.pmsProductRootList.isGiftPack" :label="0">不开启</el-radio>
			</el-form-item>

			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">

						<label class="el-form-item__label" style="width: 220px;">
								<el-radio v-model="value.pmsProductRootList.isGiftMoneyStatus" :label="1">开启：</el-radio>
								<el-radio v-model="value.pmsProductRootList.isGiftMoneyStatus" :label="0">关闭：</el-radio>
						</label> 实际支付金额低于
						<el-input style="width:80px" v-model="value.pmsProductRootList.isGiftMoney"></el-input> 元。不发奖品礼包
					</div>
				</el-col>

			</el-row>

			<el-row style="padding-bottom: 10px;padding-top: 30px;">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<span style="padding-left: 90px;">店主</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<span style="padding-left: 90px;">总监</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<span style="padding-left: 90px;">服务商</span>
					</div>
				</el-col>
			</el-row>

			<el-row style="padding-bottom: 20px;padding-top: 11px;">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-input v-model="value.pmsProductRootList.dzZjMoney" style="width: 70px" placeholder="直接">直接</el-input>
						<el-input v-model="value.pmsProductRootList.dzTjMoney" style="width: 70px" placeholder="同级">同级</el-input>
						<el-input v-model="value.pmsProductRootList.dzJjMoney" style="width: 70px" placeholder="间接">间接</el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<el-input v-model="value.pmsProductRootList.zzZjMoney" style="width: 70px" placeholder="直接">直接</el-input>
						<el-input v-model="value.pmsProductRootList.zzTjMoney" style="width: 70px" placeholder="同级">同级</el-input>
						<el-input v-model="value.pmsProductRootList.zzJjMoney" style="width: 70px" placeholder="间接">间接</el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-input v-model="value.pmsProductRootList.fwsZjMoney" style="width: 70px" placeholder="直接">直接</el-input>
						<el-input v-model="value.pmsProductRootList.fwsTjMoney" style="width: 70px" placeholder="同级">同级</el-input>
						<el-input v-model="value.pmsProductRootList.fwsJjMoney" style="width: 70px" placeholder="间接">间接</el-input>
					</div>
				</el-col>
			</el-row>

			<el-form-item style="text-align: center">
				<el-button size="medium" @click="handlePrev">上一步，填写基础分销</el-button>
				<el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，选择商品关联</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { fetchListWithChildren } from '@/api/productCate'
	import { fetchList as fetchBrandList } from '@/api/brand'
	import { getProduct } from '@/api/product';

	export default {
		name: "ProductHyfxDetail",
		props: {
			value: Object,
			isEdit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
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
			this.getProductCateList();
			this.getBrandList();
		},
		computed: {
			//商品的编号
			productId() {
				return this.value.id;
			}
		},
		watch: {
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
			//处理编辑逻辑
			handleEditCreated() {
				if(this.value.productCategoryId != null) {
					this.selectProductCateValue.push(this.value.cateParentId);
					this.selectProductCateValue.push(this.value.productCategoryId);
				}
				this.hasEditCreated = true;
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
			getCateNameById(id) {
				let name = null;
				for(let i = 0; i < this.productCateOptions.length; i++) {
					for(let j = 0; j < this.productCateOptions[i].children.length; j++) {
						if(this.productCateOptions[i].children[j].value === id) {
							name = this.productCateOptions[i].children[j].label;
							return name;
						}
					}
				}
				return name;
			},
			handleNext(formName) {
				this.$refs[formName].validate((valid) => {

					if(this.value.pmsProductRootList.isGiftPack == 1) {
						//店主
						if(this.value.pmsProductRootList.dzZjMoney.length == 0) {
							this.$message({
								message: '店主直接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.dzTjMoney.length == 0) {
							this.$message({
								message: '店主同级不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.dzJjMoney.length == 0) {
							this.$message({
								message: '店主间接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						//总监
						if(this.value.pmsProductRootList.zzZjMoney.length == 0) {
							this.$message({
								message: '总监直接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.zzTjMoney.length == 0) {
							this.$message({
								message: '总监同级不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.zzJjMoney.length == 0) {
							this.$message({
								message: '总监间接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}

						//经销商
						if(this.value.pmsProductRootList.fwsZjMoney.length == 0) {
							this.$message({
								message: '服务商直接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.fwsTjMoney.length == 0) {
							this.$message({
								message: '服务商同级不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.fwsJjMoney.length == 0) {
							this.$message({
								message: '服务商间接不能为空',
								type: 'error',
								duration: 1000
							});
							valid = false;
							return false;
						}
						if(this.value.pmsProductRootList.isGiftMoneyStatus == 1) {
							if(this.value.pmsProductRootList.isGiftMoney.length == 0) {
								this.$message({
									message: '实际支付金额条件不能为空',
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

</style>