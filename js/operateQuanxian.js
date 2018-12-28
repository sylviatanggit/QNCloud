



						


//----------------------我的企业-----------------------------
		function companyManagement(){
			
	
			if(!checkPermissionStatus("企业信息-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#companyManagementId").unbind();
				return false;
			
			}
		}
		
		
		function staffManagement(){
			
	
			if(!checkPermissionStatus("我的员工-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#staffmanagementId").unbind();
				return false;
			
			}
		}
			

//----------------------往来单位-----------------------------
		function unitManager(){
			
	
			if(!checkPermissionStatus("往来单位管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#unitId").unbind();
				return false;
			
			}
		}
		
		
		function contractManager(){
			
	
			if(!checkPermissionStatus("购销合同管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#mycontractId").unbind();
				return false;
			
			}
		}
				


		
		function authorizationManager(){
			
	
			if(!checkPermissionStatus("授权书管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#myauthorizationId").unbind();
				return false;
			
			}
		}


//----------------------我的产品-----------------------------
		function myAllProductManager(){
			
	
			if(!checkPermissionStatus("我的产品注册证-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#myAllProductId").unbind();
				return false;
			
			}
		}
		
		
		function MyAllGuiGeManager(){
			
	
			if(!checkPermissionStatus("我的所有产品-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#myAllGuiGeId").unbind();
				return false;
			
			}
		}
		

		function toolManagementManager(){
			
	
			if(!checkPermissionStatus("工具组套管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#toolManagementId").unbind();
				return false;
			
			}
		}
		


		function operationManagement(){
			
	
			if(!checkPermissionStatus("产品组套管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#operationManagementId").unbind();
				return false;
			
			}
		}
		

//----------------------采购管理-----------------------------
		function purchasingManagement(){
			
	
			if(!checkPermissionStatus("订货合约-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#orderContract").unbind();
				return false;
			
			}
		}
		
		
		function acceptanceCheck(){
			
	
			if(!checkPermissionStatus("入库验收-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#acceptanceCheck").unbind();
				return false;
			
			}
		}
		

		function purchaseReturn(){
			
	
			if(!checkPermissionStatus("采购退货-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#returnPurchase").unbind();
				return false;
			
			}
		}
		


		function Totreasury(){
			
	
			if(!checkPermissionStatus("赠送入库-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#TotreasuryId").unbind();
				return false;
			
			}
		}
		

//----------------------直销管理-----------------------------
		function stockApplication(){
			
	
			if(!checkPermissionStatus("标准流程-备货申请-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#stockApplication").unbind();
				return false;
			
			}
		}
		
		
		function operationBH(){
			
	
			if(!checkPermissionStatus("标准流程-手术备货-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#operationId").unbind();
				return false;
			
			}
		}
		

		function getQuHuo(){
			
	
			if(!checkPermissionStatus("标准流程-确认取货-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#getQuHuoId").unbind();
				return false;
			
			}
		}
		


		function zxConsume(){
			
	
			if(!checkPermissionStatus("标准流程-实耗清点-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#zxConsumeId").unbind();
				return false;
			
			}
		}
		
		
		function settlementJS(){
			
	
			if(!checkPermissionStatus("快捷流程-备库结算-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#settlementJSId").unbind();
				return false;
			
			}
		}
		

		function ZXKUJSShao(){
			
	
			if(!checkPermissionStatus("快捷流程-备库实耗-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#ZXKUJSShaoId").unbind();
				return false;
			
			}
		}
		


		function showZhiXiaoProduct(){
			
	
			if(!checkPermissionStatus("其他流程-产品结算-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#showZhiXiaoProductId").unbind();
				return false;
			
			}
		}
		


//----------------------分销管理-----------------------------
	function distributionContact(){
			
	
			if(!checkPermissionStatus("分销合约-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#distributionContact").unbind();
				return false;
			
			}
		}
		
		function outgoingVerification(){
			
	
			if(!checkPermissionStatus("出库验出-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#outgoingVerification").unbind();
				return false;
			
			}
		}
		

		function distributionReturn(){
			
	
			if(!checkPermissionStatus("分销退货-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#distributionReturn").unbind();
				return false;
			
			}
		}
		


		function ZSCKtreasury(){
			
	
			if(!checkPermissionStatus("赠送出库-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#ZSCKtreasuryId").unbind();
				return false;
			
			}
		}
		



