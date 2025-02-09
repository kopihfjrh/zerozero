document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');
    const authForm = document.getElementById('auth-form');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authSubmitButton = document.getElementById('auth-submit-button');
    const toggleAuthLink = document.getElementById('toggle-auth-link');
    const profileContent = document.getElementById('profile-content');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeEditProfile = document.getElementById('close-edit-profile');
    const editProfileForm = document.getElementById('edit-profile-form');

    let isLogin = false;

    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        displayProfile(user);
    } else {
        authModal.style.display = 'flex';
    }

    closeAuth.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    toggleAuthLink.addEventListener('click', (event) => {
        event.preventDefault();
        isLogin = !isLogin;
        if (isLogin) {
            authModalTitle.textContent = 'Вход';
            authSubmitButton.textContent = 'Войти';
            toggleAuthLink.textContent = 'Зарегистрироваться';
        } else {
            authModalTitle.textContent = 'Регистрация';
            authSubmitButton.textContent = 'Зарегистрироваться';
            toggleAuthLink.textContent = 'Войти';
        }
    });

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isLogin) {
            const user = findUser(username, password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                authModal.style.display = 'none';
                displayProfile(user);
            } else {
                alert('Неверное имя пользователя или пароль');
            }
        } else {
            const user = { username, password, fullName: '', email: '', phone: '', address: '', orders: [] };
            saveUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            authModal.style.display = 'none';
            displayProfile(user);
        }
    });

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.fullName = fullName;
        user.email = email;
        user.phone = phone;
        user.address = address;

        updateUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        editProfileModal.style.display = 'none';
        displayProfile(user);
    });

    closeEditProfile.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    function displayProfile(user) {
        profileContent.innerHTML = `
            <div class="profile-container">
                <div class="profile-info">
                    <h2>Добро пожаловать, ${user.username}!</h2>
                    <p>Полное имя: ${user.fullName || 'Не указано'}</p>
                    <p>Электронная почта: ${user.email || 'Не указано'}</p>
                    <p>Телефон: ${user.phone || 'Не указано'}</p>
                    <p>Адрес: ${user.address || 'Не указано'}</p>
                    <button id="edit-profile-button">Редактировать профиль</button>
                </div>
                <div class="profile-orders">
                    <h3>Ваши заказы</h3>
                    <ul>
                        ${user.orders.map(order => `<li>${order}</li>`).join('')}
                    </ul>
                </div>
                <div class="profile-actions">
                    <button id="logout-button">Выйти</button>
                </div>
            </div>
        `;

        const editProfileButton = document.getElementById('edit-profile-button');
        editProfileButton.addEventListener('click', () => {
            document.getElementById('full-name').value = user.fullName;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
            document.getElementById('address').value = user.address;
            editProfileModal.style.display = 'flex';
        });

        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            location.reload();
        });
    }
});
