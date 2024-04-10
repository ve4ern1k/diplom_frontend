<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="width: 100%; min-height: 100%;">
        <headerAndMenu>
            <component :is="forPublications"></component>
        </headerAndMenu>
    </div>
</template>

<script>
    import headerAndMenu from '@/components/headerAndMenu.vue';
    import forPublications from '../components/forPublications.vue'

    export default {
        name: 'publications',
        
        components: {
            headerAndMenu,
            forPublications
        },

        data() {
            return {
                forPublications: 'forPublications'
            }
        },

        beforeCreate() {
            this.$store.commit('setMenuSectionHeader', 'Публикации')
        }
    }
</script>

<style scoped>

</style>