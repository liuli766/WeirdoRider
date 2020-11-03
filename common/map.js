export default{
	map(lat,log,name){
		let that = this
		let latitude, longitude //纬经度
		var name = name
		latitude = Number(lat)
		longitude = Number(log)
		wx.getSetting({
		  success: (res) => {
		    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
		      wx.showModal({
		        title: '是否授权当前位置',
		        content: '需要获取您的地理位置，请确认授权，否则地图定位功能将无法使用',
		        success: function (res) {
		          if (res.cancel) {
		            console.info("1授权失败返回数据");
					 
		          } else if (res.confirm) {
		            //village_LBS(that);
		            wx.openSetting({
		              success: function (data) {
		                if (data.authSetting["scope.userLocation"] == true) {
		                  wx.showToast({
		                    title: '授权成功',
		                    icon: 'success',
		                    duration: 5000
		                  })
		                  wx.openLocation({
		                    latitude: latitude,
		                    longitude: longitude,
		                    name: name,
		                    scale: 28
		                  })  
		                } else {
		                  wx.showToast({
		                    title: '授权失败',
		                    icon: 'success',
		                    duration: 5000
		                  })
		                }
		              }
		            })
		          }
		        }
		      })
		    } else {
		      wx.openLocation({
		        latitude: latitude,
		        longitude: longitude,
		        name: name,
		        scale: 28
		      })  
		    }
		  }
		})
	}
}