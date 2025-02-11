<script setup>
defineProps({
  allocationValue: {
    type: Number,
    required: true
  },
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
  }
})
</script>

<template>
  <div class="asset-form__readonly">
    <label :for="fieldName" :aria-label="`${coinSplitValue}% ${[coinKeyValue]} allocation`">
      {{ coinKeyValue }} Allocation
    </label>
    <input :id="fieldName" :name="fieldName" type="text" :value="allocationValue" readonly />
  </div>
</template>

<style scoped>

</style>
