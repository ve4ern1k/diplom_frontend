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

* {
  text-decoration: none;
  font-family: "Montserrat";
  font-weight: 700;
}

/* W3C standard
   сейчас только для Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #9E9E9E #FFFFFF;
}

/* для Chrome/Edge/Safari/YandexBrowser */
*::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: #FFFFFF;
}
*::-webkit-scrollbar-thumb {
  background-color: #9E9E9E;
  border-radius: 10px;
  border: 2.5px solid #FFFFFF;
}

</style>