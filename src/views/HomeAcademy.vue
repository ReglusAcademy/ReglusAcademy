<template>
    <div>
        <NavReglus></NavReglus>
        <HomeHeadAcademy></HomeHeadAcademy>
        <FooterReglus></FooterReglus>
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavOut.vue"
import HomeHeadAcademy from "@/components/card/resources/HomeHeadAcademy.vue"
import FooterReglus from "@/components/nav/FooterReglus.vue"

export default {
    name: "HomeAcademy",
    components: {
        NavReglus,
        HomeHeadAcademy,
        FooterReglus
    }
}
</script>

<style scoped></style>