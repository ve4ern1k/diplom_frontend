<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="width: 100%; min-height: 100%;">
        <headerAndMenu>
            <component :is="forOrders"></component>
        </headerAndMenu>
    </div>
</template>

<script>
    import headerAndMenu from '@/components/headerAndMenu.vue';
    import forOrders from '@/components/forOrders.vue';

    export default {
        name: 'orders',
        
        components: {
            headerAndMenu,
            forOrders
        },

        data() {
            return {
                forOrders: 'forOrders'
            }
        },

        beforeCreate() {
            this.$store.commit('setMenuSectionHeader', 'Заказы')
        }
    }
</script>

<style scoped>

</style>