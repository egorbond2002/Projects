import './List.css';

function List({setActiveAnecdote,appState}) {
  return(
    <div className='list_blocks' >
      { 
        appState.anecdotes.map((anecdote) => {
          return (
            <div key={ anecdote.id } onClick={ () =>  setActiveAnecdote(anecdote.id) }>
              <h1 className='title_view'> { anecdote.title }</h1>
            </div>
          );
        })
      }
    </div>
  );
}

export default List;