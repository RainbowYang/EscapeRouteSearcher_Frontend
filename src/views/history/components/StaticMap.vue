<template>
  <div :id="map_name"></div>
</template>
<script>
  import G6 from '@antv/g6'
  import { renderStaticEdge, renderStaticNode } from '../../../utils/gragh-data-render'

  export default {
    name: 'StaticMap',
    props: ['map'],
    data() {
      return {
        map_name: `StaticMap(${this.map.name}_${this.map.updated})`,
        graph: null
      }
    },
    mounted() {
      this.graph = new G6.Graph({ container: this.map_name, width: 600, height: 600 })
      this.render(this.map)
    },
    watch: {
      map: (map) => {
        this.render(map)
      }
    },
    methods: {
      render(map) {
        map.nodes = map.nodes.map(renderStaticNode)
        map.edges = map.edges.map(renderStaticEdge)
        this.graph.read(map)
      }
    }
  }
</script>
