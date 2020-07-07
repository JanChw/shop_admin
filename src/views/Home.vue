<template>
  <div>
    <HelloWorld :msg="message" @handleEmit="emitFun"/>
    <p>{{childSignal}}</p>
    <p><input type="text" v-model="message"></p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      message: 'hello world',
      childSignal: 'hi'
    }
  },
  methods: {
    emitFun (payload) {
      this.childSignal = payload
    }
  }
}
</script>
