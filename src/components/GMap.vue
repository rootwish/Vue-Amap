<template>
    <div id="gmap"> </div>
</template>

<style>
#gmap {
    margin:0px; 
    height:100%;
}
.amap-logo {
    display: none;
}
.amap-copyright {
        left: 0;
}
.amap-geo{
  display: none;
}
</style>

<script>
export default {
  name:'gmap',
  mounted () {
   const map = new AMap.Map('gmap', {
        resizeEnable: true
    });
   console.log(map);
    map.plugin('AMap.Geolocation', function() {
      var  geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    map.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], function(){
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
      // map.addControl(new AMap.OverView({isOpen:true}));
              });
    AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
        map.addControl(new BasicControl.LayerSwitcher({
            position: 'rb'
        }));
    });
    window.map=map;
    console.log(window.map);
 }
}
</script>