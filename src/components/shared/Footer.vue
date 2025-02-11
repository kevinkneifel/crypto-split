<script setup>
const year = new Date().getFullYear();
const link = 'https://www.linkedin.com/in/kevinkneifel/'
</script>

<template>
  <footer class="app-footer">
    <p class="app-footer__info">
      &copy;{{ year }} &mdash;
      <a :href="link" target="_blank">Kevin Kneifel</a> made this and hopes you enjoy it!
    </p>
  </footer>
</template>
