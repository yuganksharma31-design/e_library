import axios from "axios";

const BASE_URL = "https://archive.org/advancedsearch.php";

export async function fetchCollectionItems(collection) {
  try {

    const response = await axios.get(BASE_URL, {
      params: {
        q: `collection:(${collection})`,
        fl: ["identifier", "title", "creator"],
        rows: 20,
        output: "json",
      },
    });

    return response.data.response.docs;

  } catch (error) {

    console.error(error);

    return [];
  }
}