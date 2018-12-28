


	var limit = 50;
	var curpage = 1;
	var count;
var groupcompanyid = localStorage.groupcompanyid;

        layui.use(['table', 'jquery', 'laydate'], function() {
			var table = layui.table;
			var $ = layui.jquery;
			var laydate = layui.laydate;
			$('.moreAction').hover(function() {
				$(".action").show();
			}, function() {
				$(".action").hide();
			});
			$('.action').hover(function() {
				$(".action").show();
			}, function() {
				$(".action").hide();
			});
			
			var laypage = layui.laypage;
			var month = getPreCurrentMonth();
			laydate.render({
				elem: '#settlementdate1',
				type: 'month',			
//				value:  new Date(),
				 max: month
//				format: 'yyyy-MM'  ,

			});
		
			var unit, agentId, orderNum,state;
            var groupcompanyid=localStorage.groupcompanyid;
            
			$(".state").change(function(){
				$(".find").click()
			})
						
			if(localStorage.groupcompanyid != "0"){
				$("#fengongsiId").css("display","none");
				getCurrentNeedData(true);
				scourseStockList();
			}else{
				dataFun1();
					
			}
			
			//获取公司信息
			function dataFun1() {
				$.ajax({
					type: "get",
					url: localStorage.serIp+"/WebGetAllGroupCompany?jsoncallback=?",
					dataType: "jsonp",
					async: true,
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'database': localStorage.database,
						"groupCompanyId": localStorage.groupcompanyid
					},
					success: function(res) {
						var desData = JSON.parse(res);
						var optionsStr = "";
						for(var i=0;i<desData.length;i++){
							var id= desData[i].myg_companyid;
							var name= desData[i].companyname;
							
							
							if(id == localStorage.groupcompanyid){
								optionsStr+= "<option value='"+id+"' selected='selected'>"+name+"</option>";
			
							}else{
								optionsStr+= "<option value='"+id+"'>"+name+"</option>";
			
							}
						}
						$(".companytypeid").append(optionsStr);
                        getCurrentNeedData(true);
                        scourseStockList();
					}
				});
			
			}
			$(".companytypeid").change(function() {
				//业务员跟这变
				groupcompanyid=$(".companytypeid").val();
//				groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
//				var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
//				$("#append_sale").empty().append(bandstr);
//				staffList();
		
				//供货单位
				var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#append_group").empty().append(append_group);
				getunitByConfident(-1,groupcompanyid);
				
				
				//销货单位 
				var outcompany_append = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input outcompanyid" type="text" id="outcompanyid" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#outcompany_append").empty().append(outcompany_append);
				getOutcompanyByConfident(-1,groupcompanyid);
				
				//仓库
				var duiywarehouse = '<input  value="" data-id=""  autocomplete="off" id="yuanHouse" class="layui-input yuanHouse" type="text" style="width: 250px !important;;height: 28px !important;line-height: 28px !important;">';
				$("#duiywarehouseId").empty().append(duiywarehouse);	
				scourseStockList();
			
			})
			
			getunit(-1);
			getOutcompanyByConfident(-1,localStorage.groupcompanyid);
			
			
			function getOutcompanyByConfident(type,groupcompanyid,isdisable) {
					if(typeof(isdisable) == "undefined"){
						isdisable = 0;
					}
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
							'type':type,
							'isdisable' : isdisable  // 参数0不停用，1停用，默认0
			
						},
						success: function(res) {
							var data = JSON.parse(res);
							$('#outcompanyid').bComboSelect({
								showField: 'companyname',
								keyField: 'id',
								data: data
							});
						}
					});
				}


		function scourseStockList() {
			
				
				var companytypeid = "";
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}
				
				
				$.ajax({
					type: "get",
					url: localStorage.serIp  +"/WebGetWarehouseListByDropDown?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						"userId": localStorage.userId,
						"userPw": localStorage.userPw,
						'database': localStorage.database,
						'groupCompanyId': companytypeid,
						'type':1
					},
					success: function(res) {
						var data = JSON.parse(res);
						$('#yuanHouse').bComboSelect({
							showField: 'warehousename',
							keyField: 'warehouse_id',
							data: data
						});
					}
				});
			}
		
		
			
			
