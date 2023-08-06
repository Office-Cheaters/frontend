<template>
  <div id="main-page" class="py-5">
    <!-- 로그인 회원가입 버튼 -->
    <div class="button-section py-5 mr-10">
      <v-btn link to="/login">로그인</v-btn>
      <!-- <v-btn>회원가입</v-btn> -->
    </div>
    <div class="title">
      <h1>🗓️ Office Cheaters 🦹‍♀️</h1>
    </div>
    <div class="contents">
      <!-- 결과물 형식 지정 -->
      <div class="type-selector mb-2">
        <v-select
          variant="outlined"
          density="compact"
          hide-details
          :items="outputType"
          v-model="selectedOutputType"
          class="select"
        />
        <v-select
          v-if="selectedOutputType === '파일'"
          variant="outlined"
          density="compact"
          hide-details
          :items="fileType"
          v-model="selectedFileType"
          class="select ml-2"
        />
        <v-select
          v-if="selectedOutputType === '시각화'"
          variant="outlined"
          density="compact"
          hide-details
          :items="visualType"
          v-model="selectedVisualType"
          class="select ml-2"
        />
      </div>
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
      <div class="output-text" v-if="showOutputType === 'text'">
        <h2>{{ currentPromptResponse.answer.data }}</h2>
      </div>

      <div class="output-img" v-if="showOutputType === 'image'">
        <img :src="currentPromptResponse.file.url" />
      </div>

      <div class="output-file" v-if="showOutputType === 'file'">
        <v-card class="px-5">
          <h3 class="mr-5">파일 이름</h3>
          <v-btn icon="mdi-download"></v-btn>
        </v-card>
      </div>

      <div class="output-visual" v-if="showOutputType === 'visual'">
        <v-table>
          <tbody>
            <tr
              v-for="(value, key) in currentPromptResponse.answer.data"
              :key="key"
            >
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-table>
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, watchEffect } from "vue";
import { getPromptResult } from "../api/api";
import { promptResponse } from "../type/type";
import Chart from "chart.js/auto";

const outputType = ["텍스트", "파일", "이미지", "시각화"];
const selectedOutputType = ref("텍스트");

const fileType = ["csv", "xlsx"];
const selectedFileType = ref("csv");

const visualType = ["표", "막대 차트", "꺾은선 차트", "도넛 차트"];
const selectedVisualType = ref("표");

const uploadedFile: Ref<File[]> = ref(); //업로드한 파일
const currentPrompt: Ref<string> = ref(""); //현재 명령어

const chartCanvas = ref(null);

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
const showOutputType: Ref<string> = ref("none");
watchEffect(() => {
  if (currentPromptResponse.value.answer !== null) {
    if (
      currentPromptResponse.value.answer.type === "str" ||
      currentPromptResponse.value.answer.type === "float64" ||
      currentPromptResponse.value.answer.type === "int"
    ) {
      //결과가 텍스트일 때
      showOutputType.value = "text";
    } else if (currentPromptResponse.value.answer.type === "json") {
      //결과가 시각화일 때
      showOutputType.value = "visual";

      const labels = Object.keys(currentPromptResponse.value.answer.data);
      const data = Object.values(currentPromptResponse.value.answer.data);

      const chartConfig: any = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Values",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      new Chart(chartCanvas.value, chartConfig);
    }
  }

  //결과가 이미지일 때
  if (
    currentPromptResponse.value.file !== null &&
    currentPromptResponse.value.file.extension === "png"
  ) {
    showOutputType.value = "image";
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
  margin-top: 3%;
  text-align: center;
}

.type-selector {
  display: flex;
  justify-content: right;

  .select {
    width: 120px;
  }
}

.contents {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  .output-file {
    text-align: center;
    display: flex;
    justify-content: center;

    .v-card {
      display: flex;
      justify-content: right;
      align-items: center;

      height: 70px;
    }
  }

  .output-visual {
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-table {
      width: 70%;
    }
  }
}
</style>
