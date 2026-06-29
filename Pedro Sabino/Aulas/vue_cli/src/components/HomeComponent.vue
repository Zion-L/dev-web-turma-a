<template>
    <div>
        <footer id="footer">
            <p>Bem vindo: {{ nome }} Ao mundo do <b>VUE com CLI</b></p>
        </footer>
    </div>
</template>

<script>
    export default{
        name : "HomeComponent",
        data() {
            return {
                nome : "P.diddy",
            };
        },
    };
</script>