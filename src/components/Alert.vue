<template>
    <div v-bind:class="{dialog: true, active: isActive }">
        <div class="inner">
            <h3>Add/edit Players</h3>
            <hr />
            <dl>
                <dt><label for="name">Name</label></dt>
                <dd>
                    <input type="text" name="name" v-model="player.name" />
                </dd>
                <dt><label for="position">Position</label></dt>
                <dd>
                    <input type="text" name="position" v-model="player.position" />
                </dd>
                <dt><label for="score">Score</label></dt>
                <dd>
                    <input type="text" name="score" v-model="player.score" />
                </dd>
            </dl>
            <div class="buttons">
                <button type="button" class="button-primary" v-on:click.stop="save">Save</button>
                <button type="button" class="button-cancel" v-on:click.stop="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '../event-bus';

export default {
    props: ['player', 'isActive'],
    data(){
        return {
            saving: false
        }
    },
    methods: {
        save(){
            if(this.saving) return;

            this.saving = true;

            //alert("Saving!");
            if(this.player.name == ''){
                alert('Please add a name');
                return;
            }
            if(this.player.position == ''){
                alert('Please add a position');
                return;
            }
            const score = parseInt(this.player.score);
            if(isNaN(score) || score < 0){
                alert('Please add a valid score');
                return;
            }
            EventBus.$emit('edit-player', this.player);
            this.saving = false;
        },
        cancel(){
            //alert("Cancel!");
            EventBus.$emit('cancel-edit-player');

            return false;
        },
        beforeDestroy() {
            EventBus.$off('edit-player');
            EventBus.$off('cancel-edit-player');
        }
    }
}
</script>

<style>
    .dialog {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(30,30,30,0.2);
    }
    .dialog .inner {
        width: 800px;
        height: 600px;
        margin: 100px auto;
        background-color: #AAAAAA;
    }
    .active.dialog {
        display: block;
    }
</style>
