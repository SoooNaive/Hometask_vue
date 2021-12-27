"use strict";

const image = {
    emits: ['deleteImage'],
    props: {
        title: {
            required: true,
            type: String,
            validator(value) {
                return value.length > 0;
            }
        },
        src: {
            required: true,
            type: String,
            validator(value) {
                return value.length > 0;
            }
        }
    },
    template:
        `
        <p>{{ title }}</p>
        <img :src="src" :alt="title">
        <button @click="$emit('deleteImage', src)">Удалить изображение</button>
        `
};

let gallery = {
    components: {'app-img': image},
    data() {
        return {
            gallery: [
                {title: "Фото 1", src: "img/1.jpg"},
                {title: "Фото 2", src: "img/2.jpg"},
                {title: "Фото 3", src: "img/3.jpg"},
                {title: "Фото 4", src: "img/4.jpeg"},
                {title: "Фото 5", src: "img/5.jpg"},
            ],
            addingImage: {
                title: "", src: ""
            },
        }
    },
    methods: {
        deleteImage(src) {
            this.gallery = this.gallery.filter(
                image => {
                    return image.src !== src;
                })
        },
        addImage() {
            this.gallery.push({
                title: this.addingImage.title,
                src: this.addingImage.src
            });
            this.addingImage.title = "";
            this.addingImage.src = "";
        }
    },
    template:
        `
        <div v-for="image in gallery" class="item">
            <app-img :title="image.title" :src="image.src"
                     v-on:delete-image="deleteImage"></app-img>
        </div>
        <form @submit.prevent="addImage">
            <label>
                Название изображения:
                <input type="text" v-model="addingImage.title">
            </label>
            <label>
                Путь к изображению:
                <input type="text" v-model="addingImage.src">
            </label>
            <button type="submit">Добавить</button>
        </form>
        `
};

let app = Vue.createApp({
    components: {'app-gallery': gallery},
})

app.mount("#app");