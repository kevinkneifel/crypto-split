<script setup>
  import { refreshExchangeRates } from '@/lib/store';
  import AssetForm from '@/components/asset-form/AssetForm.vue';

  // Fetch the first set of exchange rates and set our coin list
  refreshExchangeRates(true)
    .catch((error) => {
      // TODO: We'll want an error component and watched ref that this can update
    })
</script>

<template>
  <AssetForm />
</template>

<style scoped>
</style>
