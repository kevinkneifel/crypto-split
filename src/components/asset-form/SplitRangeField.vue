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
  <div class="asset-form__field asset-form__field--range">
    <div class="range">
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
  </div>
</template>

<style scoped>
.asset-form__field--range {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
