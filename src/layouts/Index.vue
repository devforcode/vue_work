<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app>
      <v-list v-for="(item, index) in items" :key="index" dense expand nav>
        <v-list-group
          v-if="item.items"
          no-action
          active-class="primary white--text"
        >
          <template #activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list v-for="(sub, i) in item.items" :key="i">
            <v-list-group
              v-if="sub.items"
              no-action
              active-class="teal white--text"
            >
              <template #activator>
                <v-list-item-title>{{ sub.title }}</v-list-item-title>
              </template>
              <v-list v-for="(child, ii) in sub.items" :key="ii">
                <v-list-item
                  link
                  :to="child.to"
                  active-class="indigo white--text"
                >
                  <v-list-item-title v-text="child.title" />
                </v-list-item>
              </v-list>
            </v-list-group>
            <v-list-item
              v-else
              link
              :to="sub.to"
              active-class="success white--text"
            >
              <v-list-item-title v-text="sub.title" />
            </v-list-item>
          </v-list>
        </v-list-group>
        <v-list-item v-else :to="item.to">
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DefaultIndex",
  data: () => ({
    items: [
      { title: "Dashboard", to: "/" },
      {
        title: "기준정보 관리",
        active: 0,
        items: [
          { title: "기준정보", to: "/system/standardInfo" },
          { title: "사용자 권한관리", to: "/system/usersAuth" },
          { title: " 공통코드 관리", to: "/system/commCode" },
        ],
      },
      {
        title: "품질 Dash 보드/분석",
        active: 0,
        items: [
          {
            title: "품질 KPI 일일 현황조회",
            active: 0,
            items: [
              {
                title: "일일 통합 품질현황 모니터링",
                to: "/quality/dashboard/kpi/QualityMonitoring",
              },
              {
                title: "총합공정불량 Trend 조회",
                to: "/quality/dashboard/kpi/TrendList",
              },
              {
                title: "특정 공정불량 항목 선택",
                to: "/quality/dashboard/kpi/ProcessError",
              },
              {
                title: "기타 지표 조회",
                to: "/quality/dashboard/kpi/Indicators",
              },
            ],
          },
        ],
      },
    ],
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.getDrawer;
      },
      set(value) {
        return this.$store.commit("setDrawer", value);
      },
    },
  },
};
</script>
