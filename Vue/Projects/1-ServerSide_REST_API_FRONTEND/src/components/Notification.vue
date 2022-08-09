<script>
export default {
  data() {
    return {

    }
  },
  props: ['message']
}
</script>

<template>
  <div class="notifications">
    <div class="alert alert-success" data-notification>
      {{ message }}
    </div>
  </div>
</template>