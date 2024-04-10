<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="width: 100%; min-height: 100%;">
        <headerAndMenu>
            <component :is="forStaffGroups"></component>
        </headerAndMenu>
    </div>
</template>

<script>
    import headerAndMenu from '@/components/headerAndMenu.vue';
    import forStaffGroups from '../components/forStaffGroups.vue'

    export default {
        name: 'staffGroups',
        
        components: {
            headerAndMenu,
            forStaffGroups
        },

        data() {
            return {
                forStaffGroups: 'forStaffGroups'
            }
        },

        beforeCreate() {
            this.$store.commit('setMenuSectionHeader', 'Группы сотрудников')
        }
    }
</script>

<style scoped>

</style>