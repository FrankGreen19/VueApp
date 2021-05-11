<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="form of forms">

                <div class="mt-5 card text-center">
                    <div class="card-body">
                        <h5 class="" data-toggle="modal" data-target="#exampleModal"
                            v-on:click="getById(form.id)" style="color: lightskyblue">
                            {{ form.fio }}
                        </h5>
                        <p class="p-2">{{ form.message }}</p>
                        <button class="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#answerModal"
                            v-on:click="updateStatus(form.id)">
                            Ответить
                        </button>
                        <p class="mt-3 text-muted" v-if="form.status === 'viewed'">Обработано</p>
                        <p class="mt-3 text-danger" v-else>Не просмотрено</p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Пользователь</h5>
                    </div>
                    <div class="modal-body text-center">
                        <p>{{ userData.fio }}</p>
                        <p>{{ userData.email }}</p>
                        <p>{{ userData.phone }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="answerModal" tabindex="-1" aria-labelledby="answerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="answerModalLabel">Ответ</h5>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <textarea class="form-control">Уважаемый пользователь!</textarea>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary btn-sm">Отправить</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FormsView",

        methods: {
            getById(id) {
                fetch('http://newssite/api/select/' + id)
                    .then(response => response.json())
                    .then(json => {
                        this.userData = json[0]
                    })
            },

            async updateStatus(id) {
                fetch('http://newssite/api/update_status/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: "viewed"
                    })
                });

                await this.refresh();
            },

            refresh() {
                fetch('http://newssite/api/selectAll')
                    .then(response => response.json())
                    .then(json => {
                        this.forms = json
                    })
            }
        },

        data() {
            return {
                forms: {},
                userData: {}
            }
        },

        mounted() {
            this.refresh();
        }
    }
</script>

<style scoped>

</style>