<template>
    <section class="filters">
                <div class="uk-container">
                    <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-1-1@m">
                            <powered-by-algolia v-if="mobileDetect && !mobileDetect.mobile()" />
                        </div>
                        <div class="uk-width-1-1@m">
                            <div class="uk-inline input-container">
                                <span class="uk-form-icon" uk-icon="icon: search"></span>
                                <input type="text" v-model="search.input" class="uk-input filter search" placeholder="Find inspiring product live streams" />
                            </div>
                        </div>
                        <div class="uk-width-1-1@m uk-grid-margin" :class="{ 'uk-grid-margin': mobileDetect && mobileDetect.mobile() ? true : false }" v-if="showFilter">
                            <div class="filter-group">
                                <span class="filter-label">
                                    Interests
                                </span>
                                <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                                    <div v-for="filter in filters" :key="filter.value" class="uk-width-1-5@m uk-width-1-2@s">
                                        <div class="category" :class="{ 'active': search.interests.includes(filter.value) }" @click="toggleInterest(filter.value)">
                                            {{ filter.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-1@m filters-selected">
                            <!-- <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid> -->
                                <!-- <div class="uk-width-1-5@m uk-width-1-2@s"> -->
                                    <div v-for="interest in search.interests" :key="interest" class="uk-visible@m filter-selected filter">
                                        {{ interest }}
                                        <span class="fa fa-close" @click="toggleInterest(interest)"></span>
                                    </div>
                                    <div v-if="!showFilter" class="filter-reset" @click="toggleFilter">
                                        Filters
                                    </div>
                                    <div v-if="showFilter" style="width: 90px;" class="filter-reset hi" @click="toggleFilter">
                                        Hide filters
                                    </div>
                                    <div class="filter-reset" @click="resetFilters">
                                        Reset
                                    </div>
                                    <powered-by-algolia style="right: 14px; position: absolute;" v-if="mobileDetect && mobileDetect.mobile()" />
                        </div>
                    </div>
                </div>
        </section>
</template>

<script>
import MobileDetect from 'mobile-detect'
import PoweredByAlgolia from './powered-by-algolia'
export default {
  components: {
    PoweredByAlgolia
  },
  data () {
    return {
      selectedInterests: [],
      keyword: '',
      showFilter: true,
      mobileDetect: null,
      filters: [
        { name: 'Internet Software', value: 'internet-software' },
        { name: 'Programming', value: 'programming' },
        { name: 'Fintech', value: 'fintech' },
        { name: 'Artificial Intelligence', value: 'artificial-intelligence' },
        { name: 'Ecommerce', value: 'ecommerce' },
        { name: 'Blockchain', value: 'blockchain' },
        { name: 'Craftmanship', value: 'craftmanship' }
      ],
      search: {
        interestsFilter: [],
        input: '',
        interests: []
      }
    }
  },
  watch: {
    search: {
      handler () {
        this.$store.commit('searchLoading', true)
        this.$store.commit('searchQuery', Object.assign({}, this.search, {
          facetFilters: this.search.interestsFilter
        }))
      },
      deep: true
    }
  },
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
    // if (!this.mobileDetect.mobile()) {
    //   this.showFilter = true
    // }
  },
  methods: {
    toggleFilter () {
      if (!this.showFilter) {
        this.showFilter = true
        return false
      }
      this.showFilter = false
      return true
    },
    toggleInterest (interest) {
      if (this.search.interests.includes(interest)) {
        this.search.interestsFilter = this.search.interestsFilter.filter(filter => {
          return filter !== `specialty:${interest}`
        })
        this.search.interests = this.search.interests.filter(int => {
          return int !== interest
        })
        return true
      }
      this.search.interestsFilter.push(`specialty:${interest}`)
      this.search.interests.push(interest)
    },
    resetFilters () {
      this.search = {
        input: '',
        interests: [],
        interestsFilter: []
      }
    },
    runSearch () {
      const payload = this.search
      this.$store.dispatch('search', payload)
    }
  }
}
</script>

<style>

</style>
