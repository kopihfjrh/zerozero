const usersData = JSON.parse(localStorage.getItem('usersData')) || [];

function saveUser(user) {
    usersData.push(user);
    localStorage.setItem('usersData', JSON.stringify(usersData));
}

function findUser(username, password) {
    return usersData.find(user => user.username === username && user.password === password);
}

function updateUser(updatedUser) {
    const index = usersData.findIndex(user => user.username === updatedUser.username);
    if (index !== -1) {
        usersData[index] = updatedUser;
        localStorage.setItem('usersData', JSON.stringify(usersData));
    }
}
