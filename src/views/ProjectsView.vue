<script lang="ts">
export default {
    name: 'AboutView',
    data() {
        return {
            projects: [
                {
                    title: 'Portfolio',
                    year: 2025,
                    description: `About me, about my projects.. It was inspired by Rogie's portfolio.`,
                    link: '/',
                    image: '/image/icon.png',
                },
                {
                    title: 'Mozisarok',
                    year: 2024,
                    description: 'Watch free movies and series online with Mozisarok.',
                    link: 'https://mozisarok.hu',
                    image: 'https://mozisarok.hu/img/logos/logo-w64.avif',
                },
                {
                    title: 'RivalsNetwork admin panel',
                    year: 2022,
                    description: 'An admin panel for RivalsNetwork, a community for gamers.',
                    image: '/image/icons/rn.png',
                },
            ],
        };
    },
}
</script>

<template>
    <main>
        <div class="container">
            <div class="header">
                <span class="char-wrapper">
                    <h1 class="anaglyph-layer">Projects</h1>
                    <h1 class="outline-layer">Projects</h1>
                </span>
            </div>

            <div class="projects">
                <div class="project" v-for="(project, index) in projects" :key="index">
                    <div class="left">
                        <h2>{{ project.title }}</h2>
                        <span v-if="project.year">Year: {{ project.year }}</span>
                        <p>{{ project.description }}</p>
                        <a :href="project.link" target="_blank" v-if="project.link">View Project</a>
                    </div>
                    <div class="right">
                        <img v-if="project.image" :src="project.image" alt="Project Image" />
                    </div>
                </div>
            </div>

            <RouterLink to="/">
                <span class="char-wrapper back">
                    <span class="anaglyph-layer">Back</span>
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
        font-size: 42px;
        line-height: 1.2;
        letter-spacing: 5px;
    }

    p {
        margin-bottom: 20px;
        text-align: center;
    }

    .projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .project {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
            background: #3b3b3b;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;

            .left {
                width: 80%;
                max-width: 600px;
                transition: transform 0.3s;

                h2 {
                    margin-bottom: 10px;
                    font-size: 24px;
                }

                p,
                span,
                h2,
                a {
                    text-shadow: 1px 1px 2px #000;
                }

                a {
                    color: #007bff;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .right {
                width: 20%;
                max-width: 200px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    max-width: 100%;
                    border-radius: 8px;
                }
            }
        }
    }

    .back span {
        font-size: 24px;
        letter-spacing: 1px;
    }
}
</style>