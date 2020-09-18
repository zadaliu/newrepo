<template>
	<div class="detail-container">
		<div>
			<el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
				<el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
				<el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
				<el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
				<el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
				<el-step title="完成评价" :description="formatTime(order.commentTime)"></el-step>
			</el-steps>
		</div>
		<el-card shadow="never" style="margin-top: 15px">
			<div class="operate-container">
				<i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
				<span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
				<div class="operate-button-container" v-show="order.status===0">
					<el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
					<el-button size="mini">修改商品信息</el-button>
					<el-button size="mini" @click="showUpdateMoneyDialog">修改费用信息</el-button>
					<el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
					<el-button size="mini" @click="showCloseOrderDialog">关闭订单</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status===1">
					<el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
					<el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
					<el-button size="mini">取消订单</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status===2||order.status===3">
					<el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>
					<el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
				<div class="operate-button-container" v-show="order.status===4">
					<el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
					<el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
				</div>
			</div>

			<el-row>
				<el-col :span="13">
					<div>
						<p style="color:#606266;">订单编号：{{order.orderSn}}</p>
						<p style="color:#606266;">付款方式：{{order.payType | formatPayType}}</p>
						<p style="color:#606266;">买家：{{order.receiverName}}</p>
						<p style="color:#606266;">收货信息：{{order | formatAddress}}</p>
						<!--<el-button size="mini" @click="clearFenrun">修改收件信息</el-button>-->
					</div>
				</el-col>
				<el-col :span="11" style="padding-left: 20px;border-left: 1px solid #eff2f6;">
					<div>
						<p style="color:#606266;">订单状态：{{order.status | formatStatus}}</p>
						<p style="color:#606266;">
							<el-col :span="5">
								<el-button size="mini" @click="clearFenrun">清除分润</el-button>
							</el-col>
							<el-col :span="12">
								<el-button size="mini" @click="editFenrun">修改分润</el-button>
							</el-col>
						</p><br/>
						<p style="color:#606266;">提示：</p>
						<p style="color:#606266;">1.如需修改给分销商的佣金/奖金,请先点击【清除分润】,点击后将清除佣金和奖金</p>
						<p style="color:#606266;">2.再点击【修改分润】,按照当前关系链重新计算佣金,奖金和业绩</p>
					</div>
				</el-col>
			</el-row>

			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">基本信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="4" class="table-cell-title">订单编号</el-col>
					<el-col :span="4" class="table-cell-title">发货单流水号</el-col>
					<el-col :span="4" class="table-cell-title">用户账号</el-col>
					<el-col :span="4" class="table-cell-title">支付方式</el-col>
					<el-col :span="4" class="table-cell-title">订单来源</el-col>
					<el-col :span="4" class="table-cell-title">订单类型</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" class="table-cell">{{order.orderSn}}</el-col>
					<el-col :span="4" class="table-cell">暂无</el-col>
					<el-col :span="4" class="table-cell">{{order.memberUsername}}</el-col>
					<el-col :span="4" class="table-cell">{{order.payType | formatPayType}}</el-col>
					<el-col :span="4" class="table-cell">{{order.sourceType | formatSourceType}}</el-col>
					<el-col :span="4" class="table-cell">{{order.orderType | formatOrderType}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" class="table-cell-title">配送方式</el-col>
					<el-col :span="4" class="table-cell-title">物流单号</el-col>
					<el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
					<el-col :span="4" class="table-cell-title">订单可得优币</el-col>
					<el-col :span="4" class="table-cell-title">订单可得成长值</el-col>
					<el-col :span="4" class="table-cell-title">活动信息</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" class="table-cell">{{order.deliveryCompany | formatNull}}</el-col>
					<el-col :span="4" class="table-cell">{{order.deliverySn | formatNull}}</el-col>
					<el-col :span="4" class="table-cell">{{order.autoConfirmDay}}天</el-col>
					<el-col :span="4" class="table-cell">{{order.integration}}</el-col>
					<el-col :span="4" class="table-cell">{{order.growth}}</el-col>
					<el-col :span="4" class="table-cell">
						<el-popover placement="top-start" title="活动信息" width="200" trigger="hover" :content="order.promotionInfo">
							<span slot="reference">{{order.promotionInfo | formatLongText}}</span>
						</el-popover>
					</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">收货人信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="6" class="table-cell-title">收货人</el-col>
					<el-col :span="6" class="table-cell-title">手机号码</el-col>
					<el-col :span="6" class="table-cell-title">邮政编码</el-col>
					<el-col :span="6" class="table-cell-title">收货地址</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">{{order.receiverName}}</el-col>
					<el-col :span="6" class="table-cell">{{order.receiverPhone}}</el-col>
					<el-col :span="6" class="table-cell">{{order.receiverPostCode}}</el-col>
					<el-col :span="6" class="table-cell">{{order | formatAddress}}</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">商品信息</span>
			</div>
			<el-table ref="orderItemTable" :data="order.orderItemList" style="width: 100%;margin-top: 20px" border>
				<el-table-column label="商品图片" width="220" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.productPic" style="height: 80px">
					</template>
				</el-table-column>
				<el-table-column label="商品名称" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.productName}}</p>
						<p>品牌：{{scope.row.productBrand}}</p>
					</template>
				</el-table-column>
				<el-table-column label="价格/货号" width="120" align="center">
					<template slot-scope="scope">
						<p>价格：￥{{scope.row.productPrice}}</p>
						<p>货号：{{scope.row.productSn}}</p>
					</template>
				</el-table-column>
				<el-table-column label="属性" width="120" align="center">
					<template slot-scope="scope">
						<!--{{scope.row.productAttr }}-->
						<el-row v-for="json in JSON.parse(scope.row.productAttr)" :key="json.key">{{json.key}}&nbsp;&nbsp;{{json.value}}</el-row>
					</template>
				</el-table-column>
				<el-table-column label="数量" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.productQuantity}}
					</template>
				</el-table-column>
				<el-table-column label="退货状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.returnStatus | returnStatus}}
					</template>
				</el-table-column>
				<el-table-column label="小计" width="120" align="center">
					<template slot-scope="scope">
						￥{{scope.row.productPrice*scope.row.productQuantity}}
					</template>
				</el-table-column>
			</el-table>
			<div style="float: right;margin: 20px">
				合计：<span class="color-danger">￥{{order.totalAmount}}</span>
			</div>

			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">佣金信息</span>
			</div>
			<el-table :data="commissionList" :summary-method="getSummaries" show-summary style="width: 100%;margin-top: 20px" border>
				<!--ref="orderItemTable"-->
				<el-table-column label="商品标题" align="center">
					<template slot-scope="scope">
						<el-col :span="8">
							<img :src="scope.row.productPic" style="height: 80px">
						</el-col>
						<el-col :span="15">
							<p>{{scope.row.productName}}</p>
						</el-col>
					</template>
				</el-table-column>
				<el-table-column label="分销商信息" align="left">
					<template slot-scope="scope">
						<!--<p>{{scope.row.productName}}</p>
						<p>品牌：{{scope.row.productBrand}}</p>-->
						<p>ID: {{scope.row.userId}}</p>
						<p>手机号码：{{scope.row.NAME}}</p>
						<p>等级：{{scope.row.FLG|formatLevel}}</p>
					</template>
				</el-table-column>
				<el-table-column label="公式" width="120" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.commissionType | formatOT}}&nbsp;{{scope.row.FLG|formatLevel}}</p>
						<p>{{scope.row.exp}}</p>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.status | formatOrderStatus}}
					</template>
				</el-table-column>

				<el-table-column label="佣金" width="120" align="center" prop="price">
					<template slot-scope="scope">
						￥{{scope.row.price}}
					</template>
				</el-table-column>
			</el-table>
			<!--<div style="float: right;margin: 20px">
				合计：<span class="color-danger">￥{{order.totalAmount}}</span>
			</div>-->

			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">奖金信息</span>
			</div>
			<el-table ref="orderItemTable" :data="rewardList" :summary-method="getSummariesReward" show-summary style="width: 100%;margin-top: 20px" border>
				<!--ref="orderItemTable"-->
				<el-table-column label="商品标题" align="center">
					<template slot-scope="scope">
						<el-col :span="6">
							<img :src="scope.row.productPic" style="height: 80px">
						</el-col>
						<el-col :span="15">
							<p>{{scope.row.productName}}</p>
						</el-col>
					</template>
				</el-table-column>
				<el-table-column label="分销商信息" align="left">
					<template slot-scope="scope">
						<!--<p>{{scope.row.productName}}</p>
						<p>品牌：{{scope.row.productBrand}}</p>-->
						<p>ID: {{scope.row.userId}}</p>
						<p>手机号码：{{scope.row.NAME}}</p>
						<p>等级：{{scope.row.FLG|formatLevel}}</p>
					</template>
				</el-table-column>
				<el-table-column label="公式" width="120" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.commissionType | formatOT}}&nbsp;{{scope.row.FLG|formatLevel}}</p>
						<p>{{scope.row.exp}}</p>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.status | formatOrderStatus}}
					</template>
				</el-table-column>

				<el-table-column label="佣金" width="120" align="center" prop="price">
					<template slot-scope="scope">
						￥{{scope.row.price}}
					</template>
				</el-table-column>
			</el-table>
			<!--<div style="float: right;margin: 20px">
				合计：<span class="color-danger">￥{{order.totalAmount}}</span>
			</div>-->

			<div style="margin-top: 60px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">费用信息</span>
			</div>
			<div class="table-layout">
				<el-row>
					<el-col :span="6" class="table-cell-title">商品合计</el-col>
					<el-col :span="6" class="table-cell-title">运费</el-col>
					<el-col :span="6" class="table-cell-title">优惠券</el-col>
					<el-col :span="6" class="table-cell-title">积分抵扣</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
					<el-col :span="6" class="table-cell">￥{{order.freightAmount}}</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell-title">活动优惠</el-col>
					<el-col :span="6" class="table-cell-title">折扣金额</el-col>
					<el-col :span="6" class="table-cell-title">订单总金额</el-col>
					<el-col :span="6" class="table-cell-title">应付款金额</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.discountAmount}}</el-col>
					<el-col :span="6" class="table-cell">
						<span class="color-danger">￥{{order.totalAmount+order.freightAmount}}</span>
					</el-col>
					<el-col :span="6" class="table-cell">
						<!--<span class="color-danger">￥{{order.payAmount+order.freightAmount-order.discountAmount}}</span>-->
						<!--<span class="color-danger">￥{{order.payAmount-order.freightAmount| rounding}}</span>-->
						<span class="color-danger">￥{{order.payAmount| rounding}}</span>
					</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px">
				<svg-icon icon-class="marker" style="color: #606266"></svg-icon>
				<span class="font-small">操作信息</span>
			</div>
			<el-table style="margin-top: 20px;width: 100%" ref="orderHistoryTable" :data="order.historyList" border>
				<el-table-column label="操作者" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.operateMan}}
					</template>
				</el-table-column>
				<el-table-column label="操作时间" width="160" align="center">
					<template slot-scope="scope">
						{{formatTime(scope.row.createTime)}}
					</template>
				</el-table-column>
				<el-table-column label="订单状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.orderStatus | formatStatus}}
					</template>
				</el-table-column>
				<el-table-column label="付款状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.orderStatus | formatPayStatus}}
					</template>
				</el-table-column>
				<el-table-column label="发货状态" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.orderStatus | formatDeliverStatus}}
					</template>
				</el-table-column>
				<el-table-column label="备注" align="center">
					<template slot-scope="scope">
						{{scope.row.note}}
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="修改收货人信息" :visible.sync="receiverDialogVisible" width="40%">
			<el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
				<el-form-item label="收货人姓名：">
					<el-input v-model="receiverInfo.receiverName" style="width: 200px"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：">
					<el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
					</el-input>
				</el-form-item>
				<el-form-item label="邮政编码：">
					<el-input v-model="receiverInfo.receiverPostCode" style="width: 200px">
					</el-input>
				</el-form-item>
				<el-form-item label="所在区域：">
					<v-distpicker :province="receiverInfo.receiverProvince" :city="receiverInfo.receiverCity" :area="receiverInfo.receiverRegion" @selected="onSelectRegion"></v-distpicker>
				</el-form-item>
				<el-form-item label="详细地址：">
					<el-input v-model="receiverInfo.receiverDetailAddress" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
      <el-button @click="receiverDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdateReceiverInfo">确 定</el-button>
      </span>
		</el-dialog>
		<el-dialog title="修改费用信息" :visible.sync="moneyDialogVisible" width="40%">
			<div class="table-layout">
				<el-row>
					<el-col :span="6" class="table-cell-title">商品合计</el-col>
					<el-col :span="6" class="table-cell-title">运费</el-col>
					<el-col :span="6" class="table-cell-title">优惠券</el-col>
					<el-col :span="6" class="table-cell-title">积分抵扣</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
					<el-col :span="6" class="table-cell">
						<el-input v-model.number="moneyInfo.freightAmount" size="mini">
							<template slot="prepend">￥</template>
						</el-input>
					</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
					<el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell-title">活动优惠</el-col>
					<el-col :span="6" class="table-cell-title">折扣金额</el-col>
					<el-col :span="6" class="table-cell-title">订单总金额</el-col>
					<el-col :span="6" class="table-cell-title">应付款金额</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
					<el-col :span="6" class="table-cell">
						<el-input v-model.number="moneyInfo.discountAmount" size="mini">
							<template slot="prepend">-￥</template>
						</el-input>
					</el-col>
					<el-col :span="6" class="table-cell">
						<span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>
					</el-col>
					<el-col :span="6" class="table-cell">
						<span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
      <el-button @click="moneyDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdateMoneyInfo">确 定</el-button>
      </span>
		</el-dialog>
		<el-dialog title="发送站内信" :visible.sync="messageDialogVisible" width="40%">
			<el-form :model="message" ref="receiverInfoForm" label-width="150px">
				<el-form-item label="标题：">
					<el-input v-model="message.title" style="width: 200px"></el-input>
				</el-form-item>
				<el-form-item label="内容：">
					<el-input v-model="message.content" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
		</el-dialog>
		<el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
			<el-form :model="closeInfo" label-width="150px">
				<el-form-item label="操作备注：">
					<el-input v-model="closeInfo.note" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
		</el-dialog>
		<el-dialog title="备注订单" :visible.sync="markOrderDialogVisible" width="40%">
			<el-form :model="markInfo" label-width="150px">
				<el-form-item label="操作备注：">
					<el-input v-model="markInfo.note" type="textarea" rows="3">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
		</el-dialog>
		<logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>

		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
			<span>确定要删除该笔奖金吗？</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="clearAdd">确 定</el-button>
  </span>
		</el-dialog>

		<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
			<div>
				<p>订单编号：{{order.orderSn}}</p>
			</div>
			<el-divider></el-divider>
			<el-table :data="commissionInfo" style="width: 120%;">
				<!--<el-table-column property="name" label="商品标题"></el-table-column>
				<el-table-column property="name" label="数量"></el-table-column>
				<el-table-column property="name" label="小计"></el-table-column>
				<el-table-column property="name" label="一级分佣人"></el-table-column>
				<el-table-column property="name" label="二级分佣人"></el-table-column>-->

				<el-table-column label="商品标题" style="width: 200px;" align="center">
					<template slot-scope="scope">

						<el-col :span="15">
							<img :src="scope.row.productPic" style="height: 100px">

						</el-col>
						<el-col :span="5">
							<p>{{scope.row.productName}}</p>
						</el-col>
					</template>
				</el-table-column>
				<el-table-column label="数量" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.productQuantity }}
					</template>
				</el-table-column>
				<el-table-column label="小计" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.productPrice }}
					</template>
				</el-table-column>

				<!--<el-table-column label="分佣等级" width="120" align="center">
					<template slot-scope="scope">
						<p>{{scope.row.commissionType | formatOT}}&nbsp;分佣人</p>
						<p>{{scope.row.exp}}</p>
					</template>
				</el-table-column>-->

				<el-table-column label="一级分佣人" width="120" align="center" prop="price">
					<template slot-scope="scope">
						<img v-if="scope.row.oneIcon != '' " :src="scope.row.oneIcon" style="height: 96px;width: 96px">
						<img v-else :src="img_user" style="height: 100px">
						<el-input v-model="scope.row.oneCommission"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="二级分佣人" width="120" align="center" prop="price">
					<template slot-scope="scope">

						<img v-if="scope.row.twoIcon != '' " :src="scope.row.twoIcon" style="height: 96px;width: 96px">
						<img v-else :src="img_user" style="height: 100px">
						<el-input v-model="scope.row.twoCommission"></el-input>
					</template>
				</el-table-column>
				<!--<el-table-column label="分销商信息" align="left">
					<template slot-scope="scope">
						<p>{{scope.row.productName}}</p>
						<p>品牌：{{scope.row.productBrand}}</p>
						<p>ID: {{scope.row.userId}}</p>
						<p>手机号码：{{scope.row.NAME}}</p>
						<p>等级：{{scope.row.FLG|formatLevel}}</p>
					</template>
				</el-table-column>
				-->
			</el-table>
			<br /><br /><br />
			<div>重新分配一级分佣人：<input type="text" /> 提示：一级分用人修改后，佣金，奖金，业绩都会重新计算</div>
			<span slot="footer" class="dialog-footer">
				
    <!--<el-button @click="dialogTableVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="resultEdit">确 定</el-button>
  </span>
		</el-dialog>

	</div>

