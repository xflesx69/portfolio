<script lang="ts">
export default {
    name: 'AboutView',
    data() {
        return {
            age: Math.floor((Date.now() - new Date('2008-09-29').getTime()) / (1000 * 60 * 60 * 24 * 365)),
        };
    },
}
</script>

<template>
    <main>
        <div class="container">
            <span class="char-wrapper">
                <h1 class="anaglyph-layer">I'm xflesx</h1>
                <h1 class="outline-layer">I'm xflesx</h1>
            </span>
            <p class="text">I'm a {{ age }} years old information technology and telecommunications student.</p>
            <p class="text">I have a strong interest in web development and backend programming, and I'm passionate about building
                efficient applications.</p>
            <p class="text">I'm constantly looking to improve my skills by working on real-world projects and learning new
                technologies. I'm particularly drawn to clean code, scalability, and problem-solving, and I enjoy
                collaborating with others to bring ideas to life.</p>
                
            <RouterLink to="/">
                <span class="char-wrapper back">
                    <span class="anaglyph-layer">Back</span>
                    <!-- <span class="outline-layer">Back</span> -->
                </span>
            </RouterLink>
        </div>
    </main>
</template>

<style scoped>
.container {
    text-align: center;
    margin: 0 auto;

    h1 {
        margin-bottom: 20px;
        font-size: 62px;
        line-height: 1.2;
        letter-spacing: 5px;
    }

    p {
        margin-bottom: 20px;
        text-align: center;
    }

    .back span {
        font-size: 24px;
        letter-spacing: 1px;
    }
}
</style>