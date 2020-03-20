<template>
    <div>
        <aside>
            点击任意空白位置增加节点
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
                    addNode: ['click-add-node', 'click-select']         //默认状态：拖动节点：drag-node（本身就有的Behavior）
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
                    })
                return keyShape;
                }
            }, 'circle')

            // 点击画布内增加节点
            G6.registerBehavior('click-add-node', {
                getEvents() {
                    return {
                    'canvas:click': 'onClick'       //点击画布执行onClick
                    }
                },
                onClick(ev) {                       //这里和下面的ev是Event类型，包含事件句柄、当前操作对象及各坐标值等
                    const graph = this.graph;
                    const node = graph.addItem('node', {
                        x: ev.x,    //元素视口 x 坐标
                        y: ev.y,    //元素视口 y 坐标
                        id: G6.Util.uniqueId()
                        })
                    }
            })

            graph.data(data);
            graph.render();
            }
        // watch:{
        //     checked:function(){
        //         let _saveData = this.canvas.save();
        //         this.canvas.read(_saveData);
        //         this.canvas.render();
        //     }
        // }
        
    }
}
</script>