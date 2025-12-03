/*
 * scripts/script.js
 * Lógica de asignación de amigos invisibles basada en JSON
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       LÓGICA PÁGINA: seleccion.html
       ==================================================== */
    const inputCode = document.getElementById('userCode');
    const btnNext = document.getElementById('btnNext');

    if (btnNext && inputCode) {

        const validateAndProceed = async () => {
            const code = inputCode.value.trim().toUpperCase(); // Convertimos a mayúsculas por si acaso

            // 1. Validación básica de longitud visual
            if (code.length !== 10) {
                showError("El código debe tener 10 caracteres.");
                return;
            }

            try {
                // 2. Deshabilitar botón mientras carga para evitar dobles clicks
                btnNext.textContent = "Verificando...";
                btnNext.disabled = true;

                // 3. Buscar en el archivo JSON
                // Nota: Usamos una ruta relativa al archivo json
                const response = await fetch('identidades.json');

                if (!response.ok) {
                    throw new Error("No se pudo cargar la base de datos de amigos.");
                }

                const usuarios = await response.json();

                // 4. Buscar si el código existe
                const usuarioEncontrado = usuarios.find(u => u.codigo === code);

                if (usuarioEncontrado) {
                    // ¡ÉXITO! Redirigimos pasando el MISMO código (o un ID) para no exponer nombres en la URL
                    // encodeURIComponent asegura que la URL sea válida
                    window.location.href = `amigo.html?id=${encodeURIComponent(code)}`;
                } else {
                    // El código no está en la lista
                    showError("Código incorrecto o no encontrado.");
                    btnNext.textContent = "Siguiente";
                    btnNext.disabled = false;
                }

            } catch (error) {
                console.error(error);
                showError("Error técnico al cargar los datos.");
                btnNext.textContent = "Siguiente";
                btnNext.disabled = false;
            }
        };

        // Función auxiliar para mostrar errores visuales
        const showError = (msg) => {
            inputCode.style.borderColor = '#D42426';
            inputCode.style.backgroundColor = '#fff0f0';

            // Animación de vibración
            const wrapper = document.querySelector('.card-container');
            wrapper.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });

            inputCode.focus();
            // Opcional: Podrías añadir un elemento <p> de error en el HTML si quisieras mostrar el mensaje 'msg'
            // Por ahora solo vibra y se pone rojo como pediste.
        };

        // Event Listeners
        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            validateAndProceed();
        });

        inputCode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                validateAndProceed();
            }
        });

        inputCode.addEventListener('input', () => {
            inputCode.style.borderColor = '#ddd';
            inputCode.style.backgroundColor = '#fafafa';
        });
    }

    /* ====================================================
       LÓGICA PÁGINA: amigo.html (Resultado)
       ==================================================== */
    const textGreeting = document.getElementById('textGreeting');
    const textTarget = document.getElementById('textTarget');

    if (textGreeting && textTarget) {

        const initResultPage = async () => {
            // 1. Obtener el código de la URL
            const urlParams = new URLSearchParams(window.location.search);
            const userCode = urlParams.get('id');

            if (!userCode) {
                // Si alguien entra sin código, lo mandamos al inicio
                window.location.href = 'index.html';
                return;
            }

            try {
                // 2. Cargar datos reales nuevamente
                // Volvemos a cargar el JSON para asegurar que tenemos la data fresca y correcta
                const response = await fetch('identidades.json');
                if (!response.ok) throw new Error("Error de red");

                const usuarios = await response.json();

                // 3. Encontrar al usuario
                const usuario = usuarios.find(u => u.codigo === userCode);

                if (usuario) {
                    // MOSTRAR DATOS
                    textGreeting.innerText = `¡Hola, ${usuario.nombre}!`;

                    // Efecto de "Decodificando..."
                    textTarget.style.opacity = '0.5';
                    textTarget.innerText = "Buscando...";

                    setTimeout(() => {
                        // Revelar el amigo
                        textTarget.innerText = usuario.amigo;

                        // Animación CSS JS
                        textTarget.animate([
                            { opacity: 0, transform: 'scale(0.5)' },
                            { opacity: 1, transform: 'scale(1.1)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], { duration: 600, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });

                    }, 1000); // 1 segundo de suspenso

                } else {
                    // Código en URL inválido (alguien intentó inventar una URL)
                    textGreeting.innerText = "Error";
                    textTarget.innerText = "Código Inválido";
                }

            } catch (error) {
                console.error(error);
                textGreeting.innerText = "Error";
                textTarget.innerText = "No se pudieron cargar los datos.";
            }
        };

        // Iniciar lógica
        initResultPage();
    }
});