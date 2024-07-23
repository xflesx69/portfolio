<template>
    <main class="header">
        <div class="infocard">
            <span class="name">Tóth Norbert</span>
            <p class="desc">Website developer</p>
        </div>
        <div class="nav">
            <a href="#" id="button" @click="ToggleSidenav()"><img id="button" src="/img/bars.svg"></a>
        </div>
        <div :class="{ 'overlay': true, 'active': SidenavOpen, 'closing': SidenavClosing }" @click="QuitSidenav()" v-if="SidenavOpen"></div>
        <div :class="{ 'sidenav': true, 'active': SidenavOpen, 'closing': SidenavClosing }" v-show="SidenavOpen">
            <button id="button" class="close-btn" @click="QuitSidenav()">&#10005;</button>

            <ul>
                <h3>Tóth Norbert</h3><!-- 
                <li>
                    <span><router-link to="/" :class="[$route.name == 'home' ? 'active' : '']">Home</router-link></span>
                </li>
                <li>
                    <span><router-link to="/test" :class="[$route.name == 'test' ? 'active' : '']">Teszt</router-link></span>
                </li> -->
                <li>HAMAROSAN</li>
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

<style>
.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
}
</style>