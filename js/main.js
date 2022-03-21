const form = document.querySelector('#form');
const buttonEmail = document.querySelector('#buttonEmail');
form.addEventListener('submit',actionSubmit);

function actionSubmit(event) {
    event.preventDefault();
    const formulario = new FormData(this);
    buttonEmail.setAttribute('href', `mailto:ormasteelconstrucciones@gmail.com?subject=${formulario.get('option')}&body= Nombre: ${formulario.get('name')} 
    Apellido: ${formulario.get('apellido')} 
    Email: ${formulario.get('email')}
    Consulta: ${formulario.get('consulta')}`);
    buttonEmail.click();
}