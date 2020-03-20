let firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

export function renderStaticNode(node) {
  return {
    id: node.id,
    x: node.x,
    y: node.y,
    label: firstUpperCase(node.id) + (node.isExit ? '(Exit)' : ''),

    shape: 'circle',
    size: 40,
    style: {
      fill: '#67C23A'
    },
    labelCfg: {
      position: 'bottom'
    }
  }
}

export function renderStaticEdge(edge) {
  return {
    source: edge.source,
    target: edge.target,
    label: edge.distance ? edge.distance.toString() : '',

    shape: 'line',
    style: {
      lineWidth: 2,
      stroke: '#409EFF'
    },
    labelCfg: {
      autoRotate: true
      // style: {
      //   fill: '#000000'
      // }
    }
  }
}

export function renderMovingNode(node, node_status) {
  let res = renderStaticNode(node)

  res.shape = 'background-animate'

  let find = node_status.find(n => n.id === node.id)
  if (find) {
    switch (find.status) {
      case 0:
        res.color = '#67c23a'
        res.style.fill = '#67C23A'
        break
      case 1:
        res.color = '#E6A23C'
        res.style.fill = '#E6A23C'
        break
      case 2:
        res.color = '#F56C6C'
        res.style.fill = '#F56C6C'
    }
  }

  return res
}

export function renderMovingEdge(edge, node_status) {
  let res = renderStaticEdge(edge)

  let paths = {}

  node_status.forEach(node => node.path.forEach(
    (from, index, array) => {
      if (array[index + 1]) {
        paths[from] = array[index + 1]
      }
    }
  ))

  if (paths[edge.target] && paths[edge.target] === edge.source) {
    return Object.assign(res, {
      shape: 'line-dash',
      source: edge.target,
      target: edge.source,
      style: {
        lineWidth: 2,
        stroke: '#67c23a'
      }
    })
  }
  if (paths[edge.source] && paths[edge.source] === edge.target) {
    return Object.assign(res, {
      shape: 'line-dash',
      style: {
        lineWidth: 2,
        stroke: '#67c23a'
      }
    })
  }

  return Object.assign(res, {
    style: {
      stroke: '#F56C6C'
    }
  })
}
