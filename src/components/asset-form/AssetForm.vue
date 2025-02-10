<script setup>
import { ref } from 'vue';
import {
  coinKeyA,
  coinKeyB,
  coinSplitA,
  coinSplitB,
  coinList,
  exchangeRates,
  setCoinSplits,
  setCoinKeyA,
  setCoinKeyB,
  refreshExchangeRates
} from '@/lib/store';
import { calculateAllocation } from '@/lib/utils';
import { REGEX_FLOAT } from '@/lib/constants';

const allocationA = ref(0);
const allocationB = ref(0);
const investment = defineModel('investment', { type: Number })

function setAssetAllocations(value) {
  refreshExchangeRates().then(() => {
    allocationA.value = calculateAllocation(value, coinSplitA.value, exchangeRates.rates[coinKeyA.value])
    allocationB.value = calculateAllocation(value, coinSplitB.value, exchangeRates.rates[coinKeyB.value])
  }).catch((error) => {
    // TODO: We'll want an error component and watched ref that this can update
  });
}

function onInvestmentChange(e) {
  setAssetAllocations(investment.value);
}

function validateFloatInput(e) {
  if (e.data && !REGEX_FLOAT.test(e.target.value + e.data)) {
    e.preventDefault();
  }
}

function onRangeUpdate(e) {
  setCoinSplits(e.target.value);
  setAssetAllocations(investment.value);
}

function onCoinAUpdate(e) {
  setCoinKeyA(e.target.value)
  setAssetAllocations(investment.value);
}

function onCoinBUpdate(e) {
  setCoinKeyB(e.target.value)
  setAssetAllocations(investment.value);
}
</script>

<template>
  <div class="asset-form">
    <div class="asset-form__row">
      <label for="investment" aria-label="Investable assets in USD">USD Investable Assets</label>
      $<input
        v-model="investment"
        id="investment"
        name="investment"
        type="text"
        @beforeinput="validateFloatInput"
        @keyup="onInvestmentChange"
      />
    </div>

    <div class="asset-form__row">
      <div>
        <label for="coin-a" :aria-label="`Cryptocurrency for ${coinSplitA}% share`">
          {{ coinSplitA }}%
        </label>
        <select id="coin-a" name="coin-a" @change="onCoinAUpdate">
          <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyA">{{ coin }}</option>
        </select>
      </div>

      <div>
        <input
          name="range"
          type="range"
          min="0"
          max="100"
          :value="coinSplitA"
          @input="onRangeUpdate"
          :aria-label="`Percentage split for shares`"
        />
      </div>

      <div>
        <label for="coin-b" :aria-label="`Cryptocurrency for ${coinSplitB}% share`">
          {{ coinSplitB }}%
        </label>
        <select id="coin-b" name="coin-b" @change="onCoinBUpdate">
          <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyB">{{ coin }}</option>
        </select>
      </div>
    </div>

    <div class="asset-form__row">
      <div>
        <label for="asset-a" :aria-label="`${coinSplitA}% ${coinKeyA} allocation`">{{ coinKeyA }} Allocation</label>
        <input id="asset-a" name="asset-a" type="text" :value="allocationA" readonly />
      </div>

      <div>
        <label for="asset-b" :aria-label="`${coinSplitB}% ${coinKeyB} allocation`">{{ coinKeyB }} Allocation</label>
        <input id="asset-b" name="asset-b" type="text" :value="allocationB" readonly />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
