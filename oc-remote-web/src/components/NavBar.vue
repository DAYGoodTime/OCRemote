<template>
     <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li>
              <details class="z-10">
                <summary>Parent</summary>
                <ul class="p-2 bg-base-100 rounded-t-none">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
</template>
<script setup>
defineOptions({
    name:"NavBar"
})
</script>
<style scoped>
</style>