<template>
    <fragment>
        <td>{{ player.name }}</td>
        <td>{{ player.position }}</td>
        <td>{{ player.score }}</td>
        <td><Goals v-bind:player_id="player.id" /></td>
        <td><Edit v-bind:player_id="player.id" /></td>
    </fragment>
</template>
<script>
import Goals from './Goals.vue';
import Edit from './Edit.vue';

export default {
    props: ['player'],
    components: {
        Goals, Edit
    }
}
</script>
