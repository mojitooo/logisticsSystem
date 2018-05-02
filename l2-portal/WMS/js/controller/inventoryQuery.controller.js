angular.module('app', ['ngSanitize', 'ui.bootstrap'])
	.controller('MainCtrl', MainCtrl)

angular.$inject = ['$http', '$stateParams'];

function MainCtrl($scope, $sce, Area) {
	var vm = this;
	vm.pages = [{
		name: '5',
		id: '5'
	}, {
		name: '10',
		id: '10'
	}, {
		name: '30',
		id: '30'
	}, {
		name: '50',
		id: '50'
	}, {
		name: '100',
		id: '100'
	}, {
		name: '150',
		id: '150'
	}, {
		name: '200',
		id: '200'
	}, {
		name: '300',
		id: '300'
	}, {
		name: '28',
		id: '28'
	}];

	vm.selected = vm.pages[2].id; //如果想要第一个值

	vm.page = 1; //默认当前页数
	vm.maxSize = 5; //最大页码
	vm.pageSize = vm.pages[2].id; //1页多少个
	//查询条件初始化
	vm.supplierName = '';
	vm.ownerName  = ''; 
	vm.productCode  = ''; 
	vm.productName  = ''; 
	vm.brand  = ''; 
	vm.inboundCode  = ''; 
	vm.outboundCode  = ''; 
	vm.status  = ''; 
	vm.locationName  = ''; 
	vm.barCode  = ''; 
	vm.kindName  = ''; 
	vm.locationType  = ''; 
	vm.locationCode  = ''; 
	vm.INVENTORY_AGE_BEGIN  = ''; 
	vm.INVENTORY_AGE_END  = ''; 
	vm.storageTimeStart  = ''; 
	vm.storageTimeEnd  = ''; 

	vm.selectAll = false;
	vm.listShow = 15;
	vm.listHide = 16;
	vm.list;
	getTableHead();
	getLocation();
	getList();

	vm.getList = function() {

		getList();

	};

	vm.searchInv = function() {
		searchInv();
	};
	
	function searchInv() {
		/**
		vm.supplierName = encodeURI($("#ivn_supplierName").val()); //供应商
		vm.ownerName = encodeURI($("#ivn_ownerName").val()); //货主
		vm.productCode = encodeURI($("#ivn_productCode").val()); //货品编码
		var tempVal = $("#ivn_productName").val();
		if (tempVal.indexOf("+") >= 0) {
			tempVal = tempVal.replace(/\+/g,"%2B");
		}
		vm.productName = encodeURI(tempVal); //货品名称
		vm.brand = encodeURI($("#ivn_brand").val()); //品牌
		vm.inboundCode = encodeURI($("#ivn_inboundCode").val()); //入库单号
		vm.outboundCode = encodeURI($("#ivn_outboundCode").val()); //出库单号
		vm.status = encodeURI($("#ivn_status").val()); //库存状态
		vm.locationName = encodeURI($("#ivn_locationName").val()); //所在库位
		vm.barCode = encodeURI($("#ivn_barCode").val()); //69码
		vm.kindName = encodeURI($("#ivn_kindName").val()); //分类
		vm.locationType = encodeURI($("#ivn_locationType").val()); //库位类型
		vm.locationCode = encodeURI($("#ivn_locationCode").val()); //库位編碼
		*/
		vm.supplierName = $("#ivn_supplierName").val(); //供应商
		vm.ownerName = $("#ivn_ownerName").val(); //货主
		vm.productCode = $("#ivn_productCode").val(); //货品编码
		var tempVal = $("#ivn_productName").val();
		//查询时特殊处理
		if (tempVal.indexOf("+") >= 0) {
			tempVal = tempVal.replace(/\+/g,"%2B");
		}
		vm.productName = tempVal; //货品名称
		vm.brand = $("#ivn_brand").val(); //品牌
		vm.inboundCode = $("#ivn_inboundCode").val(); //入库单号
		vm.outboundCode = $("#ivn_outboundCode").val(); //出库单号
		vm.status = $("#ivn_status").val(); //库存状态
		vm.locationName = $("#ivn_locationName").val(); //所在库位
		vm.barCode = $("#ivn_barCode").val(); //69码
		vm.kindName = $("#ivn_kindName").val(); //分类
		vm.locationType = $("#ivn_locationType").val(); //库位类型
		vm.locationCode = $("#ivn_locationCode").val(); //库位編碼
		vm.INVENTORY_AGE_BEGIN = $("#ivn_INVENTORY_AGE_BEGIN").val(); //存货库龄
		vm.INVENTORY_AGE_END = $("#ivn_INVENTORY_AGE_END").val(); //
		vm.storageTimeStart = $("#ivn_storageTimeStart").val(); //存货日期
		vm.storageTimeEnd = $("#ivn_storageTimeEnd").val(); //

		getList();
		$("#single_select_dialog").modal("hide");
	}
	vm.resetIvn = function() {
		$("#ivn_supplierName").val("");
		$("#ivn_ownerName").val("");
		$("#ivn_productCode").val("");
		$("#ivn_productName").val("");
		$("#ivn_brand").val("");
		$("#ivn_inboundCode").val("");
		$("#ivn_outboundCode").val("");
		$("#ivn_status").val("");
		$("#ivn_locationName").val("");
		$("#ivn_barCode").val("");
		$("#ivn_kindName").val("");
		$("#ivn_locationType").val("");
		$("#ivn_locationCode").val("");
		$("#ivn_INVENTORY_AGE_BEGIN").val("");
		$("#ivn_INVENTORY_AGE_END").val("");
		$("#ivn_storageTimeStart").val("");
		$("#ivn_storageTimeEnd").val("");
		searchInv();
		$("#single_select_dialog").modal("hide");
	};
	
	function showMask() {

		$('.ibox-content .loadingMask').show();
		$('.ibox-content').css('overflow', 'hidden');

	};

	function removeMask() {

		$('.ibox-content .loadingMask').hide();
		$('.ibox-content').css({
			'overflow-x': 'hidden',
			'overflow-y': 'scroll'
		});
	};

	function getTableHead() {

		Area.getTableHead(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {

				vm.trueLength = 0;
				vm.tableList = data.tds;
				vm.tableLength = data.tds.length + 1;

				for(var i = 0; i < data.tds.length; i++) {
					if(data.tds[i].hidden == false) {
						vm.trueLength++;
					}

				}

			} else if(data.additionalMsg.status == '失败') {

				msgAlert.text('接口调用失败 >﹏< [' + data.additionalMsg.message + ']');

			} else {

				//返回信息页面展示
				/*msgObj.ajaxResponseMsg($("#inventory_msg"), data);*/
				$("#inventory_msg").html("<b style='color:red;'>系统错误！请联系管理员</b>");
				$('#inventory_msg').delay(3000).hide(0);

			}

		});

	};

	function getList() {

		$(".ibox-content").animate({
			scrollTop: 0
		}, function() {

			showMask();

			vm.selectAll = false;

			Area.getInventoryList(vm).success(function(data) {
				if(data.additionalMsg.status == '成功') {
					//查询后去掉加号转译，给导出用
					vm.productName = $("#ivn_productName").val(); //货品名称
					removeMask();

					$("#inventory_msg").show().html("<b style='color:blue;padding-left: 10px;'>操作成功！耗时：" + data.additionalMsg.processTime + "秒!</b>");
					$('#inventory_msg').delay(3000).hide(0);

					vm.pageCount = data.total; //总个数

					for(var i = 0; i < data.rows.length; i++) {

						data.rows[i].state = false;

					}

					vm.list = data.rows;

				} else if(data.additionalMsg.status == '失败') {

					msgAlert.text('接口调用失败 >﹏< [' + data.additionalMsg.message + ']');

				} else {

					//返回信息页面展示
					/*msgObj.ajaxResponseMsg($("#inventory_msg"), data);*/
					$("#inventory_msg").html("<b style='color:red;'>系统错误！请联系管理员</b>");
					$('#inventory_msg').delay(3000).hide(0);

				}

			});

		});

	};

	vm.all = function(m) {
		for(var i = 0; i < vm.list.length; i++) {
			if(m === true) {
				vm.list[i].state = true;
			} else {
				vm.list[i].state = false;
			}
		}
	};

	/*每页不同条数展示*/
	vm.ivnChange = function(x) {

		vm.pageSize = x;

		getList();
	}
	
	/*获取库位*/
	function getLocation() {
		Area.getLocationInfo().success(function(data) {
			if (data != null) {
				var locOptions = [];
				var kindOptions = [];
				var locationList = data.locationList;
				$.each(locationList, function(i,n) {
					locOptions.push("<option  id = '"+n.name+"' value='"+n.name+"'>"+n.name+"</option>");
				});
				$("#locationName").append(locOptions.join(''));
				var kindNameList = data.kindNameList;
				$.each(kindNameList, function(i,n) {
					kindOptions.push("<option  id = '"+n+"' value='"+n+"'>"+n+"</option>");
				});
				$("#kindName").append(kindOptions.join(''));
			}
		});
	}
	
	vm.openChangePreModal = function(){
		var ids = [];
		for(var i = 0; i < vm.list.length; i++) {
			if(vm.list[i].state == true) {
				console.log(vm.list[i].id);
				ids.push(vm.list[i]);
			} 
		}
		if (ids.length == 0) {
			msgAlert.text('请先选择要修改的库位！');
		} else if (ids.length > 1) {
			msgAlert.text('一次只能操作一个库位！');
		} else {
			var bean = ids[0];
			if (bean.location.name != '良品存货库位') {
				msgAlert.text('必须是良品库位！');
			} else {
				$('#change_warehouseCode').val(bean.warehouse.code);
				$('#change_inventoryId').val(bean.id);
				$('#change_location_code').val(bean.location.code);
				$('#change_location_name').val(bean.location.name);
				$('#change_product_code').val(bean.productKey.product.code);
				$('#change_product_name').val(bean.productKey.product.name);
				$('#change_allocated_quantity_BU').val(bean.allocatedQuantityBU);
				$("#preAQBU").val("");
				$("#modify_dialog").modal("show");
			}
		}
	}
	
	vm.doChangePreAQBu = function(){
		var preAQBU = $('#preAQBU').val();
		if (preAQBU=='' ||preAQBU ==null) {
			msgAlert.text('预分配数量不能为空!');
		}else {
			var ivn = {};
			ivn.warehouseCode = $('#change_warehouseCode').val();
			ivn.inventoryId = $('#change_inventoryId').val();
			ivn.locationCode = $('#change_location_code').val();
			ivn.locationName = $('#change_location_name').val();
			ivn.productCode = $('#change_product_code').val();
			ivn.productName = $('#change_product_name').val();
			ivn.aQuantyBu = $('#change_allocated_quantity_BU').val();
			ivn.preAQBU = $("#preAQBU").val();
			Area.doChangePreAQBu(ivn).success(function(data) {
				if(data.additionalMsg.status == '成功') {
					$("#modify_dialog").modal("hide");
					removeMask();
					$("#inventory_msg").show().html("<b style='color:blue;padding-left: 10px;'>操作成功！耗时：" + data.additionalMsg.processTime + "秒!</b>");
					$('#inventory_msg').delay(3000).hide(0);
					getList();

				} else if(data.additionalMsg.status == '失败') {

					msgAlert.text('接口调用失败 >﹏< [' + data.additionalMsg.message + ']');

				} else {

					//返回信息页面展示
					/*msgObj.ajaxResponseMsg($("#inventory_msg"), data);*/
					$("#inventory_msg").html("<b style='color:red;'>系统错误！请联系管理员</b>");
					$('#inventory_msg').delay(3000).hide(0);

				}

			});
		}
	}
	
	//导出
  vm.goodsExport= function() {
	location.href = ""+ Comm_Config + "wmsInventory/exportXls?" + $("#ivn_export_searchForm").serialize();
  }
}