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
      :data="list?list.filter(node=>node.map_name===value):[]"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Node" width="95">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.id }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Path">
        <template slot-scope="scope">
          <el-tag v-for="node_id in scope.row.path"
                  :type="list.filter(node=>node.map_name===value&&node.id===node_id)[0].status | statusFilter"
          >{{ node_id }}
          </el-tag>
          <!--          {{ scope.row.path.join(' ') }}-->
        </template>
      </el-table-column>
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
      <el-table-column class-name="status-col" label="Status" width="170" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Update time" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"/> <span>{{moment_format(scope.row.updated)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // import { getList } from '@/api/table'
  import axios from 'axios'
  import { moment_format } from '../../utils/moment-format'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'warning',
          2: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        options: null,
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
          this.options = response.data
        })
        axios.get('http://localhost:3000/api/nodes').then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>
