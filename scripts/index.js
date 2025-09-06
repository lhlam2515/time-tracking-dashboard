const timeframeSelector = document.getElementById("timeframe-selector");

const updateActivityCard = (title, timeframes, target) => {
  const activityCard = document.getElementById(
    title.toLowerCase().replace(/\s+/g, "-")
  );
  const currentHours = activityCard.querySelector(".current-hours");
  const previousHours = activityCard.querySelector(".previous-hours");

  const previousLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  currentHours.textContent = `${timeframes[target].current}hrs`;
  previousHours.textContent = `${previousLabels[target]} - ${timeframes[target].previous}hrs`;
};

timeframeSelector.addEventListener("click", async ({ target }) => {
  if (!target.classList.contains("timeframe-button")) return;

  const data = await fetch("./data.json").then((res) => res.json());

  data.forEach(({ title, timeframes }) =>
    updateActivityCard(title, timeframes, target.id)
  );
});

timeframeSelector.addEventListener("click", ({ target, currentTarget }) => {
  if (!target.classList.contains("timeframe-button")) return;

  currentTarget.querySelectorAll(".timeframe-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  target.classList.add("active");
});
