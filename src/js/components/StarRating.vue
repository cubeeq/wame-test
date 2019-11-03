<template>
    <div class="rating">
        <div class="css-reverse">
            <span v-for="star in stars" class="star" :name="star" :key="star">
                <font-awesome-icon icon="star" v-on:click="setVote(ProductId, star)"></font-awesome-icon>
            </span>
        </div>
        <span class="votes">
            {{ ratingSum(ProductId, 'votes') }} hodnotení
        </span>
        <span class="average">
            (&empty; {{ ratingSum(ProductId) }})
        </span>
    </div>
</template>

<script>

    // Import AXIOS
    import axios from 'axios';

    export default {

        props: ['stars', 'ProductId'],

        data() {
            return {
                ratings: null,
                count: ''
            }
        },

        methods: {

            /*
            * Pridanie hodnotenia
            */
            setVote(ProductId, star) {

                // Konverzia odoslanej hodnoty z css-reverse
                let result = this.stars - star + 1;
                
                let id = ProductId;

                let ratings = this.ratings;

                // Šablóna JSON nového hodnotenia
                let rating = {
                    rating: {
                        ProductId: id,
                        stars: result
                    }
                };
                
                // Pripojenie nového hodnotenia ku JSONu
                ratings.push(rating);

                let req = new XMLHttpRequest();

                req.open("PUT", "https://api.jsonbin.io/b/5dbc205f0448cf5e89350782", true);
                req.setRequestHeader("Content-type", "application/json");
                req.send(JSON.stringify(ratings));
                
                
            },

            ratingSum(productId, votes) {

                let count = 0;
                let sum = 0;

                for( let i = 0; i < this.ratings.length; i++) {

                    // Výber hodnotení produktov podľa ID
                    let selectAll = JSON.stringify(this.ratings[i].rating.ProductId);
                    
                    // Výber udelených hviezd produktov
                    let selectStar = JSON.stringify(this.ratings[i].rating.stars);

                    // Očistenie od úvodzoviek a konverzia na integer
                    let clearId = parseInt(selectAll.replace(/"|"/, ""), 10);
                    
                    // Porovnanie a zápis zhodných produktov s výpočtom priemeru
                    if(clearId == productId) {

                        count += 1;
                        
                        // Prepočet hviezd vybraného produktu
                        for(let i = 0; i < selectStar.length; i++) {
                            sum += parseInt(selectStar, 10);
                        }

                        // Získanie priemeru - vydelenie súčtu hviezd ich počtom
                        var avg = sum / count;

                    }
                }

                // Získanie hodnoty počet hlasov alebo priemeru
                if (votes == 'votes') {

                    return count;

                } else {

                    return avg ? avg.toFixed(1) : "0";

                }

            }
            
        },

        mounted() {

            // Pripojenie ku API
            axios
                .get('https://api.jsonbin.io/b/5dbc205f0448cf5e89350782/latest')
                .then(response => (this.ratings = response.data))
                .catch(error => {
                    let body = document.querySelector('body');
                    body.innerText = error + " / StarRating Component";
                }
            );

        }

    }
    
</script>

<style scoped>

    /*
    * Import StarRating.scss
    */
    @import '../../scss/components/StarRating.scss';

</style>