/**
 * 包装打印
 */
//<%-- 运单打印模板 --%>
var printWayBillTemplate = function(wayBillData,cartonLabelData,isPrintOutbound) {
	//<%-- 打印模板 --%>
	var wayBill_Lodop_obj = getLodop();
	wayBill_Lodop_obj.PRINT_INITA("2mm","-2mm","98mm","98mm","printWayBillTemplate");
	wayBill_Lodop_obj.SET_PRINT_PAGESIZE(1,"100mm","100mm","");
	wayBill_Lodop_obj.SET_PRINT_MODE("RESELECT_PRINTER",true);
	//判断是否蜂云物流
	if(wayBillData.related_info1 == null){
	wayBill_Lodop_obj.ADD_PRINT_LINE(80,10,80,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(45,220,45,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(10,220,370,220,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(80,30,230,30,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(230,10,230,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(270,220,270,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(230,295,315,295,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(315,10,315,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(315,90,370,90,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(340,10,340,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_RECT(10,10,360,360,0,1);
	wayBill_Lodop_obj.ADD_PRINT_BARCODE(14,24,217,64,"EAN128A",cartonLabelData.boxNo);
	wayBill_Lodop_obj.ADD_PRINT_BARCODE(235,39,180,58,"128A",wayBillData.wayBillCode);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"ShowBarText",0);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(294,44,165,25,wayBillData.wayBillCodeFormat);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(115,13,29,112,"客户信息");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(245,245,45,25,"重量");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(287,225,70,35,wayBillData.realWeight+'KG');
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(282,297,78,36,cartonLabelData.boxQty);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",16);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(245,312,47,26,"件数");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(322,26,79,25,"发件日期");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(322,131,53,25,"始发地");
	
	wayBill_Lodop_obj.ADD_PRINT_TEXT(345,18,84,20,wayBillData.sendDate);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(345,112,137,26,cartonLabelData.platName);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(346,266,110,24,cartonLabelData.shipWarehouse);
	if(wayBillData.billType =="AFTERSALE_SHIP"){
		wayBill_Lodop_obj.ADD_PRINT_TEXT(12,200,150,43,cartonLabelData.toPlatFormName);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(55,350,100,30,cartonLabelData.toPlatNo);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Italic",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(48,222,145,73,cartonLabelData.toDistrict);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Alignment",3);
		wayBill_Lodop_obj.ADD_PRINT_TABLE(84,240,100,92,wayBillData.seal);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(318,289,27,25,"H");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(180,230,138,54,wayBillData.description);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",9);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	}else{
		//加急图标放到外层 by zangdongjin
		/*if(wayBillData.urgent==1){
			wayBill_Lodop_obj. ADD_PRINT_SETUP_BKIMG("<img border='0' src='../images/urgent.png' style='z-index: -1;'/>");
			wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_IN_PREVIEW",1);
			wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_PRINT",1);
			wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_LEFT",200);
			wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_TOP",200);	
		}*/
		wayBill_Lodop_obj.ADD_PRINT_TEXT(10,222,150,38,cartonLabelData.toProvinceName);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(44,200,150,43,cartonLabelData.toPlatFormName);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Alignment",2);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(55,350,100,30,cartonLabelData.toPlatNo);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Italic",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(83,222,145,37,cartonLabelData.toDistrict);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Alignment",3);
		wayBill_Lodop_obj.ADD_PRINT_LINE(150,220,150,370,0,1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(159,231,23,59,"客户签收");
		if((wayBillData.unReceivePayAmount).indexOf("￥0.0元")<0){
			wayBill_Lodop_obj.ADD_PRINT_LINE(118,222,117,369,0,1);
			wayBill_Lodop_obj.ADD_PRINT_TEXT(124,258,100,30,"代收货款");
			wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",15);
			wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Italic",1);
		}
		//wayBill_Lodop_obj.ADD_PRINT_TEXT(111,250,115,55,wayBillData.unReceivePayAmount);
		//wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",15);
		//wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(211,249,115,23,"     年   月   日");
		wayBill_Lodop_obj.ADD_PRINT_LINE(200,250,200,370,0,1);
		wayBill_Lodop_obj.ADD_PRINT_LINE(150,250,230,250,0,1);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(318,289,27,25,"C");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
	}
	wayBill_Lodop_obj.ADD_PRINT_TEXT(83,35,191,46,wayBillData.toReceiverName);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(128,34,189,20,wayBillData.toReceiverContactorName);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(148,35,188,21,wayBillData.toReceiverContactorPhone);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(169,34,188,62,wayBillData.toTransLocationAddress);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",10);
	
	//加急图标  by zangdongjin 
	if(wayBillData.urgent==1){
		wayBill_Lodop_obj. ADD_PRINT_SETUP_BKIMG("<img border='0' src='../resource/img/urgent.png' style='z-index: -1;'/>");
		wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_IN_PREVIEW",1);
		wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_PRINT",1);
		wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_LEFT",200);
		wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_TOP",200);	
	}
	
	}else{
		wayBill_Lodop_obj.ADD_PRINT_TEXT(128,34,189,20,wayBillData.related_info1);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",30);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
		
		wayBill_Lodop_obj.ADD_PRINT_BARCODE(235,39,180,58,"128A",wayBillData.wayBillCode);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"ShowBarText",0);
		wayBill_Lodop_obj.ADD_PRINT_TEXT(294,44,165,25,wayBillData.wayBillCodeFormat);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	}
	if(wayBill_Lodop_obj.SET_PRINTER_INDEXA("EW")){
		//wayBill_Lodop_obj.PREVIEW();
		//wayBill_Lodop_obj.PRINT_DESIGN();
		wayBill_Lodop_obj.PRINT();
	}
};
//<%--打印运单--%>
var checkAndPackage_printWaybill = function(isPrintOutboundList){
	var status = $("#checkAndPackage_status").val();
	var wayBillData = {};
	var wmsOutboundId = $("#checkAndPackage_cw_outBoundId").val();
	if(wmsOutboundId) {
		if(status == "FINISHED"){
			$.ajax({
				url:""+ Comm_Config + "wmsPackageTask/getWayBillData",
				method:'post',
				data:{
					wmsOutboundId: $("#checkAndPackage_cw_outBoundId").val(),
					wmsPackageTaskId: $("#checkAndPackage_cc_packageTaskId").val()
				},
				dataType:'json',
				cache:false,
				success:function(data){
					if(data.additionalMsg.status == "成功"){
						var wayBillDataObject = data.wayBillDataObject;
						//<%--运单号 --%>
						wayBillData.wayBillCode = wayBillDataObject.wayBillCode;
						wayBillData.urgent = wayBillDataObject.urgent;
						wayBillData.wayBillCodeFormat = wayBillDataObject.wayBillCodeFormat;
						//<%--收件 --%>
						wayBillData.toReceiverContactorName = wayBillDataObject.toReceiverContactorName;
						wayBillData.toReceiverContactorPhone = wayBillDataObject.toReceiverContactorPhone;
						wayBillData.toReceiverName = wayBillDataObject.toReceiverName;
						wayBillData.toTransLocationAddress = wayBillDataObject.toTransLocationcAddress;
						wayBillData.toCityName = wayBillDataObject.toCityName;
						wayBillData.unReceivePayAmount = "￥"+wayBillDataObject.unReceivePayAmount+"元";
						//<%--内件品名 --%>
						wayBillData.productKind = wayBillDataObject.productKind;
						//<%--寄件 --%>
						wayBillData.sender = wayBillDataObject.sender;
						wayBillData.senderPhone = wayBillDataObject.senderPhone;
						wayBillData.senderAddress = wayBillDataObject.senderAddress;
						wayBillData.senderCityName = wayBillDataObject.senderCityName;
						wayBillData.pickPersion = wayBillDataObject.pickPersion;
						wayBillData.dispatchPerson = wayBillDataObject.dispatchPerson;
						wayBillData.sendDate = wayBillDataObject.sendDate;
						//<%--货主 --%>
						wayBillData.ownerName = wayBillDataObject.ownerName;
						wayBillData.ownerMemo = wayBillDataObject.ownerMemo;
						//<%--件数、重量 --%>
						wayBillData.boxQuantity = wayBillDataObject.boxQuantity;
						wayBillData.realWeight = wayBillDataObject.realWeight;
						wayBillData.chargedWeight = wayBillDataObject.chargedWeight;
						wayBillData.freight = wayBillDataObject.freight;
						wayBillData.totalCost = wayBillDataObject.totalCost;
						//<%--费用 --%>
						wayBillData.payType = wayBillDataObject.payType;
						wayBillData.declaredValue = wayBillDataObject.declaredValue;
						wayBillData.premium = wayBillDataObject.premium;
						//<%--描述 --%>
						wayBillData.description = wayBillDataObject.description;
						
						//<%-- 单据类型编码 --%>
						wayBillData.billType = wayBillDataObject.billType;
						//<%-- 售后印章--%>
						wayBillData.seal = wayBillDataObject.seal;
						//<%-- 物流公司--%>
						wayBillData.related_info1 = wayBillDataObject.related_info1;
						var cartonLabelObjectList = data.cartonLabelObjectList;
						if(cartonLabelObjectList) {
							//遍历数据
							$.each(cartonLabelObjectList,function(index,item){
								var cartonLabelData = {};
								var toTranslocation = item.toTranslocation.split('_');
								cartonLabelData.boxNo = item.boxNo;
								cartonLabelData.toCity = toTranslocation[0];
								cartonLabelData.toDistrict = toTranslocation[1];
								cartonLabelData.toProvinceName = toTranslocation[2];
								cartonLabelData.wayBillCode = item.wayBillCode;
								cartonLabelData.boxQty = item.boxQty;
								cartonLabelData.routeLineCode = item.routeLineCode;
								cartonLabelData.toReceiverName = item.toReceiverName;
								cartonLabelData.originalCode = item.originalCode;
								cartonLabelData.platName = item.platName;
								cartonLabelData.shipWarehouse = item.shipWarehouse;
								cartonLabelData.shipDate = item.shipDate;
								cartonLabelData.toPlatFormName = item.toPlatFormName;
								cartonLabelData.toPlatNo=item.toPlatNo;
								//<%-- 调用运单打印模板(包含箱标贴)--%>
								printWayBillTemplate(wayBillData,cartonLabelData,isPrintOutboundList);
							});
						} else {
							/*msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未找到包装明细！]</b>");*/
                            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[未找到包装明细！]</b>");
                            $('#checkAndPackage_msg').delay(3000).hide(0);
							
						}
					} else {
						/*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
						$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
						$('#checkAndPackage_msg').delay(3000).hide(0);
					}
				}
			});
		}else{
			/*msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未结束包装，不能打印运单！]</b>");*/
			$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[未结束包装，不能打印运单！]</b>");
			$('#checkAndPackage_msg').delay(3000).hide(0);
		}
	} else {
		/*msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[数据为空！]</b>");*/
		$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[数据为空！]</b>");
		$('#checkAndPackage_msg').delay(3000).hide(0);

	}
};


//<%--打印单张箱标贴--%>
var printCartonlabel = function(wmsPackageTaskDetailId){
	var status = $("#checkAndPackage_status").val();
	var wayBillData = {};
	if(status == "FINISHED"){
		//<%-- 取得数据 --%>
		var cartonLabelData = {};
		$.ajax({
			url:""+ Comm_Config + "wmsPackageTask/getCartonLabelData",
			method:'post',
			data:{
				wmsOutboundId: $("#checkAndPackage_cw_outBoundId").val(),
				wmsPackageTaskDetailId: wmsPackageTaskDetailId
			},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.additionalMsg.status == "成功"){
					var wayBillDataObject = data.wayBillDataObject;
					//<%--运单号 --%>
					wayBillData.wayBillCode = wayBillDataObject.wayBillCode;
					wayBillData.wayBillCodeFormat = wayBillDataObject.wayBillCodeFormat;
					//<%--收件 --%>
					wayBillData.toReceiverContactorName = wayBillDataObject.toReceiverContactorName;
					wayBillData.toReceiverContactorPhone = wayBillDataObject.toReceiverContactorPhone;
					wayBillData.toReceiverName = wayBillDataObject.toReceiverName;
					wayBillData.toTransLocationAddress = wayBillDataObject.toTransLocationcAddress;
					wayBillData.toCityName = wayBillDataObject.toCityName;
					wayBillData.unReceivePayAmount = "￥"+wayBillDataObject.unReceivePayAmount+"元";
					//<%--内件品名 --%>
					wayBillData.productKind = wayBillDataObject.productKind;
					//<%--寄件 --%>
					wayBillData.sender = wayBillDataObject.sender;
					wayBillData.senderPhone = wayBillDataObject.senderPhone;
					wayBillData.senderAddress = wayBillDataObject.senderAddress;
					wayBillData.senderCityName = wayBillDataObject.senderCityName;
					wayBillData.pickPersion = wayBillDataObject.pickPersion;
					wayBillData.dispatchPerson = wayBillDataObject.dispatchPerson;
					wayBillData.sendDate = wayBillDataObject.sendDate;
					//<%--货主 --%>
					wayBillData.ownerName = wayBillDataObject.ownerName;
					wayBillData.ownerMemo = wayBillDataObject.ownerMemo;
					//<%--件数、重量 --%>
					wayBillData.boxQuantity = wayBillDataObject.boxQuantity;
					wayBillData.realWeight = wayBillDataObject.realWeight;
					wayBillData.chargedWeight = wayBillDataObject.chargedWeight;
					wayBillData.freight = wayBillDataObject.freight;
					wayBillData.totalCost = wayBillDataObject.totalCost;
					//<%--费用 --%>
					wayBillData.payType = wayBillDataObject.payType;
					wayBillData.declaredValue = wayBillDataObject.declaredValue;
					wayBillData.premium = wayBillDataObject.premium;
					//<%--描述 --%>
					wayBillData.description = wayBillDataObject.description;
					
					
					var toTranslocation = data.cartonLabelObject.toTranslocation.split('_');
					
					cartonLabelData.boxNo = data.cartonLabelObject.boxNo;
					cartonLabelData.toCity = toTranslocation[0];
					cartonLabelData.toDistrict = toTranslocation[1];
					cartonLabelData.wayBillCode = data.cartonLabelObject.wayBillCode;
					cartonLabelData.boxQty = data.cartonLabelObject.boxQty;
					cartonLabelData.routeLineCode = data.cartonLabelObject.routeLineCode;
					cartonLabelData.toReceiverName = data.cartonLabelObject.toReceiverName;
					cartonLabelData.originalCode = data.cartonLabelObject.originalCode;
					cartonLabelData.shipWarehouse = data.cartonLabelObject.shipWarehouse;
					cartonLabelData.shipDate = data.cartonLabelObject.shipDate;
					cartonLabelData.toPlatFormName = data.cartonLabelObject.toPlatFormName;
					//<%-- 调用箱标贴打印模板 --%>
					printWayBillTemplate(wayBillData,cartonLabelData);
				} else {
					msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);
				}
			}
		}); 
	}else{
		msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未结束包装，不能打印箱标贴！]</b>");
	}
};

//<%-- 包装记录面板 打印箱标贴 --%>
var checkAndPackage_printCartonLabel = function() {
	var selections = $("#checkAndPackage_wmsPackageTaskDetail").datagrid('getSelections');
	if(selections.length == 1) {
		printCartonlabel(selections[0].id);
	}else{
		msgObj.invalidSelectMsg($("#checkAndPackage_msg"));
	}
};

//<%--连续打印箱标贴--%>
var printCartonlabels = function(){
	var status = $("#checkAndPackage_status").val();
	if("" == status) {
		msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[数据为空！]</b>");
	}else if(status == "FINISHED"){
		//<%-- 取得数据 --%>
		$.ajax({
			url:""+ Comm_Config + "wmsPackageTask/getCartonLabelDatas",
			method:'post',
			data:{
				wmsPackageTaskId: $("#checkAndPackage_id").val()
			},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.additionalMsg.status == "成功"){
					var cartonLabelObjectList = data.cartonLabelObjectList;
					if(cartonLabelObjectList) {
						//遍历数据
						$.each(cartonLabelObjectList,function(index,item){
							var cartonLabelData = {};
							var toTranslocation = item.toTranslocation.split('_');
							cartonLabelData.boxNo = item.boxNo;
							cartonLabelData.toCity = toTranslocation[0];
							cartonLabelData.toDistrict = toTranslocation[1];
							cartonLabelData.wayBillCode = item.wayBillCode;
							cartonLabelData.boxQty = item.boxQty;
							cartonLabelData.routeLineCode = item.routeLineCode;
							cartonLabelData.toReceiverName = item.toReceiverName;
							cartonLabelData.originalCode = item.originalCode;
							cartonLabelData.shipWarehouse = item.shipWarehouse;
							cartonLabelData.shipDate = item.shipDate;
							cartonLabelData.toPlatFormName = item.toPlatFormName;
							//<%-- 调用箱标贴打印模板 --%>
							printCartonLabelTemplate(cartonLabelData);
						});
					} else {
						msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未找到包装明细！]</b>");
					}
				} else {
					msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);
				}
			}
		}); 
	}else{
		msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未结束包装，不能打印箱标贴！]</b>");
	}
};



//<%--打印发货清单--%>
var checkAndPackage_printOutbound = function(isPrintCartonLable){

	var status = $("#checkAndPackage_status").val();
	if("" == status) {
		/*msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[数据为空！]</b>");*/
		$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[数据为空！]</b>");
		$('#checkAndPackage_msg').delay(3000).hide(0);

	}else if(status == "FINISHED"){
		var outBill_lodop=getLodop(); 
		var ifPrintSerial = $('#ifPrintSerialNo').is(':checked');
		var wmsPackageTaskId  = $("#checkAndPackage_cc_packageTaskId").val();
		var init = outBill_lodop.PRINT_INIT("outbill_print");
		if(!init){
			/*$.messager.alert("提示", "打印机初始化失败！","info");*/
			alert("打印机初始化失败！");
			return;
		}
		$.ajax({
			url:""+ Comm_Config + "wmsPackageTask/getShippingTable",

			method:'post',
			data:{
				id:wmsPackageTaskId,
				ifPrintSerial : ifPrintSerial
			},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.additionalMsg.status == "成功"){
					 	var shipData0 = data.shippingTable.split("</table>")[0]+"</table>";
					 	var shipData1 = data.shippingTable.split("</table>")[1]+"</table>";
					 	var shipData2 = data.shippingTable.split("</table>")[2]+"</table>";
					 	var continuity = data.continuity; //是否分两页打印
					 	var projectCode=data.projectCode;
					 	var barcodeId = $('#barcodeId').val();
					 	if(projectCode=='51FAST'||projectCode=='51CHANGE'){
							outBill_lodop.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",true);
							outBill_lodop.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
							outBill_lodop.ADD_PRINT_TABLE(60,0,"100%","85%",shipData0);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData1);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData2);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_BARCODE(70,"74%",170,45,"128A",barcodeId);
							outBill_lodop.SET_PRINT_STYLEA(0,"FontSize",13);
							outBill_lodop.ADD_PRINT_LINE("90.5mm","1mm","90.5mm","195mm",2,0);
							outBill_lodop.ADD_PRINT_TEXT("88.5mm","95mm","30mm","10mm","沿此线剪开");
							outBill_lodop.ADD_PRINT_TABLE(380,0,"100%","85%",shipData0);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData1);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData2);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_BARCODE(390,"74%",170,45,"128A",barcodeId);
						    outBill_lodop.SET_PRINT_STYLEA(0,"FontSize",13);
							outBill_lodop.ADD_PRINT_LINE("180.5mm","1mm","180.5mm","195mm",2,0);
							outBill_lodop.ADD_PRINT_TEXT("178.5mm","95mm","30mm","10mm","沿此线剪开");
							outBill_lodop.ADD_PRINT_TABLE(740,0,"100%","85%",shipData0);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData1);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData2);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_BARCODE(750,"74%",170,45,"128A",barcodeId);
						    outBill_lodop.SET_PRINT_STYLEA(0,"FontSize",13);
					    }else{
					    	outBill_lodop.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",true);
							outBill_lodop.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
							outBill_lodop.ADD_PRINT_TABLE(60,0,"100%","85%",shipData0);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData1);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData2);
							outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
							outBill_lodop.ADD_PRINT_BARCODE(70,"74%",170,45,"128A",barcodeId);
							outBill_lodop.SET_PRINT_STYLEA(0,"FontSize",13);
							if(!continuity){
								outBill_lodop.ADD_PRINT_LINE("150.5mm","1mm","150.5mm","195mm",2,0);
								outBill_lodop.ADD_PRINT_TEXT("148.5mm","95mm","30mm","10mm","沿此线剪开");
								outBill_lodop.ADD_PRINT_TABLE(620,0,"100%","85%",shipData0);
								outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData1);
								outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
								outBill_lodop.ADD_PRINT_TABLE(0,0,"100%","85%",shipData2);
								outBill_lodop.SET_PRINT_STYLEA(0,"LinkedItem",-1);
								outBill_lodop.ADD_PRINT_BARCODE(630,"74%",170,45,"128A",barcodeId);
							    outBill_lodop.SET_PRINT_STYLEA(0,"FontSize",13);
							}
					    	
					    }
							if(outBill_lodop.SET_PRINTER_INDEXA("-1")){
								if(continuity){
									outBill_lodop.SET_PRINT_COPIES(2);
								}
								//outBill_lodop.print_design();
								outBill_lodop.PRINT();
								//outBill_lodop.PREVIEW();
							}
							if("undefined" != typeof isPrintCartonLable) {
								checkAndPackage_printWaybill();
							}
				}else{
					/*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
					$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
					$('#checkAndPackage_msg').delay(3000).hide(0);
				}
			}
		});
	}else{
		/*msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[未结束包装，不能打印发货清单！]</b>");*/
		$("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[未结束包装，不能打印发货清单！]</b>");
		$('#checkAndPackage_msg').delay(3000).hide(0);
	}
};

