<template>
    <div class="">
        <ul>
            <Article />
        </ul>
    </div>
</template>

<script>
    import Article from '@/components/Article'
    export default {
        props: ['articles'],
        name: "HelloVue",
        components: [
            Article
        ]
    }
</script>

<style scoped>

</style>