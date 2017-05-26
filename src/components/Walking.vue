<template>     
<div id='walking'>
	<input class="dir_ipt" id="dir_from_ipt"  v-model="ipt" placeholder="请输入起点" value="" autocomplete="off">
	<input class="dir_to_ipt" id="dir_from_ipt" v-model="toipt" placeholder="请输入终点" value="" autocomplete="off">
    <a href="javascript:void(0)" class="dir_submit" @click="showwalk()">走路去</a>
    <div id="panel"></div>
</div>
</template> 

<script>     
export default { 
	name:'walking',
    data () {
        return{
            ipt:'',
            toipt:''
        }
    },
    methods: {
        getipt: function () {
            return this.ipt
        },
         gettoipt: function () {
           return  this.toipt
        },
    showwalk: function () {
        console.log(this.getipt()),
        console.log(this.gettoipt()),
     AMap.service('AMap.Walking',function(){//回调函数
    //实例化Walking
    // walking= new AMap.Walking({city: '北京市'});
    //TODO: 使用walking对象调用步行路径规划相关的功能
})
    //步行导航
    var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    }); 
    walking.search([
        {keyword: this.getipt()},
        {keyword: this.gettoipt()}
    ]);
               }
             }
         }
 </script>
 
 <style> 
 #walking{
 	text-align:center
 } 
 .dir_ipt {
   position: relative;
   margin-top: 25px;
    height: 34px;
    line-height: 34px;
    width: 200px;
    font-size: 14px;
    color: #acd7ff;
    background-color: #3587eb;
    border-radius: 2px;
    margin-bottom: 10px;
}
 .dir_to_ipt {
   position: relative;
   margin-top: 20px;
    height: 34px;
    line-height: 34px;
    width: 200px;
    font-size: 14px;
    color: #acd7ff;
    background-color: #3587eb;
    border-radius: 2px;
    margin-bottom: 10px;
}
.dir_submit {
    margin-top: 25px;
    display: block;
     position: relative;
    padding: 0 25px;
    height: 32px;
    line-height: 32px;
    background-color: #559ffb;
    border: none;
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
    -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
    -moz-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
}
#panel {
            position: relative;
            overflow: auto;
            height: 300px
        }
.amap-call {
    display: none;
}   
 </style>