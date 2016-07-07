var React = require('react');
var $ = require('jquery');

const Navbar = React.createClass({
    render: function () {
        return (
            <div className="navbar">
                <p className="header">RANDOM QUOTES</p>
            </div>
        );
    }
});

const QuoteWrapper = React.createClass({
    render: function () {
        return (
            <div className="QuoteWrapper">
                <QuoteBox />
            </div>
        );
    }
});

const QuoteBox = React.createClass({
    getInitialState: function () {
        return {
            quote: 'Quote here',
            author: 'Who said it?',
            category: 'programming'
        }
    },
    handleCategory: function (category) {
        this.setState({
            category: category
        });

        var selector = '#' + category;

        var categoryArr = ['movies', 'famous', 'programming'];

        categoryArr.forEach(function (val) {
            if (val == category) {
                selector = '#' + val;
                $(selector).css("color", "#000");
            } else {
                selector = '#' + val;
                $(selector).css('color', "grey");
            }
        })
    },
    componentWillMount: function () {

        var URL = "http://quotes.stormconsultancy.co.uk/random.json";
        $.ajax({
            url: URL,
            dataType: 'jsonp',
            cache: true,
            success: function (data) {

                this.setState({ quote: data['quote'], author: data['author'] });

                var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                    currentColor = Math.floor(Math.random() * (colors.length - 1));

                $('.QuoteWrapper').css('background', colors[currentColor]);
                var newquotebgcolor = 'linear-gradient(to bottom, ' + colors[currentColor] + ' 50%, #000 50%)';
                $('.newquote').css('background-image', newquotebgcolor);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, err.toString());
            }.bind(this)
        });
    },
    getNewQuote: function () {
        var URL = "http://quotes.stormconsultancy.co.uk/random.json";
        if (this.state.category == "movies" || this.state.category == "famous") {
            URL = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + this.state.category;
            $.ajax({
                url: URL,
                dataType: 'json',
                cache: true,
                headers: { 'X-Mashape-Key': 'j2rbmAvhvimshrTJkUHtmBEceNbgp1WJRG6jsnVVTDboDxcAIR', 'Cache-Control': 'max-age=1000' },
                success: function (data) {

                    this.setState({ quote: data['quote'], author: data['author'] });

                    var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                        currentColor = Math.floor(Math.random() * (colors.length - 1));

                    $('.QuoteWrapper').css('background', colors[currentColor]);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, err.toString());
                }.bind(this)
            });
        }
        if (this.state.category == "programming") {
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                cache: true,
                success: function (data) {

                    this.setState({ quote: data['quote'], author: data['author'] });

                    var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                        currentColor = Math.floor(Math.random() * (colors.length - 1));

                    $('.QuoteWrapper').css('background', colors[currentColor]);
                    var newquotebgcolor = 'linear-gradient(to bottom, ' + colors[currentColor] + ' 50%, #000 50%)';
                    $('.newquote').css('background-image', newquotebgcolor);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, err.toString());
                }.bind(this)
            });
        }
    },
    render: function () {
        return (
            <div className="QuoteBox">
                <div className="quote">
                    {this.state.quote}
                </div>
                <div className="author">
                    <i>-{this.state.author}</i>
                </div>
                <div className="category">
                    <i>
                        <ul className="categoryUL">
                            <li className="categoryLI movies" id="movies" onClick={() => { this.handleCategory('movies') } }>#movies</li>
                            <li className="categoryLI famous" id="famous" onClick={() => { this.handleCategory('famous') } }>#famous</li>
                            <li className="categoryLI programming" id="programming" onClick={() => { this.handleCategory('programming') } }>#programming</li>
                        </ul>
                    </i>
                </div>
                <div className="ButtonBox">
                    <NewQuote getNewQuote={this.getNewQuote} />
                    <Tweet quote={this.state.quote} author={this.state.author} />
                </div>
            </div>
        );
    }
});

const NewQuote = React.createClass({
    render: function () {
        return (
            <div className="newquote" onClick={this.props.getNewQuote}>
                New Quote
            </div>
        );
    }
});

const Tweet = React.createClass({
    render: function () {
        var quote = this.props.quote;
        var author = this.props.author;
        var url = "https://twitter.com/intent/tweet?text=" + quote
        if (quote.length + author.length < 160) {
            url = "https://twitter.com/intent/tweet?text=" + quote + ' -' + author;
        } else {
            url = "https://twitter.com/intent/tweet?text=" + quote;
        }
        return (
            <a href={url} target="_blank" className="tweetButton">
                <div className="tweet">
                    Tweet
                </div>
            </a>
        );
    }
});

const App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Navbar />
                <QuoteWrapper />
            </div>
        );
    }
})
module.exports = App;
