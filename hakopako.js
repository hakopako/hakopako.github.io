var Blog = {
    listURL: "http://www.hakopako.net/sitemap.xml?page=1",
    $elm: null,
    loadArticleList: function(count, elm){
        const self = this
        self.$elm = $(elm)
        $.get(this.listURL, function( data ) {
            var items = Array.apply(null, Array(5)).map(function (_, i) {return i+2;})
            $.each(items, function(_, k){
                aUrl = $(data).find("loc")[k].textContent
                self.loadArticle(aUrl)
            })
        })
    },
    loadArticle: function(article_url){
        var self = this
        url = "http://hatenablog.com/oembed?url=" + article_url + "&format=json"
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            crossDomain: true,
            success: function(data){
                article_html = "<p><a href=" + data.url + " target='_blank'>" + data.published.split(" ")[0] + " - " + data.title + "</a></p>"
                self.$elm.append(article_html)
            }
        })
    }
}


$(function(){
    var blog = Blog
    blog.loadArticleList(3, "#bloglist")
})