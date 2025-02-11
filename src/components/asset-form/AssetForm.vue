<script setup>
import { ref } from 'vue';
import {
  coinKeyA,
  coinKeyB,
  coinSplitA,
  coinSplitB,
  exchangeRates,
  setCoinSplits,
  setCoinKeyA,
  setCoinKeyB,
  refreshExchangeRates, setAlert
} from '@/lib/store';
import { calculateAllocation } from '@/lib/utils';
import { REGEX_FLOAT } from '@/lib/constants';
import AllocationField from '@/components/asset-form/AllocationField.vue';
import CoinSelectField from '@/components/asset-form/CoinSelectField.vue';
import SplitRangeField from '@/components/asset-form/SplitRangeField.vue';

const allocationA = ref(0);
const allocationB = ref(0);
const investment = defineModel('investment', { type: Number })

/**
 * Refreshes the rates if we're over the TTL, calculates our allocations
 * @param value
 */
function setAssetAllocations(value) {
  refreshExchangeRates().then(() => {
    allocationA.value = calculateAllocation(value, coinSplitA.value, exchangeRates.rates[coinKeyA.value]);
    allocationB.value = calculateAllocation(value, coinSplitB.value, exchangeRates.rates[coinKeyB.value]);
  })
  .catch((error) => {
    setAlert(error.message);
  });
}

/**
 * Updates allocations when the investment amount changes
 */
function onInvestmentChange() {
  setAssetAllocations(investment.value);
}

/**
 * Prevents entering anything but a USD dollar value in the investment field
 * @param e
 */
function validateFloatInput(e) {
  if (e.data && !REGEX_FLOAT.test(e.target.value + e.data)) {
    e.preventDefault();
  }
}

/**
 * Updates splits and allocations
 * @param e
 */
function onRangeUpdate(e) {
  setCoinSplits(e.target.value);
  setAssetAllocations(investment.value);
}

/**
 * Updates coin A type and the allocations
 * @param e
 */
function onCoinAUpdate(e) {
  setCoinKeyA(e.target.value);
  setAssetAllocations(investment.value);
}

/**
 * Updates coin B type and the allocations
 * @param e
 */
function onCoinBUpdate(e) {
  setCoinKeyB(e.target.value);
  setAssetAllocations(investment.value);
}

</script>

<template>
  <section class="asset-form">
    <div class="asset-form__row">
      <div class="asset-form__field asset-form__field--half">
        <label for="investment" aria-label="Investable assets in USD">
          USD Investable Assets
        </label>
        <input
          v-model="investment"
          id="investment"
          name="investment"
          type="text"
          @beforeinput="validateFloatInput"
          @keyup="onInvestmentChange"
          autofocus
        />
      </div>
    </div>

    <div class="asset-form__row">
      <CoinSelectField
        field-name="coin-a"
        :coin-key-value="String(coinKeyA)"
        :coin-split-value="Number(coinSplitA)"
        :on-change="onCoinAUpdate"
      />

      <SplitRangeField
        field-name="split-range"
        :coin-split-value="Number(coinSplitA)"
        :on-input="onRangeUpdate"
      />

      <CoinSelectField
        field-name="coin-b"
        :coin-key-value="String(coinKeyB)"
        :coin-split-value="Number(coinSplitB)"
        :on-change="onCoinBUpdate"
      />
    </div>

    <div class="asset-form__row">
      <AllocationField
        field-name="asset-a"
        :allocation-value="Number(allocationA)"
        :coin-key-value="String(coinKeyA)"
        :coin-split-value="Number(coinSplitA)"
      />

      <AllocationField
        field-name="asset-b"
        :allocation-value="Number(allocationB)"
        :coin-key-value="String(coinKeyB)"
        :coin-split-value="Number(coinSplitB)"
      />
    </div>
  </section>
</template>

<style scoped>
.asset-form {
  margin: 2em 0;
}

.asset-form__row {
  display: flex;
  justify-content: center;
  margin: 1em 0;
}

.asset-form__field {
  flex-grow: 1;
  padding: 0em 1em;
  width: 50%;
}

.asset-form__field--half {
  flex-grow: 0;
  width: 50%
}

@media only screen and (max-width: 600px) {
  .asset-form__row {
    display: inherit;
    margin: 0;
  }

  .asset-form__field {
    margin: 1em 0;
    width: auto;
  }

  .asset-form__field--half {
    width: inherit;
  }
}
</style>
