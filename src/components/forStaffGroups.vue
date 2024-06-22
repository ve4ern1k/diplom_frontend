<template>
    <div
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
    >
        <div class="functionsBlock">
            <v-btn
                @click="openDialogCreate"
                color="green"
                style="
                    color: white;
                    display: flex;
                    flex-grow: 1;
                    height: 48px;
                    margin-right: 5px;
                "
                :disabled="disableAll"
            >
                <v-icon style="margin-right: 3px">mdi-plus</v-icon>
                Добавить
            </v-btn>
            <v-btn
                @click="removeUserGroups"
                color="red"
                style="
                    color: white;
                    display: flex;
                    flex-grow: 1;
                    height: 48px;
                    margin-left: 5px;
                "
                :disabled="disableAll"
            >
                <v-icon style="margin-right: 3px">mdi-cancel</v-icon>
                Удалить
            </v-btn>
        </div>
        <div style="height: 100%; width: 100%; padding-top: 10px">
            <v-data-table
                :headers="dataTableHeaders"
                :items="staffGroupsForView"
                item-key="id"
                loading-text="Минуточку... Данные на подходе"
                class="elevation-1"
                style="max-height: 100%; width: 100%"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                            <v-checkbox
                                v-model="item.isSelected"
                                @click.stop
                            ></v-checkbox>
                        </td>
                        <td
                            v-for="(header, index) in dataTableHeaders"
                            v-if="header.value !== 'empty'"
                            :key="index"
                            @click.stop="openDialogUpdate(item)"
                        >
                            {{ item[header.value] }}
                        </td>
                    </tr>
                </template>
                <template v-slot:no-data>
                    <v-alert
                        :value="true"
                        dense
                        style="margin-top: 16px; color: #666666"
                    >
                        Всё куда-то пропало... Обратитесь куда-нибудь
                    </v-alert>
                </template>
            </v-data-table>
        </div>
        <v-dialog v-model="dialogUpdate" max-width="600px" persistent>
            <v-container style="background-color: white; padding: 20px 30px">
                <div>
                    <v-text-field
                        required
                        label="Название группы"
                        v-model="updatingItem.title"
                    ></v-text-field>
                    <v-text-field
                        required
                        label="Краткое описание"
                        v-model="updatingItem.description"
                    ></v-text-field>
                    <div>
                        <div>
                            <v-checkbox
                                v-model="updatingItem.seeStaff"
                                :label="checkboxesLabels.seeStaff"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.seeStaffGroups"
                                :label="checkboxesLabels.seeStaffGroups"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.seeOrders"
                                :label="checkboxesLabels.seeOrders"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.seePublications"
                                :label="checkboxesLabels.seePublications"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.updateStaff"
                                :label="checkboxesLabels.updateStaff"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.updateStaffGroups"
                                :label="checkboxesLabels.updateStaffGroups"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.updateOrders"
                                :label="checkboxesLabels.updateOrders"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.updatePublications"
                                :label="checkboxesLabels.updatePublications"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.changeAuthData"
                                :label="checkboxesLabels.changeAuthData"
                                @click.stop
                            ></v-checkbox>
                            <v-checkbox
                                v-model="updatingItem.writePublications"
                                :label="checkboxesLabels.writePublications"
                                @click.stop
                            ></v-checkbox>
                        </div>
                    </div>

                    <div
                        class="twoButtons"
                    >
                        <v-btn
                            color="grey"
                            style="color: white"
                            @click="cancelUpdates"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            color="#4CAF50"
                            style="color: white"
                            @click="saveUpdates"
                        >
                            Сохранить
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </v-dialog>
        <v-dialog v-model="dialogCreate" max-width="600px" persistent>
            <v-container style="background-color: white; padding: 20px 30px">
                <div>
                    <v-text-field
                        required
                        label="Название группы"
                        v-model="creatingItem.title"
                    ></v-text-field>
                    <v-text-field
                        required
                        label="Краткое описание"
                        v-model="creatingItem.description"
                    ></v-text-field>
                    <div>
                        <v-checkbox
                            v-model="creatingItem.seeStaff"
                            :label="checkboxesLabels.seeStaff"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.seeStaffGroups"
                            :label="checkboxesLabels.seeStaffGroups"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.seeOrders"
                            :label="checkboxesLabels.seeOrders"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.seePublications"
                            :label="checkboxesLabels.seePublications"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.updateStaff"
                            :label="checkboxesLabels.updateStaff"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.updateStaffGroups"
                            :label="checkboxesLabels.updateStaffGroups"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.updateOrders"
                            :label="checkboxesLabels.updateOrders"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.updatePublications"
                            :label="checkboxesLabels.updatePublications"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.changeAuthData"
                            :label="checkboxesLabels.changeAuthData"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="creatingItem.writePublications"
                            :label="checkboxesLabels.writePublications"
                            @click.stop
                        ></v-checkbox>
                    </div>

                    <div
                        class="twoButtons"
                    >
                        <v-btn
                            color="grey"
                            style="color: white"
                            @click="cancelCreate"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            color="#4CAF50"
                            style="color: white"
                            @click="saveCreate"
                        >
                            Сохранить
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </v-dialog>
        <v-snackbar v-model="changesSaved" timeout="2000" color="success"
            >Изменения успешно сохранены.</v-snackbar
        >
        <v-snackbar v-model="snackError" timeout="2000" color="red">{{
            snackErrorText
        }}</v-snackbar>
    </div>
