<template>
  <v-card>
    <v-app-bar>

      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>AI ChatBot</v-app-bar-title>

      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-lightbulb</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-card>
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();

  const isDark = computed(() => theme.global.current.value.dark);

  function toggleTheme () {
    theme.global.name.value = isDark.value ? 'light' : 'dark';
    localStorage.setItem('theme', theme.global.name.value);
  }
</script>
