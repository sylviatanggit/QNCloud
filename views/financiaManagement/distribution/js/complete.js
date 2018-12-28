
        var limit = 50;
        var currentPage = 1;
        var totalInfo = '';
        var count;

		layui.use(['table', 'jquery', 'element', 'laydate'], function() {
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
			var myDate = new Date();
			var currentMothFirstDay = getCurrentMothFirstDay();
			var currentDate =  myDate.getFullYear() + '-' + (myDate.getMonth() + 1)  + '-'+  myDate.getDate();
			laydate.render({
				elem: '#completedate1',
				value: currentMothFirstDay
			});

			laydate.render({
				elem: '#completedate2',
				value: new Date()
			});
			
			var groupcompanyid=localStorage.groupcompanyid;
			 if(localStorage.groupcompanyid != "0"){
				$("#fengongsiId").css("display","none");
				completeData(currentPage, limit, totalInfo);
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
						completeData(currentPage, limit, totalInfo);
						
					}
				});
			
			}
	
			

		
	
	
			var count;

	
			
			staffList();
				getowngroupList(groupcompanyid);
			
			$(".companytypeid").change(function() {
		
			
				completeData(currentPage, limit, totalInfo);
				//业务员跟这变
				groupcompanyid=$(".companytypeid").val();
				groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
				var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#append_sale").empty().append(bandstr);
				staffList();
				//来单位跟这变
				var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#append_group").empty().append(append_group);
				getunitByConfident(-1,groupcompanyid,1);
				
							
				var addGroup = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input owngroup" type="text" id="owngroup" style="width: 250px;height: 28px;line-height: 28px;">';
				$("#addGroup").empty().append(addGroup);
				getowngroupList(groupcompanyid);
				
			
			})
			
     	
        	$("body").delegate(".owngroup","change",function(){
		
						
					groupcompanyid=$(".companytypeid").val();
					
					groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
					
					var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
					$("#append_sale").empty().append(bandstr);
					
					getstaffList(groupcompanyid,$("#owngroup").val());
					
		
				
			
			});
			
			
	        var data;
			getunit(-1,1);
			function completeData(currentPage, limit) {
				var unit = $('#unit').val();
				var agentId = $("#salesman").val();
				var orderNum = $(".seachContent").val();
				
				var beginTime = $('#completedate1').val() != "" ?   $('#completedate1').val() : currentMothFirstDay;
				var endTime = $('#completedate2').val() != "" ? $('#completedate2').val() : currentDate;
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}
				
				var employeedep = $('#owngroup').val();
				
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
					url: localStorage.serIp + "/WebGetOutSettlementInfo?jsoncallback=?",
					dataType: "jsonp",
					async: true,
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'num': limit,
						'page': currentPage,
						'orderNum': orderNum,'companyId': unit,
						'agentId': agentId,
						'beginTime': beginTime,
						'endTime': endTime,
						'database': localStorage.database,
						'checkState': 1,
						'lastType': -610,
						'groupCompanyId': companytypeid,
						'employeedep' :employeedep

					},
					success: function(res) {
						$('.totalInfo').children().remove();
				parent.layer.close(jiazaiIndex);
				var initData = JSON.parse(res);
				 data = JSON.parse(initData.data);
				 
				count = initData.count;
				totalInfo = count;
				var totalInfoTag = '<span>' + '共' + totalInfo + '条' + '</span>';
				$('.totalInfo').append(totalInfoTag);
				complete(data, limit);
				pagination(currentPage, limit, count);
				$('.layui-laypage-limits').css('display','block');
			
					
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
			
			
		
				

			function complete(data, limit) {
				
			var dataGrid = $("#gridContainer").dxDataGrid({
				dataSource: data,
				keyExpr: "ordernum",
				allowColumnReordering: true,
				showBorders: true,
				paging: {
					pageSize: 200,
				},
				sorting: {
					mode: "none"//none
				},
				selection: {
					mode: "multiple"
				},
				filterRow: {
					visible: false,
					applyFilter: "auto"
				},
				headerFilter: {
					visible: false
				},
				allowColumnResizing: true,
				columnFixing: {
					enabled: false
				},
				
				columns: [{
					dataField: "ordernum",
				    width: 160,
					caption: "出库核价单号",
					fixed: true,
				}
					,
				{
					dataField: "statesname",
					width: 90,
					caption: "操作状态",
				
				},
				{
					dataField: "companyname",
					width: 180,
					caption: "往来单位"
				},
				{
					dataField: "owncompanyname",
					width: 180,
					caption: "所属公司",
				},
				{
					dataField: "totalprice",
					width: 90,
					caption: "总金额",
					format: {
						type: "fixedPoint",
						precision: 2
					},
					customizeText: function (arg) {
						return arg.valueText;
					}
				},
				{
					dataField: 'nomoney',
					caption: '待收',
					width: 90,
					format: {
						type: "fixedPoint",
						precision: 2
					},
					customizeText: function (arg) {
						return arg.valueText;
					}
				},
				{
					dataField: 'noinvoce',
					caption: '欠票',
					width: 100,
					format: {
						type: "fixedPoint",
						precision: 2
					},
					customizeText: function (arg) {
						return arg.valueText;
					}
				}, {
					dataField: 'owngroupname',
					caption: '所属部门',
					width: 100,
			
					
				},{
					dataField: 'agentname',
					caption: '业务员',
					width: 60
				},{
					dataField: 'outsettlementdate',
					caption: '核价日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80
				},
				{
					dataField: 'operatorsidname',
					caption: '制单人',
					width: 60,
				}, {
					dataField: 'actiondate',
					caption: '制单日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80,
				}, {
					dataField: 'checkername',
					caption: '审核人',
					width: 60,
				},{
					dataField: 'checkdate',
					caption: '审核日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80,
				},{
					dataField: 'checkstatename',
					caption: '单据状态',
					width: 80,
				}, {
					dataField: 'lastnum',
					caption: '关联单号',
					width: 160,
				},{
					dataField: 'linkordernum',
					caption: '联动单号',
					width: 160,
				}, {
					dataField: 'mynum',
					caption: '自定义单号',
					width: 160,
				}, {
					dataField: 'nomo',
					caption: '备注',
					width: 180,
				},
				]
				,
					onSelectionChanged:function(){
                    dataGrid.refresh();
                },
				summary: {
                totalItems: [{
                        name: "SelectedRowsSummary",
                        showInColumn: "totalprice",
                        summaryType: "custom",
                    },{
                        name: "SelectedRowsSummarry",
                        showInColumn: "nomoney",
                        summaryType: "custom",
					},
				{
                        name: "SelectedRowsSummarrry",
                        showInColumn: "noinvoce",
                        summaryType: "custom",
                    }],
				
                calculateCustomSummary: function (options) {
                    if (options.name === "SelectedRowsSummary") {
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.ordernum)) {
								
                            options.totalValue = options.totalValue + options.value.totalprice;
							options.totalValue = Math.round(options.totalValue * 100 ) / 100;
                            }
                        }
                    };
                    if(options.name === "SelectedRowsSummarry"){
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.ordernum)) {
                            options.totalValue = options.totalValue + options.value.nomoney;
							options.totalValue = Math.round(options.totalValue * 100 ) / 100;
                            }
					}
				};
					if(options.name === "SelectedRowsSummarrry"){
                        if (options.summaryProcess === "start") {
                            options.totalValue = 0;
                        };
                        if (options.summaryProcess === "calculate") {
                            if (options.component.isRowSelected(options.value.ordernum)) {
                            options.totalValue = options.totalValue + options.value.noinvoce;
							options.totalValue = Math.round(options.totalValue * 100 ) / 100;
                            }
						}

                }



				},
		      
                 
			},
			onCellClick:function(e){
			if(e.columnIndex == 1){
			//点击单号跳转
			parent.tab.tabAdd({
            icon: '',
            id: 'FXWDHJ' + e.data.ordernum,
            title: e.data.ordernum + '分销核价',
            url: 'views/financiaManagement/distribution/addDistribution2.html'
    });

	
				}

			}
           
				}).dxDataGrid('instance');



			
				
			}
			
			
			
			// 根据可视区的高度判断
	var viewHeight = $(window).height();
	if (viewHeight == 855) {
		$('#gridContainer').css('height', 650 + 'px'); //855*0.76
	} else {
		$('#gridContainer').css('height', viewHeight * 0.7 + 'px');
	}


	// 获取当前页面渲染数量
	$('#lay-ignore').change(function () {
		limit = $(this).children('option:selected').val();
		completeData(currentPage, limit, totalInfo);
	});


	$('.M-box2').on('click', 'a', function () {
		currentPage = $(this).data('page');
		completeData(currentPage, limit, totalInfo);
	});



	//分页
	function pagination(currentPage, limit, totalInfo) {
		$('.M-box2').empty();

		if (totalInfo == 0) {
			return;
		}
		$('.M-box2').pagination({
			current: currentPage,
			totalData: totalInfo,
			showData: limit,
			pageCount: Math.floor(totalInfo / limit),
			mode: 'fixed',
			isHide: true,
			jump: true,
			callback: function (api) {
				currentPage = api.getCurrent();
				completeData(currentPage, limit, totalInfo);
			}
		});
	}


			$(".find").click(function() {
	
				completeData(currentPage, limit, totalInfo);
			});
		
	
			//			回车事件
            $(".seachContent").keydown(function(event) {
				if(event.keyCode == "13") { //keyCode=13是回车键
					$('.find').click();
				}
			});
			

	
		
			
	//合并导出
				
