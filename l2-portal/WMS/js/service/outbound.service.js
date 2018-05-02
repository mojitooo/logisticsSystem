angular
	.module('app')
    .factory('Area', Area)
    .factory('Review', Review)

function Area($http){
	return {
		getAreaList:getAreaList,
		getTableHead:getTableHead,
		imeiConfirmPickedBack:imeiConfirmPickedBack,
		confirmPickedBack:confirmPickedBack,
		exportMonitorAdd:exportMonitorAdd,
		ship:ship,
		changeWayBillCode:changeWayBillCode
	}
	function getAreaList(vm){
		return $http({url:""+ Comm_Config + "process"/*'../../json/pack.json'*/,method: "post",
						params:{
								bean: 'wmsPackageTask',
								method: 'page',
								outboundCode: vm.outboundCode,
								waybillCode: vm.waybillCode,
								code: vm.code,
								type: vm.type,
								status: vm.status,
								checkStatus: vm.checkStatus,
								shipStatus: vm.shipStatus,
								turnoverCode: vm.turnoverCode,
								beginTaskTime: vm.beginTaskTime,
								endTaskTime: vm.endTaskTime,
								page: vm.page,
								rows: vm.pageSize
							
							}
						});
	}

	function getTableHead(vm){
		return $http({url:/*""+ Comm_Config + "userTableColumns/createNewColumns"*/'../../json/table.json',method: "get",
						params:{

						   array:'',
						   tableId:'wmsPackageTask'
							
							}
						});
	}

	/*串码退拣*/

	function imeiConfirmPickedBack(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/imeiConfirmPickedBack"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    taskId:vm.taskId,
							moveQuantity:vm.taskExpectedQuantityBU,
							quantity:vm.taskExpectedQuantityBU - vm.taskExpectedCheckQuantityBU,
							imeis:vm.imeisNoList.join()
							
							}
						});
	}

	/*非串码退拣*/

	function confirmPickedBack(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/confirmPickedBack"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    taskId:vm.taskId,
							moveQuantity:vm.taskExpectedQuantityBU,
							quantity:vm.goodCounts
							
							}
						});
	}

	

	/*导出*/

	function exportMonitorAdd(vm){
		return $http({url: ""+ Comm_Config + "exportMonitor/add"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    count:vm.pageCount,
							module:'wmsPackageTask'
							}
						});
	}

	/*发运*/

	function ship(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/ship"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    ids:vm.selectListSend.join()
							}
						});
	}

	/*更换面单号*/

	function changeWayBillCode(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/changeWayBillCode"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    oldWayBillCode:vm.oldWayBillCode
							}
						});
	}

	
	
	
}


function Review($http){
	return {
		searchByCode:searchByCode,
		getCodeDetail:getCodeDetail,
		getPackingInfo:getPackingInfo,
		confirmPackage:confirmPackage,
		removePack:removePack,
		copyPack:copyPack,
		refreshAfterPackage:refreshAfterPackage,
		checkImei:checkImei,
		refreshAfterCheckImei:refreshAfterCheckImei

	}

	function searchByCode(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/refreshByConditions"/*'../../json/topinfo.json'*/,method: "post",
						params:{

                            paramValue: vm.searchCode
							
							}
						});
	}


	function getCodeDetail(vm){
		return $http({url:""+ Comm_Config + "process"/*'../../json/chuanma.json'*/,method: "post",
						params:{

                                bean:'wmsOutboundItem',
								method:'page',
								orderByIsImei:'',
								outboundId:vm.outboundId,
								page:vm.packPage,
								rows:vm.packPageSize
							
							}
						});
	}

	function getPackingInfo(vm){
		return $http({url:""+ Comm_Config + "process"/*'../../json/zhuangxiang.json'*/,method: "post",
						params:{

                             bean: 'wmsPackageTaskDetail',
							 method: 'page',
							 source: 'wmsPackageTaskDetail',
							 packageTaskId:vm.packageTaskId,
							 page:vm.packPage,
							 rows:vm.packPageSize
							
							}
						});
	}

	function refreshAfterPackage(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/refreshAfterPackage"/*'../../json/refresh.json'*/,method: "post",
						params:{

							packageTaskId:vm.packageTaskId
							
							}
						});
	}


	


	function confirmPackage(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/confirmPackage"/*'../../json/confirmPack.json'*/,method: "post",
						params:{

							    packageTaskId:vm.packageTaskId,
							    boxTypeId:1,
							    boxQty:vm.boxQty,
							    weight:vm.boxWeight,
							    volume:0.01
							
							}
						});
	}

	function removePack(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTaskDetail/removeCarton"/*'../../json/removePack.json'*/,method: "post",
						params:{

							   packageTaskDetailIds:vm.packageTaskDetailIds
							
							}
						});
	}	

	function copyPack(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTaskDetail/doCopyCarton"/*'../../json/removePack.json'*/,method: "post",
						params:{

							   wmsPackageTaskDetailId:vm.wmsPackageTaskDetailId,
							   copyQuantity:vm.copyNum
							
							}
						});
	}


	/*复核*/
	function checkImei(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/checkImei"/*'../../json/removePack.json'*/,method: "post",
						params:{
							  packageTaskId:vm.packageTaskId,
							  serialNo:vm.examinationList.join()
							}
						});
	}

    /*复合之后刷新*/
	function refreshAfterCheckImei(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/refreshAfterCheckImei"/*'../../json/refreshchuan.json'*/,method: "post",
						params:{
							  packageTaskId:vm.packageTaskId
							}
						});
	}
	
	
}




