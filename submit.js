var signup = function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var whatsapp = document.getElementById("whatsapp").value;
    var expectations = document.getElementById("expectations").value;
    var discovery = document.getElementById("discovery").value;
    var availability = document.querySelector('input[name="availability"]:checked').value;
    var formData = {
        name: name,
        email: email,
        whatsapp: whatsapp,
        expectations: expectations,
        discovery: discovery,
        availability: availability,
    };
    fetch("https://codepsique-signup.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(function (response) {
        if (response.ok) {
            document.getElementById("registration-form").reset();
            alert("Inscrição enviada com sucesso!");
        }
        else {
            console.error("Erro ao enviar a inscrição");
        }
    })
        .catch(function (error) {
        console.error("Erro de rede ao enviar a inscrição", error);
    });
};
var signupButton = document.getElementById('signup');
signupButton.addEventListener('click', function (event) {
    console.log('teste');
    event.preventDefault();
    signup();

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

const whatsappInput = document.getElementById('whatsapp');
whatsappInput.addEventListener('input', () => {
    handlePhone();
})
});
