$("#udemy").on("submit", function() {
    // Lấy dữ liệu về
    const search = $('.search').val();
    let apiUrl = "https://udemy-course-api.herokuapp.com/api/courses?search=" + search + "&price="+$( "#price option:selected" ).text();
    event.preventDefault();
    $('#display').empty();
    getData(apiUrl);
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            let nextPage = $(".row").attr("nextPage");
            getData(nextPage);
        }
    });
});
function getData(apiUrl) {
    const udemy = "https://www.udemy.com";
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function(data) {
            console.log('asd');
            // $('#display').empty();
            $("#display").attr("nextPage", data.next);
            for (let i = 0; i < data.results.length; i++) {
                // $("#display").append(udemy+data.results[i].url);
                // $('#display').append("<br>");
                $('#display').append(
                    `<div class="col-sm-4">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${data.results[i].image_480x270}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${data.results[i].title}</h5>
                                <p class="card-text">${data.results[i].price}</p>
                                <a href="${udemy+data.results[i].url}" class="btn btn-primary">Enter</a>
                            </div>
                        </div>
                    </div>`
                );
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}