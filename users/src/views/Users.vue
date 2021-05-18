<template>
  <div>
    <h1>Painel adm</h1>

    
    <table class="table">

      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.role | processRole}}</td>
          <td>
            <router-link :to="{name: 'UserEdit', params: {id: user.id}}"><button class="button is-success">Editar</button><span style="margin: 0px 5px;"></span></router-link>
            <button class="button is-danger" @click="toggleModal(user.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>




    <div :class="{modal: true, 'is-active': showModal}">
      <div class="modal-background"></div>

      <div class="modal-content">

        <div class="card">

          <header class="card-header">
            <p class="card-header-title">
              Você quer realmente quer deletar esse usuário ?
            </p>
          </header>

          <div class="card-content">
            <div class="content">
              Esse usuário vai ser excluído permanentemente, tem certeza disso ?
            </div>
          </div>

          <footer class="card-footer">
        
            <a href="" class="card-footer-item" @click="toggleModal">Cancelar</a>
            <a href="" class="card-footer-item" @click="deleteUser">Sim, quero deletar !</a>
          </footer>

        </div>

      </div>

      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
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
      .get("http://localhost:8686/user", req)
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {

    return {
      users: [],
      showModal: false,
      deleteUserId: -1
    };

  },
  methods: {

    toggleModal: function(id){

      this.showModal = !this.showModal
      this.deleteUserId = id
    },

    deleteUser() {

      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      if(this.deleteUserId > 0) {

        axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then(res => {

          console.log(res)
          this.showModal = false

          this.$router.go()
          
        }).catch(err => {
          console.log(err)
        })
      }
      
    }
  }
  ,

  filters: {
    
    processRole: function(value) {

      if(value == 0) {

        return "Usuário comum"
      }else if(value == 1) {

        return "Admin"
      }
    }
  }
};
</script>

<style scoped>
</style>