import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createReactClass from 'create-react-class';
import $ from 'jquery';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ApolloProvider } from "react-apollo";



const client = new ApolloClient({
    uri: "http://api.musixmatch.com/ws/1.1/track.search",
    apikey:"1515f195e9f7006b87560ec70e7c71f2",
    dataType: "jsonp",
    data: {
        q_artist  : "eminem"
    },

   
  });


  const GetTrack = () => (
    <Query
      query={gql`
      {
        track
      }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        // return data => {
        //     <div>{data}</div>
        // }

    
      }}
    </Query>
  );
 

var ReturnedResults = createReactClass({

    render : function(){
        console.log(this);

        let Objtrack = this.props.result ;   
        let url = "";
        if(Objtrack.album_coverart_100x100 != "")
        {
            url = Objtrack.album_coverart_100x100
        }
        else
        if(Objtrack.album_coverart_350x350 != "")
        {
            url = Objtrack.album_coverart_350x350
        }
        else
        if(Objtrack.album_coverart_500x500 != "")
        {
            url = Objtrack.album_coverart_500x500
        }
        else
        if(Objtrack.album_coverart_800x800 != "")
        {
            url = Objtrack.album_coverart_800x800
        }

        let individualResult = $("<div class='individualResult'><div>") ;
        let resultContent = $("<div class='resultContent'>" +
        "Track Name: " + Objtrack.track_name +
        "<br/>" +
        "Album Name: " + Objtrack.album_name +
        "<br/>" +
        "Artist: " + Objtrack.artist_name +   
        "</div>");
        let image  = $('<img class="albumImage" src="'+url+'"  />') ;
        $(individualResult).append($(image));
        $(individualResult).append($(resultContent));

        $('#searchResultsContainer').append($(individualResult)) ;

        return null ;
        }

}) 

var GetMusicInfo =createReactClass({

    render: function(){
      return(<button onClick={this.CallMusixMatch}>Search</button>)
    },

    CallMusixMatch(){
        var searchString = $('#InputSearchBox').val();
        $.ajax({
        type: "GET",
        data: {
            apikey:"1515f195e9f7006b87560ec70e7c71f2",
            q  : searchString,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
        // return <ReturnedResults test = {data} />
        let returnedTrackList = data.message.body.track_list;

        $('#searchResultsContainer').empty() ;

        for(let i = 0 ; i < returnedTrackList.length ; i++)
        {
            let track = returnedTrackList[i].track;
            ReactDOM.render(<ReturnedResults result = {track} />, document.getElementById('root'));
        }


        return null ;

        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }    
    });
    }
  
  });
ReactDOM.render(<GetMusicInfo />, document.getElementById('SearchButtonContainer'));
// ReactDOM.render
// (
//     <ApolloProvider client={client}>
// <GetTrack />
// </ApolloProvider>, 
    
//     document.getElementById('root'));

registerServiceWorker();
