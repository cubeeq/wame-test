<template></template>


<script>

    export default {

        props: ['product'],

        metaInfo () {

            return {
                title: this.product.Name,
                meta: [
                    { vmid: 'description', name: 'description', content: this.product.Description.substring(0, 150) },
                    { vmid: 'keywords', name: 'keywords', content: this.product.params[1] },
                    { vmid: 'author', name: 'author', content: 'cubeeq' }
                ]
            }

        }
        
    }

</script>


<style lang="scss" scoped></style>