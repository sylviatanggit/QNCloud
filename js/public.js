
function showCheck(a) {
	//创建context对象内建的html5对象（拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。）
	//fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。
	var cxt = document.getElementById('create').getContext('2d')
	//				console.log(cxt)
	//清空一个区域（给定矩形内的指定像素。）
	cxt.clearRect(0, 0, 500, 500)
	cxt.font = '80px Arial'
	cxt.fillStyle = "rgb(100,102,193)"
	//fillText(text,x,y) - 在 canvas 上绘制实心的文本
	cxt.fillText(a, 0, 100)

}


Number.prototype.toFixed=function (d) { 
                  var s=this+""; 
                 if(!d)d=0; 
                  if(s.indexOf(".")==-1)s+="."; 
                  s+=new Array(d+1).join("0"); 
                  if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
                     var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
                     if(a==d+2){
                         a=s.match(/\d/g); 
                         if(parseInt(a[a.length-1])>4){
                             for(var i=a.length-2;i>=0;i--){
                                 a[i]=parseInt(a[i])+1;
                                 if(a[i]==10){
                                     a[i]=0;
                                     b=i!=1;
                                 }else break;
                             }
                         }
                         s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
 
                     }if(b)s=s.substr(1); 
                     return (pm+s).replace(/\.$/,"");
                }return this+"";
 
  };



/**
 * 判断是否有功能权限
 * @param {Object} str
 */
function checkGongNengPermissionStatus(str){

	var flag = false;
	if(localStorage.saasoperition.indexOf(str) !=-1){
		flag = true;
	}
	

	return flag
}
		




/**
 * 判断是否有操作权限
 * @param {Object} str
 */
function checkPermissionStatus(str){

	var flag = false;
	if(localStorage.employeeOrder.indexOf(str) !=-1){
		flag = true;
	}
	

	return flag
}






/**
 * 获取当前第一个月
 */
function getCurrentMothFirstDay(){
	var myDate = new Date();	
	var getYear = myDate.getFullYear(); //获取年
	var getMoth = myDate.getMonth() + 1;//获取当前月份(0-11,0代表1月)
	if(getMoth < 10){
		getMoth = "0" + getMoth;
	}
	var currentMothFirstDay = getYear+ '-' +  getMoth +"-" + '01';	
	
	return currentMothFirstDay;
}

/**
 * 获取当天日期
 */
function getCurrentDay(){
	var myDate = new Date();	
	

	var getYear = myDate.getFullYear(); //获取年
	var getMoth = myDate.getMonth() + 1;//获取当前月份(0-11,0代表1月)
	if(getMoth < 10){
		getMoth = "0" + getMoth;
	}
	
	var getDate = myDate.getDate();
	if(getDate < 10){
		getDate = "0" + getDate;
	}
	var currentDay = getYear+ '-' +  getMoth +"-" + getDate;	
	
	return currentDay;
}

/**
 * 获取当前月前一个月
 */
function getPreCurrentMonth(){
	var myDate = new Date();	
	

	var getYear = myDate.getFullYear(); //获取年
	var getMoth = myDate.getMonth()+ 1;//获取当前月份(0-11,0代表1月)
	getMoth = getMoth -1;
	if(getMoth < 10){
		getMoth = "0" + getMoth;
	}

	var currentDay = getYear+ '-' +  getMoth ;	
	return currentDay;
}



function getFormatDate(){  
    var nowDate = new Date();   
    var year = nowDate.getFullYear();  
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;  
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();  
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();  
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();  
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();  
    
    var fomat =  year.toString() + month.toString()+ date.toString()+hour.toString()+minute.toString()+second.toString();
    return fomat;  
}

//创建验证码
function createCode() {
	code = ''
	//验证码的长度 
	var codeLength = 4
	var selects = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
	//随机选择一个验证码
	for(var i = 0; i < codeLength; i++) {
		var index = Math.floor(Math.random() * 61)
		code += selects[index]
	}
	//按照验证码的长度进行筛选
	if(code.length != codeLength) {
		createCode()
	}
	//展示验证码
	showCheck(code);
	
	return code;
}

/**
 * 主副合并条码,分别获取主副条码
 * @param {Object} code
 */
function mainBarCodeAndsubBarCode(code){
	var retrunData = new Object();
	var subBarCode = "";
	var mainBarCode = "";


	code = code.replace(/\(|\)/g,'');
	var codetemp = code.substring(0,2);
	var index;
	switch(codetemp) 
	{
	case "01":		
		mainBarCode = code.substring(0,16);
		subBarCode = code.substring(16,code.length);
	  break;
	case "00":				
		mainBarCode = code.substring(0,20)
		subBarCode = code.substring(20,code.length);

	  break;
	case "+H":	
		index = code.indexOf("/");
		
		mainBarCode = code.substring(0,index);
		subBarCode = "+" + code.substring((index+1),code.length);


	  break;
	case "+M":	
		index = code.indexOf("/");
		mainBarCode = code.substring(0,index);
		subBarCode = "+" +  code.substring((index+1),code.length);
	  break;

	}
	
	retrunData.subBarCode= subBarCode;
	retrunData.mainBarCode = mainBarCode;
	return retrunData;
	
}


/**
 * 副条码解析
 * @param {Object} codeStr 副条码
 * @param {Object} roNum 主条码
 */
function getSaoMaData(subBarCode,mainBarCode){
	var flag = "0"; //默认0，正常
	
	mainBarCode = mainBarCode.replace(/\(|\)/g,'');
	subBarCode = subBarCode.replace(/\(|\)/g,'');

	
	var mainBarCodeStr = mainBarCode.substring((mainBarCode.length - 6),(mainBarCode.length-1))
	if(subBarCode.substring(0,5) == mainBarCodeStr){
		flag = "2"; //力达康
		
		subBarCode = subBarCode.substring(5,subBarCode.length);
	}
	
	
	var subBar_Code;var subBarCodeArray;
	if(subBarCode.substring(0,1) == "+"){
		flag = "1";  //Hibc条码
	}else{
		subBar_Code = strAsciiConversion(subBarCode);
		subBarCodeArray = subBar_Code.split("[]");
	}
	
	
	var retrunData = new Object();
	
	switch(flag) 
	{
	case "0":				
		retrunData = normalCode(subBarCodeArray);
	  break;
	case "1":				
		retrunData = HibcCode(subBarCode.substring(1,subBarCode.length));

	  break;
	case "2":	
		retrunData = normalCode(subBarCodeArray);

	  break;


	}
	
	return retrunData;
	
}

/**
 * 字符串和ascii码转换
 * @param {Object} str
 */
function strAsciiConversion(str){
	var getValue = "";
	var strAscii = new Array();//用于接收ASCII码
	for(var i = 0 ; i < str.length ; i++ ){
		var asciiCode = str.charCodeAt(i);
		if(asciiCode == "27"){
			asciiCode = "[]"
		}
		strAscii[i] = asciiCode;

	}
	
	for(var j = 0 ; j < strAscii.length ; j++ ){
		var asciiStr = String.fromCharCode(strAscii[j]);
		getValue += asciiStr;

	}
	
	return getValue
	
}

/**
 * 正常码解
 * @param {Object} str
 */
