<template>
  <v-app style="min-height: 100vh; width: 100%; margin: 0; padding: 0;">
    <router-link to="/staff"></router-link>
    <router-link to="/staffGroups"></router-link>
    <router-link to="/orders"></router-link>
    <router-link to="/publications"></router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>

::-webkit-scrollbar {
    width: 0;
}

* {
  text-decoration: none;
  font-family: "Montserrat";
  font-weight: 700;
}

</style>