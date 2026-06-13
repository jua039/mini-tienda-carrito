let cantidadItems = 0;
let totalAcumulado = 0;

const lista = document.getElementById('lista-carrito');
const badge = document.getElementById('badge');
const spanTotal = document.getElementById('total');
const btnVaciar = document.getElementById('btn-vaciar');
const msgVacio = document.getElementById('msg-vacio');


function updateBadge() {
  badge.textContent = cantidadItems;
}

function updateTotal() {
  spanTotal.textContent = '$' + totalAcumulado.toLocaleString('es-CR');
}

function eliminarItem(li, precio) {
  li.remove();
  totalAcumulado -= precio;
  cantidadItems--;
  updateTotal();
  updateBadge();
  if (cantidadItems === 0) msgVacio.style.display = 'block';
}

function agregarAlCarrito(nombre, precio) {
  msgVacio.style.display = 'none';

  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.textContent = nombre + ' — $' + Number(precio).toLocaleString('es-CR');

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = '✕';
  btnEliminar.className = 'btn btn-sm btn-danger btn-eliminar';
  li.appendChild(btnEliminar);
  lista.appendChild(li);

  totalAcumulado += Number(precio);
  cantidadItems++;
  updateTotal();
  updateBadge();

  btnEliminar.addEventListener('click', () => eliminarItem(li, Number(precio)));
}

document.querySelectorAll('.btn-agregar').forEach(boton => {
  boton.addEventListener('click', () => {
    agregarAlCarrito(boton.dataset.nombre, boton.dataset.precio);
  });
});

if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    lista.querySelectorAll('li:not(#msg-vacio)').forEach(li => li.remove());
    totalAcumulado = 0;
    cantidadItems = 0;
    updateTotal();
    updateBadge();
    msgVacio.style.display = 'block';
  });
}