//			function staffList() {
//				$.ajax({
//					type: "post",
//					url: localStorage.serIp +"/WebGetEmployeeDropDownList?jsoncallback=?",
//					async: true,
//					dataType: 'jsonp',
//					data: {
//						"userId": localStorage.userId,
//						"userPw": localStorage.userPw,
//						'database': localStorage.database,
//						'groupCompanyId': groupcompanyid
//					},
//					success: function(res) {
//						var data = JSON.parse(res);
//						$('#salesman').bComboSelect({
//							showField: 'employeename',
//							keyField: 'employeesid',
//							data: data
//						});
//					}
//				});
//			}
//			staffList()
			
			function getCurrentNeedData(jumpFlag) {
				var beginTime = $('#settlementdate1').val();
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}

				var isinvoice = $(".isinvoice").val();
				var seachContent = $(".seachContent").val();
				var incompanyid = $("#unit").val(); //供货单位
				var outcompanyid = $("#outcompanyid").val(); //销货单位 
				var targetstockid = $('#yuanHouse').val();

				
			var jiazaiIndex;
			parent.layer.open({
			  type: 3, 
			  zIndex: parent.layer.zIndex, //重点1
			  success: function(layero, index){
			  		jiazaiIndex = index;
	  			}
			});
				$.ajax({
					type: "get",
					url: localStorage.serIp +"/WebGetRevenueCostTable?jsoncallback=?",
					dataType: "jsonp",
					async: true,
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'num': limit,
						'page': curpage,
						'txtCondition': seachContent,
						'date': beginTime,
						'outcompanyid': outcompanyid,
						'isinvoice': isinvoice,
						'incompanyid': incompanyid,
						'targetstockid':targetstockid,
						'database': localStorage.database,
						'groupCompanyId': companytypeid
					},
					success: function(res) {
                        parent.layer.close(jiazaiIndex);
                        var resdata = JSON.parse(res);
                        dataSource = JSON.parse(resdata.data);
                        count = resdata.count;
        
                        tableRender(dataSource, limit);
        				if(jumpFlag) {
							public_pages();
						}
			

					}
											,
					error: function(res) {
						parent.layer.close(jiazaiIndex);
							
							parent.layer.open({
								title: "提示",
								content: '服务器异常!',
									zIndex: parent.layer.zIndex //重点1
					
							});
						
				
					}
				});
			}
			
			
			//分页
			function public_pages() {
				laypage.render({
					elem: 'footerPageId', //注意，这里的 test1 是 ID，不用加 # 号
					layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
					limits: [50, 100, 200],
					limit: limit,
					curr: curpage,
					group: 3,
					count: count, //数据总数，从服务端得到
					jump: function(obj,first) {
						curpage = obj.curr;
						limit = obj.limit;
						
						if(!first){
							getCurrentNeedData(false);

						}
					}
				})
			}
			
			
			
			
            // 根据可视区的高度判断
     var viewHeight = $(window).height();
     if(viewHeight == 855){
        $('#gridContainer').css('height',615 + 'px'); //855*0.81
     }else{
        $('#gridContainer').css('height', viewHeight*0.72 + 'px');
     }
  
   function tableRender(dataSource) {
	$(function () {
		var dataGrid = $("#gridContainer").dxDataGrid({
			dataSource: dataSource,
			allowColumnReordering: true, //判断是否可以拖动
            showBorders: true,
            keyExpr: "id",
            columnChooser: {
	            enabled: false,
				mode: "dragAndDrop",
	        },
            headerFilter: {
                visible: false
            },
            sorting: {
                mode: "none"//none，multiple
            },
            filterRow: {
                visible: false,
            },
			paging: {
				pageSize: 200,
            },
			selection: {
                mode: "multiple",
            },
			allowColumnResizing: true,
			columnFixing: {
				enabled: false
			}, 
	        groupPanel: {
	            visible: false
	        },
			columns: [{
				dataField: "warehousename",
				caption: "仓库名",
				width: 150
			}
			,
			{
                dataField: "companyname",
                width: 185,
				caption: "销货单位",
			},
			{
                dataField: "producepropertyname",
                width: 70,
				caption: "产品大类",
			}
			,
			{
                dataField: "producename",
                width: 150,
				caption: "产品名称"
			}, {
				
                dataField: "danwei",
                width: 80,
				caption: "规格"
			},
			{
                dataField: "manufacturename",
                width: 150,
				caption: "生产企业"
			}, {
                dataField: "produceunit",
                width: 60,
				caption: "单位"
			}, {
                dataField: "producecount",
                width: 80, summaryType: "custom",
				caption: "数量"
			},
			{
					dataField: "unitprice",
					width: 135,
					caption: "销售单价（不含税）",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},
				{
					dataField: 'totalprice',
					caption: '销售收入（不含税）',
					width: 135, summaryType: "custom",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},{
					dataField: "referprice",
					width: 135,
					caption: "成本单价（不含税）",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},
				{
					dataField: 'referpricetotal',
					caption: '销售成本（不含税）',
					width: 135, summaryType: "custom",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},{
					dataField: "grossmargin",
					width: 105,
					caption: "毛利率",
					format: {
						type: "percent",
						precision: 1
					}
				},
				{
					dataField: 'suppliername',
					caption: '供货单位',
					width: 185
				},
				{
					dataField: 'inordernum',
					caption: '入库单号',
					width: 160
				},{
					dataField: 'groupname',
					caption: '部门',
					width: 105
				}
			
			]
            ,
            summary: {
            totalItems: [{
            	 	  name: "producecountRowsSummary",
						showInColumn: "producecount",
					    summaryType: "custom",
					
					},
					{
						  name: "totalpriceRowsSummary",
						showInColumn: "totalprice",
					    summaryType: "custom",    precision :2,valueFormat:"fixedPoint",
	                },{
	                	 name: "referpricetotalRowsSummary",
						showInColumn: "referpricetotal",
					    summaryType: "custom",    precision :2,valueFormat:"fixedPoint",
					
					}
	            ]  ,
	               calculateCustomSummary: function (options) {
                    if (options.name === "producecountRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.producecount;
                            }
                        }
                    };
                    if(options.name === "totalpriceRowsSummary"){
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
                            options.totalValue = options.totalValue + options.value.totalprice;
//							options.totalValue = Math.round(options.totalValue * 100 ) / 100;
                            }
					}
				};
					if(options.name === "referpricetotalRowsSummary"){
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
                            options.totalValue = options.totalValue + options.value.referpricetotal;
//							options.totalValue = Math.round(options.totalValue * 100 ) / 100;
                            }
						}

                }



				},
			},
            onSelectionChanged:function(){
                dataGrid.refresh();
            },
            
            onCellClick:function(e){
			

			}

       
		}).dxDataGrid('instance');
        
	});
   }




		
	
    
            


			$(".find").click(function() {
				getCurrentNeedData(true);
            });
            
     

