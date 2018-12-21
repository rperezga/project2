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
                colEdit.append("<a class='waves-effect waves-light btn modal-trigger' id='inv-modal' href='#modal1' data-inv='"+i+"'>Edit</a>");

                rowData.append(colName)
                    .append(colCategory)
                    .append(colBrand)
                    .append(colPrice)
                    .append(colQuantity)
                    .append(colEdit)

                $("#dataProducts").append(rowData);
            }
        })
    });
})