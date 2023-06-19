import request from '@/utils/request'

//获取spu列表数据
export const reqSupList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
    method: 'get'
  })
}

//品牌的数据需要发请求 /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => {
  return request.get('/admin/product/baseTrademark/getTrademarkList')
}

//获取平台中全部的销售属性 /admin/product/baseSaleAttrList
export const reqSaleAttrList = () => {
  return request({ url: '/admin/product/baseSaleAttrList', method: 'get' })
}

//获取某一个SPU的信息 /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => {
  return request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
}

//获取SKU图片 /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => {
  return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}

//添加|修改spu接口
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo
    })
  }
}

//删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => {
  return request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
}
