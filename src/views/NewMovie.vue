<template>
    <div class="container">
        <Header />
        <h3 class="welcome">Create a new movie</h3>

        <form class="form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter the movie title"
                    required
                    v-model="data.title"
                />
            </div>

            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                    id="isbn"
                    type="text"
                    placeholder="Enter the ISBN number  e.g 4785959"
                    required
                    v-model="data.isbn"
                />
            </div>

            <h4>Enter the director information</h4>
            <div class="combined-inputs">
                <div class="form-group">
                    <label for="firstname">First name</label>
                    <input
                        id="firstname"
                        type="text"
                        placeholder="Jane"
                        required
                        v-model="data.director.firstname"
                    />
                </div>
                <div class="form-group">
                    <label for="lastname">Last name</label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="Doe"
                        required
                        v-model="data.director.lastname"
                    />
                </div>
            </div>

            <button class="submit-button" type="submit">Add movie</button>
        </form>
    </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const data = reactive({
    title: "",
    isbn: "",
    director: {
        firstname: "",
        lastname: "",
    },
});
const isLoading = ref(false);

const handleSubmit = async () => {
    isLoading.value = true;
    await axios
        .post("http://localhost:8000/movies", {
            title: data.title,
            isbn: data.isbn,
            director: {
                ...data.director,
            },
        })
        .then((res) => {
            if (res.status === 200) {
                isLoading.value = false;
                router.replace("/");
            }
        })
        .catch((error) => {
            console.log("error: ", error);
            isLoading.value = false;
        });
};
</script>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
}

.form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
}

.form-group input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
}

.form-group input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.form-group input::placeholder {
    color: #9ca3af;
}

.combined-inputs {
    display: flex;
    gap: 1rem;

    .form-group {
        width: 100%;
    }
}

.submit-button {
    appearance: none;
    border: none;
    padding: 10px 20px;
    background: linear-gradient(180deg, #111, #000);
    color: #fff;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.02em;
    box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.4),
        0 4px 10px rgba(0, 0, 0, 0.25);
    transition:
        transform 0.12s ease,
        box-shadow 0.12s ease,
        background 0.12s ease,
        opacity 0.12s ease;
}

.submit-button:hover {
    transform: translateY(-1px);
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.45),
        0 8px 16px rgba(0, 0, 0, 0.35);
}

.submit-button:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
</style>
