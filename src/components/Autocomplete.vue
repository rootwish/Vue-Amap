<template>
    <div id="autocomplete">
   <div id="pickerBox">
        <input id="pickerInput" placeholder="输入关键字选取地点" />
        <div id="poiInfo"></div>
    </div>
    </div>
</template>


<script>
export default {
	name:'Autocomplete',
  mounted () {
// AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
//       var autoOptions = {
//         city: "", //城市，默认全国
//         input: "pickerInput"//使用联想输入的input的id
//       };
//       var autocompletes= new AMap.Autocomplete(autoOptions);//待定  autocomplete改名
//       var placeSearch = new AMap.PlaceSearch({
//             city:'',
//             map:window.map
//       })
//       AMap.event.addListener(autocompletes, "select", function(e){
//          //TODO 针对选中的poi实现自己的功能
//          console.log(window.map);
//          placeSearch.search(e.poi.name)
//       });
//     });

     AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {

        var poiPicker = new PoiPicker({
            //city:'北京',
            input: 'pickerInput'
        });

        //初始化poiPicker
        poiPickerReady(poiPicker);
    });

    function poiPickerReady(poiPicker) {

        window.poiPicker = poiPicker;

        var marker = new AMap.Marker();

        var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        poiPicker.on('poiPicked', function(poiResult) {

            var source = poiResult.source,
                poi = poiResult.item,
                info = {
                    source: source,
                    id: poi.id,
                    name: poi.name,
                    location: poi.location.toString(),
                    address: poi.address
                };

            marker.setMap(map);
            infoWindow.setMap(map);

            marker.setPosition(poi.location);
            infoWindow.setPosition(poi.location);

            infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
            infoWindow.open(map, marker.getPosition());

            //map.setCenter(marker.getPosition());
        });

        poiPicker.onCityReady(function() {
            poiPicker.suggest('美食');
        });
    }
	  }
}
</script>

<style>

#autocomplete{
          height: 100%;
}
#pickerBox {
        position: absolute;
        z-index: 2500;
        top: 50px;
        right: 30px;
        width: 300px;
    }
     #pickerInput {
        width: 200px;
        padding: 5px 5px;
    }
</style>
