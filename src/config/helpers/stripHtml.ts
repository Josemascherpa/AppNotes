export const stripHTML = (html: string) => {//saco las etiquetas del html
  return html.replace(/<[^>]+>/g, '');
};