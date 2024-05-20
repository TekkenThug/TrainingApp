<template>
  <nav :class="$style.navigation">
    <ul :class="$style.navigationList">
      <li v-for="link in navigation" :class="$style.navigationItem">
        <NuxtLink :to="link.route" :class="$style.navigationItemLink" :active-class="$style['navigationItemLink--active']">
          <Icon :class="$style.navigationItemIcon" :name="link.icon" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const navigation = reactive([
  {
    route: "/programs",
    icon: "carbon:list-checked"
  },
  {
    route: "/",
    icon: "carbon:home"
  },
]);
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
  background-color: var(--color-secondary-1);
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
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
  padding: 15px;
  gap: 12px;
  font-family: "Viga", sans-serif;
}

.navigationItemLink {
  color: #9DB2CE;
  transition: color .3s ease;
}

.navigationItemLink--active {
  color: var(--color-primary-1);
}

.navigationItemIcon {
  width: 24px;
  height: 24px;
}
</style>
