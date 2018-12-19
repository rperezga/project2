$(function () {
    var searchText = $("#searchText");

    $.get("/userLogin", function(data) {   
        $.get("/myInventory/" + data, function(newData){
            let inv = JSON.parse(newData)

            for(let i = 0; i < inv.length; i++){
                
                var rowData = $("<tr>");
                rowData.addClass("product-data");
                rowData.attr("id", i);

                var colName = $("<td>");
                colName.append(inv[i].name);

                var colCategory = $("<td>");
                colCategory.append(inv[i].category);

                var colBrand = $("<td>");
                colBrand.append(inv[i].brand);

                var colPrice = $("<td>");
                colPrice.append(inv[i].price);

                var colQuantity = $("<td>");
                colQuantity.append(inv[i].quantity);                

                var colEdit = $("<td id='edit'>");
                colEdit.append("<i class='material-icons'>create</i>");

                rowData.append(colName)
                    .append(colCategory)
                    .append(colBrand)
                    .append(colPrice)
                    .append(colQuantity)                    
                    .append(colEdit)

                $("#dataInventory").append(rowData);
            }
        })
    });


    $('#logout').on('click', () => {

        $.get("/logout", () => {
            window.location.href = '/';
        });
    })

    $(document).on("submit", "#search-form", handleSearchFormSubmit);

    function handleSearchFormSubmit(event) {
        event.preventDefault();

        if (!searchText.val().trim().trim()) {
            return;
        }        
        searchCriteria({
            search: searchText
                .val()
                .trim()
        });
    }

    let dataResponse = [];

    function searchCriteria(searchData) {
        
        $("#dataLogin").empty();

        $.get("/search/" + searchData.search, function(data) {
            dataResponse = JSON.parse(data).results;

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

                

                var colQuantity = $("<td id='quantity'>");
                colQuantity.append("<input type='text' value='0' style='width: 50px; text-align: center;'></input>");

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

    // --- add products based on searching
    $(document).on("click", "#add", function () {
        
        toEdit = $(this).parent().attr("id");
        let quantity = $(this).closest('tr').find('input').val();

        $.get("/userLogin", function(data) {
            $.post("/saveToInventory", ({data: dataResponse[toEdit], quantity: quantity, userId: data}),function(){
                //Redirect to my inv page
            })
        });

    });

    // --- manually add new products
    $(document).on("click","#new-product-add",function(){
        var newProduct = {
            name: $("#new-product-name").val(),
            category: $("#new-category").val(),
            brand: $("new-brand").val(),
            price: $("#new-price").val(),
        };
        var newAmount = $("#new-quantity").val();

        $.get("/userLogin", function(data) {
            $.post("/saveToInventory", ({data: newProduct, quantity: newAmount, userId: data}),function(){
                //Redirect to my inv page
            })
        });
    });

});

