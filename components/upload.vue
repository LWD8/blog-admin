<template>
  <Row>
		<Col span="24">
			<Upload
				:ref="refProperty"
				:show-upload-list="showUploadList"
				:default-file-list="uploadFiles"
				:format="uploadFormat"
				:max-size="maxSize"
				:on-exceeded-size="handleMaxSize"
				:before-upload="handleBeforeUpload"
				:on-success="handleSuccess"
				:on-format-error="handleFormatError"
				:multiple="multiple"
				:type="uploadType"
				:headers="up.Header"
				:action="up.Action"
				:data="up.Data"
				>
				<slot></slot>
			</Upload>
		</Col>
	</Row>
</template>

<script>
	export default {
		props: {
      location: {
        type: String,
        default: ''
      },
      qiniuTonken: {
        type: String,
        default: ''
      },
			refProperty: {
				type: String,
				default: 'upload'
			},
			multiple: {
				type: Boolean,
				default: false
			},
			uploadType: {
				type: String,
				default: 'select'
			},
			showUploadList: {
				type: Boolean,
				default: false
			},
			defaultList: {
				type: Array,
				default: () => {
					return []
				}
			},
			uploadFormat: {
				type: Array,
				default: () => {
					return []
				}
			},
			maxSize: {
				type: Number,
				default: 2048
			}
    },
    watch: {
      qiniuTonken(newVal) {
        this.up.Header.Authorization = newVal
        this.up.Header.uploadToken = newVal
        this.up.Data.token = newVal
      }
		},
		created () {
			if (this.qiniuTonken) {
				this.up.Header.Authorization = this.qiniuTonken
        this.up.Header.uploadToken = this.qiniuTonken
				this.up.Data.token = this.qiniuTonken
				this.uploadFiles = this.defaultList
			}
		},
		data() {
			return {
				uploadFiles: [],
				up: {
          Action: '//up-z2.qiniup.com',
          Header: {
            Authorization: '',
            uploadToken: ''
          },
          Data: {
						token: '',
						key: ''
          }
        }
			}
		},
		methods: {
			clearFiles() {
				console.log(this.uploadFiles, 'uploadFiles')
			},
			handleMaxSize(file) {
				if (file.type === 'video/mp4') {
					this.$emit('videoErrorType')
				} else {
					this.$emit('imageErrorType')
				}
				this.$Notice.warning({
						title: '文件大小超过限制',
						desc: `文件：${file.name} 太大了，不能超过 ${this.maxSize > 1024 ? this.maxSize/1024 :this.maxSize}${this.maxSize > 1024 ? 'M' : 'K'}`
				});
			},
			handleFormatError (file) {
				if (file.type === 'video/mp4') {
					this.$emit('videoErrorType')
				} else {
					this.$emit('imageErrorType')
				}
				this.$Notice.warning({
						title: '文件格式不正确',
						desc: `文件：${file.name} 文件格式不正确，请重新上传.`
				});
			},
			handleBeforeUpload (file) {
				if (file.type === 'video/mp4') {
					this.$emit('videoType')
				} else {
					this.$emit('imageType')
				}
				this.up.Data.key = Math.random().toString(36).substr(2, 15) + parseInt(new Date().getTime())
			},
			handleSuccess (res, file) {
				file.url = `${this.location}/${res.key}`
				// 监听上传完成
				this.$emit('changKey')
				// 只返回Key
        this.$emit('uploadKey', res.key)
				// 完成地址
				this.$emit('uploadSuccess', file.url)

				this.$emit('uploadfile',file)
			}
		}
	}
</script>

