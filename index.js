import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit({
  config: [
    "user.name=Jael2424",
    "user.email=jnyambura2001@gmail.com",
  ],
});

const START_DATE = moment("2023-08-20");
const END_DATE = moment("2026-07-10");
const totalDays = END_DATE.diff(START_DATE, "days"); // ~1055 days

const makeCommits = async (n) => {
  for (let i = n; i > 0; i--) {
    // Pick a random day within the range
    const randomDay = random.int(0, totalDays);
    const date = START_DATE.clone().add(randomDay, "days").format();

    const data = { date };

    console.log(`Commit ${n - i + 1}/${n} — ${date}`);

    await new Promise((resolve, reject) => {
      jsonfile.writeFile(path, data, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    await git.add([path]).commit(date, { "--date": date });
  }

  console.log("All commits done. Pushing...");
  await git.push();
  console.log("Done!");
};

makeCommits(10000);
