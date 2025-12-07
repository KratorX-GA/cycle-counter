// --- 1. CONFIGURACIÓN y COLORES ---
let MAX_NUMERO = 10; 
let numeroActual = 1;
const COLORES_FONDO = [
    '#FFFFFF', // 0 (No usado)
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF3', 
    '#FFDD33', '#7F33FF', '#FF9F33', '#33FF9F', '#5733FF',
    '#FF3366', '#A1FF33', '#33A1FF', '#FF7F33', '#6633FF' 
];

// --- 2. REFERENCIAS DEL DOM ---
const bodyElemento = document.body;
const configView = document.getElementById('config-view');
const contadorView = document.getElementById('contador-view');
const numeroElemento = document.getElementById('numero');
const inputCiclos = document.getElementById('ciclos-input');
const iniciarBtn = document.getElementById('iniciar-btn');
const reiniciarBtn = document.getElementById('reiniciar-btn');

// --- 3. FUNCIÓN DE CONTRASATE (Mantenida) ---
function obtenerColorContraste(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminancia > 0.5 ? '#000000' : '#FFFFFF';
}

// --- 4. CONTROL DEL CONTADOR ---

function actualizarContador() {
    const indiceColor = (numeroActual % COLORES_FONDO.length) || 1; 

    const colorDeFondo = COLORES_FONDO[indiceColor];
    const colorDeTexto = obtenerColorContraste(colorDeFondo);

    // Aplicar estilos
    bodyElemento.style.backgroundColor = colorDeFondo;
    numeroElemento.textContent = numeroActual;
    numeroElemento.style.color = colorDeTexto;
    reiniciarBtn.style.color = colorDeTexto;
    reiniciarBtn.style.borderColor = colorDeTexto;
}

function manejarClickEnPantalla(event) {
    // Evitar que el clic en el botón active el contador
    if (event.target.id === 'reiniciar-btn') {
        return;
    }

    numeroActual++;

    if (numeroActual > MAX_NUMERO) {
        numeroActual = 1; // Vuelve a empezar desde 1
    }

    actualizarContador();
}

// --- 5. CONTROL DE VISTAS ---

function mostrarContador() {
    // 1. Oculta la vista de configuración y muestra la del contador
    configView.style.display = 'none';
    contadorView.style.display = 'flex'; 
    bodyElemento.style.cursor = 'pointer';

    // 2. Lee el límite establecido por el usuario
    const limite = parseInt(inputCiclos.value, 10);
    MAX_NUMERO = Math.max(1, limite);

    // 3. Inicializa el contador (CORRECCIÓN BUG 1)
    // Se asegura de que el valor inicial sea 1
    numeroActual = 1;
    actualizarContador();

    // 4. Activa el evento de clic en la pantalla
    bodyElemento.addEventListener('click', manejarClickEnPantalla);
}

function mostrarConfiguracion() {
    // 1. Oculta la vista del contador y muestra la de configuración
    contadorView.style.display = 'none';
    configView.style.display = 'block'; // <--- CORRECCIÓN BUG 2: Se usa 'block' para que los estilos de caja funcionen bien con el body flex

    // 2. Restablece el fondo del body a un color neutro (CORRECCIÓN BUG 2)
    bodyElemento.style.backgroundColor = '#f0f0f0';
    bodyElemento.style.cursor = 'default';
    
    // 3. Desactiva el evento de clic en la pantalla
    bodyElemento.removeEventListener('click', manejarClickEnPantalla);
}

// --- 6. EVENT LISTENERS ---

// Al hacer clic en "Iniciar Contador" (CORRECCIÓN BUG 1)
iniciarBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // <--- CRÍTICO: Previene que el clic avance el contador inmediatamente
    mostrarContador();
});

// Al hacer clic en "Reiniciar Límite"
reiniciarBtn.addEventListener('click', mostrarConfiguracion);