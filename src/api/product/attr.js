import request from '@/utils/request'

//三级联动API

//获取一级分类数据接口
export const reqGetCategory1List = () => {
  return request({ url: '/admin/product/getCategory1', method: 'get' })
}

//二级
export const reqGetCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

//三级
export const reqGetCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

//获取平台属性接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

//添加属性和属性接口
///admin/product/saveAttrInfo
export const reqAddAttrInfo = (data) => {
  return request({ url: '', method: 'post', data })
}

//保存属性
///admin/product/saveAttrInfo
export const reqSaveAttrInfo = (data) => {
  return request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
}
