<template>
  <div class="cs-sidebar-right uk-visible@m">
            <div class="chat-box">
                <div class="chat-header">
                    Live Chat
                </div>
                <div class="chats" id="chats-s">
                    <!-- <div class="chat-messages" id="chat-scroll">
                        <div style="padding: 10px;">
                            <div class="chat" v-for="message in messages" :key="message.key">
                                <div class="chat-avatar">
                                    <img src="https://avatar.tobi.sh/281.svg?text=MK" />
                                </div>
                                <div class="chat-message">
                                    {{ message.message }}
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div style="text-align: center;font-size: 13px;padding-top: 20px;">
                                              This feature is still in development.<br/>
                                              Do you want this feature?<br/><br/>
                                              <button class="uk-button">Yes</button>
                                              <button class="uk-button">No</button>
                                            </div>
                </div>
                <div class="chat-input">
                    <div class="input-box">
                        <textarea disabled v-model="inputText" @keyup.enter="submit"  placeholder="Type a message then press 'Enter' to submit" class=""></textarea>
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
  },
  mounted () {
    this.simpleBar = new window.SimpleBar(document.getElementById('chats-s'))
  },
  methods: {
    submit () {
      this.messages.push({
        key: this.keys++,
        message: this.inputText
      })
      this.keys++
      const chatDiv = document.getElementsByClassName('simplebar-scroll-content')[1]
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
