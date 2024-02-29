export default function generateHashtag(str: string): string | boolean {
  if (str.length === 0) return false;
  const formattedStr = str.split(' ').map(capitalise).join('');
  if (formattedStr.length >= 140 || formattedStr.length === 0) return false;
  return `#${formattedStr}`;
}

function capitalise(str: string): string {
  if (str.length === 0) return '';
  const capital = str[0].toUpperCase() + str.substring(1, str.length);
  return capital.trim();
}
console.log(generateHashtag(new Array(140).fill('a').join(''))); // false
console.log(generateHashtag('')); // false
console.log(generateHashtag('Do We have A Hashtag')); // #DoWeHaveAHashtag
console.log(generateHashtag('Codewars')); // #Codewars
console.log(generateHashtag('Codewars Is Nice')); // #CodewarsIsNice
console.log(generateHashtag('code' + ' ' + 'wars')); // #CodeWars
/**
 * It must start with a hashtag (#).
 * All words must have their first letter capitalized.
 * If the final result is longer than 140 chars it must return false.
 * If the input or the result is an empty string it must return false.
 */
