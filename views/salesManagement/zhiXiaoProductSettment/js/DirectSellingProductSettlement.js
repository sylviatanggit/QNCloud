
        //点击新增
            $(".addSettlement").click(function() {
            	
            			if(!checkPermissionStatus("其他流程-产品结算-保存1")){
					
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
            			
            			
                var  num  = randomString();
                parent.tab.tabAdd({
                    icon: '',
                    id: 'xindan' + num,
                    title: '新增直销产品结算',
                    url: 'views/salesManagement/zhiXiaoProductSettment/zhiXiaoProductOprate.html'
                });
            });


var currentPage = 1;
var totalInfo = '';
var limit = 50;
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
    getunit(5,1);
    var laypage = layui.laypage;
    var myDate = new Date();
    var currentMothFirstDay = getCurrentMothFirstDay();
    var currentDate =  myDate.getFullYear() + '-' +(myDate.getMonth() + 1)  + '-'+  myDate.getDate();
    laydate.render({
        elem: '#settlementdate1',
        value: currentMothFirstDay
    });
    laydate.render({
        elem: '#settlementdate2',
        value:  new Date()
    });
    var unit, agentId, orderNum,state;
  
    $(".state").change(function(){
        $(".find").click()
    })
    

    
    if(localStorage.groupcompanyid != "0"){
        $("#fengongsiId").css("display","none");
        settlementData(true);
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
                settlementData(true);
              
                
            }
        });
    
    }
    
    
    $(".companytypeid").change(function() {
        settlementData(true);
        //业务员跟这变
        groupcompanyid=$(".companytypeid").val();
        groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
        var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
        $("#append_sale").empty().append(bandstr);
        staffList();

        //往来单位跟这变
        var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
        $("#append_group").empty().append(append_group);
        getunitByConfident(5,groupcompanyid,1);
    
    })
    
    
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
    staffList();
    function settlementData(jumpFlag) {
        var beginTime = $('#settlementdate1').val() != "" ?   $('#settlementdate1').val() : currentMothFirstDay;
        var endTime = $('#settlementdate2').val() != "" ? $('#settlementdate2').val() : currentDate;
        if(localStorage.groupcompanyid == "0"){
            companytypeid = $('.companytypeid option:selected').val();
        }else{
            companytypeid = localStorage.groupcompanyid;
        }
        var state = $(".state").val();
        var agentId = $("#salesman").val();
        var orderNum = $(".seachContent").val();
        var unit = $('#unit').val();
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
            url: localStorage.serIp +"/WebGetOutSettlementAnRealUseInfo?jsoncallback=?",
            dataType: "jsonp",
            async: true,
            data: {
                'userId': localStorage.userId,
                'userPw': localStorage.userPw,
                'num': parseFloat(limit),
                'page':  parseFloat(currentPage),
                'orderNum':  orderNum,
                'beginTime':  beginTime,
                'agentId':  agentId,
                'endTime':  endTime,
                'checkState':  state,
                'lastType': 7,  //直销产品结算
                'companyId': unit,
                'database': localStorage.database,
                'groupCompanyId': companytypeid
            },
            success: function(res) {
         
                        parent.layer.close(jiazaiIndex);
                        var resdata = JSON.parse(res);
                        dataSource = JSON.parse(resdata.data);

                        count = resdata.count;
                        
                       
                        settlementDetail(dataSource, limit);
                        if(jumpFlag) {
							order_pages();
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


        // 根据可视区的高度判断
            var viewHeight = $(window).height();
           $('#gridContainer').css('height', viewHeight*0.82 + 'px');
       
        
       
       	//分页
			function order_pages() {
				laypage.render({
					elem: 'settlement', //注意，这里的 test1 是 ID，不用加 # 号
					layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
					limits: [50, 100, 200],
					limit: limit,
					curr: currentPage,
					group: 3,
					count: count, //数据总数，从服务端得到
					jump: function(obj,first) {
						currentPage = obj.curr;
						limit = obj.limit;
						
						if(!first){
                            settlementData(false);

						}
					}
				})
			}
        

    function settlementDetail(dataSource) {
        //展示已知数据
       	//   Dev Extreme
	   $(function () {
		    var dataGrid = $("#gridContainer").dxDataGrid({
			dataSource: dataSource,
			allowColumnReordering: true,
            showBorders: true,
            keyExpr: "ordernum",
           columnChooser: {
	            enabled: false,
				mode: "dragAndDrop",
	        },
            headerFilter: {
                visible: false
            },
            sorting: {
                mode: "none"
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
			grouping: {
	            contextMenuEnabled: false,
	            expandMode: "rowClick"
	        },
	        groupPanel: {
	            visible: false
	        },
			columns: [{
				dataField: "ordernum",
                caption: "核价单号",
                width: 160,
                fixed: true
			}
			,
			{
                dataField: "checkstatename",
                width: 70,
				caption: "单据状态",
			},
			{
                dataField: "lasttypename",
                width: 70,
				caption: "单据类型",
			}
			,
			{
                dataField: "owncompanyname",
                width: 180,
				caption: "所属公司"
			}, {
                dataField: "companyname",
                width: 180,
				caption: "往来单位"
			},
			{
                dataField: "warehousename",
                width: 100,
				caption: "备货仓库"
			}, {
                dataField: "areaname",
                width: 100,
				caption: "备货货区"
			}, {
                dataField: "goodsshelves_name",
                width: 100,
				caption: "备货货架"
            },
            {
                dataField: "totalprice",
                caption: "总金额",
                width: 90,
                alignment: "right",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                customizeText: function (arg) {
                    return arg.valueText;
                }
            }
			, {
                dataField: "agentname",
                width: 60,
				caption: "业务员",
			}, {
                dataField: "outsettlementdate",
                width: 80,
				dataType: "date",
				format: "yyyy-MM-dd",
				caption: "备库日期",
			}, {
                dataField: "operatorsidname",
                width: 60,
				caption: "制单人",
			}
				, {
                dataField: "actiondate",
                width: 80,
				dataType: "date",
				format: "yyyy-MM-dd",
				caption: "制单日期",
			}, {
                dataField: "checkername",
                width: 60,
				caption: "审核人"
			}
			, {
				dataField: "checkdate",
				width: 80,
				alignment: "right",
				dataType: "datetime",
				format: "yyyy-MM-dd",
				caption: "审核日期"
			}, {
                dataField: " ",
                width: 160,
				caption: "自定义单号"
			},
            {
                dataField: "nomo",
                width: 180,
				caption: "备注"
			}
			]
            ,
            onSelectionChanged:function(){
                dataGrid.refresh();
            },
            
        // 点击单号修改功能
        onCellClick:function(e){
            if(e.columnIndex == 1){
                 parent.tab.tabAdd({
			        icon: '',
			        id: 'ZXCPJS' + e.value,
			        title:  e.value + '直销产品详情',
			        url: 'views/salesManagement/zhiXiaoProductSettment/zhiXiaoProductOprate.html'
			    });
			   }
        },
        summary: {
            totalItems: [{
                    name: "SelectedRowsSummary",
                    showInColumn: "totalprice",
                    summaryType: "custom",
                }
            ],
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
                }
            }
             
        }
   
       
		}).dxDataGrid('instance');
        
	});

    }



       
                


    $(".find").click(function() {
        settlementData(true);
    })
    
    
   

//			回车事件
    $(".seachContent").keydown(function(event) {
        if(event.keyCode == "13") { //keyCode=13是回车键
            $('.find').click();
        }
    });

  

    $('.M-box2').on('click', 'a', function () {
        currentPage = $(this).data('page');
        settlementData(true);
    });





    $('.export').on('click', function () {
    			if(!checkPermissionStatus("其他流程-产品结算-导出1")){
					
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
   
        if ($(this).hasClass('combineExport')) {
            parent.layer.confirm('确定导出？', {
                icon: 3,
                zIndex: parent.layer.zIndex,//重点1
                title: '合并导出'
            }, function () {
                combineExport("ZXCP", ordernumList);
            });
        };
        
    });

   	
    
    



                //导出全部
    $(".allExport").click(function(){
    	
    			if(!checkPermissionStatus("其他流程-产品结算-导出1")){
					
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
        var companytypeid ="";
        var beginTime = $('#settlementdate1').val() != "" ?   $('#settlementdate1').val() : currentMothFirstDay;
        var endTime = $('#settlementdate2').val() != "" ? $('#settlementdate2').val() : currentDate;
        if(localStorage.groupcompanyid == "0"){
            companytypeid = $('.companytypeid option:selected').val();
        }else{
            companytypeid = localStorage.groupcompanyid;
        }
        var state = $(".state").val();
        var agentId = $("#salesman").val();
        var orderNum = $(".seachContent").val();
        var unit = $('#unit').val();
            var timestamp=new Date().getTime();

        $.ajax({
            type: "get",
            url: localStorage.serIp + "/WebOutSettlementAnRealUseInfoExportALL?jsoncallback=?",
            async: true,
            dataType: 'jsonp',
            data: {
                'userId': localStorage.userId,
                'userPw': localStorage.userPw,
                'num': limit,
                'page': currentPage,
                'orderNum': orderNum,
                'beginTime': beginTime,
                'agentId': agentId,
                'endTime': endTime,
                'checkState': state,
                'lastType': 7,
                'companyId': unit,
                'database': localStorage.database,
                'groupCompanyId': companytypeid,
                'filename' : "直销产品结算"+timestamp+".xls"

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
