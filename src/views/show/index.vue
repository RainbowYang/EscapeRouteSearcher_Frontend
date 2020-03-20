<template>
  <div class="show-container">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in this.maps" :key="index" :label="item.name" lazy
      >
        <MovingMap :map="item"></MovingMap>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  import MovingMap from './components/MovingMap'
  import moment from 'moment'

  export default {
    name: 'Show',
    components: {
      MovingMap
    },
    created() {
      axios.get('http://localhost:3000/api/maps/ALL')
        .then(response => {
          let maps_name = []
          this.maps = response.data
            .filter(map => {
              if (maps_name.indexOf(map.name) === -1) {
                maps_name.push(map.name)
                return true
              } else {
                return false
              }
            })
        })
    },
    data() {
      return {
        maps: []
      }
    }
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
