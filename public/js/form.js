const params = new URLSearchParams(window.location.search);
const pid = params.get('pid');
// Check GET Param
if (pid === 'management') {
    if(localStorage.getItem('language') === 'en') {
        document.querySelector('#subject').setAttribute('value', 'Management Services');
        document.querySelector('.service-name').innerHTML = 'Management Services';
    } else if(localStorage.getItem('language') === 'id') {
        document.querySelector('#subject').setAttribute('value', 'Jasa Manajemen');
        document.querySelector('.service-name').innerHTML = 'Jasa Manajemen';
    }
    document.querySelector('#subject').setAttribute('disabled', '');
} else if (pid === 'taxation') {
    if(localStorage.getItem('language') === 'en') {
        document.querySelector('#subject').setAttribute('value', 'Taxation Services');
        document.querySelector('.service-name').innerHTML = 'Taxation Services';
    } else if(localStorage.getItem('language') === 'id') {
        document.querySelector('#subject').setAttribute('value', 'Jasa Perpajakan');
        document.querySelector('.service-name').innerHTML = 'Jasa Perpajakan';
    }
    document.querySelector('#subject').setAttribute('disabled', '');
} else if (pid === 'accounting') {
    if(localStorage.getItem('language') === 'en') {
        document.querySelector('#subject').setAttribute('value', 'Accounting Services');
        document.querySelector('.service-name').innerHTML = 'Accounting Services';
    } else if(localStorage.getItem('language') === 'id') {
        document.querySelector('#subject').setAttribute('value', 'Jasa Akuntansi');
        document.querySelector('.service-name').innerHTML = 'Jasa Akuntansi';
    }
    document.querySelector('#subject').setAttribute('disabled', '');
}
// Disable reload on submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url: `${window.location.origin}/email`,
        method: 'POST',
        dataType: 'json',
        data: {
            subject: document.querySelector('#subject').value,
            content: {
                name: document.querySelector('#name').value,
                phone: document.querySelector('#phone').value,
                company: document.querySelector('#company').value,
                position: document.querySelector('#position').value,
                email: document.querySelector('#email').value,
                message: document.querySelector('#message').value
            }
        },
        beforeSend: (xhr, setting) => {
            // Display modal of loading circle
            console.log('Sending email...');
        },
        success: (res, status, xhr) => {
            // Display modal of checklisted
            console.log('Successfully send the email...');
            console.log(xhr.responseJSON);
        },
        error: (xhr, status, err) => {
            // Display modal of X
            console.log('Failed to send the email...');
            console.log(xhr.responseJSON);
        }
    })
});