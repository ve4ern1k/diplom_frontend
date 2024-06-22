<template>
    <div
        style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0"
    >
        <v-card
            style="
                display: flex;
                flex-direction: column;
                width: 100%;
                border-radius: 0px;
            "
        >
            <v-app-bar
                color="#163179"
                dark
                elevation="4"
                class="header-main"
                style="position: fixed; z-index: 2"
            >
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                <v-toolbar-title class="naming"
                    >Комбинат Братскжелезобетон |
                    {{ this.$store.state.menuSectionHeader }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <router-link to="/me">
                    <div class="user-name">
                        {{ userName }}
                    </div>
                </router-link>
                <router-link to="/authorization">
                    <div class="user-name">
                        <v-btn icon style="color: white">
                            <v-icon> mdi-exit-to-app </v-icon>
                        </v-btn>
                    </div>
                </router-link>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                dark
                class="navigation-drawer-color"
                style="position: fixed; z-index: 3"
            >
                <v-list class="list-partitions" nav>
                    <v-list-item-group>
                        <router-link to="/staff">
                            <v-list-item color="white">
                                <v-list-item-icon class="icon-margin">
                                    <v-icon>mdi-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title
                                    >Сотрудники</v-list-item-title
                                >
                            </v-list-item>
                        </router-link>

                        <router-link to="/staffGroups">
                            <v-list-item color="white">
                                <v-list-item-icon class="icon-margin">
                                    <v-icon>mdi-account-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title
                                    >Группы сотрудников</v-list-item-title
                                >
                            </v-list-item>
                        </router-link>

                        <router-link to="/orders">
                            <v-list-item color="white">
                                <v-list-item-icon class="icon-margin">
                                    <v-icon
                                        >mdi-order-bool-descending-variant</v-icon
                                    >
                                </v-list-item-icon>
                                <v-list-item-title>Заказы</v-list-item-title>
                            </v-list-item>
                        </router-link>

                        <router-link to="/publications">
                            <v-list-item color="white">
                                <v-list-item-icon class="icon-margin">
                                    <v-icon
                                        >mdi-panorama-variant-outline</v-icon
                                    >
                                </v-list-item-icon>
                                <v-list-item-title
                                    >Публикации</v-list-item-title
                                >
                            </v-list-item>
                        </router-link>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>

            <div
                style="
                    height: 100%;
                    width: 100%;
                    padding: 10px;
                    margin-top: 64px;
                    z-index: 1;
                "
            >
                <slot></slot>
            </div>
        </v-card>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "headerAndMenu",

    data() {
        return {
            userName: "",
            drawer: false,
            group: null,
        };
    },

    async created() {
        const url = `/internal/user/my_info`;
        const query = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.$store.state.authToken,
            },
        };

        await fetch(url, query).then(async (response) => {
            const jsonBody = await response.json();

            if (!jsonBody.error) {
                this.userName = jsonBody.data.firstname;
            } else {
                console.log(jsonBody.message);
            }
        });
    },

    watch: {
        group() {
            this.drawer = false;
        },
    },
};
</script>

<style scoped>
.header-main {
    padding: 0px 10px;
    background: linear-gradient(30deg, #163179, #0f2254);
}

.navigation-drawer-color {
    background: linear-gradient(-150deg, #163179, #132968);
}

.list-partitions {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.icon-margin {
    margin-right: 10px !important;
}

.user-name {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    color: white;
    font-size: 1.5em;
    transition: 300ms;
}

.user-name:hover {
    color: #e45d64;
}

.settings-icon {
    color: white;
    transition: 300ms;
}

.settings-icon:hover {
    color: #e45d64;
}

@media screen and (max-width: 915px) {
    .naming {
        display: none;
    }
}
</style>
