<template>
  <div id="main-page">
    <!-- 로그인 회원가입 버튼 -->
    <div class="button-section py-5">
      <v-btn class="mr-3">로그인</v-btn>
      <v-btn>회원가입</v-btn>
    </div>

    <div class="contents">
      <div class="input-container">
        <!-- 명령어 입력 text area -->
        <v-textarea
          label="명령어"
          auto-grow
          rows="2"
          variant="outlined"
          class="command-input"
          v-model="currentPrompt"
        />
        <!-- 파일 업로드 -->
        <v-file-input
          label="파일 선택 혹은 드래그"
          multiple
          class="file-input"
          v-model="uploadedFile"
        >
          <template v-slot:selection="{ fileNames }">
            <template v-for="fileName in fileNames" :key="fileName">
              <v-chip size="small" label color="primary" class="me-2">
                {{ fileName }}
              </v-chip>
            </template>
          </template>
        </v-file-input>
      </div>
      <!-- 실행 버튼 -->
      <v-btn size="large" class="execute-btn mt-10" @click="clickExecuteBtn"
        >실행</v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import { getPromptResult } from "../api/api";

const uploadedFile: Ref<File[]> = ref();
const currentPrompt: Ref<string> = ref("");

const clickExecuteBtn = async () => {
  await getPromptResult(uploadedFile.value[0], currentPrompt.value);
};

// watch(uploadedFile, (newVal) => {
//   console.log(newVal[0]);
// });
</script>
<style scoped lang="scss">
#main-page {
  height: 100vh;
}
.button-section {
  display: flex;
  justify-content: right;
}

.contents {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .command-input {
    width: 60%;
  }
  .file-input {
    width: 60%;
  }
  .execute-btn {
    color: white;
    background-color: #9747ff;
  }
}
</style>
