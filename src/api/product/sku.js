import request from '@/utils/request'

//获取图片数据
export const reqSpuImageList = (spuId) => {
  return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}

//销售属性
export const reqSpuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

//平台属性
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

///admin/product/saveSkuInfo 保存
export const reqAddsku = (skuInfo) => {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
}

//获取sku列表数据的接口
///admin/product/findBySpuId/{spuId}
export const reqFindBySpu = (spuId) => {
  return request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
}

//获取sku管理列表接口
export const reqSkuList = (page, limit) => {
  return request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })
}

// 上架
export const reqOnSale = (skuId) => {
  return request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
}

//下架
export const reqCancelSale = (skuId) => {
  return request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })
}

///admin/product/getSkuById/{skuId}

export const reqSkuById = (skuId) => {
  return request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
}
