export default {
  
  methods: {

    /*
    * Nastavenie farebenej variatny produktu
    */
    updateSelectedColor(color) {
      this.selectedColor = color;
    },

    /*
    * Vracia znak meny
    */
    giveCurrency() {

      let currency = this.product.CurrencyCode.toUpperCase();

      if (currency == 'EUR') {
        return '€';
      } else if (currency == 'USD') {
        return '$';
      } else if (currency == 'CZK') {
        return 'kč';
      } else {
        return currency;
      }

    },
    
    /*
    * Schovanie popisu produktu
    */
    fullText() {
      this.hideText = false;
    }

  },

  filters: {
    
    /*
    * Filter pre kapitalizáciu prvého písmena
    */
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    /*
    * Nastavenie počtu zobrazených znakov a schovanie popisu produktu
    */
    truncate: function(string, value) {
      return string.substring(0, value) + '... ';
    }

  }

}