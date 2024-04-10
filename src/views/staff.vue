<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="width: 100%; min-height: 100%;">
        <headerAndMenu>
            <component :is="forStaff"></component>
        </headerAndMenu>
    </div>
</template>

<script>
    import headerAndMenu from '../components/headerAndMenu.vue'
    import forStaff from '../components/forStaff.vue'

    export default {
        name: 'staff',
        
        components: {
            headerAndMenu,
            forStaff
        },

        data() {
            return {
                forStaff: forStaff
            }
        },

        beforeCreate() {
            this.$store.commit('setMenuSectionHeader', 'Сотрудники')
        }
    }
</script>

<style scoped>

</style>