function disableButton(idButton) {
    const button = document.querySelector(`#${idButton}`);

    button.setAttribute('disabled', 'disabled');

    button.innerHTML= `Carregando <img class="gif-loading" src="/assets/img/loading.gif" alt="Loading">`;
}

function enableButton(idButton, text) {
    const button = document.querySelector(`#${idButton}`);

    button.removeAttribute('disable');

    button.innerHTML = text;
}