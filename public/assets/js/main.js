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
        console.log()
        $.get("/search/" + searchData.search, function(data) {
            console.log(data)
        })
            // .then(getAuthors);
    }

//     // Function for retrieving authors and getting them ready to be rendered to the page
//   function getAuthors() {
//     $.get("/api/authors", function(data) {
//       var rowsToAdd = [];
//       for (var i = 0; i < data.length; i++) {
//         rowsToAdd.push(createAuthorRow(data[i]));
//       }
//       renderAuthorList(rowsToAdd);
//       nameInput.val("");
//     });
//   }

//   // A function for rendering the list of authors to the page
//   function renderAuthorList(rows) {
//     authorList.children().not(":last").remove();
//     authorContainer.children(".alert").remove();
//     if (rows.length) {
//       console.log(rows);
//       authorList.prepend(rows);
//     }
//     else {
//       renderEmpty();
//     }
//   }

//   // Function for handling what to render when there are no authors
//   function renderEmpty() {
//     var alertDiv = $("<div>");
//     alertDiv.addClass("alert alert-danger");
//     alertDiv.text("You must create an Author before you can create a Post.");
//     authorContainer.append(alertDiv);
//   }
})