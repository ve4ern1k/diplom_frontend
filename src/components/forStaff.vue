<template>
    <div style="display: flex; width: 100%; height: 100%; flex-direction: column;">
        <div style="display: flex; flex-wrap: nowrap;">
            <v-text-field
                solo
                label="Поиск"
                v-model="search"
                :append-icon="'mdi-magnify'"
                hide-details
                single-line
                style="display: flex; flex-grow: 18; margin-right: 5px;"
            ></v-text-field>
            <v-btn @click="openDialogCreate" color="green" style="color: white; display: flex; flex-grow: 1; height: 100%; margin: 0px 5px;">
                <v-icon style="margin-right: 3px;">mdi-plus</v-icon>
                    Добавить
            </v-btn>
            <v-btn @click="removeUsers" color="red" style="color: white; display: flex; flex-grow: 1; height: 100%; margin-left: 5px;">
                <v-icon style="margin-right: 3px;">mdi-cancel</v-icon>
                    Удалить
            </v-btn>
        </div>
        <div style="height: 100%; width: 100%; padding-top: 10px;">
            <v-data-table
                :headers="dataTableHeaders"
                :items="users"
                :search="search"
                item-key="id"
                loading-text="Минуточку... Данные на подходе"
                class="elevation-1"
                style="max-height: 100%; width: 100%;"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                            <v-checkbox
                                v-model="item.isSelected"
                                @click.stop
                            ></v-checkbox>
                        </td>
                        <td v-for="(header, index) in dataTableHeaders" v-if="header.value !== 'empty'" :key="index" @dblclick.stop="openDialogUpdate(item)">
                            {{ item[header.value] }}
                        </td>
                    </tr>
                </template>
                <template v-slot:no-data>
                    <v-alert :value="true" dense style="margin-top: 16px; color: #666666">
                        Всё куда-то пропало... Обратитесь куда-нибудь
                    </v-alert>
                </template>
            </v-data-table>
        </div>
        <v-dialog v-model="dialogUpdate" persistent>
            <v-stepper v-model="pageDialogUpdate">
                <v-stepper-header>
                    <v-stepper-step
                        :complete="pageDialogUpdate > 1"
                        step="1"
                    >
                        Личная информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="pageDialogUpdate > 2"
                        step="2"
                    >
                        Рабочая информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Контакты
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Фамилия"
                                            v-model="updatingItem.lastname"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Имя"
                                            v-model="updatingItem.firstname"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Отчество"
                                            v-model="updatingItem.middlename"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Возраст"
                                            v-model="updatingItem.age"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Дата рождения"
                                            v-model="updatingItem.birthday"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-select
                                            required
                                            :items="sexCases"
                                            label="Пол"
                                            v-model="updatingItem.sex"
                                        ></v-select>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Образование"
                                            v-model="updatingItem.quality"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 2"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="cancelUpdates">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveUpdates">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Должность"
                                            v-model="updatingItem.post"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Опыт работы"
                                            v-model="updatingItem.experience"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="З/П"
                                            v-model="updatingItem.salary"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-select
                                            required
                                            v-model="updatingItem.userGroups"
                                            label="Группы пользователей"
                                            :items="['Админ', 'Модератор сайта']"
                                            filled
                                            chips
                                            multiple
                                        ></v-select>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 3"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="cancelUpdates">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveUpdates">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="E-mail"
                                            v-model="updatingItem.email"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Телефон"
                                            v-model="updatingItem.phone"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogUpdate = 1"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="cancelUpdates">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveUpdates">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <v-dialog v-model="dialogCreate" persistent>
            <v-stepper v-model="pageDialogCreate">
                <v-stepper-header>
                    <v-stepper-step
                        :complete="pageDialogCreate > 1"
                        step="1"
                    >
                        Личная информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="pageDialogCreate > 2"
                        step="2"
                    >
                        Рабочая информация
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Контакты
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Фамилия"
                                            v-model="newUserLastname"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Имя"
                                            v-model="newUserFirstname"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Отчество"
                                            v-model="newUserMiddlename"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Возраст"
                                            v-model="newUserAge"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Дата рождения"
                                            v-model="newUserBirthday"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-select
                                            required
                                            :items="sexCases"
                                            label="Пол"
                                            v-model="newUserSex"
                                        ></v-select>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Образование"
                                            v-model="newUserQuality"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 2"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="dialogCreate = false">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveCreate">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Должность"
                                            v-model="newUserPost"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Опыт работы"
                                            v-model="newUserExperience"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="З/П"
                                            v-model="newUserSalary"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-select
                                            required
                                            v-model="newUserUserGroups"
                                            label="Группы пользователей"
                                            :items="['Админ', 'Модератор сайта']"
                                            filled
                                            chips
                                            multiple
                                        ></v-select>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 3"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="dialogCreate = false">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveCreate">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card style="height: 280px; box-shadow: none !important;">
                            <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
                                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;">
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="E-mail"
                                            v-model="newUserEmail"
                                        ></v-text-field>
                                    </div>
                                    <div style="width: auto; margin: 0px 15px">
                                        <v-text-field
                                            required
                                            label="Телефон"
                                            v-model="newUserPhone"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </v-card>

                        <div style="width: 100%; display: flex; flex-direction: row; margin: 5px 0px;">
                            <v-btn
                                color="primary"
                                @click="pageDialogCreate = 1"
                            >
                                Далее
                            </v-btn>
    
                            <v-spacer></v-spacer>
    
                            <v-btn color="grey" style="color: white; margin-right: 10px;" @click="dialogCreate = false">
                                Отменить
                            </v-btn>
                            <v-btn color="#4CAF50" style="color: white;" @click="saveCreate">
                                Сохранить
                            </v-btn>
                        </div>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <v-snackbar v-model="changesSaved" timeout="2000" color="success">Изменения успешно сохранены.</v-snackbar>
    </div>
