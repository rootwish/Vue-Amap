<template>     
<div id='tabsroad'>
    <Tabs>
        <Tab-pane label="walk" icon="android-walk">
        <router-view name="walking"></router-view>
        </Tab-pane>
        <Tab-pane label="car" icon="model-s">
        <router-view name="driving"></router-view>
        </Tab-pane>
        <Tab-pane label="bus" icon="android-bus">
        <router-view name="transfer"></router-view>
        </Tab-pane>
    </Tabs>    
    <!-- <router-view ></router-view> -->
</div>
</template>

<script>     
export default { 
	name:'tabsroad',
             }
 </script>
 
 <style> 
    #tabsroad{
        /* display: none; */
    position: absolute;
    z-index: 2550;
    top: 45px;
    right: 65px;
    width: 330px;
    height: 226px;
    background-color: #98F898;
}
 </style>