function normalCode(str){
	var retrunData = new Object();
	var iots = "";
	var productionDate = "";
	var indate = "";
	var count=""
	for(var i=0;i<str.length;i++){
		
		var firstFlag = str[i].substring(0,2); //第一次判断是批号，还是生产日期，有效期
		
		
		if(firstFlag == "10" || firstFlag == "21"){
			iots = str[i].substring(2,str[i].length);
			break;
		}
		
		
		
		if(firstFlag == "11" || firstFlag == "13"){
			
			productionDate = str[i].substring(2,8); //YYMMDD
			
			var yy = productionDate.substring(0,2);
			var mm = productionDate.substring(2,4);
			var dd = productionDate.substring(4,6);
			if(dd == "00"){
				dd = "01";
			}
			productionDate = "20" + yy + "-" +mm + "-" +  dd;
			var secondFalg = str[i].substring(8,10);
			
			if(secondFalg == "10" || secondFalg == "21"){
				iots =  str[i].substring(10,str[i].length);
				break;
			}
			
			if(secondFalg == "17"){
				indate = str[i].substring(10,16);
				
				var yy = indate.substring(0,2);
				var mm = indate.substring(2,4);
				var dd = indate.substring(4,6);
				if(dd == "00"){
					dd = "01";
				}
				
				indate = "20" + yy + "-" + mm + "-" +  dd;

				var thirdFalg = str[i].substring(16,18);
				if(thirdFalg == "10" || thirdFalg == "21"){
					iots =  str[i].substring(18,str[i].length);
					break;
				}
				
			}
			
		}
		
		if(firstFlag == "17"){
			indate = str[i].substring(2,8);
			
			var yy = indate.substring(0,2);
			var mm = indate.substring(2,4);
			var dd = indate.substring(4,6);
			if(dd == "00"){
				dd = "01";
			}
			
			indate = "20" + yy + "-" + mm + "-" +  dd;

			var secondFalg = str[i].substring(8,10);
			
			if(secondFalg == "10" || secondFalg == "21"){
				iots =  str[i].substring(10,str[i].length);
				break;
			}
			
			if(secondFalg == "11" || secondFalg == "13"){
				productionDate = str[i].substring(10,16);
				
				var yy = productionDate.substring(0,2);
				var mm = productionDate.substring(2,4);
				var dd = productionDate.substring(4,6);
				if(dd == "00"){
					dd = "01";
				}
				
				productionDate = "20" + yy + "-" + mm+ "-" +  dd;

				var thirdFalg = str[i].substring(16,18);
				
				if(thirdFalg == "10" || thirdFalg == "21"){
					iots =  str[i].substring(18,str[i].length);
					break;
				}
		
					
			}
			
							
			if(secondFalg == "30"){  //数量
	
				var thirdFalg = str[i].substring(11,13);
				
				if(thirdFalg == "10" || thirdFalg == "21"){
					iots =  str[i].substring(13,str[i].length);
					break;
				}
			}
				
		}
		
		if(firstFlag == "30")
		{
			count = str[i].substring(2,4);
			var secondFalg = str[i].substring(4,6);
			if(secondFalg == "17")
			{
				indate = str[i].substring(6,12);
				
				var yy = indate.substring(0,2);
				var mm = indate.substring(2,4);
				var dd = indate.substring(4,6);
				if(dd == "00"){
					dd = "01";
				}
				
				indate = "20" + yy+ "-" + mm + "-" +  dd;
				var thirdFalg = str[i].substring(12,14);
			
			
			
				if(thirdFalg == "10" || thirdFalg == "21"){
					iots =  str[i].substring(14,str[i].length);
					break;
				}
			
				if(thirdFalg == "11" || thirdFalg == "13"){
					productionDate = str[i].substring(14,20);
					
					var yy = productionDate.substring(0,2);
					var mm = productionDate.substring(2,4);
					var dd = productionDate.substring(4,6);
					if(dd == "00"){
						dd = "01";
					}
					
					productionDate = "20" + yy + "-" + mm + "-" + dd;

					var fouthFalg = str[i].substring(20,22);
				
					if(fouthFalg == "10" || fouthFalg == "21"){
						iots =  str[i].substring(22,str[i].length);
						break;
					}
				
				}
			}
		}
	}
	
	retrunData.iots =iots;
	retrunData.productionDate= productionDate;
	retrunData.indate = indate;
	return retrunData;
}


/**
 * Hibc 码
 * @param {Object} str
 */
function HibcCode(str){
	var retrunData = new Object();
	var iots = "";
	var productionDate = "";
	var indate = "";
	var surplusCode = "";
	if(str.substring(0,1) == "$"){
		
		if(str.substring(1,2) == "$"){
			surplusCode = str.substring(2,str.length);
			var getvalue;
			switch(surplusCode.substring(0,1)) 
			{
			case "8":	
				surplusCode = surplusCode.substring(3,surplusCode.length);
				getvalue =  GetIndateAndIotsByCode(surplusCode);
				indate = getvalue.indate;
				iots = getvalue.iots;
				
			  break;
			case "9":				
				surplusCode = surplusCode.substring(6,surplusCode.length);
				if(surplusCode >0){
					var dateMMyy = surplusCode.substring(0,4);
					indate ="20" + dateMMyy.substring(2,4) +"-" + dateMMyy.substring(0,2)//日期个格式MMyy
					indate = getCurrentMonthLast(indate);
					iots = surplusCode.substring(4,surplusCode.length);
				}
			  break;
			default:
				getvalue =  GetIndateAndIotsByCode(surplusCode);
				indate = getvalue.indate;
				iots = getvalue.iots;
			  break;
		
		
			}
			
		}else{
				
			surplusCode = str.substring(1,str.length);
			var surplusCodeLength = surplusCode.length;
			var firstLettersIndex =0;
			for(var i = 0 ; i < surplusCode.length ; i++ ){
				var asciiCode = surplusCode.charCodeAt(i);
				if((asciiCode>='65' && asciiCode <='90')||(asciiCode>='97' && asciiCode <='122')){
					firstLettersIndex = i;
					break;
				}
			}
			
			if((surplusCodeLength - firstLettersIndex)>2){  //包含生产日期
				if(surplusCode.substring(i+1,i+2) == "M"){
					
					productionDate = calculateDataByStr(surplusCode.substr(firstLettersIndex,),2);
					iots = surplusCode.substring(0,surplusCode.length);
					
				}else{
					
//					productionDate = calculateDataByStr(surplusCode.substr(firstLettersIndex,),1);
					iots = surplusCode.substring(0,firstLettersIndex);

				}
				
			}
			
			if((surplusCodeLength - firstLettersIndex)==1){  //包含生产日期
		
				iots = surplusCode.substring(0,firstLettersIndex);

			}
			
		}
	

		
		
	}else{
		
		indate = calculateDataByDay(str.substring(0,5)); 
	
		surplusCode = str.substring(5,str.length);
		var surplusCodeLength = surplusCode.length;
		var firstLettersIndex =0;
		for(var i = 0 ; i < surplusCode.length ; i++ ){
			var asciiCode = surplusCode.charCodeAt(i);
			if((asciiCode>='65' && asciiCode <='90')||(asciiCode>='97' && asciiCode <='122')){
				firstLettersIndex = i;
				break;
			}
		}
		
			if(surplusCode.substring(i+1,i+2) == "M"){
					
					productionDate = calculateDataByStr(surplusCode.substr(firstLettersIndex,),2);
					iots = surplusCode.substring(0,surplusCode.length);
					
			}else{
				
				productionDate = calculateDataByStr(surplusCode.substr(firstLettersIndex,),1);
				iots = surplusCode.substring(0,firstLettersIndex);

			}
		
		
	}
	
	retrunData.iots =iots;
	retrunData.productionDate= productionDate;
	retrunData.indate = indate;
	
	return retrunData;
	
}

