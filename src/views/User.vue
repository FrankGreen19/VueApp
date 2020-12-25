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
                                <input class="form-control" type="text" placeholder="Почта" v-model="userInsert.email">
                                <input class="mt-1 form-control" type="text" placeholder="Пароль" v-model="userInsert.password">
                                <input class="mt-1 form-control" type="text" placeholder="Телефон" v-model="userInsert.phone">
                                <input class="mt-1 form-control" type="text" placeholder="Уведомления" v-model="userInsert.agreement">
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
                            <th>Почта</th>
                            <th>Пароль</th>
                            <th>Телефон</th>
                            <th>Уведомления</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody v-for="user of users">
                        <tr>
                            <td scope="row">{{ user.id }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.password }}</td>
                            <td>{{ user.phone }}</td>
                            <td>{{ user.agreement }}</td>
                            <td>
                                <button type="submit" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#exampleModal"
                                        v-on:click="moveData(user.id)">
                                    Изменить
                                </button>
                                <br>
                                <button type="submit" class="mt-1 btn btn-sm btn-outline-danger"
                                        v-on:click="deleteRecording(user.id)">
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
                            <input class="form-control" type="text" placeholder="ID" readonly v-bind:value="user.id">
                            <input class="mt-1 form-control" type="text" placeholder="Почта" v-model="user.email">
                            <input class="mt-1 form-control" type="text" placeholder="Пароль" v-model="user.password">
                            <input class="mt-1 form-control" type="text" placeholder="Телефон" v-model="user.phone">
                            <input class="mt-1 form-control" type="text" placeholder="Уведомления" v-model="user.agreement">
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
        name: 'User',

        methods: {
            insert() {
                fetch('http://127.0.0.1:8081/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.userInsert.email,
                        password: this.userInsert.password,
                        phone: this.userInsert.phone,
                        agreement: this.userInsert.agreement,
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        this.userInsert = json
                    })
            },
            getById() {
                fetch('http://127.0.0.1:8081/user/' + this.id)
                    .then(response => response.json())
                    .then(json => {
                        this.users = [json]
                    })
            },
            moveData(recordingId) {
                fetch('http://127.0.0.1:8081/user/' + recordingId)
                    .then(response => response.json())
                    .then(json => {
                        this.user = json
                        console.log(this.user.name)
                    })
            },
            edit() {
                fetch('http://127.0.0.1:8081/user/' + this.user.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.user.id,
                        articleTypeId: this.user.articleTypeId,
                        authorId: this.user.authorId,
                        header: this.user.header,
                        main: this.user.main,
                        date: this.user.date,
                        priority: this.user.priority
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        this.user = json
                    })
            },
            deleteRecording(recordingId) {
                console.log(recordingId)
                if (confirm("Вы уверены?")) {
                    fetch('http://127.0.0.1:8081/user/' + recordingId, {
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
                            this.user = json
                        })
                }
            }
        },

        data() {
            return {
                users: [],
                id: "",
                user: {},
                userInsert: {}
            }
        },
        mounted() {
            fetch('http://127.0.0.1:8081/user')
                .then(response => response.json())
                .then(json => {
                    this.users = json
                })
        },
        components: {
            Article
        }
    }
</script>