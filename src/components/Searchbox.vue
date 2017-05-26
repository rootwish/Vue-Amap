<template>
<div id='searchbox'>
<img class='direntry' src='../assets/searchroad.png' @click='showdiv()'>
<div v-show='status1'>
<router-view name='autocomplete'></router-view>
</div>
<div  v-show='!status1'>
<router-view name='tabsroad'></router-view>
</div>
</div>
</template>

<script>
export default {
  name:'Searchbox',
  data (){
    return {
      status1:'ture'
    }
  },
  methods: {
  	showdiv: function () {
  		this.status1=!this.status1
  	}
  }
}
</script>

<style>
#searchbox .direntry {
    position: absolute;
    overflow: hidden;
    z-index: 2600;
    top: 52px;
    right: 80px;
    width: 25px;
    height: 25px;
}
</style>
