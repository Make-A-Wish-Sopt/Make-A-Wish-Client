export const extractImageSrc = (imageLink: string) => {
  //eslint-disable-next-line
  const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
  const imageSrc = regex.exec(imageLink);

  return imageSrc && imageSrc[1];
};

export const extractPrice = (totalPrice: string) => {
  const html = document.createElement('span');
  html.innerHTML = totalPrice;
  const innerHtmlText = html.querySelector('.css-4bcxzt')?.innerHTML;
  const price = Number(innerHtmlText?.substring(0, innerHtmlText.indexOf('<')).replaceAll(',', ''));

  return price;
};
