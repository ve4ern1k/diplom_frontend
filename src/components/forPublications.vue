<template>
    <div style="display: flex; width: 100%; height: 100%; flex-direction: column">
        <div style="display: flex; flex-wrap: nowrap">
            <v-text-field
                solo
                label="Поиск"
                v-model="search"
                :append-icon="'mdi-magnify'"
                hide-details
                single-line
                style="display: flex; flex-grow: 18; margin-right: 5px"
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
            >
                <v-icon style="margin-right: 3px">mdi-plus</v-icon>
                Добавить
            </v-btn>
            <v-btn
                @click="removePublications"
                color="red"
                style="
                    color: white;
                    display: flex;
                    flex-grow: 1;
                    height: 100%;
                    margin-left: 5px;
                "
            >
                <v-icon style="margin-right: 3px">mdi-cancel</v-icon>
                Удалить
            </v-btn>
        </div>
        <div style="height: 100%; width: 100%; padding-top: 10px">
            <v-data-table
                :headers="dataTableHeaders"
                :items="publications"
                :search="search"
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
                            @dblclick.stop="openDialogUpdate(item)"
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
            max-width="1200px"
            persistent
        >
            <v-container style="background-color: white; padding: 30px 30px 20px; max-width: 100%;">
                <div
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    "
                >
                    <p style="font-size: 1.25em">Общая информация</p>
                    <div style="display: flex; flex-wrap: wrap">
                        <v-text-field
                            v-model="publicationTitleUpdate"
                            label="Название"
                            required
                            class="textField"
                            style="width: 100% !important"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationDateUpdate"
                            label="Дата публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationAuthorUpdate"
                            label="Автор публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationLastUpdatesDateUpdate"
                            label="Дата последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationLastUpdatesAuthorUpdate"
                            label="Автор последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 24px">
                        Изображение публикации
                    </p>
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            width: 100%;
                            text-align: center;
                        "
                        :key="keyForUpdateImgUpdate"
                    >
                        <div
                            style="
                                display: flex;
                                justify-content: center;
                                width: 100%;
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="newImgUpdate"
                                    :src="newImgUpdate"
                                    style="
                                        max-width: 1000px;
                                        border-radius: 15px;
                                    "
                                    contain
                                >
                                    <v-container
                                        class="imgFieldExist"
                                        @click="openFileDialogUpdate"
                                    >
                                        <v-icon
                                            :class="{ 'show-btns': hover }"
                                            color="rgba(255, 255, 255, 0)"
                                            style="color: #9e9e9e; margin: 50px"
                                            size="100"
                                        >
                                            mdi-image-edit-outline
                                        </v-icon>
                                    </v-container>
                                </v-img>
                                <v-container
                                    v-else
                                    class="imgField"
                                    @click="openFileDialogUpdate"
                                >
                                    <v-icon
                                        :class="{ 'show-btns': hover }"
                                        style="color: #9e9e9e; margin: 50px"
                                        size="100"
                                    >
                                        mdi-image-edit-outline
                                    </v-icon>
                                </v-container>
                            </v-hover>
                        </div>
                        <div style="margin-left: 4px">
                            <v-btn
                                @click="removeImgUpdate"
                                color="red"
                                style="height: 100%; color: white"
                            >
                                <v-icon size="50" outlined>
                                    mdi-trash-can-outline
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 48px">
                        Подзаголовки и состав
                    </p>
                    <div
                        style="display: flex; flex-direction: row; width: 100%"
                    >
                        <div
                            style="
                                width: 100%;
                                display: flex;
                                justify-content: center;
                                margin-right: 2px;
                            "
                        >
                            <div
                                v-if="!sectionsCreate.length"
                                style="
                                    width: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                            >
                                <p
                                    style="
                                        margin-bottom: 0px !important;
                                        font-size: 1.2em;
                                    "
                                >
                                    Отсутствует состав публикации. Исправьте
                                    это, нажав на кнопку справа.
                                </p>
                            </div>
                            <draggable
                                v-else
                                v-model="sectionsCreate"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                                style="width: 100%"
                            >
                                <div
                                    v-for="(section, index) in sectionsCreate"
                                    :key="index"
                                    :class="colorSection(section)"
                                    @dblclick.stop="
                                        openSectionDialog(section, index)
                                    "
                                >
                                    {{ section.title }}
                                </div>
                            </draggable>
                        </div>
                        <div style="margin-left: 2px">
                            <v-btn
                                @click="addSection"
                                color="success"
                                style="height: 100%"
                            >
                                <v-icon size="50" outlined> mdi-plus </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div
                    style="
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        margin: 25px 0px 0px;
                    "
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
            </v-container>
        </v-dialog>
        <v-dialog
            v-model="dialogCreate"
            max-width="1200px !important"
            persistent
        >
            <v-container style="background-color: white; padding: 30px 30px 20px; max-width: 100%;">
                <div
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    "
                >
                    <p style="font-size: 1.25em">Общая информация</p>
                    <div style="display: flex; flex-wrap: wrap">
                        <v-text-field
                            v-model="publicationTitle"
                            label="Название"
                            required
                            class="textField"
                            style="width: 100% !important"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationDate"
                            label="Дата публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationAuthor"
                            label="Автор публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationLastUpdatesDate"
                            label="Дата последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="publicationLastUpdatesAuthor"
                            label="Автор последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 24px">
                        Изображение публикации
                    </p>
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            width: 100%;
                            text-align: center;
                        "
                        :key="keyForUpdateImg"
                    >
                        <div
                            style="
                                display: flex;
                                justify-content: center;
                                width: 100%;
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="newImg"
                                    :src="newImg"
                                    style="
                                        max-width: 1000px;
                                        border-radius: 15px;
                                    "
                                    contain
                                >
                                    <v-container
                                        class="imgFieldExist"
                                        @click="openFileDialog"
                                    >
                                        <v-icon
                                            :class="{ 'show-btns': hover }"
                                            color="rgba(255, 255, 255, 0)"
                                            style="color: #9e9e9e; margin: 50px"
                                            size="100"
                                        >
                                            mdi-image-edit-outline
                                        </v-icon>
                                    </v-container>
                                </v-img>
                                <v-container
                                    v-else
                                    class="imgField"
                                    @click="openFileDialog"
                                >
                                    <v-icon
                                        :class="{ 'show-btns': hover }"
                                        style="color: #9e9e9e; margin: 50px"
                                        size="100"
                                    >
                                        mdi-image-edit-outline
                                    </v-icon>
                                </v-container>
                            </v-hover>
                        </div>
                        <div style="margin-left: 4px">
                            <v-btn
                                @click="removeImg"
                                color="red"
                                style="height: 100%; color: white"
                            >
                                <v-icon size="50" outlined>
                                    mdi-trash-can-outline
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 48px">
                        Подзаголовки и состав
                    </p>
                    <div
                        style="display: flex; flex-direction: row; width: 100%"
                    >
                        <div
                            style="
                                width: 100%;
                                display: flex;
                                justify-content: center;
                                margin-right: 2px;
                            "
                        >
                            <div
                                v-if="!sectionsCreate.length"
                                style="
                                    width: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                            >
                                <p
                                    style="
                                        margin-bottom: 0px !important;
                                        font-size: 1.2em;
                                    "
                                >
                                    Отсутствует состав публикации. Исправьте
                                    это, нажав на кнопку справа.
                                </p>
                            </div>
                            <draggable
                                v-else
                                v-model="sectionsCreate"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                                style="width: 100%"
                            >
                                <div
                                    v-for="(section, index) in sectionsCreate"
                                    :key="index"
                                    :class="colorSection(section)"
                                    @dblclick.stop="
                                        openSectionDialog(section, index)
                                    "
                                >
                                    {{ section.title }}
                                </div>
                            </draggable>
                        </div>
                        <div style="margin-left: 2px">
                            <v-btn
                                @click="addSection"
                                color="success"
                                style="height: 100%"
                            >
                                <v-icon size="50" outlined> mdi-plus </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div
                    style="
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        margin: 25px 0px 0px;
                    "
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey"
                        style="color: white; margin-right: 40px"
                        @click="dialogCreate = false"
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
                    <v-spacer></v-spacer>
                </div>
            </v-container>
        </v-dialog>
        <v-dialog
            v-model="dialogSection"
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
                <div
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    "
                >
                    <div style="display: flex; width: 100%">
                        <v-text-field
                            v-model="updateSectionTitle"
                            label="Название подзаголовка"
                            required
                            style="width: 100% !important"
                        >
                        </v-text-field>

                        <v-checkbox v-model="updateSectionVisible">
                            <template v-slot:label>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on"
                                            >mdi-help-circle</v-icon
                                        >
                                    </template>
                                    <span
                                        >Указанный вами подзаголовок будет
                                        отображаться в итоговой
                                        публикации.</span
                                    >
                                </v-tooltip>
                            </template>
                        </v-checkbox>
                    </div>

                    <v-textarea
                        v-model="updateSectionContentText"
                        label="Контент подзаголовка"
                        rows="7"
                        counter
                        outlined
                        style="width: 100%"
                    >
                    </v-textarea>

                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            width: 100%;
                            text-align: center;
                        "
                        :key="keyForUpdateImgSection"
                    >
                        <div
                            style="
                                display: flex;
                                justify-content: center;
                                width: 100%;
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="updateSectionContentPicture"
                                    :src="updateSectionContentPicture"
                                    style="
                                        max-width: 1000px;
                                        border-radius: 15px;
                                    "
                                    contain
                                >
                                    <v-container
                                        class="imgFieldExist"
                                        @click="openFileDialogSection"
                                    >
                                        <v-icon
                                            :class="{ 'show-btns': hover }"
                                            color="rgba(255, 255, 255, 0)"
                                            style="color: #9e9e9e; margin: 50px"
                                            size="100"
                                        >
                                            mdi-image-edit-outline
                                        </v-icon>
                                    </v-container>
                                </v-img>
                                <v-container
                                    v-else
                                    class="imgField"
                                    @click="openFileDialogSection"
                                >
                                    <v-icon
                                        :class="{ 'show-btns': hover }"
                                        style="color: #9e9e9e; margin: 50px"
                                        size="100"
                                    >
                                        mdi-image-edit-outline
                                    </v-icon>
                                </v-container>
                            </v-hover>
                        </div>
                        <div style="margin-left: 4px">
                            <v-btn
                                @click="removeImgSection"
                                color="red"
                                style="height: 100%; color: white"
                            >
                                <v-icon size="50" outlined>
                                    mdi-trash-can-outline
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div
                    style="
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-evenly;
                        margin: 25px 0px 0px;
                    "
                >
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        style="color: white"
                        @click="removeSection"
                    >
                        Удалить
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey"
                        style="color: white"
                        @click="dialogSection = false"
                    >
                        Отменить
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#4CAF50"
                        style="color: white"
                        @click="saveSection"
                    >
                        Сохранить
                    </v-btn>
                    <v-spacer></v-spacer>
                </div>
            </v-container>
        </v-dialog>
        <v-snackbar v-model="changesSaved" timeout="2000" color="success">Изменения успешно сохранены.</v-snackbar>
        <v-snackbar v-model="newSectionExist" timeout="2000" color="error">Сначала заполните уже созданный подзаголовок.</v-snackbar>
    </div>
