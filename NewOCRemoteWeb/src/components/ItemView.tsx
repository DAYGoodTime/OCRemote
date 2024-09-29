import { computed, defineComponent, ref } from "vue";
import type { Item } from "@/types/types";
import { FormatNumber } from "@/utils/number";
import { useEventListener } from "@vueuse/core";
import OrderDialog from "./OrderDialog.vue";
import { baseUrl } from "@/utils/http/request";
import ToolTips from "./ToolTips.vue";

export interface ItemViewProps {
  item: Item;
  size?: "small" | "middle" | "large";
  viewonly?: Boolean;
}

export default defineComponent(
  (props: ItemViewProps) => {
    // for pre process
    const processedUrl = computed(() => {
      let item = props.item ?? {
        label: "ErrorItem",
        damage: 0,
        size: 0,
        isCraftable: false,
      };
      return `${baseUrl}/api/ae/item/${item.damage}/${encodeURI(item.label)}`;
    });
    const BoxSize = computed(() => {
      switch (props.size) {
        case "large":
          return "w-36 h-36";
        case "middle":
          return "w-24 h-24";
        case "small":
          return "w-16 h-16";
        default:
          return "w-24 h-24";
      }
    });
    const Instance = ref<HTMLDivElement>();
    const DialogRef = ref<InstanceType<typeof OrderDialog>>();
    if (props.item?.isCraftable && !props.viewonly) {
      useEventListener(Instance, "mousedown", (e) => {
        //add middle feature
        if (e.button === 1) {
          DialogRef.value?.openModal();
        }
      });
    }
    return () => (
      <ToolTips tip={props.item?props.item.label:""}>
        <div
          ref={Instance}
          class={
            "relative border-4 rounded-2xl border-zinc-300 bg-muted " +
            BoxSize.value
          }
        >
          <img src={processedUrl.value}></img>
          <span
            style="-webkit-text-stroke: 1px gray;"
            class="absolute bottom-0 right-0 z-10 font-bold text-white"
          >
            {FormatNumber(props.item ? props.item.size : 0)}
          </span>
          {props.item?.isCraftable ? (
            props.viewonly ? (
              ""
            ) : (
              <div
                style="-webkit-text-stroke: 1px gray;"
                class="absolute -top-2 right-0 z-10 font-bold text-white text-2xl"
              >
                +
              </div>
            )
          ) : (
            ""
          )}
        </div>
        <OrderDialog item={props.item as Item} ref={DialogRef} />
      </ToolTips>
    );
  },
  {
    name: "ItemView",
    props: ["item", "size","viewonly"],
  }
);
