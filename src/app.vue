<template>
  <div id="app">
   <router-view ></router-view>
    <router-view name='searchbox'></router-view>
    <router-view name='login'></router-view>
    <router-view name='register'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
    width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0;
}
</style>