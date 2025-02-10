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
  <div>
    <label for="investment">USD Investable Assets</label>
    $<input v-model="investment" id="investment" name="investment" type="text" @keyup="onInvestmentChange" />
  </div>

  <div>
    <div>
      <label for="coin-a">{{ coinSplitA }}%
        <select id="coin-a" name="coin-a" @change="onCoinAUpdate">
          <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyA">{{ coin }}</option>
        </select>
      </label>
    </div>

    <div>
      <input name="range" type="range" min="0" max="100" :value="coinSplitA" @input="onRangeUpdate" />
    </div>

    <div>
      <label for="coin-b">{{ coinSplitB }}%
        <select id="coin-b" name="coin-b" @change="onCoinBUpdate">
          <option v-for="coin in coinList" :value="coin" :selected="coin === coinKeyB">{{ coin }}</option>
        </select>
      </label>
    </div>
  </div>

  <div>
    <div>
      <label for="asset-a">{{ coinKeyA }} Allocation</label>
      <input id="asset-a" name="asset-a" type="text" :value="allocationA" readonly />
    </div>

    <div>
      <label for="asset-b">{{ coinKeyB }} Allocation</label>
      <input id="asset-b" name="asset-b" type="text" :value="allocationB" readonly />
    </div>
  </div>
</template>

<style scoped>

</style>
