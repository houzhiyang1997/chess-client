<template>
  <div class="login-container">
    <div class="title">欢迎使用云顶小助手 V1.0</div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '@/api/index'
import { Toast } from 'vant'
import { hiddenFooter } from '@/hooks/useHidden.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    hiddenFooter()
    const store = useStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const onSubmit = async values => {
      const { data: res } = await api.login(values.username, values.password)
      if (res.code === 401) return Toast('用户名或密码错误')
      if (res.code === 402) return Toast('登陆失败')
      console.log(res)
      Toast('登陆成功')
      // 1、将登陆成功之后的token，保存到客户端的sessionStorage中,进行身份验证
      window.localStorage.setItem('token', res.token)
      // 存入vuex
      store.commit('setUserInfo', res.data)
      // 2、通过编程式导航跳转到me
      router.replace('/aboutme')
    }

    return {
      username,
      password,
      onSubmit
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-image: url(https://game.gtimg.cn/images/lol/act/a20220526set7/head-inner.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .title {
    margin-top: 10rem;
    text-align: center;
  }
  .main {
    margin-top: 3rem;
  }
}
</style>
