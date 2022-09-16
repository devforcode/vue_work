<template>
  <div>
    <v-card>
      <grid
        ref="tuigrid"
        :columns="gridProps.columns"
        :data="gridProps.data"
        :rowHeaders="gridProps.options.rowHeaders"
      />
    </v-card>
  </div>
</template>
<script>
import "tui-grid/dist/tui-grid.css";
import { Grid } from "@toast-ui/vue-grid";

export default {
  name: "CommCode",
  components: {
    grid: Grid,
  },
  data: () => ({
    gridProps: {
      options: {
        scrollX: true,
        scrollY: true,
        rowHeight: 30,
        rowHeaders: ["checkbox", "rowNum"],
      },
      data: [],
      columns: [
        {
          header: "구분",
          name: "id",
          align: "center",
          sortable: true,
          filter: "select",
        },
        {
          header: "작업표준명",
          name: "title",
          align: "center",
          sortable: true,
          filter: "select",
        },
      ],
      header: {
        height: 40,
      },
    },
  }),
  mounted() {
    this.$axios({ url: "api/get", method: "get" }).then((res) => {
      console.log(res.data.result);
      if (res.data.result === "OK") {
        this.$refs.tuigrid.invoke("resetData", res.data.data.Value);
      }
    });

    // this.$axios({ url: 'api/post', method:'post',params: {procName:'김길동'}, data: [{name:'test'}]}).then(res=>{})
  },
};
</script>
