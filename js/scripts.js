$(document).ready(() => {
    // Selecciona el contenedor de productos
    const $contenedorProductos = $('#productos');

    if ($contenedorProductos.length) {
        // Obtiene todos los hijos del contenedor de productos
        const $productos = $contenedorProductos.children();
        const contador = $productos.length;

        // Actualiza el contenido del span en el carrito de compras
        $('#shopping-cart span').text(contador);
    }
    ajustarBanner();
    actualizarResumenPrecios();
});

function eliminarProducto(event) {
    const $boton = $(event.currentTarget);
    const $producto = $boton.parent();
    $producto.remove();

    // Recalcula el contador de productos
    const $contenedorProductos = $('#productos');
    const contador = $contenedorProductos.children('.producto').length; // Asegúrate de contar solo los elementos con clase 'producto'
    $('#shopping-cart span').text(contador);

    // Actualiza el resumen de precios
    actualizarResumenPrecios();

    // Ajusta el banner en función del contador
    ajustarBanner();
}


function actualizarResumenPrecios() {
    const $contenedorProductos = $('#productos');
    const $productos = $contenedorProductos.find('.producto');
    let total = 0;
    let listaPrecios = '';

    $productos.each((index, producto) => {
        const $producto = $(producto);
        const $precioElemento = $producto.find('.precio').length ? $producto.find('.precio') : $producto.find('.precio-descuento');
        const $precioEnvioElemento = $producto.find('.precio-envio');
        const precio = parseFloat($precioElemento.text()).toFixed(2);
        const precioEnvio = parseFloat($precioEnvioElemento.text().replace('Envío: ', '').replace(' €', '')).toFixed(2);
        const totalProducto = (parseFloat(precio) + parseFloat(precioEnvio)).toFixed(2);

        listaPrecios += `
            <p>
                <strong>${$producto.find('h2').text()}:</strong> ${precio} € + ${precioEnvio} € (Envío) = ${totalProducto} €
            </p>
        `;
        total += parseFloat(totalProducto);
    });

    if (total === 0) {
        listaPrecios = '<p>No hay productos en tu carrito.</p>';
    }

    $('#lista-precios').html(listaPrecios);
    $('#total-precio').text(total.toFixed(2));
}



// Mostrar u ocultar la flecha al hacer scroll
$(window).on('scroll', () => {
    const $totop = $('#totop');
    if ($(window).scrollTop() > 100) { // Mostrar la flecha cuando se desplaza hacia abajo
        $totop.show();
    } else { // Ocultar la flecha cuando se sube hacia arriba
        $totop.hide();
    }
});

// Desplazarse hacia arriba cuando se hace clic en la flecha
$("#totop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
});


function ajustarBanner() {
    const $bannerImg = $('#banner img');
    const contador = $('#productos').children('.producto').length; // Contamos solo los productos

    if (contador === 0) {
        $bannerImg.attr('style', ''); // Limpia todos los estilos en línea
        $bannerImg.css({ 
            width: '600px', // Ajusta el ancho del banner
            height: 'auto',
            'margin-left': 'auto',
            'margin-right': 'auto', 
            transition: 'all 0.3s ease-in-out'
        });
    } 
}





