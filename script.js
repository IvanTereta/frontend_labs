var results = [];

$(document).ready(function() {
    $("#userList").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        activate: function(event, ui) {
            $($(ui.newHeader[0]).find(".display-icon")[0]).toggleClass("fa-plus fa-minus");
            $($(ui.oldHeader[0]).find(".display-icon")[0]).toggleClass("fa-plus fa-minus");
        }
    });
    $.ajax({
        async: false,
        url: 'https://randomuser.me/api/?results=25&nat=gb',
        dataType: 'json',
        success: function(data) {
            results = data.results;
            drawingTemplate(results);
        }
    });

    function search(req) {
        if (req) {
            var result = [];
            for (var i = 0; i < results.length; i++) {
                if (results[i].name.first.indexOf(req) >= 0) {
                    result.push(results[i]);
                }
            }
            $('#userList li').remove();
            drawingTemplate(result);
        } else {
            $('#userList li').remove();
            drawingTemplate(results);
        }

    }

    function drawingTemplate(data) {
        if (data.length > 0) {
            $('#usersTpl').tmpl(data).appendTo('#userList');
        } else {
            $('#userList').append("<li class='no-result'>No results</li>")
        }
        $("#userList").accordion( "destroy" );
        $("#userList").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content",
            activate: function(event, ui) {
                $($(ui.newHeader[0]).find(".display-icon")[0]).toggleClass("fa-plus fa-minus");
                $($(ui.oldHeader[0]).find(".display-icon")[0]).toggleClass("fa-plus fa-minus");
            }
        });
    }
    $('.search-input').on('change', function(e) {
        search(e.currentTarget.value);
    });
});

function showChart() {
    var ctx = $("#genderChart");

    var male = 0;
    var female = 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i].gender === 'male') {
            male = male + 1;
        } else {
            female = female + 1;
        }
    }

    var data = {
        labels: [
            "male",
            "female"
        ],
        datasets: [{
            data: [male, female],
            backgroundColor: [
                "#36A2EB",
                "#FF6384"
            ],
            hoverBackgroundColor: [
                "#36A2EB",
                "#FF6384"
            ]
        }]
    };

    $("#dialog").dialog({
        modal: true,
        draggable: false,
        closeText: "x"
    });
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            animation: {
                animateScale: true
            }
        }
    });
}
