const params = new URLSearchParams(window.location.search);
const pid = params.get('pid');
// Check GET Param
if (pid === 'test') {
    document.querySelector('#subject').setAttribute('value', 'Testing Subject');
    document.querySelector('#subject').setAttribute('disabled', '');
}
// Disable reload on submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = $('form').serializeArray();
    $.ajax({
        url: `${window.location.origin}/email`,
        method: 'POST',
        dataType: 'json',
        data: {
            subject: formData[5].value,
            content: {
                name: formData[0].value,
                phone: formData[1].value,
                company: formData[2].value,
                position: formData[3].value,
                email: formData[4].value,
                message: formData[6].value
            }
        },
        beforeSend: (xhr, setting) => {
            // Display modal of loading circle
            console.log('Sending email...');
        },
        success: (res, status, xhr) => {
            // Display modal of checklisted
            console.log('Successfully send the email...');
            console.log(res);
            console.log(xhr.responseJSON);
        },
        error: (xhr, status, err) => {
            // Display modal of X
            console.log('Failed to send the email...');
            console.log(err);
            console.log(xhr.responseJSON);
        }
    })
});