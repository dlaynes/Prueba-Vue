<template>
    <fragment>
        <button type="button" v-on:click="edit(player_id)">Edit</button>
        <button type="button" v-on:click="remove(player_id)">Delete</button>
    </fragment>
</template>
<script>
import EventBus from '../event-bus';

export default {
    props: ['player_id'],
    methods: {
        edit(id){
            EventBus.$emit('set-edit-player', id);
        },
        remove(id){
            if(confirm("Desea borrar al jugador?")){
                EventBus.$emit('delete-player', id);
            }
        }
    }
}
</script>
