
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import '../../assets/main.css'
const { t } = useI18n()


</script>

<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40  h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar" style="width: 270px;">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/dashboard" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="dashboard" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="ml-3">{{ $t("dashboard") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/categories" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="category" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("categories") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/admins" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="admin" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("admins") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/users" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="user" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("users") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/sellers" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="post" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("sellerannnouncements") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/buyers" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="post" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("buyerannouncements") }}</span>
                        </div>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/storages" class="sidebar_item">
                        <div
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <icon name="post" class="text-gray-900 dark:text-white w-6 h-6"></icon>
                            <span class="flex-1 ml-3 whitespace-nowrap">{{ $t("storagsannouncements") }}</span>
                        </div>
                    </RouterLink>
                </li>
                

            </ul>
        </div>
    </aside>
</template>

<script lang="ts">
export default {
    mounted() {
        // This code will run after the component is mounted
        const sidebarItems = document.querySelectorAll(".sidebar_item");
        sidebarItems.forEach(element => {
            element.addEventListener("click", () => {
                // Remove "active" class from all elements with the "active" class
                document.querySelectorAll(".sidebar_item div.active").forEach(item => {
                    item.classList.remove("active");
                });

                // Add "active" class to the clicked div element
                // element.querySelector("div").classList.add("active");

                const elementt = element.querySelector("div"); // Replace "your-selector" with the actual CSS selector

                if (elementt) {
                    // Check if element is not null
                    elementt.classList.add("active");
                }
            })
        });
    }
}
</script>
