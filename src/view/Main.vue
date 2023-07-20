<template>
  <div id="main-page">
    <!-- 로그인 회원가입 버튼 -->
    <div class="button-section py-5">
      <v-btn class="mr-3">로그인</v-btn>
      <v-btn>회원가입</v-btn>
    </div>
    <div class="title">
      <h1>🗓️ Office Cheaters 🦹‍♀️</h1>
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
    <div class="output">
      <div class="output-text" v-if="showTextOutput">
        <h2>{{ currentPromptResponse.answer.data }}</h2>
      </div>

      <div class="output-img" v-if="showImgOutput">
        <img :src="currentPromptResponse.file.url" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, watchEffect } from "vue";
import { getPromptResult } from "../api/api";
import { promptResponse } from "../type/type";

const uploadedFile: Ref<File[]> = ref(); //업로드한 파일
const currentPrompt: Ref<string> = ref(""); //현재 명령어

const currentPromptResponse: Ref<promptResponse> = ref({
  answer: null,
  file: null,
  uuid: "",
}); //명령 결과

//실행버튼 클릭 이벤트
const clickExecuteBtn = async () => {
  const response = await getPromptResult(
    uploadedFile.value[0],
    currentPrompt.value
  );
  currentPromptResponse.value = response.data;
  console.log(currentPromptResponse.value);
};

/*실행 결과에 따라 어떤 컴포넌트를 보여줄지 판별 */
const showTextOutput: Ref<boolean> = ref(false);
const showImgOutput: Ref<boolean> = ref(false);
const showFileOutput: Ref<boolean> = ref(false);
watchEffect(() => {
  //결과가 텍스트일 때
  if (
    currentPromptResponse.value.answer !== null &&
    currentPromptResponse.value.answer.type === "str"
  ) {
    showTextOutput.value = true;
  }

  //결과가 이미지일 때
  if (
    currentPromptResponse.value.file !== null &&
    currentPromptResponse.value.file.extension === "png"
  ) {
    showImgOutput.value = true;
  }
});
</script>
<style scoped lang="scss">
#main-page {
  min-height: 100vh;
}
.button-section {
  display: flex;
  justify-content: right;
}

.title {
  margin-top: 5%;
  text-align: center;
}

.contents {
  margin-top: 5%;
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

.output {
  margin-top: 4%;
  text-align: center;

  .output-img {
    text-align: center;

    img {
      width: 50%;
      height: auto;
    }
  }
}
</style>
