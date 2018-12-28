

//获取合同
function getduiyingHeTong(groupcompanyid,company,contract_type) {
	
		$.ajax({
			type: "get",
			url: localStorage.serIp+"/WebGetContractDropList?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"groupCompanyId": groupcompanyid,
				"contract_companyid" : company,
				'contract_type' : contract_type

			},
			success: function(res) {
				var data = JSON.parse(res);
				

				$('#contract_id').bComboSelect({
					showField: 'contract_name',
					keyField: 'contract_id',
					data: data
				});
		
			}
		});
}

//往来单位
function getunit(groupcompanyid,type) {
		
		$.ajax({
			type: "get",
			url: localStorage.serIp+"/WebGetCompanyByDropList?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"groupCompanyId":groupcompanyid,
				'type':type
			},
			success: function(res) {
				var data = JSON.parse(res);
				$('#unit').bComboSelect({
					showField: 'companyname',
					keyField: 'id',
					data: data
				});
			}
		});
	}



//往来单位
function getunitByConfident(type,groupcompanyid) {
		
		$.ajax({
			type: "get",
			url: localStorage.serIp+"/WebGetCompanyByDropList?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"groupCompanyId": groupcompanyid,
				'type':type
			},
			success: function(res) {
				var data = JSON.parse(res);
				$('#unit').bComboSelect({
					showField: 'companyname',
					keyField: 'id',
					data: data
				});
			}
		});
	}


//获取货区
function getStockarea(id) {
	
		$.ajax({
			type: "get",
			url: localStorage.serIp+"/WebGetGoodsareaListByDropDown?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"warehouseId": id

			},
			success: function(res) {
				var data = JSON.parse(res);
				$('#duiyingstockareaId').bComboSelect({
					showField: 'areaname',
					keyField: 'houseareaid',
					data: data
				});
		
			}
		});
}
		
			
	//获取货架
	function getgoodsshelves(id) {
			$.ajax({
				type: "get",
				url: localStorage.serIp+"/WebGetGoodsShelves?jsoncallback=?",
				dataType: "jsonp",
				async: true,
				data: {
					'userId': localStorage.userId,
					'userPw': localStorage.userPw,
					'database': localStorage.database,
					"goodsareaid": id,
					'txtCondition': "",
					'num':"10000",
					'page':"1"
				},
				success: function(res) {
					var data = JSON.parse(res);
					var goodsshelvesdata = JSON.parse(data.data);
					$('#duiyinggoodsshelvesId').bComboSelect({
						showField: 'goodsshelves_name',
						keyField: 'goodsshelves_id',
						data: goodsshelvesdata
					});
			
				}
			});
		}

	//获取仓库		
	function stockList(groupcompanyid) {
		$.ajax({
			type: "get",
			url:localStorage.serIp  + "/WebGetWarehouseListByDropDown?jsoncallback=?",
			async: true,
			dataType: 'jsonp',
			data: {
				"userId": localStorage.userId,
				"userPw": localStorage.userPw,
				'database': localStorage.database,
				'groupCompanyId': groupcompanyid
			},
			success: function(res) {
				var data = JSON.parse(res);
				var warehouseDate =[];
				for(var i=0;i < data.length;i++){
					var slve = {};
					
					slve.warehouse_id = data[i].warehouse_id;
					slve.warehousename =  data[i].warehousename + "(" +data[i].naturename + ")";
					
					warehouseDate.push(slve);
				}
						
				
				$('#warehouse').bComboSelect({
					showField: 'warehousename',
					keyField: 'warehouse_id',
					data: warehouseDate
				});
			}
		});
	}
	
//获取员工
function staffList(groupcompanyid) {
	$.ajax({
		type: "get",
		url:  localStorage.serIp  +"/WebGetEmployeeDropDownList?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': groupcompanyid
		},
		success: function(res) {
			var data = JSON.parse(res);
			$('#salesman').bComboSelect({
				showField: 'employeename',
				keyField: 'employeesid',
				data: data
			});

		}
	});
}


//获取员工
function staffListByConfident(groupcompanyid) {
	$.ajax({
		type: "get",
		url:  localStorage.serIp  +"/WebGetEmployeeDropDownList?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': groupcompanyid
		},
		success: function(res) {
			var data = JSON.parse(res);
			$('#salesman').bComboSelect({
				showField: 'employeename',
				keyField: 'employeesid',
				data: data
			});

		}
	});
}