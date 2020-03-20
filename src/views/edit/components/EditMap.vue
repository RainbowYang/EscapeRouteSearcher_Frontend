<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option key="1" label="移动节点位置" value="default"></el-option>
      <el-option key="2" label="添加节点" value="addNode"></el-option>
      <el-option key="3" label="添加边" value="addEdge"></el-option>
    </el-select>
    <div :id="map_name"></div>
  </div>
</template>

<script>
  import G6 from '@antv/g6'
  import { renderStaticEdge, renderStaticNode } from '../../../utils/gragh-data-render'

  let this_graph
  // 点击画布内增加节点
  G6.registerBehavior('click-add-node', {
    getEvents() {
      return {
        'canvas:click': 'onClick'       //点击画布执行onClick
      }
    },
    onClick(ev) {                       //这里和下面的ev是Event类型，包含事件句柄、当前操作对象及各坐标值等
      const graph = this_graph
      const node = graph.addItem('node', renderStaticNode({
        x: ev.x,    //元素视口 x 坐标
        y: ev.y,    //元素视口 y 坐标
        id: ev.x + ',' + ev.y
      }))
    }
  })
  // 连接选中的两个节点
  G6.registerBehavior('click-add-edge', {
    getEvents() {
      return {
        'node:click': 'onClick',    //单击选中节点
        mousemove: 'onMousemove',   //鼠标移动，还没有连好的边也一起移动
        'edge:click': 'onEdgeClick' // 点击空白处，取消边
      }
    },
    onClick(ev) {
      const node = ev.item
      const graph = this_graph
      const point = {
        x: ev.x,
        y: ev.y
      }
      const model = node.getModel()
      if (this.addingEdge && this.edge) {
        graph.updateItem(this.edge, {
          target: model.id
        })
        // graph.setItemState(this.edge, 'selected', true);
        this.edge = null
        this.addingEdge = false
      } else {
        this.edge = graph.addItem('edge', renderStaticEdge({
          source: model.id,
          target: point
        }))
        this.addingEdge = true
      }
    },
    onMousemove(ev) {
      const point = {
        x: ev.x,
        y: ev.y
      }
      if (this.addingEdge && this.edge) {
        this.graph.updateItem(this.edge, {
          target: point
        })
      }
    },
    onEdgeClick(ev) {
      const currentEdge = ev.item
      // 拖拽过程中，点击会点击到新增的边上
      if (this.addingEdge && this.edge === currentEdge) {
        graph.removeItem(this.edge)
        this.edge = null
        this.addingEdge = false
      }
    }
  })

  export default {
    name: 'EditMap',
    props: ['map'],
    data() {
      return {
        value: 'default',
        map_name: `EditMap(${this.map.name}_${this.map.updated})`,
        graph: null,
        map_data: null
      }
    },
    mounted() {
      this.graph = this_graph = new G6.Graph({
        container: this.map_name, width: 600, height: 600,
        modes: {
          default: ['drag-node', 'click-select'],         //默认状态：拖动节点：drag-node（本身就有的Behavior）
          addNode: ['click-add-node', 'click-select'],    //创建节点
          addEdge: ['click-add-edge', 'click-select']     //连接边
        }
      })
      this.render(this.map)
    },
    watch: {
      map: (map) => {
        console.log(this)
        this.render(map)
      },
      value: (val) => {
        console.log(val)

        this_graph.setMode(val)
      }
    },
    methods: {
      render(map) {
        map.nodes = map.nodes.map(renderStaticNode)
        map.edges = map.edges.map(renderStaticEdge)
        this.graph.read(map)
        this.map_data = map
      }
    }
  }
</script>

<style scoped>

</style>
