// 上传file转Base64
export const blobToDataUri = (file) => {
  return new Promise(function (resolve) {
      var reader = new FileReader();

      reader.onloadend = function () {
          resolve(reader.result);
      };

      reader.readAsDataURL(file);
  });
}

// 七牛Base64上传图片
export const putb64 = (src, qiniuToken) => {
  return new Promise((resolve, reject) => {
    var pic = src;
    var url = "//up-z2.qiniup.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        resolve(xhr.responseText)
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", `UpToken ${qiniuToken}`);
    xhr.send(pic);
  })
}