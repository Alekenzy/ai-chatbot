<template>
  <v-container v-if="groupedMessages.length" class="container" fluid>
    <div v-for="(group, index) in groupedMessages" :key="index">
      <div class="text-center my-4">
        <v-chip class="text-grey bg-transparent">{{ group.date }}</v-chip>
      </div>
      <v-row v-for="message in group.messages" :key="message.id" :justify="message.isMine ? 'end' : 'start'">
        <v-col cols="10">
          <v-card :class="['chat-bubble', message.isMine ? 'mine' : 'theirs']">
            <v-card-text>
              <div class="message-text">{{ message.text }}</div>
              <div class="time-text">{{ message.time }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-container v-else class="container">
    <v-row align="center" class="h-100" justify="center">
      <v-col class="text-center" cols="auto">
        <h1>Привет!</h1>
        <p>Спросите что-нибудь - я отвечу)</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message } from '@/config/types/chat.ts';

  export interface Props {
    messages: Message[];
  }

  const props = defineProps<Props>();

  const groupedMessages = computed(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    props.messages.forEach(msg => {
      const group = groups.find(g => g.date === msg.date);
      if (group) {
        group.messages.push(msg);
      } else {
        groups.push({ date: msg.date, messages: [msg] });
      }
    });
    return groups;
  });
</script>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  height: calc(100vh - 144px);
  overflow: auto;
}

.chat-window {
  height: 100vh;
  overflow-y: auto;
}
.chat-bubble {
  padding: 8px 12px;
  border-radius: 16px;
  word-break: break-word;
}
.chat-bubble.mine {
  background-color: #e0e0e0;
  color: #000;
  border-bottom-right-radius: 0;
}
.chat-bubble.theirs {
  background-color: #424242;
  color: #fff;
  border-bottom-left-radius: 0;
}
.time-text {
  font-size: 12px;
  margin-top: 4px;
  text-align: right;
}
.chat-bubble.mine .time-text {
  color: #757575;
}
.chat-bubble.theirs .time-text {
  color: #bdbdbd;
}
</style>
