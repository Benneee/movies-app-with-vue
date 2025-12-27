<template>
    <nav>
        <RouterLink to="/" class="header">The Movies Directory App</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0 1.5rem 0;

    .header {
        font-size: 1.5rem;
        font-weight: 600;
    }
}
</style>
