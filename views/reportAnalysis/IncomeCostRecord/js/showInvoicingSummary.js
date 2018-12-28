

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
			getunit(-1);
			var laypage = layui.laypage;
			var month = getPreCurrentMonth();
			laydate.render({
				elem: '#settlementdate1',
				type: 'month',			
				value:  new Date(),
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
        		stockList();
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
                        stockList();
					}
				});
			
			}
			$(".companytypeid").change(function() {
				getCurrentNeedData(true);
				
				var warehouse = '<input  value="" data-id=""  autocomplete="off" id="warehouseId" class="layui-input warehouse" type="text" style="width: 250px !important;;height: 26px !important;line-height: 26px !important;padding-left: 0px !important;">';

				$("#duiywarehouseId").empty();
				$("#duiywarehouseId").append(warehouse);
	
				stockList();
			
			
				//业务员跟这变
				groupcompanyid=$(".companytypeid").val();
				groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
				var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#append_sale").empty().append(bandstr);
				staffList();
		
				//往来单位跟这变
				var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#append_group").empty().append(append_group);
				getunitByConfident(-1,groupcompanyid);
			
			})
			
			
				//获取仓库
		function stockList() {

			if (localStorage.groupcompanyid == "0") {
				companytypeid = $('.companytypeid option:selected').val();
			} else {
				companytypeid = localStorage.groupcompanyid;
			}

			$.ajax({
				type: "post",
				url: localStorage.serIp + "/WebGetWarehouseListByDropDown?jsoncallback=?",
				async: true,
				dataType: 'jsonp',
				data: {
					"userId": localStorage.userId,
					"userPw": localStorage.userPw,
					'database': localStorage.database,
					'groupCompanyId': companytypeid,
					'type': 1
				},
				success: function (res) {
					var data = JSON.parse(res);
					var warehouseDate = [];
					for (var i = 0; i < data.length; i++) {
						var slve = {};

						slve.warehouse_id = data[i].warehouse_id;
						slve.warehousename = data[i].warehousename + "(" + data[i].naturename + ")";

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
			
			

			
			
			function staffList() {
				$.ajax({
					type: "post",
					url: localStorage.serIp +"/WebGetEmployeeDropDownList?jsoncallback=?",
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
			staffList()
			
			
			function getCurrentNeedData(jumpFlag) {
				var beginTime = $('#settlementdate1').val();
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}
				
				var	targetstockid = $("#warehouseId").val();

				var seachContent = $(".seachContent").val();

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
					url: localStorage.serIp +"/WebInAndOutStock?jsoncallback=?",
					dataType: "jsonp",
					async: true,
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'num': limit,
						'page': curpage,
						'txtCondition': seachContent,
						'date': beginTime,
						'targetstockid':  targetstockid,
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
        $('#gridContainer').css('height',658 + 'px'); //855*0.81
     }else{
        $('#gridContainer').css('height', viewHeight*0.77 + 'px');
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
				width: 120
			}
			,
			{
                dataField: "producenum",
                width: 120,
				caption: "产品编号",
			}
			,
			{
                dataField: "producename",
                width: 152,
				caption: "产品名称"
			}, {
				
                dataField: "danwei",
                width: 100,
				caption: "产品规格"
			}, {
				
                dataField: "producemodel",
                width: 100,
				caption: "产品型号"
			},
			{
                dataField: "culdate",
                width: 80,
                dataType : 'data',						format: "yyyy-MM",

				caption: "统计时间段"
			}, {
                dataField: "lastcount",
                width: 100,
				caption: "期初库存数量"
			}, {
                dataField: "lastrealcost",
                width: 100,
                format: {
						type: "fixedPoint",
						precision: 3
				},
				caption: "期初库存单价"
			}, {
                dataField: "lastsubtotal",
                width: 100,
                format: {
						type: "fixedPoint",
						precision: 2
					},
				caption: "期初库存金额"
			}, {
                dataField: "incount",
                width: 130,
				caption: "本期进销存入库数量"
			},
			{
					dataField: "inrealcost",
					width: 130,
					caption: "本期进销存入库单价",
					format: {
						type: "fixedPoint",
						precision: 3
					}
				}
				,{
					dataField: "insubtotal",
					width: 130,
					caption: "本期进销存入库金额",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},
				{
                dataField: "outcount",
                width: 130, 
				caption: "本期进销存出库数量"
			},
			{
					dataField: "outrealcost",
					width: 130,
					caption: "本期进销存出库单价",
					format: {
						type: "fixedPoint",
						precision: 3
					}
				}
				,{
					dataField: "outsubtotal",
					width: 130,
					caption: "本期进销存出库金额",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},{
                dataField: "endcount",
                width: 100, 
				caption: "期末库存数量"
			},
			{
					dataField: "endrealcost",
					width: 100,
					caption: "期末库存单价",
					format: {
						type: "fixedPoint",
						precision: 3
					}
				}
				,{
					dataField: "endsubtotal",
					width: 100,
					caption: "期末库存金额",
					format: {
						type: "fixedPoint",
						precision: 2
					}
				},
			
			]
            ,
            summary: {
            totalItems: [{
            	 	  name: "lastcountRowsSummary",
						showInColumn: "lastcount",
					    summaryType: "custom"
					
					},
					{
						 name: "lastsubtotalRowsSummary",
						showInColumn: "lastsubtotal",
					    summaryType: "custom",
					    precision :2,valueFormat:"fixedPoint",
	                },
	                {
            	 	  name: "incountRowsSummary",
						showInColumn: "incount",
					    summaryType: "custom"
					
					},
					{
						 name: "insubtotalRowsSummary",
						showInColumn: "insubtotal",
					    summaryType: "custom",precision :2,valueFormat:"fixedPoint",
	                },
	                {
            	 	  name: "outcountRowsSummary",
						showInColumn: "outcount",
					    summaryType: "custom"
					
					},
					{
						  name: "outsubtotalRowsSummary",
						showInColumn: "outsubtotal",
					    summaryType: "custom",precision :2,valueFormat:"fixedPoint",
	                },
	                
	                {
            	 	  name: "endcountRowsSummary",
						showInColumn: "endcount",
					    summaryType: "custom"
					
					},
					{
						  name: "endsubtotalRowsSummary",
						showInColumn: "endsubtotal",
					    summaryType: "custom",precision :2,valueFormat:"fixedPoint",
	                },

	            ]  ,
	               calculateCustomSummary: function (options) {
	               	
                    if (options.name === "lastcountRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.lastcount;
                            }
                        }
                    };
                   
				     if (options.name === "lastsubtotalRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.lastsubtotal;
                            }
                        }
                    };
                    
                    
                      if (options.name === "incountRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.incount;
                            }
                        }
                    };
                    
                    
                      if (options.name === "insubtotalRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.insubtotal;
                            }
                        }
                    };
                    
                    
                        
                      if (options.name === "outcountRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.outcount;
                            }
                        }
                    };
  			   if (options.name === "outsubtotalRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.outsubtotal;
                            }
                        }
                    };

	  			 if (options.name === "endcountRowsSummary") {
     	                   if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 options.totalValue = options.totalValue + options.value.endcount;
                            }
                        }
                    };
                    
                    
	  				 if (options.name === "endsubtotalRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.id)) {
								
                           	 	options.totalValue = options.totalValue + options.value.endsubtotal;
                            }
                        }
                    };

				
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
				
				var	targetstockid = $("#warehouseId").val();

				var timestamp=new Date().getTime();

				$.ajax({
					type: "get",
					url: localStorage.serImportIp + "/	WebExportInAndOutStock?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'date': beginTime,
						'database': localStorage.database,
						'groupCompanyId': companytypeid,
						'targetstockid' : targetstockid,
						'fileName' : "进销存汇总"+timestamp+".xls"

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
