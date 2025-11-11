<template>
    <footer class="text-center py-8 border-t border-accent-blue/10 text-slate-600 text-sm">
        <div class="max-w-container mx-auto px-4">
            &copy; {{ currentYear }} Danial Nasr. All rights reserved.
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>