</template>
<script>
	import { getOrderDetail, updateReceiverInfo, updateMoneyInfo, closeOrder, updateOrderNote, deleteOrder, commissionList, rewardList, rewardAndCommissionStatus, commissionInfo, updateSubCommission } from '@/api/order';
	import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
	import { formatDate } from '@/utils/date';
	import img_user from '@/assets/images/user.png';
	import VDistpicker from 'v-distpicker';
	const defaultReceiverInfo = {
		orderId: null,
		receiverName: null,
		receiverPhone: null,
		receiverPostCode: null,
		receiverDetailAddress: null,
		receiverProvince: null,
		receiverCity: null,
		receiverRegion: null,
		status: null
	};
	export default {
		name: 'orderDetail',
		components: {
			VDistpicker,
			LogisticsDialog
		},
		data() {
			return {
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				dialogTableVisible: false,
				centerDialogVisible: false,
				id: null,
				order: {},
				commissionList: [],
				rewardList: [],
				commissionInfo: [],
				receiverDialogVisible: false,
				receiverInfo: Object.assign({}, defaultReceiverInfo),
				moneyDialogVisible: false,
				moneyInfo: {
					orderId: null,
					freightAmount: 0,
					discountAmount: 0,
					status: null
				},
				messageDialogVisible: false,
				message: {
					title: null,
					content: null
				},
				closeDialogVisible: false,
				closeInfo: {
					note: null,
					id: null
				},
				markOrderDialogVisible: false,
				markInfo: {
					note: null
				},
				logisticsDialogVisible: false,
				img_user
			}
		},
		created() {
			this.id = this.list = this.$route.query.id;
			getOrderDetail(this.id).then(response => {
				this.order = response.data;
			});

			commissionList(this.id).then(response => {
				this.commissionList = response.data;
			});
			rewardList(this.id).then(response => {
				this.rewardList = response.data;
				console.log(this.rewardList)
			});
		},
		filters: {
			rounding(value) {
				return value.toFixed(2)
			},
			formatNull(value) {
				if(value === undefined || value === null || value === '') {
					return '暂无';
				} else {
					return value;
				}
			},
			formatLongText(value) {
				if(value === undefined || value === null || value === '') {
					return '暂无';
				} else if(value.length > 8) {
					return value.substr(0, 8) + '...';
				} else {
					return value;
				}
			},
			formatPayType(value) {
				if(value === 1) {
					return '支付宝';
				} else if(value === 2) {
					return '微信';
				} else {
					return '未支付';
				}
			},
			formatSourceType(value) {
				if(value === 1) {
					return 'APP订单';
				} else {
					return 'PC订单';
				}
			},
			formatOrderType(value) {
				if(value === 1) {
					return '秒杀订单';
				} else {
					return '正常订单';
				}
			},
			formatAddress(order) {
				let str = order.receiverProvince;
				if(order.receiverCity != null) {
					str += "  " + order.receiverCity;
				}
				str += "  " + order.receiverRegion;
				str += "  " + order.receiverDetailAddress;
				return str;
			},
			formatStatus(value) {
				if(value === 1) {
					return '待发货';
				} else if(value === 2) {
					return '已发货';
				} else if(value === 3) {
					return '已完成';
				} else if(value === 4) {
					return '已关闭';
				} else if(value === 5) {
					return '无效订单';
				} else {
					return '待付款';
				}
			},
			formatPayStatus(value) {
				if(value === 0) {
					return '未支付';
				} else if(value === 4) {
					return '已退款';
				} else {
					return '已支付';
				}
			},
			formatDeliverStatus(value) {
				if(value === 0 || value === 1) {
					return '未发货';
				} else {
					return '已发货';
				}
			},
			formatOT(value) {
				console.log(value)
				if(value == 1) {
					return '一级';
				} else {
					return '二级';
				}
			},
			formatLevel(value) {
				if(value == 1) {
					return '会员';
				} else if(value == 2) {
					return '店主';
				} else if(value == 3) {
					return '总监';
				}
			},
			formatOrderStatus(value) {
				if(value === 0 || value === 1) {
					return '待结算';
				} else {
					return '已结算';
				}
			},
			formatProductAttr(value) {
				if(value == null) {
					return '';
				} else {
					let attr = JSON.parse(value);
					let result = '';
					for(let i = 0; i < attr.length; i++) {
						result += attr[i].key;
						result += ":";
						result += attr[i].value;
						result += ";";
					}
					return result;
				}
			},
			returnStatus(value) {
				console.log(value);
				if(value=='0'){
					return '未退货';
				} else if(value=='1'){
					return '退货申请';
				} else if(value=='2'){
					return '退货成功';
				} else {
					return '其他';
				}
			}
		},
		methods: {

			getSummariesReward(param) {
				//param 是固定的对象，里面包含 columns与 data参数的对象 {columns: Array[4], data: Array[5]},包含了表格的所有的列与数据信息
				const {
					columns,
					data
				} = param;
				console.log(param)
				//console.log(data)
				const sums = [];
				columns.forEach((column, index) => {
					//console.log(column)
					//console.log(index)
					if(index === 0) {
						sums[index] = '合计';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					//验证每个value值是否是数字，如果是执行if
					if(!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							//const value = Number(curr);
							//if (!isNaN(value)) {
							return prev + curr;
							// } else {
							//   return prev;
							// }
						}, 0);
						sums[index] += ' 元';
					} else {
						sums[index] = '';
					}
				});

				return sums;
			},

			getSummaries(param) {
				//param 是固定的对象，里面包含 columns与 data参数的对象 {columns: Array[4], data: Array[5]},包含了表格的所有的列与数据信息
				const {
					columns,
					data
				} = param;
				//				console.log(param)
				//console.log(data)
				const sums = [];
				columns.forEach((column, index) => {
					//console.log(column)
					//console.log(index)
					if(index === 0) {
						sums[index] = '合计';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					//验证每个value值是否是数字，如果是执行if
					if(!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							//const value = Number(curr);
							//if (!isNaN(value)) {
							return prev + curr;
							// } else {
							//   return prev;
							// }
						}, 0);
						sums[index] += ' 元';
					} else {
						sums[index] = '';
					}
				});

				return sums;
			},
			onSelectRegion(data) {
				this.receiverInfo.receiverProvince = data.province.value;
				this.receiverInfo.receiverCity = data.city.value;
				this.receiverInfo.receiverRegion = data.area.value;
			},
			formatTime(time) {
				if(time == null || time === '') {
					return '';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatStepStatus(value) {
				if(value === 1) {
					//待发货
					return 2;
				} else if(value === 2) {
					//已发货
					return 3;
				} else if(value === 3) {
					//已完成
					return 4;
				} else {
					//待付款、已关闭、无限订单
					return 1;
				}
			},
			showUpdateReceiverDialog() {
				this.receiverDialogVisible = true;
				this.receiverInfo = {
					orderId: this.order.id,
					receiverName: this.order.receiverName,
					receiverPhone: this.order.receiverPhone,
					receiverPostCode: this.order.receiverPostCode,
					receiverDetailAddress: this.order.receiverDetailAddress,
					receiverProvince: this.order.receiverProvince,
					receiverCity: this.order.receiverCity,
					receiverRegion: this.order.receiverRegion,
					status: this.order.status
				}
			},
			handleUpdateReceiverInfo() {
				this.$confirm('是否要修改收货信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateReceiverInfo(this.receiverInfo).then(response => {
						this.receiverDialogVisible = false;
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						getOrderDetail(this.id).then(response => {
							this.order = response.data;
						});
					});
				});
			},
			showUpdateMoneyDialog() {
				this.moneyDialogVisible = true;
				this.moneyInfo.orderId = this.order.id;
				this.moneyInfo.freightAmount = this.order.freightAmount;
				this.moneyInfo.discountAmount = this.order.discountAmount;
				this.moneyInfo.status = this.order.status;
			},
			handleUpdateMoneyInfo() {
				this.$confirm('是否要修改费用信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					updateMoneyInfo(this.moneyInfo).then(response => {
						this.moneyDialogVisible = false;
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						getOrderDetail(this.id).then(response => {
							this.order = response.data;
						});
					});
				});
			},
			showMessageDialog() {
				this.messageDialogVisible = true;
				this.message.title = null;
				this.message.content = null;
			},
			handleSendMessage() {
				this.$confirm('是否要发送站内信?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.messageDialogVisible = false;
					this.$message({
						type: 'success',
						message: '发送成功!'
					});
				});
			},
			showCloseOrderDialog() {
				this.closeDialogVisible = true;
				this.closeInfo.note = null;
				this.closeInfo.id = this.id;
			},
			handleCloseOrder() {
				this.$confirm('是否要关闭?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", [this.closeInfo.id]);
					params.append("note", this.closeInfo.note);
					closeOrder(params).then(response => {
						this.closeDialogVisible = false;
						this.$message({
							type: 'success',
							message: '订单关闭成功!'
						});
						getOrderDetail(this.id).then(response => {
							this.order = response.data;
						});
					});
				});
			},
			showMarkOrderDialog() {
				this.markOrderDialogVisible = true;
				this.markInfo.id = this.id;
				this.closeOrder.note = null;
			},
			handleMarkOrder() {
				this.$confirm('是否要备注订单?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("id", this.markInfo.id);
					params.append("note", this.markInfo.note);
					params.append("status", this.order.status);
					updateOrderNote(params).then(response => {
						this.markOrderDialogVisible = false;
						this.$message({
							type: 'success',
							message: '订单备注成功!'
						});
						getOrderDetail(this.id).then(response => {
							this.order = response.data;
						});
					});
				});
			},
			handleDeleteOrder() {
				this.$confirm('是否要进行该删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new URLSearchParams();
					params.append("ids", [this.id]);
					deleteOrder(params).then(response => {
						this.$message({
							message: '删除成功！',
							type: 'success',
							duration: 1000
						});
						this.$router.back();
					});
				})
			},
			showLogisticsDialog() {
				this.logisticsDialogVisible = true;
			},
			clearFenrun() {
				this.centerDialogVisible = true;
			},
			clearAdd() {

				this.id = this.list = this.$route.query.id;
				rewardAndCommissionStatus(this.id).then(response => {
					this.$message({
						message: '清除分润成功！',
						type: 'success',
						duration: 2000
					});
				});

				this.centerDialogVisible = false;
			},
			editFenrun() {

				commissionInfo(this.id).then(response => {
					this.commissionInfo = response.data;
				});
				this.dialogTableVisible = true;
			},
			resultEdit() {
				let params = new URLSearchParams();
				params.append("list", this.commissionInfo);
				console.log(this.commissionInfo)
				updateSubCommission(this.commissionInfo).then(response => {
					console.log(response.data)
				});
				this.dialogTableVisible = false;
			}
		}
	}
</script>
<style scoped>
	.detail-container {
		width: 80%;
		padding: 20px 20px 20px 20px;
		margin: 20px auto;
	}
	
	.operate-container {
		background: #F2F6FC;
		height: 80px;
		margin: -20px -20px 0;
		line-height: 80px;
	}
	
	.operate-button-container {
		float: right;
		margin-right: 20px
	}
	
	.table-layout {
		margin-top: 20px;
		border-left: 1px solid #DCDFE6;
		border-top: 1px solid #DCDFE6;
	}
	
	.table-cell {
		height: 60px;
		line-height: 40px;
		border-right: 1px solid #DCDFE6;
		border-bottom: 1px solid #DCDFE6;
		padding: 10px;
		font-size: 14px;
		color: #606266;
		text-align: center;
		overflow: hidden;
	}
	
	.table-cell-title {
		border-right: 1px solid #DCDFE6;
		border-bottom: 1px solid #DCDFE6;
		padding: 10px;
		background: #F2F6FC;
		text-align: center;
		font-size: 14px;
		color: #303133;
	}
</style>