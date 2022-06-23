function renderUsers() {
    const htmlContent = document.getElementById('content')
    const htmlContent2 = document.getElementById('side-bar')

    axios.get('/api/users').then((resp) => {
        htmlContent.innerHTML = ''
        const title = document.createElement('h1')
        title.innerText = 'Our Members'
        htmlContent.appendChild(title)

        userData = resp.data
        userData.forEach(elm => {
<<<<<<< HEAD
            const userName = document.createElement('h3')
            userName.innerText = elm.name
            const userLocation = document.createElement('p')
            userLocation.innerText = 'Location: ' + elm.location
            const userSize = document.createElement('p')
            userSize.innerText = 'Ideal shoe size: ' + elm.ideal_size
            const userPhoto = document.createElement('img')
            userPhoto.src = elm.photo_path

            //admin functionality - delete and edit users
            //delete user button
            const deleteUserButton = document.createElement('button')
            deleteUserButton.innerText = 'Delete User'
            deleteUserButton.addEventListener('click', () => {
                deleteUsers(elm.id)
            })

            //edit user button (renders an edit user form)
            const editUserButton = document.createElement('button')
            editUserButton.innerText = 'Edit'
            editUserButton.addEventListener('click', () => {
                editUsers(elm.id)
            })

            htmlContent.append(userName, userPhoto, userLocation, userSize, deleteUserButton, editUserButton)
            htmlContent2.replaceChildren()
=======
            //master user_div
            const user_div = document.createElement('div')
            user_div.classList.add('card')
            user_div.style.width = '25rem'
            //2nd master div
            const user_div_body = document.createElement('div')
            user_div_body.classList.add('card-body')
            //children of 2nd master div
                const userName = document.createElement('h3')
                userName.innerText = elm.name
                const userLocation = document.createElement('p')
                userLocation.innerText = 'Location: ' + elm.location
                const userSize = document.createElement('p')
                userSize.innerText = 'Ideal shoe size: ' + elm.ideal_size
                const userPhoto = document.createElement('img')
                userPhoto.src = elm.photo_path
                userPhoto.classList.add('img-fluid')

                //admin functionality - delete and edit users
                //delete user button
                const deleteUserButton = document.createElement('button')
                deleteUserButton.innerText = 'Delete User'
                deleteUserButton.addEventListener('click', () => {
                    deleteUsers(elm.id)
                })

                //edit user button (renders an edit user form)
                const editUserButton = document.createElement('button')
                editUserButton.innerText = 'Edit'
                editUserButton.addEventListener('click', () => {
                    editUsers(elm.id)
                })
                //append children to 2nd master div
                user_div_body.append(userName, userLocation, userSize, userPhoto, deleteUserButton, editUserButton)
                
                user_div.appendChild(user_div_body)
                htmlContent.appendChild(user_div)
>>>>>>> 3b52fb2dbdd44a7ee9caffd539fbe10032002e05
        })

    })
}

//add users is not required as this is achieved via a sign up form 'signup.js'

//function to delete users via their user id
function deleteUsers(id) {
    axios.delete(`/api/users/${id}`).then((resp) => {
        renderUsers()
    })
}

//edit users function to update email etc. (expect for password)
function editUsers(id) {
    const htmlContent = document.getElementById('content')
    const updateForm = document.createElement('form')
    updateForm.innerHTML = `

            <h1>Update User</h1>
        <form>
            <div class="form-row">
                <div class="form-group col-md-12">
                <label for="email">Email</label>
                <input type="email" name="email" class="form-control" placeholder="Email">
                </div>
                <div class="form-group col-md-12">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="name" name="name" class="form-control" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="username" name="username" class="form-control" placeholder="Username">
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                <label for="location">Location (City)</label>
                <input type="location" name="location" class="form-control" placeholder="Location (City)">
                </div>
                <div class="form-group col-md-12">
                <label for="shoe_size">Shoe Size</label>
                <select type="shoe_size" name="shoe_size" class="form-control">
                    <option selected>Choose...</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                </select>
                </div>
                <div class="form-group col-md-12">
                <label for="photo_URL">Photo (url)</label>
                <input type="photo_URL" name="photo_URL" class="form-control">
                </div>
                <div class="form-group col-md-12">
                <label for="instagram_URL">Instagram (url)</label>
                <input type="instagram_URL" name="instagram_URL" class="form-control">
                </div>    
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
    </form> 


        <h1>Update User</h1>
        <label for="email">Email: </label>
        <input type="email" name="email"><br>
        <label for="name">New Name: </label>
        <input type="text" name="name"><br>
        <label for="username">New Username: </label>
        <input type="text" name="username"><br>
        <label for="location">New Location: </label>
        <input type="text" name="location"><br>
        <label for="shoe_size">Ideal Shoe size: </label>
        <input type="number" name="shoe_size"><br>
        <label for="photo_URL">Photo URL: </label>
        <input type="url" name="photo_URL"><br>
        <label for="instagram_URL">Instagram URL: </label>
        <input type="url" name="instagram_URL"><br>
        <button type="submit">Save</button>


    `
    htmlContent.replaceChildren(updateForm)

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(updateForm)

        let email = formData.get('email')
        let name = formData.get('name')
        let username = formData.get('username')
        let shoeSize =formData.get('shoe_size')
        let location = formData.get('location')
        let photo = formData.get('photo_URL')
        let instagram = formData.get('instagram_URL')

        axios.put(`/api/users/${id}`, {
            email: email,
            name: name,
            username: username,
            size: shoeSize,
            loc: location,
            photo: photo,
            insta: instagram
        }).then((result) => {
            console.log(result)
            renderUsers()
        }).catch((error) => {
            console.log(error.response.data.message)
            const status = error.response.status
            const msg = document.createElement('p')
            if (status == 400) {
                msg.innerText = 'Please fill in all input fields when updating user'
               
            } else if (status == 500) {
                msg.innerText = 'Something went wrong with the server. Try again later'
            }
            htmlContent.appendChild(msg)
        })
    })

}
