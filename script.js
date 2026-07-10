// ==================== MENU MOBILE E HEADER ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');

// Toggle do menu mobile
menuToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive);
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL COM OFFSET ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BOTÃO VOLTAR AO TOPO ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== ANIMAÇÕES AO SCROLL (NATIVO) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    scrollObserver.observe(element);
});

// ==================== CONTADORES ANIMADOS ====================
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.getAttribute('data-target'));
            let current = 0;
            const increment = finalValue / 60; // Velocidade da animação
            
            const updateCount = () => {
                if (current < finalValue) {
                    current += increment;
                    target.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    target.textContent = finalValue;
                }
            };
            
            updateCount();
            countObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => countObserver.observe(stat));

// ==================== COMPARADOR ANTES/DEPOIS ====================
const beforeAfterSlider = document.getElementById('beforeAfterSlider');
const beforeImg = document.querySelector('.before-img');
const beforeAfterContainer = document.querySelector('.before-after-image');

if (beforeAfterSlider && beforeImg && beforeAfterContainer) {
    let isDragging = false;

    const updateSlider = (x) => {
        const rect = beforeAfterContainer.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        pos = Math.max(0, Math.min(100, pos)); // Limitar entre 0 e 100
        
        beforeAfterSlider.style.left = `${pos}%`;
        beforeImg.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    };

    beforeAfterSlider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    // Suporte para Touch (Mobile)
    beforeAfterSlider.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    });
    
    // Clique para mover
    beforeAfterContainer.addEventListener('click', (e) => updateSlider(e.clientX));
}

// ==================== GALERIA INTERATIVA ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Atualizar estado visual e de acessibilidade
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// ==================== CALCULADORA DE IMPACTO ====================
const areaSlider = document.getElementById('area');
const areaValue = document.getElementById('areaValue');
const calcularBtn = document.getElementById('calcularBtn');
const calculatorResult = document.getElementById('calculatorResult');

if (areaSlider) {
    areaSlider.addEventListener('input', () => {
        const val = areaSlider.value;
        areaValue.textContent = `${val} ha`;
        areaSlider.setAttribute('aria-valuenow', val);
    });
}

