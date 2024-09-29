import {
  computed,
  CSSProperties,
  defineComponent,
  ref,
  SetupContext,
  SlotsType,
  VNode,
} from "vue";
import "@/assets/css/virualtable.css";

export interface ViuralTableProps<B> {
  list: B[];
  rows: VirualTableRow<B>[];
}
export interface VirualTableRow<T> {
  label: string;
  value?: string;
  render?: (row: T) => string | VNode;
  style?: CSSProperties;
  type?: 'normal' | 'operation'
  class?: string
}

type EmitsOption = {
  click: () => void;
};
type ViuralTableSlotType<T> = { operation: (scope:{obj: T,row:VirualTableRow<T>})=>VNode[]};

export default defineComponent(
  <T extends any>(
    props: ViuralTableProps<T>,
    ctx: SetupContext<EmitsOption, SlotsType<ViuralTableSlotType<T>>>
  ) => {
    const getDataList = computed(() => {
      if(props.list == undefined) return []
      return props.list;
    });
    const RowList = ref(props.rows);
    const isNoramlRender = computed(()=>(row:VirualTableRow<T>)=>{
        return row.render?false:(row.type?row.type == 'normal':true)
    })
    return () => {
      return (
        <>
          <table class="table table-xs md:table">
            <thead>
              <tr>
                {RowList.value.map((row) => {
                  return <th class="md:text-2xl">{row.label}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {getDataList.value.map((obj) => {
                return (
                  <tr class="hover border-2">
                    {RowList.value.map((row) => {
                      return (
                        <td class={row.class ?? ""} style={row.style}>
                          {isNoramlRender.value(row)?
                            obj[row.value as keyof unknown]:
                            row.type == 'operation'?
                            ctx.slots.operation({obj:obj as T,row:row})
                            :row.render?row.render(obj as T):""
                          }
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    };
  },
  {
    name: "ViuralTable",
    props: ["list", "rows"],
    emits: ["click"],
    slots: Object as SlotsType<ViuralTableSlotType<any>>,
  }
);
