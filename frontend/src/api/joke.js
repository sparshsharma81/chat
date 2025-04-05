export const getJoke = async () => {
    try {
      const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
      const data = await res.json();
      return data.joke || "No joke found!";
    } catch (error) {
      return "Oops! Couldn't fetch a joke.";
    }
  };