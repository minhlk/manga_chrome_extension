var m = chrome.extension.getBackgroundPage();
function Log(mes) {
    m.console.log(mes);
}
chrome.browserAction.onClicked.addListener(function (tab) { alert('icon clicked') });
$(document).ready(function(){
    getMangas()

})
function getMangas(){
    $('.loaded').css("display", "none");
    $('.loading').css("display", "block");
    fetch('https://cors-anywhere.herokuapp.com/https://hentaivn.net/danh-sach.html')
        .then(response => response.text())
        .then(html => {
            // $.parseHTML(html)
            // $('#container').append(html)
            var dom = $.parseHTML(html)
            // $('#container').append(html)
            let mangas = $(dom).find('.item').each(function () {
                let image = $(this).find('.img-list').attr('src')
                let url = $(this).find('.box-cover a').attr('href')
                let title = $(this).find('.img-list').attr('alt')
                let genres = ''
                $(this).find('.box-description span').each(function () {
                    // Log($(this))
                    genres = genres + '<span>' + $(this).text() + '</span>'
                });
                
                $('#container').append(
                    `
                    <div class="image-item">
    
                    <img src='${image}' width="250" >
                    <div class="tooltip-item">
                    <div class="title">${title}</div>
                    <hr/>
                    <div class="description">${genres}</div>
                    
                    <a href="https://hentaivn.net${url}" class="url" target="_blank">More...</a>
                    </div>
                   
                    </div>
    
                    `
                )
            })
            //DONE LOADING
           return true
        }).then(_ =>{
            $('.loaded').css("display", "block");
            $('.loading').css("display", "none");
        })

}
$('#refresh').click(getMangas)

// document.getElementById("sampleSecond").addEventListener("click", myFunction);
// function myFunction() {
//     chrome.notifications.create({
//         type:     'basic',
//         iconUrl:  'tab-icon.png',
//         title:    'Time to Hydrate',
//         message:  'Everyday I\'m Guzzlin\'!',
//         buttons: [
//           {title: 'Keep it Flowing.'}
//         ],
//         priority: 0});
// }
