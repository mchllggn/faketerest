import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                apricot: "#f9c596",
                magenta: "#fc5d9d",
                nayeon: "#5bc2e7",
                jeongyeon: "#c5d97a",
                momo: "#ff8da1",
                sana: "#987dd4",
                jihyo: "#ffc56e",
                mina: "#6dcdb8",
                dahyun: "#ffffff",
                chaeyoung: "#ee2737",
                tzuyu: "#005eb8",
            },
        },
    },

    plugins: [forms],
};
