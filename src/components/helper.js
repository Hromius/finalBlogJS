/* eslint-disable linebreak-style */
export function lengthoverview(overview, length) {
  if (overview.split(' ').length > length) {
    const str = overview.split(' ');
    let newString = ' ';
    for (let i = 0; i < length; i++) {
      newString += ` ${str[i]}`;
    }
    return `${newString} ...`;
  } return overview;
}

export const dataFilter = (data, tags) => {
  const newData = {
    title: data.title,
    description: data.description,
    body: data.body,
  };
  let newTags = [];
  tags.forEach((item) => {
    const kek = item.id;
    if (data[kek]) newTags = [...newTags, data[kek]];
  });
  return { ...newData, tagList: newTags };
};
