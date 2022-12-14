import './ModalWindow.css';

function ModalWindow({content, setContent}) {

  let {body , title} = content;

  if (body) {
    body = body.split(/([\n])/g).map((el) => {
      if (el === '\n') {
        return <br/>;
      } else {
        return el;
      }
    });
  }

  return (
    <div className={(body && title) ? 'modal active' : 'modal'}  onClick={ () => setContent({})}>
      <div className={(body && title) ? 'content active' : 'content'} onClick={ (e) => {e.stopPropagation()}} >
      <h1> { title }</h1>
      <p>{body }</p> 
        <button className={'button_close'} onClick={ () => setContent({})  }>Close</button>
      </div>
    </div>
  );
}

export default ModalWindow;