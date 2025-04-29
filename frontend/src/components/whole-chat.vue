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
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  const chatHistory = ref<Message[]>([])
  const userText = ref<string>('')
  const aiLoading = ref<boolean>(false)

  function submitUserText () {
    userText.value = userText.value.trim()
    if (!userText.value) return

    const currentDate = new Date();
    chatHistory.value.push({
      text: userText.value,
      date: currentDate.toString().slice(4, 10),
      time: currentDate.toString().slice(16, 21),
      isMine: true,
    })
    getAiResponse(userText.value)
    userText.value = ''
  }

  function getAiResponse (userTextValue: string) {
    aiLoading.value = true;
    fetch(
      'http://localhost:8000/api/talk',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userTextValue }),
      }
    ).then(async response => {
      const res: Message = await response.json()
      res.text = DOMPurify.sanitize(marked.parse(res.text) as string)
      chatHistory.value.push({
        ...res,
        isMine: false,
      })
    }).catch(() => {
      const currentDate = new Date()
      chatHistory.value.push({
        text: 'Hi, this is an automatic answer. Something went wrong.' +
          '<br>' +
          'Please, check your connection with server or your request.',
        date: currentDate.toString().slice(4, 10),
        time: currentDate.toString().slice(16, 21),
        isMine: false,
        error: true,
      })
    }).finally(() => {
      aiLoading.value = false
    })
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
