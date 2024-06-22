<template>
    <div
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
    >
        <div style="display: flex; flex-wrap: nowrap">
            <v-text-field
                solo
                label="Поиск"
                v-model="search"
                :append-icon="'mdi-magnify'"
                hide-details
                single-line
                :disabled="disableAll"
                style="padding: 0;"
            ></v-text-field>
        </div>
        <div style="height: 100%; width: 100%; padding-top: 10px">
            <v-data-table
                :headers="dataTableHeaders"
                :items="orders"
                :search="search"
                :items-per-page="15"
                item-key="id"
                loading-text="Минуточку... Данные на подходе"
                class="elevation-1"
                style="max-height: 100%; width: 100%"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td
                            v-for="(header, index) in dataTableHeaders"
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
        <v-dialog
            v-model="dialogUpdate"
            max-width="1200px !important"
            persistent
        >
            <v-container
                style="
                    background-color: white;
                    padding: 30px 30px 20px;
                    max-width: 100%;
                "
            >
                <div>
                    <div style="display: flex; flex-wrap: wrap">
                        <v-text-field
                            :disabled="true"
                            required
                            v-model="updatingItem.code"
                            label="Код заказа"
                        ></v-text-field>
                        <v-text-field
                            :disabled="true"
                            required
                            v-model="updatingItem.customer"
                            label="Заказчик"
                        ></v-text-field>
                        <v-text-field
                            required
                            v-model="updatingItem.phone"
                            label="Телефон"
                        ></v-text-field>
                        <v-text-field
                            required
                            v-model="updatingItem.email"
                            label="E-mail"
                        ></v-text-field>
                        <v-text-field
                            :disabled="true"
                            required
                            v-model="updatingItem.date"
                            label="Дата заказа"
                        ></v-text-field>
                        <v-select
                            required
                            v-model="updatingItem.status"
                            label="Статус"
                            :items="[
                                'Принят',
                                'Готовится к отправке',
                                'В пути',
                                'Доставлен',
                                'Завершён',
                                'Отменён',
                            ]"
                        ></v-select>
                        <v-text-field
                            :disabled="true"
                            required
                            v-model="updatingItem.fullPrice"
                            label="Сумма заказа"
                        ></v-text-field>
                        <v-select
                            required
                            v-model="updatingItem.prepaid"
                            label="Предоплачен"
                            :items="['Да', 'Нет']"
                        ></v-select>
                    </div>

                    <p
                        style="
                            text-align: center;
                            font-size: 1.3em;
                            margin-top: 20px;
                        "
                    >
                        Состав заказа
                    </p>

                    <v-data-table
                        :headers="dataTableHeadersOneOrder"
                        :items="updatingItem.structure"
                        :items-per-page="5"
                        item-key="name"
                        loading-text="Минуточку... Данные на подходе"
                        class="elevation-1"
                        style="width: 100%"
                    >
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

                    <div
                        class="twoButtons"
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey"
                            style="color: white; margin-right: 40px"
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
                        <v-spacer></v-spacer>
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
    name: "forOrders",

    data() {
        return {
            dataTableHeaders: [
                { text: "ID", align: "start", value: "id" },
                { text: "Код", align: "start", value: "code", sortable: false },
                { text: "Заказчик", value: "customer", sortable: false },
                { text: "Статус", value: "status", sortable: false },
                { text: "Оплачен", value: "prepaid", sortable: false },
                { text: "Дата", value: "date" },
                { text: "Телефон", value: "phone", sortable: false },
                { text: "E-mail", value: "email", sortable: false },
                { text: "Итоговая стоимость", value: "fullPrice" },
            ],
            dataTableHeadersOneOrder: [
                { text: "Наименование", value: "name" },
                { text: "Категория", value: "category", sortable: false },
                { text: "Цена за ед.", value: "price" },
                { text: "Количество", value: "count" },
                { text: "Итого", value: "fullPrice" },
            ],
            search: "",
            orders: [],
            dialogUpdate: false,
            updatingItem: {},
            changesSaved: false,
            snackError: false,
            snackErrorText: "",
            disableAll: false,
        };
    },

    async created() {
        const url = `/internal/order/all`;
        const query = {
            method: "GET",
            headers: {
                Authorization: this.$store.state.authToken,
            },
        };

        await fetch(url, query).then(async (response) => {
            const jsonBody = await response.json();

            if (!jsonBody.error) {
                this.orders = jsonBody.data;
                this.orders.map((el) => {
                    if (el.prepaid) {
                        el["prepaid"] = "Да";
                    } else {
                        el["prepaid"] = "Нет";
                    }
                    el["date"] = this.formatDate(el.date);
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
            const url = `/internal/order/${item.id}`;
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
                    this.updatingItem["date"] = this.formatDate(
                        this.updatingItem.date
                    );
                    if (this.updatingItem.prepaid) {
                        this.updatingItem["prepaid"] = "Да";
                    } else {
                        this.updatingItem["prepaid"] = "Нет";
                    }
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                    this.disableAll = true;
                }
            });

            this.dialogUpdate = true;
        },

        async saveUpdates() {
            let objForApi = {};
            objForApi = {
                id: this.updatingItem.id,
                phone: this.updatingItem.phone,
                email: this.updatingItem.email,
                status: this.updatingItem.status,
            };
            if (this.updatingItem.prepaid === "Да") {
                objForApi["prepaid"] = true;
            } else {
                objForApi["prepaid"] = false;
            }

            const url = `/internal/order/update`;
            const query = {
                method: "POST",
                headers: {
                    Authorization: this.$store.state.authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objForApi),
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();

                if (!jsonBody.error) {
                    const url = `/internal/order/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();

                        if (!jsonBody.error) {
                            this.orders = jsonBody.data;
                            this.orders.map((el) => {
                                if (el.prepaid) {
                                    el["prepaid"] = "Да";
                                } else {
                                    el["prepaid"] = "Нет";
                                }
                                el["date"] = this.formatDate(el.date);
                            });
                        } else {
                            this.snackErrorText = jsonBody.message;
                            this.snackError = true;
                            this.disableAll = true;
                        }
                    });
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                    this.disableAll = true;
                }
            });

            this.dialogUpdate = false;
            this.changesSaved = true;
            this.updatingItem = {};
        },

        cancelUpdates() {
            this.dialogUpdate = false;
            this.updatingItem = {};
        },

        formatDate(inputDate) {
            const date = new Date(inputDate);

            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы в JavaScript начинаются с 0
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        },
    },
};
</script>

<style scoped>
.v-text-field {
    width: 450px;
    padding: 5px 10px;
}

.custom-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #985cff;
}

.custom-item:hover {
    background-color: #eaeaea;
}

.twoButtons {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 25px 0px 0px;
}

@media screen and (max-width: 420px) {
    .twoButtons .v-btn {
        width: 100%;
        margin: 4px 0px !important;
    }
}
</style>
