import "./App.css";

function App() {
  const onDragStart = (event) => {
    // console.log(event.target);
    event.target.classList.add("dragging");
  };

  const onDragEnd = (event) => {
    // console.log(event.target);
    event.target.classList.remove("dragging");
  };

  const onDragEnter = (event) => {
    // console.log(event.target);
    if (event.target.className === "dropConatiner") {
      event.target.classList.add("droppedHere");
    }
  };

  const onDragLeave = (event) => {
    // console.log("onDragLeave", event.target);
    if (event.target.className === "dropConatiner droppedHere") {
      event.target.classList.remove("droppedHere");
    }
  };

  const onDragOver = (event) => {
    const isDragged = document.querySelector(".dragging");
    if (event.target.className === "dropConatiner droppedHere") {
      const resultingElement = getDropElement(
        event.target.querySelectorAll(".draggable:not(.dragging)"),
        event.clientY
      );
      // console.log(resultingElement);
      if (resultingElement === undefined) {
        isDragged.parentNode.removeChild(isDragged);
        event.target.appendChild(isDragged);
      } else {
        isDragged.parentNode.removeChild(isDragged);
        event.target.insertBefore(isDragged, resultingElement);
      }
    }
  };

  const getDropElement = (containers, yPosition) => {
    const onDropElements = [...containers];
    // console.log(onDropElements);
    return onDropElements.reduce(
      (closestElement, childElement) => {
        const box = childElement.getBoundingClientRect();
        const offSet = yPosition - box.top - box.height / 2;
        // console.log(offSet);
        if (offSet < 0 && offSet > closestElement.offSet) {
          return { offSet: offSet, element: childElement };
        } else {
          return closestElement;
        }
      },
      { offSet: Number.NEGATIVE_INFINITY }
    ).element;
  };

  return (
    <div className="App">
      <h1 className="title">Welcome to studiousTribe</h1>
      <div
        className="dropConatiner"
        onDragEnter={(event) => onDragEnter(event)}
        onDragLeave={(event) => onDragLeave(event)}
        onDragOver={(event) => onDragOver(event)}
      >
        <div
          className="draggable"
          draggable
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
        >
          Tab 1
        </div>
        <div
          className="draggable"
          draggable
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
        >
          Tab 2
        </div>
      </div>
      <div
        className="dropConatiner"
        onDragEnter={(event) => onDragEnter(event)}
        onDragLeave={(event) => onDragLeave(event)}
        onDragOver={(event) => onDragOver(event)}
      >
        <div
          className="draggable"
          draggable
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
        >
          Tab 3
        </div>
        <div
          className="draggable"
          draggable
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
        >
          Tab 4
        </div>
        <div
          className="draggable"
          draggable
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
        >
          Tab 5
        </div>
      </div>
    </div>
  );
}

export default App;
