<template>
    <div id="snackbar">
        <div class="picture">
          <img style="height: 65px;border-radius: 50px;" src="https://pbs.twimg.com/profile_images/946823287186665472/iNHVNpi4.jpg"/>
        </div>
        <div class="details">
          <div class="name"><span>{{ snackbar.name }}</span></div>
          <div class="action"><span>{{ snackbar.action === 'joined' ? 'Just signed up on Makertap': 'Just started a livestream' }}</span></div>
          <div class="time"><span>{{ snackbar.time }}</span></div>
        </div>
        <div class="celebration">
          <img src="/static/images/party-celebration.png"/>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      snackbar: {
        action: '',
        time: '',
        name: ''
      },
      count: 1,
      done: [],
      queued: [{
        name: 'Pieter',
        action: 'joined',
        time: '8 minutes ago'
      },
      {
        name: 'Kolawole',
        action: 'live',
        time: '2 minutes ago'
      },
      {
        name: 'Michael',
        action: 'joined',
        time: '1 hour ago'
      }]
    }
  },
  mounted () {
    const self = this
    var x = document.getElementById('snackbar')

    // // Add the "show" class to DIV
    // x.className = 'show'
    // this.snackbar = this.snacks[this.done]
    // this.done++

    // After 3 seconds, remove the show class from DIV
    setInterval(function () {
      if (x.className === 'show') {
        x.className = ''
      } else {
        if (self.count > self.queued.length) {
          self.count = 1
        }
        self.snackbar = self.queued[self.count - 1]
        x.className = 'show'
        self.count++
        // setTimeout(() => {
        //   x.className = ''
        // }, 2000)
      }
      // if (self.done >= 0) {
      //   console.log(self.done, 'self')
      //   if (x.className === 'show') {
      //     x.className = ''
      //   } else {
      //     x.className = 'show'
      //   }
      //   self.snackbar = self.snacks[self.done]
      //   if (self.done < self.snacks.length) {
      //     setTimeout(() => {
      //       self.done++
      //     }, 1000)
      //   } else {
      //     self.done = 0
      //   }
      // }
    }, 3000)
  }
}
</script>

<style>

</style>
