import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Movie from "@/views/Movie.vue";
import NewMovie from "@/views/NewMovie.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/new", component: NewMovie },
  { path: "/:id", component: Movie },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
