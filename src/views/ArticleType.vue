<template>
  <div class="articletype">

      <div class="container">

          <div class="my-4 p-1 rounded-pill border border-dark">
              <h1 class="text-center">Категории</h1>
          </div>

          <div class="row">
              <div class="col-lg-4">
                  <div class="mt-3 card">
                      <div class="card-header text-center bg-dark text-white">
                          <p></p>
                          <br>
                      </div>
                      <div class="card-body">
                          <form @submit.prevent="insert">
                              <input class="form-control" type="text" placeholder="Название" v-model="articleTypeInsert.name">
                              <button class="mt-2 btn btn-outline-dark btn-block" type="submit">Добавить</button>
                          </form>
                      </div>
                  </div>
              </div>

              <div class="col-lg-8">

                  <table class="mt-3 table table-hover">
                      <thead class="bg-dark text-light">
                          <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">
                                  <form class="form-inline" @submit.prevent="getById()">
                                      <div class="md-form">
                                          <input class="form-control mr-sm-2" type="text" placeholder="Поиск..." v-model="id">
                                      </div>
                                  </form>
                              </th>
                          </tr>
                      </thead>
                      <tbody v-for="article of articles">
                          <tr>
                              <td >{{ article.id }}</td>
                              <td>{{ article.name }}</td>
                              <td>
                                  <button type="submit" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#exampleModal"
                                          v-on:click="moveData(article.id)">
                                    Изменить
                                    </button>
                                  <br>
                                  <button type="submit" class="mt-1 btn btn-sm btn-outline-danger"
                                          v-on:click="deleteRecording(article.id)">
                                      Удалить
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>

              </div>
          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
                  </div>
                  <div class="modal-body">
                       <form @submit.prevent="edit">
                           <input class="form-control" type="text" placeholder="ID" readonly v-bind:value="articleType.id">
                           <input class="mt-1 form-control" type="text" placeholder="Название" required v-model="articleType.name">
                           <hr>
                           <div class="d-flex justify-content-end">
                               <button type="submit" class="mt-1 btn btn-primary">Сохранить</button>
                           </div>
                       </form>
                  </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
  import Article from "@/components/Article";
  
  export default {
      name: 'Articletype',

      methods: {
          insert() {
              this.articles.push({
                  name: this.articleTypeInsert.name
              })
              this.refresh()
              fetch('http://127.0.0.1:8081/articletype', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      name: this.articleTypeInsert.name
                  })
              })
          },
          getById() {
              fetch('http://127.0.0.1:8081/articletype/' + this.id)
                  .then(response => response.json())
                  .then(json => {
                      this.articles = [json]
                  })
          },
          moveData(recordingId) {
              fetch('http://127.0.0.1:8081/articletype/' + recordingId)
                  .then(response => response.json())
                  .then(json => {
                      this.articleType = json
                  })
          },
          edit() {
              this.articles = this.articles.filter(t => t.id !== this.articleType.id)
              this.articles.push({
                  id: this.articleType.id,
                  name: this.articleType.name
              })
              fetch('http://127.0.0.1:8081/articletype/' + this.articleType.id, {
                          method: 'PUT',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              id: this.articleType.id,
                              name: this.articleType.name
                          })
                      })
                  .then(response => response.json())
                  .then(json => {
                      this.articleType = json
                  })
          },
          deleteRecording(recordingId) {
              console.log(recordingId)
              if (confirm("Вы уверены?")) {
                  this.articles = this.articles.filter(t => t.id !== recordingId)
                  fetch('http://127.0.0.1:8081/articletype/' + recordingId, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          id: recordingId
                      })
                  })
              }
          },
          refresh() {
              fetch('http://127.0.0.1:8081/user')
                  .then(response => response.json())
                  .then(json => {
                      this.articles = json
                  })
          }
      },

    data() {
          return {
            articles: [],
              id: "",
              articleType: {},
              articleTypeInsert: {}
          }
    },
    mounted() {
          fetch('http://127.0.0.1:8081/articletype')
                  .then(response => response.json())
                  .then(json => {
                    this.articles = json
                  })
    },
    components: {
         Article
    }
  }
</script>