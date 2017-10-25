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
            category: 'programming',
            categories: ["programming"],
            categoriesList: []
        }
    },
    handleCategory: function (category) {
        this.setState({
            category: category
        });
        var selector = '#' + category;

        var categoryArr = this.state.categories;
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
        var URL = "https://d2t-bot.ishanjain.me/categories";
        $.ajax({
            url: URL,
            dataType: 'json',
            cache: true,
            success: function (data) {

                this.setState({
                    categories: data
                });

                data.forEach(function (v) {
                    if (v == "programming") {
                        this.state.categoriesList.push(<li className="categoryLI programming" id="programming" onClick={() => { this.handleCategory('programming') }}>#programming</li>);
                    }

                    this.state.categoriesList.push(<li style={{ 'color': 'grey' }} className={"categoryLI " + v} id={v} onClick={() => { this.handleCategory(v) }}>#{v}</li>);
                }.bind(this));

                this.getNewQuote();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, err.toString());
            }.bind(this)
        });
        
    },
    getNewQuote: function () {
        var URL = "https://d2t-bot.ishanjain.me/?category=" + this.state.category || "";
        $.ajax({
            url: URL,
            dataType: 'json',
            cache: true,
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
                            {this.state.categoriesList}
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
const Footer = React.createClass({
    render: function () {
        return (
            <div className="footerWrapper">
                <div className="footer">
                    <div className="contact">
                        <a className="contactElement footercolor" href="mailto:ishanjain28@gmail.com">Contact</a>
                        <a className="contactElement footercolor" href="https://github.com/ishanjain28/random-quote-machine">Github</a>
                        <a className="contactElement footercolor" href="https://twitter.com/ishanjain28">Twitter</a>
                    </div>
                    <div className="sources">
                        <u><a className="sourceElement footercolor" href="https://market.mashape.com/ishanjain28/random-quotes">Random Quote API from Mashape</a></u>
                    </div>
                </div>
            </div>
        )
    }
});
const App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Navbar />
                <QuoteWrapper />
                <Footer />
            </div>
        );
    }
})

module.exports = App;