// 点击修改备注
function editComment(rightlimit,type,ordernum){
		if (!checkPermissionStatus(rightlimit)) {
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
	var xiugainotes= $('.ordeNotes').val();

	sessionStorage.xiugainotes = JSON.stringify(xiugainotes);
			parent.layer.open({
		type: 2 //此处以iframe举例
		,
		title: '<img width="20px" src="image/logo.png" alt="" /><span style="margin-left:10px">修改备注</span>',
		area: ['450px', '300px'],
		content: 'views/public/editcomment.html',
		zIndex: parent.layer.zIndex, //重点1
		success: function (layero, index11) {
			parent.layer.setTop(layero); //重点2
			var body = layer.getChildFrame('body', 'index');
			paentIfarame = layero.find("iframe")[0].contentWindow.document;

			$(".bohui", paentIfarame).click(function () {

				var rejectnomo = $(".rejectnomo", paentIfarame).val();
			   

				parent.layer.confirm('确认修改吗？', {
					icon: 3, zIndex: parent.layer.zIndex, //重点1
					title: '提示'
				}, function (index) {

			



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
						url: localStorage.serIp + "/WebUpdateMasterNomo",
						crossDomain: true,
						contentType: 'application/json; charset=utf-8',
						data:{
							'userId': localStorage.userId,
							'userPw': localStorage.userPw,
							'database': localStorage.database,
							'ordernum': ordernum, 
							'nomo': rejectnomo + '',
							'type': type,

						},
						success: function (res) {

							parent.layer.close(jiazaiIndex);

							var data = JSON.parse(res);
							if (data.ResultValue == "1") {

								parent.layer.open({
									title: "提示",
									content: "修改成功!",
									zIndex: parent.layer.zIndex,//重点1,
									success: function (layero) {
										parent.layer.setTop(layero); //重点2
										parent.layer.close(index11); //再执行关闭   
									},
									end: function(){
										location.reload();
									}
								});

							
							} else {

								parent.layer.open({
									title: "提示",
									content: data.ResultValue,
									zIndex: parent.layer.zIndex,//重点1,
									success: function (layero) {
										parent.layer.setTop(layero); //重点2

									}
								});

							}


						}

						,
						error: function (res) {
							parent.layer.close(jiazaiIndex);

							parent.layer.open({
								title: "提示",
								content: '服务器异常!',
								zIndex: parent.layer.zIndex //重点1

							});


						},
						
					});

				}

				);




			})
		},
		end:function(){
			if (sessionStorage.xiugainotes || sessionStorage.xiugainotes != "[]") {
		sessionStorage.removeItem('xiugainotes');
	}
		}
		

	});
}


/**
 *Hibc 有两个$获取批号和有效期
 * @param {Object} str
 */
function GetIndateAndIotsByCode(str){
	var retrunData = new Object();
	var iots = "";
	var indate = "";
	var dateMMyy;
	var days;
	if(str.length > 0){
		var  dateType = str.substring(0,1);
		str = str.substring(1,str.length);
		switch(dateType)  //日期类型
		{
		case "2":	//mmddyy
			dateMMyy = str.substring(0,6);
			indate ="20" + dateMMyy.substring(4,6) +"-" + dateMMyy.substring(0,2) +"-" + dateMMyy.substring(2,4);
			iots = str.substring(6,str.length);

		  break;
		case "3":	//yymmdd		
			dateMMyy = str.substring(0,6);
			indate ="20" + dateMMyy.substring(0,2) +"-" + dateMMyy.substring(2,4) +"-" + dateMMyy.substring(4,6);
			iots = str.substring(6,str.length);
		  break;
		 case "4":	//yymmddhh		
			dateMMyy = str.substring(0,8);
			indate ="20" + dateMMyy.substring(0,2) +"-" + dateMMyy.substring(2,4);
			iots = str.substring(8,str.length);
		  break;
		 case "5":	//yyjjj		
			dateMMyy = calculateDataByDay(str.substring(0,5));
	
			indate =dateMMyy;
			iots = str.substring(5,str.length);
		  break;
		 case "6":	//yyjjjhh		
			dateMMyy = calculateDataByDay(str.substring(0,5));
	
			indate =dateMMyy;
			iots = str.substring(7,str.length);
		  break;
		 case "7":	//无日期		
			iots = str;
		  break;
		default:	
			dateMMyy = str.substring(0,4);
			indate ="20" + dateMMyy.substring(2,4) +"-" + dateMMyy.substring(0,2)//日期个格式MMyy
			indate = getCurrentMonthLast(indate);
			iots = str.substring(4,str.length);
		  break;
	
	
		}
	}


	retrunData.iots =iots;
	retrunData.indate = indate;
	return retrunData;
}


/**
 * 根据总天数计算日期
 * @param {Object} day
 */
function calculateDataByDay(totallDay){
 	var year = "20" + totallDay.substring(0,2);
    var day = totallDay.substring(2,5)
	var flag = 0;//判断是否为闰年,1是闰年
	if((year%4 == 0 && year%100 != 0) || (year%100 == 0 && year%400 == 0)){
		flag =1;
	}
	
	var month = 0;
    var monthIndex =0;
	
	var days = [0, 31, 59 + flag, 90 + flag, 120 + flag, 151 + flag, 181 + flag, 212 + flag, 243 + flag, 273 + flag, 304 + flag, 334 + flag, 365 + flag];
	
  	for (var i = 0; i < days.length; i++) 
    { 
  
        if (day <= days[i]) 
        {
            month = i;
            monthIndex = i ;
            break;
        }
    }
    
    var dd = day - days[monthIndex-1];
    var MM = "";
    var DD = "";
    if (month<10)
    {
        MM = "0"+ month;
    }
    else
    {
        MM = month;
    }
    
    if (dd < 10)
    {
        DD = "0"+ dd;
    }
    else
    {
        DD = dd;
    }
        
     return year+ "-"+ MM + "-"+ DD;  
}



/**
 * 计算Hibc生成日期
 * @param {Object} totallDay
 * @param {Object} startIndex
 */
function calculateDataByStr(totallDay,startIndex){
	var reg=  /^[0-9]*[1-9][0-9]*$/;
	var jiexiYear =  totallDay.substring(startIndex,startIndex+2);
	if(!reg.test(jiexiYear)){
		return "";
	}
	
 	var year = "20" + jiexiYear;
 	
    var monthMark  = totallDay.substring(0,1)
	var flag = 0;//判断是否为闰年,1是闰年
	if((year%4 == 0 && year%100 != 0) || (year%100 == 0 && year%400 == 0)){
		flag =1;
	}
	
    var MM = "";
    var DD = "";
    
    
	 switch (monthMark)
    {
        case"A":
            MM = "01";
            DD = "31";
            break;
        case "B":
            MM = "02";
            DD = (28 + flag);
            break;
        case "C":
            MM = "03";
            DD = "31";
            break;
        case "D":
            MM = "04";
            DD = "30";
            break;
        case "E":
            MM = "05";
            DD = "31";
            break;
        case "F":
            MM = "06";
            DD = "30";
            break;
        case "G":
            MM = "07";
            DD = "31";
            break;
        case "H":
            MM = "08";
            DD = "31";
            break;
        case "I":
            MM = "09";
            DD = "30";
            break;
        case "J":
            MM = "10";
            DD = "31";
            break;
        case "K":
            MM = "11";
            DD = "30";
            break;
        case "L":
            MM = "12";
            DD = "31";
            break;

    }
	
    return year+ "-"+ MM + "-"+ DD;  
}


/**
 *  获取指定月的最后一天
 * @param {Object} str
 */
