<script setup>
import { coinList } from '@/lib/store/index.js';

defineProps({
  coinKeyValue: {
    type: String,
    required: true
  },
  coinSplitValue: {
    type: Number,
    required: true
  },
  fieldName: {
    type: String,
    required: true
  },
  onChange: {
    type: Function,
    required: true
  }
})

</script>

<template>
  <div class="asset-form__select">
    <label :for="fieldName" :aria-label="`Cryptocurrency for ${coinSplitValue}% share`">
      {{ coinSplitValue }}%
    </label>
    <select :id="fieldName" :name="fieldName" @change="onChange">
      <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyValue">
        {{ coin }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
