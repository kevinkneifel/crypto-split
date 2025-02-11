<script setup>
const year = new Date().getFullYear();
const message = 'Kevin Kneifel made this and hopes you enjoy it!'
</script>

<template>
  <footer class="app-footer">
    <p class="app-footer__info">
      &copy;{{ year }} &mdash; {{ message }}
    </p>
  </footer>
</template>
