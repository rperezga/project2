$(function(){
    var searchText = $("#searchText");
            //  product search functionality
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
        
                $.get("/search/" + searchData.search, function (data) {
                    dataResponse = JSON.parse(data).results;
        
                    $("#products-label").append("<h3>Products</h3>");
        
                    for (let i = 0; i < 10; i++) {
        
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
                        colAdd.append("<a type='button' class='btn btn-light'>Add</a>");
        
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
        
                if(quantity>0){
                    $.get("/userLogin", function (data) {
                        $.post("/saveToInventory", ({ data: dataResponse[toEdit], quantity: quantity, userId: data }), function () {
                            //Redirect to my inv page
                        });
                    }).then(function(){
                        $(this).closest('tr').find('input').val("0");
                    })
                } else {
                    alert("You must input a quantity greater than 0!");
                }
        
            });

            // --- manually add in a new product
            $(document).on("click", "#new-product-add", function () {
                var newProduct = {
                    name: $("#new-product-name").val(),
                    category: $("#new-category").val(),
                    brand: $("#new-brand").val(),
                    price: $("#new-price").val(),
                };
                var newAmount = $("#new-quantity").val();
        
                $.get("/userLogin", function (data) {
                    $.post("/saveToInventory", ({ data: newProduct, quantity: newAmount, userId: data }), function () {
                        //Redirect to my inv page
                        console.log("New Product: "+newProduct);
                    })
                }).then(function(){
                    window.location.href = "../dashboard.html";
                });
            });
        
            
})