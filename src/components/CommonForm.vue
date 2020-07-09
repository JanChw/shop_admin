<template>
  <div class="form">
    <el-form
      :model="formModel"
      ref="form"
      :inline="inline"
      label-position="left"
      label-width="80px"
    >
      <el-form-item
        :label="field.label"
        v-for="field in formFields"
        :key="field['prop']"
        :class="ownClasses.includes(field.type) ? field.type : ''"
      >
        <!-- input 组件 -->
        <el-input v-model="formModel[field['prop']]" v-if="field.type ==='input' || !field.type"></el-input>

        <!-- 下拉框组件 -->
        <el-select
          v-model="formModel[field['prop']]"
          v-if="field.type ==='select'"
          style="width:100%"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          ></el-option>
        </el-select>

        <!-- 区间选择组件 -->
        <el-col :span="8" v-if="field.type === 'region'">
          <el-input v-model="formModel[field['props'][0]]"></el-input>
        </el-col>
        <el-col :span="2" class="line" v-if="field.type === 'region'">-</el-col>
        <el-col :span="8" v-if="field.type === 'region'">
          <el-input v-model="formModel[field['props'][1]]"></el-input>
        </el-col>

        <!-- 图片上传组件 -->
        <el-upload
          class="avatar-uploader"
          name="file"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-if="field.type === 'file'"
        >
          <img v-if="formModel[field['prop']]" :src="formModel[field['prop']]" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 文本域组件 -->
        <el-input type="textarea" v-model="formModel[field.prop]" v-if="field.type === 'textarea'"></el-input>

        <!-- 富文本编辑组件 -->
        <vue-editor
          useCustomImageHandler
          :editorOptions="editorSettings"
          @image-added="handleImageAdded"
          v-model="formModel[field.prop]"
          v-if="field.type === 'editor'"
        ></vue-editor>

        <!-- 按钮组件 -->
        <div v-if="field.type === 'btns'">
          <el-button type="primary" @click="handleSubmit">{{field['buttons'][0]['label']}}</el-button>
          <el-button @click="handleCancle">{{field['buttons'][1]['label']}}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import { htmlEditButton } from 'quill-html-edit-button'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/htmlEditButton', htmlEditButton)
export default {
  props: ['formFields', 'formData', 'inline', 'uploadUrl', 'allowedImageTypes'],
  components: {
    VueEditor
  },
  data () {
    return {
      formModel: {
        ...this.formData
      },
      ownClasses: ['region', 'textarea', 'editor'],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
          htmlEditButton: {}
        }
      }
    }
  },
  computed: {
    minetypes () {
      return this.allowedImageTypes.map(type => `image/${type}`)
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      const [field] = this.formFields.filter(field => field.type === 'file')
      this.formModel[field.prop] = res.data.url
    },
    beforeAvatarUpload (file) {
      const isPic = this.minetypes.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPic) {
        this.$message.error('上传头像图片只能是jpg, jpeg, png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPic && isLt2M
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)

      const result = await this.$http.post(this.uploadUrl, formData)
      Editor.insertEmbed(cursorLocation, 'image', result.data.url)
      resetUploader()
    },
    handleSubmit () {
      console.log(this.formModel)
      this.$emit('submit', this.formModel)
    },

    handleCancle () {
      console.log(this.formModel)
      // this.$emit('search', this.formModel)
      this.formModel = {}
    }
  }
}
</script>

<style lang="scss">
.form {
  background-color: $main-color3;
  .el-form {
    padding: 20px 0 0 30px;
    .region {
      .el-form-item__content {
        width: 180px !important;
        .line {
          text-align: center;
        }
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: black;
      width: 156px;
      height: 156px;
      line-height: 156px;
      text-align: center;
      background-color: #ffd1d7;
    }
    .avatar,
    .avatar-uploader {
      width: 156px;
      height: 156px;
      overflow: hidden;
      display: block;
    }
  }
}
</style>
