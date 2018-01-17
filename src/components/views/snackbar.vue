<template>
    <div id="snackbar">
        <div class="picture">
          <img style="height: 65px;border-radius: 50px;" :src="snackbar.picture"/>
        </div>
        <div class="details">
          <div class="name"><span>{{ snackbar.name }}</span></div>
          <div class="action"><span>{{ snackbar.action === 'joined' ? 'Just signed up on Makertap': 'Just started a livestream' }}</span></div>
          <div class="time"><span>{{ timeNow(snackbar.time) }}</span></div>
        </div>
        <div class="celebration">
          <img src="/static/images/party-celebration.png"/>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'

const socket = io(process.env.API_URL)

export default {
  data () {
    return {
      snackbar: {
        action: '',
        time: '',
        name: '',
        picture: ''
      },
      count: 1,
      queued: []
    }
  },
  mounted () {
    const self = this
    socket.on('connect', () => {
    })
    socket.on('snackbar', (payload) => {
      self.queued.push(payload)
    })
    var x = document.getElementById('snackbar')

    // // Add the "show" class to DIV
    // x.className = 'show'
    // this.snackbar = this.snacks[this.done]
    // this.done++

    // After 3 seconds, remove the show class from DIV
    setInterval(function () {
      if (x.className === 'show') {
        x.className = ''
        self.snackbar = {
          action: '',
          time: '',
          name: '',
          picture: ''
        }
        return ''
      }
      if (self.queued.length) {
        if (self.count > self.queued.length) {
          self.count = 1
        }
        self.snackbar = self.queued[self.count - 1]
        self.queued.splice(self.count - 1, 1)
        x.className = 'show'
        self.count++
        // if (self.queued.length <= 0) {
        //   self.count = 1
        // }
      }
    }, 3000)
  },
  methods: {
    timeNow (time) {
      return moment(time).fromNow()
    }
  }
}
</script>

<style>

</style>
