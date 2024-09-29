import { defineComponent } from "vue";

export default defineComponent(
  (props: { show: boolean; count?: number }) => {
    return () => (
      <>
        {props.show ? (
          <div class="flex flex-col w-full">
            <div class="skeleton h-32 w-full mb-4"></div>
            <div class="skeleton h-4 w-full mb-4"></div>
            <div class="skeleton h-4 w-full mb-4"></div>
            {Array(props.count?props.count:5).fill(0).map(_i=>{
                return <div class="skeleton h-4 w-3/4 mb-4"></div>
            })}
          </div>
        ) : (
          ""
        )}
      </>
    );
  },
  {
    name: "LoadingSke",
    props: ["show", "count"],
  }
);
