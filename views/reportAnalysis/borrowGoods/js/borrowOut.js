
    // 根据可视区的高度判断
	var viewHeight = $(window).height();
	if (viewHeight == 855) {
		$('#gridContainer').css('height', 650 + 'px'); //855*0.74
	} else {
		$('#gridContainer').css('height', viewHeight * 0.68 + 'px');
	}

    
   //点击单号修改功能
   $('.demo-container').on('click', ' .dx-datagrid-rowsview .dx-column-lines > td:nth-child(2)', function () {
	var id = $(this).parent().attr('aria-rowindex');
    sessionStorage.borrowOut_order =  $(this).text();
	parent.layer.open({
        type: 2 //此处以iframe举例
            ,
        title: '<img width="20px" src="image/logo.png" alt="" /><span style="margin-left:10px">借货出库明细</span>',
        area: ['85%', '90%'],
        offset: "rb",
        content: 'views/reportAnalysis/borrowGoods/borrowOut/detail.html',
        zIndex: layer.zIndex //重点1
            ,
        success: function(layero) {
            parent.layer.setTop(layero); //重点2
        },
        end: function(layero) {
                if(sessionStorage.borrow_order){
                    sessionStorage.removeItem("borrowOut_order");
                }
                if(sessionStorage.seachOutContent){
                    sessionStorage.removeItem("seachOutContent");
                }
        }
    });
});


var limit = 50;
var currentPage = 1;
var totalInfo = '';
var count;

layui.use(['table', 'jquery', 'laydate', 'laypage'], function() {
    var table = layui.table;
    var $ = layui.jquery;
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
    var laydate = layui.laydate;
    var myDate = new Date();

    
    var currentMothFirstDay = getCurrentMothFirstDay();
    var currentDate =  myDate.getFullYear() + '-' +(myDate.getMonth() + 1)  + '-'+  myDate.getDate();
    laydate.render({
        elem: '#borrowOutdate1',
        value: currentMothFirstDay
    });
    laydate.render({
        elem: '#borrowOutdate2',
        value:  new Date()
    });
    

    	// 联动查询
	$(".find").click(function () {
				borrowReportData(currentPage, limit, totalInfo);
	})


	//回车事件
	$(".seachContent").keydown(function (event) {
		if (event.keyCode == "13") { //keyCode=13是回车键
			$('.find').click();
		}
	});
	
	

    $(".state").change(function() {
        borrowReportData(currentPage, limit, totalInfo);
    })
    
    getunit('-1');
    //所属公司
    if(localStorage.groupcompanyid != "0"){
        $("#fengongsiId").css("display","none");
        borrowReportData(currentPage, limit, totalInfo);
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
                borrowReportData(currentPage, limit, totalInfo);
            }
        });
    
    }
    $(".companytypeid").change(function() {
        $('.unit').val("");
        $("#unit").val("");
        borrowReportData(currentPage, limit, totalInfo);
        var groupcompanyid=$(".companytypeid").val();
        groupcompanyid=groupcompanyid==-1?'':groupcompanyid;
        //往来单位跟这变
        var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
        $("#append_group").empty().append(append_group);
        getunitByConfident('-1',groupcompanyid);

    })

    
    
    
    table.on('tool(demo)', function(obj) {
        var data = obj.data;
        if(obj.event === 'detail') {
            sessionStorage.borrowOut_order = data.ordernum
            parent.layer.open({
                type: 2 //此处以iframe举例
                    ,
                title: '<img width="20px" src="image/logo.png" alt="" /><span style="margin-left:10px">借货出库明细</span>',
                area: ['85%', '90%'],
                offset: "rb",
                content: 'views/reportAnalysis/borrowGoods/borrowOut/detail.html',
                zIndex: layer.zIndex //重点1
                    ,
                success: function(layero) {
                    parent.layer.setTop(layero); //重点2
                },
                end: function(layero) {
                        if(sessionStorage.borrow_order){
                            sessionStorage.removeItem("borrowOut_order");
                        }
                        if(sessionStorage.seachOutContent){
                            sessionStorage.removeItem("seachOutContent");
                        }
                }
            });
        }
    });
    
    
    var limit = 50;
    var curpage = 1;
    var count;


    function borrowReportData(currentPage, limit) {
        var state = $('.state').val();
        var unit = $('#unit').val();
        var seachContent = $('.seachContent').val();
        
        if(localStorage.groupcompanyid == "0"){
            companytypeid = $('.companytypeid option:selected').val();
        }else{
            companytypeid = localStorage.groupcompanyid;
        }
        var beginTime = $('#borrowOutdate1').val() !='' ? $('#borrowOutdate1').val() :currentMothFirstDay;
        var endTime = $('#borrowOutdate2').val() != '' ? $('#borrowOutdate2').val() : currentDate;
        $.ajax({
            type: "get",
            url: localStorage.serIp  + "/WebGetLendReport?jsoncallback=?",
            dataType: "jsonp",
            async: true,
            data: {
                'userId': localStorage.userId,
                'userPw': localStorage.userPw,
                'num': limit,
                'page': currentPage,
                'groupCompanyId': companytypeid,
                'database': localStorage.database,
                "beginTime": beginTime,
                'companyId': unit,
                'endTime': endTime,
                'txtCondition': seachContent,
                'type': 1,
                'states': state ? state : -1
            },
            success: function(res) {
                $('.totalInfo').children().remove();


                var desData = JSON.parse(res);
                var data = JSON.parse(desData.data);
                
                count = desData.count;
               
				var totalInfoTag = '<span>' + '共' + count + '条' + '</span>';
				$('.totalInfo').append(totalInfoTag);
                borrowOut(data, limit);
                
                pagination(currentPage, limit, count);
				$('.layui-laypage-limits').css('display','block');
                

                        
             
            }
        });

    }
    

    function borrowOut(data) {
        //展示已知数据
        $(function () {
            var dataGrid = $("#gridContainer").dxDataGrid({
                dataSource: data,
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
                grouping: {
                    contextMenuEnabled: false,
                    expandMode: "rowClick"
                },   
                groupPanel: {
                    visible: false
                },
                columns: [{
                    dataField: "ordernum",
                    caption: "单号",
                   
                }
                ,
                {
                    dataField: "owncomapanyname",
                    
                    caption: "所属公司",
                 
                },
                {
                    dataField: "companyname",
                   
                    caption: "往来单位",
                   
                }
                ,
                {
                    dataField: "lendcount",
                   
                    caption: "借出数量",
                    
                }, {
                    dataField: "lenddate",
                   
                    caption: "借出时间",  width: 90,
                    
                },
                {
                    dataField: "returncount",
                    
                    caption: "归还数量",
                    
                }, {
                    dataField: "returndate",
                   
                    caption: "归还时间",  width: 90,
                }, {
                    dataField: "days",
                   
                    caption: "借出时长",
                }
                , {
                    dataField: "states",
                  
                    caption: "状态",
                }
                ]
               , 
         	  onSelectionChanged: function () {
					dataGrid.refresh();
				},
				summary: {
					totalItems: [{
						name: "lendcountSummary",
						showInColumn: "lendcount",
						summaryType: "custom",
					}
						,
					{
						name: "returncountSummary",
						showInColumn: "returncount",
						summaryType: "custom",
					}
					],
					calculateCustomSummary: function (options) {
						if (options.name === "lendcountSummary") {
							if (options.summaryProcess === "start") {
								options.totalValue = 0;
							};
							if (options.summaryProcess === "calculate") {
								if (options.component.isRowSelected(options.value.ordernum)) {
									options.totalValue = options.totalValue + options.value.lendcount;
								}
							}
						}
						
						if (options.name === "returncountSummary") {
							if (options.summaryProcess === "start") {
								options.totalValue = 0;
							};
							if (options.summaryProcess === "calculate") {
								if (options.component.isRowSelected(options.value.ordernum)) {
									options.totalValue = options.totalValue + options.value.returncount;
								}
							}
						}
					},

				}
           
            }).dxDataGrid('instance');
            
        });
    }




