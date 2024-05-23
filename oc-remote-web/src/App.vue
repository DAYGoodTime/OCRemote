<script setup>
import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";
</script>

<template>
  <div class="main  bg-gray-200  flex  flex-1  flex-row min-h-screen">
    <div class="Menu">
      <SideMenu></SideMenu>
    </div>
    <div class="body w-full h-full ">
      <div class="nav">
        <NavBar></NavBar>
      </div>
    <div class="body overflow-auto">
        <RouterView></RouterView>
    </div>
    </div>
  </div>
</template>

<style scoped></style>
