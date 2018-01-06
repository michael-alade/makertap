<template>
  <div class="cs-sidebar-right uk-visible@m">
            <div class="chat-box">
                <div class="chat-header">
                    Live Chat
                </div>
                <div class="chats" id="chats-s">
                    <div class="chat-messages" id="chat-scroll">
                        <div style="padding: 10px;">
                            <div class="chat" v-for="message in messages" :key="message.key">
                                <div class="chat-avatar">
                                    <img src="https://avatar.tobi.sh/281.svg?text=MK" />
                                </div>
                                <div class="chat-message">
                                    {{ message.message }}
                                    <!-- Hello, Some text and me and this and check what I have to say about you and me -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <div class="input-box">
                        <textarea v-model="inputText" @keyup.enter="submit"  placeholder="Type a message then press 'Enter' to submit" class=""></textarea>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      inputText: '',
      keys: 6,
      simpleBar: ''
    }
  },
  created () {
    // console.log()
  },
  mounted () {
    this.simpleBar = new window.SimpleBar(document.getElementById('chats-s'))
    console.log(this.simpleBar.el.SimpleBar.getScrollElement(), 'simpleBar')
    // const simplebar = new window.SimpleBar(document.getElementById('chat-scroll'), { autoHide: true })
    // console.log(simplebar, 'simplebar')
  },
  methods: {
    submit () {
      this.messages.push({
        key: this.keys++,
        message: this.inputText
      })
      this.keys++
      const chatDiv = document.getElementsByClassName('simplebar-scroll-content')[1]
      console.log(chatDiv.scrollTop, 'chatDiv.scrollTop')
      console.log(chatDiv.scrollHeight, 'chatDiv.scrollHeight')
      chatDiv.scrollTop = chatDiv.scrollHeight
    //   this.simpleBar.el.SimpleBar.getScrollElement().scrollIntoView()
    //   this.simpleBar.el.SimpleBar.getScrollElement().scrollTop = 582// this.simpleBar.el.SimpleBar.getScrollElement().scrollHeight
      this.inputText = ''
    }
  }
}
</script>

<style>

</style>
