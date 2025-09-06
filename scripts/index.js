const timeframeSelector = document.getElementById("timeframe-selector");

const previousLabels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

const updateActivityCard = (title, timeframes, target) => {
  const activityCard = document.getElementById(
    title.toLowerCase().replace(/\s+/g, "-")
  );
  if (!activityCard) return; // Guard clause if mismatch

  const currentHours = activityCard.querySelector(".current-hours");
  const previousHours = activityCard.querySelector(".previous-hours");

  const { current, previous } = timeframes[target];
  currentHours.textContent = `${current}hrs`;
  previousHours.textContent = `${previousLabels[target]} - ${previous}hrs`;
};

timeframeSelector.addEventListener("click", async ({ target }) => {
  if (!target.classList.contains("timeframe-button")) return;

  // Toggle active button state
  timeframeSelector.querySelectorAll(".timeframe-button").forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-selected", "false");
  });
  target.classList.add("active");
  target.setAttribute("aria-selected", "true");

  // Load + update cards
  const data = await loadData();
  data.forEach(({ title, timeframes }) =>
    updateActivityCard(title, timeframes, target.id)
  );
});
