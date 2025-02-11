<script setup>
defineProps({
  coinSplitValue: {
    type: Number,
    required: true
  },
  fieldName: {
    type: String,
    required: true
  },
  onInput: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="asset-form__range">
    <input
      :name="fieldName"
      type="range"
      min="0"
      max="100"
      :value="coinSplitValue"
      @input="onInput"
      :aria-label="`Percentage split for shares`"
    />
  </div>
</template>

<style scoped>

</style>
