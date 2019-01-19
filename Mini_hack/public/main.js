$(document).ready(function() {
    var data_global = null;
    var dataLoaded = false;
    const scoreId = window.location.pathname.replace("/games/", "");
    //lấy dữ liệu từ api 
    var round = 0;
    loadData(scoreId);
    //kết thúc lấy dữ liệu
    //click on button --> then change data    
    $('button').click(function() {
        round++;
        append(round);
        console.log(round);
    });
    // see all changes from input tag 
    $(document).on('input', 'input', function() {
        //useful variable
        let position = $(this).attr('id');
        let positionSplit = position.split('_');
        let playerPosition = parseInt(positionSplit[2]);
        let round = parseInt(positionSplit[1]);    
        let arr = [];
        // test and check value 
        console.log($(this).val()+" "+playerPosition);
        console.log(round);
        //push and convert arr to JSON type
        arr.push(parseInt($(this).val()));
        arr = JSON.stringify(arr);
        // set total score of 1 player 
        for(let i = 0; i < 4; i++){
            $('#total-player-'+i).text(data_global[i].score[0]);
        };
        // set total score for all players 
        $('#total-score').text(total(data_global));
        // post all the new data to mongodb and update 
        $.ajax({
            url: "/asd/" + scoreId ,
            type: 'POST',
            data: {
                arr: arr,
                round: round,
                position: playerPosition
            },
            success: function(data) {
                loadData(scoreId);        
            }
        })
        // <--- END --->
    });

    
    //cac ham su dung 
    function loadData(id) {
        $.ajax({
            type: "GET",
            url: "/api/games/" + id,
            success: function(DB) {
                let data = DB.score.player;
                data_global = data;
                db = DB;
                let arr = [];
                for (let i = 0; i < data.length; i++){
                    arr.push(data[i].score.length);
                }
                round = Math.max.apply(null, arr);
                // if data haven't been loaded yet 
                if(dataLoaded == false){
                    for (let i = 1; i < round; i++){
                        append(i+1);
                    }
                    display(data);
                    dataLoaded = true;
                    console.log(1);
                }
                // if data have been loaded
                else if(dataLoaded){
                    display(data);
                    console.log(2);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
    // show score 
    function showScore(data){
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].score.length; y++ )
                $('#scoreInput_'+y+'_'+x).val(data[x].score[y]);
        }
    }

    //get round
    // function getRound(data){
    //     return data[0].score.length;
    // }

    //display
    function display(data){
        for (let i = 0; i < data.length; i++) {
            $('#name'+i).text(data[i].name);
        }
        showScore(data);
        for(let i = 0; i < data.length; i++){
            $('#total-player-'+i).text(playerScore(data, i));
        };
        $('#total-score').text(total(data_global));
    }

    //total score of 1 player 
    function playerScore(data, x){
        let sum = 0;
        for ( let i = 0; i < data[x].score.length; i++){
            sum += data[x].score[i];
        }
        return sum;
    }

    // calculate the total score 
    function total(data) {
        // let arr = [a, b, c, d];
        let column_sum = 0;
        for( let x = 0; x < data.length; x++){
            for( let y = 0; y < data[x].score.length; y++){
                column_sum += data[x].score[y]; 
            }
        }
        return column_sum;
    }

    //append 
    function append(index){
        $("#myTable").append(`         
        <tr>
            <th scope="row">Round ${index}</th>
            <td><input id="scoreInput_${index - 1}_0" type="number" class="form-control mb-3" ></td>
            <td><input id="scoreInput_${index - 1}_1" type="number" class="form-control mb-3" ></td>
            <td><input id="scoreInput_${index - 1}_2" type="number" class="form-control mb-3" ></td>
            <td><input id="scoreInput_${index - 1}_3" type="number" class="form-control mb-3" ></td>
        </tr>
       `);
    };
});
