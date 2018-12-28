var limit = 50;
var currentPage = 1;
var totalInfo = '';
var count;

layui.use(['table', 'jquery', 'element', 'laydate'], function () {
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
	var myDate = new Date();
	var myYear = myDate.getFullYear();
	var myMonth = myDate.getMonth() + 1;


	laydate.render({
		elem: '#completedate1',
		value: myYear + '-' + myMonth + "-" + '01'
	});
	laydate.render({
		elem: '#completedate2',
		value: myDate
	});
	$(".salesman").change(function () {
		$(".find").click();

	})


	if (localStorage.groupcompanyid != "0") {
		$("#fengongsiId").css("display", "none");
		completeData(currentPage, limit, totalInfo);
	} else {
		dataFun1();
	}
	getunit(5);
	var groupcompanyid = localStorage.groupcompanyid;
	//获取公司信息
	function dataFun1() {
		$.ajax({
			type: "get",
			url: localStorage.serIp + "/WebGetAllGroupCompany?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"groupCompanyId": localStorage.groupcompanyid
			},
			success: function (res) {
				var desData = JSON.parse(res);
				var optionsStr = "";
				for (var i = 0; i < desData.length; i++) {
					var id = desData[i].myg_companyid;
					var name = desData[i].companyname;


					if (id == localStorage.groupcompanyid) {
						optionsStr += "<option value='" + id + "' selected='selected'>" + name + "</option>";

					} else {
						optionsStr += "<option value='" + id + "'>" + name + "</option>";

					}



				}
				$(".companytypeid").append(optionsStr);
				completeData(currentPage, limit, totalInfo);

			}
		});

	}


	$(".companytypeid").change(function () {

		completeData(currentPage, limit, totalInfo);
		//业务员跟这变
		groupcompanyid = $(".companytypeid").val();
		groupcompanyid = groupcompanyid == -1 ? '' : groupcompanyid;
		var bandstr = '<input autocomplete="off" class="layui-input salesman" id="salesman" type="text" style="width: 250px;height: 28px;line-height: 28px;">';
		$("#append_sale").empty().append(bandstr);
		staffList();

		//往来单位跟这变
		var append_group = '<input autocomplete="off" onkeyup="value=value.replace(/(^\s*)|(\s*$)/g,"")" class="layui-input unit" type="text" id="unit" style="width: 250px;height: 28px;line-height: 28px;">';
		$("#append_group").empty().append(append_group);
		getunitByConfident(5, groupcompanyid);

	})


	function staffList() {
		$.ajax({
			type: "post",
			url: localStorage.serIp + "/WebGetEmployeeDropDownList?jsoncallback=?",
			async: true,
			dataType: 'jsonp',
			data: {
				"userId": localStorage.userId,
				"userPw": localStorage.userPw,
				'database': localStorage.database,
				'groupCompanyId': localStorage.groupcompanyid
			},
			success: function (res) {
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

	function completeData(currentPage, limit) {
		var unit = $('#unit').val();
		var agentId = $("#salesman").val();
		var orderNum = $(".seachContent").val();
		var state = 1;
		var beginTime = $('#completedate1').val() != '' ? $('#completedate1').val() : currentMothFirstDay;
		var endTime = $('#completedate2').val() != '' ? $('#completedate2').val() : currentDate;
		if (localStorage.groupcompanyid == "0") {
			companytypeid = $('.companytypeid option:selected').val();
		} else {
			companytypeid = localStorage.groupcompanyid;
		}


		var jiazaiIndex;
		parent.layer.open({
			type: 3,
			zIndex: parent.layer.zIndex, //重点1
			success: function (layero, index) {
				jiazaiIndex = index;
			}
		});


		$.ajax({
			type: "get",
			url: localStorage.serIp + "/WebGetDirectOutSettlementInfo?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'num': limit,
				'page': currentPage,
				'orderNum': orderNum,
				'agentId': agentId,
				'companyId': unit,
				'beginTime': beginTime,
				'endTime': endTime,
				'database': localStorage.database,
				'checkState': state ? state : -1,
				'lastType': -610, //
				'groupCompanyId': companytypeid
			},
			success: function (res) {
				$('.totalInfo').children().remove();
				parent.layer.close(jiazaiIndex);
				var initData = JSON.parse(res);
				var data = JSON.parse(initData.data);
				count = initData.count;
				totalInfo = count;
				var totalInfoTag = '<span>' + '共' + totalInfo + '条' + '</span>';
				$('.totalInfo').append(totalInfoTag);
				complete(data, limit);
				pagination(currentPage, limit, count);
				$('.layui-laypage-limits').css('display', 'block');
			}
			,
			error: function (res) {
				parent.layer.close(jiazaiIndex);
				parent.layer.open({
					title: "提示",
					content: '服务器异常!',
					zIndex: parent.layer.zIndex //重点1
				});


			}
		});
	}

	 var directSellingString;
	 var lastnumString;
	 var lastNumArray = [];
	 var directSellingArray = [];
	//表格渲染
	 function complete(data) {
		//   Dev Extreme
		  $(function () {
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
					caption: "直销核价单号",
					fixed: true,
				}
					,
				{
					dataField: "statesname",
					width: 70,
					caption: "操作状态",
				},
				{
					dataField: "lasttypename",
					width: 70,
					caption: "单据类型"
				},
				{
					dataField: "companyname",
					width: 180,
					caption: "往来单位"
				},
				{
					dataField: "masterdoctorname",
					width: 70,
					caption: "主刀医生",
				},
				{
					dataField: "patienname",
					width: 70,
					caption: "患者姓名",
				},
				{
					dataField: "surgerydate",
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80,
					caption: "手术日期",
				}, {
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
					dataField: 'agentname',
					caption: '业务员',
					width: 100
				}, {
					dataField: 'outsettlementdate',
					caption: '核价日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80
				},
				{
					dataField: 'operatorsidname',
					caption: '制单人',
					width: 100
				}, {
					dataField: 'actiondate',
					caption: '制单日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80
				},
				{
					dataField: 'checkername',
					caption: '审核人',
					width: 60,
				}, {
					dataField: 'checkdate',
					caption: '审核日期',
					format: "yyyy-MM-dd",
					dataType: "date",
					width: 80,
				}, {
					dataField: 'checkstatename',
					caption: '单据状态',
					width: 100,
				}, {
					dataField: 'lastnum',
					caption: '关联单号',
					fixed: true,
					fixedPosition: 'right',
					width: 160,
				}, {
					dataField: 'mynum',
					caption: '自定义单号',
					width: 160,
				}, {
					dataField: 'nomo',
					caption: '备注',
					width: 180,
				}
				]
				,
				onSelectionChanged: function () {
					dataGrid.refresh();
				},
				summary: {
					totalItems: [{
						name: "SelectedRowsSummary",
						showInColumn: "totalprice",
						summaryType: "custom",
					}
						,
					{
						name: "SelectedRowsSummary",
						showInColumn: "nomoney",
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
									options.totalValue = Math.round(options.totalValue * 100) / 100;
								}
							}
						}
					},

				},
				onCellClick: function (e) {
					if (e.columnIndex == 1 && e.rowType != "header") {
						//点击单号修改功能
						parent.tab.tabAdd({
							icon: '',
							id: 'ZXHJWC' + e.data.ordernum,
							title: e.data.ordernum + '直销核价',
							url: 'views/financiaManagement/directSelling/directSellingYiBan.html'
						});

					}
				},
			 onSelectionChanged:function(e){
				lastNumArray = [];
				directSellingArray = [];
				//  实耗数据
				$.each(e.selectedRowKeys,function(currentValue,v,array){
					directSellingArray.push("'"+v+"'");
				})
				directSellingString = directSellingArray.join(',');
               
				//核价数据
				var connectingJsonArray = e.selectedRowsData;
				$.each(connectingJsonArray,function(cv,i,arr){
					lastNumArray.push("'"+i.lastnum +"'");
				});
				lastnumString = lastNumArray.join(',');
			 }
			}).dxDataGrid('instance');
		});
		// 结束
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



	// 联动查询
	$(".find").click(function () {
		completeData(currentPage, limit, totalInfo);
	})


	//回车事件
	$(".seachContent").keydown(function (event) {
		if (event.keyCode == "13") { //keyCode=13是回车键
			$('.find').click();
		}
	});





	//合并导出功能
	$('.export').on('click', function () {
		// console.log("关联单号"+ lastnumString + ';直销单号' + directSellingString );
		if (!checkPermissionStatus("直销核价-导出1")) {
			parent.layer.open({
				title: "提示",
				content: localStorage.jurisdictionTips,
				zIndex: parent.layer.zIndex //重点1
				,
				success: function (layero) {
					parent.layer.setTop(layero); //重点2
				}
			});
			return;
		}

		if(!directSellingArray && !lastNumArray || directSellingArray.length==0 && lastNumArray.length==0){
			parent.layer.open({
				title: "提示",
				zIndex: parent.layer.zIndex, //重点1,
				content: '请选择要导出的单据!'
			});
			return;
		}
		// 合并导出实耗
		if ($(this).hasClass('combineExport')) {
		
			parent.layer.confirm('确定导出？', {
				icon: 3,
				zIndex: parent.layer.zIndex,//重点1
				title: '合并导出'
			}, function () {
				combineExport("ZXHJSH", lastnumString);
			});
		};


		//合并导出核价
		if ($(this).hasClass('combineExportHeJia')) {
			
			parent.layer.confirm('确定导出？', {
				icon: 3,
				zIndex: parent.layer.zIndex,//重点1
				title: '合并导出'
			}, function () {
				combineExport("ZXHJ", directSellingString);
			});
		}
	});




	//导出全部
	$(".allExportHeJIa").click(function () {

		if (!checkPermissionStatus("直销核价-导出1")) {

			parent.layer.open({
				title: "提示",
				content: localStorage.jurisdictionTips,
				zIndex: parent.layer.zIndex //重点1
				,
				success: function (layero) {
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

			var unit = $('#unit').val();
			var agentId = $("#salesman").val();
			var orderNum = $(".seachContent").val();

			var state = 1;
			var beginTime = $('#completedate1').val() != '' ? $('#completedate1').val() : currentMothFirstDay;
			var endTime = $('#completedate2').val() != '' ? $('#completedate2').val() : currentDate;


			if (localStorage.groupcompanyid == "0") {
				companytypeid = $('.companytypeid option:selected').val();
			} else {
				companytypeid = localStorage.groupcompanyid;
			}


			var timestamp = new Date().getTime();

			$.ajax({
				type: "get",
				url: localStorage.serIp + "/WebGetDirectOutsettlementExportInfo?jsoncallback=?",
				async: true,
				dataType: 'jsonp',
				data: {
					'userId': localStorage.userId,
					'userPw': localStorage.userPw,
					'orderNum': orderNum,
					'agentId': agentId,
					'companyId': unit,
					'beginTime': beginTime,
					'endTime': endTime,
					'database': localStorage.database,
					'checkState': state ? state : -1,
					'lastType': 0,
					'groupCompanyId': companytypeid,
					'filename': "直销核价" + timestamp + ".xls"
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

						url = "\\" + res.ResultValue
						while (true) {
							var isExists = 0;
							$.ajax({
								url: url,
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
								window.location.href = url;

								break;
							}


						}

						parent.layer.open({
							title: "提示",
							content: '导出成功！', zIndex: parent.layer.zIndex //重点1
							,
							success: function (layero, index) {
								parent.layer.setTop(layero); //重点2[]
							},

						});


					}

				},
				error: function (res) {
					parent.layer.close(jiazaiIndex);

				}
			});

		});
	})

});




