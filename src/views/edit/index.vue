<template>
  <div class="app-container">
    <el-select v-model="value" placeholder="请选择">
      <!--      <el-option-->
      <!--        :key="'all'"-->
      <!--        :label="'all'"-->
      <!--        :value="''">-->
      <!--      </el-option>-->
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>

<!--    <el-button type="success" @click="saveMap()" round>Save</el-button>-->

    <EditMap v-if="maps[value]" :map="maps[value]" ></EditMap>
    <!--    <JsonEditor></JsonEditor>-->
  </div>
</template>

<script>
  import G6 from '@antv/g6'
  import EditMap from './components/EditMap'
  import axios from 'axios'

  import JsonEditor from '@/components/JsonEditor'

  export default {
    name: 'Edit',
    components: {
      EditMap, JsonEditor
    },
    created() {
      axios.get('http://localhost:3000/api/maps').then(response => {
        this.options = [...new Set(response.data)]
      })
      axios.get('http://localhost:3000/api/maps/ALL').then(response => {
        response.data.forEach(map => {
          this.$set(this.maps, map.name, map)
        })
      })
    },
    data() {
      return {
        maps: {},
        options: [],
        value: ''
      }
    },
    methods: {
      saveMap() {

      }
    }
  }
</script>

<style scoped>

</style>
