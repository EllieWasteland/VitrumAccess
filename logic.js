const legalTexts = {
    termsAndConditions: `<h3>1. Aceptación de los Términos</h3><p>Al acceder y utilizar Vitrum.Space (el "Servicio"), usted acepta y se compromete a cumplir con estos términos y condiciones de uso ("Términos"). Si no está de acuerdo con estos Términos, no debe acceder ni utilizar el Servicio.</p><h3>2. Descripción del Servicio</h3><p>Vitrum.Space proporciona un ticket de acceso universal para estudiantes, que sirve como un identificador digital para acceder a un ecosistema de beneficios y servicios dentro de la comunidad educativa.</p><h3>3. Uso Aceptable</h3><p>Usted se compromete a no utilizar el Servicio para ningún propósito ilegal o no autorizado. Acepta cumplir con todas las leyes, normas y reglamentos locales, estatales, nacionales e internacionales aplicables a su uso del Servicio.</p><p>El contenido de este documento es un marcador de posición y debe ser reemplazado por los términos y condiciones oficiales de la aplicación.</p>`,
    privacyPolicy: `<h3>1. Información que Recopilamos</h3><p>Recopilamos información que usted nos proporciona directamente, como su nombre, correo electrónico institucional, carrera, ciclo y modalidad de estudio. Esta información es necesaria para crear y gestionar su ticket de acceso universal.</p><h3>2. Cómo Utilizamos su Información</h3><p>Utilizamos la información recopilada para:</p><ul><li>Crear y personalizar su identificador digital.</li><li>Proporcionar y mejorar nuestros servicios.</li><li>Comunicarnos con usted sobre actualizaciones y noticias relevantes.</li></ul><h3>3. Seguridad de los Datos</h3><p>Tomamos medidas razonables para proteger la información que nos proporciona contra pérdida, robo, uso indebido y acceso no autorizado. Sin embargo, ningún sistema de seguridad es impenetrable y no podemos garantizar la seguridad absoluta de su información.</p><p>Esta es una política de privacidad de ejemplo y debe ser revisada y adaptada por un profesional legal.</p>`
};