</template>

<script>
import publicationsData_test from "../publicationsData_test";
import draggable from "vuedraggable";
import { useFileDialog } from "@vueuse/core";

export default {
    name: "forPublications",

    components: {
        draggable,
    },

    data() {
        return {
            drag: false,
            publicationsData: publicationsData_test,
            dataTableHeaders: [
                { text: "", value: "empty", sortable: false },
                { text: "ID", value: "id" },
                { text: "Название", value: "title" },
                { text: "Дата публикации", value: "date" },
                { text: "Автор", value: "author" },
                { text: "Последнее обновление", value: "lastUpdatesDate" },
            ],
            search: "",
            publications: [],
            dialogUpdate: false,
            updatingItem: {},
            publicationIdUpdate: null,
            changesSaved: false,
            newSectionExist: false,
            dialogCreate: false,
            creatingItem: {},
            publicationTitle: "",
            publicationTitleUpdate: '',
            publicationDate: "",
            publicationDateUpdate: '',
            publicationAuthor: "",
            publicationAuthorUpdate: '',
            publicationLastUpdatesDate: "",
            publicationLastUpdatesDateUpdate: '',
            publicationLastUpdatesAuthor: "",
            publicationLastUpdatesAuthorUpdate: '',
            newImg: "",
            newImgUpdate: '',
            keyForUpdateImg: null,
            keyForUpdateImgUpdate: null,
            sectionsCreate: [],
            startSectionsStructure: [],
            updateSection: {},
            updateSectionIndex: null,
            dialogSection: false,
            updateSectionTitle: "",
            updateSectionVisible: false,
            updateSectionContentText: "",
            updateSectionContentPicture: "",
            keyForUpdateImgSection: null,
        };
    },

    created() {
        this.publicationsData.map((onePublication) => {
            let publicationObject = {};

            publicationObject["id"] = onePublication.id;
            publicationObject["title"] = onePublication.title;
            publicationObject["date"] = onePublication.date;
            publicationObject["author"] = onePublication.author;
            publicationObject["lastUpdatesDate"] = onePublication.lastUpdatesDate;

            this.publications.push(publicationObject);
        });

        // const url = `/internal/publication/edit/all`;
        // const query = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': store.state.tokenAuth
        //     },
        // };

        // await fetch(url, query)
        //     .then(async (response) => {
        //         if (response.status !== 200) {
        //             throw response.error;
        //         }
        //         else {
        //             const jsonBody = await response.json();
        //             categories = jsonBody.data

        //             categories.map(el => {
        //                 if (el.name === 'Декоративные изделия') {
        //                     categoryId = el.id
        //                 }
        //             })
        //         }
        //     });
    },

    methods: {
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
                        this.newImg = reader.result;
                        this.keyForUpdateImg++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        openFileDialogUpdate() {
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
                        this.newImgUpdate = reader.result;
                        this.keyForUpdateImgUpdate++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        openFileDialogSection() {
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
                        this.updateSectionContentPicture = reader.result;
                        this.keyForUpdateImgSection++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        removeImg() {
            this.newImg = null;
        },

        removeImgUpdate() {
            this.newImgUpdate = null;
        },

        openDialogUpdate(item) {
            for (let i = 0; i < this.publicationsData.length; i++) {
                if (this.publicationsData[i].id === item.id) {
                    this.updatingItem = this.publicationsData[i];
                }
            }

            this.publicationIdUpdate = this.updatingItem.id;
            this.publicationTitleUpdate = this.updatingItem.title;
            this.publicationDateUpdate = this.updatingItem.date;
            this.publicationAuthorUpdate = this.updatingItem.author;
            this.publicationLastUpdatesDateUpdate = this.updatingItem.lastUpdatesDate;
            this.publicationLastUpdatesAuthorUpdate = this.updatingItem.lastUpdatesAuthor;
            this.newImgUpdate = this.updatingItem.picture;

            this.sectionsCreate = this.updatingItem.structure;
            this.startSectionsStructure = [...this.updatingItem.structure];

            this.dialogUpdate = true;
        },

        openDialogCreate() {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear();

            this.publicationDate = `${day}.${month}.${year}`;
            this.publicationLastUpdatesDate = `${day}.${month}.${year}`;
            this.newImg = null;
            this.sectionsCreate = [];
            this.dialogCreate = true;
        },

        removePublications() {
            this.publications = this.publications.filter(
                (publication) => !publication.isSelected
            );
        },

        cancelUpdates() {
            this.publicationsData.map(el => {
                if (el.id === this.publicationIdUpdate) {
                    el.structure = this.startSectionsStructure;
                }
            })

            this.dialogUpdate = false;
            this.updatingItem = {};
        },

        saveUpdates() {
            this.dialogUpdate = false;
            this.changesSaved = true;
            this.updatingItem = {};
        },

        saveCreate() {
            this.dialogCreate = false;
            this.changesSaved = true;
            this.creatingItem = {};
        },

        saveSection() {
            this.sectionsCreate[this.updateSectionIndex] = {
                title: this.updateSectionTitle,
                visible: this.updateSectionVisible,
                content: {
                    text: this.updateSectionContentText,
                    picture: this.updateSectionContentPicture,
                },
            };

            this.dialogSection = false;
            this.changesSaved = true;
            this.updateSection = {};
        },

        addSection() {
            let noNewSections = true;
            this.sectionsCreate.map((el) => {
                if (el.title === "НОВЫЙ ПОДЗАГОЛОВОК") {
                    noNewSections = !noNewSections;
                }
            });

            if (noNewSections) {
                this.sectionsCreate.push({
                    title: "НОВЫЙ ПОДЗАГОЛОВОК",
                    visible: false,
                    content: {
                        text: "",
                        picture: "",
                    },
                });
            } else {
                this.newSectionExist = true;
            }
        },

        openSectionDialog(section, sectionIndex) {
            this.updateSection = section;
            this.updateSectionIndex = sectionIndex;
            this.updateSectionTitle = null;
            this.updateSectionVisible = null;
            this.updateSectionContentText = null;
            this.updateSectionContentPicture = null;
            this.keyForUpdateImgSection++;

            this.updateSection = section;
            this.updateSectionIndex = sectionIndex;
            if (this.updateSection.title === "НОВЫЙ ПОДЗАГОЛОВОК") {
                this.updateSectionTitle = "";
            } else {
                this.updateSectionTitle = this.updateSection.title;
            }
            this.updateSectionVisible = this.updateSection.visible;
            this.updateSectionContentText = this.updateSection.content.text;
            this.updateSectionContentPicture =
                this.updateSection.content.picture;

            this.dialogSection = true;
        },

        removeSection() {
            this.sectionsCreate.splice(this.updateSectionIndex, 1);

            this.dialogSection = false;
        },

        removeImgSection() {
            this.updateSectionContentPicture = "";
        },

        colorSection(section) {
            if (section.title === 'НОВЫЙ ПОДЗАГОЛОВОК') {
                return 'section newSection'
            }
            else {
                if (section.visible) {
                    return 'section visibleSection'
                }
                else {
                    return 'section notVisibleSection'
                }
            }
        }
    },

    computed: {
        dragOptions() {
            return {
                animation: 200,
            };
        },
    },
};
</script>

<style scoped>

.textField {
    width: 450px;
    padding: 5px 10px;
}

.imgField {
    border: 8px dashed #9e9e9e;
    border-radius: 15px;
    background-color: white;
}

.imgFieldExist {
    border-radius: 15px;
    transition: opacity 0.4s ease-in-out;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.imgFieldExist:hover {
    opacity: 0.6;
    background-color: rgba(255, 255, 255, 1);
}

.show-btns {
    color: #797979 !important;
}

.sectionColumn {
    overflow-y: auto;
    height: 300px;
    width: 100%;
}

.section {
    background-color: #11255c;
    color: white;
    border-radius: 4px;
    width: 100%;
    font-size: 1.2em;
    padding: 5px;
    margin: 4px 0px;
    text-align: center;
}

.section:hover {
    cursor: pointer;
}

.newSection {
    background-color: #797979;
}

.visibleSection {
    background-color: #11255c;
}

.notVisibleSection {
    background-color: #FE7161;
}

</style>
