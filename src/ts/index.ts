import '../sass/main.sass'
import * as izin from 'izin'

document.addEventListener('DOMContentLoaded', () => {
    if (document.title === "progrestian - izin") {
        izin.initState()
    }
})
