


var curpage = 1;

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
            var groupcompanyid=localStorage.groupcompanyid;
            
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
				off= true;
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
			staffList()
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
					url: localStorage.serIp +"/WebGetDirectReadyStockRealUse?jsoncallback=?",
					dataType: "jsonp",
					async: true,
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'num': limit,
						'page': curpage,
						'txtCondition': orderNum,
						'beginTime': beginTime,
						'agentId': agentId,
						'endTime': endTime,
						'checkState': state,
						'companyId': unit,
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
							settlement_true_pages();
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
     if(viewHeight == 855){
        $('#gridContainer').css('height',694 + 'px'); //855*0.81
     }else{
        $('#gridContainer').css('height', viewHeight*0.82 + 'px');
     }
  
     //DevExtreme Table
   function tableRender(dataSource) {
	//   Dev Extreme
	$(function () {
		var dataGrid = $("#gridContainer").dxDataGrid({
			dataSource: dataSource,
			allowColumnReordering: false,
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
                mode: "none"//none
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
				dataField: "ordernum",
				caption: "备库实耗单号",
				width: 160
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
			}
			, {
                dataField: "agentname",
                width: 60,
				caption: "业务员",
			}, {
                dataField: "outsettlementdate",
                width: 80,
				dataType: "date",
				format: "yyyy-M-d",
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
				format: "yyyy-M-d",
				caption: "制单日期",
			}, {
                dataField: "checkername",
                width: 60,
				caption: "审核人",
			}
			, {
				dataField: "checkdate",
				width: 80,
				alignment: "right",
				dataType: "datetime",
				format: "yyyy-M-d",
				caption: "审核日期"
			}, {
                dataField: "mynum",
                width: 120,
				caption: "自定义单号"
			}, {
                dataField: "nomo",
                width: 180,
				caption: "备注"
			}
			]
            ,
            onSelectionChanged:function(){
                dataGrid.refresh();
            },
            
            onCellClick:function(e){
			
				if(e.columnIndex == 1 && e.rowType == "data"){
					parent.tab.tabAdd({
						icon: '',
						id: 'ZXBKJS' + e.value,
						title: e.value + '直销快速实耗详情',
						url: 'views/salesManagement/ZXKUJS/addSettlement.html'
					});
				}
				
 
			}

       
		}).dxDataGrid('instance');
        
	});
   }




            //分页
			function settlement_true_pages() {
				laypage.render({
					elem: 'settlement', //注意，这里的 test1 是 ID，不用加 # 号
					layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
					limits: [50, 100, 200],
					limit: limit,
					curr: curpage,
					group: 3,
					count: count, //数据总数，从服务端得到
					jump: function (obj, first) {
						curpage = obj.curr;
						limit = obj.limit;
						if (!first) {
							settlementData(false);
						}
					}
				})
			}


    // 获取当前页面渲染数量
    // $('#lay-ignore').change(function () {
    //     limit = $(this).children('option:selected').val();
    //     settlementData(true);
    // });
			
		
			$(".find").click(function() {
				settlementData(true);
			});
			

            
            $('.M-box2').on('click', 'a', function () {
                currentPage = $(this).data('page');
				settlementData(true);
            });

		
			//点击新增
			$(".addSettlement").click(function() {
				
					if(!checkPermissionStatus("快捷流程-备库实耗-保存1")){
					
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
					title: '新增直销快速实耗结算',
					url: 'views/salesManagement/ZXKUJS/addSettlement.html'
				});
			});

            //		回车事件
            $(".seachContent").keydown(function(event) {
				if(event.keyCode == "13") { //keyCode=13是回车键
					$('.find').click();
				}
			});
			
            
            //合并导出功能
         $('.export').on('click', function () {
	
				if(!checkPermissionStatus("快捷流程-备库实耗-导出1")){
					
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
            combineExport("ZXSH", ordernumList);
        });
    };
    
});

			
		
       
			

			
		
			
			//导出全部
			$(".allExport").click(function(){
				
						if(!checkPermissionStatus("快捷流程-备库实耗-导出1")){
					
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
					url: localStorage.serIp + "/WebDirectReadyStockRealUseExport?jsoncallback=?",
					async: true,
					dataType: 'jsonp',
					data: {
						'userId': localStorage.userId,
						'userPw': localStorage.userPw,
						'txtCondition': orderNum,
						'beginTime': beginTime,
						'agentId': agentId,
						'endTime': endTime,
						'checkState': state,
						'companyId': unit,
						'database': localStorage.database,
						'groupCompanyId': companytypeid,
						'filename' : "备库实耗"+timestamp+".xls"

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
