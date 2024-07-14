<template>
    <div>
        <NavigationSync></NavigationSync>
        <HomeHeadSync></HomeHeadSync>
    </div>
</template>

<script>
import NavigationSync from "@/components/nav/NavigationSync.vue"
import HomeHeadSync from "@/components/card/HomeHeadSync.vue"

export default {
    name: "HomeSync",
    components: {
        NavigationSync,
        HomeHeadSync
    }
}
</script>

<style scoped>
</style>