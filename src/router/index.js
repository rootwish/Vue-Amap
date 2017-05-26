import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/GMap'
import Autocomplete from '@/components/Autocomplete'
import Searchbox from '@/components/Searchbox'
import App from '@/App'
import Tabsroad from '@/components/Tabsroad'
import Walking from '@/components/Walking'
import Driving from '@/components/Driving'
import Transfer from '@/components/Transfer'
import login from '@/components/login'
import register from '@/components/register'
// import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
      default:GMap,
      autocomplete:Autocomplete,
      searchbox:Searchbox,
      tabsroad:Tabsroad,
      login:login,
      register:register,
      // login:login,
 				 },
 				 children: [
 				 {
 				 	path:'/',
          components:{              //components与component不同
             tabsroad:Tabsroad,
             autocomplete:Autocomplete,
            },
             children: [
         {
          path:'/',
          components:{              //components与component不同
             walking:Walking,
             transfer:Transfer,
             driving:Driving,
            }
          
         }
         ]

 				 }
 				 ]

      	}

  
  ]
})
