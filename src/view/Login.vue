<template>
  <div id="login-page">
    <div class="left-box"></div>
    <div class="right-box">
      <h2 class="mb-15">Office Cheaters</h2>
      <img
        src="@/assets/google_login_btn.png"
        class="login-btn mb-5"
        @click="clickLoginBtn"
      />
      <div class="login-noti">로그인 후 이용이 가능합니다</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const socialRedirectUrl = import.meta.env.VITE_APP_SOCIAL_REDIRECT_URL;

const clickLoginBtn = () => {
  window.location.href =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=1008824328660-24evg9b292sjp2rpu1bhhmci3ao2l2gp.apps.googleusercontent.com&" +
    `redirect_uri=${socialRedirectUrl}` +
    "&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email";
};
</script>
<style scoped lang="scss">
#login-page {
  display: flex;
  overflow: hidden;

  .left-box {
    width: 65%;
    height: 100vh;

    background-image: url(@/assets/login_banner.png);
    background-size: cover;
    background-position: center;
  }
  .right-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 100vh;
  }
}

.login-btn {
  width: 200px;
  height: auto;
  cursor: pointer;
}
.login-noti {
  text-decoration: underline;
  color: black;
}
</style>
