angular.module('app',['ngSanitize','ui.bootstrap'])
  .controller('MainCtrl', MainCtrl)
  .controller('ReviewCtrl', ReviewCtrl)

angular.$inject = ['$http', '$stateParams'];

function MainCtrl($scope,$sce,Area) {
 

  var vm = this;
  vm.pages = [
        {name:'50',id:'50'},
        {name:'20',id:'20'},
        {name:'40',id:'40'},
        {name:'80',id:'80'}
    ];

  vm.selected=vm.pages[0].id;//如果想要第一个值

  vm.status = "UNFINISHED";
  vm.shipStatus = "UNSHIPPED";
  vm.outboundCode = '';
  vm.waybillCode = '';
  vm.code = '';
  vm.type = '';
  vm.checkStatus = '';
  vm.turnoverCode = '';
  vm.beginTaskTime = '';
  vm.endTaskTime = '';
              
 
  vm.page = 1; //默认当前页数
  vm.maxSize = 5; //最大页码
  vm.pageSize = 50; //1页多少个

  vm.selectAll = false;
  vm.listShow = 15;
  vm.listHide = 16;
  vm.list;
  getTableHead();
  getList();

  vm.getList = function() {
        
         getList();

  }

  vm.searchPack = function(){
   
    vm.status = $('#packStatus').val(); //单据状态
    vm.shipStatus = $('#packShipStatus').val(); //发运状态
    vm.outboundCode = $('#packOutboundCode').val(); //发货单号
    vm.waybillCode = $('#packWaybillCode').val(); //运单号
    vm.code = $('#packCode').val(); //包装任务号
    vm.type = $('#packTtype').val(); //包装类型
    vm.checkStatus = $('#packCheckStatus').val();//复核状态
    vm.turnoverCode = $('#packTurnoverCode').val(); //周转箱号
    vm.beginTaskTime = $('#beginTaskTime').val(); //开始时间
    vm.endTaskTime = $('#endTaskTime').val(); //截止时间

    getList();

  }

  function showMask(){

      $('.ibox-content .loadingMask').show();
      $('.ibox-content').css('overflow','hidden');

  }

  function removeMask(){

      $('.ibox-content .loadingMask').hide();
      $('.ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }

  function getTableHead(){

    Area.getTableHead(vm).success(function(data) {
      if(data.additionalMsg.status=='成功'){
         
         vm.trueLength = 0;
         vm.tableList = data.tds;
         vm.tableLength = data.tds.length+1;

         for(var i = 0;i<data.tds.length;i++){
             if(data.tds[i].HIDDEN == 'false'){
                 vm.trueLength++;       
             }

         }

      }else if(data.additionalMsg.status=='失败'){

            msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

        }else{

            //返回信息页面展示
            /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            
          }
      

    });

  }

  function getList() {
    
    $(".ibox-content").animate({scrollTop: 0},function(){

        showMask();

        vm.selectAll = false;

        Area.getAreaList(vm).success(function(data) {
          if(data.additionalMsg.status=='成功'){

           removeMask();
          
             $("#checkAndPackage_msg").show().html("<b style='color:#578B99;padding-left: 10px;'>操作成功！耗时："+data.additionalMsg.processTime +"秒!</b>"); 
             $('#checkAndPackage_msg').delay(3000).hide(0);

            vm.pageCount = data.total; //总个数

            for (var i = 0; i < data.rows.length; i++) {

              data.rows[i].state = false;

            }

          vm.list = data.rows;

          }else if(data.additionalMsg.status=='失败'){
                removeMask();

                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

            }else{
                 
                removeMask();

                //返回信息页面展示
                /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
                $('#checkAndPackage_msg').delay(3000).hide(0);
                
              }        

        });               

    });  

  }

  vm.all = function(m) {
    for (var i = 0; i < vm.list.length; i++) {
      if (m === true) {
        vm.list[i].state = true;
      } else {
        vm.list[i].state = false;
      }
    }
  };


 //复核
  vm.goodsReview= function() {
    var selectLen = 0;

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.outboundCode = vm.list[i].outboundCode;
        vm.outboundId = vm.list[i].outboundId;
        vm.packageTaskId = vm.list[i].id;
        selectLen++;
      }
    }

    if(selectLen > 1){
      msgAlert.text('至多只能复核一个哦！');
    }else{
      window.location.href="review.html?outboundCode="+vm.outboundCode;
    }

  }


  //发运
  vm.goodsSend= function() {

    var selectList = [];
    vm.selectListSend = [];
    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
         selectList.push(vm.list[i]);

      }
    }

    if(selectList.length == '0'){

      /*alert('请先选择要发运的订单');*/
      msgAlert.text('请先选择要发运的订单');

    }else{

      for(var i = 0 ; i < selectList.length ; i++){
        if(selectList[i].status !='FINISHED' || selectList[i].shipStatus !='UN_SHIP' ){

          msgAlert.text('存在未完成或已发运状态订单');
          return;

        }

      }

      for(var i = 0 ;i < selectList.length ; i++){
           vm.selectListSend.push(selectList[i].id);
      }

      Area.ship(vm).success(function(data) {
          
          if(data.additionalMsg.status=='成功'){

    
              getList();

          }else if(data.additionalMsg.status=='失败'){

            msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

              //返回信息页面展示
          /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
          $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
          $('#checkAndPackage_msg').delay(3000).hide(0);
              
            }

      });


    }


  }

  //退拣
  vm.goodsBackup= function() {

    var selectLen = 0;
    

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.taskId = vm.list[i].id;
        vm.taskExpectedQuantityBU = vm.list[i].expectedQuantityBU;
        vm.taskExpectedCheckQuantityBU = vm.list[i].expectedCheckQuantityBU;
        vm.taskCheckStatus = vm.list[i].checkStatus;
        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{

          $('#goodsBackup').modal('show');
        }

    }else{

       msgAlert.text('请先选择要退拣的货品！');
    }
    
  }

  vm.prePickedBack = function(){
      
    /*非串码*/
     if(vm.taskCheckStatus == 'NON_CHECK'){

      vm.goodCounts = $('#goodsCount').val();

        if(vm.goodCounts == ''){

          msgAlert.text('请输入货品数');

        }else{

          Area.confirmPickedBack(vm).success(function(data) {

           if(data.additionalMsg.status=='成功'){

              $('#checkAndPackage_msg').show().html("<b style='color:#578B99;padding-left: 10px;'>退拣成功</b>");
              $('#checkAndPackage_msg').delay(3000).hide(0);
              $('#goodsBackup').modal('hide');
              $('#goodsCount').val('');
              getList();

            }else if(data.additionalMsg.status=='失败'){

              msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

            }else{

                //返回信息页面展示
                /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                $('.imeisNoMsg').html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>"); 
                $('.imeisNoMsg').delay(3000).hide(0);
                
              }
            
          });

        }
        

     }else{
          /*串码*/
           vm.imeisNoList = $('.imeisNo').val().replace(/\n|\r\n/g,"<br>").split('<br>');

           for(var i = 0 ;i<vm.imeisNoList.length;i++)
           {
                 if(vm.imeisNoList[i] == "" || typeof(vm.imeisNoList[i]) == "undefined")
                 {
                          vm.imeisNoList.splice(i,1);
                          i= i-1;      
                 }
                        
           }

           if(vm.imeisNoList.length != vm.taskExpectedCheckQuantityBU){
                $('.imeisNoMsg').html("<b style='color:#FF5459;'>[输入串号数量为:"+ vm.imeisNoList.length +"，大于待输入串码数量:"+vm.taskExpectedCheckQuantityBU+"！]</b>")

           }else{

             Area.imeiConfirmPickedBack(vm).success(function(data) {

             

                  if(data.additionalMsg.status=='成功'){

                    $('#checkAndPackage_msg').show().html("<b style='color:#578B99;padding-left: 10px;'>退拣成功</b>");
                    $('#checkAndPackage_msg').delay(3000).hide(0);
                    $('#goodsBackup').modal('hide');
                    $('.imeisNo').val('');
                    getList();

                  }else if(data.additionalMsg.status=='失败'){

                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

                  }else{

                      //返回信息页面展示
                      /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                      $('.imeisNoMsg').html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>"); 
                      $('.imeisNoMsg').delay(3000).hide(0);
                      
                  }

               
            });


           }

     }

  }



  //导出
  vm.goodsExport= function() {

        Area.exportMonitorAdd(vm).success(function(data) {

             if(data.additionalMsg.status=='成功'){

                   location.href = ""+ Comm_Config + "wmsPackageTask/exportXls?" + $("#wmsOutboundItem_scan_srchFormOne").serialize();
          

              }  
        });
    
  }

  /*更换面单号*/

  vm.changeWayBillCode = function(){

    var selectLen = 0;
    

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.oldWayBillCode = vm.list[i].waybillCode;

        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{

          Area.changeWayBillCode(vm).success(function(data) {


                if(data.additionalMsg.status=='成功'){

                     msgAlert.text('更换面单成功！');

                     getList();

                  }else if(data.additionalMsg.status=='失败'){

                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

                  }else{

                      //返回信息页面展示
                      /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                      $('#checkAndPackage_msg').html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>"); 
                      $('#checkAndPackage_msg').delay(3000).hide(0);
                      
                  }
               
            });
          
        }

    }else{

       msgAlert.text('请先选择要更换面单的订单！');
    }


  }
 
 /*每页不同条数展示*/
  vm.packChange = function(x){

     vm.pageSize = x;

     getList();
  }

  /*查看发货明细*/
  vm.goodsSendDetail = function(){

    msgAlert.text('暂不开放');

  }

  /*查看包装明细*/
  vm.goodsPackDetail = function(){

    msgAlert.text('暂不开放');

  }

  /*返回老页面*/

  vm.backToOld = function(){

    window.location.href="/logistics/wmsPackageTask/list";
  }

  /*控制头部显影*/
   vm.showAndHide = function(){
     $('.searchShow').toggle('normal');
     if($('.minus').hasClass('fa-minus')){

      $('.minus').removeClass('fa-minus').addClass('fa-plus');

     }else{

      $('.minus').removeClass('fa-plus').addClass('fa-minus');

     }
     

   }


}


