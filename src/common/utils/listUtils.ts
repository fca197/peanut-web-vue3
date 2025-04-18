interface List {
  id: string
  parentId: string
}

export function list2tree(list: any [], parentId: string | undefined) {

  const mapTmp = {}
  const roots: List[] = []

  // 首先将所有节点存储到 map 中
  list.forEach((item) => {
    mapTmp[item.id] = {...item, children: []}
  })
  // 遍历列表，建立父子关系
  list.forEach((item) => {
    if (item.parentId === parentId) {
      // 如果 parentId 为 null，则为根节点
      roots.push(mapTmp[item.id])
    } else {
      // 否则，将其添加到父节点的 children 数组中
      if (mapTmp[item.parentId]) {
        mapTmp[item.parentId].children.push(mapTmp[item.id])
      }
    }
  })

  return roots
}
