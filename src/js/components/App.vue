<template>
    <main class="container">

        <!-- Dolpnenie meta dát (MetaData.vue) -->
        <meta-data :product="product"></meta-data>

        <!-- Názov produktu -->
        <h1 class="title">{{ product.Name }}</h1>
        
        <!-- Popis produktu -->
        <div class="row">
            <div v-if="product.Description.length > 100 && hideText === true">
                <p>{{ product.Description | truncate(100) }}</p>
                <a href="#" @click="fullText()">Read more</a>
            </div>
            <div v-else>
                <p>{{ product.Description }}</p>
            </div>
        </div>

        <!-- Hodnotenie (StarRating.vue) -->
        <star-rating
            :stars="5"
            :product-id="product.ProductId"
        ></star-rating>

        <!-- Cenové ralácie -->
        <div class="row prices">
            <span class="price">
                {{ product.Price }}
                {{ giveCurrency() }}
            </span>
            <span class="oldPrice">
                {{ product.OldPrice }}
                {{ giveCurrency() }}
            </span>
            <span class="discount">
                {{ product.Discount }} zľava
            </span>
        </div>

        <!-- Označenie "NOVINKA" -->
        <div class="row">
            <span
                class="newTag"
                v-if="product.NewTag === true"
            >Novinka</span>
        </div>

        <!-- Zvolaná farba (ColorSelection.vue) -->
        <div class="row selected-color">
            <strong>Farba: </strong> {{ selectedColor | capitalize }}
        </div>
        
        <!-- Voľba farby -->
        <color-selection
            @update-color="updateSelectedColor"
            :colors="product.params[1]"
        ></color-selection>

        <!-- Input a button  -->
        <div class="row columns is-mobile">
            <input
                class="pieces is-rounded"
                type="number"
                value="1"
                min="1"
                :max="product.Quantity"
            >
            <button class="button is-black is-rounded is-fullwidth">Pridať do košíka</button>
        </div>

    </main>
</template>

<script>

    import axios from 'axios';
    import globalMixin from "../mixins/globalMixin";

    export default {

        mixins: [globalMixin],

        data() {
            return {

                // JSON data
                product: null,

                // Zvolaná farba z local storage
                selectedColor: localStorage.selectColor || 'Zvoľte farbu',
                
                // Schovanie textu popisu
                hideText: true

            }
        },

        mounted() {
            
            /*
            * Pripojenie ku API
            */
            axios
                .get('https://api.jsonbin.io/b/5dbc3e50bf3ef75e90e028a3/latest')

                .then(response => {
                    this.product = response.data
                })

                .catch(error => {
                console.log(error);
            });
                
        }
        
    }

</script>

<style lang="scss" scoped></style>