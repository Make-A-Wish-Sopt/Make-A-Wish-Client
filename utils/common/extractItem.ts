export const extractImageSrc = (imageLink: string) => {
  //eslint-disable-next-line
  const regex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
  const imageSrc = regex.exec(imageLink);

  return imageSrc && imageSrc[1];
};

export const extractPrice = (totalPrice: string, linkURL: string) => {
  console.log(totalPrice);
  if (linkURL.includes('29cm')) {
    const html = document.createElement('span');
    html.innerHTML = totalPrice;
    const innerHtmlText = html.querySelector('.css-4bcxzt')?.innerHTML;
    const price = Number(
      innerHtmlText?.substring(0, innerHtmlText.indexOf('<')).replaceAll(',', ''),
    );

    return price;
  } else if (linkURL.includes('naver')) {
    const html = document.createElement('em');
    html.innerHTML = totalPrice;
    const price = html
      .getElementsByClassName('lowestPrice_num__A5gM9')[0]
      .innerHTML.replaceAll(',', '');

    return Number(price);
  }
};