</template>

<script>
export default {
    name: "forStaff",

    data() {
        return {
            dataTableHeaders: [
                { text: "", value: "empty", sortable: false },
                { text: "ID", align: "start", value: "id" },
                { text: "Название", align: "start", value: "title" },
                {
                    text: "Краткое описание",
                    align: "start",
                    value: "description",
                    sortable: false,
                },
            ],
            staffGroupsForView: [],
            dialogUpdate: false,
            dialogCreate: false,
            updatingItem: {},
            creatingItem: {
                title: "",
                description: "",
                seeStaff: false,
                seeStaffGroups: false,
                seeOrders: false,
                seePublications: false,
                updateStaff: false,
                updateStaffGroups: false,
                updateOrders: false,
                updatePublications: false,
                changeAuthData: false,
                writePublications: false,
            },
            checkboxesLabels: {
                seeStaff: 'Просматривать "Сотрудники"',
                seeStaffGroups: 'Просматривать "Группы сотрудников"',
                seeOrders: 'Просматривать "Заказы"',
                seePublications: 'Просматривать "Публикации"',
                updateStaff: 'Редактировать "Сотрудники"',
                updateStaffGroups: 'Редактировать "Группы сотрудников"',
                updateOrders: 'Редактировать "Заказы"',
                updatePublications: 'Редактировать "Публикации"',
                changeAuthData: "Изменять данные аутентификации пользователя",
                writePublications: "Добавлять публикации",
            },
            changesSaved: false,
            snackError: false,
            snackErrorText: "",
            disableAll: false,
        };
    },

    async created() {
        const url = `/internal/user_group/all`;
        const query = {
            method: "GET",
            headers: {
                Authorization: this.$store.state.authToken,
            },
        };

        await fetch(url, query).then(async (response) => {
            const jsonBody = await response.json();

            if (!jsonBody.error) {
                this.staffGroupsForView = jsonBody.data;
                this.staffGroupsForView.map((el) => {
                    this.$set(el, "isSelected", false);
                });
            } else {
                this.snackErrorText = jsonBody.message;
                this.snackError = true;
                this.disableAll = true;
            }
        });
    },

    methods: {
        async openDialogUpdate(item) {
            const url = `/internal/user_group/${item.id}`;
            const query = {
                method: "GET",
                headers: {
                    Authorization: this.$store.state.authToken,
                },
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();

                if (!jsonBody.error) {
                    this.updatingItem = jsonBody.data;
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                }
            });

            this.dialogUpdate = true;
        },

        async saveUpdates() {
            const url = `/internal/user_group/update`;
            const query = {
                method: "POST",
                headers: {
                    Authorization: this.$store.state.authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.updatingItem),
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();

                if (!jsonBody.error) {
                    this.dialogUpdate = false;
                    this.changesSaved = true;
                    this.updatingItem = {};

                    const url = `/internal/user_group/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();

                        if (!jsonBody.error) {
                            this.staffGroupsForView = jsonBody.data;
                            this.staffGroupsForView.map((el) => {
                                this.$set(el, "isSelected", false);
                            });
                        } else {
                            this.snackErrorText = jsonBody.message;
                            this.snackError = true;
                        }
                    });
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                }
            });
        },

        cancelUpdates() {
            this.dialogUpdate = false;
            this.updatingItem = {};
        },

        openDialogCreate() {
            this.dialogCreate = true;
        },

        async saveCreate() {
            const url = `/internal/user_group/create`;
            const query = {
                method: "POST",
                headers: {
                    Authorization: this.$store.state.authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.creatingItem),
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();

                if (!jsonBody.error) {
                    const url = `/internal/user_group/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        if (response.status !== 200) {
                            throw response.error;
                        } else {
                            const jsonBody = await response.json();
                            this.staffGroupsForView = jsonBody.data;
                            this.staffGroupsForView.map((el) => {
                                this.$set(el, "isSelected", false);
                            });
                            this.dialogCreate = false;
                            this.changesSaved = true;
                            this.creatingItem = {};
                        }
                    });
                } else {
                    this.snackErrorText =
                        "Отсутствует название или описание группы";
                    this.snackError = true;
                }
            });
        },

        cancelCreate() {
            this.dialogCreate = false;
            this.creatingItem = {};
        },

        async removeUserGroups() {
            let arr = [];
            this.staffGroupsForView.map((el) => {
                if (el.isSelected) {
                    arr.push(el.id);
                }
            });

            const url = `/internal/user_group/delete`;
            const query = {
                method: "DELETE",
                headers: {
                    Authorization: this.$store.state.authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idList: arr,
                }),
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();

                if (!jsonBody.error) {
                    const url = `/internal/user_group/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        if (response.status !== 200) {
                            throw response.error;
                        } else {
                            const jsonBody = await response.json();
                            this.staffGroupsForView = jsonBody.data;
                            this.staffGroupsForView.map((el) => {
                                this.$set(el, "isSelected", false);
                            });
                        }
                    });
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                }
            });

            this.staffGroupsForView.map((el) => {
                arr.map((el1) => {
                    if (el.id === el1) {
                        el.isSelected = false;
                    }
                });
            });
        },
    },
};
</script>

<style scoped>

.twoButtons {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 25px 0px 0px;
}

@media screen and (max-width: 400px) {

    .twoButtons {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .twoButtons .v-btn {
        width: 100%;
        margin: 4px 0px;
    }
}

</style>
