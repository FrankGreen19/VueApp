<template>
    <li>
       {{ article.name }}
    </li>
</template>

<script>
    export default {
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        name: "Article"
    }
</script>
