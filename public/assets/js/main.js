$(function() {
    $('#logout').on('click', () => {
        
        $.get("/logout", () => {  
            window.location.href = '/';
        }); 
    })
})