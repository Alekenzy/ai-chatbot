<template>
  <chat-interface :messages="chatHistory" />
  <v-footer app>
    <v-row class="py-1">
      <v-col cols="12">
        <v-form @submit.prevent="submitUserText">
          <v-textarea
            v-model="userText"
            auto-grow
            hide-details
            label="Напишите что-нибудь"
            max-rows="12"
            rows="1"
            @keydown.enter.exact.prevent="submitUserText"
          >
            <template #append>
              <v-btn
                :disabled="!userText || aiLoading"
                icon="mdi-send"
                :loading="aiLoading"
                size="large"
                type="submit"
              />
            </template>
          </v-textarea>
        </v-form>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
  import ChatInterface from '@/components/chat-interface.vue';
  import type { Message } from '@/config/types/chat.ts';

  const chatHistory = ref<Message[]>([])
  const userText = ref<string>('')
  const aiLoading = ref<boolean>(false)

  function submitUserText () {
    userText.value = userText.value.trim()
    if (!userText.value) return

    const currentDate = new Date();
    chatHistory.value.push({
      id: chatHistory.value.length + 1,
      text: userText.value,
      date: currentDate.toString().slice(4, 10),
      time: currentDate.toString().slice(16, 21),
      isMine: true,
    })
    getAiResponse(userText.value)
    userText.value = ''
  }

  function createRandomString (length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    randomArray.forEach(number => {
      result += chars[number % chars.length];
    });
    return result;
  }

  function getAiResponse (userTextValue: string) {
    try {
      aiLoading.value = true;
      const currentDate = new Date()
      setTimeout(() => {
        chatHistory.value.push({
          id: chatHistory.value.length + 1,
          text: `My answer for "${userTextValue}" is: ` + createRandomString(200),
          date: currentDate.toString().slice(4, 10),
          time: currentDate.toString().slice(16, 21),
          isMine: false,
        })
        aiLoading.value = false
      }, 2000)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style scoped lang="scss">
.v-footer {
  box-shadow:
    0px -2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px -4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px -1px 10px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
</style>
