angular.module('ionicApp.processCtrl', ['ionic'])
  .controller('processCtrl', function ($scope, edmData, $rootScope, $ionicPopup, $timeout, $cordovaVibration) {
    console.log('processCtrl');
    var beginFlag = 0, stopFlag = 0;

    $scope.vibration = function(time) {
      $cordovaVibration.vibrate(time);
    };

    $scope.setPWM = function () {
      var myPopup = $ionicPopup.show({
        template: ' 脉宽：<input type="text" id="pulseWidthValue" >' +
        '占空比：<input type="text" id="ratioValue" >',
        title: '<b>设置脉宽与占空比</b>',
        //subTitle: 'Please use normal things',
        scope: $rootScope,
        buttons: [
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!(ratioValue.value&&pulseWidthValue.value)){
                // 不允许用户关闭，除非输入两个值
                e.preventDefault();
              } else {
                $rootScope.pulseWidthValue = pulseWidthValue.value;
                $rootScope.ratioValue = ratioValue.value;
                myPopup.close();
              }
            }
          },
          { text: 'Cancel' }
        ]
      });

      if(!resCmdWebSocketOpen) return;
      resCmdWebSocket.send(JSON.stringify({'cmd': 'setPWM', ratio: ratioValue.value, pulseWidth: pulseWidthValue.value}));
    };



    machineSpeedLevelChange = function () {
      console.log($rootScope.machineSpeedLevel);

      //var resMachineSpeedValue;
      //if($rootScope.machineSpeedLevel == 1){
      //  resMachineSpeedValue=40;
      //}
      //else if($rootScope.machineSpeedLevel == 2){
      //  resMachineSpeedValue=76;
      //}
      //else if($rootScope.machineSpeedLevel == 3){
      //  resMachineSpeedValue=112;
      //}
      //else if($rootScope.machineSpeedLevel == 4){
      //  resMachineSpeedValue=148;
      //}
      //else if($rootScope.machineSpeedLevel == 5){
      //  resMachineSpeedValue=184;
      //}
      //else if($rootScope.machineSpeedLevel == 6){
      //  resMachineSpeedValue=220;
      //}
      //else if($rootScope.machineSpeedLevel == 7){
      //  resMachineSpeedValue=292;
      //}
      //else if($rootScope.machineSpeedLevel == 8){
      //  resMachineSpeedValue=328;
      //}
      //else if($rootScope.machineSpeedLevel == 9){
      //  resMachineSpeedValue=364;
      //}
      //else if($rootScope.machineSpeedLevel == 10){
      //  resMachineSpeedValue=400;
      //}

      if(!resCmdWebSocketOpen) return;
      resCmdWebSocket.send(JSON.stringify({'cmd':'setOuterSpeed', level: $rootScope.machineSpeedLevel}));

    };

    wireSpeedChange = function () {
      outputValue=outputValue&0xfffffff8;
      var resWireSpeedLevel = Number($rootScope.wireSpeedValue);
      switch (resWireSpeedLevel){
        case 2:
          outputValue= (CmdGPIOOutType.OUT1_WIREVEL_2_SW | CmdGPIOOutType.OUT2_WIREVEL_1_SW )|outputValue;
          break;
        case 3:
          outputValue= (CmdGPIOOutType.OUT2_WIREVEL_1_SW)|outputValue;
          break;
        case 0:

          break;
        case 1:
          outputValue= (CmdGPIOOutType.OUT1_WIREVEL_2_SW)|outputValue;
          break;
      }

      if(!resCmdWebSocketOpen) return;
      resCmdWebSocket.send(JSON.stringify({'cmd': 'setIOOutput','value': outputValue}));
      console.log("set wireSpeed %d", resWireSpeedLevel);
    };

    currentChange = function () {
      outputValue=outputValue&0xfffff0ff;
      var resCurrentLevel = Number($rootScope.currentValue);
      console.log(resCurrentLevel);
      switch(resCurrentLevel)
      {
        case 0:
          break;
        case 1:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW)|outputValue;
          break;
        case 2:
          outputValue= (CmdGPIOOutType.OUT10_PWMSEL3_SW)|outputValue;
          break;
        case 3:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT10_PWMSEL3_SW)|outputValue;
          break;
        case 4:
          outputValue= (CmdGPIOOutType.OUT9_PWMSEL2_SW)|outputValue;
          break;
        case 5:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW)|outputValue;
          break;
        case 6:
          outputValue= (CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW)|outputValue;
          break;
        case 7:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW)|outputValue;
          break;
        case 8:
          outputValue= (CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 9:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 10:
          outputValue= (CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 11:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 12:
          outputValue= (CmdGPIOOutType.OUT9_PWMSEL2_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 13:
          outputValue= (CmdGPIOOutType.OUT11_PWMSEL4_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 14:
          outputValue= (CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW|CmdGPIOOutType.OUT8_PWMSEL1_SW)|outputValue;
          break;
        case 15:
          outputValue= (CmdGPIOOutType.OUT8_PWMSEL1_SW|CmdGPIOOutType.OUT9_PWMSEL2_SW|CmdGPIOOutType.OUT10_PWMSEL3_SW|CmdGPIOOutType.OUT11_PWMSEL4_SW)|outputValue;
          break;
      }

      if(!resCmdWebSocketOpen) return;
      resCmdWebSocket.send(JSON.stringify({'cmd': 'setIOOutput','value': outputValue}));
      console.log("set current %d", resCurrentLevel);
    };

    $scope.wireSpeedDisplay = function () {
      if(document.getElementById("wireSpeedDispaly").style.display == "none"){
        document.getElementById("wireSpeedDispaly").style.display = "block";
        document.getElementById("wireSpeedDisplayIcon1").style.display = "none";
        document.getElementById("wireSpeedDisplayIcon2").style.display = "";
      }
      else{
        document.getElementById("wireSpeedDispaly").style.display = "none";
        document.getElementById("wireSpeedDisplayIcon1").style.display = "";
        document.getElementById("wireSpeedDisplayIcon2").style.display = "none";
      }
    };

    $scope.machineSpeedDispaly = function () {
      if(document.getElementById("machineSpeedDispaly").style.display == "none"){
        document.getElementById("machineSpeedDispaly").style.display = "block";
        document.getElementById("machineSpeedDispalyIcon1").style.display = "none";
        document.getElementById("machineSpeedDispalyIcon2").style.display = "";

      }
      else{
        document.getElementById("machineSpeedDispaly").style.display = "none";
        document.getElementById("machineSpeedDispalyIcon1").style.display = "";
        document.getElementById("machineSpeedDispalyIcon2").style.display = "none";

      }
    };
    $scope.currentValueDispaly = function () {
      if(document.getElementById("currentValueDispaly").style.display == "none"){
        document.getElementById("currentValueDispaly").style.display = "block";
        document.getElementById("currentValueDispalyIcon1").style.display = "none";
        document.getElementById("currentValueDispalyIcon2").style.display = "";
      }
      else{
        document.getElementById("currentValueDispaly").style.display = "none";
        document.getElementById("currentValueDispalyIcon1").style.display = "";
        document.getElementById("currentValueDispalyIcon2").style.display = "none";
      }
    }
    $scope.pulseAndRatioDispaly = function () {
      if(document.getElementById("pulseAndRatioDispaly").style.display == "none"){
        document.getElementById("pulseAndRatioDispaly").style.display = "block";
        document.getElementById("pulseAndRatio").innerHTML = "脉宽与占空比";
        document.getElementById("pulseAndRatioDispalyIcon1").style.display = "none";
        document.getElementById("pulseAndRatioDispalyIcon2").style.display = "";
      }
      else{
        document.getElementById("pulseAndRatioDispaly").style.display = "none";
        document.getElementById("pulseAndRatio").innerHTML = "脉宽："+$rootScope.pulseWidthValue+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"占空比："+$rootScope.pulseWidthValue;
        document.getElementById("pulseAndRatioDispalyIcon1").style.display = "";
        document.getElementById("pulseAndRatioDispalyIcon2").style.display = "none";
      }
    };


    $scope.startTrackMove = function () {
      $scope.vibration(200);
      if(!resCmdWebSocketOpen) {
        alert("未连接机床！");
        return;
      }
      beginFlag =1;
      document.getElementById("startTrackMove").style.display = "none";
      document.getElementById("pauseTrackMove").style.display = "";
      if(beginFlag == 0){
        return;
        console.log("第一次开始");
        resCmdWebSocket.send(JSON.stringify({'cmd':'setTrackMoveType', 'value': 1}));
        resCmdWebSocket.send(JSON.stringify({'cmd':'sendTrack','content':codeContent}));
        $timeout(function () {
          resCmdWebSocket.send(JSON.stringify({'cmd':'startTrackMove'}));
        },4000);
        beginFlag = 1;
      }
      else{
        console.log("暂停后开始");
        $timeout(function () {
          resCmdWebSocket.send(JSON.stringify({'cmd':'startTrackMove'}));
        },2000);
      }
    };

    $scope.pauseTrackMove = function () {
      $scope.vibration(200);
      if(!resCmdWebSocketOpen) {
        alert("未连接机床！");
        return;
      }
      document.getElementById("startTrackMove").style.display = "";
      document.getElementById("pauseTrackMove").style.display = "none";
      resCmdWebSocket.send(JSON.stringify({'cmd':'pauseTrackMove'}));
    };

    $scope.stopTrackMove = function () {
      $scope.vibration(200);
      if(!resCmdWebSocketOpen) {
        alert("未连接机床！");
        return;
      }

      var confirm = $ionicPopup.confirm({
        title: '请确认',
        template: '真的要停止吗?'
      });
      confirm.then(function (res) {
        if (res) {
          console.log('Yes!');
          if(!resCmdWebSocketOpen) return;
          resCmdWebSocket.send(JSON.stringify({'cmd':'stopTrackMove'}));
        } else {
          console.log('Nooooo!!');
        }
      });


    };



  });
