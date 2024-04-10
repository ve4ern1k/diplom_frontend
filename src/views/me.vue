<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="width: 100%; height: 100%;">
        <headerAndMenu>
            <component :is="forme"></component>
        </headerAndMenu>
    </div>
</template>

<script>
    import headerAndMenu from '@/components/headerAndMenu.vue';
    import forMe from '../components/forMe.vue'

    export default {
        name: 'me',
        
        components: {
            headerAndMenu,
            forMe
        },

        data() {
            return {
                forme: 'forMe'
            }
        },

        beforeCreate() {
            this.$store.commit('setMenuSectionHeader', 'Личный кабинет')
        }
    }
</script>

<style scoped>

</style>