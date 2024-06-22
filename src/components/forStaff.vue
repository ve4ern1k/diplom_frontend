<template>
    <div
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
    >
        <div class="functionsBlock">
            <v-text-field
                solo
                label="Поиск"
                v-model="search"
                :append-icon="'mdi-magnify'"
                hide-details
                single-line
                style="display: flex; flex-grow: 18; margin-right: 5px"
                :disabled="disableAll"
            ></v-text-field>
            <v-btn
                @click="openDialogCreate"
                color="green"
                style="
                    color: white;
                    display: flex;
                    flex-grow: 1;
                    height: 100%;
                    margin: 0px 5px;
                "
                :disabled="disableAll"
            >
                <v-icon style="margin-right: 3px">mdi-plus</v-icon>
                Добавить
            </v-btn>
            <v-btn
                @click="removeUsers"
                color="red"
                style="
                    color: white;
                    display: flex;
                    flex-grow: 1;
                    height: 100%;
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
                :items="users"
                :search="search"
                item-key="id"
                loading-text="Минуточку... Данные на подходе"
                class="elevation-1"
                :responsive="true"
                style="max-height: 100%; width: 100%"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                            <v-checkbox
                                v-model="item.isSelected"
                                @click=""
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
        
        <v-dialog v-model="dialogUpdate" persistent>
            <v-stepper v-model="pageDialogUpdate">
                <v-stepper-header>
                    <v-stepper-step :complete="pageDialogUpdate > 1" step="1">
                        Личная информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="pageDialogUpdate > 2" step="2">
                        Рабочая информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3"> Контакты </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Фамилия"
                                            v-model="updatingItem.lastname"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Имя"
                                            v-model="updatingItem.firstname"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Отчество"
                                            v-model="updatingItem.middlename"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Возраст"
                                            v-model="updatingItem.age"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Дата рождения"
                                            v-model="updatingItem.birthday"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-select
                                            required
                                            :items="sexCases"
                                            label="Пол"
                                            v-model="updatingItem.sex"
                                        ></v-select>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Образование"
                                            v-model="updatingItem.quality"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 2"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Должность"
                                            v-model="updatingItem.post"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Опыт работы"
                                            v-model="updatingItem.experience"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="З/П"
                                            v-model="updatingItem.salary"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-select
                                            required
                                            v-model="updatingItem.userGroups"
                                            label="Группы пользователей"
                                            :items="userGroupsTitles"
                                            chips
                                            multiple
                                        ></v-select>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Логин"
                                            v-model="updatingItem.login"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Пароль"
                                            v-model="newPassUpdate"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 3"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="E-mail"
                                            v-model="updatingItem.email"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Телефон"
                                            v-model="updatingItem.phone"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 1"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <v-dialog v-model="dialogCreate" persistent>
            <v-stepper v-model="pageDialogCreate">
                <v-stepper-header>
                    <v-stepper-step :complete="pageDialogCreate > 1" step="1">
                        Личная информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="pageDialogCreate > 2" step="2">
                        Рабочая информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3"> Контакты </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Фамилия"
                                            v-model="creatingItem.lastname"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Имя"
                                            v-model="creatingItem.firstname"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Отчество"
                                            v-model="creatingItem.middlename"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Возраст"
                                            v-model="creatingItem.age"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Дата рождения"
                                            v-model="creatingItem.birthday"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-select
                                            required
                                            :items="sexCases"
                                            label="Пол"
                                            v-model="creatingItem.sex"
                                        ></v-select>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Образование"
                                            v-model="creatingItem.quality"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 2"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Должность"
                                            v-model="creatingItem.post"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Опыт работы"
                                            v-model="creatingItem.experience"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="З/П"
                                            v-model="creatingItem.salary"
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-select
                                            required
                                            v-model="creatingItem.userGroups"
                                            label="Группы пользователей"
                                            :items="userGroupsTitles"
                                            chips
                                            multiple
                                        ></v-select>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Логин"
                                            v-model="creatingItem.login"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Пароль"
                                            v-model="creatingItem.password"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 3"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card
                            class="pageCard"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                "
                            >
                                <div
                                    class="onePageInfo"
                                >
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="E-mail"
                                            v-model="creatingItem.email"
                                        ></v-text-field>
                                    </div>
                                    <div class="userInfoField">
                                        <v-text-field
                                            required
                                            label="Телефон"
                                            v-model="creatingItem.phone"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div
                            style="
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin: 5px 0px;
                            "
                        >
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 1"
                                class="buttonNext"
                            >
                                Далее
                            </v-btn>

                            <v-spacer></v-spacer>

                            <div class="buttonsRow">
                                <v-btn
                                    color="grey"
                                    style="color: white; margin-right: 10px"
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
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
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
                { text: "ФИО", align: "start", value: "lfmnames" },
                { text: "Должность", value: "post", sortable: false },
                { text: "З/П", value: "salary" },
                { text: "Опыт работы (лет)", value: "experience" },
                { text: "E-mail", value: "email", sortable: false },
                { text: "Телефон", value: "phone", sortable: false },
            ],
            users: [],
            search: "",
            userGroups: [],
            userGroupsTitles: [],
            dialogUpdate: false,
            dialogCreate: false,
            pageDialogUpdate: 1,
            pageDialogCreate: 1,
            updatingItem: {},
            creatingItem: {
                login: "",
                password: "",
                firstname: "",
                lastname: "",
                middlename: "",
                age: "",
                birthday: "",
                sex: "",
                quality: "",
                post: "",
                experience: "",
                salary: "",
                email: "",
                phone: "",
                userGroups: [],
            },
            sexCases: ["Мужской", "Женский"],
            newPassUpdate: "",
            changesSaved: false,
            snackError: false,
            snackErrorText: "",
            disableAll: false,
        };
    },

    async created() {
        const url = `/internal/user/all`;
        const query = {
            method: "GET",
            headers: {
                Authorization: this.$store.state.authToken,
            },
        };

        await fetch(url, query).then(async (response) => {
            const jsonBody = await response.json();
            if (!jsonBody.error) {
                this.users = jsonBody.data;
                this.users.map(async (el) => {
                    this.$set(el, "isSelected", false);
                    el[
                        "lfmnames"
                    ] = `${el.lastname} ${el.firstname} ${el.middlename}`;

                    const url1 = `/internal/user_group/all`;
                    const query1 = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url1, query1).then(async (response) => {
                        if (response.status !== 200) {
                            throw response.error;
                        } else {
                            const jsonBody = await response.json();
                            this.userGroups = jsonBody.data;
                            this.userGroups.map((el) => {
                                this.userGroupsTitles.push(el.title);
                            });
                        }
                    });
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
            this.pageDialogUpdate = 1;
            this.newPassUpdate = "";

            const url = `/internal/user/${item.id}`;
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
                    this.updatingItem = jsonBody.data;
                }
            });

            this.dialogUpdate = true;
        },

        async saveUpdates() {
            if (this.newPassUpdate) {
                const url2 = `/internal/user/update_auth`;
                const query2 = {
                    method: "POST",
                    headers: {
                        Authorization: this.$store.state.authToken,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: this.updatingItem.id,
                        login: this.updatingItem.login,
                        password: this.newPassUpdate,
                    }),
                };

                await fetch(url2, query2).then(async (response) => {
                    if (response.status !== 200) {
                        throw response.error;
                    } else {
                        const jsonBody = await response.json();
                    }
                });
            }

            let allTyped = true;
            for (const key in this.updatingItem) {
                if (this.updatingItem[key] === "" && key !== "img") {
                    allTyped = false;
                }
            }

            if (allTyped) {
                let userGroupsApi = [];
                this.userGroups.map((el) => {
                    this.updatingItem.userGroups.map((el1) => {
                        if (el.title === el1) {
                            userGroupsApi.push(el.id);
                        }
                    });
                });
                this.updatingItem["userGroups"] = userGroupsApi;

                const url = `/internal/user/update`;
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
                        this.changesSaved = true;
                        this.newPassUpdate = "";
                        this.updatingItem = {};
                        this.dialogUpdate = false;

                        const url = `/internal/user/all`;
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
                                this.users = jsonBody.data;
                                this.users.map((el) => {
                                    this.$set(el, "isSelected", false);
                                    el[
                                        "lfmnames"
                                    ] = `${el.lastname} ${el.firstname} ${el.middlename}`;
                                });
                            }
                        });
                    } else {
                        this.snackErrorText = jsonBody.message;
                        this.snackError = true;
                    }
                });
            } else {
                this.snackErrorText = "Все поля формы должны быть заполнены.";
                this.snackError = true;
            }
        },

        cancelUpdates() {
            this.dialogUpdate = false;
            this.updatingItem = {};
            this.newPassUpdate = "";
        },

        openDialogCreate() {
            this.pageDialogCreate = 1;
            this.dialogCreate = true;
        },

        async saveCreate() {
            let allTyped = true;
            for (const key in this.creatingItem) {
                if (!this.creatingItem[key]) {
                    allTyped = false;
                }
            }

            if (allTyped) {
                this.dialogCreate = false;

                if (this.creatingItem.userGroups) {
                    let userGroupsApi = [];
                    this.userGroups.map((el) => {
                        this.creatingItem.userGroups.map((el1) => {
                            if (el.title === el1) {
                                userGroupsApi.push(el.id);
                            }
                        });
                    });
                    this.creatingItem["userGroups"] = userGroupsApi;
                }

                const url = `/internal/user/create`;
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
                        const url = `/internal/user/all`;
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
                                this.users = jsonBody.data;
                                this.users.map((el) => {
                                    this.$set(el, "isSelected", false);
                                    el[
                                        "lfmnames"
                                    ] = `${el.lastname} ${el.firstname} ${el.middlename}`;
                                });
                            }
                        });

                        this.creatingItem = {};
                        this.changesSaved = true;
                    } else {
                        this.snackErrorText = jsonBody.message;
                        this.snackError = true;
                    }
                });
            } else {
                this.snackErrorText = "Все поля формы должны быть заполнены.";
                this.snackError = true;
            }
        },

        cancelCreate() {
            this.dialogCreate = false;
            this.creatingItem = {};
        },

        async removeUsers() {
            let arr = [];
            this.users.map((el) => {
                if (el.isSelected) {
                    arr.push(el.id);
                }
            });

            const url = `/internal/user/delete`;
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
                    const url = `/internal/user/all`;
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
                            this.users = jsonBody.data;
                            this.users.map((el) => {
                                this.$set(el, "isSelected", false);
                                el[
                                    "lfmnames"
                                ] = `${el.lastname} ${el.firstname} ${el.middlename}`;
                            });
                        }
                    });
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                }
            });

            this.users.map((el) => {
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

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield !important;
}

.functionsBlock {
    display: flex;
    flex-wrap: nowrap;
}

.pageCard {
    height: 280px;
    box-shadow: none !important;
}

.onePageInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.userInfoField {
    width: auto;
    margin: 0px 15px;
}

.buttonNext {
    width: auto;
}

.buttonsRow {
    display: flex;
    flex-direction: row;
}

@media screen and (max-width: 600px) {
    .functionsBlock {
        display: flex;
        flex-wrap: wrap;
        .v-btn, .v-text-field {
            width: 100%;
            height: 48px !important;
            margin: 3px 0px !important;
        }
    }

    .pageCard {
        height: auto;
    }

    .onePageInfo {
        flex-wrap: nowrap;
    }

    .userInfoField {
        width: 100%;
        margin: 5px 0px;
    }

    .buttonNext {
        width: 100%;
    }

    .buttonsRow {
        width: 100%;
        margin-top: 10px;
        justify-content: space-between;
    }

    .buttonsRow .v-btn {
        width: 48%;
    }
}
</style>