document.addEventListener('DOMContentLoaded', () => {
    const onboardingContainer = document.getElementById('onboarding-container');
    const mainAppContainer = document.getElementById('main-app-container');
    const floatingElementsContainer = document.getElementById('floating-elements-container');
    
    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyB1W2yLlVHivzBQPZJVOgpApQeYnJUFzCs",
        authDomain: "vitreumucuencahub.firebaseapp.com",
        projectId: "vitreumucuencahub",
        storageBucket: "vitreumucuencahub.appspot.com",
        messagingSenderId: "628136581064",
        appId: "1:62813654602fd2fd874d61"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    // Se elimina la siguiente línea para permitir la selección de cualquier cuenta de Google.
    // provider.setCustomParameters({ 'hd': 'ucuenca.edu.ec' });

    // --- Lógica de Elementos Flotantes ---
    function createFloatingElements() {
        const imageUrls = [
            './I1.webp',
            './I2.webp',
            './I1.webp'
        ];
        const numElements = 15;

        for (let i = 0; i < numElements; i++) {
            const el = document.createElement('div');
            el.className = 'floating-element';
            
            const img = document.createElement('img');
            img.src = imageUrls[i % imageUrls.length];
            el.appendChild(img);

            el.style.left = `${Math.random() * 100}vw`;
            el.style.width = `${Math.random() * 80 + 40}px`; // 40px to 120px wide
            el.style.animationDelay = `${Math.random() * 20}s`;
            el.style.animationDuration = `${Math.random() * 15 + 15}s`; // 15s to 30s duration

            floatingElementsContainer.appendChild(el);
        }
    }


    // --- Lógica de Onboarding ---
    let currentScene = null;
    const scenes = {
        welcome: () => `<div class="parallax-element" data-depth="0.1" style="top: 5%; left: 8%;"><img src="I1.webp" alt="Abstract Shape 1" style="width: 150px; opacity: 0.7;"></div><div class="parallax-element" data-depth="-0.15" style="bottom: 8%; right: 5%;"><img src="I2.webp" alt="Abstract Shape 2" style="width: 200px; opacity: 0.8;"></div><div class="parallax-element" data-depth="0.05"><div class="content-wrapper"><h1>Bienvenido a Vitrum.Space</h1><p>Estás a punto de crear tu ticket de acceso universal. Este identificador digital te abrirá las puertas a un ecosistema de beneficios y servicios.</p><div class="button-group"><button class="btn" id="start-btn">Comenzar Creación</button></div></div></div>`,
        terms: () => `<div class="parallax-element" data-depth="0.05"><div class="content-wrapper"><h1>Términos y Condiciones</h1><div class="legal-text-container" id="legal-container">${legalTexts.termsAndConditions}</div><div class="button-group"><button class="btn secondary" id="reject-btn">Rechazar</button><button class="btn disabled" id="accept-terms-btn">Aceptar y Continuar</button></div></div></div>`,
        privacy: () => `<div class="parallax-element" data-depth="0.05"><div class="content-wrapper"><h1>Protección de Datos</h1><div class="legal-text-container" id="legal-container">${legalTexts.privacyPolicy}</div><div class="button-group"><button class="btn secondary" id="reject-btn">Rechazar</button><button class="btn disabled" id="accept-privacy-btn">Aceptar y Continuar</button></div></div></div>`,
        login: () => `
            <div class="parallax-element" data-depth="0.05">
                <div class="content-wrapper" style="background: var(--surface-color); border: 1px solid var(--border-color); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 15px; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);">
                    <h1>Paso Final: Autenticación</h1>
                    <p>Para garantizar la seguridad y exclusividad de la comunidad, por favor inicia sesión con tu cuenta institucional de la universidad.</p>
                    <button class="btn google-login-btn" id="google-login-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.6,5.36 16.81,6.45L18.87,4.59C17.01,3.01 14.7,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.29C21.54,11.77 21.48,11.44 21.35,11.1Z"/></svg>
                        <span>Iniciar sesión con Google</span>
                    </button>
                </div>
            </div>`
    };
    function showScene(sceneName) {
        if (currentScene) currentScene.classList.remove('active');
        const sceneElement = document.createElement('div');
        sceneElement.className = 'onboarding-scene';
        sceneElement.innerHTML = scenes[sceneName]();
        onboardingContainer.innerHTML = '';
        onboardingContainer.appendChild(sceneElement);
        void sceneElement.offsetWidth;
        sceneElement.classList.add('active');
        currentScene = sceneElement;
        addSceneEventListeners(sceneName);
    }
    function addSceneEventListeners(sceneName) {
        switch(sceneName) {
            case 'welcome': document.getElementById('start-btn').addEventListener('click', () => showScene('terms')); break;
            case 'terms': case 'privacy':
                const container = document.getElementById('legal-container');
                const acceptBtn = sceneName === 'terms' ? document.getElementById('accept-terms-btn') : document.getElementById('accept-privacy-btn');
                document.getElementById('reject-btn').addEventListener('click', () => showScene('welcome'));
                container.addEventListener('scroll', () => { if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) { acceptBtn.classList.remove('disabled'); } });
                acceptBtn.addEventListener('click', () => { if (!acceptBtn.classList.contains('disabled')) { const next = sceneName === 'terms' ? 'privacy' : 'login'; showScene(next); } });
                break;
            case 'login': document.getElementById('google-login-btn').addEventListener('click', signInWithGoogle); break;
        }
    }
    function signInWithGoogle() {
        auth.signInWithPopup(provider)
            .then(result => {
                // Se mantiene la validación post-login del dominio del correo.
                if (!result.user.email.endsWith('@ucuenca.edu.ec')) {
                    auth.signOut();
                    alert('Acceso denegado. Debes usar una cuenta institucional (@ucuenca.edu.ec).');
                    return;
                }
                onboardingContainer.style.opacity = '0';
                onboardingContainer.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    onboardingContainer.style.display = 'none';
                    mainAppContainer.classList.add('visible');
                    initializeAppLogic(result.user);
                }, 500);
            })
            .catch(error => { console.error("Error de autenticación:", error); alert("Hubo un error al iniciar sesión: " + error.message); });
    }
    onboardingContainer.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2, centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / centerX, moveY = (clientY - centerY) / centerY;
        document.querySelectorAll('.parallax-element').forEach(el => {
            const depth = el.dataset.depth || 0;
            const x = -moveX * 50 * depth, y = -moveY * 50 * depth;
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    });

    // --- Lógica de la Aplicación Principal ---
    function initializeAppLogic(user) {
        const questionContainer = document.getElementById('question-container');
        const questionTitle = document.getElementById('question-title');
        const carouselWrapper = document.getElementById('carousel-wrapper');
        const navButtons = document.getElementById('navigation-buttons');
        const nextQuestionBtn = document.getElementById('next-question-btn');
        const ticketScene = document.getElementById('ticket-scene');
        const ticketFlipper = document.getElementById('ticket-flipper');
        const ticketRotator = document.getElementById('ticket-rotator');
        const ticketPhoto = document.getElementById('ticket-photo');
        const ticketGlare = document.querySelector('.ticket-glare');
        const loadingOverlay = document.getElementById('loading-overlay');
        const ambassadorPromptContainer = document.getElementById('ambassador-prompt-container');
        const becomeAmbassadorBtn = document.getElementById('become-ambassador-btn');
        const requestInfoBtn = document.getElementById('request-info-btn');
        const logoutBtn = document.getElementById('logout-btn');


        ticketPhoto.src = user.photoURL || 'https://i.pinimg.com/736x/69/38/e4/6938e42485cf0eaf14ac0e9848fd0e0f.jpg';

        // MODIFICACIÓN: Se eliminan 'isContinuous' y 'useAI' de los datos iniciales.
        const userData = {
            uid: user.uid, email: user.email, photoURL: user.photoURL,
            firstName: user.displayName.split(' ').slice(0, -1).join(' '),
            lastName: user.displayName.split(' ').slice(-1).join(' '),
            displayName: user.displayName,
            major: 'educacion-basica', cycle: '1', modality: 'matutino'
        };
        
        // MODIFICACIÓN: Se eliminan las dos últimas preguntas del array.
        const questions = [
            { key: 'name', title: 'Primero, verifica tu nombre', type: 'input' },
            { key: 'major', title: 'Ahora, selecciona tu carrera', options: [ { value: 'periodismo', title: 'Periodismo', description: 'Para futuros comunicadores y reporteros.', imageUrl: './I1.webp' }, { value: 'educacion-basica', title: 'E. Básica', description: 'Formando a los educadores del mañana.', imageUrl: './I1.webp' }, { value: 'educacion-inicial', title: 'E. Inicial', description: 'Especializados en la primera infancia.', imageUrl: './I1.webp' }, { value: 'filosofia', title: 'Filosofía', description: 'Explorando las grandes preguntas.', imageUrl: './I1.webp' } ] },
            { key: 'cycle', title: '¿En qué ciclo te encuentras?', options: Array.from({ length: 8 }, (_, i) => ({ value: `${i + 1}`, title: `Ciclo ${i + 1}`, description: `Cursando el ${i + 1}° ciclo académico.`, imageUrl: './I1.webp' })) },
            { key: 'modality', title: '¿Cuál es tu modalidad de estudio?', options: [ { value: 'matutino', title: 'Matutina', description: 'Clases principalmente por la mañana.', imageUrl: './I1.webp' }, { value: 'vespertino', title: 'Vespertina', description: 'Clases principalmente por la tarde.', imageUrl: './I1.webp' } ] }
        ];
        
        let currentQuestionIndex = 0;
        let selectedValue = null;

        function displayQuestion(index) {
            const question = questions[index];
            selectedValue = null;
            navButtons.classList.remove('visible');
            questionTitle.textContent = question.title;
            carouselWrapper.innerHTML = ''; // Clear previous content

            if (question.type === 'input') {
                carouselWrapper.style.height = 'auto'; // Adjust height
                carouselWrapper.innerHTML = `
                    <div class="name-input-container">
                        <div>
                            <label for="firstNameInput">Nombres</label>
                            <input type="text" id="firstNameInput" value="${userData.firstName}">
                        </div>
                        <div>
                            <label for="lastNameInput">Apellidos</label>
                            <input type="text" id="lastNameInput" value="${userData.lastName}">
                        </div>
                    </div>
                `;
                selectedValue = 'input_form'; // Placeholder to pass validation
                navButtons.classList.add('visible');
            } else {
                carouselWrapper.style.height = '400px'; // Reset height
                question.options.forEach((option, idx) => {
                    const card = document.createElement('div');
                    card.className = 'carousel-card';
                    card.dataset.value = option.value;
                    card.dataset.index = idx;
                    
                    const imageContent = option.imageUrl
                        ? `<img src="${option.imageUrl}" alt="${option.title}">`
                        : `<div class="card-text-placeholder"><span>${option.title}</span></div>`;

                    card.innerHTML = `
                        <div class="card-image-container">
                            ${imageContent}
                        </div>
                        <h3 class="card-title">${option.title}</h3>
                        <p class="card-description">${option.description}</p>
                    `;
                    card.addEventListener('click', () => handleCardSelection(idx));
                    carouselWrapper.appendChild(card);
                });
                arrangeCards(0, false);
            }
            questionContainer.classList.remove('hidden');
        }
        
        function handleCardSelection(selectedIndex) {
             const selectedCard = carouselWrapper.querySelector(`.carousel-card[data-index='${selectedIndex}']`);
             if (!selectedCard) return;
             selectedValue = selectedCard.dataset.value;
             arrangeCards(selectedIndex, true);
             navButtons.classList.add('visible');
        }

        function arrangeCards(selectedIndex, isSelection) {
            const cards = carouselWrapper.querySelectorAll('.carousel-card');
            const translationPercentage = window.innerWidth < 600 ? 85 : 120;

            cards.forEach((card, i) => {
                const offset = i - selectedIndex;
                let transform = '';
                let filter = 'blur(4px)';
                let opacity = '0.5';
                let zIndex = 1;

                if (offset === 0) {
                    transform = 'translateX(0) scale(1)';
                    filter = 'blur(0)';
                    opacity = '1';
                    zIndex = 10;
                    if (isSelection) card.style.borderColor = 'var(--primary-color)';
                } else if (offset === 1 || offset === -1) {
                    transform = `translateX(${offset * translationPercentage}%) scale(0.8)`;
                    zIndex = 5;
                    card.style.borderColor = 'var(--border-color)';
                } else {
                   transform = `translateX(${offset * translationPercentage}%) scale(0.7)`;
                   opacity = '0';
                   zIndex = 1;
                   card.style.borderColor = 'var(--border-color)';
                }
                card.style.transform = transform;
                card.style.filter = filter;
                card.style.opacity = opacity;
                card.style.zIndex = zIndex;
            });
        }

        function handleNextQuestion() {
            if (selectedValue === null) {
                nextQuestionBtn.style.animation = 'shake 0.5s';
                setTimeout(() => nextQuestionBtn.style.animation = '', 500);
                return;
            }

            const currentQuestion = questions[currentQuestionIndex];
            
            if (currentQuestion.type === 'input') {
                const firstName = document.getElementById('firstNameInput').value.trim();
                const lastName = document.getElementById('lastNameInput').value.trim();
                if (!firstName || !lastName) {
                     nextQuestionBtn.style.animation = 'shake 0.5s';
                     setTimeout(() => nextQuestionBtn.style.animation = '', 500);
                     return;
                }
                userData.firstName = firstName;
                userData.lastName = lastName;
                userData.displayName = `${firstName} ${lastName}`;
            } else {
                userData[currentQuestion.key] = selectedValue;
            }
            
            // Lógica para mostrar la propuesta de embajador
            if (currentQuestion.key === 'major' && selectedValue !== 'educacion-basica') {
                questionContainer.classList.add('hidden');
                setTimeout(() => {
                    ambassadorPromptContainer.classList.add('visible');
                }, 500);
                return; // Detiene el flujo normal
            }

            questionContainer.classList.add('hidden');
            
            setTimeout(() => {
                ticketScene.classList.add('visible');
                ticketFlipper.classList.add('is-flipping-in');
            }, 500);

            ticketFlipper.addEventListener('animationend', (event) => {
                if (event.animationName !== 'reveal-and-flip') return;
                ticketFlipper.classList.remove('is-flipping-in');
                
                if (currentQuestion.type === 'input') {
                    const el = document.getElementById('ticket-displayName');
                    el.textContent = userData.displayName.toUpperCase();
                    triggerRefreshAnimation(el);
                } else {
                    updateTicketDisplay(currentQuestion.key);
                }
                
                setTimeout(() => {
                    ticketScene.classList.remove('visible');
                    currentQuestionIndex++;
                    // MODIFICACIÓN: Se cambia la condición para mostrar la tarjeta final
                    if (currentQuestionIndex < questions.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        // En lugar de finalizar, ahora mostramos la tarjeta de confianza
                        showFinalCard();
                    }
                }, 1500);
            }, { once: true });
        }
        
        function triggerRefreshAnimation(element) {
            if (!element || element.classList.contains('refresh-cover')) return;
            element.classList.add('text-to-refresh', 'refresh-cover');
            setTimeout(() => {
                element.classList.remove('refresh-cover');
                element.classList.add('refresh-reveal');
                setTimeout(() => element.classList.remove('refresh-reveal', 'text-to-refresh'), 500);
            }, 450);
        }

        function updateTicketDisplay(field) {
            if (field === 'major') {
                const el = document.getElementById('ticket-major');
                const majorText = {'periodismo': 'Periodismo', 'educacion-basica': 'E. Básica', 'educacion-inicial': 'E. Inicial', 'filosofia': 'Filosofía'};
                el.textContent = `CARRERA DE ${majorText[userData.major] || '#######'}`.toUpperCase();
                triggerRefreshAnimation(el);
            }
            if (field === 'cycle' || field === 'modality') {
                const el = document.getElementById('ticket-cycle-modality');
                el.textContent = `${userData.cycle}° CICLO, MODALIDAD: ${userData.modality.toUpperCase()}`;
                triggerRefreshAnimation(el);
            }
        }

        // NUEVA FUNCIÓN: Muestra la tarjeta de confianza final.
        function showFinalCard() {
            questionContainer.classList.add('hidden');
            // Usamos el contenedor de embajador como base, pero lo llenaremos con nuevo contenido.
            ambassadorPromptContainer.innerHTML = `
                <h3>¡Todo listo, ${userData.firstName}!</h3>
                <p>Confiamos en que uses VitrumSpace para mejorar no solo en tu vida universitaria, sino fuera de ella. Tu horario es más que flexible y lo puedes modificar como gustes con el editor integrado.</p>
                <div class="ambassador-buttons">
                    <button id="finish-setup-btn" class="wizard-btn">Enviar mi ticket de acceso</button>
                </div>
            `;
            
            setTimeout(() => {
                ambassadorPromptContainer.classList.add('visible');
                 // Añadimos el listener para el nuevo botón.
                document.getElementById('finish-setup-btn').addEventListener('click', finalizeConfiguration, { once: true });
            }, 300);
        }

        function finalizeConfiguration() {
            // Ocultamos la tarjeta final antes de mostrar el ticket.
            ambassadorPromptContainer.classList.remove('visible');
            userData.displayName = `${userData.firstName} ${userData.lastName}`;
            
            setTimeout(() => {
                ticketScene.classList.add('visible');
                ticketFlipper.classList.add('is-spinning');
            }, 500); // Pequeña espera para la transición
            
            ticketFlipper.addEventListener('animationend', (e) => {
                if (e.animationName !== 'spin-four-times') return;
                
                loadingOverlay.classList.add('visible');

                // Wait for a few seconds on the loading screen before redirecting
                setTimeout(() => {
                    const finalJson = JSON.stringify(userData);
                    const base64String = btoa(unescape(encodeURIComponent(finalJson)));
                    const targetUrl = `https://vitrumspace.netlify.app/?userData=${encodeURIComponent(base64String)}`;
                    window.location.href = targetUrl;
                }, 4000); // 4-second delay

            }, { once: true });
        }

        nextQuestionBtn.addEventListener('click', handleNextQuestion);
        becomeAmbassadorBtn.addEventListener('click', () => {
            window.location.href = 'https://wa.link/8mq653';
        });
        requestInfoBtn.addEventListener('click', () => {
            window.location.href = 'https://wa.link/t9jqkc';
        });
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                window.location.reload();
            }).catch(error => {
                console.error("Error al cerrar sesión:", error);
            });
        });
        
        ticketScene.addEventListener('mousemove', (e) => {
            const rect = ticketScene.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const centerX = rect.width / 2, centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; const rotateY = -(x - centerX) / 20;
            ticketRotator.style.transform = `scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            const glareX = (x / rect.width) * 100; const glareY = (y / rect.height) * 100;
            ticketGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, hsla(0, 0%, 100%, 0.25), transparent 60%)`;
        });
        ticketScene.addEventListener('mouseleave', () => {
            ticketRotator.style.transition = 'transform 0.5s ease-in-out';
            ticketRotator.style.transform = `scale(1)`;
            ticketGlare.style.opacity = '0';
        });
        ticketScene.addEventListener('mouseenter', () => {
            ticketRotator.style.transition = 'transform 0.1s ease';
            ticketGlare.style.opacity = '1';
        });

        const displayNameEl = document.getElementById('ticket-displayName');
        displayNameEl.textContent = userData.displayName.toUpperCase();
        triggerRefreshAnimation(displayNameEl);
        
        displayQuestion(0);
    }

    // --- Verificación del Estado de Autenticación ---
    auth.onAuthStateChanged(user => {
        if (user && user.email.endsWith('@ucuenca.edu.ec')) {
             onboardingContainer.style.display = 'none';
             mainAppContainer.classList.add('visible');
             initializeAppLogic(user);
        } else {
            showScene('welcome');
        }
    });
    
    // Initialize floating elements as soon as the DOM is ready
    createFloatingElements();
});