// 实耗接口导出全部
$(".allExport").click(function () {
	if (!checkPermissionStatus("直销核价-导出1")) {
		parent.layer.open({
			title: "提示",
			content: localStorage.jurisdictionTips,
			zIndex: parent.layer.zIndex //重点1
			,
			success: function (layero) {
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
		var companytypeid = "";
		var beginTime = $('#completedate1').val() != '' ? $('#completedate1').val() : currentMothFirstDay;
		var endTime = $('#completedate2').val() != '' ? $('#completedate2').val() : currentDate;

		if (localStorage.groupcompanyid == "0") {
			companytypeid = $('.companytypeid option:selected').val();
		} else {
			companytypeid = localStorage.groupcompanyid;
		}
		var state = $(".state").val();
		var agentId = $("#salesman").val();
		var orderNum = $(".seachContent").val();
		var unit = $('#unit').val();
		var timestamp = new Date().getTime();

		$.ajax({
			type: "get",
			url: localStorage.serIp + "/WebGetRealUseListExport?jsoncallback=?",
			async: true,
			dataType: 'jsonp',
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'orderNum': orderNum,
				'agentId': agentId,
				'companyId': unit,
				'beginTime': beginTime,
				'endTime': endTime,
				'database': localStorage.database,
				'checkState': state ? state : -1,
				'lastType': -610,
				'groupCompanyId': companytypeid,
				'filename': "直销实耗" + timestamp + ".xls"

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
})