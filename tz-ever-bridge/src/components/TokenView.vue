<template>
  <div class="block">
    <div class="name">{{direction}}:</div>
    <div class="token">
      {{token}}
    </div>
  </div>
</template>

<script>
import {Vue} from "vue-class-component";

export default {
  name: "TokenView",
  props: {
    token: String,
    direction: String,
  }
}
</script>

<style scoped>
.block {
  position: relative;
  width: 10%;
  height: 50%;
  border: 2px solid #F64C72;
  background-color: #553D67;
  border-radius: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block .name {
  position: absolute;
  top: -1.5rem;
  color: white;
}

.block .token {
  font-size: 1.5em;
  color: white;
}
</style>