<template>
    <div class="container">
        <Header />
        <p>
            Doing a thing with golang to understand how you can build APIs with
            it. We will be making an API request to handle the following:
        </p>
        <ul>
            <li>Create a movie <RouterLink to="/new">here</RouterLink></li>
            <li>Get a list of movies <RouterLink to="/">here</RouterLink></li>
            <li>Shows the details of a movie</li>
        </ul>
    </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
</script>
