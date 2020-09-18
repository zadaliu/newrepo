<template>
	<div style="margin-top: 50px">
		<el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
			<el-form-item label="商品分类：" prop="productCategoryId">
		   		<el-cascader
		   			:options="productCateOptions"
		          v-model="selectProductCateValue"
		          >
		        </el-cascader>
			</el-form-item>
			<el-form-item label="商品名称：" prop="name">
				<el-input v-model="value.name"></el-input>
			</el-form-item>
			<el-form-item label="副标题：" prop="subTitle">
				<el-input v-model="value.subTitle"></el-input>
			</el-form-item>
			<el-form-item label="商品品牌：" prop="brandId">
				<el-select v-model="value.brandId" @change="handleBrandChange" placeholder="请选择品牌">
					<el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品分组：" prop="productGroupId">
				<el-select v-model="value.productGroupId" @change="handleGroupChange" placeholder="请选择分组">
					<el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="运费模板：" prop="transportId">
				<el-select v-model="value.transportId" @change="transportChange" placeholder="请选择运费模板">
					<el-option v-for="item in transportOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="运费(仅显示)：" prop="freight">
				<el-input v-model="value.freight"></el-input>
			</el-form-item>
			<el-form-item label="公司绑定：" prop="supplierId">
				<el-select v-model="value.supplierId" @change="supplierChange" placeholder="请选择公司">
					<el-option v-for="item in supplierOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="商品介绍：">
				<el-input :autoSize="true" v-model="value.description" type="textarea" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="商品货号：">
				<el-input v-model="value.productSn"></el-input>
			</el-form-item>
			<el-form-item label="商品售价：" prop="price">
				<el-input v-model="value.price"></el-input>
			</el-form-item>
			<el-form-item label="市场价：" prop="originalPrice">
				<el-input v-model="value.originalPrice" ></el-input>
			</el-form-item>
			<el-form-item label="商品库存：" prop="stock">
				<el-input v-model="value.stock" ></el-input>
			</el-form-item>
			<el-form-item label="计量单位：" prop="unit">
				<el-input v-model="value.unit"  ></el-input>
			</el-form-item>
			<el-form-item label="商品重量：" prop="weight">
				<el-input v-model="value.weight" oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 300px" ></el-input>
				<span style="margin-left: 20px">克</span>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="value.sort"></el-input>
			</el-form-item>
			<el-form-item style="text-align: center">
				<el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { fetchListWithChildren } from '@/api/productCate'
	import { fetchList as fetchBrandList, groupList } from '@/api/brand'
	import { getProduct } from '@/api/product';
	import { fetchList } from '@/api/transport';
	import { fetchList as fetchListSupplier} from '@/api/supplier';
	export default {
		name: "ProductInfoDetail",
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
				groupOptions: [],
				transportOptions: [],
				supplierOptions:[],
				count:1,
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
					productGroupId: [{
						required: true,
						message: '请选择商品分组',
						trigger: 'blur'
					}],
					transportId: [{
						required: true,
						message: '请选择运费模板',
						trigger: 'blur'
					}],
					freight: [{
						required: true,
						message: '请填写运费',
						trigger: 'blur'
					}],
					supplierId: [{
						required: true,
						message: '请填写公司',
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
					}],
					
					price:[{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					originalPrice:[{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					stock:[{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					unit:[{
						required: true,
						message: '该项为必填项',
						trigger: 'blur'
					}],
					weight:[{
						required: true,
						message: '输入正确的数字',
						trigger: 'blur'
					}],
				}
			};
		},
		created() {
			this.getProductCateList();
			this.getBrandList();
			this.getGroupList();
			this.getTransportList();
			this.getSupplierList();
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
				
				this.handleEditCreated();
			},
			selectProductCateValue: function(newValue) {
				console.log(this.value);
				if(newValue != null && newValue.length === 2) {
						this.value.productCategoryId = newValue[1];
						this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId);
					//this.funSetData(newValue);
				} else {
					this.value.productCategoryId = null;
					this.value.productCategoryName = null;
				}
			//console.log(this.value)
			}
		},
		mounted() {
					
		},
		methods: {
			//处理编辑逻辑
			handleEditCreated() {
				if(this.value.productCategoryId != null) {
					console.log("handleEditCreated");
//					console.log("this.value.cateParentId" + this.value.cateParentId);
//					console.log( this.value.cateParentId);
//					console.log( this.value.productCategoryId);
//					this.selectProductCateValue.push(this.value.cateParentId);
//					this.selectProductCateValue.push(this.value.productCategoryId);
					this.selectProductCateValue = [this.value.cateParentId,this.value.productCategoryId]
				}
				this.hasEditCreated = true;
			},
//			funSetData(newValue) {
//				console.log("sssssssssssssssssssss");
//				this.selectProductCateValue.push(this.value.cateParentId);
//					this.selectProductCateValue.push(this.value.productCategoryId);
//				//this.selectProductCateValue=[3,12];
//			},
			getProductCateList() {
				console.log("getProductCateList");
				fetchListWithChildren().then(response => {
					let list = response.data;
					this.productCateOptions = [];
					console.log("dddddddddddddddddddddddddddddddddd");
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

			getTransportList() {
				fetchList({
					pageNum: 1,
					pageSize: 100
				}).then(response => {
					this.transportOptions = [];
					let TranList = response.data.list;
					for(let i = 0; i < TranList.length; i++) {
						this.transportOptions.push({
							label: TranList[i].transName,
							value: TranList[i].transportId
						});
					}

				});
			},
			getSupplierList() {
				fetchListSupplier({
					pageNum: 1,
					pageSize: 100
				}).then(response => {
					this.supplierOptions = [];
					console.log(response.data)
					let TranList = response.data.list;
					for(let i = 0; i < TranList.length; i++) {
						this.supplierOptions.push({
							label: TranList[i].copName,
							value: TranList[i].id
						});
					}

				});
			},
			getGroupList() {
				groupList({
					isStatic: 1,
					pageNum: 1,
					pageSize: 100
				}).then(response => {
					this.groupOptions = [];
					let groupList = response.data.list;
					for(let i = 0; i < groupList.length; i++) {
						this.groupOptions.push({
							label: groupList[i].groupName,
							value: groupList[i].id
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
							console.log(name)
							return name;
						}
					}
				}
				return name;
			},
			handleNext(formName) {
				this.$refs[formName].validate((valid) => {
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
			handleBrandChange(val) {
				let brandName = '';
				for(let i = 0; i < this.brandOptions.length; i++) {
					if(this.brandOptions[i].value === val) {
						brandName = this.brandOptions[i].label;
						break;
					}
				}
				this.value.brandName = brandName;
			},
			handleGroupChange(val) {
				let groupName = '';
				for(let i = 0; i < this.groupOptions.length; i++) {
					if(this.groupOptions[i].value === val) {
						groupName = this.groupOptions[i].label;
						break;
					}
				}
				this.value.groupName = groupName;
			},
			transportChange(val) {
				let transportName = '';
				for(let i = 0; i < this.transportOptions.length; i++) {
					if(this.transportOptions[i].value === val) {
						transportName = this.transportOptions[i].label;
						break;
					}
				}
				this.value.transportName = transportName;
			},
			
			supplierChange(val) {
				let supplierName = '';
				for(let i = 0; i < this.supplierOptions.length; i++) {
					if(this.supplierOptions[i].value === val) {
						supplierName = this.supplierOptions[i].label;
						break;
					}
				}
				this.value.supplierName = supplierName;
			},

		}
	}
</script>

<style scoped>

</style>