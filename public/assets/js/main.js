$(function () {
    var searchText = $("#searchText");


    $('#logout').on('click', () => {

        $.get("/logout", () => {
            window.location.href = '/';
        });
    })

    $(document).on("submit", "#search-form", handleSearchFormSubmit);

    // A function to handle what happens when the form is submitted to create a new Author
    function handleSearchFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out

        if (!searchText.val().trim().trim()) {
            return;
        }
        // Calling the upsertAuthor function and passing in the value of the name input
        searchCriteria({
            search: searchText
                .val()
                .trim()
        });
    }

    function searchCriteria(searchData) {
        let dataResponse = [];
        console.log()
        $("#dataLogin").empty();

        $.get("/search/" + searchData.search, function(data) {
            dataResponse = JSON.parse(data).results;

            console.log(dataResponse)

            for(let i = 0; i < 10; i++){
                
                var rowData = $("<tr>");
                rowData.addClass("product-data");
                rowData.attr("id", i);

                var colName = $("<td>");
                colName.append(dataResponse[i].name);

                var colCategory = $("<td>");
                colCategory.append(dataResponse[i].category);

                var colBrand = $("<td>");
                colBrand.append(dataResponse[i].brand);

                var colPrice = $("<td>");
                colPrice.append(dataResponse[i].price);

                

                var colQuantity = $("<td>");
                colQuantity.append("<input id='quantity' type='text' class='validate' style='width: 50px; text-align: center;'></input>");

                var colAdd = $("<td id='add'>");
                colAdd.append("<i class='material-icons'>add</i>");

                rowData.append(colName)
                    .append(colCategory)
                    .append(colBrand)
                    .append(colPrice)
                    .append(colQuantity)                    
                    .append(colAdd)

                $("#dataProducts").append(rowData);
            }            
        })
    }

    $(document).on("click", "#add", function () {
        
        toEdit = $(this).parent().attr("id");
        console.log(toEdit)
        // var docum = db.collection("trains").doc($(this).parent().attr("id")).get().then(function (doc) {
        //     $("#inputName").val(doc.data().name);
        //     $("#inputDestination").val(doc.data().destination);
        //     $("#inputStart").val(doc.data().startTime);
        //     $("#inputFrequency").val(doc.data().frequency);
        //     $("#newTrainSubmit").text("Update Train");
        // })
    });

})