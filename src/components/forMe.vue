<template>
    <div
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
    >
        <v-row dense style="flex-grow: 1">
            <v-col cols="12" sm="12">
                <v-card class="partition">
                    <v-hover v-slot="{ hover }">
                        <v-avatar size="120">
                            <v-img
                                v-if="userData.img"
                                :src="'/media/' + userData.img"
                            >
                                <v-row class="flex-column" justify="center">
                                    <div class="align-self-center">
                                        <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="rgba(255, 255, 255, 0)"
                                            icon
                                            @click="openFileDialog"
                                        >
                                            <v-icon
                                                :class="{ 'show-btns': hover }"
                                                color="rgba(255, 255, 255, 0)"
                                            >
                                                mdi-image-edit-outline
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-img>
                            <v-img v-else src="default.png">
                                <v-row class="flex-column" justify="center">
                                    <div class="align-self-center">
                                        <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="rgba(255, 255, 255, 0)"
                                            icon
                                            @click="openFileDialog"
                                        >
                                            <v-icon
                                                :class="{ 'show-btns': hover }"
                                                color="rgba(255, 255, 255, 0)"
                                            >
                                                mdi-image-edit-outline
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-img>
                        </v-avatar>
                    </v-hover>
                    <div
                        style="
                            margin-top: 15px;
                            padding: 0px 10px;
                            font-size: 1.5em;
                            text-align: center;
                        "
                    >
                        {{ userData.lastname }} {{ userData.firstname }}
                        {{ userData.middlename }}
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row dense style="height: 473.36">
            <v-col cols="12" sm="4">
                <v-card class="partition">
                    <p
                        style="
                            width: 100%;
                            text-align: center;
                            font-size: 1.3em;
                            margin: 16px;
                        "
                    >
                        Настройки
                    </p>
                    <div
                        style="
                            width: 100%;
                            text-align: center;
                            margin-bottom: 8px;
                        "
                    >
                        <p>Смена пароля</p>
                        <v-text-field
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            dense
                            clearable
                            label="Нынешний пароль"
                            v-model="oldPass"
                            style="margin: auto 20px"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                            dense
                            clearable
                            label="Новый пароль"
                            v-model="newPass"
                            style="margin: auto 20px"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show3 ? 'text' : 'password'"
                            @click:append="show3 = !show3"
                            dense
                            clearable
                            label="Повторите пароль"
                            v-model="newPassRepeat"
                            style="margin: auto 20px"
                        ></v-text-field>
                    </div>
                    <div
                        style="
                            width: 100%;
                            text-align: center;
                            margin-bottom: 8px;
                        "
                    >
                        <p>Начальная страница</p>
                        <v-select
                            dense
                            :items="items"
                            v-model="select"
                            item-text="partitionMenu"
                            item-value="partitionMenuProps"
                            return-object
                            style="margin: auto 20px"
                        ></v-select>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="saveChanges()"
                        color="error"
                        style="width: 100%"
                        >Сохранить</v-btn
                    >
                </v-card>
            </v-col>

            <v-col cols="12" sm="8">
                <v-card class="partition">
                    <p
                        style="
                            width: 100%;
                            margin: 16px;
                            font-size: 1.3em;
                            text-align: center;
                        "
                    >
                        Подробная информация
                    </p>
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            height: 100%;
                        "
                    >
                        <div
                            style="
                                width: 100%;
                                height: 100%;
                                padding: 0px 16px;
                                display: flex !important;
                                flex-direction: column;
                                text-align: left !important;
                            "
                        >
                            <div style="width: 100%; padding: 10px 15px">
                                Возраст: {{ userData.age }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Дата рождения: {{ userData.birthday }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Пол: {{ userData.sex }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Образование: {{ userData.quality }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Должность: {{ userData.post }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Опыт работы: {{ userData.experience }} лет
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                З/П: {{ userData.salary }} ₽
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                E-mail: {{ userData.email }}
                            </div>
                            <div style="width: 100%; padding: 10px 15px">
                                Телефон: {{ userData.phone }}
                            </div>
                            <v-select
                                v-if="userData.userGroups"
                                v-model="userData.userGroups"
                                :items="userData.userGroups"
                                label="Группы пользователей"
                                multiple
                                chips
                                outlined
                                readonly
                                style="width: 100%; padding: 10px 15px"
                            >
                            </v-select>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="changesSuccess" :timeout="timeout" color="success"
            >Изменения успешно сохранены.</v-snackbar
        >
        <v-snackbar v-model="passwordsNotSimilar" :timeout="timeout" color="red"
            >Пароли не совпадают.</v-snackbar
        >
        <v-snackbar v-model="oldPassBad" :timeout="timeout" color="red"
            >Введён неверный старый пароль.</v-snackbar
        >
    </div>
</template>

<script>
import { useFileDialog } from "@vueuse/core";

export default {
    name: "forMe",

    data() {
        return {
            userData: {},
            select: "",
            oldPass: "",
            newPass: "",
            newPassRepeat: "",
            show1: false,
            show2: false,
            show3: false,
            timeout: 2000,
            changesSuccess: false,
            passwordsNotSimilar: false,
            oldPassBad: false,
            items: [
                { partitionMenu: "Сотрудники", partitionMenuProps: "staff" },
                {
                    partitionMenu: "Группы сотрудников",
                    partitionMenuProps: "staffGroups",
                },
                { partitionMenu: "Заказы", partitionMenuProps: "orders" },
                {
                    partitionMenu: "Публикации",
                    partitionMenuProps: "publications",
                },
                { partitionMenu: "Личный кабинет", partitionMenuProps: "me" },
            ],
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
            if (response.status !== 200) {
                throw response.error;
            } else {
                const jsonBody = await response.json();

                this.userData = {
                    age: jsonBody.data.age,
                    birthday: jsonBody.data.birthday,
                    sex: jsonBody.data.sex,
                    quality: jsonBody.data.quality,
                    post: jsonBody.data.post,
                    experience: jsonBody.data.experience,
                    salary: jsonBody.data.salary,
                    email: jsonBody.data.email,
                    phone: jsonBody.data.phone,
                    userGroups: jsonBody.data.userGroups,
                    lastname: jsonBody.data.lastname,
                    firstname: jsonBody.data.firstname,
                    middlename: jsonBody.data.middlename,
                    mainPage: jsonBody.data.mainPage,
                    login: jsonBody.data.login,
                    img: jsonBody.data.img,
                };
            }
        });

        const mainPageName = this.userData.mainPage.slice(1);
        this.select = this.items.find(
            (item) => item.partitionMenuProps === mainPageName
        );
    },

    methods: {
        async saveChanges() {
            if (this.newPass === this.newPassRepeat) {
                const url = `/internal/user/update_my`;
                const query = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.$store.state.authToken,
                    },
                    body: JSON.stringify({
                        mainPage: `/${this.select.partitionMenuProps}`,
                        oldPassword: this.oldPass,
                        newPassword: this.newPass,
                    }),
                };

                await fetch(url, query).then(async (response) => {
                    if (response.status !== 200) {
                        this.oldPassBad = true;
                    } else {
                        const jsonBody = await response.json();
                        this.oldPass = "";
                        this.newPass = "";
                        this.newPassRepeat = "";
                        this.changesSuccess = true;
                    }
                });
            } else {
                this.passwordsNotSimilar = true;
            }
        },

        openFileDialog() {
            const { files, open, reset, onChange } = useFileDialog({
                accept: "image/*",
                directory: false,
                multiple: false,
            });

            open();

            onChange((files) => {
                if (files.length) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        let formData = new FormData();
                        formData.append("image", files[0]);
                        this.queryImageResize(formData);
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        queryImageResize(formData) {
            const url = "/internal/user/image";
            const query = {
                method: "POST",
                headers: { Authorization: this.$store.state.authToken },
                body: formData,
            };

            fetch(url, query).then(async (response) => {
                const bodyJson = await response.json();
                this.userData.img = bodyJson.data.imageName;

                // const blob = await response.blob()
                // this.newPlan = URL.createObjectURL(blob)
            });
        },
    },
};
</script>

<style scoped>
.partition {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.v-avatar {
    transition: opacity 0.4s ease-in-out;
}

.v-avatar:hover {
    opacity: 0.6;
}

.show-btns {
    color: rgba(255, 255, 255, 1) !important;
}
</style>
