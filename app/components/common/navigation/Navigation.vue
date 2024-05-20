<template>
  <nav :class="$style.navigation">
    <ul :class="$style.navigationList">
      <li v-for="link in navigation" :class="$style.navigationItem" @click="handleClick(link.route)">
        <component :is="link.icon" :class="$style.navigationItemIcon" />

        {{ link.title }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import Clipboard from "~/assets/icons/clipboard.svg";

const navigation = reactive([
  {
    title: "Programs",
    route: "/programs",
    icon: Clipboard
  },
]);

const router = useRouter();

const handleClick = (route: string) => {
  router.push(route);
}
</script>

<style module>
.navigation {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  background-color: #131313;
  z-index: 1000;
}

.navigationList {
  display: flex;
  align-items: flex-start;
  padding: 0 5px;
  height: 100%;
  gap: 8px;
}

.navigationItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #9DB2CE;
  padding: 15px;
  gap: 12px;
  font-family: "Viga", sans-serif;
}

.navigationItemIcon {
  width: 30px;
  height: 30px;
}
</style>
