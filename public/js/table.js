$(function () {
    var searchText = $("#searchText");

    var tempProduct = [];

    // $.get("/userLogin", function(data) {   
    //     $.get("/myInventory/" + data, function(newData){

    //To find inventory for an specific user
    $.get("/userLogin", function (data) {
        $.get("/myInventory/" + data, function (newData) {
            let inv = JSON.parse(newData)
            tempProduct = inv;

            for (let i = 0; i < inv.length; i++) {

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
                colPrice.append("$"+inv[i].price);

                var colQuantity = $("<td>");
                colQuantity.append(inv[i].quantity);

                var colEdit = $("<td id='edit'>");
                colEdit.append("<a type='button' class='btn btn-light' data-toggle='modal' data-target='#inventoryModal' id='inv-modal' data-inv='"+i+"'>Edit</a>");

                var colMargin = $("<td id='Margins'>");
                colMargin.append("<a type='button' class='btn btn-light' data-toggle='modal' data-target='#margin-modal' id='marginModal' data-inv='"+i+"'>Margins</a>");

                rowData.append(colName)
                    .append(colCategory)
                    .append(colBrand)
                    .append(colPrice)
                    .append(colQuantity)
                    .append(colEdit)
                    .append(colMargin)

                $("#dataProducts").append(rowData);
            }
        })
    });

        // --- editing existing inventory
    
        var tempID;
        $(document).on("click","#inv-modal",function(){
    
            tempID = $(this).attr("data-inv");
            console.log("ID: "+tempID);
    
            console.log(tempProduct[tempID]);
    
            $("#change-product-name").val(tempProduct[tempID].name);
            $("#change-category").val(tempProduct[tempID].category);
            $("#change-quantity").val(tempProduct[tempID].quantity);
            $("#change-price").val(tempProduct[tempID].price);
            $("#change-brand").val(tempProduct[tempID].brand);
        });

        // updates info
        $(document).on("click","#change-product-info",function(event){
            event.preventDefault();
            var newProduct = {
                name: $("#change-product-name").val(),
                category: $("#change-category").val(),
                brand: $("#change-brand").val(),
                price: $("#change-price").val(),
                quantity: $("#change-quantity").val(),
                id: tempProduct[tempID].id
            };

            console.log('New Product: ' + newProduct)

            $.put("/updateInventory", newProduct, (req, res) => {
                // window.location.href = "../dashboard.html";
            });
        });
    
    // delete item
    $(document).on("click","#delete-item",function(event){

        var itemLocation = tempProduct[tempID].id;

        $.ajax({
            method: "DELETE",
            url: "/deleteItem/"+itemLocation
        }).then(function(){
            window.location.href = "../dashboard.html";
        })
    });

    // margin modal
    $(document).on("click","#marginModal",function(event){
        event.preventDefault();
        console.log("MARGIN MODAL CLICKED");
        tempID = $(this).attr("data-inv");

        $("#current-price").empty();
        $("#current-price").append("<p class='pricing-label'><b>Current Price:</b> </p><p class='pricing'>$ "+tempProduct[tempID].price+"</p>");
        $("#three-percent").empty();
        $("#three-percent").append("<p class='pricing-label'><b>3% Margin:</b> </p><p class='pricing'>$ "+(tempProduct[tempID].price * 1.03).toFixed(2)+"</p>");
        $("#five-percent").empty();
        $("#five-percent").append("<p class='pricing-label'><b>5% Margin:</b> </p><p class='pricing'>$ "+(tempProduct[tempID].price * 1.05).toFixed(2)+"</p>");
        $("#seven-percent").empty();
        $("#seven-percent").append("<p class='pricing-label'><b>7% Margin:</b> </p><p class='pricing'>$ "+(tempProduct[tempID].price * 1.07).toFixed(2)+"</p>");
        $("#nine-percent").empty();
        $("#nine-percent").append("<p class='pricing-label'><b>9% Margin:</b> </p><p class='pricing'>$ "+(tempProduct[tempID].price * 1.09).toFixed(2)+"</p>");

        $(".pricing-label").css("float","left");
        $(".pricing").css("float","right");
        $(".pricing-label").css("margin","10px");
        $(".pricing").css("margin","10px");
    });

})