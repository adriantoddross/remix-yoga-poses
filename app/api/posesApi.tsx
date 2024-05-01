export const fetchPoses = async () => {
  // Fetch all poses
  return await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_POSES}`
  ).then((data) => data);
};

export const fetchCategories = async () => {
  // Fetches all categories AND all poses
  return await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_CATEGORIES}`
  ).then((data) => data);
};
