<template>
  <div id="home">
    <div v-if="canShowContent">
      <RenderContent
        model="tester"
        :content="content"
        :api-key="apiKey"
        :customComponents="getRegisteredComponents()"
      />
    </div>
    <div v-else>Content not Found</div>
    <div class="bg-green-400 h-[600px] w-[400px] text-2xl">
      This is a box that should always be showing. Not a Builder Custom Component.
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { RenderContent, getContent, isPreviewing } from '@builder.io/sdk-vue'
import REGISTERED_COMPONENTS from '~/init-builder.js';

export default Vue.extend({
  name: 'Home',
  components: {
    RenderContent,
  },
  data: () => ({
    canShowContent: false,
    content: null,
    apiKey: process.env.BUILDER,
  }),
  mounted() {
    // Re-run this check on the client in case of SSR
    this.canShowContent = this.content || isPreviewing()
  },
  methods: {
    getRegisteredComponents() {
      return REGISTERED_COMPONENTS
    }
  },
  async fetch() {
    const content = await getContent({
      model: 'tester',
      apiKey: process.env.BUILDER,
      userAttributes: {
        urlPath: this.$route.path,
      },
    })
    this.canShowContent = content || isPreviewing()
    this.content = content

    if (!this.canShowContent) {
      if (this.$nuxt.context?.ssrContext?.res) {
        this.$nuxt.context.ssrContext.res.statusCode = 404
      }
    }
  },
})
</script>