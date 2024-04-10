<template>
    <div style="display: flex; width: 100%; height: 100%; flex-direction: column;">
        <div style="display: flex; flex-wrap: nowrap; height: 48px">
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
                :items="staffGroupsForView"
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
        <v-dialog v-model="dialogUpdate" max-width="600px">
            <v-container style="background-color: white; padding: 20px 30px;">
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
                        <div v-for="(accessRight, index) in updatingItem.access_rights" :key="index">
                            <v-checkbox
                                v-model="accessRight.is"
                                :label="accessRight.name"
                                @click.stop
                            ></v-checkbox>
                        </div>
                    </div>

                    <div style="width: 100%; display: flex; flex-direction: row; margin: 25px 0px 0px;">
                        <v-spacer></v-spacer>
                        <v-btn color="grey" style="color: white; margin-right: 40px;" @click="cancelUpdates">
                            Отменить
                        </v-btn>
                        <v-btn color="#4CAF50" style="color: white;" @click="saveUpdates">
                            Сохранить
                        </v-btn>
                        <v-spacer></v-spacer>
                    </div>
                </div>
            </v-container>
        </v-dialog>
        <v-dialog v-model="dialogCreate" max-width="600px">
            <v-container style="background-color: white; padding: 20px 30px;">
                <div>
                    <v-text-field
                        required
                        label="Название группы"
                        v-model="newGroupTitle"
                    ></v-text-field>
                    <v-text-field
                        required
                        label="Краткое описание"
                        v-model="newGroupDescription"
                    ></v-text-field>
                    <div>
                        <v-checkbox
                            v-model="seeStaff"
                            :label="checkboxesLabels.seeStaff"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="seeStaffGroups"
                            :label="checkboxesLabels.seeStaffGroups"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="seeOrders"
                            :label="checkboxesLabels.seeOrders"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="seePublications"
                            :label="checkboxesLabels.seePublications"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="updateStaff"
                            :label="checkboxesLabels.updateStaff"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="updateStaffGroups"
                            :label="checkboxesLabels.updateStaffGroups"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="updateOrders"
                            :label="checkboxesLabels.updateOrders"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="updatePublications"
                            :label="checkboxesLabels.updatePublications"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="changeAuthData"
                            :label="checkboxesLabels.changeAuthData"
                            @click.stop
                        ></v-checkbox>
                        <v-checkbox
                            v-model="writePublications"
                            :label="checkboxesLabels.writePublications"
                            @click.stop
                        ></v-checkbox>
                    </div>

                    <div style="width: 100%; display: flex; flex-direction: row; margin: 25px 0px 0px;">
                        <v-spacer></v-spacer>
                        <v-btn color="grey" style="color: white; margin-right: 40px;" @click="dialogCreate = false">
                            Отменить
                        </v-btn>
                        <v-btn color="#4CAF50" style="color: white;" @click="saveCreate">
                            Сохранить
                        </v-btn>
                        <v-spacer></v-spacer>
                    </div>
                </div>
            </v-container>
        </v-dialog>
        <v-snackbar v-model="changesSaved" timeout="2000" color="success">Изменения успешно сохранены.</v-snackbar>
    </div>
</template>

<script>
    import staffGroups_test from '../staffGroups_test'

    export default {
        name: 'forStaff',

        data() {
            return {
                staffGroups: staffGroups_test,
                dataTableHeaders: [
                    { text: '', value: 'empty', sortable: false },
                    { text: 'ID', align: 'start', value: 'id' },
                    { text: 'Название', align: 'start', value: 'title' },
                    { text: 'Краткое описание', align: 'start', value: 'description', sortable: false }
                ],
                staffGroupsForView: [],
                dialogUpdate: false,
                dialogCreate: false,
                updatingItem: {},
                creatingItem: {},
                checkboxesLabels: {
                    seeStaff: 'Просматривать "Сотрудники"',
                    seeStaffGroups: 'Просматривать "Группы сотрудников"',
                    seeOrders: 'Просматривать "Заказы"',
                    seePublications: 'Просматривать "Публикации"',
                    updateStaff: 'Редактировать "Сотрудники"',
                    updateStaffGroups: 'Редактировать "Группы сотрудников"',
                    updateOrders: 'Редактировать "Заказы"',
                    updatePublications: 'Редактировать "Публикации"',
                    changeAuthData: 'Изменять данные аутентификации пользователя',
                    writePublications: 'Добавлять публикации',
                },
                newGroupTitle: '',
                newGroupDescription: '',
                seeStaff: '',
                seeStaffGroups: '',
                seeOrders: '',
                seePublications: '',
                updateStaff: '',
                updateStaffGroups: '',
                updateOrders: '',
                updatePublications: '',
                changeAuthData: '',
                writePublications: '',
                changesSaved: false
            }
        },

        created() {
            this.staffGroups.map((oneStaffGroup) => {
                let staffGroupObject = {}

                staffGroupObject['id'] = oneStaffGroup.id
                staffGroupObject['title'] = oneStaffGroup.title
                staffGroupObject['description'] = oneStaffGroup.description
                staffGroupObject['isSelected'] = false

                this.staffGroupsForView.push(staffGroupObject)
            })
        },

        methods: {
            openDialogUpdate(item) {
                for (let i = 0; i < this.staffGroups.length; i++) {
                    if (this.staffGroups[i].id === item.id) {
                        this.updatingItem = this.staffGroups[i]
                    }
                }

                console.log(this.updatingItem)

                this.dialogUpdate = true
            },

            openDialogCreate() {
                this.dialogCreate = true
            },

            removeUsers() {
                this.staffGroupsForView = this.staffGroupsForView.filter(user => !user.isSelected)
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