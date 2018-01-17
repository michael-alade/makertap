<template>
    <div>
        <div v-if="!answered" style="text-align: center;font-size: 13px;padding-top: 20px;">
            This feature is still in development.<br/>
            Do you want this feature?<br/><br/>
            <button @click="answer('yes')" class="uk-button">Yes</button>
            <button @click="answer('no')" class="uk-button">No</button>
        </div>
        <div v-if="answered" style="text-align: center;font-size: 13px;padding-top: 20px;">
            Thanks for your feedback.
        </div>
    </div>
</template>

<script>
export default {
  props: ['feature'],
  data () {
    return {
      answered: false
    }
  },
  mounted () {
    const answerStore = JSON.parse(window.localStorage.getItem('answerStore'))
    if (answerStore && answerStore[this.feature]) {
      this.answered = true
    }
  },
  methods: {
    answer (val) {
      let obj = {}
      const answerStore = JSON.parse(window.localStorage.getItem('answerStore')) || {}
      obj = Object.assign({}, answerStore, {
        [this.feature]: val
      })
      window.localStorage.setItem('answerStore', JSON.stringify(obj))
      this.answered = true
    //   return this.$store.dispatch('')
    }
  }
}
</script>

<style>

</style>
