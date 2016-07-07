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
    getInitialState: function() {
        return {
            quote: 'Quote here',
            author: 'Who said it?',
            category: 'programming'
        }
    },
    render: function () {
        return (
            <div className="QuoteWrapper">
                <QuoteBox 
                    quote={this.state.quote} 
                    author={this.state.author}
                    getCategory={this.getCategory}
                    category={this.state.category}
                />
            </div>
        );
    }
});

const QuoteBox = React.createClass({
    render: function () {
        return (
            <div className="QuoteBox">
            <div className="quote">
                {this.props.quote}
            </div>
            <div className="author">
                <i>-{this.props.author}</i>
            </div>
            <div className="category">
            <i>
                <ul className="categoryUL">
                    <li className="categoryLI movies">#movies</li>
                    <li className="categoryLI famous">#famous</li>
                    <li className="categoryLI programming">#programming</li>
                </ul>
            </i>
            </div>
            <div className="ButtonBox">
                <NewQuote />
                <Tweet />
            </div>
            </div>
        );
    }
});

const NewQuote = React.createClass({
    render: function () {
        return (
            <div className="newquote">
                New Quote
            </div>
        );
    }
});

const Tweet = React.createClass({
    render: function () {
        return (
            <div className="tweet">
                Tweet
            </div>
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