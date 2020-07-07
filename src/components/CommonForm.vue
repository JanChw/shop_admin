<template>
  <div class="form">
    <el-form :model="formModel" ref="form" :inline="inline">
        <el-form-item :label="field.label" v-for="field in formFields" :key="field['prop']" :class="field.type === 'region' ? 'region' : ''">
          <el-input v-model="formModel[field['prop']]" v-if="field.type ==='input' || !field.type"></el-input>
          <el-select v-model="formModel[field['prop']]" v-if="field.type ==='select'">
            <el-option v-for="option in field.options" :key="option.value" :value="option.value" :label="option.label"></el-option>
          </el-select>
          <el-col :span="8" v-if="field.type === 'region'">
            <el-input v-model="formModel[field['props'][0]]"></el-input>
          </el-col>
          <el-col :span="2" class="line" v-if="field.type === 'region'"> - </el-col>
          <el-col :span="8" v-if="field.type === 'region'">
            <el-input v-model="formModel[field['props'][1]]"></el-input>
          </el-col >
          <div v-if="field.type === 'btns'">
            <el-button type="primary" @click="handleSearch">{{field['buttons'][0]['label']}}</el-button>
            <el-button>{{field['buttons'][1]['label']}}</el-button>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  props: [
    'formFields',
    'formData',
    'inline'
  ],
  data () {
    return {
      formModel: {
        ...this.formData
      }
    }
  },
  methods: {
    handleSearch () {
      console.log(this.formModel)
      this.$emit('search', this.formModel)
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
            width: 180px!important;
            .line {
              text-align: center;
            }
          }
        }
      }
  }
</style>
