<template>
    <div class="article">

        <div class="container">

            <div class="my-4 p-1 rounded-pill border border-dark">
                <h1 class="text-center"> Статьи </h1>
            </div>

            <div class="row">
                <div class="col-lg-3">
                    <div class="mt-3 card">
                        <div class="card-header text-center bg-dark text-white">
                            <p></p>
                            <br>
                        </div>
                        <div class="card-body">
                            <form @submit="insert">
                                <input class="form-control" type="text" placeholder="ID категории" v-model="articleInsert.articleTypeId">
                                <input class="mt-1 form-control" type="text" placeholder="ID автора" v-model="articleInsert.authorId">
                                <input class="mt-1 form-control" type="text" placeholder="Заголовок" v-model="articleInsert.header">
                                <textarea class="mt-1 form-control" placeholder="Содержание" v-model="articleInsert.main"></textarea>
                                <input class="mt-1 form-control" type="text" placeholder="Дата публикации" v-model="articleInsert.date">
                                <input class="mt-1 form-control" type="text" placeholder="Приоритет" v-model="articleInsert.priority">
                                <button class="mt-2 btn btn-outline-dark btn-block" type="submit">Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9">

                    <table class="mt-3 table table-hover">
                        <thead class="bg-dark text-light ">
                        <tr>
                            <th>ID</th>
                            <th>ID категории</th>
                            <th>ID автора</th>
                            <th>Заголовок</th>
                            <th>Содержание</th>
                            <th>Дата публикации</th>
                            <th>Приоритет</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody v-for="article of articles">
                        <tr>
                            <td scope="row">{{ article.id }}</td>
                            <td>{{ article.articleTypeId }}</td>
                            <td>{{ article.authorId }}</td>
                            <td>{{ article.header }}</td>
                            <td>{{ article.main }}</td>
                            <td>{{ article.date }}</td>
                            <td>{{ article.priority }}</td>
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
                        <form @submit="edit">
                            <input class="form-control" type="text" placeholder="ID" readonly v-bind:value="article.id">
                            <input class="form-control" type="text" placeholder="ID категории" v-model="article.articleTypeId">
                            <input class="mt-1 form-control" type="text" placeholder="ID автора" v-model="article.authorId">
                            <input class="mt-1 form-control" type="text" placeholder="Заголовок" v-model="article.header">
                            <textarea class="mt-1 form-control" placeholder="Содержание" v-model="article.main"></textarea>
                            <input class="mt-1 form-control" type="text" placeholder="Дата публикации" v-model="article.date">
                            <input class="mt-1 form-control" type="text" placeholder="Приоритет" v-model="article.priority">
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
        name: 'Article',

        methods: {
            insert() {
                fetch('http://127.0.0.1:8081/article', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        articleTypeId: this.articleInsert.articleTypeId,
                        authorId: this.articleInsert.authorId,
                        header: this.articleInsert.header,
                        main: this.articleInsert.main,
                        date: this.articleInsert.date,
                        priority: this.articleInsert.priority
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        this.articleInsert = json
                    })
            },
            getById() {
                fetch('http://127.0.0.1:8081/article/' + this.id)
                    .then(response => response.json())
                    .then(json => {
                        this.articles = [json]
                    })
            },
            moveData(recordingId) {
                fetch('http://127.0.0.1:8081/article/' + recordingId)
                    .then(response => response.json())
                    .then(json => {
                        this.article = json
                        console.log(this.article.name)
                    })
            },
            edit() {
                fetch('http://127.0.0.1:8081/article/' + this.article.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.article.id,
                        articleTypeId: this.article.articleTypeId,
                        authorId: this.article.authorId,
                        header: this.article.header,
                        main: this.article.main,
                        date: this.article.date,
                        priority: this.article.priority
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        this.article = json
                    })
            },
            deleteRecording(recordingId) {
                console.log(recordingId)
                if (confirm("Вы уверены?")) {
                    fetch('http://127.0.0.1:8081/article/' + recordingId, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: recordingId
                        })
                    })
                        .then(response => response.json())
                        .then(json => {
                            this.article = json
                        })
                }
            }
        },

        data() {
            return {
                articles: [],
                id: "",
                article: {},
                articleInsert: {}
            }
        },
        mounted() {
            fetch('http://127.0.0.1:8081/article')
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