//			回车事件
            $(".seachContent").keydown(function(event) {
				if(event.keyCode == "13") { //keyCode=13是回车键
					$('.find').click();
				}
			});
			
       
		
			
		
			
			//导出全部
			$(".allExport").click(function(){
					if(!checkPermissionStatus("收入成本记录-导出1")){
					
						parent.layer.open({
							title: "提示",
							content: localStorage.jurisdictionTips,
							zIndex: parent.layer.zIndex //重点1
							,
							success: function(layero) {
								parent.layer.setTop(layero); //重点2
							}
						});
						return
						
					}
					
					    
				parent.layer.confirm('确定导出全部吗？', {
					icon: 3,
					zIndex: parent.layer.zIndex ,//重点1
					title: '导出全部'
				}, function(index) {
					
				parent.layer.open({
				  type: 3, 
				  zIndex: parent.layer.zIndex, //重点1,
				  success: function(layero, index){
				  		jiazaiIndex = index;
					}
				});
				
				
				var beginTime = $('#settlementdate1').val() != "" ?   $('#settlementdate1').val() : currentMothFirstDay;
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}

				var timestamp=new Date().getTime();

				$.ajax({
					type: "get",
					url: localStorage.serImportIp + "/WebExportRevenueCostTable?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'date': beginTime,
						'database': localStorage.database,
						'groupCompanyId': companytypeid,
						'fileName' : "收入成本"+timestamp+".xls"

					},
					success: function(res) {
						parent.layer.close(jiazaiIndex);
			
						var res = JSON.parse(res);
						if(res.ResultValue == '0') {
							
							parent.layer.open({
								title: "提示",
								content: '导出失败！',zIndex: parent.layer.zIndex //重点1
							});
		
						}else{
							
								var downurl =  "\\"+res.ResultValue
								while(true){
									var isExists=0;
									$.ajax({
										url:downurl,
										async:false,
										type:'HEAD',
										error:function(){
										isExists=0;
										
										},
										success:function(){
										isExists=1;
										
										}
									});
									
									
									if(isExists == 1){
										parent.layer.close(jiazaiIndex);
										window.location.href = downurl;	
				
										break;
									}
							
									
								}
							
							parent.layer.open({
								title: "提示",
								content: '导出成功！',zIndex: parent.layer.zIndex //重点1
									,
								success: function(layero,index) {
								parent.layer.setTop(layero); //重点2
							
								},
								
							});
							
								
						}
						
					},
					error: function(res) {
						parent.layer.close(jiazaiIndex);
						
					}
				});
					
				});
			})
	
			
		});
