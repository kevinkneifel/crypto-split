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
  <div class="asset-form__field asset-form__field--select">
    <label :for="fieldName" :aria-label="`Cryptocurrency for ${coinSplitValue}% share`">
      {{ coinSplitValue }}%
    </label>
    <div class="select">
      <select :id="fieldName" :name="fieldName" @change="onChange">
        <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyValue">
          {{ coin }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.asset-form__field--select {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.asset-form__field--select label {
  margin-right: 1em;
}

.asset-form__field--select .select {
  flex-grow: 1;
}
</style>
