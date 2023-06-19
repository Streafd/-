import request from '@/utils/request'

//这个模块主要获取的是品牌管理的数据的模块

//获取品牌列表接口
export const reqTradeMarkList = (page, limit) => {
  return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
}

//添加品牌接口,不需要传递id，id由服务器生成，只需携带两个参数:品牌名称、品牌logo
///admin/product/baseTrademark/save

//修改品牌信息,需要携带参数id，品牌名称，品牌logo
///admin/product/baseTrademark/update

//添加品牌,修改品牌的整合接口
export const reqAddUpdateTradeMark = (tradeMark) => {
  //判断tradeMark是否存在id
  if (tradeMark.id) {
    //修改品牌
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: tradeMark
    })
  } else {
    //新增品牌
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: tradeMark
    })
  }
}

//删除品牌信息
export const reqRemoveTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
