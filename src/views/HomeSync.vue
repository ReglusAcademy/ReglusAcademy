<template>
    <div>
        <NavReglus></NavReglus>
        <HomeHeadSync></HomeHeadSync>
        <FooterReglus></FooterReglus>
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavReglus.vue"
import HomeHeadSync from "@/components/card/HomeHeadSync.vue"
import FooterReglus from "@/components/nav/FooterReglus.vue"

export default {
    name: "HomeSync",
    components: {
        NavReglus,
        HomeHeadSync,
        FooterReglus
    }
}
</script>

<style scoped></style>