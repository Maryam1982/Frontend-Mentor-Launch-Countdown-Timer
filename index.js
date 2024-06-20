const backCard = document.querySelector(".top-back-card");
const frontCard = document.querySelector(".top-front-card");

let seconds = 10;
let minutes = 0;
let hours = 0;
let days = 3;

let counter = seconds + minutes * 60 + hours * 3600 + days * 24 * 3600;

function setValue(portionClass, value, isDecrement = true) {
  //This must be one less than actual counter
  const topCard_back = document.querySelector(
    `.${portionClass} .top-front-card .top-back h1`
  );
  topCard_back.innerHTML = isDecrement ? (value === 0 ? 0 : value - 1) : value;

  //This must be the same as the current counter
  const topCard_front = document.querySelector(
    `.${portionClass} .top-front-card .top-front h1`
  );
  topCard_front.innerHTML = value;

  //This must be the same as the current counter
  const secondsContainer = document.querySelector(`.${portionClass} h1`);
  secondsContainer.innerHTML = value;

  const backCard_back = document.querySelector(
    `.${portionClass} .top-back-card .top-back h1`
  );
  backCard_back.innerHTML = isDecrement ? (value === 0 ? 0 : value - 1) : value;
}

function resetValue(portionClass) {
  const topCard_back = document.querySelector(
    `.${portionClass} .top-front-card .top-back h1`
  );
  topCard_back.innerHTML = 0;
  const topCard_front = document.querySelector(
    `.${portionClass} .top-front-card .top-front h1`
  );
  topCard_front.innerHTML = 0;
  const secondsContainer = document.querySelector(`.${portionClass} h1`);
  secondsContainer.innerHTML = 0;

  const backCard_back = document.querySelector(
    `.${portionClass} .top-back-card .top-back h1`
  );
  backCard_back.innerHTML = 0;
}

function setCountingClass(portionClass, value) {
  const frontCard = document.querySelector(`.${portionClass} .top-front-card`);
  if (value) {
    if (!frontCard.classList.contains("counting"))
      frontCard.classList.add("counting");
  } else {
    if (frontCard.classList.contains("counting"))
      frontCard.classList.remove("counting");
  }
}

function setBackCardVisibility(portionClass, value) {
  const backCard = document.querySelector(`.${portionClass} .top-back-card`);
  if (value) {
    if (backCard.classList.contains("invisible")) {
      backCard.classList.remove("invisible");
      backCard.classList.add("visible");
    }
  } else {
    setTimeout(() => {
      backCard.classList.remove("visible");
      backCard.classList.add("invisible");
    }, 800);
  }
}

setValue("seconds-portion", seconds);
setValue("minutes-portion", minutes);
setValue("hours-portion", hours);
setValue("days-portion", days);

function render(timePortion, isDecrement = true) {
  switch (timePortion) {
    case "seconds":
      setValue("seconds-portion", seconds, isDecrement);
      setCountingClass("seconds-portion", true);
      setBackCardVisibility("seconds-portion", true);
      break;
    case "minutes":
      setValue("minutes-portion", minutes, isDecrement);
      setCountingClass("minutes-portion", true);
      setBackCardVisibility("minutes-portion", true);
      break;
    case "hours":
      setValue("hours-portion", hours, isDecrement);
      setCountingClass("hours-portion", true);
      setBackCardVisibility("hours-portion", true);
      break;
    case "days":
      setValue("days-portion", days, isDecrement);
      setCountingClass("days-portion", true);
      setBackCardVisibility("days-portion", true);
      break;
    default:
      return;
  }
}

setInterval(() => {
  if (counter > 1) {
    //logic for countdown

    seconds--;
    render("seconds");
    setBackCardVisibility("seconds-portion", false);
    if (seconds === 0) {
      if (minutes > 0) {
        minutes--;
        render("minutes", false);
        setBackCardVisibility("minutes-portion", false);
        seconds = 60;
        render("seconds");
      } else {
        if (hours > 0) {
          hours--;
          render("hours", false);
          setBackCardVisibility("hours-portion", false);
          minutes = 59;
          render("minutes", false);
          setBackCardVisibility("minutes-portion", false);
          seconds = 60;
        } else {
          if (days > 0) {
            days--;
            render("days", false);
            setBackCardVisibility("days-portion", false);
            hours = 23;
            render("hours", false);
            setBackCardVisibility("hours-portion", false);
            minutes = 59;
            render("minutes", false);
            setBackCardVisibility("minutes-portion", false);
            seconds = 60;
          } else return;
        }
      }
    }
    setTimeout(() => {
      setCountingClass("minutes-portion", false);
      setCountingClass("hours-portion", false);
      setCountingClass("days-portion", false);
    }, 700);

    counter--;
  } else {
    resetValue("seconds-portion");
    setCountingClass("seconds-portion", false);
    setBackCardVisibility("seconds-portion", false);
    return;
  }
}, 1000);
