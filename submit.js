document.addEventListener("DOMContentLoaded", function () {
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
        validateForm();
        
    });

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
    whatsappInput.addEventListener('input', (e) => {
        handlePhone(e);
    })

    const form = document.getElementById('registration-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        // Verifique se algum campo obrigatório não foi preenchido
        if (!validateForm()) {
            event.preventDefault(); // Impede o envio do formulário
            errorMessage.textContent = 'Todos os campos devem ser preenchidos.';
        } else {
            errorMessage.textContent = ''; // Limpa a mensagem de erro se tudo estiver preenchido
        }
    });

    // Função para validar o formulário
    function validateForm() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const expectations = document.getElementById("expectations").value;
        const discovery = document.getElementById("discovery").value;
        const availability = document.querySelector('input[name="availability"]:checked');

        // Verifique se algum campo obrigatório está em branco
        if (!name || !email || !whatsapp || !expectations || !availability) {
            return false;
        }

        return true;
    }
});
