// ==================== MENU MOBILE ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== GALERIA INTERATIVA ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==================== CALCULADORA DE IMPACTO ====================
const areaSlider = document.getElementById('area');
const areaValue = document.getElementById('areaValue');
const calcularBtn = document.getElementById('calcularBtn');
const calculatorResult = document.getElementById('calculatorResult');

// Atualizar valor do slider
areaSlider.addEventListener('input', () => {
    areaValue.textContent = areaSlider.value + ' ha';
});

calcularBtn.addEventListener('click', () => {
    const area = parseInt(areaSlider.value);
    const irrigacao = document.getElementById('irrigacao').value;
    const energia = document.getElementById('energia').value;
    
    // Cálculos de impacto (valores estimados para demonstração)
    let waterSaved = 0;
    let co2Saved = 0;
    
    // Economia de água baseada no tipo de irrigação
    switch(irrigacao) {
        case 'inteligente':
            waterSaved = area * 30; // 30 mil litros por hectare
            break;
        case 'gotejamento':
            waterSaved = area * 40; // 40 mil litros por hectare
            break;
        default:
            waterSaved = area * 10;
    }
    
    // Redução de CO2 baseada na energia
    switch(energia) {
        case 'solar':
            co2Saved = area * 2.5; // 2.5 toneladas por hectare
            break;
        case 'biogas':
            co2Saved = area * 3;
            break;
        case 'eolica':
            co2Saved = area * 2.8;
            break;
        default:
            co2Saved = area * 0.5;
    }
    
    // Árvores equivalentes (1 árvore absorve ~22kg de CO2 por ano)
    const treesSaved = Math.round(co2Saved * 1000 / 22);
    
    // Atualizar resultados
    document.getElementById('waterSaved').textContent = waterSaved.toLocaleString('pt-BR');
    document.getElementById('co2Saved').textContent = co2Saved.toFixed(1);
    document.getElementById('treesSaved').textContent = treesSaved.toLocaleString('pt-BR');
    
    // Mensagem motivacional
    const resultMessage = document.getElementById('resultMessage');
    if (waterSaved > 1000 && co2Saved > 50) {
        resultMessage.textContent = '🌟 Excelente! Suas práticas estão fazendo uma grande diferença para o planeta!';
    } else if (waterSaved > 500 || co2Saved > 25) {
        resultMessage.textContent = '👍 Bom trabalho! Continue melhorando suas práticas sustentáveis.';
    } else {
        resultMessage.textContent = '💡 Há espaço para melhorar! Considere adotar mais tecnologias sustentáveis.';
    }
    
    // Mostrar resultado com animação
    calculatorResult.style.display = 'block';
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ==================== QUIZ ====================
const quizData = [
    {
        question: "O que é ILPF?",
        options: [
            "Integração Lavoura-Pecuária-Floresta",
            "Irrigação Localizada por Precisão Fotovoltaica",
            "Indústria de Laticínios e Produtos Frescos",
            "Instituto de Logística e Produção Florestal"
        ],
        correct: 0
    },
    {
        question: "Qual tecnologia economiza mais água na irrigação?",
        options: [
            "Aspersão convencional",
            "Inundação",
            "Gotejamento",
            "Sulcos"
        ],
        correct: 2
    },
    {
        question: "O que é agricultura de precisão?",
        options: [
            "Plantar apenas em áreas pequenas",
            "Uso de tecnologia para otimizar insumos e recursos",
            "Agricultura em estufas",
            "Plantio manual tradicional"
        ],
        correct: 1
    },
    {
        question: "Qual é o principal gás de efeito estufa emitido pela pecuária?",
        options: [
            "Dióxido de carbono (CO2)",
            "Metano (CH4)",
            "Óxido nitroso (N2O)",
            "Ozônio (O3)"
        ],
        correct: 1
    },
    {
        question: "O que é plantio direto?",
        options: [
            "Plantar sem irrigação",
            "Plantar sem revolver o solo, mantendo a palhada",
            "Plantar em linha reta",
            "Plantar apenas sementes orgânicas"
        ],
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

totalQuestionsSpan.textContent = quizData.length;

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    progressFill.style.width = ((currentQuestionIndex + 1) / quizData.length * 100) + '%';
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
    
    if (selectedIndex === question.correct) {
        score++;
    }
    
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

// ==================== FORMULÁRIO DE CONTATO ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulação de envio (em produção, usar um backend ou serviço como Formspree)
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Dados do formulário:', data);
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// ==================== ANIMAÇÕES AO SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos com data-aos
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== CONTADOR ANIMADO ====================
const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d]/g, '');
            
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    target.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
            
            countObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => countObserver.observe(stat));

console.log('🌱 Site Agro Sustentável carregado com sucesso!');
