<template>
    <div class="movie-details">
        <RouterLink :to="movie.id" class="movie-title">{{
            movie?.title
        }}</RouterLink>
        <small class="movie-isbn">{{ movie?.isbn }}</small>
    </div>
    <div class="movie-actions">
        <p>Edit</p>
        <button @click="deleteMovie" class="delete-button">Delete</button>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["delete"]);

const deleteMovie = () => {
    emit("delete", props.movie);
};
</script>

<style scoped>
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

.delete-button {
    border: 0;
    padding: 0;
    cursor: pointer;
    color: red;
    background: none;
    font-size: 1rem;
}
</style>
