const params = new URLSearchParams(window.location.search);
const pid = params.get('pid');
console.log(pid);
// Check GET Param
if (pid == null || pid === '') {
    console.log('No param or empty param (safe)');
} else if (pid === 'test') {
    document.querySelector('#subject').setAttribute('value', 'Testing Subject');
    document.querySelector('#subject').setAttribute('disabled', '');
}
// Disable reload on submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
});