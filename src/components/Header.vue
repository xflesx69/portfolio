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
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    color: rgb(37, 37, 37);
    .infocard {
        display: block;
        .name {
            letter-spacing: -1px;
            font-weight: 560;
            font-size: 20px;
            font-family: Arial, Helvetica, sans-serif;
        }

        .desc {
            letter-spacing: -0.3px;
            font-weight: 250;
            font-size: 15px;
            color: #525252;
        }
    }
    .nav {
        margin-left: auto;
        display: flex;
        align-items: center;
        a {
            color: rgb(37, 37, 37);
            width: 20px;
        }
        #button {
            font-size: 20px;
        }
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.3s,
            visibility 0.3s;
        z-index: 9999;
        animation: ShowSideNavOverlay 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        @keyframes ShowSideNavOverlay {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        &.active {
            opacity: 1;
            visibility: visible;
        }
        @keyframes CloseSideNavOverlay {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
        &.closing {
            animation: CloseSideNavOverlay 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
    }

    .sidenav {
        position: fixed;
        top: 0;
        right: 0;
        margin: 25px;
        width: 350px;
        height: calc(102vh - 70px);
        border-radius: 40px;
        background-color: #fff;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        z-index: 9999;
        animation: ShowSideNav 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        @keyframes ShowSideNav {
            0% {
                transform: translateX(150%);
            }
            100% {
                transform: translateX(0);
            }
        }
        &.active {
            transform: translateX(0);
        }
        @keyframes CloseSideNav {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(150%);
            }
        }
        &.closing {
            animation: CloseSideNav 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        ul {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            li {
                a {
                    color: black;
                    &.active {
                        color: rgb(206, 0, 0);
                    }
                }
            }
        }
    }
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
}
</style>