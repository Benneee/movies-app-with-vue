<template>
    <div class="container">
        <Header />
        <h3 class="welcome">Welcome to the movies directory</h3>

        <p v-if="isLoading">Loading movies...</p>

        <p v-if="!isLoading && !movies">
            <!-- No movies to show at the moment. You can create one <RouterLink to="/create-movie">here</RouterLink>. -->
            No movies to show at the moment. You can create one here.
        </p>
        <div v-if="!isLoading && movies">
            <div v-for="movie in movies" class="movie">
                <div class="movie-details">
                    <RouterLink :to="movie.id" class="movie-title">{{
                        movie?.title
                    }}</RouterLink>
                    <small class="movie-isbn">{{ movie?.isbn }}</small>
                </div>
                <div class="movie-actions">
                    <p>Edit</p>
                    <p>Delete</p>
                </div>
            </div>
        </div>

        <div v-if="!isLoading && movies" class="footnote">
            <p>Add a new movie to the list here</p>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

const movies = ref(null);
const isLoading = ref(false);

onMounted(() => {
    loadMovie();
});

const loadMovie = async () => {
    isLoading.value = true;
    await axios
        .get("http://localhost:8000/movies")
        .then((res) => {
            if (res.status === 200) {
                isLoading.value = false;
                movies.value = res.data;
            }
        })
        .catch((error) => {
            console.log("err: ", error);
            isLoading.value = false;
        });
};
</script>

<style scoped>
.movie {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    p {
        margin: 0;
    }
}

.movie-details {
    display: flex;
    flex-direction: column;
}

.movie-actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.movie-title {
    text-decoration: none;
}

.movie-title:hover {
    cursor: pointer;
    text-decoration: underline;
}

.movie-isbn {
    color: grey;
}

.footnote {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}
</style>