function getCurrentMonthLast(str){
	 var date = new Date(str);
	 var currentMonth=date.getMonth();
	 var nextMonth=++currentMonth;
	 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
	 var oneDay=1000*60*60*24;
	 var date1 = new Date(nextMonthFirstDay-oneDay);
	
	 return  date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
}


/**
 * 计算天数
 * @param {Object} data1
 * @param {Object} data2
 */
function diffDay(data1,data2){
	var accountperiod = new Date(data1.substring(0,10));
	var date1 = new Date(data2.substring(0,10));
	
	var diff = accountperiod.valueOf() - date1.valueOf();

	var diff_day = parseInt(diff/(1000*60*60*24));
	if(diff_day ==-0){
		diff_day = 1;
	}
	return diff_day;
}


//获取32随机数
function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var num = '';
	for (i = 0; i < len; i++) {
	  num += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	 return num;
}

//数组去重
function getArray(a) {
	var hash = {},
     len = a.length,
     result = [];

	for (var i = 0; i < len; i++){
	    if (!hash[a[i]]){
	         hash[a[i]] = true;
	         result.push(a[i]);
	    } 
	}
 	return result;
}

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArray(array, key){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

/**
 * 根据key判断数组是否有重
 * @param {Object} array
 * @param {Object} key
 */
function checkIsUniqueArray(array, key){
	var flag = false;
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] != result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (repeat) {
           flag = true;
            break;
        }
    }
    return flag;
}

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArraybYkEY(array, key){
	if(array.length ==0){
		 return [];
	}
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

/**
 * 根据key字段找到value去重
 * @param {Object} array
 * @param {Object} value
 * @param {Object} key
 */
function uniqueArrayByValue(array, value,key){
    var result = [];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        if (item[key] == value) {
            repeat = true;
        }
   
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}


//

/*
 * JSON数组多参数去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArrayParameters(array, key,key1){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if ((item[key] == result[j][key]) &&(item[key1] == result[j][key1])) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}




function uniqueArrayParameter(array, key,key1,key2,key3,key4,key5,key6,key7,key8){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if ((item[key] == result[j][key]) &&(item[key1] == result[j][key1])&&(item[key2] == result[j][key2])&&(item[key3] == result[j][key3])&&(item[key4] == result[j][key4])) {
               if((item[key5] == result[j][key5]) &&(item[key6] == result[j][key6])&&(item[key7] == result[j][key7]) &&(item[key8] == result[j][key8])){
                repeat = true;
                break;
               }
     
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}


/**
 *根据指定参数对数组去重
 * @param {Object} array
 */
function uniqueArray(array){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if ((item["produceid"] == result[j]["produceid"])&&(item["producecode"] == result[j]["producecode"])) {
               if((item["storagecondition"] == result[j]["storagecondition"]) &&(item["qs"] == result[j]["qs"])){
	                if((item["producesubbarcode"] == result[j]["producesubbarcode"])&&(item["iots"] == result[j]["iots"])&&(item["productiondate"] == result[j]["productiondate"])&&(item["indate"] == result[j]["indate"])){
	                repeat = true;
	               	 break;
	                }
	       
               }
     
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}



/**
 *根据指定参数对数组合并数量去重
 * @param {Object} array
 */
function uniqueHeBingArray(array){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        var numindex = 0;var totalcount = 0;
        for (var j = 0; j < result.length; j++) {
            if ((item["produceID"] == result[j]["produceID"])&&(item["producecode"] == result[j]["producecode"])&&(item["productiondate"] == result[j]["productiondate"])&&(item["indate"] == result[j]["indate"])) {
               if((item["storagecondition"] == result[j]["storagecondition"]) &&(item["qs"] == result[j]["qs"])){
	                if((item["producesubbarcode"] == result[j]["producesubbarcode"])&&(item["Iots"] == result[j]["Iots"])){
		                repeat = true;
		                numindex = j;
		                totalcount = Number(result[j].produceCount) + Number(item.produceCount);
		               	 break;
	                }
	       
               }
     
            }
        }
        if (!repeat) {

            result.push(item);
        }else{
           result[numindex].produceCount = totalcount;
        }
    }
    return result;
}


/**
 *根据产品id，仓库id，货区id，货架id去重
 * @param {Object} array
 */
function selectStockUniqueArrayByziDuan(array){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if ((item["produceid"] == result[j]["produceid"]) &&(item["producesubbarcode"] == result[j]["producesubbarcode"])&&(item["stockarea"] == result[j]["stockarea"])&&(item["targetstockid"] == result[j]["targetstockid"])) 
            {
               if((item["producesubbarcode"] == result[j]["producesubbarcode"])&&(item["iots"] == result[j]["iots"]))
               {
	            	if(item["productiondate"] == result[j]["productiondate"]&& item["indate"] == result[j]["indate"])
	            	{
	            		   repeat = true;
	              		   break;
	            	}	
	             

               }
     
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}


/**
 *根据产品id，仓库id，货区id，结算单号去重
 * @param {Object} array
 */
function selectProductUniqueArrayByziDuan(array){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if ((item["produceid"] == result[j]["produceid"]) &&(item["jsnum"] == result[j]["jsnum"])&&(item["stockarea"] == result[j]["stockarea"])&&(item["targetstockid"] == result[j]["targetstockid"])) {	            	
	                repeat = true;
	               	 break;
     
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}



/*
 * JSON数组删除相同元素
 * @param: [array1] json Array1
 *  @param: [array2] json Array2 要去除的元素
 */
function deleteUniqueArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
            if ((item1.produceid == item2.produceid)&&(item1.producecode == item2.producecode)) {
           		if ((item1.producesubbarcode == item2.producesubbarcode)&&(item1.iots == item2.iots)&&(item1.productiondate == item2.productiondate)) {
            	 		if (item1.indate == item2.indate) {
		            	 repeat = true;
		               	 break;
              	 }
               }
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}

/**
 * 唯一值id去重
 * @param {Object} array1
 * @param {Object} array2
 */
function quchongByPandian(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
	 		 if ((item1.id == item2)) {
        		 repeat = true;
          	 	 break;
    
   			 }
        }  
        
          if (!repeat) {
       		 result.push(item1);
 
    	}
      }
    
   
    return result;
}



/**
 * 用于采购退货，根据产品ID，副条码去重
 * @param {Object} array1
 * @param {Object} array2
 */
function deleteUniqueArraybyCGTH(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
	 		 if ((item1.produceid == item2.produceid)&&(item1.producesubbarcode == item2.producesubbarcode)&&(item1.iots == item2.iots)&&(item1.productiondate == item2.productiondate)&&(item1.indate == item2.indate)) {
        		 repeat = true;
          	 	 break;
    
   			 }
        }  
        
          if (!repeat) {
       		 result.push(item1);
 
    	}
      }
    
   
    return result;
}



/**
 * 用于库存，根据产品ID，仓库id，货区id，货架id去重
 * @param {Object} array1
 * @param {Object} array2
 */
function deleteStockUniqueArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
            if ((item1.produceid == item2.produceid)&&(item1.producesubbarcode == item2.producesubbarcode)&&(item1.producecode == item2.producecode)) {
            	if ((item1.iots == item2.iots)  && (item1.productiondate == item2.productiondate) && (item1.indate == item2.indate)) {

//          	 if ((item1.goodsshelves_id == item2.goodsshelves_id)&&(item1.iots == item2.iots)&&(item1.stockarea == item2.stockarea)&&(item1.targetstockid == item2.targetstockid)) {
		            	 repeat = true;
		               	 break;
              	 }
              
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}


/**
 * 用于入库验收，去重
 * @param {Object} array1
 * @param {Object} array2
 */
