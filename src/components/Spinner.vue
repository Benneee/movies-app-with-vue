<template>
    <div class="spinner-overlay">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.spinner-overlay {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.85);
    z-index: 9999;
}

.spinner {
    width: 56px;
    height: 56px;
    border: 6px solid #e5e7eb;
    border-top-color: #111827;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
