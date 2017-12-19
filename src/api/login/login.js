import fetch from '@/util/fetch'
//分页查询
export function getCatalog(page, dataList) {
  let data = "authToken=e04b3e350000000a&systemId=9a7acdeb00001a7f"
  return fetch({
    url: 'userPermiss/permissionList.json',
    method: 'post',
    data
  });
}
