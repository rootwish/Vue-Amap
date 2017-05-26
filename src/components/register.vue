<template>
<div id='register'>
    <Button type="primary" @click="modal1 = true">注册</Button>
    <Modal
        v-model="modal1"
        title="注册"
        @on-ok="handleSubmit('formValidate')"
        @on-cancel="handleReset('formValidate')">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="账号" prop="user">
            <Input type="text" v-model="formValidate.user"></Input>
        </Form-item>
       <Form-item label="密码" prop="passwd">
            <Input type="password" v-model="formValidate.passwd"></Input>
        </Form-item>
        <Form-item label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formValidate.passwdCheck"></Input>
        </Form-item>
        <Form-item label="年龄" prop="age">
            <Input type="text" v-model="formValidate.age" number></Input>
        </Form-item>
        <Form-item label="性别" prop="gender">
            <Radio-group v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="地址" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
     <!--    <Form-item>
            <Button type="primary" @on-ok="handleSubmit('formValidate')">注册</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item> -->
    </Form>
    </Modal>
</div>
</template>
<script>
    export default {
        name:'login',
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                 modal1: false,
                formValidate: {
                    user: '',
                    passwd: '',
                    passwdCheck: '',
                    age: '',
                    gender: '',
                    desc: ''
                },
                ruleValidate: {
                    user: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true,validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { required: true,validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                let params = { 
              account : this.formValidate.user,
              password : this.formValidate.passwd,
              gender: this.formValidate.gender,
              desc: this.formValidate.desc,
              age: this.formValidate.age
            };
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('注册成功!');
                        this.$http.post('/api/login/createAccount',params);
                    } else {
                        this.$Message.error('注册失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style>
#register {
    position: absolute;
    overflow: hidden;
    z-index: 2600;
    top: 65px;
    left: 80px;
}
</style>