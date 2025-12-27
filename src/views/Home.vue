<template>
    <div class="container">
        <Header />
        <h3 class="welcome">Welcome to the movies directory</h3>

        <div v-if="isLoading">
            <Spinner />
        </div>

        <p v-if="!isLoading && !movies">
            <!-- No movies to show at the moment. You can create one <RouterLink to="/create-movie">here</RouterLink>. -->
            No movies to show at the moment. You can create one here.
        </p>
        <div v-if="!isLoading && movies">
            <div v-for="movie in movies" class="movie">
                <Movie :movie="movie" @delete="handleDelete" />
            </div>
        </div>

        <div v-if="!isLoading && movies" class="footnote">
            <p>Add a new movie to the list here</p>
        </div>
    </div>

    <dialog ref="dialog" :open="isModalVisibile">
        <h4>Delete movie</h4>
        <p>Are you sure you want to delete {{ selectedMovie?.title }}</p>
        <form method="dialog">
            <div class="modal-buttons">
                <button @click="closeModal" class="cancel-button">
                    Cancel
                </button>
                <button @click="deleteMovie" class="delete-button">
                    Delete
                </button>
            </div>
        </form>
    </dialog>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Movie from "@/components/Movie.vue";
import Spinner from "@/components/Spinner.vue";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import axios from "axios";

const movies = ref(null);
const isLoading = ref(false);

const dialog = ref(null);
const isModalVisibile = ref(false);
const selectedMovie = ref(null);

onMounted(() => {
    loadMovies();
});

const handleDelete = (movie) => {
    selectedMovie.value = movie;
    isModalVisibile.value = true;
    dialog.value.showModal();
};

const loadMovies = async () => {
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

const closeModal = () => {
    isModalVisibile.value = false;
    dialog.value.close();
};

const deleteMovie = async () => {
    isLoading.value = true;
    await axios
        .delete(`http://localhost:8000/movies/${selectedMovie.value.id}`)
        .then((res) => {
            if (res.status == 200) {
                isLoading.value = false;
                toast.info("Movie deleted successfully!");
                loadMovies();
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

    p {
        margin: 0;
    }
}
.footnote {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}
.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

::backdrop {
    background: darkgrey;
    opacity: 0.75;
}
</style>
