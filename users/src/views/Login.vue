<template>
    <div>
        <h2>Login</h2>

        <hr>
        <div class="columns is-centered">
            <div class="column is-half">

                <div v-if="error !== undefined">
                    
                    <div class="notification is-danger">
                        <p>{{error}}</p>
                    </div>
                </div>

                <p>Email: </p>
                <input type="email" placeholder="example@email.com" class="input" v-model="email">

                <p>Senha: </p>
                <input type="password" placeholder="*****" class="input" v-model="password">
                
                <hr>
                <button class="button is-primary" @click="logar">Logar</button>
            </div>
        </div>
            
    </div>
</template>

<script>
import axios from 'axios'

export default {
    
    data() {

        return {
            email: '',
            password: '',
            error: undefined
        }
    },
    methods: {
        logar() {

            axios.post("http://localhost:8686/login", {

               
                email: this.email,
                password: this.password

            }).then(res => {

                console.log(res)
                localStorage.setItem("token", res.data.token)
                this.$router.push({name: "Home"})
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }


}
</script>

<style scoped>

    .notification {
        margin-top: -50px;
        margin-bottom: 2rem;
    }
    h2 {
        font-size: 1.2rem;
        font-weight: 600;
    }
    div hr{
        margin-bottom: 4rem;
    }
    input {
        margin: 0.8rem 0;
    }
</style>