//A FUNCION THAT CAPITALIZES THE FIRST LETTER OF EACH WORD IN A STRING

const capitalizeLetters = (input: string) => {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default capitalizeLetters;

/* How it works: */
 
/* .split(" ") */
//splits the input string into an array of substrings based on the specified separator,
//which is a space in this case. This creates an array of words

/*   .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) */
// Map over each word and capitalize its first letter,
// then slice out the remaining letters and put them together with the capitalized letter,
// i.e: "W" + "ord"

/* join(" "); */
// Converts array back into a string and joins the words with a space " " between