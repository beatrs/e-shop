
const FormatNumber = {
    formatPrice: function(price) {
        var parts = (+price).toFixed(2).split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "")
    }
} 

export default FormatNumber