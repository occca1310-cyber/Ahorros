/// ---------CREA EL LOGIN ------------///

    const div = document.createElement('div');
    div.id = 'pantalla-login'

    const titulo = document.createElement('h1')
    titulo.textContent = 'Bienvenido'
    titulo.id = 'titulo'
    
    const nom = document.createElement('p')
    nom.textContent = 'Ingresa tu nombre de usuario'

    const input = document.createElement('input');
    input.placeholder = 'Escribe tu nombre';
    
    // Botón de la flechita
    const flechita = document.createElement('button')
    flechita.textContent = '⬇️'
    flechita.id = 'flechita'

    // Lista desplegable — empieza oculta
    const lista = document.createElement('div')
    lista.id = 'lista-usuarios'
    lista.style.display = 'none'


    flechita.addEventListener('click', () => {

    if (lista.style.display === 'none') {
    lista.style.display = 'block'
    lista.innerHTML = ''  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}

    Object.keys(usuarios).forEach((nombre) => {
      const fila = document.createElement('div')

    const nombreBtn = document.createElement('span')
    nombreBtn.textContent = nombre
    nombreBtn.onclick = () => {
    input.value = nombre
    lista.style.display = 'none'
    }

    const eliminarBtn = document.createElement('button')
    eliminarBtn.textContent = '❌'
    eliminarBtn.onclick = () => {
    delete usuarios[nombre]
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    fila.remove()
     }

      fila.appendChild(nombreBtn)
      fila.appendChild(eliminarBtn)
      lista.appendChild(fila)
    })

  } else {
    lista.style.display = 'none'
  }
})

    const boton = document.createElement('button');
    boton.textContent = 'Entrar'
    boton.id = 'entrar'

    const parrafo = document.createElement('p');
    parrafo.classList = 'error'

    const contraseña = document.createElement('input')
    contraseña.placeholder = 'Ingresa tu clave'
    contraseña.type = 'password'

    const h2 = document.createElement('h1')
    h2.textContent = 'Contraseña'
    
    const contra = document.createElement('p')
    contra.textContent = 'Ingresa tu contraseña'

    const p = document.createElement('p')
    p.classList = 'error'

    div.appendChild(titulo)
    div.appendChild(nom)
    div.appendChild(input)
    div.appendChild(flechita)
    div.appendChild(lista)
    div.appendChild(parrafo)
    div.appendChild(h2)
    div.appendChild(contra)
    div.appendChild(contraseña)
    div.appendChild(boton)
    div.appendChild(p)

    document.body.appendChild(div);

    boton.addEventListener('click', () => {
    const nombre = input.value.trim()
    const contraseña1 = contraseña.value
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) ||{}

    if (nombre === '') {
        parrafo.textContent = 'Escribe un nombre'
        return
    }
    
    if (usuarios[nombre]) {
        if (usuarios[nombre] !== contraseña1) {
            p.textContent = 'Contraseña incorrecta'
            return
        }
    } else {
        usuarios[nombre] = contraseña1
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

    iniciarSesion(nombre)
})

