<template style="display: flex; height: 100%; width: 100%; margin: 0; padding: 0">
    <div style="display: flex; flex-direction: column; width: 100%; min-height: 100%;">
        <v-app-bar color="#163179" dark elevation="4" class="header-main">
            <v-spacer></v-spacer>
            <v-toolbar-title>Комбинат Братскжелезобетон</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <div style="display: flex; flex-direction: column; align-items: center; height: 30%; width: 40%; margin: auto; padding: 2px; background: linear-gradient(30deg, #163179, #0F2254); border-radius: 20px;">
                <p style="font-size: 1.3em; color: #FFFFFF; margin-top: 16px;">Авторизация</p>
    
                <v-form style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; padding: 20px 20px; background-color: #FFFFFF; border-radius: 18px;" v-model="valid" lazy-validation>
                    <v-text-field
                        class="text-field"
                        v-model="login"
                        label="Логин"
                        :rules="rules"
                        required
                    ></v-text-field>
                    <v-text-field
                        class="text-field"
                        v-model="password"
                        label="Пароль"
                        :rules="rules"
                        required
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-btn
                        color="#11255C"
                        style="color: #FFFFFF"
                        @click="checkAuth"
                    >
                        Войти
                    </v-btn>
                </v-form>
            </div>
        </div>

        <v-snackbar v-model="noUser" :timeout="2000" color="error">Пользователь не найден. Проверьте введённые данные.</v-snackbar>
        <v-snackbar v-model="noData" :timeout="2000" color="error">Убедитесь, что все поля заполнены.</v-snackbar>
    </div>
</template>

<script>
    import userData from '../userData_test.js'
    import userSettings from '@/userSettings_test'

    export default {
        name: 'authorization',
        
        data() {
            return {
                valid: true,
                login: '',
                password: '',
                show: false,
                rules: [ input => !input ? 'Поле обязательно для заполнения' : true ],
                noUser: false,
                noData: false
            }
        },

        methods: {
            checkAuth() {
                this.$store.commit('setAuth', false)
                if (this.login && this.password) {
                    userData.map(user => {
                        if (user.login === this.login && user.password === this.password) {
                            this.$store.commit('setAuth', true)
                        }
                    })
                    if (this.$store.state.auth) {
                        this.$router.push({ name: `${userSettings.startPageRouter}` })
                    }
                    else {
                        this.noUser = true
                    }
                }
                else {
                    this.noData = true
                }
            }
        }
    }
</script>

<style scoped>

.header-main {
    padding: 0px 10px;
    background: linear-gradient(30deg, #163179, #0F2254);
}

.text-field {
    width: 100%;
}

</style>