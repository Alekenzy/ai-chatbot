<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="(chatItem, index) in chatHistory"
        :key="index"
        :subtitle="chatItem.message"
        :title="chatItem.author"
      />
    </v-list>
  </v-container>
  <v-footer app>
    <v-container
      id="input-usage"
      fluid
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            append-icon="mdi-close"
            @click:append="appendIconCallback"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
  interface ChatItem {
    author: 'ai' | 'human'
    message: string
    date: string
  }

  const chatHistory = ref<ChatItem[]>([])

  function appendIconCallback (event: MouseEvent) {
    console.log(event)
    chatHistory.value.push({
      author: 'human',
      message: event.target.value,
      date: (new Date()).toISOString().slice(0, 10),
    })
  }
</script>

<style scoped lang="sass">

</style>