//<%--打印退货单--%>
var wmsOutbound_print = function(type){
		var outBound_lodop=getLodop(); 
		var selections = $("#wmsOutbound").datagrid('getSelections');
		var printType = selections[0].billType.code;
		var outboundId  = selections[0].id;
		var init = outBound_lodop.PRINT_INIT("outbound_print");
		if(!init){
			$.messager.alert("提示", "打印机初始化失败！","info");
			return;
		}
		$.ajax({
			url:""+ Comm_Config + "wmsOutbound/getPrintOutboundTable",
			method:'post',
			data:{
				id:outboundId,
				ifPrintSerial : type,
				printType : printType
			},
			dataType:'json',
			cache:false,
			success:function(data){
				if(data.additionalMsg.status == "成功"){
					 	var outboundData = data.wmsOutboundTable;
					 	var barcodeId = data.barCodeId;
					 	outBound_lodop.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",true);
					 	outBound_lodop.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
					 	outBound_lodop.ADD_PRINT_TABLE(60,0,"100%","85%",outboundData);
					 	outBound_lodop.ADD_PRINT_BARCODE(10,"79%",160,50,"128A",barcodeId);
							if(outBound_lodop.SET_PRINTER_INDEXA("-1")){
								outBound_lodop.SET_PRINT_COPIES(2);
								outBound_lodop.PREVIEW();
							}
				}else{
					msgObj.ajaxResponseMsg($("#wmsOutbound_msg"), data);
				}
				$("#printDialog").dialog('close');
			}
		});
};

