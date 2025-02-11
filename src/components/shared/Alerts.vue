<script setup>
import { alerts, unsetAlert } from '@/lib/store';
</script>

<template>
  <section v-if="alerts.length" class="app-alerts">
    <div
      v-for="msg in alerts"
      :class="['app-alert', `app-alert__${msg.type}`]"
      :key="msg.id"
    >
      <p>{{ msg.message }}</p>
      <button aria-label="Close error" class="app-alert__close" @click="unsetAlert(msg.id)">
        &times;
      </button>
    </div>
  </section>
</template>

<style scoped>
.app-alerts {
  padding: 0 1em;
}

.app-alert {
  align-items: center;
  color: var(--cs-error-color);
  border: 2px solid var(--cs-error-color);
  border-radius: var(--cs-border-radius);
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0 1.2em;
}

.app-alert p {
  margin: 0;
  line-height: 1.5em;
}

.app-alert button {
  color: var(--cs-error-color);
  display: flex;
  font-family: var(--cs-font-family), sans-serif;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  padding: 0;
}

.app-alert button:hover,
.app-alert button:focus {
  color: var(--cs-error-hover-color);
}
</style>
