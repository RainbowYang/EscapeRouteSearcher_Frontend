<template>
  <div>
    <aside>
      点击两个节点连线
    </aside>
    <div id="mountNode"></div>
  </div>

</template>
<script>
  import G6 from '@antv/g6'

  export default {
    name: 'map',
    created() { //不能在created方法中初始化
    },
    mounted() {
      this.g6Render()
    },
    methods: {
      g6Render() {
        const data = {
          nodes: [{
            id: 'node1',
            x: 100,
            y: 200
          }, {
            id: 'node2',
            x: 300,
            y: 200
          }],
          edges: [{
            target: 'node2',
            source: 'node1'
          }]
        }
        const graph = new G6.Graph({
          container: 'mountNode',
          width: 500,
          height: 500,
          nodeStyle: {
            default: {
              fill: '#40a9ff',
              stroke: '#096dd9'
            }
          },
          edgeStyle: {
            default: {
              lineWidth: 2,
              stroke: '#b41400'
            }
          },
          defaultEdge: {
            shape: 'line',
            style: {
              lineWidth: 2,
              stroke: '#67c23a'
            }
          }
        })
        graph.read(data)
      }
    }
  }
</script>
