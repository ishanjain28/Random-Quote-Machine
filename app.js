/**
 * Created by Ishan Jain on 14-05-2016.
 */

//  Navbar Component Starts
var Navbar = React.createClass({
	render: function () {
		return (
			<div className="navbar">
			<p className="header">Random Quotes Machine</p>
		</div>
		);
	}
});
//  Navbar component ends and Quote Component starts.
var Quote = React.createClass({
	render: function () {
		return (
			<div className="quote">
			{this.props.quote}
		</div>
		);
	}
});
//  Author starts, Quote Ends.
var Author = React.createClass({
	render: function () {
		return (
			<div className="author">
			<p>{'-'}
			<i>{this.props.author}</i>
		</p>
		</div>
		);
	}
});
//  Categories Component starts. Idea is to change the Ajax url depending on what category is selected.
//  It doesn't works yet. TODO: Work on making categories tab function properly.

var Categories = React.createClass({
	getInitialState: function () {
		return {url: 'famous'};
	},

	// TODO: I think I should do this using props and states.. I will think about this and I will do it within 3 days.
	render: function () {
		var cat_array = ["Movies", "Famous"];
//  TODO: Why does clicking on a link with href="" reloads the whole page?
		//  Find out a way to make Categories work.. Goes against the React way of not messing with Actual DOM.. But It's easier, works and I am not doing any resource consuming work here.
		return (
			<div className="cat_tab">
			<ul className="cat_list">
			{cat_array.map(function (cat) {
				return <a key={cat} className="cat_list_element" id="inactive_cat">
					<li>
					<i>{"#" + cat}</i>
					</li>
					</a>;
			})}
		</ul>
		</div>
		);
	}
});
//  QuoteBlock Starts. This is the parent Component for Quote and Author and all other important components.
//  getInitialState sets the initial value of Quote and DIV
//  componentDidMount executes the ajax call and updates the value of quote and author right after the Initial rendering occurs..
//  updateView is passed to onClick handler of button to update Quote and Author when the button is clicked.
var QuoteBlock = React.createClass({
	getInitialState: function () {
		return {quote: "New Quote here", author: "Who said it?"};
	},
	updateView: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: true,
			headers: {'X-Mashape-Key': 'j2rbmAvhvimshrTJkUHtmBEceNbgp1WJRG6jsnVVTDboDxcAIR', 'Cache-Control': 'max-age=1000'},
			success: function (data) {
				//  Update Quote and Author. Placed this first, because changing Background doesn't takes time but loading new quote takes time. So, now it'll update the backgroundColor after updating quote and author
				this.setState({quote: data['quote'], author: data['author']});

				//  Code to Randomly change Background Color on Every New_Quote Click.
				var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"], currentColor = Math.floor(Math.random() * (colors.length - 1));
				var body = document.getElementById('body');
				body.style.backgroundColor = colors[currentColor];

			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, err.toString());
			}.bind(this)
		});
	},

//        If I return this.updateView in componentDidMount, It doesn't makes Ajax calls.
//        Hate to write the same code again. Going to work on finding out a solution for this.
	componentDidMount: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: true,
			headers: {'X-Mashape-Key': 'j2rbmAvhvimshrTJkUHtmBEceNbgp1WJRG6jsnVVTDboDxcAIR', 'Cache-Control': 'max-age=1000'},
			success: function (data) {
				this.setState({quote: data['quote'], author: data['author']});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, err.toString());
			}.bind(this)
		});
	},
	render: function () {
		return (
			<div className="QuoteBlockParent">
				<div className="QuoteBlock">
					<Quote quote={this.state.quote}/>
					<Author author={this.state.author}/>
					<Categories />
					<NewQuote handleClick={this.updateView} />
					<Tweet quote={this.state.quote} />
				</div>
			</div>
		);
	}
});
//  New Quote Button Component. executes the updateView method from QuoteBlock when clicked. :)
var NewQuote = React.createClass({
	render: function () {
		return (
			<a className="btn new_quote" onClick={this.props.handleClick}>New Quote</a>
		);
	}
});
//  Tweet Button  Starts
var Tweet = React.createClass({
	render: function () {
		var quote = this.props.quote.split(" ").join("%20");
		var url = "https://twitter.com/intent/tweet?text=" + quote;
		return (
			<a className="btn tweet_btn" href={url} target="_blank">tweet</a>
		);
	}
});
//  The root container of the page.
var RootElement = React.createClass({
	render: function () {
		return (
			<div className="RootElement">
			<Navbar />
			<QuoteBlock url="https://andruxnet-random-famous-quotes.p.mashape.com/?cat="/>
			</div>
		);
	}
});
//  Finally, Rendering all this inside a div on our page
ReactDOM.render(
<RootElement />,
	document.getElementById('content')
);