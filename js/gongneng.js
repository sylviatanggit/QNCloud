
function gongNengQieKuai(){
	
	
	//我的企业
	if(!checkGongNengPermissionStatus("企业信息1")){
		$("#qiYeInfoId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("我的员工1")){
		$("#myStaffId").css("display","none")
	}
	
	
	//往来单位
	if(!checkGongNengPermissionStatus("往来单位管理1")){
		$("#myUnitId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("购销合同管理1")){
		$("#contractId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("授权书管理1")){
		$("#gongHuoShouQuanId").remove();
	}
	
	//我的产品
	if(!checkGongNengPermissionStatus("我的产品注册证1")){
		$("#MyAllProductId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("我的所有产品1")){
		$("#MyAllGuiGeId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("工具组套管理1")){
		$("#GJZTID").remove();
	}
	
	if(!checkGongNengPermissionStatus("产品组套管理1")){
		$("#CPZTID").remove();
	}
	
	
	//采购管理
	if(!checkGongNengPermissionStatus("订货合约1")){
		$("#DHHYId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("入库验收1")){
		$("#RKYSId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("采购退货1")){
		$("#CGTHId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("赠送入库1")){
		$("#ZSRKId").css("display","none")
	}
	
	
	//直销管理
	if(!checkGongNengPermissionStatus("标准流程-备货申请1")){
		$("#ZXBHSQId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("标准流程-手术备货1")){
		$("#ZXSSBHId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("标准流程-确认取货1")){
		$("#ZXQRQHId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("标准流程-实耗清点1")){
		$("#ZXSHQDId").css("display","none")
	}
	if(!checkGongNengPermissionStatus("快捷流程-备库结算1")){
		$("#ZXBKJSId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("快捷流程-备库实耗1")){
		$("#ZXKSJSId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("其他流程-产品结算1")){
		$("#ZXCPJSId").css("display","none")
	}
	
	
	//分销管理
	if(!checkGongNengPermissionStatus("分销合约1")){
		$("#FXHYId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("出库验出1")){
		$("#CKYCId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("分销退货1")){
		$("#FXTHId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("赠送出库1")){
		$("#ZSCKId").css("display","none")
	}
	
	
	//借货管理
	if(!checkGongNengPermissionStatus("借入管理1")){
		$("#JRGLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("借出管理1")){
		$("#JCGLId").css("display","none")
	}
	
	
		
	//试剂管理
	if(!checkGongNengPermissionStatus("试剂入库管理1")){
		$("#SJRKId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("试剂出库管理1")){
		$("#SJCKId").css("display","none")
	}
	
	
	if(!checkGongNengPermissionStatus("试剂入库管理1") && !checkPermissionStatus("试剂出库管理1")){
		$("#SJManagerId").remove()
	}



	
	//库存管理
	if(!checkGongNengPermissionStatus("库存初始化1")){
		$("#CCKSHId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("库存信息查询1")){
		$("#CCXXId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("仓库设置管理1")){
		$("#CKGLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("仓库调拨1")){
		$("#CKDBId").css("display","none")
	}
	if(!checkGongNengPermissionStatus("盘盈盘亏1")){
		$("#PYPKId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("报溢报损1")){
		$("#BYBSId").css("display","none")
	}
	if(!checkGongNengPermissionStatus("盘点记录查询1")){
		$("#PDJLId").css("display","none")
	}
	if(!checkGongNengPermissionStatus("库存调整建议1")){
		$("#CCDZJYId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("仓库台账记录1")){
		$("#CKTZId").css("display","none")
	}
	

		
	
	
	//财务管理
	if(!checkGongNengPermissionStatus("采购核价1")){
		$("#CGHJId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("分销核价1")){
		$("#FXHJId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("直销核价1")){
		$("#ZXHJId").css("display","none")
	}
	 
	if(!checkGongNengPermissionStatus("销售收款单1")){
		$("#SKDId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("采购付款单1")){
		$("#FKDId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("采购发票签入单1")){
		$("#CGFPQRDId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("分销发票签出单1")){
		$("#FXFPQKDId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("直销发票签出单1")){
		$("#ZXFPQCId").css("display","none")
	}


	//报表分析
	if(!checkGongNengPermissionStatus("财务对账单1")){
		$("#CFDZDId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("直销单据查询1")){
		$("#ZXDJCXId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("资金往来查询1")){
		$("#ZJWLCXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("收支明细查询1")){
		$("#SZMXCXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("产品批号查询1")){
		$("#CPPHCXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("产品调拨查询1")){
		$("#CPDBCXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("采购统计分析1")){
		$("#CGTJFXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("销售统计分析1")){
		$("#XSTJFXID").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("历史成本分析1")){
		$("#LSCBFXId").css("display","none")
	}
					
	if(!checkGongNengPermissionStatus("产品流向分析1")){
		$("#CPLXFXId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("借货统计分析1")){
		$("#JHTJFXId").css("display","none")
	}
						
	if(!checkGongNengPermissionStatus("报溢报损分析1")){
		$("#BYBSFXId").css("display","none")
	}
	
	if(localStorage.groupcompanyid != 0){
			$("#SRCBJLId").remove();
	}else{
		if(!checkGongNengPermissionStatus("收入成本记录1") || !checkPermissionStatus("收入成本记录-查看1")){
		
			$("#SRCBJLId").remove();
		
		}
	}

	
	//质量管理
	if(!checkGongNengPermissionStatus("库房巡检记录1")){
		$("#CFXJJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("库房温度记录1")){
		$("#CFWDJLId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("产品保养记录1")){
		$("#CPBYJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("产品销毁记录1")){
		$("#CPXHJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("产品召回记录1")){
		$("#CPZHJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("员工健康档案1")){
		$("#YGJKDAId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("员工培训记录1")){
		$("#YGBXJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("不良事件监测记录1")){
		$("#BLSJJCJLId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("设施设备维护记录1")){
		$("#SSSBWHJLId").css("display","none")
	}
					
	if(!checkGongNengPermissionStatus("质量投诉记录1")){
		$("#ZLTSJLId").css("display","none")
	}
	
	
	//系统管理
	if(!checkGongNengPermissionStatus("操作日志查询1")){
		$("#CZRZId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("备份账套数据库1")){
		$("#BFSJKId").css("display","none")
	} 
	
	if(!checkGongNengPermissionStatus("结存并新开账套1")){
		$("#XKZTBJCId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("新开账套1")){
		$("#XKZTId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("期初开账1")){
		$("#JCKZId").css("display","none")
	}
	
	if(!checkGongNengPermissionStatus("单据编号设置1")){
		$("#DJBHSZId").css("display","none")
	}
	
	
	
}

/**
 * 判断是否有功能权限
 * @param {Object} str
 */
function checkGongNengPermissionStatus(str){

	var flag = false;
	if(localStorage.saasoperition.indexOf(str) !=-1){
		flag = true;
	}
	

	return flag
}
		

function operationQunXian(){
	
}

