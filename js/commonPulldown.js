	//获取仓库
	function getStockList() {
		
		var companytypeid = "";
		if(localStorage.groupcompanyid == "0"){
			companytypeid = $('.companytypeid option:selected').val();
		}else{
			companytypeid = localStorage.groupcompanyid;
		}

		$.ajax({
			type: "post",
			url:  localStorage.serIp  + "/WebGetWarehouseListByDropDown?jsoncallback=?",
			async: true,
			dataType: 'jsonp',
			data: {
				"userId": localStorage.userId,
				"userPw": localStorage.userPw,
				'database': localStorage.database,
				'groupCompanyId': companytypeid
				,	'type': 1
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
				
				$('#warehouseId').bComboSelect({
					showField: 'warehousename',
					keyField: 'warehouse_id',
					data: warehouseDate
				});

			}
		});
	}		
	
	
	//获取货区
	function getStockareaList(id) {
		
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
		function getgoodsshelvesList(id) {
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
			
		$("body").delegate("#duiywarehouseId .cs_over","mousedown",function(){
			
			var bandstr = '<input value="" data-id="" autocomplete="off" id="duiyingstockareaId" class="layui-input stockarea" type="text" style="width: 250px;height: 26px !important;line-height: 26px !important;padding-left: 10px !important;">';
			
			$("#stockareaId").empty();
			$("#stockareaId").append(bandstr);
			
			var produceseriesstr = '<input value="" data-id="" autocomplete="off" id="duiyinggoodsshelvesId" class="layui-input goodsshelves" type="text" style="width: 250px;height: 26px !important;line-height: 26px !important;padding-left: 10px !important;">';
		
			$("#goodsshelvesId").empty();
			$("#goodsshelvesId").append(produceseriesstr);
			
			getStockareaList($(this).attr("pkey"));
	
	
	
			
		})
		

			
		$("body").delegate("#stockareaId .cs_over","mousedown",function(){
			 

					$("#selectStockFlagId").val($(".cs_container .stockarea").val());
					$("#selectStockFlagId").attr('data-id',$("#duiyingstockareaId").val());
					
							 
					
			var produceseriesstr = '<input value="" data-id="" autocomplete="off" id="duiyinggoodsshelvesId" class="layui-input goodsshelves" type="text" style="width: 250px;height: 26px !important;line-height: 26px !important;padding-left:10px !important;">';
				
					$("#goodsshelvesId").empty();
					$("#goodsshelvesId").append(produceseriesstr);
					
					
					
					getStockareaList($(this).attr("pkey"));
		
				
		
		});
			
	
	//获取所属部门
function getOwnGroupList() {	
			
	var companytypeid = "";
		if(localStorage.groupcompanyid == "0"){
			companytypeid = $('.companytypeid option:selected').val();
		}else{
			companytypeid = localStorage.groupcompanyid;
		}

	$.ajax({
		type: "get",
		url:  localStorage.serIp  +"/WebGetEmployeegrouptable?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': companytypeid
		},
		success: function(res) {
			var data = JSON.parse(res);
			data =data[0].children;
			
			$('#owngroup').bComboSelect({
				showField: 'name',
				keyField: 'id',
				data: data
			});

		}
	});
}