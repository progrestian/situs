function initState() {
    document.getElementById('izin-submit').addEventListener('click', submitLogin)

    if (sessionStorage.getItem('username') != null) {
        changeStatus()
    }
}

function changeStatus() {
    const element = document.getElementById('izin-status')
    const status = 'authorized as ' + sessionStorage.getItem('username') + ', expiring in '

    const delta = parseInt(sessionStorage.getItem('expiry'), 10) - (new Date()).valueOf()
    const minutes = Math.floor(delta / 60000)

    if (minutes > 1) {
        element.textContent = status + minutes + ' minutes'
        setTimeout(changeStatus, 60000)
    } else if (minutes > 0) {
        element.textContent = status + minutes + ' minutes'
        setTimeout(changeStatus, 1000)
    } else {
        const seconds = Math.floor(delta / 1000)

        if (seconds > 0) {
            element.textContent = status + seconds + ' seconds'
            setTimeout(changeStatus, 1000)
        } else {
            element.textContent = 'unauthorized'
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('expiry')
        }
    }
}

async function submitLogin() {
    let username = (document.getElementById('izin-username') as HTMLInputElement).value
    let password = (document.getElementById('izin-password') as HTMLInputElement).value

    const response = await fetch("https://api.progrestian.com/izin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: username,
            pass: password
        })
    })

    if (response.ok) {
        const json = await response.json()
        const now = new Date()
        now.setHours(now.getHours() + 1)

        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', json.token)
        sessionStorage.setItem('expiry', now.valueOf().toString())

        changeStatus()
    }
}

export { initState, changeStatus, submitLogin, }