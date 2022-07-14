
const FormatNumber = {
    withComma: function(val) {
        var parts = (+val).toFixed(2).split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "")
    }
} 


var darkMode = false

const DarkMode = {
    setDarkMode: function(val) {
        darkMode = val
    },

    getDarkMode: function() {
        return darkMode
    }
}

export { FormatNumber, DarkMode }