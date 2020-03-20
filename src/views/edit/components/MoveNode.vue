<template>
    <div>
        <aside>
            拖拽节点更改位置
        </aside>
        <div id="mountNode"></div>
    </div>
    
</template>
<script>
import G6 from '@antv/g6'
export default {
    name: "map",
    created() { //不能在created方法中初始化 
    },
    mounted(){
        this.g6Render()
    },
    methods: {
        g6Render(){
            const data = {
                nodes: [{
                    id: 'node1',
                    x: 100,
                    y: 200
                },{
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
                edgeStyle: {
                    default: {
                        lineWidth: 2,
                        stroke: '#b41400'
                    }
                },
                defaultNode: {
                    shape: 'circleNode' //在下面的registerNode设置
                },
                defaultEdge: {
                    shape: 'line',
                    style: {
                        lineWidth: 2,
                        stroke: '#67c23a'
                    }
                },
                modes: {
                    default: ['drag-node', 'click-select'],         //默认状态：拖动节点：drag-node（本身就有的Behavior）
                }
            })
            //设置节点的各种属性
            G6.registerNode('circleNode', {
                drawShape: function drawShape(cfg, group) {
                var keyShape = group.addShape('circle', {
                        attrs: {
                        x: 0,
                        y: 0,
                        r: 10,
                        fill: '#40a9ff',
                        stroke: '#096dd9'
                        }
                    });
                return keyShape;
                }
            }, 'circle')
            graph.read(data)
            graph.setMode('default')
        }
    }
}
</script>