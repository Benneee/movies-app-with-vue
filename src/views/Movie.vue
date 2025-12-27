<template>
    <div class="container">
        <Header />
        <h3>Movie details</h3>
        <div v-if="isLoading">
            <Spinner />
        </div>
        <div v-if="!isLoading && movieDetails">
            <p>
                Movie title: <span>{{ movieDetails?.title }}</span>
            </p>
            <p>
                Movie Director: <span> {{ directorFullName }} </span>
            </p>
            <p>
                Movie ISBN: <span>{{ movieDetails?.isbn }}</span>
            </p>
        </div>
        <div v-if="!isLoading && !movieDetails">
            <p>Details could not be fetched.</p>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";

const route = useRoute();
const isLoading = ref(false);
const movieDetails = ref(null);
onMounted(() => {
    loadMovieDetails();
});

const directorFullName = computed(() => {
    if (movieDetails) {
        return `${movieDetails?.value?.director?.firstname} ${movieDetails?.value?.director?.lastname}`;
    } else {
        return "--";
    }
});

const loadMovieDetails = async () => {
    const movieId = route.params.id || null;
    if (movieId) {
        isLoading.value = true;
        await axios
            .get(`http://localhost:8000/movies/${movieId}`)
            .then((res) => {
                if (res.status === 200) {
                    movieDetails.value = res.data;
                    isLoading.value = false;
                }
            })
            .catch((error) => {
                console.log("error: ", error);
                isLoading.value = false;
            });
    }
};
</script>
