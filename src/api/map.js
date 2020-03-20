import request from '@/utils/request'

export function getMap(map_name) {
  request({
    url: 'http://localhost:3000/api/maps/' + map_name,
    method: 'options'
  }).then(res => {
  })
  return request({
    url: 'http://localhost:3000/api/maps/' + map_name,
    method: 'get'
  })
}

