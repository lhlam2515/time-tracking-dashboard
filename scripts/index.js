const timeframeSelector = document.getElementById("timeframe-selector");

timeframeSelector.addEventListener("click", async ({ target }) => {
  if (!target.classList.contains("timeframe-button")) return;

  const data = await fetch("./data.json").then((res) => res.json());
  const previousLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  data.forEach(({ title, timeframes }) => {
    const activityCard = document.getElementById(
      title.toLowerCase().replace(" ", "-")
    );
    const currentHours = activityCard.querySelector(".current-hours");
    const previousHours = activityCard.querySelector(".previous-hours");

    currentHours.textContent = `${timeframes[target.id].current}hrs`;
    previousHours.textContent = `${previousLabels[target.id]} - ${
      timeframes[target.id].previous
    }hrs`;
  });
});

timeframeSelector.addEventListener("click", ({ target, currentTarget }) => {
  if (!target.classList.contains("timeframe-button")) return;

  currentTarget.querySelectorAll(".timeframe-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  target.classList.add("active");
});
