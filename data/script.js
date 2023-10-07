

const getUsers = async () => {
  const allUsers = await fetch("https://codepsique-signup.onrender.com/users", {
    method: "GET",
    })
    return allUsers;
  }

  const getUserProfileImage = async (id) => {
    const profileImage = await fetch(`https://codepsique-signup.onrender.com/users/${id}/image`);
    return profileImage;
  }

  const createProfileElement = (userName, userImage) => {
    const profileElement = document.createElement('div');
    const profileImageElement = document.createElement('img');
    const userNameElement = document.createElement('h3');
    
    profileImageElement.setAttribute("src", userImage);
    userNameElement.innerText = userName;
    profileElement.appendChild(profileImageElement);
    profileElement.appendChild(userNameElement);

    return profileElement;
  };

  const loadUsers = async () => {
    const container = document.getElementById('container-profiles');
    const allUsers = await getUsers().then((response) => response.json());
    allUsers.forEach(async (user) => {
      const profileImage = await getUserProfileImage(user.id).then((response) => response.blob());
      const url = window.URL || window.webkitURL;
      const profileElement = createProfileElement(user.name, url.createObjectURL(profileImage));
      container.appendChild(profileElement);
    })
  }
  window.onload = loadUsers;
