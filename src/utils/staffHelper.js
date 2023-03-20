import { subMonths, isWithinInterval, subWeeks } from "date-fns";
import numeral from "numeral";
import { saveAs } from "file-saver";

const isHttps = (url) => {
  const httpPart = url.split(":")[0];
  if (httpPart === "https") {
    return true;
  } else {
    return false;
  }
};

export const downLoadImage = async (link, documentType) => {
  // documentType is filename
  let httpsLink = link.split("");
  if (!isHttps(link)) {
    httpsLink.splice(4, 0, "s");
  }
  httpsLink = httpsLink.join("");
  const downloadResult = await fetch(`${httpsLink}`);
  const blob = await downloadResult.blob();
  saveAs(blob, `${documentType}`);
};

export const getLastMonthData = (array) => {
  const today = new Date();
  const priorMonth = subMonths(today, 1);

  array = array || [];

  return array.filter((item) =>
    isWithinInterval(new Date(item.createdAt), {
      start: priorMonth,
      end: today,
    })
  );
};

export const getLastWeekData = (array) => {
  const today = new Date();
  const priorWeek = subWeeks(today, 1);

  array = array || [];

  return array.filter((item) =>
    isWithinInterval(new Date(item.createdAt), {
      start: priorWeek,
      end: today,
    })
  );
};

export const calculatePercentageIncrease = (total, number) => {
  return (number / total) * 100;
};

export const getPercentage = (array) => {
  // console.log(array);

  return numeral(calculatePercentageIncrease(array?.length, getLastMonthData(array).length)).format(
    "0[.]0"
  );
};

export const ParseUsers = (usersArray) => {
  let launchToOwner = new Map();

  for (const user of usersArray) {
    const launches = [
      ...user.draft_launch_requests,
      ...user.completed_launch_requests,
      ...user.submitted_launch_requests,
    ];
    for (const launch of launches) {
      launchToOwner.set(launch, `${user.first_name} ${user.last_name}`);
    }
  }

  return launchToOwner;
};

export const sortTableData = (a, b) => {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA - dateB ? 1 : -1;
};