/// -------- INICIO DE SESIÓN ---------///

    let usuarioActual = ''

    function iniciarSesion(nombre) {
    usuarioActual = nombre

    div.style.display = 'none'

    const contenedor = document.createElement('div');
    contenedor.id = 'pantalla-ahorros'

    const saludo = document.createElement('h1')
    saludo.textContent = 'Ahorros de: ' + nombre 

    const ahorros = document.createElement('h3');

    const iAhorros = document.createElement('input');
    iAhorros.type = 'number'
    iAhorros.placeholder = 'Agregar ahorro'

    const agregar = document.createElement('button');
    agregar.textContent = 'Agregar'
    agregar.id = 'agregar'

    const resetear = document.createElement('button');
    resetear.textContent = 'Reiniciar en 0'
    resetear.id = 'resetear'

    const retirar = document.createElement('button');
    retirar.textContent = 'Retirar'
    retirar.id = 'retirar'
    
    const volverMenu = document.createElement('button')
    volverMenu.textContent = 'Menu de Inicio'
    
    // --- META Y PROGRESO ---
    const metaInput = document.createElement('input')
    metaInput.type = 'number'
    metaInput.placeholder = 'Meta (ej: 50000)'

    const guardarMetaBtn = document.createElement('button')
    guardarMetaBtn.textContent = 'Guardar meta'

    const progresoTexto = document.createElement('p')
    const barra = document.createElement('div')
    barra.style.width = '100%'
    barra.style.height = '20px'
    barra.style.background = '#ccc'
    barra.style.borderRadius = '10px'
    barra.style.overflow = 'hidden'

    const relleno = document.createElement('div')
    relleno.style.height = '100%'
    relleno.style.width = '0%'
    relleno.style.background = 'limegreen'
    relleno.style.transition = 'width 0.3s'

    contenedor.appendChild(saludo);
    contenedor.appendChild(ahorros);
    contenedor.appendChild(iAhorros);
    contenedor.appendChild(agregar);
    contenedor.appendChild(retirar);
    contenedor.appendChild(resetear);
    contenedor.appendChild(volverMenu);
    
    
    barra.appendChild(relleno)

    contenedor.appendChild(metaInput)
    contenedor.appendChild(guardarMetaBtn)
    contenedor.appendChild(progresoTexto)
    contenedor.appendChild(barra)
    
    document.body.appendChild(contenedor)

    const claveHistorial = 'historial-' + nombre
    const clave = 'ahorros-' + nombre
    let totalAhorros = Number(localStorage.getItem(clave)) || 0
    ahorros.textContent = 'Total: $' + totalAhorros
    
    const historial = document.createElement('div')
    historial.id = 'historial'

    const historialTitulo = document.createElement('h3')
    historialTitulo.textContent = 'Movimientos'

    historial.appendChild(historialTitulo)
    contenedor.appendChild(historial)
    
    const movimientosGuardados = JSON.parse(localStorage.getItem(claveHistorial)) || []
    movimientosGuardados.forEach((mov) => {
    const fila = document.createElement('p')
    fila.textContent = mov.tipo + ' $' + mov.cantidad + ' — ' + mov.fecha
    historial.appendChild(fila)
})

    // ← PASO 3 — Función para agregar movimiento nuevo
    function agregarMovimiento(tipo, cantidad) {
    const movimientos = JSON.parse(localStorage.getItem(claveHistorial)) || []
    const fecha = new Date().toLocaleString()
  
    movimientos.push({ tipo, cantidad, fecha })
    localStorage.setItem(claveHistorial, JSON.stringify(movimientos))

    const fila = document.createElement('p')
    fila.textContent = tipo + ' $' + cantidad + ' — ' + fecha
    historial.appendChild(fila)
}

/// --------EVENTOS Y FUNCIONES -------///

    agregar.addEventListener('click', () => {
        const cantidad = Number(iAhorros.value)

        totalAhorros += cantidad
        localStorage.setItem(clave, totalAhorros)
        ahorros.textContent = 'Total: $' + totalAhorros
        iAhorros.value = ''
        actualizarProgreso()
         agregarMovimiento('✅ Agregó', cantidad)

    })

    retirar.addEventListener('click', () => {
        const cantidad = Number(iAhorros.value)
        if (cantidad <= 0) {
            alert('Ingresa una cantidad valida')
            return
        }
        if (cantidad > totalAhorros) {
            alert('No tienes esa cantidad ')
            return
        }

        totalAhorros -= cantidad
        localStorage.setItem(clave, totalAhorros)
        ahorros.textContent = 'Total: $' + totalAhorros
        iAhorros.value = ''
        actualizarProgreso()
        agregarMovimiento('❌ Retiro', cantidad)
    })

    resetear.addEventListener('click', () => {
        totalAhorros = 0;
        localStorage.setItem(clave, totalAhorros)
        ahorros.textContent = 'Total: $' + totalAhorros
        actualizarProgreso()
        agregarMovimiento('🔄 Reinicio', cantidad)
    })


    const claveMeta = 'meta-' + nombre
    let meta = Number(localStorage.getItem(claveMeta)) || 0
    metaInput.value = meta || ''

    function actualizarProgreso() {
    if (meta > 0) {
    const porcentaje = Math.min((totalAhorros / meta) * 100, 100)
    relleno.style.width = porcentaje + '%'
    progresoTexto.textContent = `Progreso: ${porcentaje.toFixed(1)}%`
  } else {
    progresoTexto.textContent = 'Define una meta'
    relleno.style.width = '0%'
  }
}

    guardarMetaBtn.addEventListener('click', () => {
    const nuevaMeta = Number(metaInput.value)
    
    if (nuevaMeta <= 0) {
        alert('Ingresa una meta valida')
        return
    }
    
    meta = nuevaMeta
    localStorage.setItem(claveMeta, meta)
    actualizarProgreso()
})

    volverMenu.addEventListener('click', () => {
        contenedor.style.display = 'none'
        div.style.display = 'grid'
        
        input.value = ''
        contraseña.value = ''
        parrafo.textContent = ''
        p.textContent = ''
        lista.style.display = 'none'
    });

}