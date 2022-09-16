<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    cachedViews() {
      return this.$store.state.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>
