document.addEventListener("DOMContentLoaded", () => {
    const signup = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const expectations = document.getElementById("expectations").value;
        const discovery = document.getElementById("discovery").value;
        const availability = document.querySelector('input[name="availability"]:checked').value;
        const profileImage = document.getElementById('profile').files[0];
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("whatsapp", whatsapp);
        formData.append("expectations", expectations);
        formData.append("discovery", discovery);
        formData.append("availability", availability);
        formData.append("profileImage", profileImage);

        fetch("http://localhost:3333/users", {
          method: "POST",
          body: formData,
        })
        .then(function (response) {
          if (response.ok) {
            document.getElementById("registration-form").reset();
            document.getElementById('fill-fields').style.display = 'none';
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
    
    const signupButton = document.getElementById('signup');
    signupButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (!validateForm()) {
            document.getElementById('fill-fields').style.display = 'flex';
        } else {
            document.getElementById('fill-fields').style.display = 'none';
            signup();
        }
        
    });

    const handlePhone = (event) => {
        const input = event.target
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
    whatsappInput.addEventListener('input', (event) => {
        handlePhone(event);
    })

    // Função para validar o formulário
    function validateForm() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const expectations = document.getElementById("expectations").value;
        const discovery = document.getElementById("discovery").value;
        const availability = document.querySelector('input[name="availability"]:checked').value;
        const profileImage = document.getElementById('profile').files[0];

        // Verifique se algum campo obrigatório está em branco
        if (!name || !email || !whatsapp || !expectations || !discovery || !availability || !profileImage) {
            return false;
        }

        return true;
    }
});