function getStatuMessage(statusID) { 
	var messages="";
	if (statusID & 1) messages += "已暂停 -";
	if (statusID & 2) messages += "错误 -";
	if (statusID & 4) messages += "正删除 -";
	if (statusID & 8) messages += "进入队列 -";
	if (statusID & 16) messages += "正在打印 -";
	if (statusID & 32) messages += "脱机 -";
	if (statusID & 64) messages += "缺纸 -";
	if (statusID & 128) messages += "打印结束 -";
	if (statusID & 256) messages += "已删除 -";
	if (statusID & 512) messages += "堵了 -";
	if (statusID & 1024) messages += "用户介入 -";
	if (statusID & 2048) messages += "正在重新启动 -";
	return messages;
}



function printShipOnlyTemplate(supplierName,params){
	var shipOnly_Lodop_obj = getLodop();
	
	$.ajax({
		url:""+ Comm_Config + "tmsOrderShipOnly/printShipOnly",
		method:'post',
		data:params,
		dataType:'json',
		cache:false,
		success:function(data){
			if(data.additionalMsg.status == "成功"){
				 	var innerTable = data.tableInfo;
				 	var dateTime = data.dateTime;
				 	var totalValue = data.totalValue;
				 	var box = data.box;
				 	shipOnly_Lodop_obj.PRINT_INIT("揽件明细单");
					shipOnly_Lodop_obj.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
					shipOnly_Lodop_obj.ADD_PRINT_TEXT(20,254,219,47,"揽件明细单");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",23);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_HTM(1,600,300,100,"总页号：<font color='#0000ff' format='ChineseNum'><span tdata='pageNO'>第##页</span>/<span tdata='pageCount'>共##页</span></font>");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_TEXT(82,26,702,26,"供应商：" + supplierName);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_TEXT(109,26,226,28,"揽件日期："+dateTime);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_TEXT(109,261,226,28,"揽件票数："+totalValue);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_TEXT(109,501,226,28,"揽件件数："+box);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontName","黑体");
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",13);
					shipOnly_Lodop_obj.SET_PRINT_STYLEA(0,"ItemType",1);
					shipOnly_Lodop_obj.ADD_PRINT_TABLE(138,22,"100%","85%",innerTable);
					shipOnly_Lodop_obj.PREVIEW(); //打印预览 	
					/*shipOnly_Lodop_obj.PRINT_DESIGN();*/   
			}
		}
	});
}



