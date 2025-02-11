<script setup>
  import { refreshExchangeRates, setAlert } from '@/lib/store';
  import AssetForm from '@/components/asset-form/AssetForm.vue';
  import Alerts from '@/components/shared/Alerts.vue';
  import Header from '@/components/shared/Header.vue';
  import Footer from '@/components/shared/Footer.vue';

  // Fetch the first set of exchange rates and set our coin list
  refreshExchangeRates(true)
    .catch((error) => {
      setAlert(error.message);
    });
</script>

<template>
  <Header />
  <Alerts />
  <AssetForm />
  <Footer />
</template>

<style scoped>
</style>