// 获取当前页面渲染数量
$('#lay-ignore').change(function () {
    limit = $(this).children('option:selected').val();
    borrowReportData(currentPage, limit, totalInfo);
});


$('.M-box2').on('click', 'a', function () {
    currentPage = $(this).data('page');
    borrowReportData(currentPage, limit, totalInfo);
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
            borrowReportData(currentPage, limit, totalInfo);
        }
    });
}

//合并导出功能
$('.export').on('click', function () {
	
			if(!checkPermissionStatus("借货统计分析-导出1")){
					
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
            combineExport("JHCKTJFX", ordernumList);
        });
    };

});

//导出全部
$(".allExport").click(function () {
	
			if(!checkPermissionStatus("借货统计分析-导出1")){
					
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
        zIndex: parent.layer.zIndex,//重点1
        title: '导出全部'
    }, function (index) {

        parent.layer.open({
            type: 3,
            zIndex: parent.layer.zIndex, //重点1,
            success: function (layero, index) {
                jiazaiIndex = index;
            }
        });
        
        
        var state = $('.state').val();
        var unit = $('#unit').val();
        var seachContent = $('.seachContent').val();
        var companytypeid ="";
        if(localStorage.groupcompanyid == "0"){
            companytypeid = $('.companytypeid option:selected').val();
        }else{
            companytypeid = localStorage.groupcompanyid;
        }
        var beginTime = $('#borrowOutdate1').val() !='' ? $('#borrowOutdate1').val() :currentMothFirstDay;
        var endTime = $('#borrowOutdate2').val() != '' ? $('#borrowOutdate2').val() : currentDate;
        
        var timestamp = new Date().getTime();

        $.ajax({
            type: "get",
            url: localStorage.serIp + "/WebGetLendInReportExportALL?jsoncallback=?",
            async: true,
            dataType: 'jsonp',
            data: {
                'userId': localStorage.userId,
                'userPw': localStorage.userPw,
                'num': limit,
                'page': currentPage,
                'groupCompanyId': companytypeid,
                'database': localStorage.database,
                "beginTime": beginTime,
                'companyId': unit,
                'endTime': endTime,
                'txtCondition': seachContent,
                'type': 1,
                'states': state ? state : -1,
                'filename': "借货出库统计分析" + timestamp + ".xls"

            },
            success: function (res) {
                parent.layer.close(jiazaiIndex);

                var res = JSON.parse(res);
                if (res.ResultValue == '0') {

                    parent.layer.open({
                        title: "提示",
                        content: '导出失败！', zIndex: parent.layer.zIndex //重点1
                    });

                } else {

                    var downurl = "\\" + res.ResultValue
                    while (true) {
                        var isExists = 0;
                        $.ajax({
                            url: downurl,
                            async: false,
                            type: 'HEAD',
                            error: function () {
                                isExists = 0;

                            },
                            success: function () {
                                isExists = 1;
                            }
                        });


                        if (isExists == 1) {
                            parent.layer.close(jiazaiIndex);
                            window.location.href = downurl;
                            break;
                        }


                    }

                    parent.layer.open({
                        title: "提示",
                        content: '导出成功！', zIndex: parent.layer.zIndex //重点1
                        ,
                        success: function (layero, index) {
                            parent.layer.setTop(layero); //重点2

                        },

                    });
                }

            },
            error: function (res) {
                parent.layer.close(jiazaiIndex);
            }
        });

    });


});

});