//<%-- 售后打印模板  （老式面单） --%>
var printOldWayBillTemplate = function(name) {
	var selections = $("#"+name).datagrid('getSelections');
	if(selections.length>10){
		$.messager.alert('提示','一次最多打印10条数据，请重新选择！','warning');
		return false;
	}
	for (var i=0;i<selections.length;i++){
		var flag = 0;/* 辨别打印机是否是690版本  0'否'  1'是'*/
	//<%-- 打印模板 --%>
	var wayBill_Lodop_obj = getLodop();
	if(wayBill_Lodop_obj.GET_PRINTER_NAME(-1) == "OW690"){/*690版本的老式打印机*/
		wayBill_Lodop_obj.PRINT_INITA(0,0,"232mm","127mm","printWayBillTemplate");
		wayBill_Lodop_obj.SET_PRINT_PAGESIZE(1,2840,1270,"");
		wayBill_Lodop_obj.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
		wayBill_Lodop_obj.ADD_PRINT_TEXT("23.94mm","104.78mm","28.31mm","5.29mm",selections[i].toReceiverContact.city);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT("24.21mm","149.91mm","25.96mm","5.29mm",selections[i].toReceiverContact.contactor);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT("41.8mm","106.6mm","66.68mm","17.73mm",selections[i].toReceiverContact.address );
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",11);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"LineSpacing",18);
		wayBill_Lodop_obj.ADD_PRINT_TEXT("59.58mm","104.72mm","70.01mm","5.29mm",selections[i].toReceiverContact.mobile);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT(411,338,284,25,selections[i].code);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Alignment",2);
		flag=1;
	}else{
		wayBill_Lodop_obj.PRINT_INITA(0,"50.2mm","232mm","127mm","printWayBillTemplate");
		wayBill_Lodop_obj.SET_PRINT_PAGESIZE(1,2840,1270,"");
		wayBill_Lodop_obj.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
		
		wayBill_Lodop_obj.ADD_PRINT_TEXT("22.88mm","135.47mm","28.31mm","5.29mm",selections[i].toReceiverContact.city);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT("22.88mm","202.29mm","21.99mm","5.29mm",selections[i].toReceiverContact.contactor);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT("42.07mm","138.09mm","74.61mm","17.73mm",selections[i].toReceiverContact.address );
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",11);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"LineSpacing",18);
		wayBill_Lodop_obj.ADD_PRINT_TEXT("60.38mm","135.15mm","70.01mm","5.29mm",selections[i].toReceiverContact.mobile);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.ADD_PRINT_TEXT(420,452,284,25,selections[i].code);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
		wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Alignment",2);
	}
	
	wayBill_Lodop_obj.ADD_PRINT_SETUP_BKIMG("<img border='0' src='../images/printBg/wayBill.jpg'>");
	wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_WIDTH","232mm");
	wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_HEIGHT","127mm");
	wayBill_Lodop_obj.SET_SHOW_MODE("BKIMG_PRINT",false);
	
	wayBill_Lodop_obj.ADD_PRINT_TEXT("22.88mm","2.88mm","19.84mm","6.61mm",selections[i].fromReceiverContact.contactor);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(86,199,180,25,selections[i].fromReceiverContact.city);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(150,31,282,67,selections[i].fromReceiverContact.address);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",11);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"LineSpacing",18);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(250,0,197,61,selections[i].description);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",10);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(226,33,265,20,selections[i].fromReceiverContact.mobile);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontColor","#808080");

		if(flag==1){
			if(wayBill_Lodop_obj.SET_PRINTER_INDEXA( "OW690")){
				wayBill_Lodop_obj.PRINT();
			}
		}else{
			if (wayBill_Lodop_obj.SET_PRINTER_INDEXA("OW")){
				wayBill_Lodop_obj.PRINT();
			}
		}
		//wayBill_Lodop_obj.PRINT_DESIGN();
	}
	//<%-- 修改运单打印状态 --%> 
	update_printStatus(selections);
	
};

