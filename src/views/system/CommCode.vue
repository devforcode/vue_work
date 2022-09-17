<template>
  <v-container flui>
    <v-row>
      <v-col>
        <v-autocomplete
          :items="cmblist"
          item-text="text"
          item-value="value"
          v-model="selectcmb"
          multiple
          flat
          hide-no-data
          hide-details
          clearable
        >
        </v-autocomplete>
      </v-col>
      <v-col>{{ selectcmb }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-btn @click="gridcheckData">그리드체크값</v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <!-- <v-text-field
            label="검색"
            dense
            outlined
            hide-details
            clearable
            append-icon="mdi-magnify"
            @input="onFilterSearch"
          /> -->
          <grid
            ref="tuigrid"
            :header="gridProps.headers"
            :columns="gridProps.columns"
            :data="gridProps.data"
            :options="gridProps.options"
            :columnOptions="gridProps.columnOptions"
            :bodyHeight="gridProps.bodyHeight"
            :theme="gridProps.theme"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-data-table
          :headers="vheaders"
          :items="vitems"
          :search="vsearch"
          :items-per-page="15"
          :footer-props="{ itemsPerPageText: '페이지 당 갯수' }"
          v-model="vselectRow"
        >
        </v-data-table> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import "tui-grid/dist/tui-grid.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { Grid } from "@toast-ui/vue-grid";

export default {
  name: "CommCode",
  components: {
    grid: Grid,
  },
  data: () => ({
    vheaders: [
      {
        text: "id",
        value: "id",
        width: "20px",
        align: "center",
        sortable: true,
      },
      { text: "제목", value: "title", align: "center", width: "8%" },
    ],
    vitems: [],
    vsearch: "",
    vselectRow: "",
    cmblist: [],
    selectcmb: "",
    tuiSelectRow: [],
    gridProps: {
      bodyHeight: 300,
      options: {
        editingEvent: "click",
        scrollX: true,
        scrollY: true,
        rowHeight: 30,
        rowHeaders: [
          { type: "checkbox" },
          { type: "rowNum", width: 10, align: "center", valign: "middle" },
        ],
      },
      columnOptions: { frozenCount: 2, frozenBorderWidth: 2, resizable: true },
      theme: {
        name: "theme",
        value: {
          selection: {
            background: "#4daaf9",
            border: "#004082",
          },
          scrollbar: {
            background: "#f5f5f5",
            thumb: "#d9d9d9",
            active: "#c1c1c1",
          },
          row: {
            even: {
              background: "#f3ffe3",
            },
            hover: {
              background: "#ccc",
            },
          },
          cell: {
            normal: {
              background: "#fbfbfb",
              border: "#e0e0e0",
              showVerticalBorder: true,
            },
            header: {
              background: "#eee",
              border: "#ccc",
              showVerticalBorder: true,
            },
            rowHeader: {
              border: "#ccc",
              showVerticalBorder: true,
            },
            editable: {
              background: "#fbfbfb",
            },
            selectedHeader: {
              background: "#d8d8d8",
            },
            focused: {
              border: "#418ed4",
            },
            disabled: {
              text: "#b0b0b0",
            },
          },
        },
      },
      data: [],
      headers: {
        height: 160,
        complexColumns: [
          {
            header: "Basic",
            name: "mergeColumn1",
            childNames: ["UPT_USR", "UPT_DT"],
          },
        ],
      },
      columns: [
        {
          header: "아이디",
          name: "id",
          align: "center",
          sortable: true,
          filter: "select",
        },
        {
          header: "제목",
          name: "title",
          align: "center",
          sortable: true,
          filter: "select",
          editor: "text",
        },
        {
          header: "콤보박스",
          name: "cmb",
          align: "center",
          sortable: true,
          filter: "select",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: [
                { text: "Deluxe", value: "1" },
                { text: "EP", value: "2" },
                { text: "Single", value: "3" },
              ],
            },
          },
        },
        {
          header: "등록자",
          name: "UPT_USR",
          align: "center",
          sortable: true,
          filter: "select",
        },
        {
          header: "등록일자",
          name: "UPT_DT",
          align: "center",
          sortable: true,
          filter: "date",
          editor: {
            type: "datePicker",
            options: {
              // set your language
              language: "ko",
              format: "yyyy-MM-dd",
            },
          },
        },
      ],
      header: {
        height: 40,
      },
    },
  }),
  mounted() {
    /*this.$axios({ url: "api/get", method: "get" }).then((res) => {
      console.log(res.data.result);
      if (res.data.result === "OK") {
        this.$refs.tuigrid.invoke("resetData", res.data.data.Value);
      }
    });*/
    // this.$axios({ url: 'api/post', method:'post',params: {procName:'김길동'}, data: [{name:'test'}]}).then(res=>{})
    this.init();
  },

  methods: {
    init() {
      for (let i = 1; i <= 50; i++) {
        this.gridProps.data.push({
          id: i,
          title: "제목" + i,
          cmb: "1",
          UPT_USR: "홍길동" + i,
          UPT_DT: "2022-09-16",
        });
      }
      this.$refs.tuigrid.invoke("resetData", this.gridProps.data);

      this.cmblist.push({ text: "A", value: "A1" }, { text: "B", value: "B1" });
    },

    // gridcheckData() {
    //   this.vitems = [];
    //   this.tuiSelectRow = this.$refs.tuigrid.invoke("getCheckedRows");

    //   this.vitems = this.tuiSelectRow;
    // },

    // onFilterSearch(filterSearch) {
    //   this.gridFilterSearch(
    //     this.$refs.tuigrid,
    //     this.gridProps.data,
    //     filterSearch
    //   );
    // },

    // gridFilterSearch(grid, data, filterSearch) {
    //   if (filterSearch === null || filterSearch === "") {
    //     grid.invoke("resetData", data);
    //   } else {
    //     let list = data.filter((x) => {
    //       let filterYn = false;

    //       Object.keys(x).forEach((keys) => {
    //         if (x[keys] !== null && x[keys] !== "") {
    //           if (
    //             x[keys]
    //               .toString()
    //               .toUpperCase()
    //               .includes(filterSearch.toUpperCase())
    //           ) {
    //             filterYn = true;
    //           }
    //         }
    //       });
    //       return filterYn;
    //     });

    //     grid.invoke("resetData", list);
    //   }
    // },
  },
};
</script>
<style>
.tui-grid-container {
  z-index: 1;
}
</style>