$('.export').on('click', function () {
	
			if(!checkPermissionStatus("分销核价-导出1")){
					
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
				
	
	
    var ordernumList = '';
    var arrForOderNum = [];
    var danhao = ' ';
    var danhao = $('.dx-selection');
    var newarr = [];
    danhao.get().forEach(function (currentValue, index, arr) {
        danhao = "\'" + currentValue.childNodes[1].innerText + "\'";
        newarr = arrForOderNum.push(danhao);
        ordernumList = arrForOderNum.join(",");
    });
    if (ordernumList.length == 0) {
        parent.layer.open({
            title: "提示",
            zIndex: parent.layer.zIndex, //重点1,
            content: '请选择要导出的单据!'
        });
        return;
    };

       // 合并导出
        parent.layer.confirm('确定导出？', {
            icon: 3,
            zIndex: parent.layer.zIndex,//重点1
            title: '合并导出'
        }, function () {
            combineExport("FXHJ", ordernumList);
        });
	
	
});


		
	
	
    		//导出全部
		$(".allExport").click(function(){
			
				if(!checkPermissionStatus("分销核价-导出1")){
					
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
				
				var unit = $('#unit').val();
				var agentId = $("#salesman").val();
				var orderNum = $(".seachContent").val();
				
				var beginTime = $('#completedate1').val() != "" ?   $('#completedate1').val() : currentMothFirstDay;
				var endTime = $('#completedate2').val() != "" ? $('#completedate2').val() : currentDate;
				if(localStorage.groupcompanyid == "0"){
					companytypeid = $('.companytypeid option:selected').val();
				}else{
					companytypeid = localStorage.groupcompanyid;
				}
							var timestamp=new Date().getTime();
	
				$.ajax({
					type: "get",
					url: localStorage.serIp + "/WebGetOutsettlementExportInfo?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'orderNum': orderNum,'companyId': unit,
						'agentId': agentId,
						'beginTime': beginTime,
						'endTime': endTime,
						'database': localStorage.database,
						'checkState': 1,
						'lastType': -610,
						'groupCompanyId': companytypeid,
						'filename' : "分销核价"+timestamp+".xls"
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
							
							var url = "\\"+res.ResultValue
							while(true){
								var isExists=0;
								$.ajax({
									url:url,
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
									window.location.href = url;	
			
									break;
								}
						
								
							}
							
							parent.layer.open({
								title: "提示",
								content: '导出成功！',zIndex: parent.layer.zIndex //重点1
									,
								success: function(layero,index) {
								parent.layer.setTop(layero); //重点2
//									window.location.href = url;	
							
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