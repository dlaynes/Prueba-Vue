<template>
    <fragment>
        <div class="filters">
            <label>
                Filter by name:
                <input type="text" v-model="filterName" />
            </label>
            <label>
                Filter by position:
                <input type="text" v-model="filterPosition" />
            </label>
        </div>
        <hr />
        <table class="players">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Goals</th>
                    <th>Change score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in filteredPlayers" v-bind:key="'player'+player.id">
                    <Player v-bind:player="player" />
                </tr>
            </tbody>
        </table>
        <hr />
        <span>Player Amount: <strong>{{ amount }}</strong> Filtered: {{ filteredPlayers ? filteredPlayers.length : 0 }}</span>
        <hr />
        <button type="button" v-on:click="setAddPlayer">Add a New Player</button>
        <Alert v-bind:player="currentPlayer" v-bind:is-active="isModalActive" />
    </fragment>

</template>
<script>
import { players } from '../constants/players';
import Player from './Player.vue';
import Alert from './Alert.vue';

import EventBus from '../event-bus';

export default {
    //We use the extended function definition due to a "this" issue
    mounted: function mounted() {
        EventBus.$on('add-score', (player_id) => {
            this.addScore(player_id);
        });
        EventBus.$on('substract-score', (player_id) => {
            this.substractScore(player_id);
        });
        EventBus.$on('set-edit-player', (player_id) => {
            this.setEditPlayer(player_id);
        });
        EventBus.$on('delete-player', (player_id) => {
            this.deletePlayer(player_id);
        });
        EventBus.$on('edit-player', (player) => {
            console.log("Edit player", player);
            this.editPlayer(player);
        });
        EventBus.$on('cancel-edit-player', () => {
            this.cancelEditPlayer();
        });
    },
    data: function data() {
        return {
            currentPlayer: this.defaultPlayer(),
            players: players,
            filterName: '',
            filterPosition: '',
            isModalActive: false,
            maxId: 5,
            //Note: We need UUIDs here!!!
        }
    },
    /*
    watch: {
        filterName: function(val, oldVal){

        },
        filterPosition: function(val, oldVal){

        }
    }, */
    methods: {
        defaultPlayer(){
            return {
                id: 0,
                name: '',
                position: '',
                score: 0
            };
        },
        addScore(player_id){
            let new_players = [];
            this.players.map(function(player){
                if(player.id == player_id){
                    new_players.push({...player, score: player.score+1});
                } else {
                    new_players.push(player);
                }
            });
            this.players = new_players;
        },
        substractScore(player_id){
            let new_players = [];
            this.players.map(function(player){
                if(player.id == player_id && player.score > 0){
                    new_players.push({...player, score: player.score-1});
                } else {
                    new_players.push(player);
                }
            });
            this.players = new_players;
        },
        setAddPlayer(){
            this.currentPlayer = this.defaultPlayer();
            this.isModalActive = true;
        },
        setEditPlayer(player_id){
            this.players.map(item => {
                if(item.id == player_id){
                    this.currentPlayer = item;
                    this.isModalActive = true;
                }
            });
        },
        addPlayer(newPlayer){
            this.maxId++;
            newPlayer.id = this.maxId;

            const new_players = [];
            this.players.map(function(player){
                new_players.push(player);
            });
            new_players.push(newPlayer);
            this.players = new_players;
            this.isModalActive = false;
        },
        deletePlayer(player_id){
            const players = [];
            this.players.map(item => {
                if(item.id != player_id){
                    players.push(item);
                }
            });
            this.players = players;
        },
        editPlayer(newPlayer){
            if(!newPlayer.id){
                this.addPlayer(newPlayer);
                alert("Player saved!");
                return;
            }

            let new_players = [];
            this.players.map(function(player){
                if(player.id == newPlayer.id){
                    //We could just put ...newPlayer here, but...
                    new_players.push({...player, ...newPlayer});
                } else {
                    new_players.push(player);
                }
            });
            alert("Player saved!");
            this.players = new_players;
            this.isModalActive = false;
        },
        cancelEditPlayer(){
            this.isModalActive = false;
        }
    },
    computed: {
        amount(){
            return this.players.length
        },
        filteredPlayers(el){
            let players = this.players;
            if(this.filterName != ''){
                players = players.filter((player) => {
                    return player.name.indexOf(el.filterName) !== -1
                });
            }
            if(this.filterPosition != ''){
                players = players.filter((player) => {
                    return player.position.indexOf(el.filterPosition) !== -1
                });
            }
            return players;
        }
    },
    components: {
        Player, Alert
    }
}
</script>