</template>

<script>
    import userData_test from '../userData_test'

    export default {
        name: 'forStaff',

        data() {
            return {
                userData: userData_test,
                dataTableHeaders: [
                    { text: '', value: 'empty', sortable: false },
                    { text: 'ID', align: 'start', value: 'id' },
                    { text: 'ФИО', align: 'start', value: 'lfmnames' },
                    { text: 'Должность', value: 'post', sortable: false },
                    { text: 'З/П', value: 'salary' },
                    { text: 'Опыт работы (лет)', value: 'experience' },
                    { text: 'E-mail', value: 'email', sortable: false },
                    { text: 'Телефон', value: 'phone', sortable: false },
                ],
                users: [],
                search: '',
                dialogUpdate: false,
                dialogCreate: false,
                pageDialogUpdate: 1,
                pageDialogCreate: 1,
                updatingItem: {},
                creatingItem: {},
                sexCases: ['Мужчина', 'Женщина'],
                newUserLastname: '',
                newUserFirstname: '',
                newUserMiddlename: '',
                newUserAge: '',
                newUserBirthday: '',
                newUserSex: '',
                newUserQuality: '',
                newUserPost: '',
                newUserExperience: '',
                newUserSalary: '',
                newUserEmail: '',
                newUserPhone: '',
                newUserUserGroups: [],
                changesSaved: false
            }
        },

        created() {
            this.userData.map((oneUser) => {
                let userObject = {}

                userObject['id'] = oneUser.id
                userObject['lfmnames'] = `${oneUser.lastname} ${oneUser.firstname} ${oneUser.middlename}`
                userObject['post'] = oneUser.post
                userObject['salary'] = oneUser.salary
                userObject['experience'] = oneUser.experience
                userObject['email'] = oneUser.email
                userObject['phone'] = oneUser.phone
                userObject['isSelected'] = false

                this.users.push(userObject)
            })
        },

        methods: {
            openDialogUpdate(item) {
                this.pageDialogUpdate = 1

                for (let i = 0; i < this.userData.length; i++) {
                    if (this.userData[i].id === item.id) {
                        this.updatingItem = this.userData[i]
                    }
                }

                this.dialogUpdate = true
            },

            openDialogCreate() {
                this.pageDialogCreate = 1
                this.dialogCreate = true
            },

            removeUsers() {
                this.users = this.users.filter(user => !user.isSelected)
            },
            
            cancelUpdates() {
                this.dialogUpdate = false
                this.updatingItem = {}
            },

            saveUpdates() {
                this.dialogUpdate = false
                this.changesSaved = true
                this.updatingItem = {}
            },

            saveCreate() {
                this.dialogCreate = false
                this.changesSaved = true
                this.creatingItem = {}
            }
        }
    }
</script>

<style scoped>

</style>