var printNewWayBillTemplate = function(name,wayBillCodes) {
	var selections = $("#"+name).datagrid('getSelections');
	if(selections.length>10){
		$.messager.alert('提示','一次最多打印10条数据，请重新选择！','warning');
		return false;
	}
	for (var i=0;i<selections.length;i++){
	var wayBill_Lodop_obj = getLodop();
	wayBill_Lodop_obj.PRINT_INITA("2mm","-2mm","98mm","98mm","printWayBillTemplate");
	wayBill_Lodop_obj.SET_PRINT_PAGESIZE(1,"100mm","100mm","");
	wayBill_Lodop_obj.SET_PRINT_MODE("RESELECT_PRINTER",true);
	wayBill_Lodop_obj.ADD_PRINT_RECT(10,10,360,360,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(10,220,370,220,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(80,10,80,220,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(230,10,230,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(315,10,315,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(340,10,340,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(50,220,50,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(120,220,120,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(275,220,275,370,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(80,30,230,30,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(315,90,370,90,0,1);
	wayBill_Lodop_obj.ADD_PRINT_LINE(230,295,370,295,0,1);
	
	wayBill_Lodop_obj.ADD_PRINT_BARCODE(14,24,217,64,"EAN128A",selections[i].code);
	wayBill_Lodop_obj.ADD_PRINT_BARCODE(240,39,180,58,"128A",wayBillCodes[i]);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(115,13,29,112,"客户信息");
	
	wayBill_Lodop_obj.ADD_PRINT_TEXT(123,225,140,25,selections[i].toReceiverName);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(143,225,140,25,selections[i].toReceiverContact.contactor);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(160,225,160,20,selections[i].toReceiverContact.mobile);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",12);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(180,225,140,50,selections[i].toReceiverContact.address);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",10);
	
	
	wayBill_Lodop_obj.ADD_PRINT_TEXT(322,26,79,25,"发件日期");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(322,131,53,25,"始发地");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(348,18,84,20,selections[i].realShipTime);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(348,130,140,30,selections[i].fromPlatForm.name);
	
	wayBill_Lodop_obj.ADD_PRINT_TEXT(15,225,79,25,selections[i].toReceiverContact.city);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(15,270,79,25,"售后服务部");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(35,225,79,25,"收件人");
	wayBill_Lodop_obj.ADD_PRINT_TEXT(35,270,125,25,selections[i].toReceiverContact.contactor);

	wayBill_Lodop_obj.ADD_PRINT_TEXT(90,40,180,120,selections[i].description);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(250,235,100,25,"重量");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(250,320,100,25,"件数");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(320,230,79,25,"寄件人");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(320,310,79,25,"收件人");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(60,225,150,25,selections[i].fromReceiverContact.address);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",10);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(98,225,160,25,"电话:");
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"FontSize",8);
	wayBill_Lodop_obj.ADD_PRINT_TEXT(98,255,160,25,selections[i].fromReceiverContact.mobile);
	wayBill_Lodop_obj.SET_PRINT_STYLEA(0,"Bold",1);
	if(wayBill_Lodop_obj.SET_PRINTER_INDEXA("EW")){
		//wayBill_Lodop_obj.PREVIEW();
		//wayBill_Lodop_obj.PRINT_DESIGN();
		wayBill_Lodop_obj.PRINT();
	}
	}
	
}


/**
 * 打印库位单
 * @author zangdongjin
 * @date 2016/4/28
 */
var printBisWarehouseLocation = function(){
	var data = $("#bisWarehouseLocation").datagrid('getSelections');
	var type = $("input[name='type']:checked").val();	//1地面库位 2货架库位
	
	var DPI = js_getDPI();
	var DPIX = DPI[0];
	var DPIY = DPI[1];
	
	if(data == null || data == ''){
		$.messager.alert("提示", "数据非法","info");
		return;
	}
	if(type != '1' && type != '2'){
		$.messager.alert("提示", "库位类型非法","info");
		return;
	}
	var bisWarehouseLocation_lodop =getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
	for(var i=0; i<data.length; i++){
		if(type == '1'){
			bisWarehouseLocation_lodop.PRINT_INITA(0+"px",mmToPx(3.5,DPIX)+"px",mmToPx(93,DPIX)+"px",mmToPx(100,DPIX)+"px","bisWarehouseLocation");
			bisWarehouseLocation_lodop.SET_PRINT_PAGESIZE(1,mmToPx(100,DPIX)+"px",mmToPx(100,DPIY)+"px","");
			bisWarehouseLocation_lodop.ADD_PRINT_BARCODE(mmToPx(14,DPIX)+"px",mmToPx(3.5,DPIX)+"px",mmToPx(93,DPIX)+"px",mmToPx(53,DPIX)+"px", "128A", data[i].code);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"ShowBarText",0);
			bisWarehouseLocation_lodop.ADD_PRINT_TEXT(mmToPx(70,DPIX)+"px",mmToPx(3.5,DPIX)+"px",mmToPx(100,DPIX)+"px",mmToPx(7,DPIX)+"px",data[i].code);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"FontName","黑体");
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"Bold",1);
			
			//字体大小随编码长度变化而变化
			var fontSize = parseInt(480/data[i].code.length);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"FontSize",fontSize);
		}else{
			bisWarehouseLocation_lodop.PRINT_INITA(0+"px",mmToPx(0,DPIX)+"px",mmToPx(100,DPIX)+"px",mmToPx(50,DPIX)+"px","bisWarehouseLocation");
			bisWarehouseLocation_lodop.SET_PRINT_PAGESIZE(1,mmToPx(100,DPIX)+"px",mmToPx(50,DPIY)+"px","");
			bisWarehouseLocation_lodop.ADD_PRINT_BARCODE(mmToPx(10,DPIX)+"px",mmToPx(16,DPIX)+"px",mmToPx(74,DPIX)+"px",mmToPx(20,DPIX)+"px", "128A", data[i].code);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"ShowBarText",0);
			bisWarehouseLocation_lodop.ADD_PRINT_TEXT(mmToPx(35,DPIX)+"px",mmToPx(16,DPIX)+"px",mmToPx(68,DPIX)+"px",mmToPx(7,DPIX)+"px",data[i].code);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"FontName","黑体");
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"Bold",1);
			
			//字体大小随编码长度变化而变化
			var fontSize = parseInt(340/data[i].code.length);
			bisWarehouseLocation_lodop.SET_PRINT_STYLEA(0,"FontSize",fontSize);
		}
		
		//bisWarehouseLocation_lodop.PREVIEW(); //打印预览
		if(bisWarehouseLocation_lodop.SET_PRINTER_INDEXA( "EW")){
			bisWarehouseLocation_lodop.PRINT();
		}
		
	}
}

/**
 * 打印箱贴
 */
var tagsPrint = function (){
	
	var tagsPrint_lodop =getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
	
	tagsPrint_lodop.PRINT_INITA("2mm","-2mm","98mm","98mm","tagsPrint");
	tagsPrint_lodop.SET_PRINT_PAGESIZE(1,"100mm","100mm","");
	//tagsPrint_lodop.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true);
	
	tagsPrint_lodop.ADD_PRINT_RECT(50,45,305,280,0,1);
	tagsPrint_lodop.ADD_PRINT_LINE(85,46,85,350,0,1);
	tagsPrint_lodop.ADD_PRINT_LINE(120,46,120,350,0,1);
	tagsPrint_lodop.ADD_PRINT_LINE(170,46,170,200,0,1);
	tagsPrint_lodop.ADD_PRINT_LINE(250,46,250,350,0,1);
	tagsPrint_lodop.ADD_PRINT_LINE(120,200,250,200,0,1);
	
	
	tagsPrint_lodop.ADD_PRINT_TEXT(15,75,270,30,$(".preview .title").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",14);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(63,82,60,30,"单号：");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(63,130,300,30,$(".preview .table .line1 .sp2").html()=="."?"":$(".preview .table .line1 .sp2").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(98,70,70,30,"客户名：");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(98,130,300,30,$(".preview .table .line2 .sp2").html()=="."?"":$(".preview .table .line2 .sp2").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(125,70,70,30,"始发地：");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(140,80,300,30,$(".preview .table .line4").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",25);
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontName","黑体");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"Bold",1);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(125,205,70,30,"目的地：");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(175,215,300,30,$(".preview .table .line5 .end").html()=="."?"":$(".preview .table .line5 .end").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",35);
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontName","黑体");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"Bold",1);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(180,82,60,30,"件数：");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(200,80,300,30,$(".preview .table .line5 .sp1 .sp2").html()=="."?"":$(".preview .table .line5 .sp1 .sp2").html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",30);
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontName","黑体");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"Bold",1);
	
	tagsPrint_lodop.ADD_PRINT_TEXT(335,50,80,30,$(".preview .bottom span").eq(0).html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,80,30,30,"年");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,95,30,30,$(".preview .bottom span").eq(1).html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,110,30,30,"月");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,125,30,30,$(".preview .bottom span").eq(2).html());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,140,30,30,"日");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	tagsPrint_lodop.ADD_PRINT_TEXT(335,180,200,30,"联系电话：025-522883999");
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"FontSize",10);
	
	tagsPrint_lodop.ADD_PRINT_BARCODE(260,100,200,50, "128A",$("#tagsPrintCode").val());
	tagsPrint_lodop.SET_PRINT_STYLEA(0,"ShowBarText",1);
	
	//tagsPrint_lodop.PREVIEW(); //打印预览
	
	if(tagsPrint_lodop.SET_PRINTER_INDEXA( "EW")){
		tagsPrint_lodop.PRINT();
	}
}

/**
 * 获取页面分辨率
 * @author zangdongjin
 * @returns {Array}
 */
function js_getDPI() {
    var arrDPI = new Array();
    if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    }
    else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);   
    }
    return arrDPI;
}

/**
 * 毫米转像素
 * @author zangdongjin
 * @param mm
 * @param dpi
 * @returns {Number}
 */
function mmToPx(mm,dpi){
	return mm/25.4*dpi;
}