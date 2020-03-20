<template>
  <div :id="map_name"></div>
</template>

<script>
  import G6 from '@antv/g6'
  import axios from 'axios'
  import { renderMovingEdge, renderMovingNode } from '../../../utils/gragh-data-render'

  let Util = G6.Util
  G6.registerNode('background-animate', {
    afterDraw(cfg, group) {
      let r = cfg.size / 2
      let duration = 3000
      let level = 4

      for (let index = -level; index < 0; index++) {
        group.addShape('circle', { zIndex: index, attrs: { x: 0, y: 0, r, fill: cfg.color, opacity: 0.6 } })
          .animate({ r: r + 20, opacity: 0 },
            { duration, easing: 'easeCubic', repeat: true, delay: duration + index * duration / level })
      }
      group.sort() // 排序，根据 zIndex 排序
    }
  }, 'circle')
  G6.registerEdge('line-dash', {
    afterDraw(cfg, group) {
      const dashArray = [
        [0, 1],
        [0, 2],
        [1, 2],
        [0, 1, 1, 2],
        [0, 2, 1, 2],
        [1, 2, 1, 2],
        [2, 2, 1, 2],
        [3, 2, 1, 2],
        [4, 2, 1, 2]
      ]
      const lineDash = [4, 2, 1, 2]
      const interval = 9 // lineDash 的和

      // 获得该边的第一个图形，这里是边的 path
      const shape = group.get('children')[0]
      // 获得边的 path 的总长度
      const length = shape.getTotalLength()
      let totalArray = []
      // 计算出整条线的 lineDash
      for (let i = 0; i < length; i += interval) {
        totalArray = totalArray.concat(lineDash)
      }

      let index = 0
      // 边 path 图形的动画
      shape.animate(
        // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。
        // 返回值：这一帧需要变化的参数集（Object）。
        (ratio) => {
          const cfg = {
            lineDash: dashArray[index].concat(totalArray)
          }
          // 每次移动 1
          index = (index + 1) % interval
          // 返回需要修改的参数集，这里只修改了 lineDash
          return cfg
        }
        , { repeat: true, duration: 3000 })
    }
  }, 'line')

  export default {
    name: 'MovingMap',
    props: ['map'],
    data() {
      return {
        map_name: `MovingMap(${this.map.name}_${this.map.updated})`,
        graph: null
      }
    },
    mounted() {
      this.graph = new G6.Graph({
        container: this.map_name,
        width: 600,
        height: 600,
        // defaultNode: {
        //   shape: 'background-animate',
        //   color: '#909399',// 默认为未知
        //   size: 30
        // },
        // defaultEdge: {
        //   shape: 'line',
        //   style: {
        //     lineWidth: 2,
        //     stroke: '#F56C6C' // 默认为禁止
        //   }
        // }
      })
      this.render(this.map)
    },
    watch: {
      map: (map) => {
        this.render(map)
      }
    },
    methods: {
      render(map) {
        axios.get('http://localhost:3000/api/nodes/' + map.name).then(res => {
          let node_status = res.data
          map.nodes = map.nodes.map(node => renderMovingNode(node, node_status))
          map.edges = map.edges.map(edge => renderMovingEdge(edge, node_status))
          this.graph.read(map)
        })
      }
    }
  }
</script>

