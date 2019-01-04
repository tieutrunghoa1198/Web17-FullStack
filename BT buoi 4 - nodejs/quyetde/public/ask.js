// document.getElementById("content").addEventListener("input", function() {
//     document.getElementById("count").innerText = 200 - document.getElementById("content").value.length;
//     var check = 200 - document.getElementById("content").value.length;
//     console.log(check);
// });

// $(document).ready(function() {
//     $('#content').keyup(function() {
//         var len = this.value.length;
//         if (len >=200) {
//             this.value = this.value.substring(0, 200);
//         }
//         $('#count').text(200 - len);
//     });
// });

$('#content').on('input', function() {
    $('#count').text(200 - $('#content').val().length);
});