//----------------------借货管理-----------------------------
		function lendIn(){
			
	
			if(!checkPermissionStatus("借出管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#lendInId").unbind();
				return false;
			
			}
		}
		
		
		function lendOut(){
			
	
			if(!checkPermissionStatus("借入管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#lendOutId").unbind();
				return false;
			
			}
		}
		


//----------------------试剂管理-----------------------------
		function RKManager(){
			
			if(!checkPermissionStatus("试剂入库管理-查看1")){
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
			  	$("#RKManagerId").unbind();
				return false;
			}
		}
		
		
		function CKManager(){
			
	
			if(!checkPermissionStatus("试剂出库管理-查看1")){
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
			  	$("#CKManagerId").unbind();
				return false;		
			}
		}
		
	//----------------------报表库存管理-----------------------------
	//库存初始化
	function stockInit(){
			
	
			if(!checkPermissionStatus("库存初始化-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#stockInitId").unbind();
				return false;
			
			}
		}
	
	
	//库存信息查询
	function stockInfoFind(){
			
	
			if(!checkPermissionStatus("库存信息查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#stockInfoId").unbind();
				return false;
			
			}
		}
	
	//仓库设置管理
	function wareHouseSetting(){
			
	
			if(!checkPermissionStatus("仓库设置管理-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#wareHouseSettingId").unbind();
				return false;
			
			}
		}
	
	
	//仓库调拨
	function wareHouseallocation(){
			
	
			if(!checkPermissionStatus("仓库调拨-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#wareHouseAllocationId").unbind();
				return false;
			
			}
		}
	
	
	//盘盈盘亏
	function profitAndloss(){
			
	
			if(!checkPermissionStatus("盘盈盘亏-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#profitAndlossId").unbind();
				return false;
			
			}
		}
	
	
	//报损报溢
	function reportAndLos(){
			
	
			if(!checkPermissionStatus("报溢报损-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#reportAndLosId").unbind();
				return false;
			
			}
		}
	
	
	
	//盘点记录查询
	function inventoryHistory(){
			
	
			if(!checkPermissionStatus("盘点记录查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#inventoryHistoryId").unbind();
				return false;
			
			}
		}
	
	
	//库存建议
	function stockSuggestion(){
			
	
			if(!checkPermissionStatus("库存调整建议-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#stockSuggestionId").unbind();
				return false;
			
			}
		}
	
	
	//仓库台账记录
	function stockAccount(){
			
	
			if(!checkPermissionStatus("仓库台账记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#stockAccountId").unbind();
				return false;
			
			}
		}
	
	
	//----------------------财务管理-----------------------------
	//采购核价
	function purchaseHeJia(){
			
	
			if(!checkPermissionStatus("采购核价-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#pricePurchase").unbind();
				return false;
			
			}
		}
	
	
	//分销核价
	function distributionHeJia(){
			
	
			if(!checkPermissionStatus("分销核价-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#distributionPrice").unbind();
				return false;
			
			}
		}
	
	
	//直销核价
	function directSellingHeJia(){
			
	
			if(!checkPermissionStatus("直销核价-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#direcPrice").unbind();
				return false;
			
			}
		}
	
	
	//销售收款单
	function salesReceipt(){
			
	
			if(!checkPermissionStatus("销售收款单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#returnReceipts").unbind();
				return false;
			
			}
		}
	
	
		//采购付款单
	function pursePayment(){
			
	
			if(!checkPermissionStatus("采购付款单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#payment").unbind();
				return false;
			
			}
		}
	
	
	//采购发票签入单
	function checkin(){
			
	
			if(!checkPermissionStatus("采购发票签入单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#checkinId").unbind();
				return false;
			
			}
		}
	
	//分销发票签出单
	function FXFPinvoiceOut(){
			
	
			if(!checkPermissionStatus("分销发票签出单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#FXFPinvoiceOutId").unbind();
				return false;
			
			}
		}
	
		//直销发票签出单
	function ZXFPinvoiceOut(){
			
	
			if(!checkPermissionStatus("直销发票签出单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#ZXFPinvoiceOutId").unbind();
				return false;
			
			}
		}


	//----------------------报表分析-----------------------------
		function financeData(){
			
	
			if(!checkPermissionStatus("财务对账单-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#financeId").unbind();
				return false;
			
			}
		}
		
		
		function directDocument(){
			
	
			if(!checkPermissionStatus("直销单据查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#directDocumentId").unbind();
				return false;
			
			}
		}
			function capital(){
			
	
			if(!checkPermissionStatus("资金往来查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#capitalId").unbind();
				return false;
			
			}
		}
		
		
		function balancePayment(){
			
	
			if(!checkPermissionStatus("收支明细查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#balancePaymentId").unbind();
				return false;
			
			}
		}
		
	function productNum(){
			
	
			if(!checkPermissionStatus("产品批号查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productNumId").unbind();
				return false;
			
			}
		}
		
		
		function productProvocation(){
			
	
			if(!checkPermissionStatus("产品调拨查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productProvocationId").unbind();
				return false;
			
			}
		}
			function purchasingStatistics(){
			
	
			if(!checkPermissionStatus("采购统计分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#purchasingStatisticsId").unbind();
				return false;
			
			}
		}
		
		
		function saleStatistics(){
			
	
			if(!checkPermissionStatus("销售统计分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#saleStatisticsId").unbind();
				return false;
			
			}
		}
		

	function costLiShiFenxi(){
			
	
			if(!checkPermissionStatus("历史成本分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#costLiShiFenxiId").unbind();
				return false;
			
			}
		}
		
		
		function productLiuXiang(){
			
	
			if(!checkPermissionStatus("产品流向分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productLiuXiangId").unbind();
				return false;
			
			}
		}
			function borrowGoods(){
			
	
			if(!checkPermissionStatus("借货统计分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#borrowGoodsId").unbind();
				return false;
			
			}
		}
		
		
		function ReportAndLoss(){
			
	
			if(!checkPermissionStatus("报溢报损分析-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#ReportAndLossId").unbind();
				return false;
			
			}
		}
		
		
				
		function showIncomeCostRecord(){
			
	
			if(!checkPermissionStatus("收入成本记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#showIncomeCostRecordId").unbind();
				return false;
			
			}
		}
		

