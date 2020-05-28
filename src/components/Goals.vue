<template>
    <fragment>
        <button type="button" v-on:click="substract(player_id)">-</button>
        <button type="button" v-on:click="add(player_id)">+</button>
    </fragment>
</template>
<script>
import EventBus from '../event-bus';

export default {
    props: ['player_id'],
    methods: {
        add(id){
            EventBus.$emit('add-score', id);
        },
        substract(id){
            EventBus.$emit('substract-score', id);
        }
    }

}
</script>
