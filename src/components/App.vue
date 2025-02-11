<script setup>
  import { refreshExchangeRates } from '@/lib/store';
  import AssetForm from '@/components/asset-form/AssetForm.vue';

  // Fetch the first set of exchange rates and set our coin list
  refreshExchangeRates(true)
    .catch((error) => {
      // TODO: Push error to store and render in the alerts component
    })
</script>

<template>
  <AssetForm />
</template>

<style scoped>
</style>
