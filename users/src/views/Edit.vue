<template>
  <div>
    <h2>Editar usuário</h2>

    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error !== undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>

        <p>Nome:</p>
        <input
          type="text"
          placeholder="Nome do usuário"
          class="input"
          v-model="name"
        />

        <p>Email:</p>
        <input
          type="email"
          placeholder="example@email.com"
          class="input"
          v-model="email"
        />

        <hr />
        <button class="button is-primary" @click="update">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("http://localhost:8686/user/" + this.$route.params.id, req)
      .then((res) => {
        console.log(res);

        this.name = res.data.name;
        this.email = res.data.email;
        this.id = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({ name: "Users" });
      });
  },
  data() {
    return {
      name: "",
      email: "",
      id: -1,
      error: undefined,
    };
  },
  methods: {
    update() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .put("http://localhost:8686/user", req, {
          name: this.name,
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          var msgErro = err.response.data.err;
          this.error = msgErro;
        });
    },
  },
};
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
div hr {
  margin-bottom: 4rem;
}
input {
  margin: 0.8rem 0;
}
</style>