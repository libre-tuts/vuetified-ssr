<template>
  <v-app 
    standalone
    v-cloak
  >
    <v-content>
      <v-container 
        fluid 
        pa-0 
        ma-0
      >
        <transition name="fade">
          <nuxt/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>