function deleteStockUniqueArrayByRuKUYanSHou(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
            if ((item1.instoproid == item2.instoproid)&&(item1.producecode == item2.producecode)&&(item1.producesubbarcode == item2.producesubbarcode)) {
            	if ((item1.iots == item2.iots)  && (item1.productiondate == item2.productiondate) && (item1.indate == item2.indate)) {

		            	 repeat = true;
		               	 break;
              	 }
              
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}


/**
 * 用于库存，根据产品ID，仓库id，货区id，去重（分销管理）
 * @param {Object} array1
 * @param {Object} array2
 */
function deleteStockFenxiaoUniqueArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
            if ((item1.produceid == item2.produceid)&&(item1.stockarea == item2.stockarea)&&(item1.targetstockid == item2.targetstockid)) {
            	 	
		            	 repeat = true;
		               	 break;
              	 
              
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}
/**
 * 用于库存，根据产品ID，仓库id，货区id，货架id去重
 * @param {Object} array1
 * @param {Object} josnobject
 */
function deleteStockjosnobjectByKey(array1, josnobject){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
         var repeat = false;

        if ((item1["produceid"] == josnobject["produceid"]) && (item1["producesubbarcode"] == josnobject["producesubbarcode"])) {
          	if ((item1["iots"] == josnobject["iots"])  && (item1["productiondate"] == josnobject["productiondate"]) && (item1["indate"] == josnobject["indate"])) {
   	
//      	if ((item1["goodsshelves_id"] == josnobject["goodsshelves_id"])  && (item1["targetstockid"] == josnobject["targetstockid"]) && (item1["stockarea"] == josnobject["stockarea"])) {
		            	 repeat = true;
		              
              	 }
          
        }
       
      if (!repeat) {
        result.push(item1);
  	  }
    }
    return result;
}


/**
 * 用于发票迁入，根据产品ID，仓库id，货区id，结算单号去重
 * @param {Object} array1
 * @param {Object} josnobject
 */
function deleteProductjosnobjectByKeyFPQR(array1, josnobject){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
         var repeat = false;

        if ((item1["produceid"] == josnobject["produceid"]) && (item1["jsnum"] == josnobject["jsnum"])  && (item1["targetstockid"] == josnobject["targetstockid"]) && (item1["stockarea"] == josnobject["stockarea"]) ) {
        
		      repeat = true;
	
          
        }
       
      if (!repeat) {
        result.push(item1);
  	  }
    }
    return result;
}


/**
 *用于发票迁入，根据产品ID，仓库id，货区id，结算单号去重
 * @param {Object} array1
 * @param {Object} array2
 */
function deleteProductUniqueArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
          var repeat = false;

        for (var j = 0; j < array2.length; j++) {
        	 var item2 = array2[j];
            if ((item1.produceid == item2.produceid)&&(item1.jsnum == item2.jsnum)&&(item1.stockarea == item2.stockarea)&&(item1.targetstockid == item2.targetstockid)) {
            	 
            	 repeat = true;
               	 break;

            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}




/**
 * 用于库存，根据产品ID，仓库id，货区id去重(分销管理)
 * @param {Object} array1
 * @param {Object} josnobject
 */
function deleteStockFenXiaojosnobjectByKey(array1, josnobject){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
         var repeat = false;

        if ((item1["produceid"] == josnobject["produceid"]) && (item1["targetstockid"] == josnobject["targetstockid"]) && (item1["stockarea"] == josnobject["stockarea"]) ) {
		            	 repeat = true;
		            
              	 
          
        }
       
      if (!repeat) {
        result.push(item1);
  	  }
    }
    return result;
}


function deleteUniqueObjArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
                var repeat = false;

        for (var j = 0; j < array2.length; j++) {
            if (item1.produceid == array2[j]) {
            	 repeat = true;
                break;
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}

/**
 * 更加key值删除数组
 * @param {Object} array1
 * @param {Object} array2
 * @param {Object} key
 */
function deleteTwoArrayByKey(array1, array2,key){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
         var repeat = false;

        for (var j = 0; j < array2.length; j++) {
            if (item1[key] == array2[j][key]) {
            	 repeat = true;
                break;
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}


/**
 * 更加key值删除数组
 * @param {Object} array1
 * @param {Object} josnobject
 * @param {Object} key
 */
function deleteTwojosnobjectByKey(array1, josnobject,key){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
         var repeat = false;

        if (item1[key] == josnobject[key]) {
        	 repeat = true;
          
        }
       
      if (!repeat) {
        result.push(item1);
  	  }
    }
    return result;
}


function deleteUniqueCkArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
                var repeat = false;

        for (var j = 0; j < array2.length; j++) {
            if (item1.name == array2[j]) {
            	 repeat = true;
                break;
            }
        }    
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}

function deleteUniqueDelArray(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
        var repeat = false;
        for (var j = 0; j < array2.length; j++) {
            if (item1.del_id == array2[j]) {
            	 repeat = true;
                break;
            }
        }    
	    if (!repeat) {
	        result.push(item1);
	    }
    }
    return result;
}

function deleteUniqueDelArrayId(array1, array2,k){
	var k=k==1?1:2;
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
        var repeat = false;
        for (var j = 0; j < array2.length; j++) {
            if(k==1){
            	if (item1.bidnum == array2[j]) {
	            	repeat = true;
	                break;
	            }
            }else{
            	if (item1.bidnum == array2[j].bidnum) {
	            	repeat = true;
	                break;
	            }
            }
        }    
	    if (!repeat) {
	        result.push(item1);
	    }
    }
    return result;
}
//直销备库结算去重
function uniqueArrayZX(array,k){
    var result = [array[0]];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
        	if(k==1){
        		if ((item["contractprice_bidnum"] == result[j]["contractprice_bidnum"])) {
	                repeat = true;
	           	 	break;
	            }
        	}else if(k==2){
        		if ((item["produceid"] == result[j]["produceid"])) {
	                repeat = true;
	           	 	break;
	            }
        	}else if(k==3){
        		if ((item["employeesid"] == result[j]["employeesid"])) {
	                repeat = true;
	           	 	break;
	            }
        	}else if(k==4){
        		if ((item["id"] == result[j]["id"])) {
	                repeat = true;
	           	 	break;
	            }
        	}else if(k==5){
        		if ((item["bidnum"] == result[j]["bidnum"])) {
	                repeat = true;
	           	 	break;
	            }
        	}else if(k==6){
        		if ((item["produceid"] == result[j]["produceid"]) && (item["producesubbarcode"] == result[j]["producesubbarcode"]) && (item["indate"] == result[j]["indate"]) && (item["productiondate"] == result[j]["productiondate"]) && (item["iots"] == result[j]["iots"])) {
	                repeat = true;
	           	 	break;
	            }
	        }
            
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}
//员工去重
function deleteUniqueObjArrayYuan(array1, array2,k){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
                var repeat = false;

        if(k==1){
        	for (var j = 0; j < array2.length; j++) {
	            if (item1.employeesid == array2[j]) {
	            	 repeat = true;
	                break;
	            }
	        }  
        }else if(k==2){
        	for (var j = 0; j < array2.length; j++) {
	            if (item1.id == array2[j]) {
	            	 repeat = true;
	                break;
	            }
	        } 
        }else if(k==3){
        	for (var j = 0; j < array2.length; j++) {
	            if (item1.produceid == array2[j].produceid) {
	            	 repeat = true;
	                break;
	            }
	        } 
        }
      if (!repeat) {
        result.push(item1);
    }
    }
    return result;
}


/**
 * 合同
 * @param {Object} company
 * @param {Object} contract_type，0销售合同,1采购合同，2报价单
 */
