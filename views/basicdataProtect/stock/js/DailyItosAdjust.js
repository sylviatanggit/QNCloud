



var currentPage = 1;
var totalInfo = '';
var limit = 50;
var count;
var off = true;
var groupcompanyid = localStorage.groupcompanyid;

   


layui.use(['table', 'jquery', 'laydate'], function () {
    var table = layui.table;
    var $ = layui.jquery;
    var laydate = layui.laydate;
    $('.moreAction').hover(function () {
        $(".action").show();
    }, function () {
        $(".action").hide();
    });
    $('.action').hover(function () {
        $(".action").show();
    }, function () {
        $(".action").hide();
    });
    var laypage = layui.laypage;
		
			var limit1 = 100000;
			var curpage1 = 1;
			var count1 = 0;
			var oldData =[];
			
			
			function initData(){
	
				
				$.ajax({
					type: "get",
					url:  localStorage.serIp  +"/WebGetInventoryInfoByArea?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						"userId": localStorage.userId,
						"userPw": localStorage.userPw,
						'database': localStorage.database,
						'groupCompanyId': localStorage.groupcompanyid,
						'stockarea':  sessionStorage.areaid

					},
					success: function(res) {
//						parent.layer.close(jiazaiIndex);
		
						var data = JSON.parse(res);
						
						
						if(data.length > 0){
							
							orderNum = data[0].inventorymaster_ordernum;
							
							var inventorymaster_lasttype = data[0].inventorymaster_lasttype;
							
//							sessionStorage.pandiangoodsshelves_id = data[0].goodsshelves_id;
							sessionStorage.inventorymaster_lasttype = data[0].inventorymaster_lasttype;
////							sessionStorage.produceproperty = produceproperty;
////							sessionStorage.producename = producename;
////							sessionStorage.danwei = danwei;
////							sessionStorage.producemodel = producemodel;
////							sessionStorage.manufacturer = manufacturer;
							sessionStorage.pandianWay = data[0].inventorymaster_method;
//									
									
							$(".orderNumid").val(orderNum);
							
							leftStock(true);
							
//							$("#duibiDataId").css("display","block");
							$("#fangqiId").css("display","block");
							
							$("#startPandianId").css("display","none");
							$("#PandianFanWeiId").css("display","none");
							if(inventorymaster_lasttype == 1){
								
								$("#scanCodeId").css("display","block");
								
							}else{
								
								var inventorymaster_method  = data[0].inventorymaster_method;
								
								if(inventorymaster_method == "2"){
										$("#scanCodeId").css("display","block");
								}else{
									
										$("#stockExportId").css("display","block");
										$("#shipanImportId").css("display","block");
									
								}
								
							}
							
						}
						
	

									
					},
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
			
			initData();
   
   
 			 tableRender(null)
			function leftStock(jumpFlag) {
				var seachContent = $(".seachContent").val();
				$.ajax({
					type: "get",
					url: localStorage.serIp+"/WebGetInventorySlave?jsoncallback=?",
					dataType: 'json',
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'num': limit1,
						'page': 1,
						'orderNum':orderNum,
						'database': localStorage.database,
						'type' : 0,//0 获取库存信息 //1获取已盘信息
						'txtCondition': seachContent

					},
					success: function(res) {
						var desData = JSON.parse(res);
						var data = JSON.parse(desData.data)
						
						oldData = data;
						tableRender(data);
						
						$("#shipanCountId").text(desData.realCount);
						$("#totalCountId").text(desData.realStockCount);
					

					}
				});

			}



   //DevExtreme Table
   function tableRender(dataSource) {
	//   Dev Extreme
	$(function () {
		var dataGrid = $("#gridContainer").dxDataGrid({
			dataSource: dataSource,
			allowColumnReordering: true,
			height: function() {

					return window.innerHeight-90;  
			},
            showBorders: true,
//          keyExpr: "inventoryslave_id",
           columnChooser: {
	            enabled: false,
				mode: "dragAndDrop",
	        },
            headerFilter: {
                visible: false
            },
            sorting: {
                mode: "none"//none
            },
     
            editing: {
				allowUpdating: true,
				mode: "cell",
			
			},
			paging: {
				pageSize: 10000,
            },
			selection: {
                mode: "multiple",
            },
			allowColumnResizing: true,
	  
			columns: [{
				dataField: "producename",
                caption: "产品名称",
                width: 100,	allowEditing: false,
             
			}
			,
			{
                dataField: "danwei",
                width: 100,
                caption: "规格",allowEditing: false,
             
			},
			{
                dataField: "producemodel",
                width: 100,
                caption: "型号",allowEditing: false,
               
			}
			,
			{
                dataField: "producecode",
                width: 100,
                caption: "主条码",allowEditing: false,
                
			}, {
                dataField: "producesubbarcode",
                width: 100,
                caption: "副条码-错误",allowEditing: false,
        
                
			},
			{
                dataField: "iots",
                width: 100,
                caption: "批号-错误",allowEditing: false,
			}, {
                dataField: "productiondate",
                caption: "生成日期-错误",allowEditing: false,
                width: 100,
				dataType: "date",
				format: "yyyy-MM-dd",
			}, {
                dataField: "indate",
                width: 100,
                caption: "有效期-错误",
               	dataType: "date",
				format: "yyyy-MM-dd",allowEditing: false,
			},
			{
                dataField: "manufacturer",
                width: 100,
                caption: "厂家",allowEditing: false,
                
			}
			, {
                dataField: "producesubbarcode1",
                width: 150,
                caption: "副条码",
                 fixed: true,       fixedPosition: "right",	allowReordering: false,   allowEditing: true,
              
			}, {
                dataField: "iots1",
                width: 100,
                caption: "批号",
                   fixed: true,       fixedPosition: "right",	allowReordering: false,   
                
			}, {
                dataField: "productiondate1",
                width: 100,
				dataType: "date",
				format: "yyyy-MM-dd",
                caption: "生产日期",
                   fixed: true,       fixedPosition: "right",	allowReordering: false,   
               
			}
				, {
                dataField: "indate1",
                width: 100,
				dataType: "date",
                format: "yyyy-MM-dd",
               
				caption: "有效期",
				   fixed: true,       fixedPosition: "right",	allowReordering: false,   
			}, 
			{
                dataField: "realstockcount",
                width: 80,
				caption: "数量",
                alignment: "left",
                dataType: "number",
                   fixed: true,
                   fixedPosition: "right",	allowReordering: false,   allowEditing: false,
			}
			]
            ,
//          onSelectionChanged:function(){
//              dataGrid.refresh();
//          },

        summary: {
            totalItems: [{
                    name: "SelectedRowsSummary",
                    showInColumn: "realstockcount",
                    summaryType: "sum", column: "realstockcount",
                }
            ],
          
             
        }
   
		}).dxDataGrid('instance');
        
	});
   }


				$(".PandianFanWei").click(function(){
		
				
				parent.layer.open({
					type: 2 //此处以iframe举例
						,
					title: '<img width="20px" src="image/logo.png" alt="" /><span style="margin-left:10px">盘点范围</span>',
					area: ['400px', '450px'],
					offset: "auto",
					content: 'views/basicdataProtect/stock/DailyPandianSelectWay.html',
					zIndex: parent.layer.zIndex //重点1
						,
					success: function(layero,index22) {
						parent.layer.setTop(layero); //重点2
						var body = layer.getChildFrame('body', 'index');
						paentIfarame = layero.find("iframe")[0].contentWindow.document;

						$(".configInfo",paentIfarame).click(function() {
							var  jiazaiIndex;
							parent.layer.open({
							  type: 3, zIndex: parent.layer.zIndex ,	//重点1
							  success: function(layero, index){
							  	jiazaiIndex = index;
					  			}
							});
							
							
							var goodsshelves_id = $("#duiyinggoodsshelvesId",paentIfarame).val();
							var inventorymaster_lasttype = $(".inventorymaster_lasttype",paentIfarame).val();
							var produceproperty = $(".produceproperty",paentIfarame).val();
							
							var producename = $(".producename",paentIfarame).val();
							var danwei = $(".danwei",paentIfarame).val();
							var producemodel = $(".producemodel",paentIfarame).val();
							var manufacturer = $(".manufacturer",paentIfarame).val();
							var pandianWay = $(".pandianWay",paentIfarame).val();
							
							
							sessionStorage.pandiangoodsshelves_id = goodsshelves_id;
							sessionStorage.inventorymaster_lasttype = inventorymaster_lasttype;
							sessionStorage.produceproperty = produceproperty;
							sessionStorage.producename = producename;
							sessionStorage.danwei = danwei;
							sessionStorage.producemodel = producemodel;
							sessionStorage.manufacturer = manufacturer;
							sessionStorage.pandianWay = pandianWay;
							
							
							$.ajax({
								type: "get",
								url: localStorage.serIp+"/WebGetStockInfoByInventory?jsoncallback=?",
								async: true,
								dataType: 'jsonp',
								data: {
									"userId": localStorage.userId,
									"userPw": localStorage.userPw,
									'database': localStorage.database,
									'stockarea': sessionStorage.areaid,
//											'inventorymaster_method' :pandianWay,
									'targetstockId' : "",
									'brand' :manufacturer,
									'producemodel' :producemodel,
									'danwei' :danwei,
									'producename' :producename,
									'produceproperty' :produceproperty,
									'inventorymaster_lasttype' :inventorymaster_lasttype,
									'goodsshelves_id' :goodsshelves_id,
								},
								success: function(res) {
									var getData = JSON.parse(res);
									parent.layer.close(jiazaiIndex); 
									oldData = getData;
									tableRender(getData);
									
									if(getData.length > 0){
										$("#startPandianId").css("display","inline-block");
										
									}

									
									parent.layer.close(index22); 
									
								}
							});
						})
					
					},
					cancel: function() {
					},
					end: function() {
					
					}
				});
					
		
			})
});