if (calcularBtn) {
    calcularBtn.addEventListener('click', () => {
        const area = parseInt(areaSlider.value);
        const irrigacao = document.getElementById('irrigacao').value;
        const energia = document.getElementById('energia').value;
        
        let waterSaved = 0;
        let co2Saved = 0;
        
        // Lógica de cálculo (estimativas baseadas em médias do setor)
        switch(irrigacao) {
            case 'inteligente': waterSaved = area * 30; break;
            case 'gotejamento': waterSaved = area * 45; break;
            default: waterSaved = area * 10;
        }
        
        switch(energia) {
            case 'solar': co2Saved = area * 2.5; break;
            case 'biogas': co2Saved = area * 3.2; break;
            case 'eolica': co2Saved = area * 2.8; break;
            default: co2Saved = area * 0.5;
        }
        
        const treesSaved = Math.round(co2Saved * 1000 / 22); // 1 árvore ≈ 22kg CO2/ano
        
        // Atualizar DOM
        document.getElementById('waterSaved').textContent = waterSaved.toLocaleString('pt-BR');
        document.getElementById('co2Saved').textContent = co2Saved.toFixed(1);
        document.getElementById('treesSaved').textContent = treesSaved.toLocaleString('pt-BR');
        
        const resultMessage = document.getElementById('resultMessage');
        if (waterSaved > 1000 && co2Saved > 50) {
            resultMessage.textContent = '🌟 Excelente! Suas práticas estão fazendo uma grande diferença para o planeta!';
        } else if (waterSaved > 500 || co2Saved > 25) {
            resultMessage.textContent = '👍 Bom trabalho! Continue melhorando suas práticas sustentáveis.';
        } else {
            resultMessage.textContent = '💡 Há espaço para melhorar! Considere adotar mais tecnologias sustentáveis.';
        }
        
        calculatorResult.style.display = 'block';
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ==================== GLOSSÁRIO (ACORDEÃO E BUSCA) ====================
const glossaryItems = document.querySelectorAll('.glossary-item');
const glossarySearch = document.getElementById('glossarySearch');

// Lógica do Acordeão
glossaryItems.forEach(item => {
    const termButton = item.querySelector('.glossary-term');
    
    termButton.addEventListener('click', () => {
        const isExpanded = termButton.getAttribute('aria-expanded') === 'true';
        
        // Fechar todos os outros (comportamento de acordeão)
        glossaryItems.forEach(otherItem => {
            const otherButton = otherItem.querySelector('.glossary-term');
            otherButton.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('active');
        });
        
        // Toggle do item clicado
        if (!isExpanded) {
            termButton.setAttribute('aria-expanded', 'true');
            item.classList.add('active');
        }
    });
});

// Lógica da Busca
if (glossarySearch) {
    glossarySearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        glossaryItems.forEach(item => {
            const termText = item.getAttribute('data-term');
            const contentText = item.querySelector('.glossary-content p').textContent.toLowerCase();
            
            if (termText.includes(searchTerm) || contentText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ==================== QUIZ INTERATIVO ====================
const quizData = [
    {
        question: "O que significa a sigla ILPF?",
        options: ["Integração Lavoura-Pecuária-Floresta", "Irrigação Localizada por Precisão Fotovoltaica", "Indústria de Laticínios e Produtos Frescos", "Instituto de Logística e Produção Florestal"],
        correct: 0
    },
    {
        question: "Qual sistema de irrigação é considerado o mais eficiente no uso da água?",
        options: ["Aspersão convencional", "Inundação", "Gotejamento", "Sulcos"],
        correct: 2
    },
    {
        question: "O que é o Plantio Direto?",
        options: ["Plantar sem irrigação", "Plantar sem revolver o solo, mantendo a palhada", "Plantar em linha reta", "Plantar apenas sementes orgânicas"],
        correct: 1
    },
    {
        question: "Qual é o principal gás de efeito estufa emitido pela pecuária?",
        options: ["Dióxido de carbono (CO2)", "Metano (CH4)", "Óxido nitroso (N2O)", "Ozônio (O3)"],
        correct: 1
    },
    {
        question: "O que são Bioinsumos?",
        options: ["Fertilizantes químicos de alta potência", "Produtos de origem biológica para controle de pragas e nutrição", "Sementes geneticamente modificadas", "Máquinas agrícolas movidas a biocombustível"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const progressFill = document.getElementById('progressFill');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');

if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = quizData.length;

    function loadQuestion() {
        const question = quizData[currentQuestionIndex];
        document.getElementById('quizQuestion').textContent = question.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.setAttribute('role', 'radio');
            optionElement.setAttribute('tabindex', '0');
            optionElement.textContent = option;
            
            optionElement.addEventListener('click', () => selectOption(index));
            optionElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') selectOption(index);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        progressFill.style.width = ((currentQuestionIndex + 1) / quizData.length * 100) + '%';
        progressFill.parentElement.setAttribute('aria-valuenow', currentQuestionIndex + 1);
    }

    function selectOption(selectedIndex) {
        const question = quizData[currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            option.style.pointerEvents = 'none';
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === question.correct) score++;
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 1500);
    }

    function showResult() {
        quizContent.style.display = 'none';
        quizResult.style.display = 'block';
        
        const percentage = (score / quizData.length) * 100;
        document.getElementById('resultScore').textContent = `Você acertou ${score} de ${quizData.length} perguntas (${percentage}%)`;
        
        let title, message;
        if (percentage === 100) {
            title = '🏆 Mestre da Sustentabilidade!';
            message = 'Parabéns! Você é um expert em sustentabilidade no agro!';
        } else if (percentage >= 60) {
            title = '🌱 Guardião do Agro';
            message = 'Muito bom! Você tem ótimos conhecimentos sobre o tema.';
        } else {
            title = '📚 Aprendendo Sempre';
            message = 'Continue estudando! O conhecimento é o primeiro passo para a mudança.';
        }
        
        document.getElementById('resultTitle').textContent = title;
        document.getElementById('resultMessage').textContent = message;
    }

    document.getElementById('restartQuiz').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        quizContent.style.display = 'block';
        quizResult.style.display = 'none';
        loadQuestion();
    });

    // Iniciar quiz
    loadQuestion();
}

// ==================== FORMULÁRIO DE CONTATO ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio (Em produção, integrar com backend, Formspree, EmailJS, etc.)
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Dados do formulário:', data);
        
        alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// ==================== INICIALIZAÇÃO ====================
console.log('🌱 Site Agro Forte, Futuro Sustentável carregado com sucesso!');
