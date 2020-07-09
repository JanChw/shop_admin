<template>
  <div class="hello">
    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },

  data () {
    return {
      content: ''
    }
  },

  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      console.log('=======upload==========')
      var formData = new FormData()
      formData.append('file', file)

      this.$http.post('/api/upload', formData)
        .then(result => {
          const url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
