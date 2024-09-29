<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/component/ui/dialog";
import { ref } from "vue";
const opened = ref(false);
const closeModal = () => {
  opened.value = false;
};
const openModal = () => {
  opened.value = true;
};
defineExpose({
  closeModal,
  openModal,
  opened
});
</script>
<template>
  <Dialog v-model:open="opened">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          <slot name="title">
          </slot>
        </DialogTitle>
        <DialogDescription>
          <slot name="description">
          </slot>
        </DialogDescription>
      </DialogHeader>
      <slot>
      </slot>
      <DialogFooter class="sm:justify-start sm:flex-row-reverse">
        <DialogClose as-child>
          <slot name="footerBtn">
            <button class="btn">Close</button>
          </slot>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>