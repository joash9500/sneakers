function renderHeader() {
    const headerNode = document.getElementById('headerbar') //get html element for the header bar
    headerNode.innerHTML = `
    <nav id='navigationBar' class=" navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#" onClick = "renderSneakers()">SoleMates</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="d-flex justify-content-between collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" onClick = "renderSneakers()">
                <a class="nav-link" href="#">All Sneakers</a>
            </li>
            <li class="nav-item" onClick = "renderListings()">
                <a class="nav-link" href="#">All Listings</a>
            </li>
            <li class="nav-item" onClick = "renderUsers()">
                <a class="nav-link" href="#">Users</a>
            </li>
            <li class="nav-item" onClick = "renderMySneakers()">
                <a class="nav-link" href="#" id="my-sneakers" style="display: none">My Sneakers</a>
            </li>
            <li class="nav-item" onClick = "renderAddSneakerForm()">
                <a class="nav-link" href="#" id="add-sneaker" style="display: none">Add Sneaker</a>
            </li>
            <li class="nav-item" onClick = "renderSignup()">
                <a class="nav-link" href="#" id ="signup">Signup</a>
            </li>
            <li class="nav-item" onClick = "renderLogin()">
                <a class="nav-link" href="#" id="log-in">Login</a>
            </li>
        </ul>
    </div>
    <div id=searchBox> 
    </div> 
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <p id="user" style="display: none">Logged in as <span></span></p>
                <a class="nav-link" id="log-out" style="display: none" href="#">Logout</a>

            </li>
        </ul>
    </div>
    </nav>
`
    let logoutButton = document.querySelector('#log-out')
    let loginButton = document.querySelector('#log-in')
    let username = document.querySelector('#user > span')
    let userStatus = document.querySelector('#user')
    let signupButton = document.querySelector('#signup')
    let addSneakerButton = document.querySelector('#add-sneaker')
    let mySneakersButton = document.querySelector('#my-sneakers')
    
    
    axios.get('/api/session').then((res) => {
        if (res.data.name == undefined) {
            //do nothing. 'logged in as' stays hidden
        } else if (res.data != undefined) {
            userStatus.style.display = 'inline-block' //unhide 'logged in as'
            username.innerText = res.data.name //update the span tag
            logoutButton.style.display = 'inline-block' //show logout button
            loginButton.style.display = 'none' //hide login button
            signupButton.style.display = 'none' //hide signup button
            addSneakerButton.style.display = 'inline-block' //show add sneaker button
            mySneakersButton.style.display = 'inline-block' //show my sneakers button
        } else {
            console.log('something weird happened with api session')
        }
    })
    let logout = document.querySelector('#log-out')
    logout.addEventListener('click', () => {
        axios.delete('/api/session').then(() => {
            console.log('logged out')
            renderHeader()
            renderSneakers()
        })
    })
}