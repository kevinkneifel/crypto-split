<script setup>
  import { fetchExchangeRates } from '@/lib/services/rate-service';
  import { setCoinList, setExchangeRates } from '@/lib/store';

  // Fetch the first set of exchange rates and set our stores
  fetchExchangeRates()
    .then((rates) => {
      setExchangeRates(rates);
      setCoinList(rates);
    })
    .catch((error) => {
      // TODO: We'll want an error component and watched ref that this can update
    })
</script>

<template>
</template>

<style scoped>
</style>
