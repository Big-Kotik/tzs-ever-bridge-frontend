<template>
  <HeaderView/>
  <router-view/>
  <FooterView/>
</template>

<style>
#app {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}

header {
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  background-color: #553D67;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: space-between;
}

header a {
  color: white;
  text-decoration: none;
  margin: 10pt;
}

header a:hover {
  color: gray;
}
footer {
  background-color: #242582;
}

.center {
  width: 30%;
  height: 75%;
  border-radius: 2%;
  background-color: #553D67;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.center a {
  background-color: #F64C72;
  color: white;
  text-decoration: none;
  border: none;
  padding: 0.5rem;
}
.center a:hover {
  background-color: #ad3d55;
  color: white;
}

main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40%;
  padding-left: 10%;
  padding-right: 10%;
}

body {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #2F2FA2;
}
</style>
<script>
import HeaderView from "@/components/HeaderView";
import FooterView from "@/components/FooterView";
export default {
  components: {FooterView, HeaderView}
}
</script>