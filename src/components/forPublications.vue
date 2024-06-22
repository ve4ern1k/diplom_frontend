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
                @click="removePublications"
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
        <v-dialog v-model="dialogUpdate" max-width="1200px" persistent>
            <v-container
                style="
                    background-color: white;
                    padding: 30px 30px 20px;
                    max-width: 100%;
                "
            >
                <div>
                    <p style="font-size: 1.25em; text-align: center;">Общая информация</p>
                    <div style="display: flex; flex-wrap: wrap;">
                        <v-text-field
                            v-model="updatingItem.title"
                            label="Название"
                            required
                            class="textField"
                            style="width: 100% !important"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="updatingItem.date"
                            label="Дата публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="updatingItem.author"
                            label="Автор публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="updatingItem.lastUpdatesDate"
                            label="Дата последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="updatingItem.lastUpdatesAuthor"
                            label="Автор последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 24px; text-align: center;">
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
                                width: calc(100% - 82px);
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="updatingItem.image"
                                    :src="updatingItem.image"
                                    style="
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
                                            class="fixIcons"
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
                                        class="fixIcons"
                                    >
                                        mdi-image-edit-outline
                                    </v-icon>
                                </v-container>
                            </v-hover>
                        </div>
                        <div style="margin-left: 4px;">
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

                    <p style="font-size: 1.25em; margin-top: 48px; text-align: center;">
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
                                        margin-right: 4px;
                                        text-align: center;
                                    "
                                >
                                    Отсутствует состав публикации. Исправьте это, нажав на кнопку справа.
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
                                    @click.stop="
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

                <div class="buttonsBlock">
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
            <v-container
                style="
                    background-color: white;
                    padding: 30px 30px 20px;
                    max-width: 100%;
                "
            >
                <div>
                    <p style="font-size: 1.25em; text-align: center;">Общая информация</p>
                    <div style="display: flex; flex-wrap: wrap">
                        <v-text-field
                            v-model="creatingItem.title"
                            label="Название"
                            required
                            class="textField"
                            style="width: 100% !important"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="creatingItem.date"
                            label="Дата публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="creatingItem.author"
                            label="Автор публикации"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="creatingItem.lastUpdatesDate"
                            label="Дата последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="creatingItem.lastUpdatesAuthor"
                            label="Автор последних изменений"
                            required
                            :disabled="true"
                            class="textField"
                        >
                        </v-text-field>
                    </div>

                    <p style="font-size: 1.25em; margin-top: 24px; text-align: center;">
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
                                width: calc(100% - 82px);
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="creatingItem.image"
                                    :src="creatingItem.image"
                                    style="
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
                                            class="fixIcons"
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
                                        class="fixIcons"
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

                    <p style="font-size: 1.25em; margin-top: 48px; text-align: center;">
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
                                        margin-right: 4px;
                                        text-align: center;
                                    "
                                >
                                    Отсутствует состав публикации. Исправьте это, нажав на кнопку справа.
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
                                    @click.stop="
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

                <div class="buttonsBlock">
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
                                width: calc(100% - 82px);
                            "
                        >
                            <v-hover v-slot="{ hover }">
                                <v-img
                                    v-if="updateSectionContentPicture"
                                    :src="updateSectionContentPicture"
                                    style="
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
                                            class="fixIcons"
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
                                        class="fixIcons"
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

                <div class="buttonsBlock">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        style="color: white"
                        @click="removeSection"
                        class="sectionButton"
                    >
                        Удалить
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey"
                        style="color: white"
                        @click="dialogSection = false"
                        class="sectionButton"
                    >
                        Отменить
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#4CAF50"
                        style="color: white"
                        @click="saveSection"
                        class="sectionButton"
                    >
                        Сохранить
                    </v-btn>
                    <v-spacer></v-spacer>
                </div>
            </v-container>
        </v-dialog>
        <v-snackbar v-model="changesSaved" timeout="2000" color="success"
            >Изменения успешно сохранены.</v-snackbar
        >
        <v-snackbar v-model="newSectionExist" timeout="2000" color="error"
            >Сначала заполните уже созданный подзаголовок.</v-snackbar
        >
        <v-snackbar v-model="snackError" timeout="2000" color="red">{{
            snackErrorText
        }}</v-snackbar>
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
            snackError: false,
            snackErrorText: "",
            dialogCreate: false,
            creatingItem: {
                title: "",
                date: "",
                author: "",
                lastUpdatesDate: "",
                lastUpdatesAuthor: "",
                image: "",
                structure: [],
            },
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
            disableAll: false,
        };
    },

    async created() {
        const url = `/internal/publication/edit/all`;
        const query = {
            method: "GET",
            headers: {
                Authorization: this.$store.state.authToken,
            },
        };

        await fetch(url, query).then(async (response) => {
            const jsonBody = await response.json();
            if (!jsonBody.error) {
                this.publications = jsonBody.data;
                this.publications.map((el) => {
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
                        this.keyForUpdateImg++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        queryImageResize(formData) {
            const url = "/internal/publication/edit/image";
            const query = {
                method: "POST",
                headers: { Authorization: this.$store.state.authToken },
                body: formData,
            };

            fetch(url, query).then(async (response) => {
                const bodyJson = await response.json();
                this.creatingItem.image = `/media/${bodyJson.data.imageName}`;

                // const blob = await response.blob()
                // this.newPlan = URL.createObjectURL(blob)
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
                        let formData = new FormData();
                        formData.append("image", files[0]);
                        this.queryImageResizeUpdate(formData);
                        this.keyForUpdateImgUpdate++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        queryImageResizeUpdate(formData) {
            const url = "/internal/publication/edit/image";
            const query = {
                method: "POST",
                headers: { Authorization: this.$store.state.authToken },
                body: formData,
            };

            fetch(url, query).then(async (response) => {
                const bodyJson = await response.json();
                this.updatingItem.image = `/media/${bodyJson.data.imageName}`;

                // const blob = await response.blob()
                // this.newPlan = URL.createObjectURL(blob)
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
                        let formData = new FormData();
                        formData.append("image", files[0]);
                        this.queryImageResizeSection(formData);
                        this.keyForUpdateImgSection++;
                    };
                    reader.readAsDataURL(files[0]);
                }
            });
        },

        queryImageResizeSection(formData) {
            const url = "/internal/publication/edit/image";
            const query = {
                method: "POST",
                headers: { Authorization: this.$store.state.authToken },
                body: formData,
            };

            fetch(url, query).then(async (response) => {
                const bodyJson = await response.json();
                this.updateSectionContentPicture = `/media/${bodyJson.data.imageName}`;

                // const blob = await response.blob()
                // this.newPlan = URL.createObjectURL(blob)
            });
        },

        async openDialogCreate() {
            let lfmnames = "";
            const url = `/internal/user/my_info`;
            const query = {
                method: "GET",
                headers: {
                    Authorization: this.$store.state.authToken,
                },
            };

            await fetch(url, query).then(async (response) => {
                const jsonBody = await response.json();
                if (!jsonBody.error) {
                    lfmnames = `${jsonBody.data.lastname} ${jsonBody.data.firstname} ${jsonBody.data.middlename}`;
                } else {
                    this.snackErrorText = jsonBody.message;
                    this.snackError = true;
                    this.disableAll = true;
                }
            });

            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, "0");
            const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
            const year = currentDate.getFullYear();

            this.creatingItem.date = `${day}.${month}.${year}`;
            this.creatingItem.lastUpdatesDate = `${day}.${month}.${year}`;
            this.creatingItem.image = null;
            this.creatingItem.author = lfmnames;
            this.creatingItem.lastUpdatesAuthor = lfmnames;
            this.sectionsCreate = [];
            this.dialogCreate = true;
        },

        removeImg() {
            this.creatingItem.image = null;
        },

        async saveCreate() {
            if (this.creatingItem.image) {
                this.creatingItem["image"] = this.creatingItem.image.slice(
                    7,
                    this.creatingItem.image.length
                );
            }
            this.creatingItem.structure = this.sectionsCreate;

            const url = `/internal/publication/edit/create`;
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
                    this.dialogCreate = false;
                    this.changesSaved = true;
                    this.creatingItem = {};

                    const url = `/internal/publication/edit/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();
                        if (!jsonBody.error) {
                            this.publications = jsonBody.data;
                            this.publications.map((el) => {
                                this.$set(el, "isSelected", false);
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
        },

        async openDialogUpdate(item) {
            const url = `/internal/publication/edit/${item.id}`;
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
                    if (this.updatingItem.image) {
                        this.updatingItem[
                            "image"
                        ] = `/media/${this.updatingItem.image}`;
                    }
                    this.sectionsCreate = this.updatingItem.structure;
                    this.startSectionsStructure = [
                        ...this.updatingItem.structure,
                    ];

                    const url = `/internal/publication/edit/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();
                        if (!jsonBody.error) {
                            jsonBody.data.map((el) => {
                                if (el.id === this.updatingItem.id) {
                                    this.updatingItem["title"] = el.title;
                                }
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

            this.dialogUpdate = true;
        },

        removeImgUpdate() {
            this.updatingItem.image = null;
        },

        cancelUpdates() {
            this.dialogUpdate = false;
            this.updatingItem = {};
        },

        async saveUpdates() {
            if (this.updatingItem.image) {
                this.updatingItem["image"] = this.updatingItem.image.slice(
                    7,
                    this.updatingItem.image.length
                );
            }
            this.updatingItem.structure = this.sectionsCreate;

            const url = `/internal/publication/edit/update`;
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
                    const url = `/internal/publication/edit/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();
                        if (!jsonBody.error) {
                            this.publications = jsonBody.data;
                            this.publications.map((el) => {
                                this.$set(el, "isSelected", false);
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
                }
            });

            this.dialogUpdate = false;
            this.changesSaved = true;
            this.updatingItem = {};
        },

        async removePublications() {
            let arr = [];
            this.publications.map((el) => {
                if (el.isSelected) {
                    arr.push(el.id);
                }
            });

            const url = `/internal/publication/edit/delete`;
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
                    const url = `/internal/publication/edit/all`;
                    const query = {
                        method: "GET",
                        headers: {
                            Authorization: this.$store.state.authToken,
                        },
                    };

                    await fetch(url, query).then(async (response) => {
                        const jsonBody = await response.json();
                        if (!jsonBody.error) {
                            this.publications = jsonBody.data;
                            this.publications.map((el) => {
                                this.$set(el, "isSelected", false);
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
                }
            });

            this.publications.map((el) => {
                arr.map((el1) => {
                    if (el.id === el1) {
                        el.isSelected = false;
                    }
                });
            });
        },

        openSectionDialog(section, sectionIndex) {
            console.log("NOW SECTION:", section, sectionIndex);
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
            if (section.visible) {
                this.updateSectionVisible = section.visible;
            } else {
                this.updateSectionVisible = null;
            }
            if (section.body) {
                this.updateSectionContentText = section.body;
            } else {
                this.updateSectionContentText = null;
            }
            if (section.image) {
                this.updateSectionContentPicture = "/media/" + section.image;
            } else {
                this.updateSectionContentPicture = null;
            }

            this.dialogSection = true;
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
                    body: "",
                    image: "",
                });
            } else {
                this.newSectionExist = true;
            }
        },

        removeSection() {
            this.sectionsCreate.splice(this.updateSectionIndex, 1);

            this.dialogSection = false;
        },

        removeImgSection() {
            this.updateSectionContentPicture = "";
        },

        saveSection() {
            if (this.updateSectionTitle) {
                if (this.updateSectionContentPicture) {
                    this.updateSectionContentPicture =
                        this.updateSectionContentPicture.slice(
                            7,
                            this.updateSectionContentPicture.length
                        );
                }

                this.sectionsCreate[this.updateSectionIndex] = {
                    title: this.updateSectionTitle,
                    visible: this.updateSectionVisible,
                    body: this.updateSectionContentText,
                    image: this.updateSectionContentPicture,
                };

                this.dialogSection = false;
                this.changesSaved = true;
                this.updateSection = {};
            } else {
                this.snackErrorText =
                    "Подзаголовок обязательно должен иметь название.";
                this.snackError = true;
            }
        },

        colorSection(section) {
            if (section.title === "НОВЫЙ ПОДЗАГОЛОВОК") {
                return "section newSection";
            } else {
                if (section.visible) {
                    return "section visibleSection";
                } else {
                    return "section notVisibleSection";
                }
            }
        },
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
    background-color: #fe7161;
}

.buttonsBlock {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 25px 0px 0px;
    justify-content: space-evenly;
}

.fixIcons {
    color: #9e9e9e;
    margin: 50px;
    font-size: 100px;
}

@media screen and (max-width: 450px) {
    .buttonsBlock .v-btn {
        width: 100%;
        margin: 4px 0px !important;
    }

    .section {
        font-size: 1em;
    }

    .fixIcons {
        margin: 25px;
        font-size: 50px;
    }
}

@media screen and (max-width: 520px) {
    .buttonsBlock .sectionButton {
        width: 100%;
        margin: 4px 0px !important;
    }
}
</style>
