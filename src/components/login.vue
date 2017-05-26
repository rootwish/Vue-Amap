<template>
<div id='login'>
<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <Form-item prop="user"  v-show='loginstatus'>
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password" v-show='loginstatus'>
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button v-show='loginstatus' type="primary" @click="login()">登录</Button>
            <Button v-show='!loginstatus' type="primary" @click="showsomething()">查看个人信息</Button>
            <Button v-show='!loginstatus' type="primary" @click="logout()">注销</Button>
        </Form-item>
    </Form>
</div>
</template>

<script>
    export default {
    	name:'login',
      created () {
         this.checkLogin();
    },
    data() {
        return {
             loginstatus: 'false',
             formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 5, message: '密码长度不能小于5位', trigger: 'blur' }
                    ]
                }
            }
        },
    methods:{
      checkLogin() {
      //检查是否存在session
      if(this.getCookie('session')){
        this.loginstatus = !this.loginstatus;
        
                                  }
      },
      showsomething(){
          var str=this.getCookie("session");
          var result = str.split(/\",\"/g);
          this.$Message.info(result[1]+" "+result[2]+" "+result[3]+" "+result[4]+" "+result[5],5);  
      },
      login() {
        // 获取已有账号密码
        let params = { 
              account : this.formInline.user,
              password : this.formInline.password
            };
        this.$http.post('/api/login/getAccount',params)
          .then((response) => {
            // 响应成功回调
            console.log(response);
            console.log("save"+response.bodyText);
            if (response.body.length) {
                        this.$Message.success('登录成功!');
                        //登录成功后保存cookie
                         let expireDays = 1000 * 60 * 60 * 24 * 15;
                        this.setCookie('session', response.bodyText, expireDays);
                        this.loginstatus = !this.loginstatus;
                    } else {
                        this.$Message.error('登录失败!');
                    }
          })
          .then((response) => {
            console.log(response)

          })
          .catch((reject) => {
            console.log(reject)
          });
        },
      logout(){
      //删除cookie
      this.delCookie('session');
      //重置登录状态
      this.loginstatus = !this.loginstatus;
      this.$Message.success('注销成功!');
                }
      }
    }
</script>
<style>
#login {
    position: absolute;
    overflow: hidden;
    z-index: 2600;
    top: 20px;
    left: 80px;
}
</style>