///////////////////////////////

//复核打包
function ReviewCtrl($scope,Review) {
  var vm = this;
  vm.pages = [
        {name:'50',id:'50'},
        {name:'20',id:'20'},
        {name:'40',id:'40'},
        {name:'80',id:'80'}
    ];
  vm.selected=vm.pages[0].id;//如果想要第一个值
  vm.packselected=vm.pages[0].id;//如果想要第一个值
  vm.searchCode =  request.QueryString("outboundCode");
  
  

  //明细分页
  vm.page = 1; //默认当前页数
  vm.maxSize = 5; //最大页码
  vm.pageSize = 50; //1页多少个
 

  //装箱分页
  vm.packPage = 1; //默认当前页数
  vm.packMaxSize = 5; //最大页码
  vm.packPageSize = 50; //1页多少个
  //
  vm.supplyId = '';
  vm.selectAll = false;
  vm.selectPackAll = false;
  vm.list;
  vm.packList;

  getTopInfo();

  function getTopInfo() {
    vm.selectAll = false;
    vm.selectPackAll = false;

    if(vm.searchCode ==''||  vm.searchCode ==null || vm.searchCode ==undefined){
      $("#numberCode").focus();
      
       $("#endPackage").attr("disabled", true);
       $("#printList").attr("disabled", true);
       $("#printWay").attr("disabled", true);
       $("#confirmNum").attr("disabled", true);
       $(".deleteNum").attr("disabled", true);
       $(".copyNum").attr("disabled", true);
       $("#search-btn").attr("disabled", true);
       $(".export").attr("disabled", true);
       return;

    }else{
 
      searchByNumbers();

    }
    
  }

  vm.all = function(m) {
    for (var i = 0; i < vm.list.length; i++) {
      if (m === true) {
        vm.list[i].state = true;
      } else {
        vm.list[i].state = false;
      }
    }
  };

  vm.packAll = function(m) {
    for (var i = 0; i < vm.packList.length; i++) {
      if (m === true) {
        vm.packList[i].state = true;
      } else {
        vm.packList[i].state = false;
      }
    }
  };


  //点击查询
  vm.searchByNumbers = function(){

    vm.searchCode = $("#numberCode").val();

    searchByNumbers();
    

  }

  function searchByNumbers(){

     vm.selectAll = false;
     vm.selectPackAll = false;     
     showMask();
     showPackMask();
  
     Review.searchByCode(vm).success(function(data) {

     if(data.additionalMsg.status=='成功'){

      //查询头部数据
      if(data.wmsPackageTask && data.wmsOutbound){

         $("#printList").attr("disabled", false);
         $("#printWay").attr("disabled", false);
         $("#confirmNum").attr("disabled", false);
         $(".deleteNum").attr("disabled", false);
         $(".copyNum").attr("disabled", false);
         $("#search-btn").attr("disabled", false);
         $(".export").attr("disabled", false);

        vm.zhuangxiang = data.wmsPackageTask.packageBoxQuantity;
        vm.fahuo = data.wmsPackageTask.outboundCode;
        vm.baozhuang = data.wmsPackageTask.code;
        vm.wuliu = '蜂云物流';
        vm.miandan = data.wmsPackageTask.waybillCode;
        vm.danju = data.wmsPackageTask.billTypeName;
        vm.xiangmu = data.wmsPackageTask.projectName;
        vm.zhongliang = data.wmsPackageTask.weight;
        vm.tiji = data.wmsPackageTask.volume;
        vm.jihuashu = data.wmsPackageTask.expectedQuantityBU;
        vm.jianhuoshu = data.wmsPackageTask.pickedQuantityBU;
        vm.jihuafuhe = data.wmsPackageTask.expectedCheckQuantityBU;
        vm.fuheshu = data.wmsPackageTask.checkedQuantityBU;
        vm.fuhezhuang = data.wmsPackageTask.checkStatus;
        vm.fayunzhuang = data.wmsPackageTask.shipStatus;
        vm.baozhuangstatus = data.wmsPackageTask.status;
        vm.dayincishu = data.wmsPackageTask.info.packageBoxQuantity;
        vm.dayinshijian = data.wmsPackageTask.info.packageBoxQuantity;
        vm.outboundId = data.wmsOutbound.id;
        vm.packageTaskId = data.wmsPackageTask.id;
        if(vm.fuhezhuang == "UN_CHECK" || vm.fuhezhuang == "PART_CHECK"){

          $("#examination").focus();

        }else{
           $("#packBox").focus();

        }
        getCodeDetail(vm.outboundId);
        getPackingInfo(vm.packageTaskId);

        if(vm.baozhuangstatus == "FINISHED"){

          $("#endPackage").attr("disabled", true);

        }else{

          $("#endPackage").attr("disabled", false);

        }

      }else{

         $("#endPackage").attr("disabled", true);
         $("#printList").attr("disabled", true);
         $("#printWay").attr("disabled", true);
         $("#confirmNum").attr("disabled", true);
         $(".deleteNum").attr("disabled", true);
         $(".copyNum").attr("disabled", true);
         $("#search-btn").attr("disabled", true);
         $(".export").attr("disabled", true);

         removeMask();
         removePackMask();


      }
        


      }else if(data.additionalMsg.status=='失败'){

                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

      }else{

            //返回信息页面展示
        /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
        $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
        $('#checkAndPackage_msg').delay(3000).hide(0);
            
      }
    });
    

  }

  function showMask(){

      $('.reviewTableContent .loadingMask').show();
      $('.reviewTableContent').css('overflow','hidden');

  }

  function removeMask(){

      $('.reviewTableContent .loadingMask').hide();
      $('.reviewTableContent').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }

  function showPackMask(){

      $('.packingContentTable .loadingMask').show();
      $('.packingContentTable').css('overflow','hidden');

  }

  function removePackMask(){

      $('.packingContentTable .loadingMask').hide();
      $('.packingContentTable').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }

  vm.getCodeDetail = function(){

     getCodeDetail(vm.outboundId);
  }

  function getCodeDetail(id){

    $(".reviewTableContent").animate({scrollTop: 0},function(){

        showMask();

        vm.selectAll = false;

        vm.outboundId = id;

        Review.getCodeDetail(vm).success(function(data) {

         if(data.additionalMsg.status=='成功'){

          removeMask();

          //查询发货单明细数据

            vm.pageCount = data.total; //总个数

            for (var i = 0; i < data.rows.length; i++) {

              data.rows[i].state = false;

            }

            vm.list = data.rows;

          } else if(data.additionalMsg.status=='失败'){
                    removeMask();

                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

              }else{
                removeMask();

                //返回信息页面展示
                /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
                $('#checkAndPackage_msg').delay(3000).hide(0);
                
              } 
        });

    });

  }

  vm.getPackingInfo = function(){

    getPackingInfo(vm.packageTaskId);

  }


  //装箱打包
  function getPackingInfo(id){
    $(".packingContentTable").animate({scrollTop: 0},function(){

      showPackMask();

      vm.selectPackAll = false;

      vm.packageTaskId = id;

      Review.getPackingInfo(vm).success(function(data) {

       if(data.additionalMsg.status=='成功'){

        removePackMask();

         vm.packPageCount = data.total; //总个数

        for (var i = 0; i < data.rows.length; i++) {

            data.rows[i].state = false;

          }

          vm.packList = data.rows;

        }  else if(data.additionalMsg.status=='失败'){
                  removePackMask();

                  msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

            }else{
              removePackMask();

              //返回信息页面展示
              /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
              $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
              $('#checkAndPackage_msg').delay(3000).hide(0);
              
            }
      });

    });
   
  }


  //<%--结束包装 --%>
  vm.overPackage = function(){
    $.ajax({
      url:""+ Comm_Config + "wmsPackageTask/overPackage",
      method:'post',
      data:{
        packageTaskId: vm.packageTaskId
      },
      dataType:'json',
      cache:false,
      success:function(data){
        if(data.additionalMsg.status == "成功"){
          refreshAfterOverPackage();
        }else if(data.additionalMsg.status=='失败'){

                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

            //返回信息页面展示
            /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            
          }
        
      }
    });
  };

  //<%--结束包装 刷新数据--%>
  function refreshAfterOverPackage(){
    $.ajax({
      url:""+ Comm_Config + "wmsPackageTask/refreshAfterOverPackage",
      method:'post',
      data:{
        packageTaskId: vm.packageTaskId
      },
      dataType:'json',
      cache:false,
      success:function(data){
        if(data.additionalMsg.status == "成功"){
          vm.baozhuangstatus = data.status;
          $('#checkAndPackage_status').val(vm.baozhuangstatus)
          isFinishPackage();
          $("#numberCode").focus();
          $("#numberCode").val('');
          //串行打印运单、发货清单、箱标贴
          checkAndPackage_printOutbound(true);
        }else if(data.additionalMsg.status=='失败'){

                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

            //返回信息页面展示
            /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>[系统内部错误]</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            return;
          }
      }
    });
  };

  /*返回*/

  vm.backToPack = function(){

    window.location.href="pack.html";

  }

  //<%--判断是否包装完成 、是否发运--%>
  var isFinishPackage = function(){
      var status = vm.baozhuangstatus;
      var ship_status = vm.fayunzhuang;
      //是否结束包装
      if(status == "FINISHED"){
        $("#endPackage").attr("disabled", true); 
      }else{
        $("#endPackage").attr("disabled", false);
      }
      //是否已发运
      /*if(ship_status == "已发运"){
        $(".isShipped").attr("disabled", true); 
      }else{
        $(".isShipped").attr("disabled", false);
      }*/
    };

  //<%--打印清单 --%>
  vm.printList = function(){

    checkAndPackage_printOutbound();

  }

  //<%--打印运单 --%>
  vm.printWaybill = function(){

    checkAndPackage_printWaybill();

  }


  /*导出发货单明细*/
  vm.exportCode = function(){

    location.href = ""+ Comm_Config + "wmsSerialNo/exportCpWmsSerialNo?" + $("#wmsOutboundItem_scan_srchForm").serialize();

  }
  

  //发货单明细不同条数展示
  vm.reviewChange = function(x){
     vm.pageSize = x;
     getCodeDetail(vm.outboundId);
  }

  //打包数不同条数展示
  vm.packingChange = function(x){
     vm.packPageSize = x;

     getPackingInfo(vm.packageTaskId);
  }
  
  //展示所有串码
  vm.moreCode = function(moreCodeList,name) {

    vm.moreCodeName = name
    vm.moreCodeList = moreCodeList;
    $("#moreCode").modal('show');
  }

  //复核串码
  vm.examinationCheck = function(){
     

           vm.examinationList = $('#examination').val().replace(/\n|\r\n/g,"<br>").split('<br>');

           for(var i = 0 ;i<vm.examinationList.length;i++)
           {
                 if(vm.examinationList[i] == "" || !vm.examinationList[i])
                 {
                          vm.examinationList.splice(i,1);
                          i= i-1;      
                 }
                        
           }


           if(vm.examinationList.length == 0){

              msgAlert.text('串码不能为空！');

           }else{

                Review.checkImei(vm).success(function(data) {

                      if(data.additionalMsg.status=='成功'){
                        $('#examination').val('')

                        Review.refreshAfterCheckImei(vm).success(function(data) {

                              if(data.additionalMsg.status=='成功'){

                                vm.fuheshu = data.checkedQuantityBU;
                                vm.fuhezhuang = data.checkStatus;

                                getCodeDetail(vm.outboundId);

                              }else if(data.additionalMsg.status=='失败'){

                                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

                              }else{

                                //返回信息页面展示
                                /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                                $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
                                $('#checkAndPackage_msg').delay(3000).hide(0);
                                
                              }
                           
                        });          

                      }else if(data.additionalMsg.status=='失败'){

                            var myVideo=document.getElementById("audioPlay");
                            myVideo.play();

                            msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

                      }else{

                        //返回信息页面展示
                        /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
                        $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
                        $('#checkAndPackage_msg').delay(3000).hide(0);
                        
                      }

                   
                });

           } 
           
  }


  //箱数确定点击

  vm.addPack = function(){

    vm.boxQty = $('#packBox').val().replace(/[A-Za-z-]/g,'');

    vm.boxWeight = $('#packWeight').val().replace(/[A-Za-z-]/g,'');

  

    if(vm.boxQty != '' && vm.boxWeight != ''){

      Review.confirmPackage(vm).success(function(data) {

         if(data.additionalMsg.status=='成功'){
          $('#packBox').val('');
          $('#packWeight').val('');

          //添加成功调用打包初始接口
          refreshAfterPackage();
          getPackingInfo(vm.packageTaskId);


          }else if(data.additionalMsg.status=='失败'){

                msgAlert.text('添加失败');

          }else{

            msgAlert.text('系统错误！请联系管理员。');
            
          }
      });

    }else{
       
        msgAlert.text('请先填写箱数和重量！');
    }


    
    
  }

  //移除
  vm.removePack = function() {

    var selectLen = 0;

    var selectRemove = [];

    for (var i = 0; i < vm.packList.length; i++) {
      if (vm.packList[i].state === true) {
        //选中的条目
        selectRemove.push(vm.packList[i].id);
        selectLen++;
      }
    }
    if(selectLen > 0){

        vm.packageTaskDetailIds = selectRemove.join();

        Review.removePack(vm).success(function(data) {

             if(data.additionalMsg.status=='成功'){
                //删除成功调用打包初始接口
                refreshAfterPackage();
                getPackingInfo(vm.packageTaskId);
     

              } else if(data.additionalMsg.status=='失败'){

                msgAlert.text('移除失败');

              }else{

                msgAlert.text('系统错误！请联系管理员。');

              }
        });

    }else{

      msgAlert.text('请先选择要移除的哦！');

    }
    
  }

  //关系编辑
  vm.editRelation = function() {


    var selectLen = 0;

    for (var i = 0; i < vm.packList.length; i++) {
      if (vm.packList[i].state === true) {
        //选中的条目
        vm.packageTaskId = vm.packList[i].id;
        selectLen++;
      }
    }

    if(selectLen > 1){
      msgAlert.text('至多只能编辑一个哦！');
    }else{
      alert('编辑');
    }
    
  }

  //复制
  vm.copyPack = function() {


    var selectLen = 0;

    for (var i = 0; i < vm.packList.length; i++) {
      if (vm.packList[i].state === true) {
        //选中的条目
        vm.wmsPackageTaskDetailId = vm.packList[i].id;
        selectLen++;
      }
    }

    if(selectLen >0){

        if(selectLen > 1){
          msgAlert.text('至多只能复制一个哦！');
        }else{

          $("#selectCopyNum").modal('show');
       
        }

    }else{

      msgAlert.text('请先选择要复制的哦');

    }


    
  }

  vm.submitCopyNum = function(){


    vm.copyNum = $("#copyNumCount").val();

    if(vm.copyNum!=''){

        Review.copyPack(vm).success(function(data) {

             if(data.additionalMsg.status=='成功'){
               $("#selectCopyNum").modal('hide');
                //复制成功调用打包初始接口
                refreshAfterPackage();
                getPackingInfo(vm.packageTaskId);

              } else if(data.additionalMsg.status=='失败'){

                msgAlert.text('复制失败');

              }else{

                msgAlert.text('系统错误！请联系管理员。');

              }
        });

    }else{

      msgAlert.text('请填写复制箱数！');


    }

  }


  //箱数经过操作改变后刷新头部信息
  function refreshAfterPackage(){

    Review.refreshAfterPackage(vm).success(function(data) {

         if(data.additionalMsg.status=='成功'){
        
            vm.zhuangxiang = data.packageBoxQuantity;
            vm.zhongliang = data.weight;
            vm.tiji = data.volume; 
            vm.baozhuangstatus = data.packageStatus;

            if(vm.baozhuangstatus == "FINISHED"){

              $("#endPackage").attr("disabled", true);

            }else{

              $("#endPackage").attr("disabled", false);

            }      

          }else if(data.additionalMsg.status=='失败'){

                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

            //返回信息页面展示
            /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            
          }  
    });

  }

   /*控制头部显影*/
   vm.showAndHide = function(){
     $('.showRearch').toggle('normal');
     if($('.minus').hasClass('fa-minus')){

      $('.minus').removeClass('fa-minus').addClass('fa-plus');

     }else{

      $('.minus').removeClass('fa-plus').addClass('fa-minus');

     }
     

   }

   vm.allListShow = function(){

     $('.moreListShow').toggle('normal');

   }

    //<%--快捷键  begin--%>
    //<%--查询 回车自动查询 快捷键 --%>
    var search_shortcutsKey = function(){
      $("#numberCode").bind('keyup', function(event) {
        if (event.keyCode == "13") {
          vm.searchByNumbers();
        }
      });
    };
    search_shortcutsKey(); //<%--初始化 --%>
    //<%--复核  回车自动复核  快捷键 --%>
    var singleCheck_shortcutsKey = function(){
      $("#examination").bind('keyup', function(event) {
        if (event.keyCode == "13") {
          vm.examinationCheck();
        }
      });
    };
    singleCheck_shortcutsKey();



    var button_shortcutsKey = function(){
    $("body").keyup(function(event) {
      var checkAndPackage_wmsSerialNo_srchDiv_Obj = $("body");
      var activeElementId = document.activeElement.id;
      if(checkAndPackage_wmsSerialNo_srchDiv_Obj.length>0 && activeElementId != "numberCode"){
        //扫描串码防止换行
        if (event.keyCode == '112') {//<%--查询条件聚焦(Q变成F1) --%>
          $("#numberCode").focus();
        }else if (event.keyCode == '113') {//<%--串号聚焦(O变成F2) --%>
          $("#examination").focus();
        }else if (event.keyCode == '107') {//<%--结束包装(A改为+) 快捷键 --%>
          var aEnabled = document.getElementById("endPackage").disabled;
          if(!aEnabled){
            vm.overPackage()
          }
        }else if(event.keyCode == '117'){//<%--打印发货清单(S变成F6) 快捷键 --%>
          var sEnabled = document.getElementById("printList").disabled;
          if(!sEnabled){
            vm.printList()
          }
        }
        else if(event.keyCode == '119'){//<%--打印运单(D变成F8) 快捷键 --%>
          var dEnabled = document.getElementById("printWay").disabled;
          if(!dEnabled){
            vm.printWaybill()
          }
        }else if(event.keyCode == '120'){//<%--复核(H变成F9) 快捷键 --%>
          var hEnabled = document.getElementById("search-btn").disabled;
          if(!hEnabled){
            vm.examinationCheck();
          }
        }else if(event.keyCode == '109'){//<%--包装确认(K变成-) 快捷键 --%>
          var kEnabled = document.getElementById("confirmNum").disabled;
          if(!kEnabled){
            vm.addPack();
          }
        }
      }
    });
  };
  button_shortcutsKey(); //<%--初始化 --%>

  



}