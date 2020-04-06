<template>
  <div>
    {{ model }}
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: String,
      default: ''
    }
  },
  created () {
    // eslint-disable-next-line no-console
    console.log(111)
  }
}
</script>

<style>

</style>
