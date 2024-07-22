<template>
    <main class="header">
        <div class="infocard">
            <span class="name">Tóth Norbert</span>
            <p class="desc">Website developer</p>
        </div>
        <div class="nav">
            <a href="#" id="button" @click="ToggleSidenav()"><i id="button" class="fa-solid fa-bars"></i></a>
        </div>
        <div :class="{ 'overlay': true, 'active': SidenavOpen, 'closing': SidenavClosing }" @click="QuitSidenav()" v-if="SidenavOpen"></div>
        <div :class="{ 'sidenav': true, 'active': SidenavOpen, 'closing': SidenavClosing }" v-show="SidenavOpen">
            <ul>
                <h3>Tóth Norbert</h3>
                <li>
                    <span><router-link to="/">Home</router-link></span>
                </li>
                <li>
                    <span><router-link to="/test">Teszt</router-link></span>
                </li>
            </ul>
        </div>
    </main>
</template>

<script lang="ts">

export default {
    data() {
        return {
            SidenavOpen: false,
            SidenavClosing: false,
        }
    },
    methods: {
        ToggleSidenav() {
            this.SidenavOpen = !this.SidenavOpen;
        },
        QuitSidenav() {
            this.SidenavClosing = true;
            setTimeout(() => {
                this.SidenavClosing = false;
                this.SidenavOpen = false;
            }, 500);
        }
    }
}
</script>