function getduiyingHeTong(company,contract_type) {
	
		$.ajax({
			type: "get",
			url: localStorage.serIp+"/WebGetContractDropList?jsoncallback=?",
			dataType: "jsonp",
			async: true,
			data: {
				'userId': localStorage.userId,
				'userPw': localStorage.userPw,
				'database': localStorage.database,
				"groupCompanyId": localStorage.groupcompanyid,
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

//往来单位type:6(经销商和医院)，3供应商,4经销商，5医院,7经销商+子公司,8；-1全部;35(供应商和医院),510(医院+配送商),11双向合作商，311（供应商+双向合作商）,411(经销商+双向合作商)
function getunit(type,isdisable) {
		
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
				"groupCompanyId": localStorage.groupcompanyid,
				'type':type,
				'isdisable' : isdisable  // 参数0不停用，1停用，默认0
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



//往来单位type:6(经销商和医院)，3供应商,4经销商，5医院,7,经销商+子公司+双向合作商,8；-1全部;35(供应商和医院),510(医院+配送商),11双向合作商，311（供应商+双向合作商）,411(经销商+双向合作商)
function getunitByConfident(type,groupcompanyid,isdisable) {
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
				$('#unit').bComboSelect({
					showField: 'companyname',
					keyField: 'id',
					data: data
				});
			}
		});
	}


//获取货区type2所有
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
					var shelvesDate =[];
					shelvesDate.push({
						goodsshelves_id : "",
						goodsshelves_name :''
					})
					
					for(var i=0;i < goodsshelvesdata.length;i++){
						var slve = {};
						
						slve.goodsshelves_id = goodsshelvesdata[i].goodsshelves_id;
						slve.goodsshelves_name =  goodsshelvesdata[i].goodsshelves_name;
						
						shelvesDate.push(slve);
					}
					
					
					$('#duiyinggoodsshelvesId').bComboSelect({
						showField: 'goodsshelves_name',
						keyField: 'goodsshelves_id',
						data: shelvesDate
					});
			
				}
			});
		}
	
	
	//获取货架,用于直销备货，货架库存数量为0，显示红字
	function getGoodsShelvesDropList(id) {
			$.ajax({
				type: "get",
				url: localStorage.serIp+"/WebGetGoodsShelvesDropList?jsoncallback=?",
				dataType: "jsonp",
				async: true,
				data: {
					'userId': localStorage.userId,
					'userPw': localStorage.userPw,
					'database': localStorage.database,			
					"groupCompanyId": localStorage.groupcompanyid,
					"goodsareaid": id
				},
				success: function(res) {
					var goodsshelvesdata = JSON.parse(res);
					var shelvesDate =[];
					shelvesDate.push({
						goodsshelves_id : "",
						goodsshelves_name :''
					})
					
					for(var i=0;i < goodsshelvesdata.length;i++){
						var slve = {};
						
						slve.goodsshelves_id = goodsshelvesdata[i].goodsshelves_id;
						slve.goodsshelves_name =  goodsshelvesdata[i].goodsshelves_name;
						slve.producecount =  goodsshelvesdata[i].producecount;
						
						shelvesDate.push(slve);
					}
					
					
					$('#duiyinggoodsshelvesId').bComboSelect({
						showField: 'goodsshelves_name',
						keyField: 'goodsshelves_id',
						data: shelvesDate
					});
			
				}
			});
		}

	/**
	  * type 子公司映射仓加自营仓传(权限管理)1，0 子公司只能选择的自营仓,2所有：子公司映射仓加自营仓传
	  * @param {Object} type
	  */
	function stockList(type) {
		if(type == 1){
			type=1;
		}else{
			type=0;
		}
		$.ajax({
			type: "get",
			url:localStorage.serIp  + "/WebGetWarehouseListByDropDown?jsoncallback=?",
			async: true,
			dataType: 'jsonp',
			data: {
				"userId": localStorage.userId,
				"userPw": localStorage.userPw,
				'database': localStorage.database,
				'groupCompanyId': localStorage.groupcompanyid,
				'type':type
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
function staffList() {
	$.ajax({
		type: "get",
		url:  localStorage.serIp  +"/WebGetEmployeeDropDownList?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': localStorage.groupcompanyid
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


/**
 * 获取收款账户
 * @param {Object} companyid ;往来单位id,或者子公司
 * @param {Object} type;0:总公司获取自己 ,1子公司获取自己 companyid传groupcompanyid;2:获取往来单位, companyid传往来单位的自增长id
 */
function getAccountDropDownByConfident(companyid,type) {
	$.ajax({
		type: "get",
		url:  localStorage.serIp  +"/WebGetAccountDropList?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'companyid':companyid,
			'type': type
		},
		success: function(res) {
			var data = JSON.parse(res);
			$('#account').bComboSelect({
				showField: 'accountforprint',
				keyField: 'accountforprint',
				data: data
			});

		}
	});
}

/*
 * 去特殊符号
 */
function getJieXiData(code){
	var data = ToCDB(code);
	if(code != "" && code != null){

		data = data.replace(/\(|\)/g,'');
		data = data.replace(/\（|\）/g,'');
		data = data.replace(/\{|\}/g,'');
		data = data.replace(/\ +/g,"");
		data = data.replace(/　/g,"");
		var reg = new RegExp("￥","g");//g,表示全部替换。
		data = data.replace(reg,"$");
	}

	return data;
}

   //全角字符串转半角
  function ToCDB(str) {
       var tmp = "";
       for (var i = 0; i < str.length; i++) {
           if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
               tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
           }
           else {
               tmp += String.fromCharCode(str.charCodeAt(i));
           }
       }
       return tmp
   }
  
  
  //6.24号,删除实耗清点
  function deleteShiHaoQingDian(array1, array2){
    var result = [];
    for(var i = 0; i < array1.length; i++){
        var item1 = array1[i];
        var repeat = false;
        for (var j = 0; j < array2.length; j++) {
        	var item2 = array2[j];
	 		if ((item1.produceid == item2.produceid)&&(item1.producesubbarcode == item2.producesubbarcode)&&(item1.iots == item2.iots)&&(item1.productiondate == item2.productiondate)&&(item1.indate == item2.indate)) {
        		 repeat = true;
          	 	 break;
   			}
        }  
          if (!repeat) {
       		 result.push(item1);
    	}
      }
    return result;
}


//获取所属部门
function getowngroupList(companytypeid) {	
	
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

/**
 * 货区员工
 * @param {Object} groupcompanyid
 * @param {Object} employeedep
 */
function getstaffList(groupcompanyid,employeedep) {
	$.ajax({
		type: "post",
		url: localStorage.serIp+"/WebGetEmployeeDropDownList?jsoncallback=?",
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': groupcompanyid,
			'employeedep' : employeedep
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


/**
 * 判断日期格式是否正确
 * @param {Object} date
 */
function isValidateDate(date) {
     var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
     reg.exec(date);
     if (!reg.test(date) && RegExp.$2 <= 12 && RegExp.$3 <= 31) {
         return false;
     }
     var year, month, day;
     year = parseInt(date.split("-")[0], 10);
     month = parseInt(date.split("-")[1], 10);
     day = parseInt(date.split("-")[2], 10);
     if (! ((1 <= month) && (12 >= month) && (31 >= day) && (1 <= day))) {
         return false;
     }
     if ((month <= 7) && ((month % 2) == 0) && (day >= 31)) {
         return false;
     }
     if ((month >= 8) && ((month % 2) == 1) && (day >= 31)) {
         return false;
     }
     if (month == 2) {
         if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
             if (day > 29) {
                 return false;
             }
         } else {
             if (day > 28) {
                 return false;
             }
         }
     }
     return true;
 }

/**
 * 打印
 * @param {Object} method
 * @param {Object} orderNum
 */
function printWay(method,orderNum,pageType,ordertype){
	var url = localStorage.serImportIp;
	switch(method){
	
		
		
		case "DHHY":  //订货合约
			url += "/WebGetPrintOrderMasterInfoNew?jsoncallback=?";
		break;
		
		case "FXHY":  //分销合约
			url += "/WebPrintDistributionInfoNew?jsoncallback=?";
		break;
		
		case "RKYS":  //入库验收、赠送入库、分销退货,盘盈，试剂入库
			url += "/WebPrintInstockrecoverInfoNew?jsoncallback=?";
		break;
		case "CKYS":  //出库验收，采购退货，赠送出库，盘亏，试剂出库
			url += "/WebPrintOutstockrecoverInfoNew?jsoncallback=?";
		break;
		
//-----------------------------直销部分---------------------------------------------------
		case "ZXBH":  //直销手术备货
			url += "/WebPrintDirectSellingInfoNew?jsoncallback=?";
		break;
		case "SHQD":  //快速流程-实耗请点
			url += "/WebPrintRealUseInfoNew?jsoncallback=?";
		break;
		case "BKZX":  //快速流程-备库结算-直销核价
			url += "/WebPrintOutsettlementZX?jsoncallback=?";
		break;
		case "BKSH":  //快速流程-备库实耗
			url += "/WebPrintRealUseInfoNew?jsoncallback=?";
		break;
		case "CPJS":  //快速流程-产品结算
			url += "/WebPrintDirectAndProducePricing?jsoncallback=?";
		break;
		
//----------------------------------------借货管理------------------------------------------		
		case "JHCK":  //借货出库打印
			url += "/WebPrintLendInAndOutInfoNew?jsoncallback=?";
		break;	
		case "HHRK":  //还货入库
			url += "/WebReturnProducePrint?jsoncallback=?";
		break;
		case "JHRK":  //借货入库
			url += "/WebPrintLendInAndOutInfoNew?jsoncallback=?";
		break;
		case "HHCK":  //还货出库
			url += "/WebReturnProducePrint?jsoncallback=?";
		break;

//-------------------------仓库调拨---------------------------------------------	
		case "DBDJ":  //调拨
			url += "/WebWarehouseAllotPrint?jsoncallback=?";
		break;
		
//-----------------------财务管理-------------------------------------------------------		
		case "CGHJ":  //采购核价打印
			url += "/WebPrintInsettlementInfoNew?jsoncallback=?";
		break;
		case "FXHJ":  //分销核价打印
			url += "/WebPrintOutsettlementFX?jsoncallback=?";
		break;
		case "ZXHJ":  //直销核价打印
			url += "/WebPrintOutsettlementZX?jsoncallback=?";
		break;
		case "XSSKD":  //销售收款单打印
			url += "/WebPrintMboutpayInfo?jsoncallback=?";
		break;
		case "CGFKD":  //采购付款单打印
			url += "/WebPrintMbpaymoneyInfo?jsoncallback=?";
		break;
		case "FPQR":  //发票签入打印
			url += "/WebIninvoicePrint?jsoncallback=?";
		break;
		case "FXFPQKD":  //分销发票签出单打印
			url += "/WebOutinvoiceMasterFXPrint?jsoncallback=?";
		break;
		case "ZXFPQKD":  //直销发票签出单打印
			url += "/WebOutinvoiceMasterZXPrint?jsoncallback=?";
		break;
		
		
		
		case "CWDZD":  //财务对账单
			url += "/?jsoncallback=?";
		break;
		case "SZMX":  //收支明细
			url += "/?jsoncallback=?";
		break;
	}
	
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
		url: url,
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'groupCompanyId': localStorage.groupcompanyid,
			'orderNum' : orderNum,
			'ordertype' :ordertype,
			'pageType' : pageType
		},
		success: function(res) {
			parent.layer.close(jiazaiIndex);

			var res = JSON.parse(res);
			
			if(res.ResultValue == '0') {
				
				parent.layer.open({
					title: "提示",
					content: '服务器提出一个问题！',zIndex: parent.layer.zIndex //重点1
				});
				
				
			
					
		
			}else{
				
				url = "../../../../"+ res.ResultValue
				
				$("#pdfContainer").attr("src",url)
	 			setTimeout(function () {
	  	
	  				$("#pdfContainer")[0].contentWindow.print();
			

      			 },500);
				
					
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





/**
 * 往来单位打印
 * @param {Object} method
 * @param {Object} orderNum
 */
function unitPrintWay(method,id,title,pageType){
	var url = localStorage.serImportIp;
	switch(method){
		case "UNIT":  //往来单位打印
			url += "/WebPrintCompanyInfo?jsoncallback=?";
		break;
	}
	
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
		url: url,
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'companyid': id,
			'title' : title,
			'pageType' : pageType
		},
		success: function(res) {
			parent.layer.close(jiazaiIndex);

			var res = JSON.parse(res);
			
			if(res.ResultValue == '0') {
				
				parent.layer.open({
					title: "提示",
					content: '服务器提出一个问题！',zIndex: parent.layer.zIndex //重点1
				});
				
				
			
					
		
			}else{
				
				url = "../../../../"+ res.ResultValue
				
				$("#pdfContainer").attr("src",url)
	 			setTimeout(function () {
	  	
	  				$("#pdfContainer")[0].contentWindow.print();
			

      			 },500);
				
					
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
/**
 * 合并导出
 * @param {Object} method
 * @param {Object} idstr
 */
function combineExport(method,idstr){
	var myDate = new Date();

	var currentDate =  myDate.getFullYear() + '-' +(myDate.getMonth() + 1)  + '-'+  myDate.getDate();
	var timestamp=new Date().getTime();
	var jiazaiIndex;	
	
	var fileName = "";
	
	var url = localStorage.serIp;
	
	switch(method){
		
		case "KCCSH":  //库存初始化
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "库存初始化"+timestamp+".xls";
		break;
		case "CGHJ":  //采购核价
			url += "/WebExportInsettlementMasterInfo?jsoncallback=?";
			fileName = "采购核价"+timestamp+".xls";
		break;
		case "FXHJ":  //分销核价
			url += "/WebExportOutsettlementInfo?jsoncallback=?";
			fileName = "分销核价"+timestamp+".xls";
		break;
		case "ZXHJ":  //直销核价
			url += "/WebExportOutsettlementInfo?jsoncallback=?&outsettleType=1";  //0分销核价，1直销核价
			fileName = "直销核价"+timestamp+".xls";
		break;
		case "ZXHJSH":  //直销实耗
			url += "/WebExportOutSettlementAnRealUseInfo?jsoncallback=?&type=1";  //0分销核价，1直销核价
			fileName = "直销实耗"+timestamp+".xls";
		break;
		
		case "ZXBK":  //直销备库实耗
			url += "/WebExportOutSettlementAnRealUseInfo?jsoncallback=?";
			fileName = "直销备库结算实耗"+timestamp+".xls";
		break;
		case "ZXSH":  //备库实耗
			url += "/WebExportOutSettlementAnRealUseInfo?jsoncallback=?";
			fileName = "备库实耗"+timestamp+".xls";
		break;
		case "ZXBKHJ":  //直销备库核价
			url += "/WebExportOutsettlementInfo?jsoncallback=?&outsettleType=1";
			fileName = "直销备库结算核价"+timestamp+".xls";
		break;
		
		case "ZXCP":  //直销产品
			url += "/WebExportOutSettlementAnRealUseInfo?jsoncallback=?";
			fileName = "直销产品结算"+timestamp+".xls";
		break;
		case "RKYS":  //入库验收
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "入库验收"+timestamp+".xls";
		break;
		case "JHRK":  //借货入库
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "借货入库"+timestamp+".xls";
		break;
		case "FXTH":  //分销退货
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "分销退货"+timestamp+".xls";
		break;
		case "ZSRK":  //赠送入库
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "赠送入库"+timestamp+".xls";
		break;
		case "PY":  //盘盈
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "盘盈"+timestamp+".xls";
		break;
		case "BY":  //报溢
			url += "/WebExportStockInitializeInfo?jsoncallback=?";
			fileName = "报溢"+timestamp+".xls";
		break;
		case "DHHY":  //订货合约
			url = localStorage.serImportIp;
			url += "/WebExportOrderMasterInfo?jsoncallback=?";
			fileName = "订货合约"+timestamp+".xls";
		break;
		case "CKYK":  //出库验出
			url += "/WebExportOutstockrecoverInfo?jsoncallback=?";
			fileName = "出库验出"+timestamp+".xls";
		break;
		case "ZSCK":  //赠送出库
			url += "/WebExportOutstockrecoverInfo?jsoncallback=?";
			fileName = "赠送出库"+timestamp+".xls";
		break;
		case "PK":  //盘亏
			url += "/WebExportOutstockrecoverInfo?jsoncallback=?";
			fileName = "盘亏"+timestamp+".xls";
		break;
		case "BS":  //报损
			url += "/WebExportOutstockrecoverInfo?jsoncallback=?";
			fileName = "报损"+timestamp+".xls";
		break;
		
		case "JHCK":  //借货出库
			url += "/WebExportLendInAndOutInfo?jsoncallback=?";
			fileName = "借货出库.xls";
		break;
		case "CGTH":  //采购退货
			url += "/WebExportOutstockrecoverInfo?jsoncallback=?";
			fileName = "采购退货"+timestamp+".xls";
		break;
		case "FXHY":  //分销合约
			url = localStorage.serImportIp;
			url += "/WebExpotDistributionInfo?jsoncallback=?";
			fileName = "分销合约"+timestamp+".xls";
		break;
		case "FXFPQK":  //分销发票签出(直销分销)
			url += "/WebExportOutinvoiceInfo?jsoncallback=?";
			fileName = "发票签出"+timestamp+".xls";
		break;
		case "CKTZ":  //仓库台账
			url += "/WebExportOutinvoiceInfo?jsoncallback=?";
			fileName = "仓库台账"+timestamp+".xls";
		break;
		case "JHCKTJFX":  //网页端导出借货统计分析	
			url += "/WebGetLendInReportExport?jsoncallback=?";
			fileName = "借货出库统计分析"+timestamp+".xls";
		break;
			case "DFHFPMX":  //待复核发票明细命名	
			url += "/WebExportInvoiceApply?jsoncallback=?";
			fileName = "分销发票待复核"+timestamp+".xls";
		break;
		case "KCPD":  //盘点记录导出	
		 	url = localStorage.serImportIp;
			url += "/WebExportInventoryRecord?jsoncallback=?";
			fileName = "盘点记录"+timestamp+".xls";
		break;

	}
	 
	parent.layer.open({
	  type: 3, 
	  zIndex: parent.layer.zIndex, //重点1,
	  success: function(layero, index){
	  		jiazaiIndex = index;
		}
	});
	

	$.ajax({
		type: "get",
		url: url,
		async: true,
		dataType: 'jsonp',
		data: {
			"userId": localStorage.userId,
			"userPw": localStorage.userPw,
			'database': localStorage.database,
			'ordernumList': idstr,
			'fileName' : fileName
		},
		success: function(res) {
		
		
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
	
							
						
}


/**
 * layui控件获取表头方式
 */
function getTableHeadByPrintTemplate(gt,num){
	var gtStatus = 0;
	if(typeof(gt) != "undefined"){
		gtStatus = gt;
	}
	var tableNum = 0;
	if(typeof(num) != "undefined"){
		tableNum = num;
	}
	
	var table = $(".layui-form .layui-table-box .layui-table-header table:eq("+tableNum+") thead tr th:gt("+gtStatus+")");
			
	var jsonArray =[];	 
	 table.each(function(e){
	 	
	 	var property="";
	  	var name="";
	  	var width="100";
	  	
	  	property = $(this).attr("data-field");
	  	
	  	if(property == "" || typeof(property) == "undefined"){
	  		return true
	  	}
	  	
	  	if(property == "apportionprice" || property == "apportionpricetotal"){
  			return true
	  		
	  	}
	  	
	  	if(property == "referprice"){
  			if(localStorage.isshow == 1){
  				if(localStorage.viewrealcost==0){
  					return true
  				}
  				
  			}else{
  				return true
  			}
	  		
	  		
	  	}
	  	
		name =  $(this).find("span").text();
			
	  	var jsonObject = {
	  		"property" : property,
	  		"name" :  name,
	  		"width" : width,
	  		'checkbox':0
	  	}
	  	jsonArray.push(jsonObject);				
					
	});
	
	return jsonArray;

}


/**
 * 判断是否设置了打印
 *
 * @param {Object} type 单据类型
 * @param {Object} orderNum  订单号
 * @param {Object} ordertype  对应documenttype id
 */
function checkPrintIsSetting(type,orderNum,ordertype){
	
		
		$.ajax({
			type: "get",
			url: localStorage.serIp + "/WebGetPrintpropertyInfo?jsoncallback=?",
			async: false,
			dataType: "jsonp",
			data: {
				"userId": localStorage.userId,
				"userPw": localStorage.userPw,
				'database': localStorage.database,
				'ordertype' : ordertype
			},
			success: function(res) {
				var data = JSON.parse(res);
			
				if(data.length > 0){
					printSelect(type,orderNum,ordertype)
				}else{
					parent.layer.open({
						title: "提示",
						content: "您还没有进行打印设置!",
						zIndex: parent.layer.zIndex //重点1
						,
						success: function(layero) {
							parent.layer.setTop(layero); //重点2
						}
					});
				}
				
	
			
			}
					,
			error: function(res) {
		
				parent.layer.open({
							title: "提示",
							content: "服务器提出一个问题!",
							zIndex: parent.layer.zIndex //重点1
							,
							success: function(layero) {
								parent.layer.setTop(layero); //重点2
							}
						});
		
			}
		});
		
		
	
}


function printSelect(type,orderNum,ordertype){
								
					
	parent.layer.open({
		type: 2 //此处以iframe举例
			,
		title: '<img width="20px" src="image/logo.png" alt="" /><span style="margin-left:10px">单据打印</span>',
		area: ['450px', '300px'],
		zIndex: parent.layer.zIndex, //重点1
		content: 'views/public/PrintTemplate/DanJuPrintSelect.html',
		success: function(layero, index) {
			parent.layer.setTop(layero); //重点2
		
			var body = layer.getChildFrame('body', 'index');
			paentIfarame = layero.find("iframe")[0].contentWindow.document;
			$(".configPrint", paentIfarame).click(function() {
				var pageType = $("input[type='radio']:checked",paentIfarame).val();
				
				printWay(type,orderNum,pageType,ordertype);
				
				parent.layer.close(index); //再执行关闭     
			})
		},
		end: function() {
			if(sessionStorage.ordertype){
				sessionStorage.removeItem("ordertype")
			}
		
			
		}
	});
}
