import { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookResults: [],
      bookSearch: 'Harry Potter',
      searchInputStr: 'harrypotter',
      currentSearchTitle: 'Harry Potter'
    }
  }

  componentDidMount() {
    const promise = axios.get('https://www.googleapis.com/books/v1/volumes?q=' + `${this.state.searchInputStr}`);
    promise.then((response) => {
      this.setState({bookResults: response.data.items});
    });
  }

  componentDidUpdate() {
    this.searchHandler = () => {
      const promise = axios.get('https://www.googleapis.com/books/v1/volumes?q=' + `${this.state.searchInputStr}`);
      promise.then((response) => {
        if(response.data.items === [] || response.data.items === undefined) {
          alert('No books found for ' + this.state.bookSearch);
        } else {
          this.setState({bookResults: response.data.items});
          this.setState({currentSearchTitle: this.state.bookSearch});
        }
        console.log(this.state.bookResults);
      });
    }
  }

  inputHandler = (e) => {
    this.setState({bookSearch: e.target.value});
    this.setState({
      searchInputStr: e.target.value.replace(/ /g, '')
    }, () => {
      console.log(this.state.searchInputStr);
    });
  }


  render() {

    return (
      <div className="App">
        <div className="header">
          <h2>Book Library</h2>
          <input className="searchInput" value={this.state.bookSearch}
          type="text"
          onChange={this.inputHandler}/>
          <button onClick={this.searchHandler}>Search</button>
        </div>
        <div className="resultsTag">
          <h3>RESULTS FOR: {this.state.currentSearchTitle}</h3>
        </div>
        <ul>
          {this.state.bookResults.map((book) =>
            <li key={book.id}>
              <div className="singleBookResult">
                <div className="bookInfo">
                  <a href={book.volumeInfo.canonicalVolumeLink} target="_blank">
                    <h3>{book.volumeInfo.title}</h3>
                  </a>
                  <p>{book.volumeInfo.categories}</p>
                </div>
                <div className="bookDescription">
                  {
                    `${book.volumeInfo.imageLinks.thumbnail}`
                    ?
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book Thumbnail"/>
                    :
                   <img src="" alt="Book Thumbnail"/>
                  }
                  <p>{book.volumeInfo.description}</p>
                </div>
              </div>
              <hr />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
