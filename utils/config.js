var fileHost = "https://guaika.oss-cn-beijing.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
var config = {
   //aliyun OSS config
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'FbZ2VPGBE2muugDEFh5w447qBsLFHj',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'LTAI4G6DwZHBTgKiygVYYq63',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config