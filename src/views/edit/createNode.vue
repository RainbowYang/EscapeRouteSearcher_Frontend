<template>
  <div class="show-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <Map />
    </el-row>
  </div>
</template>

<script>

import Map from './components/CreateNode'

const mapData = {
  node: {},
  edge: {},
  door: {}
}

export default {
  name: 'DashboardAdmin',
  components: {
    Map
  },
  data() {
    return {
      mapData: mapData
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .show-container {
    padding: 10px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
