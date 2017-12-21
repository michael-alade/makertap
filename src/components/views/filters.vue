<template>
    <section class="filters">
                <div class="uk-container">
                    <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-1-1@m">
                            <div class="uk-inline input-container">
                                <span class="uk-form-icon" uk-icon="icon: search"></span>
                                <input type="text" v-model="keyword" class="uk-input filter search" placeholder="Find inspiring product live streams">
                            </div>
                        </div>
                        <div class="uk-width-1-1@m">
                            <div class="filter-group">
                                <span class="filter-label">
                                    Interests {{ keyword }}
                                </span>
                                <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Data Science
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category active">
                                            Fintech
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Artificial intelligence
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Ecommerce
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Fashion
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Hardware
                                        </div>
                                    </div>
                                    <div class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category">
                                            Software
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-1@m filters-selected">
                            <!-- <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid> -->
                                <!-- <div class="uk-width-1-5@m uk-width-1-2@s"> -->
                                    <div class="uk-visible@m filter-selected filter">
                                        Fintech
                                        <span class="fa fa-close"></span>
                                    </div>
                                    <div class="uk-visible@m filter-selected filter">
                                        Software
                                        <span class="fa fa-close"></span>
                                    </div>
                                    <div class="uk-visible@m filter-selected filter">
                                        Data Science
                                        <span class="fa fa-close"></span>
                                    </div>
                                    <div class="filter-reset text-white">
                                        Reset
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      search: {
        input: ''
      }
    }
  },
  watch: {
    search: {
      handler: () => {
        console.log('watching...')
        this.runSearch()
      },
      deep: true
    }
  },
  mounted () {
    console.log(this.$store, 'store')
  },
  methods: {
    runSearch () {
      const payload = this.search
      this.$store.dispatch('search', payload)
    }
  }
}
</script>

<style>

</style>
