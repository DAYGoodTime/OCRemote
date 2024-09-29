<script setup lang="tsx">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/component/ui/tooltip";
defineProps({
    tip:String,
    useSlot:{
        type:Boolean,
        default:false
    }
})
</script>
<template>
  <TooltipProvider :delay-duration="100">
    <Tooltip>
      <TooltipTrigger>
        <slot></slot>
      </TooltipTrigger>
      <TooltipContent>
        <p v-if="!useSlot">{{ tip }}</p>
        <slot v-else name="tip"></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
<style scoped></style>
