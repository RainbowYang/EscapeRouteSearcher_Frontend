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

    <el-table
      v-loading="listLoading"
      :data="list.filter(map=>map.name===value)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" prop="created_at" label="Update time" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"/> <span>{{moment_format(scope.row.updated)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Map">
        <template slot-scope="scope">
          <StaticMap :map="scope.row"></StaticMap>
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" label="ID" width="95">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.id }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="Path">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.path }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="Author" width="110" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ scope.row.author }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="Pageviews" width="110" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.pageviews }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column class-name="status-col" label="Status" width="170" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import StaticMap from './components/StaticMap'
  import { moment_format } from '../../utils/moment-format'

  export default {
    components: {
      StaticMap
    },
    data() {
      return {
        list: [],
        listLoading: true,
        options: [],
        value: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      moment_format,
      fetchData() {
        this.listLoading = true
        axios.get('http://localhost:3000/api/maps').then(response => {
          this.options = [...new Set(response.data)]
        })
        axios.get('http://localhost:3000/api/maps/ALL').then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .show-container {
    padding: 100px;
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
