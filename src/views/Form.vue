<template>
    <div class="mt-4 container">

        <div class="row">
            <div class="col-md-6 mx-auto my-auto">
                <div class="mt-4 card">
                    <div class="card-body">
                        <form @submit.prevent="insert">
                            <input type="text" class="mt-1 form-control" placeholder="ФИО" v-model="form.fio">
                            <input type="text" class="mt-1 form-control" placeholder="Email" v-model="form.email">
                            <input type="text" class="mt-1 form-control" placeholder="Номер телефона" v-model="form.phone">
                            <textarea class="mt-1 form-control" placeholder="Вопрос" v-model="form.message" />
                            <button class="my-3 btn btn-outline-dark btn-block" type="submit">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Form",

        methods: {
            insert() {
                fetch('http://newssite/api/insert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fio: this.form.fio,
                        email: this.form.email,
                        phone: this.form.phone,
                        message: this.form.message,
                        status: "not_viewed"
                    })
                });
            },
        },

        data() {
            return {
                form: {},
            }
        }
    }
</script>
