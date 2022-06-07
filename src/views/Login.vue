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

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const onSubmit = values => {
      console.log('submit', values.username)
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
  // background: rgb(99, 170, 99);
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