//------------------------------质量管理----------------------------------------

//库房巡检记录
function storehouseInspectionRecord(){
			
	
			if(!checkPermissionStatus("库房巡检记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#storehouseInspectionRecordId").unbind();
				return false;
			
			}
	}

//库房温度记录
function storehouseHumidityRecord(){
			
	
			if(!checkPermissionStatus("库房温度记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#storehouseHumidityRecordId").unbind();
				return false;
			
			}
	}


//产品保养记录
function productMaintenanceRecord(){
			
	
			if(!checkPermissionStatus("产品保养记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productMaintenanceRecordId").unbind();
				return false;
			
			}
	}


//产品保销毁录
function productDestructionRecord(){
			
	
			if(!checkPermissionStatus("产品销毁记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productDestructionRecordId").unbind();
				return false;
			
			}
	}


//产品召回毁录
function productRecallsRecord(){
			
	
			if(!checkPermissionStatus("产品召回记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#productRecallsRecordId").unbind();
				return false;
			
			}
	}


//员工健康档案
function employeeHealthRecords(){
			
	
			if(!checkPermissionStatus("员工健康档案-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#employeeHealthRecordsId").unbind();
				return false;
			
			}
	}



//员工健康档案
function employeeTrainingRecords(){
			
	
			if(!checkPermissionStatus("员工健康档案-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#employeeTrainingRecordsId").unbind();
				return false;
			
			}
	}


//不良事件监测记录
function eventMonitoringRecords(){
			
	
			if(!checkPermissionStatus("不良事件监测记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#eventMonitoringRecordsId").unbind();
				return false;
			
			}
	}


//设施设备维护记录
function equipmentMaintenanceRecords(){
			
	
			if(!checkPermissionStatus("设施设备维护记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#equipmentMaintenanceRecordsId").unbind();
				return false;
			
			}
	}


//质量投诉记录
function qualityComplaintRecord(){
			
	
			if(!checkPermissionStatus("质量投诉记录-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#qualityComplaintRecordId").unbind();
				return false;
			
			}
	}


//--------------------------------------系统管理--------------------------------------
//操作日志查询
function logFind(){
			
	
			if(!checkPermissionStatus("操作日志查询-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#logFindId").unbind();
				return false;
			
			}
	}


//备份账套数据
function backupAccount(){
			
	
			if(!checkPermissionStatus("备份账套数据库-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#backupAccountId").unbind();
				return false;
			
			}
	}


//单据编号设置
function installBill(){
			
	
			if(!checkPermissionStatus("单据编号设置-查看1")){
		
				parent.layer.open({
					title: "提示",
					content: localStorage.jurisdictionTips,
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						parent.layer.setTop(layero); //重点2
					}
				});
				
			  	$("#installBill").unbind();
				return false;
			
			}
	}
