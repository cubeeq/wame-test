<template>
    <div class="row">
        <div
            v-for="color in colors"
            :name="color"
            v-on:click="setColor(color)"
            class="select-color"
            v-bind:key="color"
            v-bind:class="{ 'active' : selectedColor === color}"
        ></div>
    </div>
</template>

<script>

    export default {
        props: ['colors'],
        data() {
            return {
                //Zvolaná farba
                selectedColor: localStorage.selectColor
            }
        },
        methods: {

            /*
            * Nastavenie farebenej variatny produktu
            */
            setColor(color) {
                
                // Preposlanie zvolenej farby do App
                this.$emit('update-color', color)
                
                // Uloženie farby do premenej
                this.selectedColor = color;

                // Nastavenie zvolenej farby do Local Storage
                localStorage.selectColor = color;
                
            }

        }
    }

    
</script>

<style scoped>

    /*
    * Import ColorSelection.scss
    */
    @import '../../scss/components/ColorSelection.scss';

</style>