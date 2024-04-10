<template>
    <div style="display: flex; width: 100%; height: 100%; flex-direction: column;">
        <v-row dense style="flex-grow: 1;">
            <v-col cols="12" sm="12">
                <v-card class="partition">
                    <v-hover v-slot="{ hover }">
                        <v-avatar size="120">
                            <v-img v-if="newImg" :src="newImg">
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
                    <div style="margin-top: 15px; padding: 0px 10px; font-size: 1.5em; text-align: center;">
                        {{ userData[0].lastname }} {{ userData[0].firstname }} {{ userData[0].middlename }}
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row dense style="height: 473.36">
            <v-col cols="12" sm="4">
                <v-card class="partition">
                    <p style="width: 100%; text-align: center; font-size: 1.3em; margin: 16px;">Настройки</p>
                    <div style="width: 100%; text-align: center; margin-bottom: 8px;">
                        <p>Смена пароля</p>
                        <v-text-field
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            dense
                            clearable
                            label="Нынешний пароль"
                            v-model="oldPass"
                            style="margin: auto 20px;"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                            dense
                            clearable
                            label="Новый пароль"
                            v-model="newPass"
                            style="margin: auto 20px;"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show3 ? 'text' : 'password'"
                            @click:append="show3 = !show3"
                            dense
                            clearable
                            label="Повторите пароль"
                            v-model="newPassRepeat"
                            style="margin: auto 20px;"
                        ></v-text-field>
                    </div>
                    <div style="width: 100%; text-align: center; margin-bottom: 8px;">
                        <p>Начальная страница</p>
                        <v-select
                            dense
                            :items="items"
                            v-model="select"
                            item-text="partitionMenu"
                            item-value="partitionMenuProps"
                            return-object
                            style="margin: auto 20px;"
                        ></v-select>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn @click="saveChanges()" color="error" style="width: 100%;">Сохранить</v-btn>
                </v-card>
            </v-col>
            
            <v-col cols="12" sm="8">
                <v-card class="partition">
                    <p style="width: 100%; margin: 16px; font-size: 1.3em; text-align: center;">
                        Подробная информация
                    </p>
                    <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
                        <div style="width: 100%; height: 100%; max-height: 430.1px; padding: 0px 16px; display: flex !important; flex-direction: column; flex-wrap: wrap !important; text-align: left !important;">
                            <div style="width: auto; margin: 10px 15px;">
                                Возраст: {{ userData[0].age }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Дата рождения: {{ userData[0].birthday }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Пол: {{ userData[0].sex }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Образование: {{ userData[0].quality }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Должность: {{ userData[0].post }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Опыт работы: {{ userData[0].experience }} лет
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                З/П: {{ userData[0].salary }} ₽
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                E-mail: {{ userData[0].email }}
                            </div>
                            <div style="width: auto; margin: 10px 15px;">
                                Телефон: {{ userData[0].phone }}
                            </div>
                            <v-expansion-panels v-if="userData[0].userGroups" v-model="panel" style="width: auto; margin: 10px 15px;">
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Группы пользователей</v-expansion-panel-header>
                                    <v-expansion-panel-content style="margin-top: 5px;" v-for="(oneGroup, index) in userData[0].userGroups" :key="index">
                                        {{ oneGroup }}
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="changesSuccess" :timeout="timeout" color="success">Изменения успешно сохранены.</v-snackbar>
    </div>
</template>

<script>
    import userData from '../userData_test.js'
    import userData_test from '../userData_test.js'
    import userSettings_test from '../userSettings_test'
    import { useFileDialog } from '@vueuse/core'

    export default {
        name: 'forMe',

        data() {
            return {
                userData: userData_test,
                userSettings: userSettings_test,
                newImg: userData[0].img,
                select: null,
                oldPass: '',
                newPass: '',
                newPassRepeat: '',
                show1: false,
                show2: false,
                show3: false,
                panel: [0, 1],
                timeout: 2000,
                changesSuccess: false,
                items: [
                    { partitionMenu: 'Сотрудники', partitionMenuProps: 'staff' },
                    { partitionMenu: 'Группы сотрудников', partitionMenuProps: 'staffGroups' },
                    { partitionMenu: 'Заказы', partitionMenuProps: 'orders' },
                    { partitionMenu: 'Публикации', partitionMenuProps: 'publications' }
                ],
            }
        },

        created() {
            this.select = this.items.find(item => item.partitionMenu === this.userSettings.startPage);
        },

        methods: {
            saveChanges() {
                this.changesSuccess = true
            },

            openFileDialog() {
                const { files, open, reset, onChange } = useFileDialog({
                    accept: 'image/*',
                    directory: false,
                    multiple: false
                })

                open()

                onChange((files) => {
                    if (files.length) {
                        const reader = new FileReader()
                        reader.onload = () => {
                            this.newImg = reader.result
                        }
                        reader.readAsDataURL(files[0])
                    }
                })
            },
        },
    }
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
  transition: opacity .4s ease-in-out;
}

.v-avatar:hover {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

</style>